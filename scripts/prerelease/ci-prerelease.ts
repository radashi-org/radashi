import { verifyEnvVars } from '../common/verifyEnvVars'

main()

async function main() {
  const args = verifyEnvVars({
    deployKey: 'DEPLOY_KEY',
    prNumber: 'PR_NUMBER',
    prTitle: 'PR_TITLE',
    prRepoUrl: 'PR_REPO_URL',
    prHeadRef: 'PR_HEAD_REF',
  })

  const { prerelease } = await import('./src/prerelease')

  await prerelease(args)
}
