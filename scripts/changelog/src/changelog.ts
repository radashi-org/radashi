import { execa } from 'execa'

const gitCliffBin = './scripts/versions/node_modules/.bin/git-cliff'

// Start from the Radashi's first commit after forking.
const changelogBaseSha = '2be4acf455ebec86e846854dbab57bd0bfbbceb7'

export async function generateChangelog(
  options: {
    /**
     * The base commit to start the changelog from. Defaults to the
     * first commit after forking Radash.
     */
    base?: string
    /**
     * Minimal formatting for single version changelog.
     */
    minimal?: boolean
    /**
     * The new version that will be used in the changelog header. Only
     * necessary if a tag commit hasn't been created.
     *
     * This has a "v" prefixed to it.
     */
    newVersion?: string
    /**
     * By default, the changelog is returned as a string. If an
     * `outFile` is provided, the changelog is written to the file.
     */
    outFile?: string
    /**
     * The GitHub token to use for fetching the commit history. If
     * undefined, the `$GITHUB_TOKEN` environment variable is used.
     */
    token?: string
  } = {},
) {
  const gitCliffArgs = [`${options.base ?? changelogBaseSha}..HEAD`]
  if (options.outFile) {
    gitCliffArgs.push('-o', options.outFile)
  }
  if (options.newVersion) {
    gitCliffArgs.push('--tag', `v${options.newVersion}`)
  }
  if (options.minimal) {
    gitCliffArgs.push('-s', 'all')
  }
  const { stdout } = await execa(gitCliffBin, gitCliffArgs, {
    env: {
      GITHUB_TOKEN: options.token,
      STRIP_TAG: String(options.minimal),
    },
  })
  return stdout
}

export async function inferNextVersion(
  options: {
    token?: string
  } = {},
) {
  const { stdout } = await execa(gitCliffBin, ['--bumped-version'], {
    env: { GITHUB_TOKEN: options.token },
  })
  return stdout.replace(/^v/, '')
}
