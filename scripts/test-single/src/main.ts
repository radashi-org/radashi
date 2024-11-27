import { execa } from 'execa'

main()

async function main() {
  const [funcName] = process.argv.slice(2)

  process.env.PATH = `${process.cwd()}/node_modules/.bin:${process.env.PATH}`

  await execa(
    'vitest',
    [funcName, '--coverage', '--coverage.include', `src/*/${funcName}*`],
    {
      stdio: 'inherit',
    },
  )
}
