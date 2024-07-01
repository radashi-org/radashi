import * as _ from 'radashi'
import { bench } from 'vitest'

describe('replace', () => {
  bench('with undefined new item', () => {
    _.replace(['a'], undefined, () => true)
  })

  bench('with item by index', () => {
    _.replace(['a', 'b', 'c', 'd'], 'BB', (_letter, idx) => idx === 1)
  })

  bench('with item in a list of objects', () => {
    const list = [
      { game: 'a', score: 100 },
      { game: 'b', score: 200 },
    ]
    _.replace(list, { game: 'x', score: 800 }, item => item.game === 'a')
  })
})
