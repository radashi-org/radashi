import * as _ from 'radashi'

describe('max', () => {
  bench('with list of numbers', () => {
    const list = [5, 5, 10, 2]
    _.max(list)
  })

  bench('with list of objects', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 },
    ]
    _.max(list, x => x.score)
  })
})
