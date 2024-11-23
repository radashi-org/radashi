import * as _ from 'radashi'

describe('zipToObject', () => {
  test('mutable arrays with loose types', () => {
    const names = ['ra', 'zeus', 'loki']
    const followers = [1000000, 500000, 250000]
    expectTypeOf(_.zipToObject(names, followers)).toEqualTypeOf<
      Record<string, number>
    >()
  })

  test('readonly arrays with string literals', () => {
    const names = ['ra', 'zeus', 'loki'] as const
    const cultures = ['egypt', 'greek', 'norse'] as const

    expectTypeOf(_.zipToObject(names, cultures)).toEqualTypeOf<
      Record<'ra' | 'zeus' | 'loki', 'egypt' | 'greek' | 'norse'>
    >()
  })

  test('inline array and single value', () => {
    // Note how the value type is widened to `number`.
    const result = _.zipToObject(['a', 'b'], 1)
    expectTypeOf(result).toEqualTypeOf<Record<'a' | 'b', number>>()
  })

  test('empty array', () => {
    const result = _.zipToObject([], 1)
    expectTypeOf(result).toEqualTypeOf<Record<never, number>>()
  })
})
