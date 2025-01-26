import * as _ from 'radashi'

describe('map', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  test('returns result of mapper', async () => {
    const numbers = [1, 2, 3, 4]
    const asyncSquare = async (a: number): Promise<number> => {
      return new Promise(res => res(a * a))
    }
    const result = await _.map<number, number>(numbers, asyncSquare)
    expect(result).toEqual([1, 4, 9, 16])
  })

  test('passes correct indexes', async () => {
    const array = ['a', 'b', 'c', 'd']
    const mapper = async (l: string, index: number) => `${l}${index}`
    const result = await _.map(array, mapper)
    expect(result).toEqual(['a0', 'b1', 'c2', 'd3'])
  })
})
