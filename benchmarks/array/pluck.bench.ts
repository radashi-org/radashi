import * as _ from 'radashi'

describe('pluck', () => {
  const smallArray = [
    { name: 'Ra', power: 100, domain: 'Sun' },
    { name: 'Zeus', power: 98, domain: 'Lightning' },
    { name: 'Loki', power: 72, domain: 'Tricks' },
  ]

  const largeArray = Array.from({ length: 1000 }, (_, idx) => ({
    id: idx,
    name: `God${idx}`,
    power: Math.floor(Math.random() * 100),
    domain: `Domain${idx}`,
  }))

  bench('single property from a small array', () => {
    _.pluck(smallArray, ['name'])
  })

  bench('multiple properties from a small array', () => {
    _.pluck(smallArray, ['power', 'domain'])
  })

  bench('all properties from a small array', () => {
    _.pluck(smallArray)
  })

  bench('multiple properties from a large array', () => {
    _.pluck(largeArray, ['name', 'power'])
  })
})
