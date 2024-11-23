import { inferNextVersion } from '@radashi-org/changelog'
import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import { execa } from 'execa'
import { green } from 'kleur/colors'
import mri from 'mri'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { supabase } from 'radashi-db/supabase.ts'

main()

async function main() {
  const argv = mri(process.argv.slice(2), {
    boolean: ['dry-run', 'force'],
    alias: {
      'dry-run': ['dryRun', 'n'],
      force: ['f'],
    },
  })

  let [newVersion] = argv._
  if (!newVersion) {
    console.error('Version is required')
    process.exit(1)
  }

  const { docsDeployKey } = verifyEnvVars({
    docsDeployKey: 'DOCS_DEPLOY_KEY?',
  })

  let metaId: string
  if (newVersion.startsWith('refs/tags/')) {
    const tag = newVersion.slice('refs/tags/'.length)
    const result = await coerceTagToVersion(tag)
    newVersion = result.version
    metaId = result.metaId
  } else if (newVersion === 'refs/heads/main') {
    // Get the most recent git tag.
    const { stdout: newestTag } = await execa('git', [
      'describe',
      '--tags',
      '--abbrev=0',
    ])

    const result = await coerceTagToVersion(newestTag)
    newVersion = result.version
    metaId = result.metaId
  } else {
    console.error(
      'Expected a tag ref like "refs/tags/v1.0.0", but got "%s" instead.',
      newVersion,
    )
    process.exit(1)
  }

  log('Getting release info')
  const metaResult = await supabase
    .from('meta')
    .select('value')
    .eq('id', metaId)
    .limit(1)
    .single()

  if (metaResult.error) {
    console.error('Failed to get release info:', metaResult.error)
    process.exit(1)
  }

  const lastRelease = metaResult.data?.value as {
    version: string
    ref: string
  }

  log('Comparing to this release:', lastRelease)

  const lastReleaseParts = lastRelease.version.split('.')
  const lastReleaseMajor = +lastReleaseParts[0]
  const lastReleaseMinor = +lastReleaseParts[1]

  const newReleaseParts = newVersion.split(/[-.]/)
  const newReleaseMajor = +newReleaseParts[0]
  const newReleaseMinor = +newReleaseParts[1]

  // When the new release has a greater major.minor version, we'll
  // always continue. Otherwise, check to see if there are any changes
  // before continuing.
  if (
    newReleaseMajor === lastReleaseMajor &&
    newReleaseMinor === lastReleaseMinor
  ) {
    log('Checking for changes in docs')
    const diffResult = await execa('git', [
      'diff',
      `${lastRelease.ref}..HEAD`,
      '--',
      'docs',
    ])

    if (!diffResult.stdout.trim()) {
      log('No changes in docs since last release. Skipping build.')
      process.exit(0)
    }
  }

  if (docsDeployKey) {
    await installDeployKey(docsDeployKey)
  }

  log('Publishing docs for version:', newVersion)

  log('Cloning main branch of radashi-org.github.io')
  await execa(
    'git',
    [
      'clone',
      '--depth',
      '1',
      '--branch',
      'main',
      'git@github.com:radashi-org/radashi-org.github.io.git',
      './www',
    ],
    { stdio: 'inherit' },
  )

  log('Cloning gh-pages branch of radashi-org.github.io')
  await execa(
    'git',
    [
      'clone',
      '--depth',
      '1',
      '--branch',
      'gh-pages',
      'git@github.com:radashi-org/radashi-org.github.io.git',
      './www/dist',
    ],
    { stdio: 'inherit' },
  )

  log('Cloning submodules in ./www directory')
  await execa('git', ['submodule', 'update', '--init', '--recursive'], {
    cwd: './www',
    stdio: 'inherit',
  }).catch(exit)

  log('Installing dependencies in ./www')
  await execa('pnpm', ['install'], {
    cwd: './www',
    stdio: 'inherit',
    extendEnv: false,
  }).catch(exit)

  log('Installing dependencies in ./www/starlight')
  await execa('pnpm', ['install'], {
    cwd: './www/starlight',
    stdio: 'inherit',
    extendEnv: false,
  }).catch(exit)

  log('Symlinking radashi to ./www/radashi')
  await fs.symlink('..', './www/radashi')

  log('Building docs')
  await execa('pnpm', ['build'], {
    cwd: './www',
    stdio: 'inherit',
    extendEnv: false,
    env: {
      NODE_ENV: 'production',
      // Additional environment variables that might be needed for Astro build.
      CI: process.env.CI,
      HOME: process.env.HOME,
      NODE_PATH: process.env.NODE_PATH,
      PATH: process.env.PATH,
    },
  }).catch(exit)

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
  } else {
    log('Skipping `git config user.email` for local build')
  }

  log('Pushing to gh-pages branch')
  await execa('git', ['add', '-A'], { cwd: './www/dist' })
  await execa('git', ['commit', '-m', `chore: ${newVersion}`], {
    cwd: './www/dist',
    stdio: 'inherit',
  })
  await execa('git', ['push'], {
    cwd: './www/dist',
    stdio: 'inherit',
  })
}

function log(msg: string, ...args: any[]) {
  console.log(green('• ' + msg), ...args)
}

function exit() {
  process.exit(1)
}

async function coerceTagToVersion(tag: string) {
  let version: string
  let metaId: string

  if (tag[0] === 'v') {
    version = tag.slice(1)
    metaId = 'stable_version'
  } else if (tag === 'beta' || tag === 'next') {
    version = await inferNextVersion()

    if (tag === 'next') {
      version += '-alpha'
      // Compare against the last alpha version.
      metaId = 'alpha_version'
    } else {
      version += '-beta'
      // Compare against the last stable version or the last beta
      // version, whichever is more recent.
      metaId = 'latest_version'
    }
  } else {
    console.error('Invalid tag: "%s"', tag)
    process.exit(1)
  }

  if (!/^\d+\.\d+\.\d+(-\w+)?$/.test(version)) {
    console.error(
      'Expected version to be like "1.0.0", but got "%s" instead.',
      version,
    )
    process.exit(1)
  }

  return { version, metaId }
}

async function installDeployKey(deployKey: string) {
  const sshDir = path.join(os.homedir(), '.ssh')
  await fs.mkdir(sshDir, { recursive: true })

  const keyPath = path.join(sshDir, 'deploy_key')
  await fs.writeFile(keyPath, deployKey, { mode: 0o600 })

  // Set GIT_SSH_COMMAND to use the deploy key
  process.env.GIT_SSH_COMMAND = `ssh -i ${keyPath} -o StrictHostKeyChecking=no`
}
