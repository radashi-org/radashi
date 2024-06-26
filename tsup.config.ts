import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { radashi: 'src/mod.ts' },
  format: ['cjs', 'esm'],
  dts: true,
  target: 'node16'
})
