import * as _ from 'radashi'

describe('unzip', () => {
  test('unzips an array correctly', () => {
    const result = _.unzip([
      ['a', 1, true],
      ['b', 2, false],
    ])
    expect(result).toEqual([
      ['a', 'b'],
      [1, 2],
      [true, false],
    ])
  })
})
