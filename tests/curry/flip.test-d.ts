import * as _ from 'radashi'

describe('flip return type', () => {
  test('flip a function with 2 arguments', () => {
    const flipped = _.flip((a: number, b: string) => a + Number.parseInt(b))
    expectTypeOf(flipped).toEqualTypeOf<(b: string, a: number) => number>()
  })
  test('flip a function with 3 arguments', () => {
    const flipped = _.flip(
      (a: number, b: string, c: boolean) =>
        a + Number.parseInt(b) + (c ? 1 : 0),
    )
    expectTypeOf(flipped).toEqualTypeOf<
      (b: string, a: number, c: boolean) => number
    >()
  })
})
