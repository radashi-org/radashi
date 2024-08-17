import * as _ from 'radashi'

describe('first', () => {
  bench('with non-empty array', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    _.first(list)
  })

  bench('with empty array and a default value', () => {
    _.first([], 'yolo')
  })
})
