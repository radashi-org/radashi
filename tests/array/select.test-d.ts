import * as _ from 'radashi'

describe('select types', () => {
  test('select with condition', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: null },
    ]
    const result = _.select(
      array,
      item => item.name,
      item => item.name !== null,
    )
    // No way for TypeScript to understand that the result is a string[]
    expectTypeOf(result).toEqualTypeOf<(string | null)[]>()
  })
  test('select without condition', () => {
    const array = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: null },
    ]
    const result = _.select(array, item => item.name)
    expectTypeOf(result).toEqualTypeOf<string[]>()
  })
})
