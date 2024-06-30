import * as _ from 'radashi'

const cast = (value: any) => value as unknown[]

describe('last function', () => {
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
  test('gracefully handles null input list', () => {
    const result = _.last(cast(null))
    expect(result).toBeUndefined()
  })
})
