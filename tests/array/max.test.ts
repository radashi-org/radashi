import * as _ from 'radashi'

describe('max', () => {
  test('returns the max value from list of number', () => {
    const list = [5, 5, 10, 2]
    const result = _.max(list)
    expect(result).toBe(10)
  })
  test('returns the max value from list of objects', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
      { game: 'c', score: 300 },
      { game: 'd', score: 400 },
      { game: 'e', score: 500 },
    ]
    const result = _.max(list, x => x.score)
    expect(result!.game).toBe('e')
    expect(result!.score).toBe(500)
  })
})
