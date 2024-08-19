import * as _ from 'radashi'

describe('listify', () => {
  bench('with empty object', () => {
    _.listify({} as Record<string, string>, () => 1)
  })

  bench('with non-empty object', () => {
    const obj = {
      one: { name: 'ray' },
      two: { name: 'ash' },
    }
    _.listify(obj, (key, value) => ({
      index: key,
      name: value.name,
    }))
  })
})
