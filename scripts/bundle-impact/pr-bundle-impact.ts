import { Octokit } from '@octokit/rest'
import mri from 'mri'
import { weighChangedFunctions } from './src/weigh-changed'

const octokit = new Octokit({
  auth: process.env.RADASHI_BOT_TOKEN,
})

main()

async function main() {
  const { prNumber } = parseArgv(process.argv.slice(2))

  console.log(`fetching PR #${prNumber} data...`)

  const { data: pullRequest } = await octokit.rest.pulls.get({
    owner: 'radashi-org',
    repo: 'radashi',
    pull_number: prNumber,
  })

  console.log('weighing changed functions...')

  let bundleImpact = await weighChangedFunctions()
  bundleImpact = bundleImpact ? `## Bundle impact\n\n${bundleImpact}\n\n` : ''

  console.log('updating PR description...')

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

  const {
    _: [prNumber],
  } = mri(argv)

  if (!Number.isInteger(+prNumber)) {
    throw new Error('PR number is required')
  }

  return {
    prNumber: +prNumber,
  }
}
