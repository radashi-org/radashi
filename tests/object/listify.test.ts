import * as _ from 'radashi'

describe('listify', () => {
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
