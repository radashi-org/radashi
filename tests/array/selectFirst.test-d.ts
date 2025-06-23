import * as _ from 'radashi'

describe('selectFirst type test', () => {
  test('selectFirst without condition', () => {
    const result = _.selectFirst(
      [1,2,3],
      item => item > 1? item : null,
    )
    // filters out null and returns number | undefined
    expectTypeOf(result).toEqualTypeOf<number | undefined>()
  })

  test('selectFirst with condition', () => {
    const result = _.selectFirst(
        [1,2,3],
        x => x > 1 ? x : null,
        x => x > 1
    )
    // Because of condition null is allowed
    expectTypeOf(result).toEqualTypeOf<number | null | undefined>()
  })

  test
})
