import { checkoutPullRequest } from '@radashi-org/checkout-pr'
import { installDeployKey } from '@radashi-org/common/installDeployKey.ts'
import { execa, type Options as ExecaOptions } from 'execa'

export async function prerelease({
  deployKey,
  prNumber,
  prTitle,
  prRepoUrl,
  prHeadRef,
}: {
  deployKey: string
  prNumber: string
  prTitle: string
  prRepoUrl: string
  prHeadRef: string
}) {
  let targetBranch = await get('git', ['rev-parse', '--abbrev-ref', 'HEAD'])

  // If targeting the main branch, release from the beta branch instead.
  if (targetBranch === 'main') {
    targetBranch = 'beta'

    await exec('git', ['fetch', 'origin', targetBranch])
    await exec('git', ['checkout', targetBranch])
  }
  // Otherwise, fetch the main branch for rebasing the next branch.
  else {
    await exec('git', ['fetch', 'origin', 'main'])
  }

  // Check if this PR was already merged
  const existingCommit = await get('git', [
    'log',
    '2be4acf455ebec86e846854dbab57bd0bfbbceb7..HEAD',
    '--format=%H',
    '-1',
    '--grep',
    `(#${prNumber})$`,
  ])

  if (existingCommit) {
    // TODO: filter out the old commit for a new release?
    console.error(
      `PR #${prNumber} was already merged in commit ${existingCommit}`,
    )
    process.exit(0)
  }

  // Set git user (needed by git rebase).
  await exec('git', ['config', '--global', 'user.name', 'Radashi Bot'])
  await exec('git', [
    'config',
    '--global',
    'user.email',
    '175859458+radashi-bot@users.noreply.github.com',
  ])

  // Ensure all patches from main are applied to the target branch. If
  // a merge conflict occurs, a manual rebase is required.
  await exec('git', ['rebase', '-X', 'ours', 'origin/main'])

  await mergePullRequest({
    targetBranch,
    prHeadRef,
    prRepoUrl,
    message: `${prTitle} (#${prNumber})`,
  })

  await installDeployKey(deployKey)

  // The origin must use SSH for the deploy key to work.
  await execa('git', [
    'remote',
    'set-url',
    'origin',
    'git@github.com:radashi-org/radashi.git',
  ])

  // Push the commit to the target branch
  await exec('git', ['push', 'origin', targetBranch, '--force'])
}

async function mergePullRequest({
  targetBranch,
  prHeadRef,
  prRepoUrl,
  message,
}: {
  targetBranch: string
  prHeadRef: string
  prRepoUrl: string
  message: string
}) {
  // This creates a "pr" git remote, which we use in the next steps.
  await checkoutPullRequest({
    repoUrl: prRepoUrl,
    headRef: prHeadRef,
  })

  // Get the commit where the PR branch diverged from the target
  // branch.
  const baseCommit = await get('git', [
    'merge-base',
    targetBranch,
    `pr/${prHeadRef}`,
  ])

  // Get the first commit author from the PR branch
  const prAuthor = await get('git', [
    'log',
    '--format=%an <%ae>',
    '-1',
    baseCommit + '..' + `pr/${prHeadRef}`,
  ])

  // Create commit with PR title and number
  await exec('git', ['commit', '-m', message, '--author', prAuthor])
}

async function get(cmd: string, args: readonly string[]) {
  return (await execa(cmd, args)).stdout
}

function exec(cmd: string, args: readonly string[], opts?: ExecaOptions) {
  const quotedArgs = args.map(arg =>
    arg.includes(' ') ? JSON.stringify(arg) : arg,
  )
  console.log(`> ${cmd} ${quotedArgs.join(' ')}`)
  return execa(cmd, args, { stdio: 'inherit', ...opts })
}
