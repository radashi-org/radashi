import * as _ from 'radashi'

describe('shuffle', () => {
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
  test('uses custom random function when provided', () => {
    const list = [1, 2, 3, 4, 5]
    const mockRandom = vi.fn(() => 1)
    const result = _.shuffle(list, mockRandom)
    
    expect(mockRandom).toHaveBeenCalled()
    expect(result).not.toEqual(list)
    expect(result.length).toBe(list.length)
    expect(new Set(result)).toEqual(new Set(list))
  })
})
