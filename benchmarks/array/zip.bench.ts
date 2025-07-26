import * as _ from 'radashi'

describe('zip', () => {
  bench('with non-empty arrays', () => {
    _.zip(['a', 'b'], [1, 2], [true, false])
  })
})
