import * as _ from 'radashi'

describe('toArray', () => {
  test('handles null input', () => {
    const result = _.toArray(null as any as Record<string, string>, () => 1)
    expect(result).toEqual([])
  })
  test('handles empty object', () => {
    const result = _.toArray({} as Record<string, string>, () => 1)
    expect(result).toEqual([])
  })
  test('calls toItem to convert to list', () => {
    type Index = 'one' | 'two'
    const obj: Record<Index, any> = {
      one: { name: 'ray' },
      two: { name: 'ash' },
    }
    const result = _.toArray(obj, (key, value) => ({
      index: key,
      name: value.name,
    }))
    expect(result).toEqual([
      { index: 'one', name: 'ray' },
      { index: 'two', name: 'ash' },
    ])
  })
})
