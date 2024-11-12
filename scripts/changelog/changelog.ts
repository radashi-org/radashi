import { execa } from 'execa'

const gitCliffBin = './scripts/versions/node_modules/.bin/git-cliff'

// Start from the Radashi's first commit after forking.
const changelogBaseSha = '2be4acf455ebec86e846854dbab57bd0bfbbceb7'

export async function generateChangelog(
  options: {
    /**
     * If true, only the current version is included in the changelog,
     * and the output is minimal.
     */
    current?: boolean
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
  const gitCliffArgs = [`${changelogBaseSha}..HEAD`]
  if (options.outFile) {
    gitCliffArgs.push('-o', options.outFile)
  }
  if (options.newVersion) {
    gitCliffArgs.push('--tag', `v${options.newVersion}`)
  }
  if (options.current) {
    gitCliffArgs.push('--current', '-s', 'all')
  }
  const { stdout } = await execa(gitCliffBin, gitCliffArgs, {
    env: {
      GITHUB_TOKEN: options.token,
      CURRENT_ONLY: options.current ? 'true' : undefined,
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
