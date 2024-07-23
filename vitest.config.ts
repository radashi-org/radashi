import codspeed from '@codspeed/vitest-plugin'
import { defineConfig } from 'vitest/config'

const resolve = (specifier: string) =>
  new URL(import.meta.resolve(specifier)).pathname

export default defineConfig(({ mode }) => ({
  test: {
    globals: true,
    coverage: {
      thresholds: { 100: true },
      include: ['src/**'],
    },
  },
  resolve: {
    alias: {
      radashi: resolve('./src/mod.js'),
    },
  },
  plugins: [mode === 'benchmark' && process.env.CI ? codspeed() : []],
}))
