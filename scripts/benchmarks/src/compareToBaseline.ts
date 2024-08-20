import * as esbuild from 'esbuild'
import { execa } from 'execa'
import fs from 'node:fs/promises'
import { Project, SyntaxKind } from 'ts-morph'
import { dedent } from './dedent'

export async function compareToBaseline(
  baseRef: string,
  srcPath: string,
  benchPath: string,
) {
  const baseCode = await execa('git', ['show', `${baseRef}:${srcPath}`]).then(
    result => result.stdout,
  )

  const basePath = 'benchmarks/baseline.ts'
  await fs.writeFile(basePath, baseCode)

  const [headBundle, baseBundle] = await Promise.all([
    bundleFile(srcPath),
    bundleFile(basePath),
  ])

  if (headBundle === baseBundle) {
    return false
  }

  console.log('-------- HEAD ---------')
  console.log(headBundle)
  console.log('-------- BASE ---------')
  console.log(baseBundle)
  console.log('-----------------------')

  const project = new Project()
  const benchFile = project.addSourceFileAtPath(benchPath)

  const describeCall = benchFile
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find(call => call.getExpression().getText() === 'describe')!

  const benchCalls = describeCall
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .filter(call => call.getExpression().getText() === 'bench')

  const baselineDescribe = dedent`
    describe('baseline', async () => {
      const _ = await import('../baseline.js')

      ${benchCalls.map(call => call.getText()).join('\n')}
    })
  `

  const callbackBody = describeCall
    .getArguments()[1]
    .asKind(SyntaxKind.ArrowFunction)
    ?.getBody()

  if (callbackBody?.isKind(SyntaxKind.Block)) {
    callbackBody.addStatements(baselineDescribe)
  }

  await fs.writeFile(benchPath, benchFile.getFullText())
  return true
}

async function bundleFile(file: string) {
  const bundled = await esbuild.build({
    entryPoints: [file],
    format: 'esm',
    bundle: true,
    write: false,
    // Temporary workaround to avoid CI-only esbuild tree-shaking
    // issue. Could not reproduce locally.
    pure: ['Symbol'],
  })
  // Minify in a separate step to avoid https://github.com/evanw/esbuild/issues/3881
  const minified = await esbuild.build({
    stdin: { contents: bundled.outputFiles[0].contents, loader: 'js' },
    format: 'esm',
    minify: true,
    write: false,
  })
  return Buffer.from(minified.outputFiles[0].contents).toString('utf-8')
}
