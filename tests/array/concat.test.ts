import * as _ from 'radashi'

describe('concat', () => {
  test('nullish values are filtered out', () => {
    const result = _.concat('a', null, ['b', undefined], 'c')
    expect(result).toEqual(['a', 'b', 'c'])
  })

  test('deeply nested arrays', () => {
    const result = _.concat(1, [2, [3, 4]], null)
    expect(result).toEqual([1, 2, [3, 4]])
  })

  test('empty inputs', () => {
    expect(_.concat(null, undefined)).toEqual([])
    expect(_.concat([], null)).toEqual([])
  })

  test('mixed types', () => {
    const result = _.concat(1, 'two', [true, { a: 1 }], null)
    expect(result).toEqual([1, 'two', true, { a: 1 }])
  })

  test('other falsy values are preserved', () => {
    const result = _.concat(false, ['', 0], [null, undefined])
    expect(result).toEqual([false, '', 0])
  })
})
