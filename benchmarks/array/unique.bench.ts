import * as _ from 'radashi'

describe('unique', () => {
  bench('with non-empty array', () => {
    const list = [1, 1, 2]
    _.unique(list)
  })

  bench('with key fn', () => {
    const list = [
      { id: 'a', word: 'hello' },
      { id: 'a', word: 'hello' },
      { id: 'b', word: 'oh' },
      { id: 'b', word: 'oh' },
      { id: 'c', word: 'yolo' },
    ]
    _.unique(list, x => x.id)
  })
})
