import * as _ from 'radashi'
import { bench } from 'vitest'

describe('circularShift', () => {
  bench('with non-empty array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    _.circularShift(arr, 3)
  })

  bench('with empty array', () => {
    _.circularShift([], -3)
  })
})
