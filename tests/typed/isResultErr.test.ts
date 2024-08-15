import * as _ from 'radashi'

describe('isResultErr', () => {
  test('valid Err results', () => {
    expect(_.isResultErr([new Error(), undefined])).toBe(true)
  })
  test('invalid Err results', () => {
    expect(_.isResultErr([undefined, 42])).toBe(false)
  })
  test('other values', () => {
    expect(_.isResultErr([])).toBe(false)
    expect(_.isResultErr({})).toBe(false)
    expect(_.isResultErr(null)).toBe(false)
  })
})
