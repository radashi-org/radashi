import * as _ from 'radashi'

describe('boil', () => {
  test('compares and keeps item based on condition', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 },
    ]
    const result = _.boil(list, (a, b) => (a.score > b.score ? a : b))
    expect(result!.game).toBe('e')
    expect(result!.score).toBe(500)
  })
  test('does not fail when provided array is empty', () => {
    const result = _.boil([], () => true)
    expect(result).toBeNull()
  })
})
