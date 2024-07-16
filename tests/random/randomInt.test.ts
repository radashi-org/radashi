import * as _ from 'radashi'

describe('randomInt', () => {
  test('returns a number', () => {
    const integers = _.list(0, 1000, () => _.randomInt(0, 100))
    expect(integers.every(n => n >= 0 && n <= 100 && Number.isInteger(n))).toBe(
      true,
    )
  })
})
