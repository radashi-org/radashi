import * as esbuild from 'esbuild'
import { execa } from 'execa'
import { cluster } from 'radashi/array/cluster.js'
import { select } from 'radashi/array/select.js'
import { map } from 'radashi/async/map.js'

export async function weighChangedFunctions(opts: { verbose?: boolean } = {}) {
  const targetBranch = await getTargetBranch()
  if (opts.verbose) {
    console.log('targetBranch == %O', targetBranch)
  }

  const changedFiles = await getChangedFiles(targetBranch)
  if (opts.verbose) {
    console.log('changedFiles == %O', changedFiles)
  }

  const prevSizes = await getPreviousSizes(changedFiles, targetBranch)
  if (opts.verbose) {
    console.log('prevSizes == %O', prevSizes)
  }

  const columnCount = prevSizes.some(size => size !== 0) ? 3 : 2

  let result = ''

  const addLine = (line: string) => (result += line + '\n')

  if (process.env.CI && changedFiles.length > 0) {
    if (columnCount > 2) {
      addLine('| Status | File | Size | Difference (%) |')
      addLine('|---|---|---|---|')
    } else {
      addLine('| Status | File | Size |')
      addLine('|---|---|---|')
    }
  }

  await map(changedFiles, async ({ status, name }, i) => {
    const prevBytes = prevSizes[i]

    const bytes = await getFileSize(name, status)

    const diff = bytes - prevBytes
    const diffStr = (diff >= 0 ? '+' : '') + diff

    let ratioStr = ''
    if (columnCount > 2 && prevBytes !== 0) {
      const ratio = Math.round((bytes / prevBytes - 1) * 100)
      ratioStr = ` (${ratio >= 0 ? '+' : ''}${ratio}%)`
    }

    if (process.env.CI) {
      const sizeStr = i === 0 ? `${bytes} [^1337]` : `${bytes}`
      if (columnCount > 2) {
        addLine(
          `| ${status} | \`${name}\` | ${sizeStr} | ${diffStr}${ratioStr} |`,
        )
      } else {
        addLine(`| ${status} | \`${name}\` | ${sizeStr} |`)
      }
    } else {
      if (columnCount > 2 && prevBytes !== 0) {
        addLine(`${name}: ${bytes} bytes (${diffStr} bytes)${ratioStr}`)
      } else {
        addLine(`${name}: ${bytes} bytes`)
      }
    }
  })

  if (process.env.CI && changedFiles.length > 0) {
    addLine('')
    addLine(
      '[^1337]: Function size includes the `import` dependencies of the function.',
    )
    addLine('')
  }

  return result
}

async function getTargetBranch(): Promise<string> {
  if (process.env.TARGET_BRANCH) {
    return process.env.TARGET_BRANCH
  }

  try {
    const { stdout } = await execa('gh', [
      'pr',
      'view',
      '--json',
      'baseRefName',
      '--jq',
      '.baseRefName',
    ])
    return stdout.trim() || 'main'
  } catch {
    return 'main'
  }
}

async function getChangedFiles(targetBranch: string) {
  // When run by CI, the PR changes have been checked out and will be
  // staged. When run via the `pnpm bundle-impact` command, we need to
  // diff the current branch against the target branch.
  const { stdout } = await execa('git', [
    'diff',
    '--name-status',
    ...(process.env.CI ? ['--staged'] : [`origin/${targetBranch}`, 'HEAD']),
    '--',
    'src/**/*.ts',
  ])

  return select(
    cluster(stdout.trim().split(/[\r\n\t]+/), 2),
    ([status, name]) => ({ status, name }),
    // Ignore changes to files like src/mod.ts and src/types.ts
    ([, name]) => /[\\/]/.test(name),
  )
}

async function getPreviousSizes(
  changedFiles: { status: string; name: string }[],
  targetBranch: string,
): Promise<number[]> {
  const prevSizes: number[] = []

  if (
    process.env.CI ||
    (await execa('git', ['status', '-s'])).stdout.trim() === ''
  ) {
    await execa('git', process.env.CI ? ['stash'] : ['checkout', targetBranch])

    for (const { status, name } of changedFiles) {
      if (status === 'A') {
        prevSizes.push(0)
      } else {
        const result = await esbuild.build({
          entryPoints: [name],
          format: 'esm',
          bundle: true,
          minify: true,
          write: false,
        })
        const output = result.outputFiles[0].contents
        prevSizes.push(output.length)
      }
    }

    await execa('git', process.env.CI ? ['stash', 'pop'] : ['checkout', '-'])
  }

  return prevSizes
}

async function getFileSize(file: string, status: string): Promise<number> {
  if (status === 'D') {
    return 0
  }
  const result = await esbuild.build({
    entryPoints: [file],
    format: 'esm',
    bundle: true,
    minify: true,
    write: false,
  })
  const output = result.outputFiles[0].contents
  return output.length
}
