import * as _ from 'radashi'

describe('pluck', () => {
  bench('plucking a single property from a small array', () => {
    const gods = [
      { name: 'Ra', power: 100, domain: 'Sun' },
      { name: 'Zeus', power: 98, domain: 'Lightning' },
      { name: 'Loki', power: 72, domain: 'Tricks' },
    ]
    _.pluck(gods, 'name')
  })

  bench('plucking multiple properties from a list of objects', () => {
    const gods = [
      { name: 'Ra', power: 100, domain: 'Sun' },
      { name: 'Zeus', power: 98, domain: 'Lightning' },
      { name: 'Loki', power: 72, domain: 'Tricks' },
    ]
    _.pluck(gods, 'power', 'domain')
  })

  bench('plucking from a large array with multiple keys', () => {
    const largeArray = Array(1000)
      .fill(null)
      .map((_, idx) => ({
        id: idx,
        name: `God${idx}`,
        power: Math.floor(Math.random() * 100),
        domain: `Domain${idx}`,
      }))
    _.pluck(largeArray, 'name', 'power')
  })
})
