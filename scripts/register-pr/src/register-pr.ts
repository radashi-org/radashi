import path from 'node:path'
import { algolia } from 'radashi-db/algolia.ts'
import { supabase, type TablesInsert } from 'radashi-db/supabase.ts'
import { memo } from 'radashi/curry/memo.ts'
import { renderPageMarkdown } from './markdown.ts'

type PrFileStatus =
  | 'added'
  | 'removed'
  | 'modified'
  | 'renamed'
  | 'copied'
  | 'changed'
  | 'unchanged'

type PrStatus = 'draft' | 'open' | 'merged' | 'closed'

interface PrFile {
  status: PrFileStatus
  filename: string
  sha: string
}

export interface Commit {
  sha: string
  date: string | undefined
  author: string | undefined
}

interface Context {
  sha: string
  /**
   * The branch name (e.g. "main")
   *
   * @default "main"
   */
  branch?: string
  /**
   * The owner name (e.g. "radashi-org" or your GitHub username)
   *
   * @default "radashi-org"
   */
  owner?: string
  ownerAvatarUrl?: string
  /**
   * The repository name (e.g. "radashi")
   *
   * @default "radashi"
   */
  repo?: string
  status: PrStatus
  breaking: boolean
  checksPassed: boolean
  files: PrFile[]
  getCommit: (ref: string, owner?: string, repo?: string) => Promise<Commit>
  getFileContent: (file: string) => Promise<string>
  getApprovalRating: () => Promise<number>
  getIssueBody: () => Promise<string | null>
  console?: Pick<Console, 'log' | 'error'>
}

/**
 * Register a pull request with the Radashi database.
 *
 * @param prNumber - The pull request number.
 * @param context - The context object containing PR information.
 */
export const registerPullRequest = async (
  prNumber: number,
  context: Context,
): Promise<void> => {
  const { console = globalThis.console } = context
  const getCommit = memo(context.getCommit)

  try {
    const newFunctions = context.files.filter(
      file =>
        file.status === 'added' &&
        file.filename.startsWith('src/') &&
        file.filename.endsWith('.ts') &&
        !file.filename.endsWith('.test.ts'),
    )

    if (newFunctions.length === 0) {
      console.log('No new functions added in this PR.')
      return
    }

    const newFunctionNames = newFunctions.map(f =>
      path.basename(f.filename, '.ts'),
    )

    console.log(`Fetching existing functions for PR #${prNumber}`)
    const { data: existingFunctions, error: fetchError } = await supabase
      .from('proposed_functions')
      .select('name')
      .eq('pr_number', prNumber)

    if (fetchError) {
      console.error('Error fetching existing functions:', fetchError)
      return
    }

    const existingFunctionNames = existingFunctions.map(f => f.name)

    for (const name of existingFunctionNames) {
      if (!newFunctionNames.includes(name)) {
        console.log(`Deleting ${name}#${prNumber} from Radashi database`)
      }

      await supabase
        .from('proposed_functions')
        .delete()
        .match({ pr_number: prNumber, name })
    }

    let body: string | null | undefined
    let approvalRating: number | null = null

    for (const file of newFunctions) {
      const name = path.basename(file.filename, '.ts')

      if (context.status === 'merged') {
        if (!existingFunctionNames.includes(name)) {
          console.log(`Deleting ${name}#${prNumber} from Radashi database`)

          await supabase
            .from('proposed_functions')
            .delete()
            .match({ pr_number: prNumber, name })

          // Delete from Algolia
          if (process.env.ALGOLIA_KEY) {
            const index = algolia.initIndex('proposed_functions')

            try {
              console.log(`Deleting ${name}#${prNumber} from Algolia index`)
              await index.deleteObject(`${name}#${prNumber}`)
            } catch (error) {
              console.error(
                `Error deleting ${name}#${prNumber} from Algolia:`,
                error,
              )
            }
          }
        }
        continue
      }

      const docFilename = file.filename
        .replace(/^src/, 'docs')
        .replace(/\.ts$/, '.mdx')

      let documentation: string | null = null
      try {
        documentation = await context.getFileContent(docFilename)
      } catch {
        console.log(`Documentation file not found for ${name}#${prNumber}`)
      }

      let description: string | null = null

      if (documentation == null) {
        if (body === undefined) {
          body = await context.getIssueBody()
        }

        if (body !== null) {
          console.log(`Falling back to PR body for ${name}#${prNumber}`)

          const sections = body.split(/^(#+\s+)/m)
          const summaryIndex = sections.findIndex(
            (_section, index) =>
              index % 2 === 1 &&
              /^(Summary|Description)\b/.test(sections[index + 1]),
          )
          if (summaryIndex !== -1) {
            const summaryDepth = sections[summaryIndex].trim().length
            const summaryContent = sections
              .slice(summaryIndex + 1)
              .join('')
              .split(new RegExp(`^#{1,${summaryDepth}}\\s+`, 'm'))[0]
              .trim()

            documentation = summaryContent
          } else {
            console.log(
              `No "Summary" or "Description" section found in PR body for ${name}#${prNumber}`,
            )
          }
        }
      }

      if (documentation) {
        interface PageData {
          title: string
          description?: string
        }
        const renderResult = await renderPageMarkdown<PageData>(documentation)
        if (renderResult) {
          documentation = renderResult.text
          if (renderResult.data?.description) {
            description = renderResult.data.description
          }
        }
      }

      if (approvalRating === null) {
        try {
          approvalRating = await context.getApprovalRating()
        } catch (error) {
          console.error(
            `Error getting approval rating for ${name}#${prNumber}:`,
            error,
          )
          approvalRating = 0
        }
      }

      const commit = await getCommit(context.sha, context.owner, context.repo)

      const record: TablesInsert<'proposed_functions'> = {
        ref: `${context.owner ?? 'radashi-org'}/${context.repo ?? 'radashi'}#${context.branch ?? 'main'}`,
        group: file.filename.split('/').slice(1, -1).join('/'),
        name,
        pr_number: prNumber,
        approval_rating: approvalRating,
        documentation,
        status: context.status,
        breaking: context.breaking,
        description,
        committed_at: commit?.date,
        committed_by: commit?.author,
        checks_passed: context.checksPassed,
        pr_author:
          context.owner && context.ownerAvatarUrl
            ? { login: context.owner, avatar_url: context.ownerAvatarUrl }
            : undefined,
      }

      const { error } = await supabase.from('proposed_functions').insert(record)

      if (error) {
        console.error(
          `Error inserting ${name}#${prNumber} into Supabase:`,
          error,
        )
      } else {
        console.log(`Successfully registered ${name}#${prNumber} in Supabase`)
      }

      // Insert record into Algolia
      if (process.env.ALGOLIA_KEY) {
        try {
          const index = algolia.initIndex('proposed_functions')

          const algoliaRecord = {
            objectID: `${name}#${prNumber}`,
            ...record,
          }

          await index.saveObject(algoliaRecord)
          console.log(`Successfully indexed ${name}#${prNumber} in Algolia`)
        } catch (algoliaError) {
          console.error(
            `Error indexing ${name}#${prNumber} in Algolia:`,
            algoliaError,
          )
        }
      }
    }
  } catch (error) {
    console.error('Error processing PR:', error)
  }
}
