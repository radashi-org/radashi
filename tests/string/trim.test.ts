import * as _ from 'radashi'

describe('trim', () => {
  test('handles bad input', () => {
    expect(_.trim(null)).toBe('')
    expect(_.trim(undefined)).toBe('')
  })
  test('returns input string correctly trimmed', () => {
    expect(_.trim('\n\n\t\nhello\n\t  \n', '\n\t ')).toBe('hello')
    expect(_.trim('hello', 'x')).toBe('hello')
    expect(_.trim(' hello  ')).toBe('hello')
    expect(_.trim(' __hello__  ', '_')).toBe(' __hello__  ')
    expect(_.trim('__hello__', '_')).toBe('hello')
    expect(_.trim('//repos////', '/')).toBe('repos')
    expect(_.trim('/repos/:owner/:repo/', '/')).toBe('repos/:owner/:repo')
  })

  test('handles when char to trim is special case in regex', () => {
    expect(_.trim('_- hello_- ', '_- ')).toBe('hello')
  })
})
