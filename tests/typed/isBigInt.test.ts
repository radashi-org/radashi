import * as _ from 'radashi'

describe('isBigInt function', () => {
  test('returns false for non-bigint values', () => {
    // Primitive values
    expect(_.isBigInt(null)).toBeFalsy()
    expect(_.isBigInt(undefined)).toBeFalsy()
    expect(_.isBigInt(false)).toBeFalsy()
    expect(_.isBigInt(22)).toBeFalsy()
    expect(_.isBigInt(22.0567)).toBeFalsy()
    expect(_.isBigInt(Number.NaN)).toBeFalsy()
    expect(_.isBigInt('0n')).toBeFalsy()

    // Objects and collections
    expect(_.isBigInt([1, 2, 3])).toBeFalsy()
    expect(_.isBigInt({})).toBeFalsy()
    expect(_.isBigInt(String('abc'))).toBeFalsy()

    // Class instance
    class Data {}
    expect(_.isBigInt(new Data())).toBeFalsy()
  })

  test('returns true for bigint values', () => {
    expect(_.isBigInt(22n)).toBeTruthy()
    expect(_.isBigInt(BigInt(22))).toBeTruthy()
  })
})
