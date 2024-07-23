import * as _ from 'radashi'
import { bench } from 'vitest'

describe('toResult', () => {
  const p = new Promise(() => {})
  const res: _.Ok<1> = [undefined, 1]

  bench('with promise input', () => {
    _.toResult(p)
  })

  bench('with result input', () => {
    _.toResult(res)
  })
})
