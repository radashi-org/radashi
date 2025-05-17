import * as _ from 'radashi'

describe('promiseChain', () => {
  test('executes all input functions', async () => {
    const expected = `Your Value is 10`

    const func1 = vi.fn((a, b) => a + b)
    const func2 = vi.fn(async n => n * 2)
    const func3 = vi.fn(async n => `Your Value is ${n}`)

    const chained = _.promiseChain(func1, func2, func3)
    const result = await chained(3, 2)

    expect(func1).toHaveBeenCalledWith(3, 2)
    expect(func2).toHaveBeenCalledWith(func1(3, 2))
    expect(func3).toHaveBeenCalledWith(10)

    expect(result).toBe(expected)
  })
})
