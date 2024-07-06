import * as _ from 'radashi'

describe('flip function', () => {
  test('returns a new function that swaps the only two arguments of the original function', () => {
    const subtract = (a: number, b: number) => a - b
    const flipSubtract = _.flip(subtract)
    expect(subtract(1, 2)).toBe(-1)
    expect(flipSubtract(1, 2)).toBe(1)
  })
  test('more than two arguments', () => {
    const compute = (a: number, b: number, c: number) => a + b * c

    // 1 + 2 * 4
    expect(compute(1, 2, 4)).toBe(9)

    // 2 + 1 * 4
    const flippedCompute = _.flip(compute)
    expect(flippedCompute(1, 2, 4)).toBe(6)
  })
})
