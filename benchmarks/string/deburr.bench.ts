import * as _ from 'radashi'
import { bench } from 'vitest'

describe('deburr', () => {
  const text = 'Ærøskøbing Crème Brûlée Straße Łódź'

  bench('latin text with diacritics', () => {
    _.deburr(text)
  })
})
