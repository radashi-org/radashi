import { execa } from 'execa'

/**
 * Fetch the PR, squash it, merge its changes without committing. The
 * changes are left staged. This also creates a "pr" git remote.
 */
export async function checkoutPullRequest({
  repoUrl,
  headRef,
}: { repoUrl: string; headRef: string }) {
  async function git(...args: string[]) {
    return execa('git', args, { stdio: 'inherit' })
  }
  git.stdout = async (...args: string[]) => {
    return (await execa('git', args)).stdout
  }

  // Fetch the PR contents
  await git('remote', 'add', 'pr', repoUrl)
  await git('fetch', 'pr', headRef)

  // Get merge base commit
  const baseCommit = await git.stdout('merge-base', 'HEAD', `pr/${headRef}`)

  // Squash the PR into a single commit
  await git('checkout', `pr/${headRef}`)
  await git('reset', '--soft', baseCommit)
  await git('config', 'user.name', 'Radashi Bot')
  await git(
    'config',
    'user.email',
    '175859458+radashi-bot@users.noreply.github.com',
  )
  await git('commit', '-m', 'single commit')

  const squashCommit = await git.stdout('rev-parse', 'HEAD')

  // Return to the original branch
  await git('checkout', '-')

  // Import changes from the PR into the current branch without committing
  await git('cherry-pick', '-m', '1', '-n', squashCommit)

  // List the affected files for debugging purposes
  await git('diff', '--name-status', '--staged')
}
