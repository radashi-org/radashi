import * as _ from 'radashi'

describe('inRange function', () => {
  test('handles nullish values', () => {
    expect(_.inRange(0, 1, null as any)).toBe(false)
    expect(_.inRange(0, null as any, 1)).toBe(false)
    expect(_.inRange(null as any, 0, 1)).toBe(false)
    expect(_.inRange(0, undefined as any, 1)).toBe(false)
    expect(_.inRange(undefined as any, 0, 1)).toBe(false)

    expect(_.inRange(0, 1, undefined as any)).toBe(true)
  })
  test('handles bad input', () => {
    const result = _.inRange(0, 1, {} as any)
    expect(result).toBe(false)
  })
  test('computes correctly', () => {
    expect(_.inRange(10, 0, 5)).toBe(false)
    expect(_.inRange(10, 0, 20)).toBe(true)
    expect(_.inRange(-10, 0, -20)).toBe(true)
    expect(_.inRange(9.99, 0, 10)).toBe(true)
    expect(_.inRange(Math.PI, 0, 3.15)).toBe(true)
  })
  test('handles the different syntax of number type', () => {
    expect(_.inRange(0, -1, 1)).toBe(true)
    expect(_.inRange(Number(0), -1, 1)).toBe(true)
    expect(_.inRange(+'0', -1, 1)).toBe(true)
  })
  test('handles two params', () => {
    expect(_.inRange(1, 2)).toBe(true)
    expect(_.inRange(1.2, 2)).toBe(true)
    expect(_.inRange(2, 1)).toBe(false)
    expect(_.inRange(2, 2)).toBe(false)
    expect(_.inRange(3.2, 2)).toBe(false)
    expect(_.inRange(-1, 1)).toBe(false)
    expect(_.inRange(-1, -10)).toBe(true)
  })
  test('handles the exclusive end of the range', () => {
    expect(_.inRange(1, 0, 1)).toBe(false)
    expect(_.inRange(10.0, 0, 10)).toBe(false)
  })
  test('handles the inclusive start of the range', () => {
    expect(_.inRange(0, 0, 1)).toBe(true)
    expect(_.inRange(10.0, 10, 20)).toBe(true)
  })
})
