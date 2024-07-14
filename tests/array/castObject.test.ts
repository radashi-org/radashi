import * as _ from 'radashi'

describe('castObject', () => {
  const list = [
    { id: 'a', word: 'hello' },
    { id: 'b', word: 'bye' },
    { id: 'c', word: 'oh' },
    { id: 'd', word: 'hey' },
    { id: 'e', word: 'ok' },
  ]
  test('returns correct map of values', () => {
    const result = _.castObject(
      list,
      x => x.id,
      x => x,
    )
    expect(result.a.word).toBe('hello')
    expect(result.b.word).toBe('bye')
  })
  test('does not fail on empty input list', () => {
    const result = _.castObject(
      [],
      (x: any) => x.id,
      x => x,
    )
    expect(result).toEqual({})
  })
  test('defaults value to array item', () => {
    const result = _.castObject(list.slice(0, 1), x => x.id)
    expect(result).toEqual({
      a: { id: 'a', word: 'hello' },
    })
  })
})
