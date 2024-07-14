import * as _ from 'radashi'

describe('mapify', () => {
  const list = [
    { id: 'a', word: 'hello' },
    { id: 'b', word: 'bye' },
    { id: 'c', word: 'oh' },
    { id: 'd', word: 'hey' },
    { id: 'e', word: 'ok' },
  ]
  test('returns correct map of values', () => {
    const result = _.mapify(
      list,
      x => x.id,
      x => x,
    )
    expect(result).toBeTypeOf(typeof new Map())
    expect(result.size).toBe(5)
    expect(result.get('a')?.word).toBe('hello')
    expect(result.get('b')?.word).toBe('bye')
  })
  test('does not fail on empty input list', () => {
    const result = _.mapify(
      [],
      (x: any) => x.id,
      x => x,
    )
    expect(result).toBeTypeOf(typeof new Map())
  })
  test('defaults value to array item', () => {
    const result = _.mapify(list.slice(0, 1), x => x.id)
    expect(result).toBeTypeOf(typeof new Map())
    expect(result.size).toBe(1)
    expect(result.get('a')?.word).toBe('hello')
  })
  test('an index is passed to getKey and getValue', () => {
    const result = _.mapify(
      list,
      (x, i) => x.id + i,
      (x, i) => x.word + i,
    )
    expect(result.get('a0')).toBe('hello0')
  })
})
