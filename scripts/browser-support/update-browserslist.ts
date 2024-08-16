import { browsersWithSupportForEcmaVersion } from 'browserslist-generator'
import { execa } from 'execa'
import fs from 'node:fs'
import prettier from 'prettier'

main()

async function main() {
  // Check for uncommitted changes
  const { stdout } = await execa('git', ['status', '--porcelain'], {
    reject: false,
  })
  if (stdout.trim() !== '') {
    console.error(
      'Error: There are uncommitted changes. Please commit or stash them before running this script.',
    )
    process.exit(1)
  }

  const targets = browsersWithSupportForEcmaVersion('es2017')
  targets.push('node >= 16')

  console.log('• Browserslist generated:', targets)

  const pkgJson = JSON.parse(fs.readFileSync('package.json', 'utf8'))
  pkgJson.browserslist = targets

  const formattedPkgJson = await prettier.format(
    JSON.stringify(pkgJson, null, 2),
    { parser: 'json' },
  )

  fs.writeFileSync('package.json', formattedPkgJson)
  console.log('• package.json updated')

  await execa('git', ['add', 'package.json'])
  await execa('git', ['commit', '-m', 'chore: update browserslist'])
  console.log('• Changes committed successfully.')
}
