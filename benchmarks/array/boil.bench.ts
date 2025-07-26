import * as _ from 'radashi'

describe('boil', () => {
  bench('with non-empty array', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 },
    ]
    _.boil(list, (a, b) => (a.score > b.score ? a : b))
  })

  bench('with empty array', () => {
    _.boil([], () => true)
  })
})
