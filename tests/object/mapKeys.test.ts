import * as _ from 'radashi'

describe('mapKeys', () => {
  test('runs all keys against mapper function', () => {
    const prefixWith = (prefix: string) => (str: string) => `${prefix}${str}`
    const result = _.mapKeys(
      {
        x: 22,
        y: 8,
      },
      prefixWith('x'),
    )
    expect(result).toEqual({
      xx: 22,
      xy: 8,
    })
  })

  test('maps enumerable symbol keys and ignores non-enumerable keys', () => {
    const input = Symbol('input')
    const hidden = Symbol('hidden')
    const output = Symbol('output')
    const source = { [input]: 22, [hidden]: 8 }
    Object.defineProperty(source, hidden, { enumerable: false })
    const mapper = vi.fn(() => output)

    expect(_.mapKeys(source, mapper)).toEqual({ [output]: 22 })
    expect(mapper).toHaveBeenCalledTimes(1)
    expect(mapper).toHaveBeenCalledWith(input, 22)
  })
})
