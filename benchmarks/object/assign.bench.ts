import * as _ from 'radashi'

describe('assign', () => {
  bench('with valid input', () => {
    const initial = {
      name: 'jay',
      cards: ['ac'],
      location: {
        street: '23 main',
        state: {
          abbreviation: 'FL',
          name: 'Florida',
        },
      },
    }
    const override = {
      name: 'charles',
      cards: ['4c'],
      location: {
        street: '8114 capo',
        state: {
          abbreviation: 'TX',
          name: 'Texas',
        },
      },
    }
    _.assign(initial, override)
  })
})
