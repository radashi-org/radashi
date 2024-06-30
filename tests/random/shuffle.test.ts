import * as _ from 'radashi'

describe('shuffle function', () => {
  test('returns list with same number of items', () => {
    const list = [1, 2, 3, 4, 5]
    const result = _.shuffle(list)
    expect(list.length).toBe(result.length)
  })
  test('returns list with same value', () => {
    const list = [1, 2, 3, 4, 5]
    const totalBefore = _.sum(list)
    const result = _.shuffle(list)
    const totalAfter = _.sum(result)
    expect(totalBefore).toBe(totalAfter)
  })
  test('returns copy of list without mutatuing input', () => {
    const list = [1, 2, 3, 4, 5]
    const result = _.shuffle(list)
    expect(list).not.toBe(result)
    expect(list).toEqual([1, 2, 3, 4, 5])
  })
})
