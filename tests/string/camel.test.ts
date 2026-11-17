import * as _ from 'radashi'

describe('camel', () => {
  test('returns correctly cased string', () => {
    const result = _.camel('hello world')
    expect(result).toBe('helloWorld')
  })
  test('returns single word', () => {
    const result = _.camel('hello')
    expect(result).toBe('hello')
  })
  test.each([
    ['_foo', 'foo'],
    [' hello world', 'helloWorld'],
    ['-foo-bar', 'fooBar'],
    ['._-\tfoo_bar', 'fooBar'],
  ])(
    'lowercases the first word after leading separators: %s',
    (input, expected) => {
      expect(_.camel(input)).toBe(expected)
    },
  )
  test.each(['', '._- \t'])(
    'returns an empty string when there are no words: %j',
    input => {
      expect(_.camel(input)).toBe('')
    },
  )
  test('ignores repeated and trailing separators', () => {
    expect(_.camel('foo__bar_')).toBe('fooBar')
  })
  test('a word in camel case should remain in camel case', () => {
    const result = _.camel('helloWorld')
    expect(result).toBe('helloWorld')
  })
  test('returns non alphanumerics with -space and capital', () => {
    const result = _.camel('Exobase Starter_flash AND-go')
    expect(result).toBe('exobaseStarterFlashAndGo')
  })
})
