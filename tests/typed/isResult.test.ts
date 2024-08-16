import * as _ from 'radashi'

describe('isResult', () => {
  test('should return true for valid Result tuples', () => {
    expect(_.isResult([undefined, 42])).toBe(true)
    expect(_.isResult([new Error(), undefined])).toBe(true)
    expect(_.isResult([undefined, undefined])).toBe(true)
  })

  test('should return false for invalid Result tuples', () => {
    expect(_.isResult([new Error(), true])).toBe(false)
    expect(_.isResult([new Error()])).toBe(false)
    expect(_.isResult([undefined, true, undefined])).toBe(false)
  })

  test('should return false for non-tuple values', () => {
    expect(_.isResult([])).toBe(false)
    expect(_.isResult({})).toBe(false)
    expect(_.isResult(null)).toBe(false)
  })
})
