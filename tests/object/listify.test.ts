import * as _ from 'radashi'

describe('listify', () => {
  test('handles null input', () => {
    const result = _.listify(null as any as Record<string, string>, () => 1)
    expect(result).toEqual([])
  })
  test('handles empty object', () => {
    const result = _.listify({} as Record<string, string>, () => 1)
    expect(result).toEqual([])
  })
  test('calls toItem to convert to list', () => {
    type Index = 'one' | 'two'
    const obj: Record<Index, any> = {
      one: { name: 'ray' },
      two: { name: 'ash' },
    }
    const result = _.listify(obj, (key, value) => ({
      index: key,
      name: value.name,
    }))
    expect(result).toEqual([
      { index: 'one', name: 'ray' },
      { index: 'two', name: 'ash' },
    ])
  })
})
