import * as _ from 'radashi'
import { bench } from 'vitest'

describe('castResult', () => {
  const p = new Promise(() => {})
  const res: _.Ok<1> = [undefined, 1]

  bench('with promise input', () => {
    _.castResult(p)
  })

  bench('with result input', () => {
    _.castResult(res)
  })
})
