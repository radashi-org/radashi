import { Anthropic } from '@anthropic-ai/sdk'
import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import { execa } from 'execa'
import mri from 'mri'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { uid } from 'radashi/random/uid.ts'
import { dedent } from './util/dedent.ts'

main()

async function main() {
  const argv = mri(process.argv.slice(2))
  const outFile = argv.o || argv.output
  const limit = argv.limit ? +argv.limit : Number.POSITIVE_INFINITY

  if (!outFile && !argv.publish) {
    console.error('Error: No --output file or --publish flag provided')
    process.exit(1)
  } else if (outFile && argv.publish) {
    console.error('Error: Cannot use --output file and --publish flag together')
    process.exit(1)
  }

  const { anthropicApiKey, githubToken } = verifyEnvVars({
    anthropicApiKey: 'ANTHROPIC_API_KEY',
    githubToken: !!argv.publish && 'GITHUB_TOKEN',
  })

  const version: string = JSON.parse(
    fs.readFileSync('package.json', 'utf8'),
  ).version

  log('Generating release notes for v' + version)

  /**
   * If no commit ref is provided, use the latest two tags.
   */
  let commitRange: string
  if (argv._.length) {
    commitRange = 'v' + version + '..' + argv._[0]
  } else {
    const tags = await execa('git', [
      'tag',
      '--format=%(refname:short)',
      '--sort=-version:refname',
      '-n',
      'v*',
    ]).then(result =>
      result.stdout
        .split('\n')
        .filter(tag => !tag.includes('-'))
        .slice(0, 2),
    )

    const [currentVersion, previousVersion] = tags
    commitRange = previousVersion + '..' + currentVersion
  }

  const commits = await execa('git', [
    'log',
    '--format=%H %s',
    commitRange,
  ]).then(result =>
    result.stdout
      .trim()
      .split('\n')
      .map(line => {
        const [, sha, message] = /^(\w+) (.+)$/.exec(line)!
        return { sha, message, diff: '' }
      }),
  )

  log('Grouping commits and fetching diffs...')

  const sections = getSections()
  for (const commit of commits) {
    for (const section of sections) {
      if (
        section.match.test(commit.message) &&
        !section.exclude?.test(commit.message)
      ) {
        const diff = await execa('git', [
          'log',
          '-p',
          commit.sha + '^..' + commit.sha,
          'src',
          'docs',
        ])
        commit.diff = diff.stdout
        section.commits ??= []
        section.commits.push(commit)
      }
    }
  }

  const anthropic = new Anthropic({
    apiKey: anthropicApiKey,
  })

  for (const section of sections) {
    if (!section.commits?.length) {
      continue
    }

    log('Generating release notes for', section.name)

    section.commits.length = Math.min(section.commits.length, limit)
    section.notes = ''

    const chunkSize = 4

    for (let offset = 0; offset < section.commits.length; offset += chunkSize) {
      log(`${section.commits.length - offset} commits left`)

      const linkLocation =
        section.noun === 'feature' || section.noun === 'fix'
          ? 'immediately after the heading'
          : 'at the end'

      const rules = [
        `You're tasked with writing in-depth release notes (using Markdown) in a professional tone.`,
        'Never converse with me.',
        'Always mention every change I give you.',
        `Always link to the relevant PR (or the commit if there's no PR) ${linkLocation} of each ${section.noun} in a format like "[→ PR #110](…)" or "[→ commit {short-hash}](…)". The GitHub URL is "https://github.com/radashi-org/radashi".`,
        `Never include headings like "Release Notes" or "v1.0.0".`,
        ...section.rules(section.noun),
      ]

      log('Sending request to Anthropic...')

      const response = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: dedent`
              - ${rules.join('\n- ')}

              The following changes are from \`git log -p\`:

              <changes>
              ${section.commits
                .slice(offset, offset + chunkSize)
                .map(commit => commit.diff)
                .join('\n\n')}
              </changes>
            `,
          },
        ],
      })

      const [message] = response.content
      if (message.type !== 'text') {
        console.error('Expected a text message, got:', message)
        process.exit(1)
      }

      section.notes += message.text.trim() + '\n\n'
    }
  }

  let notes = sections
    .filter(section => section.notes)
    .map(section => `## ${section.name}\n\n${section.notes}`)
    .join('\n\n')

  const tmpFile = path.join(os.tmpdir(), 'release-notes.' + uid(20) + '.md')
  fs.writeFileSync(tmpFile, notes)

  try {
    const editor = await getPreferredEditor()
    log('Opening', tmpFile, 'with', editor)

    // Open the generated release notes in the user's preferred text editor
    await execa(editor, [tmpFile], { stdio: 'inherit' })

    // Read the potentially modified content after the editor is closed
    notes = fs.readFileSync(tmpFile, 'utf-8')
  } finally {
    fs.unlinkSync(tmpFile)
  }

  if (argv.publish) {
    const { Octokit } = await import('@octokit/rest')

    const octokit = new Octokit({
      auth: githubToken,
    })

    log('Publishing release notes for version', version)

    try {
      await octokit.rest.repos.createRelease({
        owner: 'radashi-org',
        repo: 'radashi',
        tag_name: `v${version}`,
        name: `v${version}`,
        body: notes,
        draft: !!argv.draft,
        prerelease: !!argv.prerelease,
      })

      log('Successfully published release notes to GitHub')
    } catch (error) {
      console.error('Failed to publish release notes:', error)
      process.exit(1)
    }
  } else {
    fs.writeFileSync(outFile, notes)
    log('Saved release notes to', path.resolve(outFile))
  }
}

function getSections(): Section[] {
  const getFormattingRules = (noun: string) => [
    `Use an H4 (####) for the heading of each ${noun}.`,
    'Headings must be in sentence case.',
    noun === 'feature' &&
      `Each heading must describe what the ${noun} enables, not simply what the change is (e.g. "Allow throttled function to be triggered immediately" instead of "Add trigger method to throttle function").`,
    'Be concise but not vague.',
    'Omit prefixes like "Fix:" from headings.',
    `The paragraph(s) after each heading must describe the ${noun} in more detail (but be brief where possible).`,
  ]

  const getCodeExampleRules = (noun: string) => [
    `Every ${noun} needs a concise code example to showcase it.`,
    'Never preface examples with "Example:" or similar.',
    dedent`
      In each example, import the functions or types like this:
        \`\`\`ts
        import { sum } from 'radashi'
        \`\`\`
    `,
  ]

  const getBulletedListRules = (noun: string) => [
    `Describe each ${noun} in a bulleted list, without being vague.`,
    'Never use headings.',
    'Only give me the bulleted list. No prefacing like “Here are the changes” or similar.',
  ]

  return [
    {
      name: 'Features',
      match: /^feat/,
      exclude: /\((types|perf)\)/,
      noun: 'feature',
      rules: noun => [
        ...getFormattingRules(noun),
        ...getCodeExampleRules(noun),
      ],
    },
    {
      name: 'Bug Fixes',
      match: /^fix/,
      exclude: /\((types|perf)\)/,
      noun: 'fix',
      rules: noun => [
        ...getFormattingRules(noun),
        ...getCodeExampleRules(noun),
      ],
    },
    {
      name: 'Performance',
      match: /^(perf|\w+\(perf\))/,
      noun: 'improvement',
      rules: noun => [...getBulletedListRules(noun)],
    },
    {
      name: 'Types',
      match: /^(fix|feat)\(types\)/,
      noun: 'change',
      rules: noun => [...getBulletedListRules(noun)],
    },
  ]
}

function log(message: string, ...args: any[]) {
  console.log('• ' + message, ...args)
}

async function getPreferredEditor() {
  const { stdout: gitEditor } = await execa('git', [
    'config',
    '--global',
    'core.editor',
  ])
  return gitEditor.trim() || process.env.EDITOR || 'nano'
}

type Section = {
  name: string
  match: RegExp
  exclude?: RegExp
  noun: string
  rules: (noun: string) => (string | false)[]
  commits?: Commit[]
  notes?: string
}

type Commit = {
  sha: string
  message: string
  diff: string
}
