import * as _ from 'radashi'

describe('range', () => {
  const obj = { name: 'radashi' }
  const toList = <T>(gen: Generator<T>): T[] => {
    const items: T[] = []
    for (const item of gen) {
      items.push(item)
    }
    return items
  }

  test('rejects steps that cannot progress toward the end', () => {
    expect(() => _.range(0, 4, undefined, 0).next()).toThrow(RangeError)
    expect(() => _.range(0, 4, undefined, -1).next()).toThrow(RangeError)
  })

  test('keeps reversed bounds empty', () => {
    expect(toList(_.range(4, 0, undefined, -1))).toEqual([])
  })

  test('yields expected values', () => {
    expect(toList(_.range(0, 4))).toEqual([0, 1, 2, 3, 4])
    expect(toList(_.range(3))).toEqual([0, 1, 2, 3])
    expect(toList(_.range(0, 3))).toEqual([0, 1, 2, 3])
    expect(toList(_.range(-3, 0))).toEqual([-3, -2, -1, 0])
    expect(toList(_.range(0, 3, 'y'))).toEqual(['y', 'y', 'y', 'y'])
    expect(toList(_.range(0, 3, () => 'y'))).toEqual(['y', 'y', 'y', 'y'])
    expect(toList(_.range(0, 3, i => i))).toEqual([0, 1, 2, 3])
    expect(toList(_.range(0, 3, i => `y${i}`))).toEqual([
      'y0',
      'y1',
      'y2',
      'y3',
    ])
    expect(toList(_.range(0, 3, obj))).toEqual([obj, obj, obj, obj])
    expect(toList(_.range(0, 6, i => i, 2))).toEqual([0, 2, 4, 6])
  })
})
