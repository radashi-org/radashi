import * as _ from 'radashi'

describe('last', () => {
  test('returns last item in list', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    const result = _.last(list)
    expect(result!.game).toBe('b')
    expect(result!.score).toBe(200)
  })
  test('returns default value without error when list is empty', () => {
    const list = [] as string[]
    const result = _.last(list, 'yolo')
    expect(result).toBe('yolo')
  })
})
