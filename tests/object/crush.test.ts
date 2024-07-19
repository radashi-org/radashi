import * as _ from 'radashi'

describe('crush', () => {
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
  test('handles property names with dots 1', () => {
    const obj = {
      a: { 'b.c': 'value' },
    }
    expect(_.crush(obj)).toEqual({
      'a.b.c': 'value',
    })
  })
  test('handles property names with dots 2', () => {
    const obj = {
      'a.b': { c: 'value' },
    }
    expect(_.crush(obj)).toEqual({
      'a.b.c': 'value',
    })
  })
  test('handles property names with dots 3', () => {
    const obj = {
      'a.b': { 'c.d': 123.4 },
    }
    expect(_.crush(obj)).toEqual({
      'a.b.c.d': 123.4,
    })
  })
  test('handles arrays', () => {
    const obj = ['value', 123.4, true]
    expect(_.crush(obj)).toEqual({
      '0': 'value',
      '1': 123.4,
      '2': true,
    })
  })
})
