import * as _ from 'radashi'
import { bench } from 'vitest'

describe('flat', () => {
  bench('with non-empty input list', () => {
    const lists = [['a', 'b'], ['c', 'd'], ['e']]
    _.flat(lists)
  })
})
