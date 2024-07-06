import * as _ from 'radashi'
import { bench } from 'vitest'

describe('parseColor', () => {
  bench('with HEX color', () => {
    _.parseColor('#00000000')
  })
  bench('with RGB color', () => {
    _.parseColor('rgb(0, 0, 0)')
  })
})
