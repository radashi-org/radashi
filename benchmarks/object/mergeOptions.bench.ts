import * as _ from 'radashi'

describe('mergeOptions – performance benchmarks', () => {
  bench('shallow objects', () => {
    const a = { a: 1, b: 2, c: 3 }
    const b = { b: 4, c: 5, d: 6 }

    _.mergeOptions(a, b)
  })

  bench('nested objects (shallow merge only)', () => {
    const a = { nested: { x: 1, y: 2 }, flag: false }
    const b = { nested: { y: 3, z: 4 }, extra: 'yes' }

    _.mergeOptions(a, b)
  })

  bench('object with undefined props', () => {
    const a = { foo: 'bar', maybe: undefined }
    const b = { maybe: 'now defined', baz: 42 }

    _.mergeOptions(a, b)
  })

  bench('first undefined, second object', () => {
    const cfg = { host: 'localhost', port: 8080 }

    _.mergeOptions(undefined, cfg)
  })

  bench('first object, second undefined', () => {
    const defaults = { timeout: 1000 }

    _.mergeOptions(defaults, undefined)
  })

  bench('both undefined', () => {
    _.mergeOptions(undefined, undefined)
  })

  bench('large flat objects (~1000 props)', () => {
    const size = 1000
    const a: Record<string, number> = {}
    const b: Record<string, number> = {}

    Array.from({ length: size }, (_, i) => {
      a['key' + i] = i
      b['key' + (size - i)] = size - i
    })

    _.mergeOptions(a, b)
  })
})
