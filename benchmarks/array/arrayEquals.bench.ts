import * as _ from 'radashi'
import { bench } from 'vitest'

const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]
const arr4 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

describe('arrayEquals', () => {
  bench('equal arrays', () => {
    _.arrayEquals(arr1, arr2)
  })

  bench('different last element', () => {
    _.arrayEquals(arr1, arr3)
  })

  bench('different length', () => {
    _.arrayEquals(arr1, arr4)
  })

  bench('empty arrays', () => {
    _.arrayEquals([], [])
  })
})
