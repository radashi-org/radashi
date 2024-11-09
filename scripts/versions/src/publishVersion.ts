import { Octokit } from '@octokit/rest'
import { execa } from 'execa'
import glob from 'fast-glob'
import { green } from 'kleur/colors'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { sift } from 'radashi/array/sift.js'
import { dedent } from './dedent'
import { trackVersion } from './trackVersion'

// This is the commit that Radashi's changelog is based on.
const changelogBaseSha = '2be4acf455ebec86e846854dbab57bd0bfbbceb7'

export const VALID_TAGS = ['beta', 'next'] as const

export async function publishVersion(args: {
  /**
   * Use "beta" for pre-release minor/patch versions and "next" for
   * pre-release major versions.
   */
  tag?: (typeof VALID_TAGS)[number]
  push: boolean
  gitCliffToken?: string
  npmToken?: string
  radashiBotToken: string
  deployKey?: string
  nightlyDeployKey?: string
}) {
  if (!process.env.CI) {
    throw new Error(
      'publishVersion must be run in CI, due to provenance requirements',
    )
  }

  // Determine the last stable version
  const { stdout: stableVersion } = await execa('npm', [
    'view',
    'radashi',
    'version',
  ])

  log(`Last stable version: ${stableVersion}`)

  const gitCliffBin = './scripts/versions/node_modules/.bin/git-cliff'

  // Determine the next version
  let newVersion = await execa(gitCliffBin, ['--bumped-version'], {
    env: { GITHUB_TOKEN: args.gitCliffToken },
  }).then(r => r.stdout.replace(/^v/, ''))

  if (stableVersion === newVersion) {
    log('🚫 No version bump detected')
    process.exit(1)
  }

  const newMajorVersion = newVersion.split('.')[0]

  if (args.tag) {
    const lastMajorVersion = stableVersion.split('.')[0]
    if (lastMajorVersion !== newMajorVersion && args.tag === 'beta') {
      log('🚫 Expected a patch or minor increment for "beta" tag')
      process.exit(1)
    }
    if (lastMajorVersion === newMajorVersion && args.tag === 'next') {
      log('🚫 Expected a major increment for "next" tag')
      process.exit(1)
    }

    const buildDigest = (await computeBuildDigest()).slice(0, 7)
    newVersion = `${newVersion}-${args.tag}.${buildDigest}`
  }

  log(`Determined new version: ${newVersion}`)

  // Check Version
  try {
    await execa('npm', ['view', `radashi@${newVersion}`], {
      stdio: 'ignore',
    })
    log(`🚫 Version ${newVersion} already exists`)
    process.exit(1)
  } catch {
    log(`🟢 Version ${newVersion} is available`)
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
      await execa('git', [
        'config',
        '--global',
        'user.name',
        process.env.GITHUB_ACTOR,
      ])
      await execa('git', [
        'config',
        '--global',
        'user.email',
        `${process.env.GITHUB_ACTOR}@users.noreply.github.com`,
      ])
    } else {
      console.error('GITHUB_ACTOR is not set')
      process.exit(1)
    }
  }

  const changelogFile = `CHANGELOG${args.tag === 'next' ? '-next' : ''}.md`

  // Generate Changelog
  log(`Generating changelog from ${changelogBaseSha.slice(0, 7)} to HEAD`)
  const gitCliffArgs = [`${changelogBaseSha}..HEAD`, '-o', changelogFile]
  if (!args.tag) {
    gitCliffArgs.push('--tag', `v${newVersion}`)
  }
  await execa(gitCliffBin, gitCliffArgs, {
    env: { GITHUB_TOKEN: args.gitCliffToken },
  })

  // Check if CHANGELOG.md has changed
  await execa('git', ['status', '--porcelain', changelogFile]).then(status => {
    if (!status.stdout.trim()) {
      log('No changes detected in %s', changelogFile)
      process.exit(1)
    }
  })

  // Commit files
  const committedFiles = [changelogFile]
  if (!args.tag) {
    // Only commit the changed version in package.json if it's a
    // stable version being published.
    committedFiles.push('package.json')
  }
  log('Committing:', committedFiles)
  await execa('git', ['add', ...committedFiles])
  await execa('git', ['commit', '-m', `chore(release): ${newVersion}`], {
    stdio: 'inherit',
  })

  // Push to origin
  if (args.push) {
    if (args.deployKey) {
      await installDeployKey(args.deployKey)
      // The origin must use SSH for the deploy key to work.
      await execa('git', [
        'remote',
        'set-url',
        'origin',
        'git@github.com:radashi-org/radashi.git',
      ])
    }
    log('Pushing to origin')
    await execa('git', ['push'], { stdio: 'inherit' })
  } else {
    log('Would have pushed to origin, but --no-push was set')
  }

  const exactTag = `v${newVersion}`
  const preReleaseTag =
    args.tag === 'next' ? `v${newMajorVersion}-next` : args.tag

  if (args.push) {
    if (preReleaseTag) {
      log(`Force-pushing ${preReleaseTag} tag`)
      await execa('git', ['tag', preReleaseTag, '-f'])
      await execa('git', ['push', 'origin', preReleaseTag, '-f'], {
        stdio: 'inherit',
      })
    }

    // The "nightly" remote is where exact pre-release tags are
    // pushed, so that they don't clutter the main repo.
    const remoteName = args.tag ? 'nightly' : 'origin'
    if (args.tag) {
      await execa(
        'git',
        [
          'remote',
          'add',
          remoteName,
          'git@github.com:radashi-org/radashi-nightly.git',
        ],
        { reject: false },
      )

      // Use the nightly deploy key if we're pushing a nightly tag.
      if (args.nightlyDeployKey) {
        await installDeployKey(args.nightlyDeployKey)
      }
    }

    log(`Pushing new tag ${exactTag}`)

    await execa('git', ['tag', exactTag])
    await execa('git', ['push', remoteName, exactTag], {
      stdio: 'inherit',
    })
  } else {
    log('Would have pushed a tag, but --no-push was set')
  }

  const { stdout: currentSha } = await execa('git', ['rev-parse', 'HEAD'])
  log(`Current SHA is ${currentSha}`)

  // Track Version in Database
  if (args.push) {
    await trackVersion(newVersion, currentSha, log)
  } else {
    log('Would have tracked version in database, but --no-push was set')
  }

  log('Setting package.json version')
  await execa('npm', ['version', newVersion, '--no-git-tag-version'], {
    stdio: 'inherit',
  })

  const npmPublishArgs = ['publish', '--provenance', '--ignore-scripts']

  // Use radashi@next for pre-release major versions and radashi@beta
  // for pre-release minor/patch versions.
  if (args.tag) {
    npmPublishArgs.push('--tag', args.tag)
  }
  if (!args.push) {
    npmPublishArgs.push('--dry-run')
  }

  log('Publishing to NPM' + (args.push ? '' : ' (dry run)'))
  await execa('npm', npmPublishArgs, {
    env: { NODE_AUTH_TOKEN: args.npmToken },
    stdio: 'inherit',
  })

  const octokit = new Octokit({ auth: args.radashiBotToken })

  log('Dispatching publish-docs workflow')
  await octokit.actions.createWorkflowDispatch({
    owner: 'radashi-org',
    repo: 'radashi',
    workflow_id: 'publish-docs.yml',
    ref: 'refs/tags/' + (preReleaseTag ?? exactTag),
  })

  log('Updating version in deno.json')
  const denoJson = {
    ...JSON.parse(await fs.readFile('deno.json', 'utf8')),
    version: newVersion,
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
      const adjective = args.tag ? 'nightly' : 'stable'

      let body = dedent`
        A ${adjective} release \`${newVersion}\` has been published to NPM. :rocket:

        To install:
        \`\`\`sh
        pnpm add radashi@${newVersion}
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

async function installDeployKey(deployKey: string) {
  const sshDir = path.join(os.homedir(), '.ssh')
  await fs.mkdir(sshDir, { recursive: true })

  const keyPath = path.join(sshDir, 'deploy_key')
  await fs.writeFile(keyPath, deployKey, { mode: 0o600 })

  // Set GIT_SSH_COMMAND to use the deploy key
  process.env.GIT_SSH_COMMAND = `ssh -i ${keyPath} -o StrictHostKeyChecking=no`
}
