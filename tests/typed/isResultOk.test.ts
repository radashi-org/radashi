import * as _ from 'radashi'

describe('isResultOk', () => {
  test('valid Ok results', () => {
    expect(_.isResultOk([undefined, 42])).toBe(true)
  })
  test('invalid Ok results', () => {
    expect(_.isResultOk([new Error(), undefined])).toBe(false)
  })
  test('other values', () => {
    expect(_.isResultOk([])).toBe(false)
    expect(_.isResultOk({})).toBe(false)
    expect(_.isResultOk(null)).toBe(false)
  })
})
