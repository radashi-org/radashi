import * as _ from 'radashi'
import { bench } from 'vitest'

const person = {
  name: 'jay',
  age: 20,
  active: true,
}

describe('omit', () => {
  bench('with empty keys', () => {
    _.omit(person, [])
  })

  bench('with specific keys', () => {
    _.omit(person, ['name'])
  })
})
