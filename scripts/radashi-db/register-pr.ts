import { createClient } from '@supabase/supabase-js'
import MarkdownIt from 'markdown-it'
import mdFrontMatter from 'markdown-it-front-matter'
import path from 'node:path'
import { memo } from 'radashi'
import { transform } from 'ultrahtml'
import sanitize from 'ultrahtml/transformers/sanitize'
import * as yaml from 'yaml'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
)

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
   * The owner name (e.g. "radashi-org" or your GitHub username)
   *
   * @default "radashi-org"
   */
  owner?: string
  /**
   * The repository name (e.g. "radashi")
   *
   * @default "radashi"
   */
  repo?: string
  status: PrStatus
  breaking: boolean
  files: PrFile[]
  getCommit: (ref: string, owner: string, repo: string) => Promise<Commit>
  getFileContent: (file: string) => Promise<string>
  thumbs: number | (() => Promise<number>)
  body: string | (() => Promise<string | null>)
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
        file.filename.endsWith('.ts'),
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
    let thumbsCount: number | null = null

    for (const file of newFunctions) {
      const name = path.basename(file.filename, '.ts')

      if (context.status === 'merged') {
        if (!existingFunctionNames.includes(name)) {
          console.log(`Deleting ${name}#${prNumber} from Radashi database`)
          await supabase
            .from('proposed_functions')
            .delete()
            .match({ pr_number: prNumber, name })
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
          body =
            typeof context.body === 'function'
              ? await context.body()
              : context.body
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
        const markdown = new MarkdownIt({ html: true })

        let metadata: any = null
        markdown.use(mdFrontMatter, (text: string) => {
          metadata = yaml.parse(text)
        })

        try {
          documentation = markdown.render(documentation)
          console.log('Front matter =>', metadata)
          if (metadata?.title) {
            documentation =
              markdown.render('# ' + metadata.title + '\n\n') +
              '\n\n' +
              documentation
          }
          if (metadata?.description) {
            description = metadata.description
          }
        } catch (error) {
          console.error(
            `Markdown renderer failed for ${name}#${prNumber}:`,
            error,
          )
          documentation = null
        }
      }

      if (documentation) {
        try {
          documentation = await transform(documentation, [
            sanitize({ allowComments: true }),
          ])
        } catch (error) {
          console.error(`Sanitization failed for ${name}#${prNumber}:`, error)
          documentation = null
        }
      }

      if (thumbsCount === null) {
        try {
          thumbsCount =
            typeof context.thumbs === 'function'
              ? await context.thumbs()
              : context.thumbs
        } catch (error) {
          console.error(
            `Error getting thumbs count for ${name}#${prNumber}:`,
            error,
          )
          thumbsCount = 0
        }
      }

      const commit = await getCommit(context.sha, context.owner, 'radashi')

      const { error } = await supabase.from('proposed_functions').insert({
        name,
        pr_number: prNumber,
        approval_rating: thumbsCount,
        documentation,
        status: context.status,
        breaking: context.breaking,
        description,
        committed_at: commit?.date,
        committed_by: commit?.author,
      })

      if (error) {
        console.error(`Error inserting ${name}#${prNumber}:`, error)
      } else {
        console.log(`Successfully registered ${name}#${prNumber}`)
      }
    }
  } catch (error) {
    console.error('Error processing PR:', error)
  }
}
