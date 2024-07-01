import * as _ from 'radashi'
import { bench } from 'vitest'

describe('toggle', () => {
  bench('with item that does not exist', () => {
    _.toggle(['a'], 'b')
  })

  bench('with item that does exist', () => {
    _.toggle(['a', 'b'], 'b')
  })

  bench('with item that does exist and custom matcher', () => {
    _.toggle([{ value: 'a' }, { value: 'b' }], { value: 'b' }, v => v.value)
  })

  bench('with item that does not exist and custom matcher', () => {
    _.toggle([{ value: 'a' }], { value: 'b' }, v => v.value)
  })

  bench('with strategy prepend', () => {
    _.toggle(['a'], 'b', null, { strategy: 'prepend' })
  })
})
