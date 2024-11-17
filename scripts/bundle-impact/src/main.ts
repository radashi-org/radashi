import { weighChangedFunctions } from './weigh-changed.ts'

main()

async function main() {
  if (process.env.CI) {
    await updateBundleImpact()
  } else {
    await weighChangedFunctions({
      targetBranch: process.env.TARGET_BRANCH,
    }).then(console.log)
  }
}

async function updateBundleImpact() {
  const { prNumber } = parseArgv(process.argv.slice(2))

  const { verifyEnvVars } = await import('@radashi-org/common/verifyEnvVars.ts')
  const { radashiBotToken, targetBranch } = verifyEnvVars({
    radashiBotToken: 'RADASHI_BOT_TOKEN',
    targetBranch: 'TARGET_BRANCH',
  })

  console.log('weighing changed functions...')

  let bundleImpact = await weighChangedFunctions({
    targetBranch,
    verbose: true,
  })

  if (bundleImpact) {
    bundleImpact = `## Bundle impact\n\n${bundleImpact}\n\n`
  }

  const { Octokit } = await import('@octokit/rest')
  const octokit = new Octokit({
    auth: radashiBotToken,
  })

  console.log(`fetching PR #${prNumber} data...`)

  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: 'radashi-org',
    repo: 'radashi',
    pull_number: prNumber,
  })

  const originalBody = pullRequest.body!
  const bundleImpactRegex = /## Bundle impact[\s\S]*?(?=##|$)/

  let updatedBody: string
  if (bundleImpactRegex.test(originalBody)) {
    updatedBody = originalBody.replace(bundleImpactRegex, bundleImpact)
  } else {
    updatedBody = `${originalBody}\n\n${bundleImpact}`
  }

  if (updatedBody !== originalBody) {
    console.log('updating PR description...')
    await octokit.rest.pulls.update({
      owner: 'radashi-org',
      repo: 'radashi',
      pull_number: prNumber,
      body: updatedBody,
    })

    console.log('PR description updated with bundle impact.')
  }
}

function parseArgv(argv: string[]) {
  const [prNumber] = argv
  if (!Number.isInteger(+prNumber)) {
    throw new Error('PR number is required')
  }

  return {
    prNumber: +prNumber,
  }
}
