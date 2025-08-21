import * as _ from 'radashi'

describe('identity', () => {
  test('always returns the value passed to it', () => {
    expect(_.identity()).toBe(undefined)
    expect(_.identity(1)).toBe(1)
    expect(_.identity('a')).toBe('a')
  })
})
