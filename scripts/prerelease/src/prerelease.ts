import { execa, type Options as ExecaOptions } from 'execa'
import { installDeployKey } from '../../common/installDeployKey'

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

    await exec('git', ['checkout', targetBranch])
  }

  // Check if this PR was already merged
  const existingCommit = await get('git', [
    'log',
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

  const baseCommit = await get('git', ['merge-base', 'HEAD', `pr/${prHeadRef}`])

  // Get the first commit author from the PR branch
  const prAuthor = await get('git', [
    'log',
    '--format=%an\t%ae',
    '-1',
    baseCommit + '..' + `pr/${prHeadRef}`,
  ])

  // Checkout the PR into the target branch.
  await exec('bash', ['scripts/checkout-pr.sh'], {
    env: {
      PR_REPO_URL: prRepoUrl,
      PR_HEAD_REF: prHeadRef,
    },
  })

  // Stage all changes
  await exec('git', ['add', '.'])

  // Create commit with PR title and number
  await exec('git', [
    'commit',
    '-m',
    `${prTitle} (#${prNumber})`,
    '--author',
    prAuthor,
  ])

  await installDeployKey(deployKey)

  // The origin must use SSH for the deploy key to work.
  await execa('git', [
    'remote',
    'set-url',
    'origin',
    'git@github.com:radashi-org/radashi.git',
  ])

  // Push the commit to the target branch
  await exec('git', ['push', 'origin', targetBranch])
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
