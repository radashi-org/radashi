import * as _ from 'radashi'

describe('reduceKeys function', () => {
  test('does not require a key filter', () => {
    const result = _.reduceKeys(
      { a: 1, b: 2 },
      null,
      (acc, value) => acc + value,
      0
    )
    expect(result).toBe(3)
  })
  test('returns undefined when none of the given keys exist in the object', () => {
    const result = _.reduceKeys({ a: 1, b: '2' }, ['c'], () => 1)
    expect(result).toBe(undefined)
  })
  test('starts as undefined if no initial value is provided', () => {
    const obj = { a: 1, b: '2' }
    const result = _.reduceKeys(
      obj,
      null,
      (acc: any[][] | undefined, value, key, obj) => [
        ...(acc || [[acc]]),
        [value, key, obj]
      ]
    )
    expect(result).toEqual([[undefined], [1, 'a', obj], ['2', 'b', obj]])
  })
})
