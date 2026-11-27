import * as esbuild from 'esbuild'
import { execa } from 'execa'
import { cluster } from 'radashi/array/cluster.ts'
import { select } from 'radashi/array/select.ts'
import { map } from 'radashi/async/map.ts'
import { gitSource, readSourceTree } from './git-source.ts'

export async function weighChangedFunctions(
  opts: {
    targetBranch?: string
    commits?: { base: string; head: string }
  } = {},
) {
  const markdown = opts.commits !== undefined
  const sizes = opts.commits
    ? await measureCommits(opts.commits)
    : await measureWorkingTree(opts.targetBranch ?? (await getTargetBranch()))

  const existingFilesAffected = sizes.some(file => file.prevBytes !== 0)

  let body = ''

  const appendLine = (line: string) => (body += line + '\n')

  for (const { status, name, prevBytes, bytes } of sizes) {
    const diff = bytes - prevBytes
    if (diff === 0) {
      continue
    }

    const diffStr = (diff > 0 ? '+' : '') + diff

    let ratioStr = ''
    if (existingFilesAffected && prevBytes !== 0) {
      const ratio = Math.round((bytes / prevBytes - 1) * 100)
      ratioStr = ` (${ratio >= 0 ? '+' : ''}${ratio}%)`
    }

    if (markdown) {
      const pathText = name.replace(
        /[&<>|`\r\n]/g,
        ch => `&#${ch.charCodeAt(0)};`,
      )
      const columns = [status, `<code>${pathText}</code>`, bytes]
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
  }

  if (markdown && body.length > 0) {
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

async function measureCommits({ base, head }: { base: string; head: string }) {
  const [before, after] = await Promise.all([
    readSourceTree(base),
    readSourceTree(head),
  ])
  const buildBefore = gitSource(before)
  const buildAfter = gitSource(after)
  const files = [...new Set([...before.keys(), ...after.keys()])].sort()
  const sizes = []
  for (const name of files) {
    const oldOid = before.get(name)
    const newOid = after.get(name)
    if (oldOid === newOid || !/^src\/[^/]+\/[\s\S]+\.ts$/.test(name)) {
      continue
    }
    sizes.push({
      name,
      status: !oldOid ? 'A' : !newOid ? 'D' : 'M',
      prevBytes: oldOid ? await getFileSize(name, [buildBefore]) : 0,
      bytes: newOid ? await getFileSize(name, [buildAfter]) : 0,
    })
  }
  return sizes
}

async function measureWorkingTree(targetBranch: string) {
  const files = await getChangedFiles(targetBranch)
  const previousSizes = await getPreviousSizes(files, targetBranch)
  return map(files, async ({ status, name }, i) => ({
    status,
    name,
    prevBytes: previousSizes[i],
    bytes: status === 'D' ? 0 : await getFileSize(name),
  }))
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

async function getPreviousSizes(
  changedFiles: { status: string; name: string }[],
  targetBranch: string,
): Promise<number[]> {
  const prevSizes: number[] = []

  if ((await execa('git', ['status', '-s'])).stdout.trim() === '') {
    await execa('git', ['checkout', targetBranch])

    for (const { status, name } of changedFiles) {
      if (status === 'A') {
        prevSizes.push(0)
      } else {
        prevSizes.push(await getFileSize(name))
      }
    }

    await execa('git', ['checkout', '-'])
  }

  return prevSizes
}

async function getFileSize(
  file: string,
  plugins?: esbuild.Plugin[],
): Promise<number> {
  const result = await esbuild.build({
    entryPoints: [file],
    format: 'esm',
    bundle: true,
    minify: true,
    legalComments: 'none',
    write: false,
    ...(plugins && { plugins, logLevel: 'silent', tsconfigRaw: '{}' }),
  })
  const output = result.outputFiles[0].contents
  return output.length
}
