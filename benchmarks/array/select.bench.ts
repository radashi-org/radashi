import * as _ from 'radashi'

describe('select', () => {
  bench('with non-empty input list', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    _.select(
      list,
      x => x.word,
      x => x.group === 'a',
    )
  })

  bench('with empty input list', () => {
    const list: any[] = []
    _.select(
      list,
      (x: any) => x.word,
      x => x.group === 'a',
    )
  })

  bench('with index', () => {
    const letters = ['a', 'b', 'c', 'd']
    _.select(
      letters,
      (l, idx) => `${l}${idx}`,
      (_, idx) => idx > 1,
    )
  })

  bench('without a condition callback', () => {
    const list = [{ a: 1 }, { b: 2 }, { a: 3 }, { a: null }, { a: undefined }]
    _.select(list, obj => obj.a)
  })
})
