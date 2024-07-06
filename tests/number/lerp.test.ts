import * as _ from 'radashi'

describe('lerp', () => {
  test('linearly interpolate between two numbers', () => {
    expect(_.lerp(0, 10, 0.5)).toBe(5)
    expect(_.lerp(5, 15, 0.2)).toBe(7)
    expect(_.lerp(-10, 10, 0.75)).toBe(5)
  })
  test('edge cases', () => {
    expect(_.lerp(0, 10, 0)).toBe(0)
    expect(_.lerp(0, 10, 1)).toBe(10)
    expect(_.lerp(5, 5, 0.5)).toBe(5)
  })
  test('negative numbers', () => {
    expect(_.lerp(-5, 5, 0.5)).toBe(0)
    expect(_.lerp(-10, -5, 0.5)).toBe(-7.5)
  })
  test('decimal results', () => {
    expect(_.lerp(0, 1, 0.3)).toBeCloseTo(0.3, 5)
    expect(_.lerp(1, 2, 0.75)).toBeCloseTo(1.75, 5)
  })
})
