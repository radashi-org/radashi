import { execa } from 'execa'
import { glob } from 'tinyglobby'

main()

async function main() {
  // 1. Remember if the user has uncommitted changes (ignoring untracked files).
  const { stdout: uncommittedChanges } = await execa('git', [
    'status',
    '--porcelain',
    '-uno',
  ])

  const biomeGlobs = [
    'src/**/*.ts',
    'tests/**/*.ts',
    'benchmarks/**/*.ts',
    'scripts/**/*.ts',
    '!**/node_modules',
    '!scripts/radashi-db/supabase.types.ts',
  ]
  const prettierGlobs = [
    '**/*.json',
    '**/README.md',
    'docs/**/*',
    'scripts/**/*.sh',
    '!**/node_modules',
  ]

  let biomeFiles = await glob(biomeGlobs)
  let prettierFiles = await glob(prettierGlobs)

  // If arguments were passed, filter the list of files to only include those.
  if (process.argv.length > 2) {
    const filter = process.argv.slice(2).join('|')
    const filterRegex = new RegExp(`^(${filter}.*)`)

    biomeFiles = biomeFiles.filter(file => filterRegex.test(file))
    prettierFiles = prettierFiles.filter(file => filterRegex.test(file))
  }

  // 2. Update the formatting.
  if (biomeFiles.length > 0) {
    await execa(
      'pnpm',
      [
        'biome',
        'check',
        '--diagnostic-level',
        'info',
        '--fix',
        '--unsafe',
        ...biomeFiles,
      ],
      { stdio: 'inherit' },
    ).catch(exit)
  }

  if (prettierFiles.length > 0) {
    await execa('pnpm', ['prettier', '--write', ...prettierFiles], {
      stdio: 'inherit',
    }).catch(exit)
  }

  // 3. Commit if there were no uncommitted changes, but there are now.
  if (!uncommittedChanges) {
    const { stdout: currentChanges } = await execa('git', [
      'status',
      '--porcelain',
      '-uno',
    ])
    if (currentChanges) {
      await execa('git', ['add', '-u'])
      await execa('git', ['commit', '-m', 'chore: format'], {
        stdio: 'inherit',
      })
    }
  }
}

function exit() {
  process.exit(1)
}
