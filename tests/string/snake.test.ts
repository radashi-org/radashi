import * as _ from 'radashi'

describe('snake', () => {
  test('returns correctly cased string', () => {
    const result = _.snake('hello world')
    expect(result).toBe('hello_world')
  })
  test('must handle strings that are camelCase', () => {
    const result = _.snake('helloWorld')
    expect(result).toBe('hello_world')
  })
  test('must handle strings that are dash', () => {
    const result = _.snake('hello-world')
    expect(result).toBe('hello_world')
  })
  test('splits numbers that are next to letters', () => {
    const result = _.snake('hello-world12_19-bye')
    expect(result).toBe('hello_world_12_19_bye')
  })
  test('does not split numbers when flag is set to false', () => {
    const result = _.snake('hello-world12_19-bye', {
      splitOnNumber: false,
    })
    expect(result).toBe('hello_world12_19_bye')
  })
  test('returns single word', () => {
    const result = _.snake('hello')
    expect(result).toBe('hello')
  })
  test('returns non alphanumerics with _', () => {
    const result = _.snake('Exobase Starter_flash AND-go')
    expect(result).toBe('exobase_starter_flash_and_go')
  })
})
