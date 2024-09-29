import fs from 'node:fs'
import v8 from 'node:v8'
import { defineConfig } from 'vitest/config'

const resolve = (specifier: string) =>
  new URL(import.meta.resolve(specifier)).pathname

export default defineConfig(env => ({
  test: {
    globals: true,
    include: ['tests/**/*.test.ts'],
    benchmark: {
      include: ['(benchmarks|comparisons)/**/*.bench.ts'],
      reporters: [
        'default',
        {
          onInit() {
            // debug heap stats
            ;(async () => {
              while (true) {
                await new Promise(r => setTimeout(r, 1000))
                const stats = v8.getHeapStatistics()
                stats.malloced_memory
                fs.appendFileSync('./heap.csv', `${stats.used_heap_size}\n`)
              }
            })()
          },
        },
      ],
    },
    coverage: {
      thresholds: { 100: true },
      include: ['src/**'],
    },
    setupFiles: env.mode === 'benchmark' ? ['benchmarks/globals.ts'] : [],
    typecheck: {
      include: ['tests/**/*.test-d.ts'],
      enabled: true,
      tsconfig: 'tests/tsconfig.json',
    },
    pool: env.mode === 'benchmark' ? 'threads' : 'forks',
    // temporarily testing to improve performance
    poolOptions: {
      threads: {
        isolate: false,
        execArgv: ['cpu-prof-dir', 'disabled-threads-profiling'],
      },
    },
  },
  resolve: {
    alias: {
      radashi: resolve('./src/mod.js'),
    },
  },
}))
