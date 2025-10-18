import * as _ from 'radashi'

describe('getOrInsert', () => {
  test('returns existing map value without overwriting', () => {
    const counts = new Map<string, number>()
    const first = _.getOrInsert(counts, 'clicks', 1)
    const second = _.getOrInsert(counts, 'clicks', 5)

    expect(first).toBe(1)
    expect(second).toBe(1)
    expect(counts.get('clicks')).toBe(1)
  })

  test('stores value for weak map keys', () => {
    const key = {}
    const values = new WeakMap<object, { count: number }>()

    const initial = { count: 1 }
    const first = _.getOrInsert(values, key, initial)
    const second = _.getOrInsert(values, key, { count: 2 })

    expect(first).toBe(initial)
    expect(second).toBe(initial)
    expect(values.get(key)).toBe(initial)
  })
})
