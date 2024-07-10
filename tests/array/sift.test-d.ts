import * as _ from 'radashi'

describe('sift', () => {
  test('type narrowing', () => {
    const array = [1, false]
    expectTypeOf(_.sift(array)).toEqualTypeOf<(number | true)[]>()

    const array2 = [1, false] as const
    expectTypeOf(_.sift(array2)).toEqualTypeOf<1[]>()

    const array3 = [1, 0]
    expectTypeOf(_.sift(array3)).toEqualTypeOf<number[]>()

    const array4 = [1, 0] as const
    expectTypeOf(_.sift(array4)).toEqualTypeOf<1[]>()
  })
})

// Compare to [].filter(Boolean) since that is what sift replaces.
test('[].filter(Boolean) does not work', () => {
  const array = [1, false]
  expectTypeOf(array.filter(Boolean)).not.toEqualTypeOf<(number | true)[]>()
  expectTypeOf(array.filter(Boolean)).toEqualTypeOf<(number | boolean)[]>()

  const array2 = [1, false] as const
  expectTypeOf(array2.filter(Boolean)).not.toEqualTypeOf<1[]>()
  expectTypeOf(array2.filter(Boolean)).toEqualTypeOf<(1 | false)[]>()

  const array3 = [1, 0]
  expectTypeOf(array3.filter(Boolean)).toEqualTypeOf<number[]>()

  const array4 = [1, 0] as const
  expectTypeOf(array4.filter(Boolean)).not.toEqualTypeOf<1[]>()
  expectTypeOf(array4.filter(Boolean)).toEqualTypeOf<(1 | 0)[]>()
})
