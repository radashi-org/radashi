import * as _ from 'radashi'

describe('objectify', () => {
  const list = [
    { id: 'a', word: 'hello' },
    { id: 'b', word: 'bye' },
    { id: 'c', word: 'oh' },
    { id: 'd', word: 'hey' },
    { id: 'e', word: 'ok' },
  ]
  test('returns correct map of values', () => {
    const result = _.objectify(
      list,
      (x, i) => `${x.id}_${i}`,
      (x, i) => `${x.word}-${i}`,
    )
    expect(result.a_0).toBe('hello-0')
    expect(result.b_1).toBe('bye-1')
  })
  test('does not fail on empty input list', () => {
    const result = _.objectify(
      [],
      (x: any) => x.id,
      x => x,
    )
    expect(result).toEqual({})
  })
  test('defaults value to array item', () => {
    const result = _.objectify(list.slice(0, 1), x => x.id)
    expect(result).toEqual({
      a: { id: 'a', word: 'hello' },
    })
  })
})
