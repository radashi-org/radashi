import * as _ from 'radashi'

describe('isBigInt function', () => {
  test('returns false for null', () => {
    const result = _.isBigInt(null)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const result = _.isBigInt(undefined)
    expect(result).toBeFalsy()
  })
  test('returns false for boolean', () => {
    const result = _.isBigInt(false)
    expect(result).toBeFalsy()
  })
  test('returns false for class instance', () => {
    class Data {}
    const result = _.isBigInt(new Data())
    expect(result).toBeFalsy()
  })
  test('returns false for int', () => {
    const result = _.isBigInt(22)
    expect(result).toBeFalsy()
  })
  test('returns false for float', () => {
    const result = _.isBigInt(22.0567)
    assert.isFalse(result)
  })
  test('returns false for NaN', () => {
    const result = _.isBigInt(Number.NaN)
    expect(result).toBeFalsy()
  })
  test('returns false for array', () => {
    const result = _.isBigInt([1, 2, 3])
    expect(result).toBeFalsy()
  })
  test('returns false for object', () => {
    const result = _.isBigInt({})
    expect(result).toBeFalsy()
  })
  test('returns false for string', () => {
    const result = _.isBigInt('abc')
    expect(result).toBeFalsy()
  })
  test('returns false for string class', () => {
    const result = _.isBigInt(String('abc'))
    expect(result).toBeFalsy()
  })
  test('returns true for bigint', () => {
    const result = _.isBigInt(22n)
    expect(result).toBeTruthy()
  })
  test('returns true for bigint class', () => {
    const result = _.isBigInt(BigInt(22))
    expect(result).toBeTruthy()
  })
})
