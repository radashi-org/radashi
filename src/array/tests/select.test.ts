import * as _ from 'radashi'

const cast = <T = any[]>(value: any): T => value

describe('select function', () => {
  test('does not fail on bad input', () => {
    expect(
      _.select(
        cast(null),
        x => x,
        x => x,
      ),
    ).toEqual([])
    expect(
      _.select(
        cast(undefined),
        x => x,
        x => x,
      ),
    ).toEqual([])
  })
  test('returns mapped and filtered values', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    const result = _.select(
      list,
      x => x.word,
      x => x.group === 'a',
    )
    expect(result).toEqual(['hello', 'oh'])
  })
  test('does not fail on empty input list', () => {
    const list: any[] = []
    const result = _.select(
      list,
      (x: any) => x.word,
      x => x.group === 'a',
    )
    expect(result).toEqual([])
  })
  test('works with index', () => {
    const letters = ['a', 'b', 'c', 'd']
    const result = _.select(
      letters,
      (l, idx) => `${l}${idx}`,
      (_, idx) => idx > 1,
    )
    expect(result).toEqual(['c2', 'd3'])
  })
  test('works without a condition callback', () => {
    const list = [{ a: 1 }, { b: 2 }, { a: 3 }, { a: null }, { a: undefined }]
    const result = _.select(list, obj => obj.a)
    expect(result).toEqual([1, 3])
  })
})
