import * as _ from 'radashi'

describe('last', () => {
  bench('with valid input', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    _.last(list)
  })

  bench('with empty list', () => {
    const list = [] as string[]
    _.last(list, 'yolo')
  })
})
