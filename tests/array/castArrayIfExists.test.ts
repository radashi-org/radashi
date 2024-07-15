import * as _ from 'radashi'

describe('castArrayIfExists', () => {
  test('return a shallow copy if input is an array', () => {
    const input = [1, 2, 3]
    expect(_.castArrayIfExists(input)).toEqual(input)
    expect(_.castArrayIfExists(input)).not.toBe(input)
  })
  test('return a new array with the same elements if input is an array', () => {
    const input = [1, 2, 3]
    const result = _.castArrayIfExists(input)
    expect(result).toEqual(input)
    expect(result).not.toBe(input) // Ensure it's a copy
  })
  test('return an array with the input if input is not an array', () => {
    const input = 1
    expect(_.castArrayIfExists(input)).toEqual([input])
  })
  test('handle nullish values', () => {
    expect(_.castArrayIfExists(null)).toEqual(null)
    expect(_.castArrayIfExists(undefined)).toEqual(undefined)
  })
  test('handle primitives', () => {
    expect(_.castArrayIfExists(1)).toEqual([1])
    expect(_.castArrayIfExists('a')).toEqual(['a'])
    expect(_.castArrayIfExists(true)).toEqual([true])
  })
  test('handle objects and functions', () => {
    const obj = { a: 1 }
    const func = () => {}
    expect(_.castArrayIfExists(obj)).toEqual([obj])
    expect(_.castArrayIfExists(func)).toEqual([func])
  })
})
