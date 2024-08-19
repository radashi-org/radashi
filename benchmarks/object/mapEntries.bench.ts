import * as _ from 'radashi'

describe('mapEntries', () => {
  bench('with valid input', () => {
    const peopleByRole = {
      admin: 'jay',
      user: 'fey',
      guest: 'bray',
    }
    _.mapEntries(peopleByRole, (key, value) => [value, key.toUpperCase()])
  })
})
