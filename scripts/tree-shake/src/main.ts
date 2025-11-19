import * as esbuild from 'esbuild'
import { fileURLToPath } from 'node:url'

const packageDir = fileURLToPath(new URL('..', import.meta.url))
const radashiDistPath = fileURLToPath(
  new URL('../../../dist/radashi.js', import.meta.url),
)
const RADASHI_ENTRY_SOURCE = `import * as _ from 'radashi'
console.log(_.noop)`
const EXPECTED_BYTES = 30

const radashiAliasPlugin: esbuild.Plugin = {
  name: 'radashi-entry',
  setup(build) {
    build.onResolve({ filter: /^radashi$/ }, () => ({
      path: radashiDistPath,
    }))
  },
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})

async function main() {
  const bytes = await measureBundleSize()
  const diff = bytes - EXPECTED_BYTES
  const diffStr = `${diff >= 0 ? '+' : ''}${diff}`
  const statusLine = `virtual entry: ${bytes} bytes (expected ${EXPECTED_BYTES}, diff ${diffStr}).`

  if (bytes !== EXPECTED_BYTES) {
    console.error(
      `${statusLine} Tree shaking changed — investigate or update EXPECTED_BYTES.`,
    )
    process.exitCode = 1
    return
  }

  console.log(
    `${statusLine} Radashi remains fully tree-shakeable when imported as a namespace.`,
  )
}

async function measureBundleSize(): Promise<number> {
  const result = await esbuild.build({
    bundle: true,
    format: 'esm',
    minify: true,
    platform: 'node',
    target: 'esnext',
    write: false,
    treeShaking: true,
    stdin: {
      contents: RADASHI_ENTRY_SOURCE,
      loader: 'ts',
      resolveDir: packageDir,
      sourcefile: 'virtual-entry.ts',
    },
    plugins: [radashiAliasPlugin],
    logLevel: 'silent',
  })

  return result.outputFiles[0].contents.length
}
