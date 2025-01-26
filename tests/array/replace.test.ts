import * as _ from 'radashi'

describe('replace', () => {
  test('returns the list for an undefined new item', () => {
    const result = _.replace(['a'], undefined, () => true)
    expect(result).toEqual(['a'])
  })
  test('returns replaced item when value is null', () => {
    const result = _.replace(['a'], null, i => i === 'a')
    expect(result).toEqual([null])
  })
  test('returns replaced item by index', () => {
    const result = _.replace(
      ['a', 'b', 'c', 'd'],
      'BB',
      (_letter, idx) => idx === 1,
    )
    expect(result[1]).toBe('BB')
  })
  test('returns copy of list with replaced item', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    const result = _.replace(
      list,
      { game: 'x', score: 800 },
      item => item.game === 'a',
    )
    expect(result[0].game).toBe('x')
    expect(list[1].game).toBe('b')
  })
  test('returns copy of list without changing', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    const result = _.replace(
      list,
      { game: 'x', score: 800 },
      item => item.game === 'XX',
    )
    expect(result[0].game).toBe('a')
    expect(list[1].game).toBe('b')
  })
})
