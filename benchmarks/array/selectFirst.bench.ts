import * as _ from 'radashi'
import { bench } from 'vitest'

describe('selectFirst', () => {
  bench('with non-empty input list', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    _.selectFirst(
      list,
      x => x.word,
      x => x.group === 'b',
    )
  })

  bench('with empty input list', () => {
    const list: any[] = []
    _.selectFirst(
      list,
      (x: any) => x.word,
      x => x.group === 'a',
    )
  })

  bench('with index', () => {
    const letters = ['a', 'b', 'c', 'd']
    _.selectFirst(
      letters,
      (l, idx) => `${l}${idx}`,
      (_, idx) => idx > 1,
    )
  })

  bench('without a condition callback', () => {
    const list = [{ a: null }, { a: undefined }, { b: 2 }, { a: 1 }, { a: 3 }]
    _.selectFirst(list, el => el.a)
  })
})
