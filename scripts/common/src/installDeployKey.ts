import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

export async function installDeployKey(deployKey: string) {
  const sshDir = path.join(os.homedir(), '.ssh')
  await fs.mkdir(sshDir, { recursive: true })

  const keyPath = path.join(sshDir, 'deploy_key')
  await fs.writeFile(keyPath, deployKey, { mode: 0o600 })

  // Set GIT_SSH_COMMAND to use the deploy key
  process.env.GIT_SSH_COMMAND = `ssh -i ${keyPath} -o StrictHostKeyChecking=no`
}
