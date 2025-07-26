import * as vitest from 'vitest'

declare global {
  var bench: typeof import('vitest')['bench']
}

globalThis.bench = vitest.bench
