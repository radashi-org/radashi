import * as _ from 'radashi'
import { bench } from 'vitest'

describe('zipToObject', () => {
  bench('with non-empty arrays', () => {
    _.zipToObject(['a', 'b'], [1, 2])
  })

  bench('with custom map function', () => {
    _.zipToObject(['a', 'b'], (k, i) => k + i)
  })

  bench('with only one value', () => {
    _.zipToObject(['a', 'b'], 1)
  })
})
