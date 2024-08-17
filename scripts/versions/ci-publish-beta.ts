import { Octokit } from '@octokit/rest'
import { execa } from 'execa'
import glob from 'fast-glob'
import { green } from 'kleur/colors'
import mri from 'mri'
import crypto from 'node:crypto'
import fs from 'node:fs'
import { sift } from 'radashi/array/sift.js'
import { dedent } from './src/dedent'
import { trackVersion } from './src/trackVersion'

// This is the commit that Radashi's changelog is based on.
const changelogBaseSha = '2be4acf455ebec86e846854dbab57bd0bfbbceb7'

main()

async function main() {
  const args = parseArgs()
  const octokit = new Octokit({ auth: args.radashiBotToken })

  // Determine the last stable version
  const { stdout: stableVersion } = await execa('npm', [
    'view',
    'radashi',
    'version',
  ])
  log(`Last stable version: ${stableVersion}`)

  // Determine the next beta version
  const { stdout: nextVersion } = await execa('git-cliff', ['--bumped-version'])
  const buildDigest = (await computeBuildDigest()).slice(0, 7)
  const nextBetaVersion = `${nextVersion.replace(/^v/, '')}-beta.${buildDigest}`
  log(`Determined next beta version: ${nextBetaVersion}`)

  // Check Version
  try {
    await execa('npm', ['view', `radashi@${nextBetaVersion}`], {
      stdio: 'ignore',
    })
    log(`🚫 Version ${nextBetaVersion} already exists`)
    process.exit(1)
  } catch {
    log(`🟢 Version ${nextBetaVersion} is available`)
  }

  const { stdout: latestTag } = await execa('git', [
    'describe',
    '--tags',
    '--abbrev=0',
  ])
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
  await execa(
    './scripts/versions/node_modules/.bin/git-cliff',
    [`${changelogBaseSha}..HEAD`, '-o', 'CHANGELOG.md'],
    {
      env: { GITHUB_TOKEN: args.gitCliffToken },
    },
  )

  // Commit Changelog
  log('Committing changelog')
  await execa('git', ['add', 'CHANGELOG.md'])
  await execa('git', ['commit', '-m', `chore(release): ${nextBetaVersion}`], {
    stdio: 'inherit',
  })
  if (args.push) {
    log('Pushing updated changelog to origin')
    await execa('git', ['push'], { stdio: 'inherit' })
  } else {
    log('Would have pushed updated changelog to origin, but --no-push was set')
  }

  const { stdout: currentSha } = await execa('git', ['rev-parse', 'HEAD'])
  log(`Current SHA: ${currentSha}`)

  // Track Version in Database
  if (args.push) {
    await trackVersion(nextBetaVersion, currentSha, log)
  } else {
    log('Would have tracked version in database, but --no-push was set')
  }

  log('Setting package.json version')
  await execa('npm', ['version', nextBetaVersion, '--no-git-tag-version'], {
    stdio: 'inherit',
  })

  // Publish to NPM
  log('Publishing to NPM' + (args.push ? '' : ' (dry run)'))
  const dryRunArgs = args.push ? [] : ['--dry-run']
  await execa(
    'npm',
    ['publish', '--tag', 'beta', '--ignore-scripts', ...dryRunArgs],
    {
      env: { NODE_AUTH_TOKEN: args.npmToken },
      stdio: 'inherit',
    },
  )

  // Update Beta Tag
  if (args.push) {
    log('Updating beta tag')
    await execa('git', ['tag', 'beta', '-f'])
    await execa('git', ['push', 'origin', 'beta', '-f'])
  } else {
    log('Would have updated beta tag, but --no-push was set')
  }

  log(`Commit range identified: ${latestTagSha}..${currentSha}`)
  const prNumbers = await getPrNumbers(`${latestTagSha}..${currentSha}`)
  log('PR numbers:', prNumbers.join(', '))

  // Comment on Pull Requests
  if (args.push) {
    for (const prNumber of prNumbers) {
      const body = dedent`
        A new beta version \`${nextBetaVersion}\` has been published to NPM. :rocket:

        To install:
        \`\`\`sh
        pnpm add radashi@${nextBetaVersion}
        \`\`\`

        The \`radashi@beta\` tag also includes this PR.

        <a href="https://github.com/radashi-org/radashi/compare/v${stableVersion}...${currentSha}">
          <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/changes-button.png" alt="See the changes" width="250px" />
        </a>
      `

      await octokit.issues.createComment({
        owner: 'radashi-org',
        repo: 'radashi',
        issue_number: +prNumber,
        body,
      })
    }
  }
}

function parseArgs() {
  const { gitCliffToken, npmToken, radashiBotToken, supabaseKey } =
    verifyEnvVars({
      gitCliffToken: 'GIT_CLIFF_PAT',
      npmToken: 'NPM_TOKEN',
      radashiBotToken: 'RADASHI_BOT_TOKEN',
      supabaseKey: 'SUPABASE_KEY',
    })

  const args = mri(process.argv.slice(2), {
    boolean: ['no-push'],
  })

  return {
    push: !args['no-push'],
    gitCliffToken,
    npmToken,
    radashiBotToken,
    supabaseKey,
  }
}

function log(msg: string, ...args: any[]) {
  console.log(green('• ' + msg), ...args)
}

async function computeBuildDigest() {
  const files = await glob(['dist/**/*', 'package.json'])
  const fileHashes = await Promise.all(
    files.map(async file => {
      const content = await fs.promises.readFile(file)
      return crypto.createHash('sha256').update(content).digest('hex')
    }),
  )
  return crypto.createHash('sha256').update(fileHashes.join('')).digest('hex')
}

async function getPrNumbers(range: string) {
  const { stdout: gitLog } = await execa('git', ['log', '--oneline', range])
  return sift(gitLog.split('\n').map(line => line.match(/\(#(\d+)\)$/)?.[1]))
}

function verifyEnvVars<T extends Record<string, string>>(
  vars: T,
): { [K in keyof T]: string } {
  return Object.entries(vars).reduce(
    (acc, [alias, envName]) => {
      const value = process.env[envName]
      if (!value) {
        console.error(`${envName} is not set`)
        process.exit(1)
      }
      process.env[envName] = ''
      acc[alias as keyof T] = value
      return acc
    },
    {} as { [K in keyof T]: string },
  )
}
