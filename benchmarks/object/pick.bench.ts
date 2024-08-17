import * as _ from 'radashi'

describe('pick', () => {
  bench('with empty keys', () => {
    _.pick({ a: 2 }, [])
  })

  bench('with key not in object', () => {
    _.pick({ a: 2, b: 3 }, ['c'] as any)
  })

  bench('with one key not in object', () => {
    _.pick({ a: 2, b: 3 }, ['a', 'c'] as any)
  })
})
