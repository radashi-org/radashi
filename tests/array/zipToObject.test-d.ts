import * as _ from 'radashi'

describe('zipToObject', () => {
  test('readonly arrays', () => {
    const names = ['ra', 'zeus', 'loki'] as const
    const cultures = ['egypt', 'greek', 'norse'] as const

    expectTypeOf(_.zipToObject(names, cultures)).toEqualTypeOf<
      Record<'ra' | 'zeus' | 'loki', 'egypt' | 'greek' | 'norse'>
    >()
  })
})
