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
  test('a word in camel case should remain in camel case', () => {
    const result = _.camel('helloWorld')
    expect(result).toBe('helloWorld')
  })
  test('returns non alphanumerics with -space and capital', () => {
    const result = _.camel('Exobase Starter_flash AND-go')
    expect(result).toBe('exobaseStarterFlashAndGo')
  })
})
