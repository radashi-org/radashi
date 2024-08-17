import * as _ from 'radashi'

describe('flat', () => {
  bench('with non-empty input list', () => {
    const lists = [['a', 'b'], ['c', 'd'], ['e']]
    _.flat(lists)
  })
})
