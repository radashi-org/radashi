import * as _ from 'radashi'

describe('fork', () => {
  test('returns two empty arrays for one empty array input', () => {
    const [a, b] = _.fork([], x => !!x)
    expect(a).toEqual([])
    expect(b).toEqual([])
  })
  test('returns correctly forked list', () => {
    const input = [
      { name: 'ray', group: 'X' },
      { name: 'sara', group: 'X' },
      { name: 'bo', group: 'Y' },
      { name: 'mary', group: 'Y' },
    ]
    const [xs, ys] = _.fork(input, x => x.group === 'X')
    expect(xs).toHaveLength(2)
    expect(ys).toHaveLength(2)
    const [r, s] = xs
    expect(r.name).toBe('ray')
    expect(s.name).toBe('sara')
    const [b, m] = ys
    expect(b.name).toBe('bo')
    expect(m.name).toBe('mary')
  })
})
