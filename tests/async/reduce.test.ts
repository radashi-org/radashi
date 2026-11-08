import * as _ from 'radashi'

describe('asyncReduce', () => {
  const numbers = [0, 1, 2, 3, 4]
  const reducer = async (a: number, b: number): Promise<number> => {
    return new Promise(res => res(a + b))
  }
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('returns result of reducer', async () => {
    const result = await _.reduce<number, number>(numbers, reducer, 0)
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
  test('uses first item in array when no init provided', async () => {
    const result = await _.reduce(numbers, reducer)
    expect(result).toBe(10)
  })
  test('skips holes and uses the first present element as the accumulator', async () => {
    const sparse = Array<number>(5)
    sparse[1] = 4
    sparse[3] = 6
    const indexes: number[] = []
    const result = await _.reduce<number, number>(
      sparse,
      async (acc, item, index) => {
        indexes.push(index)
        return acc + item
      },
    )
    expect(result).toBe(10)
    expect(indexes).toEqual([3])
  })

  test('skips holes when the initial value is explicitly undefined', async () => {
    const sparse = Array<number | undefined>(4)
    sparse[2] = undefined
    const indexes: number[] = []
    await _.reduce<number | undefined, number | undefined>(
      sparse,
      async (_acc, item, index) => {
        indexes.push(index)
        return item
      },
      undefined,
    )
    expect(indexes).toEqual([2])
  })

  test('ignores elements appended by the reducer', async () => {
    const values = [1, 2]
    const result = await _.reduce(
      values,
      async (acc, value, index) => {
        if (index === 0) {
          values.push(3)
        }
        return acc + value
      },
      0,
    )
    expect(result).toBe(3)
  })

  test('rejects an all-hole array without an initial value', async () => {
    await expect(_.reduce(Array<number>(3), reducer)).rejects.toThrow(TypeError)
  })

  test('throws on no init value and an empty array', async () => {
    await expect(async () => _.reduce([], reducer)).rejects.toThrowError(
      'Reduce of empty array with no initial value',
    )
  })
})
