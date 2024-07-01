import * as _ from 'radashi'
import { bench } from 'vitest'

describe('draw', () => {
  bench('with valid input', () => {
    const letters = 'abcde'
    _.draw(letters.split(''))
  })
})
