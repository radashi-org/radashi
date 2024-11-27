import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

main(process.argv.slice(2))

async function main([command, ...argv]) {
  if (!command) {
    console.error('No command provided')
    process.exit(1)
  }

  const commandDir = new URL(`./${command}`, import.meta.url).pathname

  if (!fs.existsSync(commandDir)) {
    console.error(`Command not found: ${command}`)
    process.exit(1)
  }

  // Only a few environment variables are exposed to install/postinstall
  // scripts when installing dependencies from NPM.
  const strictEnv = pick(process.env, [
    'PATH',
    'TMPDIR',
    'NODE_PATH',
    'NODE_OPTIONS',
    'PNPM_HOME',
  ])

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)

  async function installDependencies(pkgDir) {
    if (fs.existsSync(path.join(pkgDir, 'node_modules'))) {
      return
    }

    const pkgPath = path.join(pkgDir, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

    if (!pkg.dependencies) {
      return
    }

    console.warn(
      `> Installing dependencies for ${path.relative(process.cwd(), pkgDir)}`,
    )

    const installer = spawn('pnpm', ['install', '--lockfile-dir', __dirname], {
      cwd: pkgDir,
      stdio: ['ignore', process.stderr, 'inherit'],
      env: strictEnv,
    })

    await new Promise((resolve, reject) => {
      installer.on('close', resolve)
      installer.on('error', reject)
    })

    console.warn()

    for (const [name, version] of Object.entries(pkg.dependencies)) {
      if (name === 'radashi') {
        continue
      }
      // Install the dependencies of linked packages.
      if (version.startsWith('link:')) {
        const linkedDir = path.resolve(pkgDir, version.slice(5))
        await installDependencies(linkedDir)
      }
    }
  }

  await installDependencies(commandDir)

  if (process.env.INSTALL_ONLY) {
    return
  }

  const version = process.versions.node
  const [major, minor] = version.split('.').map(Number)

  let runner
  let runnerArgs
  if (major < 22 || (major === 22 && minor < 6)) {
    const tsxSpecifier = 'tsx@4.19.1'
    if (process.env.CI) {
      console.warn(`> pnpm add -g ${tsxSpecifier}`)
      await new Promise((resolve, reject) => {
        const installer = spawn('pnpm', ['install', '-g', tsxSpecifier], {
          stdio: ['ignore', process.stderr, 'inherit'],
          env: strictEnv,
        })
        installer.on('close', resolve)
        installer.on('error', reject)
      })
      runner = 'tsx'
      runnerArgs = []
    } else {
      runner = 'pnpm'
      runnerArgs = ['dlx', tsxSpecifier]
    }
  } else {
    runner = 'node'
    runnerArgs = [
      '--experimental-strip-types',
      '--disable-warning=ExperimentalWarning',
    ]
  }

  const commandPath = path.join(commandDir, 'src/main.ts')
  const child = spawn(runner, [...runnerArgs, commandPath, ...argv], {
    stdio: 'inherit',
  })

  child.on('error', error => {
    console.error(error)
    process.exit(1)
  })

  child.on('close', code => {
    process.exit(code)
  })
}

function pick(object, keys) {
  const result = {}
  for (const key of keys) {
    if (key in object) {
      result[key] = object[key]
    }
  }
  return result
}
