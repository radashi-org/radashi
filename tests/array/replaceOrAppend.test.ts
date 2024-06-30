import * as _ from 'radashi'

const cast = <T = unknown[]>(value: any) => value as T

describe('replaceOrAppend', () => {
  const letters = ['a', 'b', 'c', 'd', 'e']
  const lettersXA = ['XA', 'b', 'c', 'd', 'e']
  const lettersXC = ['a', 'b', 'XC', 'd', 'e']
  const lettersXE = ['a', 'b', 'c', 'd', 'XE']
  const lettersXX = ['a', 'b', 'c', 'd', 'e', 'XX']
  test('returns empty array for two null inputs', () => {
    const result = _.replaceOrAppend(cast(null), null, _ => false)
    expect(result).toEqual([])
  })
  test('returns array with new item for null list input', () => {
    const result = _.replaceOrAppend(cast(null), 'a', _ => false)
    expect(result).toEqual(['a'])
  })
  test('returns list for null new item input', () => {
    const result = _.replaceOrAppend(['a'], null, _ => false)
    expect(result).toEqual(['a'])
  })
  test('returns list with item replacing match by index', () => {
    const result = _.replaceOrAppend(
      ['a', 'b', 'c', 'd'],
      'BB',
      (_letter, idx) => idx === 1,
    )
    expect(result[1]).toBe('BB')
  })
  test('returns list with item replacing match', () => {
    const result = _.replaceOrAppend(letters, 'XA', x => x === 'a')
    expect(result).toEqual(lettersXA)
  })
  test('returns list with item replacing match in middle', () => {
    const result = _.replaceOrAppend(letters, 'XC', x => x === 'c')
    expect(result).toEqual(lettersXC)
  })
  test('returns list with item replacing match at end', () => {
    const result = _.replaceOrAppend(letters, 'XE', x => x === 'e')
    expect(result).toEqual(lettersXE)
  })
  test('returns list with item appended', () => {
    const result = _.replaceOrAppend(letters, 'XX', x => x === 'x')
    expect(result).toEqual(lettersXX)
  })
})
