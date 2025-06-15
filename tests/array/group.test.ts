import * as _ from 'radashi'

describe('group', () => {
  test('groups by provided attribute', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    const groups = _.group(list, x => x.group)
    expect(groups.a?.length).toBe(2)
    expect(groups.b?.length).toBe(2)
    expect(groups.c?.length).toBe(1)
    expect(groups.c?.[0].word).toBe('ok')
  })
  test('works with mapValues', () => {
    const objects = [
      { id: 1, group: 'a' },
      { id: 2, group: 'b' },
      { id: 3, group: 'a' },
    ] as const

    // Notice how the types of `groupedObjects` and `groupedIds` are
    // both partial (in other words, their properties have the `?:`
    // modifier). At the type level, mapValues is respectful of
    // preserving the partiality of the input.
    const groupedObjects = _.group(objects, obj => obj.group)
    const groupedIds = _.mapValues(groupedObjects, array => {
      // Importantly, we can map the array without optional chaining,
      // because of how the overloads of mapValues are defined.
      // TypeScript knows that when a key is defined inside the result
      // of a `group(…)` call, its value is never undefined.
      return array.map(obj => obj.id)
    })

    expect(groupedIds).toEqual({
      a: [1, 3],
      b: [2],
    })
  })
  test('array index is passed to callback', () => {
    const list = [1, 2, 3, 4, 5]
    const groups = _.group(list, (_, index) =>
      index % 2 === 0 ? 'even' : 'odd',
    )
    expect(groups.even).toEqual([1, 3, 5])
    expect(groups.odd).toEqual([2, 4])
  })
})
