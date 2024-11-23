import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'
import { checkoutPullRequest } from './checkout-pr.ts'

main()

async function main() {
  const { repoUrl, headRef } = verifyEnvVars({
    repoUrl: 'PR_REPO_URL',
    headRef: 'PR_HEAD_REF',
  })

  await checkoutPullRequest({ repoUrl, headRef })
}
