import * as _ from 'radashi'
import { bench } from 'vitest'

describe('pascal', () => {
  bench('with valid input', () => {
    _.pascal('hello world')
  })
  bench("wiht camelCase input", () => {
    _.pascal("fooBar")
  })
  bench("with non alphanumerics", () => {
    _.pascal("Exobase Starter_flash AND-go")
  })
  bench("With null input", () => {
    _.pascal(null as any)
  })
})
