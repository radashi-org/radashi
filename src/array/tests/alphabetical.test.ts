import * as _ from 'radashi'

const cast = (value: any) => value as string[]

describe('alphabetical function', () => {
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
  test('gracefully handles null input list', () => {
    const result = _.alphabetical(cast(null), x => x)
    expect(result).toEqual([])
  })
})
