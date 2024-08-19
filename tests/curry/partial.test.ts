// cSpell:ignore partialed

import * as _ from 'radashi'

describe('partial', () => {
  test('passes single args', () => {
    const add = (a: number, b: number) => a + b
    const expected = 20
    const partialed = _.partial(add, 10)
    const result = partialed(10)
    expect(result).toBe(expected)
  })
  test('passes many args', () => {
    const add = (...nums: number[]) => nums.reduce((a, b) => a + b, 0)
    const expected = 10
    const result = _.partial(add, 2, 2, 2)(2, 2)
    expect(result).toBe(expected)
  })
})
