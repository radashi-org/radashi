import * as _ from 'radashi'

describe('shift', () => {
  bench('with non-empty array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    _.shift(arr, 3)
  })

  bench('with empty array', () => {
    _.shift([], -3)
  })
})
