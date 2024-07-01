import * as _ from 'radashi'

describe('list', () => {
  const obj = { name: 'radash' }
  test('creates correct list', () => {
    expect(_.list(0, 4)).toEqual([0, 1, 2, 3, 4])
    expect(_.list(3)).toEqual([0, 1, 2, 3])
    expect(_.list(0, 3)).toEqual([0, 1, 2, 3])
    expect(_.list(0, 3, 'y')).toEqual(['y', 'y', 'y', 'y'])
    expect(_.list(0, 3, () => 'y')).toEqual(['y', 'y', 'y', 'y'])
    expect(_.list(0, 3, i => i)).toEqual([0, 1, 2, 3])
    expect(_.list(0, 3, i => `y${i}`)).toEqual(['y0', 'y1', 'y2', 'y3'])
    expect(_.list(0, 3, obj)).toEqual([obj, obj, obj, obj])
    expect(_.list(0, 6, i => i, 2)).toEqual([0, 2, 4, 6])
  })
  test('omits end if step does not land on it', () => {
    const result = _.list(0, 5, i => i, 2)
    expect(result).toEqual([0, 2, 4])
  })
  test('returns start only if step larger than end', () => {
    const result = _.list(0, 5, i => i, 20)
    expect(result).toEqual([0])
  })
})
