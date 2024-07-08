import * as _ from 'radashi'
import { bench } from 'vitest'

describe('crush', () => {
  bench('with valid input', () => {
    const now = new Date()
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
      timestamp: now,
    }
    _.crush(ra)
  })
})
