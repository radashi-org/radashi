import * as _ from 'radashi'

describe('partob', () => {
  test('partob passes single args', () => {
    const add = ({ a, b }: { a: number; b: number }) => a + b
    const expected = 20
    const result = _.partob(add, { a: 10 })({ b: 10 })
    expect(result).toBe(expected)
  })
  test('partob overrides inital with later', () => {
    const add = ({ a, b }: { a: number; b: number }) => a + b
    const expected = 15
    const result = _.partob(add, { a: 10 })({ a: 5, b: 10 } as any)
    expect(result).toBe(expected)
  })
})
