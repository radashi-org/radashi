import * as _ from 'radashi'
import { bench } from 'vitest'

describe('cluster', () => {
  bench('with default cluster size', () => {
    const list = [1, 1, 1, 1, 1, 1, 1, 1]
    _.cluster(list)
  })

  bench('specified cluster size of 3', () => {
    const list = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2]
    _.cluster(list, 3)
  })
})
