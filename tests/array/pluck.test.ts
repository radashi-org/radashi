import * as _ from 'radashi'

describe('pluck', () => {
  interface God {
    name: string
    power: number
    domain: string
  }

  const gods: God[] = [
    { name: 'Ra', power: 100, domain: 'Sun' },
    { name: 'Zeus', power: 98, domain: 'Lightning' },
    { name: 'Loki', power: 72, domain: 'Tricks' },
  ]

  it('extracts a single property', () => {
    const names = _.pluck(gods, 'name')
    expect(names).toEqual(['Ra', 'Zeus', 'Loki'])
  })

  it('extracts multiple properties', () => {
    const powerDomains = _.pluck(gods, 'power', 'domain')
    expect(powerDomains).toEqual([
      [100, 'Sun'],
      [98, 'Lightning'],
      [72, 'Tricks'],
    ])
  })

  it('extracts all properties when no keys are specified', () => {
    const allProps = _.pluck(gods)
    expect(allProps).toEqual([
      ['Ra', 100, 'Sun'],
      ['Zeus', 98, 'Lightning'],
      ['Loki', 72, 'Tricks'],
    ])
  })

  it('returns an empty array for an empty input array', () => {
    const result = _.pluck([], 'name')
    expect(result).toEqual([])
  })

  it('returns an empty array when extracting from an empty array with no keys', () => {
    const result = _.pluck([])
    expect(result).toEqual([])
  })

  it('does not mutate the original array', () => {
    const original = [...gods]
    _.pluck(gods, 'name')
    expect(gods).toEqual(original)
  })

  it('returns a new array even if no elements are extracted', () => {
    const result = _.pluck(gods, 'nonexistent' as keyof God)
    expect(result).not.toBe(gods)
    expect(result).toEqual([undefined, undefined, undefined])
  })
})
