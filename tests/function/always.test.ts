import * as _ from 'radashi'

describe('always', () => {
  test('always returns the given value', () => {
    const fn: (...args: any[]) => true = _.always(true)
    expect(fn()).toBe(true)
    expect(fn(1, 2, 3)).toBe(true)
  })
})
