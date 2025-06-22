import * as _ from 'radashi'

describe('isIntString type guard', () => {
  test("isIntString doesn't narrow type", () => {
    const value = {} as string

    if (!_.isIntString(value)) {
      // Even if the string is not an integer, it can still be a string.
      expectTypeOf(value).toEqualTypeOf<string>()
    }
  })
})
