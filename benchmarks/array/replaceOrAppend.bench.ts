import * as _ from 'radashi'
import { bench } from 'vitest'

describe('replaceOrAppend', () => {
  bench('with item at start', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    _.replaceOrAppend(letters, 'XA', x => x === 'a')
  })

  bench('with item in middle', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    _.replaceOrAppend(letters, 'XC', x => x === 'c')
  })

  bench('with item at end', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    _.replaceOrAppend(letters, 'XE', x => x === 'e')
  })

  bench('append item', () => {
    const letters = ['a', 'b', 'c', 'd', 'e']
    _.replaceOrAppend(letters, 'XX', x => x === 'x')
  })
})
