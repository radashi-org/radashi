import * as _ from 'radashi'

describe('construct', () => {
  test('handles bad input', () => {
    expect(_.construct({})).toEqual({})
    expect(_.construct(null as any)).toEqual({})
    expect(_.construct(undefined as any)).toEqual({})
  })
  test('returns correctly constructed object', () => {
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
        {
          name: 'vishnu',
          power: 58,
        },
      ],
      timestamp: now,
    }
    expect(
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
      }),
    ).toEqual(ra)
  })
})
