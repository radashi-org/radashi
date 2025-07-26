import { execa } from 'execa'
import { cluster } from 'radashi/array/cluster.ts'

export async function getStagedFiles(
  globs: [string, ...string[]],
  baseRef?: string,
) {
  const { stdout } = await execa('git', [
    'diff',
    '--name-status',
    ...(baseRef
      ? [isExactCommit(baseRef) ? baseRef : `origin/${baseRef}`, 'HEAD']
      : ['--staged']),
    '--',
    ...globs,
  ])

  return cluster(stdout.trim().split(/[\r\n\t]+/), 2).map(([status, name]) => ({
    status,
    name,
  }))
}

function isExactCommit(ref: string) {
  return /^[0-9a-f]{40}$/.test(ref)
}
