// @ts-check
const { execSync } = require('child_process')

exports.run = async function run({ github, core, context }, exec = execSync) {
  try {
    // 1. Run `pnpm bundle-impact` to get the bundle impact
    const bundleImpact = exec('pnpm -s bundle-impact').toString().trim()
    if (!bundleImpact) {
      return
    }

    // 2. Update the original post of the pull request
    const { data: pullRequest } = await github.rest.pulls.get({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.issue.number,
    })

    const originalBody = pullRequest.body
    const bundleImpactRegex = /## Bundle impact[\s\S]*?(?=##|$)/

    let updatedBody
    if (bundleImpactRegex.test(originalBody)) {
      updatedBody = originalBody.replace(
        bundleImpactRegex,
        `## Bundle impact\n\n${bundleImpact}\n\n`,
      )
    } else {
      updatedBody = `${originalBody}\n\n## Bundle impact\n\n${bundleImpact}\n\n`
    }

    if (updatedBody !== originalBody) {
      await github.rest.pulls.update({
        owner: context.repo.owner,
        repo: context.repo.repo,
        pull_number: context.issue.number,
        body: updatedBody,
      })

      core.info('PR description updated with bundle impact.')
    }
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`)
  }
}
