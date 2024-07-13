import * as _ from 'radashi'

describe('castArray', () => {
  test('return the same array if input is an array', () => {
    const input = [1, 2, 3]
    expect(_.castArray(input)).toEqual(input)
  })
  test('return a new array with the same elements if input is an array', () => {
    const input = [1, 2, 3]
    const result = _.castArray(input)
    expect(result).toEqual(input)
    expect(result).not.toBe(input) // Ensure it's a copy
  })
  test('return an array with the input if input is not an array', () => {
    const input = 1
    expect(_.castArray(input)).toEqual([input])
  })
  test('handle primitives', () => {
    expect(_.castArray(1)).toEqual([1])
    expect(_.castArray('a')).toEqual(['a'])
    expect(_.castArray(true)).toEqual([true])
    expect(_.castArray(null)).toEqual([null])
    expect(_.castArray(undefined)).toEqual([undefined])
  })
  test('handle objects and functions', () => {
    const obj = { a: 1 }
    const func = () => {}
    expect(_.castArray(obj)).toEqual([obj])
    expect(_.castArray(func)).toEqual([func])
  })
})
