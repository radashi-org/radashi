import * as _ from 'radashi'

const cast = <T = any[]>(value: any): T => value

describe('selectFirst', () => {
  test('does not fail on bad input', () => {
    expect(
      _.selectFirst(
        cast(null),
        x => x,
        x => x,
      ),
    ).toBeUndefined()
    expect(
      _.selectFirst(
        cast(undefined),
        x => x,
        x => x,
      ),
    ).toBeUndefined()
  })
  test('returns mapped result of first value that meets the condition', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    const result = _.selectFirst(
      list,
      x => x.word,
      x => x.group === 'b',
    )
    expect(result).toEqual('bye')
  })
  test('does not fail on empty input list', () => {
    const list: any[] = []
    const result = _.selectFirst(
      list,
      (x: any) => x.word,
      x => x.group === 'a',
    )
    expect(result).toBeUndefined()
  })
  test('works with index', () => {
    const letters = ['a', 'b', 'c', 'd']
    const result = _.selectFirst(
      letters,
      (l, idx) => `${l}${idx}`,
      (_, idx) => idx > 1,
    )
    expect(result).toEqual('c2')
  })
  test('works without a condition callback, filtering nullish mapped values', () => {
    const list = [{ a: null }, { a: undefined }, { b: 2 }, { a: 1 }, { a: 3 }]
    const result = _.selectFirst(list, el => el.a)
    expect(result).toEqual(1)
  })
  test('maps a matched undefined element', () => {
    const list = [undefined, 1]
    const mapper = (x: number | undefined) => (x === undefined ? 'none' : x)
    expect(_.selectFirst(list, mapper, () => true)).toEqual('none')
    expect(_.selectFirst(list, mapper)).toEqual('none')
  })
  test('maps a matched undefined element past the first index', () => {
    const list = [0, undefined, 2]
    const result = _.selectFirst(
      list,
      x => (x === undefined ? 'none' : x),
      (_x, idx) => idx === 1,
    )
    expect(result).toEqual('none')
  })
  test('maps the same value that matched the condition', () => {
    const values = [1]
    const result = _.selectFirst(
      values,
      value => value * 10,
      () => {
        values[0] = 2
        return true
      },
    )
    expect(result).toEqual(10)
  })
})
