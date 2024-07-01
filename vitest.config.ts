import codspeed from '@codspeed/vitest-plugin'
import { defineConfig, UserConfig } from 'vitest/config'

// FIXME: vitest doesn‘t provide the Plugin type???
type Plugin = Extract<UserConfig['plugins'], any[]>[number]

const resolve = (specifier: string) =>
  new URL(import.meta.resolve(specifier)).pathname

export default defineConfig(({ mode }) => ({
  test: {
    globals: true,
    coverage: {
      thresholds: { 100: true },
      exclude: ['*.config.ts'],
    },
  },
  resolve: {
    alias: {
      radashi: resolve('./src/mod.js'),
    },
  },
  plugins: [
    mode === 'benchmark' && process.env.CI ? (codspeed() as Plugin) : [],
  ],
}))
