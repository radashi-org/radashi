import * as _ from 'radashi'

describe('getOrInsertComputed', () => {
  bench('with new key', () => {
    const counts = new Map<string, number>()
    _.getOrInsertComputed(counts, 'clicks', () => 1)
  })

  bench('with existing key', () => {
    const counts = new Map<string, number>([['clicks', 1]])
    _.getOrInsertComputed(counts, 'clicks', () => 2)
  })
})
