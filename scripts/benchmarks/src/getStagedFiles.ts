import { execa } from 'execa'
import { cluster } from 'radashi/array/cluster.js'

export async function getStagedFiles(
  globs: [string, ...string[]],
  baseRef?: string,
) {
  const { stdout } = await execa('git', [
    'diff',
    '--name-status',
    ...(baseRef ? [`origin/${baseRef}`, 'HEAD'] : ['--staged']),
    '--',
    ...globs,
  ])

  return cluster(stdout.trim().split(/[\r\n\t]+/), 2).map(([status, name]) => ({
    status,
    name,
  }))
}
