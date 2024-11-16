// @ts-check
import { spawn } from 'node:child_process'
import fs from 'node:fs'

main(process.argv.slice(2))

async function main([command, ...argv]) {
  if (!command) {
    console.error('No command provided')
    process.exit(1)
  }

  try {
    const commandPackageJson = fs.readFileSync(new URL(`./${command}/package.json`, import.meta.url), 'utf8')
  } catch (error) {
    console.error(`Command not found: ${command}`)
    process.exit(1)
  }

  const version = process.versions.node
  const [major, minor] = version.split('.').map(Number)
  
  let runner: string
  let runnerArgs: string[]
  if (major < 22 || (major === 22 && minor < 6)) {
    runner = 'pnpm'
    runnerArgs = ['dlx', 'tsx@4.19.1']
  } else {
    runner = 'node'
    runnerArgs = ['--experimental-strip-types']
  }

  command = new URL(`./${command}/src/main.ts`, import.meta.url).pathname

  const child = spawn(runner, [...runnerArgs, command, ...argv], {
    stdio: 'inherit'
  })
}
