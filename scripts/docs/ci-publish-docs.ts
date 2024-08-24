/**
 * # Publishing A Version
 *
 * - Clone the "main" branch of https://github.com/radashi-org/radashi-org.github.io.git to ./www
 * - Clone the "gh-pages" branch of https://github.com/radashi-org/radashi-org.github.io.git to ./www/dist
 * - Run `git submodule update --init --recursive` in ./www
 * - Symlink ./ to ./www/radashi
 * - Add version to ./www/versions.json
 * - Run `pnpm build --outDir ./dist/{version}` in ./www
 * - If a stable version (or ./www/versions.json is empty), recursive copy ./www/dist/{version} to ./www/dist
 *
 * # Determining The Version
 *
 * - If triggered by a stable release or a workflow dispatch, the version is found with "$(git describe --abbrev=0 --tags)". If nothing in ./docs/ was changed between the last stable release and HEAD, skip the build.
 * - If triggered by a beta release, the version is "beta". If nothing in ./docs/ was changed between the last release and HEAD, skip the build.
 */
import { execa } from 'execa'
import glob from 'fast-glob'
import { green } from 'kleur/colors'
import mri from 'mri'
import fs from 'node:fs/promises'
import { supabase } from 'radashi-db/supabase.js'

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

  /** This is the identifier used by URLs. */
  let newReleaseId = 'v' + String(newReleaseMajor)
  if (newReleaseParts.length > 3) {
    if (newReleaseMajor === lastReleaseMajor) {
      newReleaseId += '.' + newReleaseMinor
      if (newReleaseMinor === lastReleaseMinor) {
        newReleaseId += '.' + newReleaseParts[2]
      }
    }
    newReleaseId += '-' + newReleaseParts[3]
  }

  log('Publishing docs for version:', newReleaseId)

  log('Cloning main branch of radashi-org.github.io')
  await execa(
    'git',
    [
      'clone',
      '--depth',
      '1',
      '--branch',
      'main',
      'https://github.com/radashi-org/radashi-org.github.io.git',
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
      'https://github.com/radashi-org/radashi-org.github.io.git',
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
  }).catch(exit)

  log('Installing dependencies in ./www/starlight')
  await execa('pnpm', ['install'], {
    cwd: './www/starlight',
    stdio: 'inherit',
  }).catch(exit)

  log('Symlinking radashi to ./www/radashi')
  await fs.symlink('..', './www/radashi')

  const removedVersions = new Set<string>()
  const cleanVersions = (oldVersions: string[]) =>
    oldVersions.filter(oldVersion => {
      if (newVersion === oldVersion) {
        return true
      }
      const oldRawVersion = toRawVersion(oldVersion)
      if (newVersion === oldRawVersion) {
        // Avoid having a beta, RC, or stable with the same raw version.
        removedVersions.add(oldVersion)
        return false
      }
      // Beta versions are reserved for non-breaking changes that have
      // been merged into the "main" branch and don't have a stable
      // version yet.
      if (oldVersion.includes('beta')) {
        if (newVersion.includes('beta')) {
          // Only one beta version is made available at a time.
          removedVersions.add(oldVersion)
          return false
        }
      }
      // Alpha versions are reserved for breaking changes that have
      // been merged into the "next" branch.
      else if (oldVersion.includes('alpha')) {
        if (newVersion.includes('alpha')) {
          // Only one alpha version is made available at a time.
          removedVersions.add(oldVersion)
          return false
        }
      }
      // Only a stable version should be left to handle.
      else {
        const oldMajorVersion = +oldRawVersion.split('.')[0]
        if (newReleaseMajor - oldMajorVersion > 2) {
          // Only 3 major versions are made available at a time.
          removedVersions.add(oldVersion)
          return false
        }
      }
      return true
    })

  log('Updating ./www/public/versions.json')
  const versions = new Set(
    cleanVersions(
      JSON.parse(await fs.readFile('./www/public/versions.json', 'utf8')),
    ),
  )
  versions.add(newReleaseId)
  await fs.writeFile(
    './www/public/versions.json',
    JSON.stringify([...versions]),
  )

  if (removedVersions.size > 0) {
    log('Removing docs for unmaintained versions')
    for (const removedVersion of removedVersions) {
      await fs.rm(`./www/dist/${removedVersion}`, { recursive: true })
    }
  }

  log('Removing docs that will be overwritten')
  await fs.rm(`./www/dist/${newReleaseId}`, { recursive: true }).catch(() => {})

  log('Building docs with version-specific --outDir')
  await execa('pnpm', ['build', '--outDir', `./dist/${newReleaseId}`], {
    cwd: './www',
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
    },
  }).catch(exit)

  if (newReleaseParts.length === 3) {
    log('Copying build into root folder')
    const cwd = `www/dist/${newReleaseId}`
    const files = await glob('**/*', { cwd })
    for (const file of files) {
      await fs.cp(`${cwd}/${file}`, `www/dist/${file}`)
    }
  }

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

  log('Pushing to gh-pages branch')
  await execa('git', ['add', '-A'], { cwd: './www/dist' })
  await execa('git', ['commit', '-m', `chore: ${newReleaseId}`], {
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

/**
 * Extracts the raw version from a version string that may not have
 * its minor or patch version set. It also removes any suffix like
 * "-rc" or "-beta".
 *
 * @example
 * ```ts
 * toRawVersion('1') // '1.0.0'
 * toRawVersion('1.1.0-rc') // '1.1.0'
 * ```
 */
function toRawVersion(version: string) {
  let [, rawVersion] = version.match(/^v?(\d+(?:\.\d+(?:\.\d+)?)?)/)!
  for (let i = rawVersion.split('.').length; i < 3; i++) {
    rawVersion += '.0'
  }
  return rawVersion
}

async function coerceTagToVersion(tag: string) {
  let version: string
  let metaId: string

  if (tag[0] === 'v') {
    version = tag.slice(1)
    metaId = 'stable_version'
  } else if (tag === 'beta' || tag === 'next') {
    const gitCliffBin = './scripts/docs/node_modules/.bin/git-cliff'

    version = await execa(gitCliffBin, ['--bumped-version']).then(r =>
      r.stdout.replace(/^v/, ''),
    )

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
