import * as _ from 'radashi'

describe('flip function', () => {
  test('returns a new function that swaps the only two arguments of the original function', () => {
    const subtract = (a: number, b: number) => a - b
    const flipSubtract = _.flip(subtract)
    expect(subtract(1, 2)).toBe(-1)
    expect(flipSubtract(1, 2)).toBe(1)
  })
})
