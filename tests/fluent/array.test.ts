import '../../fluent'

describe('fluent unique function', () => {
  test('correctly removed duplicate items', () => {
    const list = [1, 1, 2]
    const result = list.unique()
    expect(result).toEqual([1, 2])
  })
})
