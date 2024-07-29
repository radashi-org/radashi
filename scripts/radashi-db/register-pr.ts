import { createClient } from '@supabase/supabase-js'
import MarkdownIt from 'markdown-it'
import path from 'node:path'
import { transform } from 'ultrahtml'
import sanitize from 'ultrahtml/transformers/sanitize'

const markdown = new MarkdownIt()

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
}

interface Console {
  log: (message: string) => void
  error: (message: string, error?: unknown) => void
}

interface Context {
  sha: string
  status: PrStatus
  files: PrFile[]
  read: (file: string) => Promise<string>
  thumbs: number | (() => Promise<number>)
  body: string | (() => Promise<string | null | undefined>)
  console?: Console
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

    let thumbsCount: number | null = null

    for (const file of newFunctions) {
      const functionName = path.basename(file.filename, '.ts')

      if (context.status === 'merged') {
        console.log(
          `Deleting ${functionName}#${prNumber} from Radashi database`,
        )
        await supabase
          .from('proposed_functions')
          .delete()
          .match({ pr_number: prNumber, name: functionName })
        continue
      }

      const docFilename = file.filename
        .replace(/^src/, 'docs')
        .replace(/\.ts$/, '.mdx')

      let documentation: string | null = null
      try {
        documentation = await context.read(docFilename)
      } catch {
        console.log(
          `Documentation file not found for ${functionName}#${prNumber}`,
        )

        const body =
          typeof context.body === 'function'
            ? await context.body()
            : context.body

        if (body != null) {
          console.log(`Falling back to PR body for ${functionName}#${prNumber}`)

          const sections = body.split(/^(#+\s+)/m)
          const summaryIndex = sections.findIndex(
            (_section, index) =>
              index % 2 === 1 && sections[index + 1].startsWith('Summary'),
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
              `No "Summary" section found in PR body for ${functionName}#${prNumber}`,
            )
          }
        }
      }

      if (documentation) {
        try {
          documentation = markdown.render(documentation)
        } catch (error) {
          console.error(
            `Markdown renderer failed for ${functionName}#${prNumber}:`,
            error,
          )
          documentation = null
        }
      }

      if (documentation) {
        try {
          documentation = await transform(documentation, [sanitize()])
        } catch (error) {
          console.error(
            `Sanitization failed for ${functionName}#${prNumber}:`,
            error,
          )
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
            `Error getting thumbs count for ${functionName}#${prNumber}:`,
            error,
          )
          thumbsCount = 0
        }
      }

      const { error } = await supabase.from('proposed_functions').insert({
        name: functionName,
        pr_number: prNumber,
        approval_rating: thumbsCount,
        documentation,
        status: context.status,
      })

      if (error) {
        console.error(`Error inserting ${functionName}#${prNumber}:`, error)
      } else {
        console.log(`Successfully registered ${functionName}#${prNumber}`)
      }
    }
  } catch (error) {
    console.error('Error processing PR:', error)
  }
}
