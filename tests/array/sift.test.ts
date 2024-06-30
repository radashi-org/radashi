import * as _ from 'radashi'

const cast = <T = any[]>(value: any): T => value

describe('sift', () => {
  const people = [null, 'hello', undefined, false, 23]
  test('returns empty array for null input array', () => {
    const result = _.sift(cast(null))
    expect(result).toEqual([])
  })
  test('returns array with falsy values filtered out', () => {
    const result = _.sift(people)
    expect(result).toEqual(['hello', 23])
  })
})
