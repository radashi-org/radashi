import * as _ from 'radashi'
import { bench } from 'vitest'

describe('mapify', () => {
  bench('with full list and identity value function', () => {
    const list = [
      { id: 'a', word: 'hello' },
      { id: 'b', word: 'bye' },
      { id: 'c', word: 'oh' },
      { id: 'd', word: 'hey' },
      { id: 'e', word: 'ok' },
    ]
    _.objectify(
      list,
      x => x.id,
      x => x,
    )
  })

  bench('with empty list', () => {
    _.objectify(
      [],
      (x: any) => x.id,
      x => x,
    )
  })
})
