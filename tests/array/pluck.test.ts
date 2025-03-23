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

  test('single property', () => {
    expect(_.pluck(gods, ['name'])).toEqual([['Ra'], ['Zeus'], ['Loki']])
  })

  test('multiple properties', () => {
    expect(_.pluck(gods, ['power', 'domain'])).toEqual([
      [100, 'Sun'],
      [98, 'Lightning'],
      [72, 'Tricks'],
    ])
  })

  test('no keys specified', () => {
    expect(_.pluck(gods)).toEqual([
      ['Ra', 100, 'Sun'],
      ['Zeus', 98, 'Lightning'],
      ['Loki', 72, 'Tricks'],
    ])
  })

  test('mapping function', () => {
    expect(
      _.pluck(gods, [
        god => `${god.name} is a god of ${god.domain}`,
        god => god.power,
      ]),
    ).toEqual([
      ['Ra is a god of Sun', 100],
      ['Zeus is a god of Lightning', 98],
      ['Loki is a god of Tricks', 72],
    ])
  })

  test('empty input array with keys', () => {
    expect(_.pluck([], ['name'])).toEqual([])
  })

  test('empty input array without keys', () => {
    expect(_.pluck([])).toEqual([])
  })

  test('input array is not mutated', () => {
    const original = structuredClone(gods)
    _.pluck(gods)
    _.pluck(gods, ['name'])

    expect(gods).toEqual(original)
  })

  test('nonexistent property', () => {
    expect(_.pluck(gods, ['nonexistent'] as any)).toEqual(
      gods.map(() => [undefined]),
    )
  })
})
