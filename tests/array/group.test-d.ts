import * as _ from 'radashi'

test('group', () => {
  const groups = _.group([1, 1.2, 1.3, 2], Math.floor)

  // Note: This *should* be number[][] since we use
  // exactOptionalPropertyTypes, but TypeScript has an outstanding
  // issue: https://github.com/microsoft/TypeScript/issues/46969
  expectTypeOf(Object.values(groups)).toEqualTypeOf<(number[] | undefined)[]>()

  expectTypeOf(groups[1]).toEqualTypeOf<number[] | undefined>()
  if (1 in groups) {
    expectTypeOf(groups[1]).toEqualTypeOf<number[]>()
  }
})
