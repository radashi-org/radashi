import * as _ from 'radashi'

describe('crush function', () => {
  test('handles bad input', () => {
    expect(_.crush({})).toEqual({})
    expect(_.crush(null as any)).toEqual({})
    expect(_.crush(undefined as any)).toEqual({})
  })
  test('returns correctly crushed object', () => {
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
    expect(_.crush(ra)).toEqual({
      name: 'ra',
      power: 100,
      'friend.name': 'loki',
      'friend.power': 80,
      'enemies.0.name': 'hathor',
      'enemies.0.power': 12,
      timestamp: now,
    })
  })
})
