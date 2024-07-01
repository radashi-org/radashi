import * as _ from 'radashi'
import { bench } from 'vitest'

describe('zip', () => {
  bench('with non-empty arrays', () => {
    _.zip(['a', 'b'], [1, 2], [true, false])
  })
})
