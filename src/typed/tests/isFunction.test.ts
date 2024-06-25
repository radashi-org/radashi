import * as _ from 'radashi'

describe('isFunction function', () => {
  test('returns false for null', () => {
    const result = _.isFunction(null)
    expect(result).toBeFalsy()
  })
  test('returns false for undefined', () => {
    const result = _.isFunction(undefined)
    expect(result).toBeFalsy()
  })
  test('returns false for boolean', () => {
    const result = _.isFunction(false)
    expect(result).toBeFalsy()
  })
  test('returns false for class instance', () => {
    class Data {}
    const result = _.isFunction(new Data())
    expect(result).toBeFalsy()
  })
  test('returns false for number', () => {
    const result = _.isFunction(22)
    expect(result).toBeFalsy()
  })
  test('returns false for string', () => {
    const result = _.isFunction('abc')
    expect(result).toBeFalsy()
  })
  test('returns false for array', () => {
    const result = _.isFunction([1, 2, 3])
    expect(result).toBeFalsy()
  })
  test('returns false for object', () => {
    const result = _.isFunction({})
    expect(result).toBeFalsy()
  })
  test('returns true for anonymous function', () => {
    const result = _.isFunction(function () {
      return 'hello'
    })
    expect(result).toBeTruthy()
  })
  test('returns true for arrow function', () => {
    const result = _.isFunction(() => {
      return 'hello'
    })
    expect(result).toBeTruthy()
  })
  test('returns true for named function', () => {
    function sayHello() {
      return 'hello'
    }
    const result = _.isFunction(sayHello)
    expect(result).toBeTruthy()
  })
})
