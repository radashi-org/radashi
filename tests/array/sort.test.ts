import * as _ from 'radashi'

describe('sort', () => {
  test('uses getter', () => {
    const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
    const result = _.sort(list, i => i.index)
    expect(result[0].index).toBe(0)
    expect(result[1].index).toBe(1)
    expect(result[2].index).toBe(2)
  })
  test('uses descending order', () => {
    const list = [{ index: 2 }, { index: 0 }, { index: 1 }]
    const result = _.sort(list, i => i.index, true)
    expect(result[0].index).toBe(2)
    expect(result[1].index).toBe(1)
    expect(result[2].index).toBe(0)
  })
  test('gracefully handles null input list', () => {
    const result = _.sort(null as any as number[], x => x)
    expect(result).toEqual([])
  })
})
