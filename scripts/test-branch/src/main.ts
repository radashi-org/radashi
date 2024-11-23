import { execa } from 'execa'
import { parseModule } from 'meriyah'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { glob } from 'tinyglobby'

main()

async function main() {
  const changedFiles = await getChangedFiles()

  // If a test file was changed, its source file will also be
  // collected. Likewise, if a source file was changed, its test file
  // will be collected. Test files are collected for Vitest to use as
  // a test filter. Source files are collected for coverage filtering.
  const sourceFiles = new Set<string>()
  const testFiles = new Set<string>()

  // First pass: collect initial source and test files
  for (const file of changedFiles) {
    if (file.startsWith('src/')) {
      addSourceFile(file, sourceFiles, testFiles)
    }
  }

  // Recursive search for dependent functions. Their source files need
  // to be tested, in case they are affected by changes to their
  // dependencies.
  for (const file of sourceFiles) {
    const funcName = path.basename(file, '.ts')

    const importers = await findImporters(funcName)
    for (const importer of importers) {
      if (!sourceFiles.has(importer)) {
        // If a source file is added by this call, it too will be
        // processed by the sourceFiles loop we're in.
        addSourceFile(importer, sourceFiles, testFiles)
      }
    }
  }

  // Test files need their source files included in coverage, so we
  // need to add them to sourceFiles before building the coverage
  // arguments. Also, we explicitly avoid adding importers of these
  // source files, since only the test has changed.
  for (const file of changedFiles) {
    if (file.startsWith('tests/')) {
      testFiles.add(file)
      sourceFiles.add(file.replace('tests', 'src').replace('.test.ts', '.ts'))
    }
  }

  // Build coverage arguments
  const coverageArgs = ['--coverage']
  sourceFiles.forEach(file => {
    coverageArgs.push(`--coverage.include=${file}`)
  })

  // Run vitest with the collected files
  const args = [
    ...Array.from(testFiles),
    ...coverageArgs,
    ...process.argv.slice(2),
  ]

  process.env.PATH = `${process.cwd()}/node_modules/.bin:${process.env.PATH}`

  await execa('vitest', args, {
    stdio: 'inherit',
  })
}

/**
 * Get the list of changed files relative to the main branch.
 */
async function getChangedFiles(): Promise<string[]> {
  const { stdout } = await execa('git', [
    'diff',
    'main..HEAD',
    '--name-only',
    '--',
    'src/**/*.ts',
    'tests/**/*.test.ts',
    '!src/*.ts',
  ])
  return stdout.split('\n').filter(Boolean)
}

/**
 * Add a source file to the set of source files and its corresponding
 * test file to the set of test files.
 */
function addSourceFile(
  sourceFile: string,
  sourceFiles: Set<string>,
  testFiles: Set<string>,
): void {
  sourceFiles.add(sourceFile)
  testFiles.add(sourceFile.replace('src', 'tests').replace('.ts', '.test.ts'))
}

/**
 * Scan all source files for imports of the given function name.
 */
async function findImporters(funcName: string): Promise<string[]> {
  const files = await glob('./src/**/*.ts')
  const importers: string[] = []

  for (const file of files) {
    try {
      const content = await readFile(file, 'utf-8')
      const ast = parseModule(content, {
        next: true,
      })

      const hasImport = ast.body.some(
        node =>
          node.type === 'ImportDeclaration' &&
          node.specifiers.some(
            spec =>
              spec.type === 'ImportSpecifier' &&
              spec.imported.type === 'Identifier' &&
              spec.imported.name === funcName,
          ),
      )

      if (hasImport) {
        importers.push(file)
      }
    } catch (error) {
      // Skip files that can't be parsed
      console.error(`Could not parse ${file}`)
    }
  }

  return importers
}
