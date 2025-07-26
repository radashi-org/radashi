import * as _ from 'radashi'

describe('diff', () => {
  test('handles empty array root', () => {
    const result = _.diff([], ['a'])
    expect(result).toEqual([])
  })
  test('handles empty array other', () => {
    const result = _.diff(['a'], [])
    expect(result).toEqual(['a'])
  })
  test(`returns all items from root that don't exist in other`, () => {
    const result = _.diff(['a', 'b', 'c'], ['c', 'd', 'e'])
    expect(result).toEqual(['a', 'b'])
  })
  test('uses identity function', () => {
    const identity = ({ letter }: { letter: string }) => letter
    const letter = (l: string) => ({ letter: l })
    const result = _.diff(
      [letter('a'), letter('b'), letter('c')],
      [letter('c'), letter('d'), letter('e')],
      identity,
    )
    expect(result).toEqual([letter('a'), letter('b')])
  })
})
