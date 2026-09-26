import * as _ from 'radashi'

describe('pipe', () => {
  bench('piping a number through simple transformations', () => {
    _.pipe(
      2,
      x => x * 3,
      x => x + 4,
    )
  })

  bench('piping a string through multiple transformations', () => {
    _.pipe(
      'hello',
      x => x.toUpperCase(),
      x => x.split('').reverse().join(''),
    )
  })

  bench('piping an array through multiple transformations', () => {
    _.pipe(
      [1, 2, 3],
      arr => arr.map(x => x * 2), // [2, 4, 6]
      arr => arr.filter(x => x >= 4), // [4, 6]
      arr => arr.join('-'), // "4-6"
    )
  })

  bench('piping a large dataset through transformations', () => {
    _.pipe(
      Array(1000)
        .fill(null)
        .map((_, idx) => ({ id: idx, value: idx % 3 })),
      arr => arr.filter(item => item.value !== 0), // Remove items where value is 0
      arr => arr.reduce((sum, item) => sum + item.value, 0), // Sum all values
    )
  })
})
