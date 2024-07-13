import * as _ from 'radashi'

describe('castComparator', () => {
  test('accepts a property name', () => {
    const compare = _.castComparator('a')
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
    expect(compare({ a: 1 }, { a: 1 })).toBe(0)
  })
  test('accepts a property name and a compare function', () => {
    const ascending = vi.fn((a: number, b: number) => a - b)
    const compare = _.castComparator('a', ascending)
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
    expect(ascending).toHaveBeenCalledTimes(2)
  })
  test('accepts a mapping function', () => {
    const compare = _.castComparator((obj: { a: number }) => obj.a)
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
  })
  test('accepts a mapping function and a compare function', () => {
    const order = vi.fn((a: number, b: number) => a - b)
    const compare = _.castComparator((obj: { a: number }) => obj.a, order)
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
  })
})
