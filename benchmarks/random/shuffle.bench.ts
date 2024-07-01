import * as _ from 'radashi'
import { bench } from 'vitest'

describe('shuffle', () => {
  bench('with valid input', () => {
    const list = [1, 2, 3, 4, 5]
    _.shuffle(list)
  })
})
