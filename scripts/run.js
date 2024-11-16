// @biome-format
import { spawn } from 'node:child_process'
import fs from 'node:fs'

main(process.argv.slice(2))

async function main([command, ...argv]) {
  if (!command) {
    console.error('No command provided')
    process.exit(1)
  }

  async function installDependencies(pkgDir) {
    if (fs.existsSync(path.join(pkgDir, 'node_modules'))) {
      return
    }

    const pkgPath = path.join(pkgDir, 'package.json')
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

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

  const commandDir = new URL(`./${command}`, import.meta.url).pathname

  if (!fs.existsSync(commandDir)) {
    console.error(`Command not found: ${command}`)
    process.exit(1)
  }

  await installDependencies(commandDir)

  const version = process.versions.node
  const [major, minor] = version.split('.').map(Number)

  let runner
  let runnerArgs
  if (major < 22 || (major === 22 && minor < 6)) {
    runner = 'pnpm'
    runnerArgs = ['dlx', 'tsx@4.19.1']
  } else {
    runner = 'node'
    runnerArgs = ['--experimental-strip-types']
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
