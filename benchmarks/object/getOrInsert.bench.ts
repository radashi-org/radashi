import * as _ from 'radashi'

describe('getOrInsert', () => {
  bench('with new key', () => {
    const counts = new Map<string, number>()
    _.getOrInsert(counts, 'clicks', 1)
  })

  bench('with existing key', () => {
    const counts = new Map<string, number>([['clicks', 1]])
    _.getOrInsert(counts, 'clicks', 2)
  })
})
