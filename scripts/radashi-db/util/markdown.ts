import MarkdownIt from 'markdown-it'
import mdFrontMatter from 'markdown-it-front-matter'
import { transform } from 'ultrahtml'
import sanitize from 'ultrahtml/transformers/sanitize'
import * as yaml from 'yaml'

interface RenderedPage<Data extends object> {
  text: string
  data: Data | undefined
}

/**
 * Render a markdown page and extract the front matter.
 *
 * If the front matter contains a `title` key, it will be added as a
 * level 1 heading to the top of the rendered markdown.
 */
export async function renderPageMarkdown<Data extends { title?: string }>(
  text: string | null | undefined,
): Promise<RenderedPage<Data> | null> {
  if (text == null) {
    return null
  }

  const markdown = new MarkdownIt({ html: true })

  let data!: Data | undefined
  markdown.use(mdFrontMatter, (text: string) => {
    data = yaml.parse(text)
  })

  try {
    text = markdown.render(text)
    if (data && 'title' in data) {
      text = markdown.render('# ' + data.title + '\n\n') + '\n\n' + text
    }
  } catch (error) {
    if (error instanceof Error) {
      error.message = 'Markdown renderer failed. ' + error.message
    }
    throw error
  }

  if (text) {
    try {
      text = await transform(text, [sanitize({ allowComments: true })])
    } catch (error) {
      if (error instanceof Error) {
        error.message = 'Sanitization failed. ' + error.message
      }
      throw error
    }
  }

  return { text, data }
}
