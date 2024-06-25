import * as _ from 'radashi'

describe('keys function', () => {
  test('handles bad input', () => {
    expect(_.keys({})).toEqual([])
    expect(_.keys(null as any)).toEqual([])
    expect(_.keys(undefined as any)).toEqual([])
  })
  test('returns correct list of keys', () => {
    const ra = {
      name: 'ra',
      power: 100,
      friend: {
        name: 'loki',
        power: 80
      },
      enemies: [
        {
          name: 'hathor',
          power: 12
        }
      ]
    }
    expect(_.keys(ra)).toEqual([
      'name',
      'power',
      'friend.name',
      'friend.power',
      'enemies.0.name',
      'enemies.0.power'
    ])
  })
})
