import * as esbuild from 'esbuild'
import { execa } from 'execa'
import { cluster } from 'radashi/array/cluster.ts'
import { select } from 'radashi/array/select.ts'
import { map } from 'radashi/async/map.ts'

export async function weighChangedFunctions(
  opts: { verbose?: boolean; targetBranch?: string } = {},
) {
  const targetBranch = opts.targetBranch ?? (await getTargetBranch())
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

  const existingFilesAffected = prevSizes.some(size => size !== 0)

  let body = ''

  const appendLine = (line: string) => (body += line + '\n')

  await map(changedFiles, async ({ status, name }, i) => {
    const prevBytes = prevSizes[i]

    const bytes = await getFileSize(name, status)
    const diff = bytes - prevBytes
    if (diff === 0) {
      return
    }

    const diffStr = (diff > 0 ? '+' : '') + diff

    let ratioStr = ''
    if (existingFilesAffected && prevBytes !== 0) {
      const ratio = Math.round((bytes / prevBytes - 1) * 100)
      ratioStr = ` (${ratio >= 0 ? '+' : ''}${ratio}%)`
    }

    if (process.env.CI) {
      const columns = [status, `\`${name}\``, bytes]
      if (existingFilesAffected) {
        columns.push(diffStr + ratioStr)
      }
      appendLine(`| ${columns.join(' | ')} |`)
    } else {
      if (existingFilesAffected && prevBytes !== 0) {
        appendLine(`${name}: ${bytes} bytes (${diffStr} bytes)${ratioStr}`)
      } else {
        appendLine(`${name}: ${bytes} bytes`)
      }
    }
  })

  if (process.env.CI && body.length > 0) {
    const columns = ['Status', 'File', 'Size [^1337]']
    if (existingFilesAffected) {
      columns.push('Difference')
    }

    body =
      `| ${columns.join(' | ')} |\n` +
      `| ${columns.map(() => '---').join(' | ')} |\n` +
      body

    appendLine('')
    appendLine(
      '[^1337]: Function size includes the `import` dependencies of the function.',
    )
    appendLine('')
  }

  return body
}

async function getTargetBranch(): Promise<string> {
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
