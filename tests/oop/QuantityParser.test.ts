import * as _ from 'radashi'

describe('QuantityParser', () => {
  test('parse a custom quantity', () => {
    const parser = new _.QuantityParser({
      units: {
        penny: 1,
        nickel: 5,
      },
      short: {
        p: 'penny',
        n: 'nickel',
      },
    })

    expect(parser.parse('1 penny')).toBe(1)
    expect(parser.parse('2 pennys')).toBe(2)

    expect(parser.parse('1 nickel')).toBe(5)
    expect(parser.parse('2 nickels')).toBe(10)

    expect(parser.parse('1p')).toBe(1)
    expect(parser.parse('2n')).toBe(10)
  })

  test('bad input', () => {
    const parser = new _.QuantityParser({
      units: {
        penny: 1,
      },
    })

    expect(() =>
      parser.parse('foo bar' as any),
    ).toThrowErrorMatchingInlineSnapshot(
      '[Error: Invalid quantity, cannot parse: foo bar]',
    )

    expect(() =>
      parser.parse('1 yen' as any),
    ).toThrowErrorMatchingInlineSnapshot(
      '[Error: Invalid unit: yen, makes sure it is one of: penny]',
    )
  })
})

test('parseQuantity', () => {
  expect(
    _.parseQuantity('3 miles', {
      units: {
        mile: 1,
      },
    }),
  ).toBe(3)
})
