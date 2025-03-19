import * as _ from 'radashi'

describe('cluster', () => {
  bench('small array', () => {
    const list = new Array(10).fill(1)
    _.cluster(list, 2)
  })

  bench('large array', () => {
    const list = new Array(10000).fill(1)
    _.cluster(list, 4)
  })
})
