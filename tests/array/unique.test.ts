import * as _ from 'radashi'

describe('unique', () => {
  test('correctly removed duplicate items', () => {
    const list = [1, 1, 2]
    const result = _.unique(list)
    expect(result).toEqual([1, 2])
  })
  test('uses key fn to correctly remove duplicate items', () => {
    const list = [
      { id: 'a', word: 'hello' },
      { id: 'a', word: 'hello' },
      { id: 'b', word: 'oh' },
      { id: 'b', word: 'oh' },
      { id: 'c', word: 'yolo' },
    ]
    const result = _.unique(list, x => x.id)
    const [a, b, c] = result
    expect(a.id).toBe('a')
    expect(a.word).toBe('hello')
    expect(b.id).toBe('b')
    expect(b.word).toBe('oh')
    expect(c.id).toBe('c')
    expect(c.word).toBe('yolo')
  })
  test('correctly handles non string, number or symbol values', () => {
    const list: any[] = [
      null,
      null,
      true,
      true,
      'true',
      false,
      { id: 'a', word: 'hello' },
      { id: 'a', word: 'hello' },
    ]
    const result = _.unique(list, val => val?.id ?? val)
    expect(result).toEqual([
      null,
      true,
      'true',
      false,
      { id: 'a', word: 'hello' },
    ])
  })
})
