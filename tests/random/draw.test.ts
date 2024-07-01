import * as _ from 'radashi'

describe('draw', () => {
  test('returns a string from the list', () => {
    const letters = 'abcde'
    const result = _.draw(letters.split(''))
    expect(letters).toContain(result!)
  })
  test('returns a item from the list', () => {
    const list = [
      { id: 'a', word: 'hello' },
      { id: 'b', word: 'oh' },
      { id: 'c', word: 'yolo' },
    ]
    const result = _.draw(list)
    expect('abc').toContain(result!.id)
  })
  test('returns null given empty input', () => {
    const list: unknown[] = []
    const result = _.draw(list)
    expect(result).toBeNull()
  })
})
