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
})
