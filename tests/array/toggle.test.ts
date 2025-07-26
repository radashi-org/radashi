import * as _ from 'radashi'

describe('toggle', () => {
  test('should skip undefined item', () => {
    const result = _.toggle(['a'], undefined)
    expect(result).toEqual(['a'])
  })
  test('should add item when it does not exist using default matcher', () => {
    const result = _.toggle(['a'], 'b')
    expect(result).toEqual(['a', 'b'])
  })
  test('should remove item when it does exist using default matcher', () => {
    const result = _.toggle(['a', 'b'], 'b')
    expect(result).toEqual(['a'])
  })
  test('should remove item when it does exist using custom matcher', () => {
    const result = _.toggle(
      [{ value: 'a' }, { value: 'b' }],
      { value: 'b' },
      v => v.value,
    )
    expect(result).toEqual([{ value: 'a' }])
  })
  test('should add item when it does not exist using custom matcher', () => {
    const result = _.toggle([{ value: 'a' }], { value: 'b' }, v => v.value)
    expect(result).toEqual([{ value: 'a' }, { value: 'b' }])
  })
  test('should prepend item when strategy is set', () => {
    const result = _.toggle(['a'], 'b', null, { strategy: 'prepend' })
    expect(result).toEqual(['b', 'a'])
  })
  test('should work with falsy values', () => {
    expect(_.toggle([1, 2], 0)).toEqual([1, 2, 0])

    expect(_.toggle([1, 0, 2], 0)).toEqual([1, 2])

    expect(_.toggle([1, 2], null)).toEqual([1, 2, null])
  })
  test('should use idx=-1 for item', () => {
    const toKey = vi.fn(v => v)

    expect(_.toggle(['a', 'b'], 'c', toKey)).toEqual(['a', 'b', 'c'])

    expect(toKey).toBeCalledWith('c', -1)
    expect(toKey).toBeCalledWith('a', 0)
    expect(toKey).toBeCalledWith('b', 1)
  })
})
