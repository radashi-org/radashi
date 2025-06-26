import * as _ from 'radashi'

describe('isIntString types', () => {
  test('type narrowing works', () => {
    const string = '123' as string

    if (_.isIntString(string)) {
      expectTypeOf(string).toEqualTypeOf<`${number}`>()
    } else {
      // Even if the string is not an integer, it can still be a string.
      expectTypeOf(string).toEqualTypeOf<string>()
    }
  })
})
