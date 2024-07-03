import * as _ from 'radashi'

describe('merge', () => {
  test('returns an empty array for two empty array inputs', () => {
    const result = _.merge([], [], _ => '')
    expect(result).toEqual([])
  })
  test('returns correctly merged lists', () => {
    const inputA = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' },
    ]
    const inputB = [
      { name: 'ray', group: 'XXX' },
      { name: 'mary', group: 'YYY' },
    ]
    const result = _.merge(inputA, inputB, x => x.name)
    expect(result[0].group).toBe('XXX')
    expect(result[1].group).toBe('X')
    expect(result[2].group).toBe('Y')
    expect(result[3].group).toBe('YYY')
  })
})
