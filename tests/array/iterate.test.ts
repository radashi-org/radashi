import * as _ from 'radashi'

describe('iterate', () => {
  test('iterates correct number of times', () => {
    const result = _.iterate(5, (acc, idx) => acc + idx, 0)
    expect(result).toBe(15)
  })
})
