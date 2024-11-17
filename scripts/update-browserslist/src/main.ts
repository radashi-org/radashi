import { browsersWithSupportForEcmaVersion } from 'browserslist-generator'
import { dequal } from 'dequal'
import { execa } from 'execa'
import fs from 'node:fs'

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

  const pkgJsonPath = 'package.json'
  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))

  if (
    dequal(pkgJson.browserslist, targets) &&
    !process.argv.includes('--force')
  ) {
    console.log('• Browserslist is already up to date.')
    process.exit(0)
  }

  pkgJson.browserslist = targets

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2))
  console.log('• package.json updated')

  // Run prettier on the updated package.json
  await execa('pnpm', ['prettier', '--write', pkgJsonPath], {
    stdio: 'inherit',
  })

  await execa('git', ['add', pkgJsonPath])
  await execa('git', ['commit', '-m', 'chore: update browserslist'], {
    stdio: 'inherit',
  }).catch(() => {
    console.log('• No changes to commit.')
    process.exit(1)
  })

  console.log('• Changes committed successfully.')
}
