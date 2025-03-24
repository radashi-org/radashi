import fs from 'node:fs'
import { Anthropic } from '@anthropic-ai/sdk'
import { Octokit, type RestEndpointMethodTypes } from '@octokit/rest'
import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import { execa } from 'execa'
import type mri from 'mri'
import { dedent } from 'radashi/string/dedent.ts'
import { isNumber } from 'radashi/typed/isNumber.ts'

export async function generateNextMinorReleaseNotes(argv: mri.Argv) {
  const { anthropicApiKey, githubToken } = verifyEnvVars({
    anthropicApiKey: 'ANTHROPIC_API_KEY',
    githubToken: 'GITHUB_TOKEN',
  })

  const version = JSON.parse(fs.readFileSync('package.json', 'utf8')).version
  const [major, prevMinor] = version.split('.')

  const nextVersion = `${major}.${+prevMinor + 1}.0`

  const content = fs.readFileSync('.github/next-minor.md', 'utf8')
  const lines = content.split('\n')

  interface Change {
    section: string
    title: string
    url: string
  }

  const changes: Change[] = []

  let section: string | null = null
  let title: string | null = null

  for (const line of lines) {
    if (line.startsWith('## ')) {
      section = line.slice(2).trim()
    } else if (section && line.startsWith('#### ')) {
      title = line.slice(4).trim()
    } else if (section && title && line.startsWith('http')) {
      changes.push({
        section,
        title,
        url: line.trim(),
      })
      title = null
    }
  }

  let octokit: Octokit | undefined

  type OctokitCommitArray =
    RestEndpointMethodTypes['pulls']['listCommits']['response']['data']

  const cachedCommits = new Map<number, OctokitCommitArray>()

  async function addAuthor(
    prNumber: number,
    authors: Set<string>,
    [, name, email]: string[],
  ) {
    if (!email) {
      if (name) {
        authors.add(name)
      }
      return
    }

    let username: string | undefined

    if (email.endsWith('@users.noreply.github.com')) {
      username = email.split('@')[0].replace(/^\d+\+/, '')
    } else if (!githubToken) {
      throw new Error('Cannot look up author without GitHub token')
    } else {
      octokit ||= new Octokit({ auth: githubToken })

      let commits = cachedCommits.get(prNumber)
      if (!commits) {
        const response = await octokit.rest.pulls.listCommits({
          owner: 'radashi-org',
          repo: 'radashi',
          pull_number: prNumber,
        })
        commits = response.data
        cachedCommits.set(prNumber, commits)
        if (argv.debug) {
          console.dir(commits, { depth: null })
        }
      }

      username = commits.find(commit => commit.commit.author?.email === email)
        ?.author?.login

      if (!username) {
        authors.add(name)
        return
      }
    }

    authors.add(`[${name}](https://github.com/${username})`)
  }

  const anthropic = new Anthropic({
    apiKey: anthropicApiKey,
  })

  let notes = ''

  section = null

  for (const change of changes) {
    const prNumber = change.url.match(/\/pull\/(\d+)/)?.[1]
    if (!prNumber) {
      throw new Error(`Expected PR number in ${change.url}`)
    }

    if (argv.debug && isNumber(argv.debug) && argv.debug !== +prNumber) {
      continue
    }

    const { stdout: commit } = await execa('git', [
      'log',
      '--format=%H',
      '--grep',
      `(#${prNumber})$`,
      '-n',
      '1',
    ])

    if (!commit) {
      throw new Error(`Expected commit for PR ${prNumber}`)
    }

    const { stdout: diff } = await execa('git', [
      'show',
      `${commit}`,
      '--',
      'src',
      'docs',
    ])

    const authors = new Set<string>()
    await addAuthor(
      +prNumber,
      authors,
      diff.match(/^Author: +([^<]+) +<([^>]+)>/m) || [],
    )
    for (const coAuthor of diff.matchAll(
      /^ *Co-authored-by: +([^<]+) +<([^>]+)>/gm,
    )) {
      await addAuthor(+prNumber, authors, coAuthor)
    }

    if (argv.debug) {
      console.log({ prNumber, commit, authors })
      console.log(
        diff
          .replace(
            /^([-+].+?)([ \t]+)$/gm,
            (_, content, whitespace) => content + '█'.repeat(whitespace.length),
          )
          .replace(/^(\+[^+].*)/gm, '\x1b[32m$1\x1b[0m')
          .replace(/^(-[^-].*)/gm, '\x1b[31m$1\x1b[0m'),
      )
      // process.exit(0)
    }

    if (section !== change.section) {
      section = change.section
      notes += `## ${section}\n\n`
    }

    let prompt: string

    switch (section) {
      case 'New Functions':
        notes += `### Add \`${change.title}\` function [→ PR #${prNumber}](${change.url})\n\n`
        prompt = dedent`
          Briefly explain the new function's purpose in the first paragraph.
          If the function isn't simple, you may list more details (i.e. limitations,
          options, etc.) in a bulleted list after the first paragraph. Try to be concise.
          You don't have to mention every detail, as we link to the documentation page.
        `
        break
      case 'New Features':
        notes += `### ${change.title} [→ PR #${prNumber}](${change.url})\n\n`
        prompt = dedent`
          Briefly explain what the new feature is in the first paragraph.
          If the feature isn't simple, you may list more details (i.e. limitations,
          options, etc.) in a bulleted list after the first paragraph. Try to be concise.
        `
        break
      default:
        throw new Error(`Unknown section: ${section}`)
    }

    prompt = dedent`
      ${prompt}
      Finally, write a code block containing an example of how to use the new
      function. Keep the example straight-forward and add comments if necessary.
      Use \`import * as _ from 'radashi'\` to import the function.
      Do not include headings anywhere in your response.

      Use the git diff below to write the release notes.

      <diff>
        ${diff}
      </diff>
    `

    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const textBlock = response.content.find(block => block.type === 'text')!
    notes += textBlock.text + '\n\n'

    const renderCommaSeparatedList = <T>(items: T[]) =>
      items.length === 1
        ? items[0]
        : items.slice(0, -1).join(', ') +
          (items.length > 2 ? ',' : '') +
          ` and ${items.at(-1)}`

    notes += `Thanks to ${renderCommaSeparatedList([
      ...authors,
    ])} for their work on this feature!\n\n`

    if (section === 'New Functions') {
      const { stdout: addedFiles } = await execa('git', [
        'diff-tree',
        '--no-commit-id',
        '--name-only',
        '-r',
        '--diff-filter=A',
        commit,
        '--',
        'src',
      ])

      const slug = addedFiles
        .split('\n')[0]
        .replace(/^src\//, '')
        .replace(/\.ts$/, '')

      notes += `🔗 [Docs](https://radashi.js.org/reference/${slug}) / [Source](https://github.com/radashi-org/radashi/blob/main/src/${slug}.ts) / [Tests](https://github.com/radashi-org/radashi/blob/main/tests/${slug}.test.ts)\n\n`
    }

    fs.writeFileSync('notes.md', notes)
  }
}
