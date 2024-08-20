import { defineConfig } from 'vitest/config'

const resolve = (specifier: string) =>
  new URL(import.meta.resolve(specifier)).pathname

export default defineConfig({
  resolve: {
    alias: {
      'radashi/typed/isArray.js': resolve('../../src/typed/isArray.ts'),
    },
  },
})
