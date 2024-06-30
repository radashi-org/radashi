import * as _ from 'radashi'

describe('pascal function', () => {
  test('returns non alphanumerics in pascal', () => {
    const result = _.pascal('Exobase Starter_flash AND-go')
    expect(result).toBe('ExobaseStarterFlashAndGo')
  })
  test('returns single word', () => {
    const result = _.pascal('hello')
    expect(result).toBe('Hello')
  })
  test('returns empty string for empty input', () => {
    const result = _.pascal(null as any)
    expect(result).toBe('')
  })
})
