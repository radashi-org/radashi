import * as _ from 'radashi'
import { bench } from 'vitest'

describe('construct', () => {
  bench('with valid input', () => {
    const now = new Date()
    _.construct({
      name: 'ra',
      power: 100,
      'friend.name': 'loki',
      'friend.power': 80,
      'enemies.0.name': 'hathor',
      'enemies.0.power': 12,
      'enemies.1.name': 'vishnu',
      'enemies.1.power': 58,
      timestamp: now,
    })
  })
})
