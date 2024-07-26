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
  test('handles arrays', () => {
    const obj = ['value', 123.4, true]
    expect(_.crush(obj)).toEqual({
      '0': 'value',
      '1': 123.4,
      '2': true,
    })
  })
  describe('property names containing period', () => {
    test('inside the root object', () => {
      const obj = {
        'a.b': { c: 'value' },
      }
      expect(_.crush(obj)).toEqual({
        'a.b.c': 'value',
      })
    })
    test('inside a nested object', () => {
      const obj = {
        a: { 'b.c': 'value' },
      }
      expect(_.crush(obj)).toEqual({
        'a.b.c': 'value',
      })
    })
    test('inside both root and nested object', () => {
      const obj = {
        'a.b': { 'c.d': 123.4 },
      }
      expect(_.crush(obj)).toEqual({
        'a.b.c.d': 123.4,
      })
    })
    test('crush array containing object with nested property', () => {
      const arr = [{ 'c.d': { 'e.f': 'g' } }]
      const obj = {
        'a.b': arr,
      }
      expect(_.crush(obj)).toEqual({
        'a.b.0.c.d.e.f': 'g',
      })
    })
    test('do not crush Date objects', () => {
      const date = new Date()
      const obj = {
        'a.b': date,
      }
      expect(_.crush(obj)).toEqual({
        'a.b': date,
      })
    })
    test('do not crush Map objects', () => {
      const map = new Map()
      map.set('a', 'b')
      map.set('c', 'd')
      const obj = {
        'a.b': map,
      }
      expect(_.crush(obj)).toEqual({
        'a.b': map,
      })
    })
  })
})
