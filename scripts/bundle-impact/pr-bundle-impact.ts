import { weighChangedFunctions } from './weigh-changed'

export async function run({ github, core, context }) {
  const repo = `${context.repo.owner}/${context.repo.repo}`
  core.info(`fetching PR #${context.issue.number} data from ${repo}...`)

  const { data: pullRequest } = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  })

  core.info('calculating bundle impact...')
  let bundleImpact = await weighChangedFunctions()
  if (bundleImpact) {
    bundleImpact = `## Bundle impact\n\n${bundleImpact}\n\n`
  }

  const originalBody = pullRequest.body
  const bundleImpactRegex = /## Bundle impact[\s\S]*?(?=##|$)/

  let updatedBody: string
  if (bundleImpactRegex.test(originalBody)) {
    updatedBody = originalBody.replace(bundleImpactRegex, bundleImpact)
  } else {
    updatedBody = `${originalBody}\n\n${bundleImpact}`
  }

  if (updatedBody !== originalBody) {
    core.info('updating PR description...')
    await github.rest.pulls.update({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number,
      body: updatedBody,
    })

    core.info('PR description updated with bundle impact.')
  }
}
