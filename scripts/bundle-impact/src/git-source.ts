import path from 'node:path'
import type { Plugin } from 'esbuild'
import { execa } from 'execa'

const sourceExtensions = /\.(?:ts|tsx)$/
const namespace = 'radashi-source'

export async function readSourceTree(commit: string) {
  const { stdout } = await execa(
    'git',
    ['ls-tree', '-rz', commit, '--', 'src/'],
    {
      maxBuffer: 4 * 1024 * 1024,
    },
  )
  const files = new Map<string, string>()
  for (const entry of stdout.split('\0')) {
    const match = /^(?:100644|100755) blob ([0-9a-f]+)\t(src\/[\s\S]+)$/.exec(
      entry,
    )
    if (match && sourceExtensions.test(match[2])) {
      files.set(match[2], match[1])
    }
  }
  return files
}

export function gitSource(files: Map<string, string>): Plugin {
  const blobs = new Map<string, Promise<string>>()

  return {
    name: namespace,
    setup(build) {
      build.onResolve({ filter: /.*/ }, args => {
        let file: string | undefined
        if (args.kind === 'entry-point') {
          file = path.posix.normalize(args.path)
        } else if (args.path === 'radashi') {
          file = 'src/mod.ts'
        } else if (args.path.startsWith('radashi/')) {
          file = path.posix.join('src', args.path.slice('radashi/'.length))
        } else if (args.path.startsWith('./') || args.path.startsWith('../')) {
          file = path.posix.join(path.posix.dirname(args.importer), args.path)
        }

        const resolved =
          file &&
          [
            file,
            `${file}.tsx`,
            `${file}.ts`,
            `${file}/index.tsx`,
            `${file}/index.ts`,
          ].find(candidate => files.has(candidate))
        if (!resolved) {
          return {
            errors: [
              {
                text: `Cannot resolve ${JSON.stringify(args.path)} from ${JSON.stringify(args.importer)} in the source tree`,
              },
            ],
          }
        }
        return { path: resolved, namespace, sideEffects: false }
      })

      build.onLoad({ filter: /.*/, namespace }, async args => {
        const oid = files.get(args.path)!
        if (!blobs.has(oid)) {
          blobs.set(
            oid,
            execa('git', ['cat-file', 'blob', oid], {
              maxBuffer: 1024 * 1024,
              stripFinalNewline: false,
            }).then(result => result.stdout),
          )
        }
        // Leaving resolveDir unset keeps esbuild from reading adjacent files.
        return {
          contents: await blobs.get(oid)!,
          loader: args.path.endsWith('.tsx') ? 'tsx' : 'ts',
        }
      })
    },
  }
}
