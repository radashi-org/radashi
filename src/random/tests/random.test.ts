import * as _ from 'radashi'

describe('random function', () => {
  test('returns a number', () => {
    const result = _.random(0, 100)
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(100)
  })
})
