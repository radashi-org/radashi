import * as _ from 'radashi'

const cast = <T = unknown[]>(value: any) => value as T

describe('merge function', () => {
  test('returns empty array for two null inputs', () => {
    const result = _.merge(cast(null), cast(null), _ => '')
    expect(result).toEqual([])
  })
  test('returns an empty array for two empty array inputs', () => {
    const result = _.merge([], [], _ => '')
    expect(result).toEqual([])
  })
  test('returns root for a null other input', () => {
    const result = _.merge([], cast(null), _ => '')
    expect(result).toEqual([])
  })
  test('returns empty array for a null root input', () => {
    const result = _.merge(cast(null), [], _ => '')
    expect(result).toEqual([])
  })
  test('returns root for a null matcher input', () => {
    const result = _.merge(['a'], [], cast(null))
    expect(result).toEqual(['a'])
  })
  test('returns correctly mergeped lists', () => {
    const inputA = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' }
    ]
    const inputB = [
      { name: 'ray', group: 'XXX' },
      { name: 'mary', group: 'YYY' }
    ]
    const result = _.merge(inputA, inputB, x => x.name)
    expect(result[0].group).toBe('XXX')
    expect(result[1].group).toBe('X')
    expect(result[2].group).toBe('Y')
    expect(result[3].group).toBe('YYY')
  })
})
