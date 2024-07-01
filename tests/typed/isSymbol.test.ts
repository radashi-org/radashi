import * as _ from 'radashi'

describe('isSymbol', () => {
  test('returns false for null', () => {
    const input = null
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const input = undefined
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for empty class instance', () => {
    class Data {}
    const input = new Data()
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for class instance with properties', () => {
    class Data {
      name = 'ray'
    }
    const input = new Data()
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for number greater than 0', () => {
    const input = 22
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for number 0', () => {
    const input = 0
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for array with values', () => {
    const input = [1, 2, 3]
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for empty array', () => {
    const input: unknown[] = []
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for true', () => {
    const input = true
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for false', () => {
    const input = false
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for empty object', () => {
    const input = {}
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for object with values', () => {
    const input = { name: 'x' }
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for string with chars', () => {
    const input = 'abc'
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for empty string', () => {
    const input = ''
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for empty string class', () => {
    const input = ''
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for string class with chars', () => {
    const input = 'abc'
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns false for empty Map', () => {
    const input = new Map()
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
  test('returns true for empty Symbol', () => {
    const input = Symbol('')
    const result = _.isSymbol(input)
    expect(result).toBeTruthy()
  })
  test('returns true for Symbol instance', () => {
    const input = Symbol('hello')
    const result = _.isSymbol(input)
    expect(result).toBeTruthy()
  })
  test('returns false for Map with values', () => {
    const input = new Map()
    input.set('a', 1)
    input.set('b', 2)
    input.set('c', 3)
    const result = _.isSymbol(input)
    expect(result).toBeFalsy()
  })
})
