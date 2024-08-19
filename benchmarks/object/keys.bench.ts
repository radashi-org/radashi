import * as _ from 'radashi'

describe('keys', () => {
  bench('with empty object', () => {
    _.keys({})
  })

  bench('with non-empty object', () => {
    const ra = {
      name: 'ra',
      power: 100,
      friend: {
        name: 'loki',
        power: 80,
      },
      enemies: [
        {
          name: 'hathor',
          power: 12,
        },
      ],
    }
    _.keys(ra)
  })
})
