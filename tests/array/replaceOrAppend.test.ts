import * as _ from 'radashi'

describe('replaceOrAppend', () => {
  const letters = ['a', 'b', 'c', 'd', 'e']
  const lettersXA = ['XA', 'b', 'c', 'd', 'e']
  const lettersXC = ['a', 'b', 'XC', 'd', 'e']
  const lettersXE = ['a', 'b', 'c', 'd', 'XE']
  const lettersXX = ['a', 'b', 'c', 'd', 'e', 'XX']

  test('returns list for undefined new item input', () => {
    const result = _.replaceOrAppend(['a'], undefined, _ => false)
    expect(result).toEqual(['a'])
  })
  test('returns replaced item when value is null', () => {
    const result = _.replaceOrAppend(['a'], null, i => i === 'a')
    expect(result).toEqual([null])
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
