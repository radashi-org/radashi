import * as _ from 'radashi'

describe('memo return type', () => {
  test('memo with single argument key function', () => {
    const foo = _.memo((a: string, b?: string) => {}, { key: a => a })
    expectTypeOf(foo).toEqualTypeOf<
      (a: string, b?: string | undefined) => void
    >()
  })

  test('memo with two argument key function', () => {
    const foo = _.memo((a: string, b?: string) => {}, { key: (a, b) => a })
    expectTypeOf(foo).toEqualTypeOf<
      (a: string, b?: string | undefined) => void
    >()
    foo('a')
  })
})
