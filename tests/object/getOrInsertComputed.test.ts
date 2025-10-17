import * as _ from 'radashi'

describe('getOrInsertComputed', () => {
  test('computes value once per map key', () => {
    const counts = new Map<string, number>()
    const create = vi.fn(() => 1)
    const skip = vi.fn(() => 2)

    const first = _.getOrInsertComputed(counts, 'clicks', create)
    const second = _.getOrInsertComputed(counts, 'clicks', skip)

    expect(first).toBe(1)
    expect(second).toBe(1)
    expect(create).toHaveBeenCalledTimes(1)
    expect(skip).not.toHaveBeenCalled()
  })

  test('computes value for weak map keys', () => {
    const key = {}
    const values = new WeakMap<object, { count: number }>()
    const create = vi.fn(() => ({ count: 1 }))

    const first = _.getOrInsertComputed(values, key, create)
    const second = _.getOrInsertComputed(values, key, () => ({ count: 2 }))

    expect(second).toBe(first)
    expect(values.get(key)).toBe(first)
    expect(create).toHaveBeenCalledTimes(1)
  })
})
