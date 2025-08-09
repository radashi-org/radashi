import * as _ from 'radashi'

describe('group', () => {
  bench('with groups by provided attribute', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' },
    ]
    _.group(list, x => x.group)
  })

  describe('old version', () => {
    bench('with groups by provided attribute', () => {
      const list = [
        { group: 'a', word: 'hello' },
        { group: 'b', word: 'bye' },
        { group: 'a', word: 'oh' },
        { group: 'b', word: 'hey' },
        { group: 'c', word: 'ok' },
      ]
      group(list, x => x.group)
    })

    function group<T, Key extends string | number | symbol>(
      array: readonly T[],
      getGroupId: (item: T, index: number) => Key,
    ): { [K in Key]?: T[] } {
      return array.reduce(
        (acc, item, index) => {
          const groupId = getGroupId(item, index)
          if (!acc[groupId]) {
            acc[groupId] = []
          }
          acc[groupId].push(item)
          return acc
        },
        Object.create(null) as Record<Key, T[]>,
      )
    }
  })
})
