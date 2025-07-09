import * as _ from 'radashi'

bench('concat with simple values', () => {
  _.concat('a', null, 'b', undefined, 'c')
})

bench('concat with nested arrays', () => {
  _.concat(1, [2, 3], null, 4, [5, [6, 7]])
})

bench('concat with mixed types', () => {
  _.concat('a', 1, [true, { x: 2 }], null)
})
