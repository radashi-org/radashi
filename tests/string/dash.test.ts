import * as _ from 'radashi'

describe('dash', () => {
  test('returns correctly cased string', () => {
    const result = _.dash('hello world')
    expect(result).toBe('hello-world')
  })
  test('returns single word', () => {
    const result = _.dash('hello')
    expect(result).toBe('hello')
  })
  test('returns empty string for empty input', () => {
    const result = _.dash(null as any)
    expect(result).toBe('')
  })
  test('must handle strings that are camelCase', () => {
    const result = _.dash('helloWorld')
    expect(result).toBe('hello-world')
  })
  test('must handle strings that are dash', () => {
    const result = _.dash('hello-world')
    expect(result).toBe('hello-world')
  })
  test('returns non alphanumerics with -', () => {
    const result = _.dash('Exobase Starter_flash AND-go')
    expect(result).toBe('exobase-starter-flash-and-go')
  })
})
