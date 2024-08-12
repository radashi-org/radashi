import glob from 'fast-glob'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'tsup'

export default defineConfig(async () => {
  await generateEntryPoint()
  return {
    entry: { radashi: 'src/mod.ts' },
    format: ['cjs', 'esm'],
    dts: true,
    target: 'node16',
    pure: ['Symbol'],
    treeshake: {
      preset: 'smallest',
      propertyReadSideEffects: false,
      moduleSideEffects: false,
    },
  }
})

export async function generateEntryPoint() {
  let contents = ''

  const files = await glob(['**/*.ts', '!*.ts'], { cwd: 'src' })
  files.sort()
  files.push('types.ts')

  let lastDir = ''
  for (const file of files) {
    const dir = path.dirname(file)
    if (dir !== lastDir) {
      if (lastDir.length) {
        contents += '\n\n'
      }
      lastDir = dir
    } else if (contents.length) {
      contents += '\n'
    }

    contents += `export * from './${file}'`
  }

  fs.writeFileSync('src/mod.ts', contents + '\n')
}
