import { defineConfig } from 'vitest/config'

const resolve = (specifier: string) =>
  new URL(import.meta.resolve(specifier)).pathname

export default defineConfig({
  test: {
    globals: true,
    include: ['tests/**/*.test.ts'],
    benchmark: {
      include: ['benchmarks/**/*.bench.ts'],
    },
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
