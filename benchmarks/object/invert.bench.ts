import * as _ from 'radashi'

describe('invert', () => {
  bench('with empty object', () => {
    _.invert({})
  })

  bench('with non-empty object', () => {
    _.invert({
      admin: 'jay',
      user: 'fey',
      guest: 'bray',
    })
  })
})
