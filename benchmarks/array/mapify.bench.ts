import * as _ from 'radashi'

describe('mapify', () => {
  bench('with full list and identity value function', () => {
    const list = [
      { id: 'a', word: 'hello' },
      { id: 'b', word: 'bye' },
      { id: 'c', word: 'oh' },
      { id: 'd', word: 'hey' },
      { id: 'e', word: 'ok' },
    ]
    _.mapify(
      list,
      x => x.id,
      x => x,
    )
  })

  bench('with empty list', () => {
    _.mapify(
      [],
      (x: any) => x.id,
      x => x,
    )
  })
})
