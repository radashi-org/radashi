import { execa } from 'execa'
import fs from 'node:fs/promises'
import { Project, SyntaxKind } from 'ts-morph'
import { dedent } from './dedent'

export async function injectBaseline(
  baseRef: string,
  srcPath: string,
  benchPath: string,
) {
  const baselineFile = await execa('git', [
    'show',
    `${baseRef}:${srcPath}`,
  ]).then(result => result.stdout)

  await fs.writeFile('benchmarks/baseline.ts', baselineFile)

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
}
