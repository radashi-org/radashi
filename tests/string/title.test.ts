import * as _ from 'radashi'

describe('title function', () => {
  test('returns input formatted in title case', () => {
    expect(_.title('hello world')).toBe('Hello World')
    expect(_.title('va_va_boom')).toBe('Va Va Boom')
    expect(_.title('root-hook   -  ok!')).toBe('Root Hook Ok!')
    expect(_.title('queryItems')).toBe('Query Items')
    expect(_.title('queryAllItems-in_Database')).toBe(
      'Query All Items In Database',
    )
  })
  test('returns empty string for bad input', () => {
    expect(_.title(null)).toBe('')
    expect(_.title(undefined)).toBe('')
  })
})
