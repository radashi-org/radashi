import { weighChangedFunctions } from './weigh-changed'

main()

async function main() {
  if (process.env.CI) {
    await weighChangedFunctions().then(console.log)
  } else {
    await updateBundleImpact()
  }
}

async function updateBundleImpact() {
  const { prNumber } = parseArgv(process.argv.slice(2))

  console.log('weighing changed functions...')

  let bundleImpact = await weighChangedFunctions({ verbose: true })

  if (bundleImpact) {
    bundleImpact = `## Bundle impact\n\n${bundleImpact}\n\n`
  }

  const { Octokit } = await import('@octokit/rest')

  const octokit = new Octokit({
    auth: process.env.RADASHI_BOT_TOKEN,
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
  if (!process.env.RADASHI_BOT_TOKEN) {
    throw new Error('RADASHI_BOT_TOKEN is required')
  }
  if (!process.env.TARGET_BRANCH) {
    throw new Error('TARGET_BRANCH is required')
  }

  const [prNumber] = argv
  if (!Number.isInteger(+prNumber)) {
    throw new Error('PR number is required')
  }

  return {
    prNumber: +prNumber,
  }
}
