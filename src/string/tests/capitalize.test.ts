import * as _ from 'radashi'

describe('capitalize function', () => {
  test('handles null', () => {
    const result = _.capitalize(null as any)
    expect(result).toBe('')
  })
  test('converts hello as Hello', () => {
    const result = _.capitalize('hello')
    expect(result).toBe('Hello')
  })
  test('converts hello Bob as Hello bob', () => {
    const result = _.capitalize('hello Bob')
    expect(result).toBe('Hello bob')
  })
})
