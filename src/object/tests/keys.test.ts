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
        power: 80,
      },
      enemies: [
        {
          name: 'hathor',
          power: 12,
        },
      ],
    }
    expect(_.keys(ra)).toEqual([
      'name',
      'power',
      'friend.name',
      'friend.power',
      'enemies.0.name',
      'enemies.0.power',
    ])
  })
  test('works with Object.create(null)', () => {
    const object = Object.create(null)
    object.a = 1
    object.b = [2]
    object.c = { d: 3 }
    const result = _.keys(object)
    expect(result).toEqual(['a', 'b.0', 'c.d'])
  })
})
