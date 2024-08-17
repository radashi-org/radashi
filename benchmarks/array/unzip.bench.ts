import * as _ from 'radashi'

describe('unzip', () => {
  bench('with non-empty arrays', () => {
    _.unzip([
      ['a', 1, true],
      ['b', 2, false],
    ])
  })
})
