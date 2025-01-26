import * as _ from 'radashi'

describe('first', () => {
  test('returns first item in list', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    const result = _.first(list)
    expect(result!.game).toBe('a')
    expect(result!.score).toBe(100)
  })
  test('returns default value without error when list is empty', () => {
    const list = [] as string[]
    const result = _.first(list, 'yolo')
    expect(result).toBe('yolo')
  })
})
