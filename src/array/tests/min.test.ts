import * as _ from 'radashi'

describe('min function', () => {
  test('returns the min value from list of number', () => {
    const list = [5, 5, 10, 2]
    const result = _.min(list)
    expect(result).toBe(2)
  })
  test('returns the min value from list of objects', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 }
    ]
    const result = _.min(list, x => x.score)
    expect(result!.game).toBe('a')
    expect(result!.score).toBe(100)
  })
})
