import * as _ from 'radashi'

describe('noop', () => {
  test('always returns undefined', () => {
    expect(_.noop()).toBe(undefined)
    expect(_.noop()).toBe(undefined)
  })
})
