import * as _ from 'radashi'

describe('camel function', () => {
  test('returns correctly cased string', () => {
    const result = _.camel('hello world')
    expect(result).toBe('helloWorld')
  })
  test('returns single word', () => {
    const result = _.camel('hello')
    expect(result).toBe('hello')
  })
  test('returns empty string for empty input', () => {
    const result = _.camel(null as any)
    expect(result).toBe('')
  })
  test('a word in camel case should remain in camel case', () => {
    const result = _.camel('helloWorld')
    expect(result).toBe('helloWorld')
  })
})

describe('camelCase function', () => {
  test('returns non alphanumerics with -space and capital', () => {
    const result = _.camel('Exobase Starter_flash AND-go')
    expect(result).toBe('exobaseStarterFlashAndGo')
  })
})
