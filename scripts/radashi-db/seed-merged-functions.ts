import { execa } from 'execa'
import glob from 'fast-glob'
import fs from 'node:fs/promises'
import path from 'node:path'
import { algolia, supabase } from './src/db'
import { renderPageMarkdown } from './src/util/markdown'

async function seedMergedFunctions() {
  const rootDir = new URL('../../', import.meta.url).pathname
  const sourceFiles = await glob(['src/**/*.ts', '!src/*.ts'], { cwd: rootDir })

  for (const sourceFile of sourceFiles) {
    // How romantic.
    const firstDateCmd = await execa(
      'git',
      ['log', '--format=%aI', '--reverse', sourceFile],
      { cwd: rootDir },
    )

    const firstCommitDate = firstDateCmd.stdout.split('\n')[0]
    console.log('Got original commit date', firstCommitDate)

    const firstAuthorCmd = await execa(
      'git',
      ['log', '--format=%an', '--reverse', '--follow', sourceFile],
      { cwd: rootDir },
    )
    const firstCommitAuthor = firstAuthorCmd.stdout.split('\n')[0]
    console.log('Got original commit author', firstCommitAuthor)

    const docFile = sourceFile.replace(/^src/, 'docs').replace(/\.ts$/, '.mdx')
    const docFilePath = path.join(rootDir, docFile)

    let name: string | undefined
    let description: string | undefined
    let documentation: string | undefined
    try {
      interface PageData {
        title: string
        description?: string
      }
      const docContent = await fs.readFile(docFilePath, 'utf-8')
      const renderResult = await renderPageMarkdown<PageData>(docContent)
      if (renderResult) {
        name = renderResult.data?.title
        description = renderResult.data?.description
        documentation = renderResult.text
      }
    } catch (error) {
      console.error(`Error reading or parsing ${docFile}:`, error)
      continue
    }

    name ??= path.basename(sourceFile, '.ts')

    const record = {
      ref: 'radashi-org/radashi#main',
      group: sourceFile.split('/').slice(1, -1).join('/'),
      name,
      description,
      documentation,
      committed_at: firstCommitDate,
      committed_by: firstCommitAuthor,
    }

    console.log('Would insert', record)

    try {
      await supabase.from('merged_functions').insert(record)
      console.log(`Inserted ${name} into Supabase`)
    } catch (error) {
      console.error(`Error inserting ${name} into Supabase:`, error)
    }

    try {
      const index = algolia.initIndex('merged_functions')
      await index.saveObject({
        objectID: name,
        ...record,
      })
      console.log(`Inserted ${name} into Algolia`)
    } catch (error) {
      console.error(`Error inserting ${name} into Algolia:`, error)
    }
  }
}

seedMergedFunctions()
