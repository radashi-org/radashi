import * as _ from 'radashi'

describe('remove', () => {
  bench('removing a single item by predicate', () => {
    const array = ['a', 'b', 'c', 'd']
    _.remove(array, item => item === 'b')
  })

  bench('removing from a list of objects', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
    ]
    _.remove(list, item => item.score === 200)
  })

  bench('removing from a large array with a complex condition', () => {
    const largeArray = Array(1000)
      .fill(null)
      .map((_, idx) => ({ id: idx, value: idx % 2 === 0 }))
    _.remove(largeArray, item => item.value === false)
  })
})
