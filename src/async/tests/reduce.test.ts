import * as _ from 'radashi'

const cast = <T = any[]>(value: any): T => value

describe('asyncReduce function', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('returns result of reducer', async () => {
    const numbers = [
      0,
      1,
      2,
      3,
      4, // => 10
    ]
    const asyncSum = async (a: number, b: number): Promise<number> => {
      return new Promise(res => res(a + b))
    }
    const result = await _.reduce<number, number>(numbers, asyncSum, 0)
    expect(result).toBe(10)
  })
  test('passes correct indexes', async () => {
    const array = ['a', 'b', 'c', 'd', 'e']
    const asyncSumIndex = async (
      a: number[],
      b: string,
      i: number,
    ): Promise<number[]> => {
      return new Promise(res => {
        a.push(i)
        res(a)
      })
    }
    const result = await _.reduce<string, number[]>(array, asyncSumIndex, [])
    expect(result).toEqual([0, 1, 2, 3, 4])
  })
})

describe('reduce/asyncReduceV2 function', () => {
  const numbers = [0, 1, 2, 3, 4]
  const reducer = async (a: number, b: number): Promise<number> => {
    return new Promise(res => res(a + b))
  }

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('calls asyncReduce', async () => {
    const result = await _.reduce<number, number>(numbers, reducer, 0)
    expect(result).toBe(10)
  })
  test('uses first item in array when no init provided', async () => {
    const result = await _.reduce(numbers, reducer)
    expect(result).toBe(10)
  })
  test('throws on no init value and an empty array', async () => {
    try {
      await _.reduce([], reducer)
    } catch (err) {
      expect(err).not.toBeNull()
      return
    }
    expect.fail('Expected error to be thrown')
  })
  test('throws on no init value and a null array input', async () => {
    try {
      await _.reduce(cast(null), reducer)
    } catch (err) {
      expect(err).not.toBeNull()
      return
    }
    expect.fail('Expected error to be thrown')
  })
})
