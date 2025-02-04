import { execa, ExecaError } from 'execa'

main()

async function main() {
  const argv = process.argv.slice(2)
  const funcName = argv[0] === 'run' ? argv[1] : argv[0]

  if (!/^\w+$/.test(funcName)) {
    console.error(`Invalid function name: "${funcName}"`)
    process.exit(1)
  }

  process.env.PATH = `${process.cwd()}/node_modules/.bin:${process.env.PATH}`

  await execa(
    'vitest',
    [...argv, '--coverage', '--coverage.include', `src/*/${funcName}*`],
    {
      stdio: 'inherit',
    },
  ).catch(error => {
    if (error instanceof ExecaError && error.signal) {
      return // Ignore SIGINT, SIGTERM, etc.
    }
    throw error
  })
}
