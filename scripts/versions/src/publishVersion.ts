import { Octokit } from '@octokit/rest'
import { execa } from 'execa'
import glob from 'fast-glob'
import { green } from 'kleur/colors'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import { sift } from 'radashi/array/sift.js'
import { dedent } from './dedent'
import { trackVersion } from './trackVersion'

// This is the commit that Radashi's changelog is based on.
const changelogBaseSha = '2be4acf455ebec86e846854dbab57bd0bfbbceb7'

export async function publishVersion(args: {
  tag?: 'beta' | 'next'
  push: boolean
  gitCliffToken?: string
  npmToken?: string
  radashiBotToken: string
}) {
  const gitCliffBin = './scripts/versions/node_modules/.bin/git-cliff'
  const octokit = new Octokit({ auth: args.radashiBotToken })

  // Determine the last stable version
  const { stdout: stableVersion } = await execa('npm', [
    'view',
    'radashi',
    'version',
  ])
  log(`Last stable version: ${stableVersion}`)

  // Determine the next version
  let nextVersion = await execa(gitCliffBin, ['--bumped-version'], {
    env: { GITHUB_TOKEN: args.gitCliffToken },
  }).then(r => r.stdout.replace(/^v/, ''))
  if (args.tag) {
    const suffix = args.tag === 'beta' ? 'beta' : 'alpha'
    const buildDigest = (await computeBuildDigest()).slice(0, 7)
    nextVersion = `${nextVersion}-${suffix}.${buildDigest}`
  }
  log(`Determined next version: ${nextVersion}`)

  // Check Version
  try {
    await execa('npm', ['view', `radashi@${nextVersion}`], {
      stdio: 'ignore',
    })
    log(`🚫 Version ${nextVersion} already exists`)
    process.exit(1)
  } catch {
    log(`🟢 Version ${nextVersion} is available`)
  }

  // Find all commits after this tag with a PR number in the message.
  const latestTag = args.tag
    ? await execa('git', ['describe', '--tags', '--abbrev=0']).then(
        r => r.stdout,
      )
    : 'v' + stableVersion

  const { stdout: latestTagSha } = await execa('git', ['rev-parse', latestTag])
  log(`Latest tag: ${latestTag} (${latestTagSha.slice(0, 7)})`)

  // Set up git user in CI environment
  if (process.env.CI) {
    if (process.env.GITHUB_ACTOR) {
      await execa('git', ['config', 'user.name', process.env.GITHUB_ACTOR])
      await execa('git', [
        'config',
        'user.email',
        `${process.env.GITHUB_ACTOR}@users.noreply.github.com`,
      ])
    } else {
      console.error('GITHUB_ACTOR is not set')
      process.exit(1)
    }
  }

  // Generate Changelog
  log(`Generating changelog from ${changelogBaseSha.slice(0, 7)} to HEAD`)
  const gitCliffArgs = [`${changelogBaseSha}..HEAD`, '-o', 'CHANGELOG.md']
  if (!args.tag) {
    gitCliffArgs.push('--tag', `v${nextVersion}`)
  }
  await execa(gitCliffBin, gitCliffArgs, {
    env: { GITHUB_TOKEN: args.gitCliffToken },
  })

  // Commit files
  const committedFiles = ['CHANGELOG.md']
  if (!args.tag) {
    // Only commit the changed version in package.json if it's a
    // stable version being published.
    committedFiles.push('package.json')
  }
  log('Committing:', committedFiles)
  await execa('git', ['add', ...committedFiles])
  await execa('git', ['commit', '-m', `chore(release): ${nextVersion}`], {
    stdio: 'inherit',
  })

  // Push to origin
  if (args.push) {
    log('Pushing to origin')
    await execa('git', ['push'], { stdio: 'inherit' })
  } else {
    log('Would have pushed to origin, but --no-push was set')
  }

  // Create or update a tag
  const gitTag = args.tag ?? `v${nextVersion}`
  if (args.push) {
    if (args.tag) {
      log(`Updating ${gitTag} tag`)
      await execa('git', ['tag', gitTag, '-f'])
      await execa('git', ['push', 'origin', gitTag, '-f'], {
        stdio: 'inherit',
      })
    } else {
      log('Pushing new tag')
      await execa('git', ['tag', gitTag])
      await execa('git', ['push', 'origin', gitTag], {
        stdio: 'inherit',
      })
    }
  } else {
    log('Would have pushed a tag, but --no-push was set')
  }

  const { stdout: currentSha } = await execa('git', ['rev-parse', 'HEAD'])
  log(`Current SHA is ${currentSha}`)

  // Track Version in Database
  if (args.push) {
    await trackVersion(nextVersion, currentSha, log)
  } else {
    log('Would have tracked version in database, but --no-push was set')
  }

  log('Setting package.json version')
  await execa('npm', ['version', nextVersion, '--no-git-tag-version'], {
    stdio: 'inherit',
  })

  // Publish to NPM
  log('Publishing to NPM' + (args.push ? '' : ' (dry run)'))
  const npmPublishArgs = ['publish', '--ignore-scripts']
  if (args.tag) {
    npmPublishArgs.push('--tag', args.tag)
  }
  if (!args.push) {
    npmPublishArgs.push('--dry-run')
  }
  await execa('npm', npmPublishArgs, {
    env: { NODE_AUTH_TOKEN: args.npmToken },
    stdio: 'inherit',
  })

  log('Updating version in deno.json')
  const denoJson = {
    ...JSON.parse(await fs.readFile('deno.json', 'utf8')),
    version: nextVersion,
  }
  await fs.writeFile('deno.json', JSON.stringify(denoJson, null, 2))

  log('Publishing to JSR.io')
  await execa('pnpm', ['dlx', 'jsr', 'publish', '--allow-dirty'], {
    stdio: 'inherit',
  }).catch(error => {
    // Don't exit early if JSR publish fails
    console.error('Failed to publish to JSR:', error)
  })

  const prNumbers = await getPrNumbers(`${latestTagSha}..${currentSha}`)
  log(
    'PR numbers in %s..%s range:',
    latestTagSha.slice(0, 7),
    currentSha.slice(0, 7),
    prNumbers.join(', '),
  )

  // Comment on Pull Requests
  if (args.push) {
    for (const prNumber of prNumbers) {
      const adjective = args.tag ? 'pre-release' : 'stable'

      let body = dedent`
        A ${adjective} version \`${nextVersion}\` has been published to NPM. :rocket:

        To install:
        \`\`\`sh
        pnpm add radashi@${nextVersion}
        \`\`\`
      `

      if (args.tag) {
        body += dedent`
          \n
          The \`radashi@${args.tag}\` tag also includes this PR.
        `
      }

      body += dedent`
        \n
        <a href="https://github.com/radashi-org/radashi/compare/v${stableVersion}...${currentSha}">
          <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/changes-button.png" alt="See the changes" width="250px" />
        </a>
      `

      // Find and delete existing comment by radashi-bot
      const existingComments = await octokit.issues.listComments({
        owner: 'radashi-org',
        repo: 'radashi',
        issue_number: +prNumber,
        per_page: 100,
      })

      const botComment = existingComments.data.find(
        comment =>
          comment.user &&
          (comment.user.login === 'radashi-bot' ||
            comment.user.login === 'github-actions[bot]') &&
          comment.body?.includes('published to NPM'),
      )

      if (botComment) {
        await octokit.issues.deleteComment({
          owner: 'radashi-org',
          repo: 'radashi',
          comment_id: botComment.id,
        })
      }

      // Create new comment
      await octokit.issues.createComment({
        owner: 'radashi-org',
        repo: 'radashi',
        issue_number: +prNumber,
        body,
      })
    }
  }
}

function log(msg: string, ...args: any[]) {
  console.log(green('• ' + msg), ...args)
}

async function computeBuildDigest() {
  const files = await glob(['dist/**/*', 'package.json'])
  const fileHashes = await Promise.all(
    files.map(async file => {
      const content = await fs.readFile(file)
      return crypto.createHash('sha256').update(content).digest('hex')
    }),
  )
  return crypto.createHash('sha256').update(fileHashes.join('')).digest('hex')
}

async function getPrNumbers(range: string) {
  // cSpell:ignore oneline
  const { stdout: gitLog } = await execa('git', ['log', '--oneline', range])
  return sift(gitLog.split('\n').map(line => line.match(/\(#(\d+)\)$/)?.[1]))
}
