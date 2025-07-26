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
    const result = _.sort(list, i => i.index, 'desc')
    expect(result[0].index).toBe(2)
    expect(result[1].index).toBe(1)
    expect(result[2].index).toBe(0)
  })
  test('uses identity when no getter passed', () => {
    const list = [2, 0, 1]
    const result = _.sort(list)
    expect(result[0]).toBe(0)
    expect(result[1]).toBe(1)
    expect(result[2]).toBe(2)
  })
})
