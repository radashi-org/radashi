import * as _ from 'radashi'

describe('zip', () => {
  test('zips an array correctly', () => {
    const result = _.zip(['a', 'b'], [1, 2], [true, false])
    expect(result).toEqual([
      ['a', 1, true],
      ['b', 2, false],
    ])
  })

  test('returns an empty array if nothing is passed', () => {
    // @ts-ignore
    const result = _.zip()
    expect(result).toEqual([])
  })
})
