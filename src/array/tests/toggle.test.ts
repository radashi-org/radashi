import * as _ from 'radashi'

const cast = <T = any[]>(value: any): T => value

describe('toggle function', () => {
  test('should handle null input list', () => {
    const result = _.toggle(cast(null), 'a')
    expect(result).toEqual(['a'])
  })
  test('should handle null input list and null item', () => {
    const result = _.toggle(cast(null), null)
    expect(result).toEqual([])
  })
  test('should handle null item', () => {
    const result = _.toggle(['a'], null)
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
      v => v.value
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
})
