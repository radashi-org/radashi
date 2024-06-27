import * as _ from 'radashi'

describe('compare function', () => {
  test('accepts a property name', () => {
    const compare = _.compare('a')
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
  })
  test('accepts a property name and a compare function', () => {
    const order = vi.fn((a: number, b: number) => a - b)
    const compare = _.compare('a', order)
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
    expect(order).toHaveBeenCalledTimes(2)
  })
  test('accepts a getter', () => {
    const compare = _.compare((obj: { a: number }) => obj.a)
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
  })
  test('accepts a getter and a compare function', () => {
    const order = vi.fn((a: number, b: number) => a - b)
    const compare = _.compare((obj: { a: number }) => obj.a, order)
    expect(compare({ a: 1 }, { a: 2 })).toBe(-1)
    expect(compare({ a: 2 }, { a: 1 })).toBe(1)
  })
})