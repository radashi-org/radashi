import * as _ from 'radashi'

describe('alphabetical', () => {
  test('uses getter', () => {
    const list = [{ name: 'Leo' }, { name: 'AJ' }, { name: 'Cynthia' }]
    const result = _.alphabetical(list, i => i.name)
    expect(result[0].name).toBe('AJ')
    expect(result[1].name).toBe('Cynthia')
    expect(result[2].name).toBe('Leo')
  })
  test('uses descending order', () => {
    const list = [{ name: 'Leo' }, { name: 'AJ' }, { name: 'Cynthia' }]
    const result = _.alphabetical(list, i => i.name, 'desc')
    expect(result[0].name).toBe('Leo')
    expect(result[1].name).toBe('Cynthia')
    expect(result[2].name).toBe('AJ')
  })
  test('sort is stable', () => {
    const list = [
      { id: 3, name: 'Leo' },
      { id: 1, name: 'Leo' },
      { id: 2, name: 'Leo' },
    ]
    const result = _.alphabetical(list, i => i.name)
    expect(result).toEqual(list)
  })
})
