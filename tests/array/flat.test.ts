import * as _ from 'radashi'

describe('flat', () => {
  test('returns all items in all arrays', () => {
    const lists = [['a', 'b'], ['c', 'd'], ['e']]
    const result = _.flat(lists)
    expect(result).toEqual(['a', 'b', 'c', 'd', 'e'])
    expect(result[0]).toBe('a')
    expect(result[4]).toBe('e')
  })
})
