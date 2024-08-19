import * as _ from 'radashi'

describe('sum', () => {
  bench('with list of numbers', () => {
    const list = [5, 5, 10, 2]
    _.sum(list)
  })

  bench('with list of objects', () => {
    const list = [{ value: 5 }, { value: 5 }, { value: 10 }, { value: 2 }]
    _.sum(list, x => x.value)
  })
})
