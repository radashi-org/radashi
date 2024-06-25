import * as _ from 'radashi'

describe('group function', () => {
  test('groups by provided attribute', () => {
    const list = [
      { group: 'a', word: 'hello' },
      { group: 'b', word: 'bye' },
      { group: 'a', word: 'oh' },
      { group: 'b', word: 'hey' },
      { group: 'c', word: 'ok' }
    ]
    const groups = _.group(list, x => x.group)
    expect(groups.a?.length).toBe(2)
    expect(groups.b?.length).toBe(2)
    expect(groups.c?.length).toBe(1)
    expect(groups.c?.[0].word).toBe('ok')
  })
})
