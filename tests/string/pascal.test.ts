import * as _ from 'radashi'

describe('pascal', () => {
  test('returns non alphanumerics in pascal', () => {
    const result = _.pascal('Exobase Starter_flash AND-go')
    expect(result).toBe('ExobaseStarterFlashAndGo')
  })
  test('returns single word', () => {
    const result = _.pascal('hello')
    expect(result).toBe('Hello')
  })
  test('returns empty string for empty input', () => {
    expect(_.pascal('')).toBe('')
  })
  test('converts camelCase to PascalCase', () => {
    const result = _.pascal('fooBar')
    expect(result).toBe('FooBar')
  })
})
