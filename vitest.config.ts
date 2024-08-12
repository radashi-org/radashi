import { defineConfig } from 'vitest/config'

const resolve = (specifier: string) =>
  new URL(import.meta.resolve(specifier)).pathname

export default defineConfig({
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
})
