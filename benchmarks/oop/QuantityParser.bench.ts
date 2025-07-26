import * as _ from 'radashi'

describe('QuantityParser', () => {
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

  bench('parse a custom quantity', () => {
    parser.parse('1 penny')
    parser.parse('2 nickels')
    parser.parse('3n')
  })
})
