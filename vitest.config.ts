import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'c8', // using c8 for coverage
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: {
    alias: {
      tests: './src/tests'
    }
  }
})
