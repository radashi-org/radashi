import * as _ from 'radashi'

describe('selectFirst types', () => {
  test('selectFirst with condition', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: null },
    ]
    const result = _.selectFirst(
      array,
      item => item.name,
      item => item.name !== null,
    )
    // No way for TypeScript to infer that the result can't be null
    expectTypeOf(result).toEqualTypeOf<string | null | undefined>()
  })
  test('selectFirst without condition', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: null },
    ]
    const result = _.selectFirst(array, item => item.name)
    expectTypeOf(result).toEqualTypeOf<string | undefined>()
  })
})
