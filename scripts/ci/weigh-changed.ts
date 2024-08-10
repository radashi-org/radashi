import { execa } from 'execa'
import * as readline from 'node:readline'
import { cluster, map, select } from 'radashi'

export async function weighChangedFunctions() {
  const targetBranch = await getTargetBranch()
  const changedFiles = await getChangedFiles(targetBranch)

  await ensureEsbuildInstalled()

  const prevSizes = await getPreviousSizes(changedFiles, targetBranch)

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
  const { stdout } = await execa('git', [
    'diff',
    '--name-status',
    `origin/${targetBranch}`,
    'HEAD',
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

async function installEsbuild(): Promise<void> {
  if (!process.env.CI) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })

    const answer = await new Promise<string>(resolve => {
      rl.question('Install esbuild to pnpm global store? (Y/n) ', resolve)
    })

    rl.close()

    if (answer.toLowerCase() === 'n') {
      process.exit(1)
    }
  }

  await execa('pnpm', ['install', '-g', 'esbuild'])
}

async function ensureEsbuildInstalled(): Promise<void> {
  try {
    await execa('which', ['esbuild'])
  } catch {
    await installEsbuild()
  }
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
    await execa('git', ['checkout', targetBranch])

    for (const { status, name } of changedFiles) {
      if (status === 'A') {
        prevSizes.push(0)
      } else {
        const { stdout } = await execa('esbuild', [
          '--bundle',
          '--minify',
          name,
        ])
        prevSizes.push(stdout.length)
      }
    }

    await execa('git', ['checkout', '-'])
  }

  return prevSizes
}

async function getFileSize(file: string, status: string): Promise<number> {
  if (status === 'D') {
    return 0
  }
  const { stdout } = await execa('esbuild', ['--bundle', '--minify', file])
  return stdout.length
}
