import * as _ from 'radashi'

describe('promiseMemo', () => {
  let func: ReturnType<typeof vi.fn>

  beforeEach(() => {
    func = vi.fn(
      async (param: number | Record<string, Record<string, string>>) => {
        return new Promise(resolve => {
          resolve(param)
        })
      },
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('only executes function once', async () => {
    const memoized = _.promiseMemo(func)

    const resultA = await memoized(2)
    const resultB = await memoized(2)

    expect(resultA).toBe(resultB)
    expect(func).toHaveBeenCalledTimes(1)
  })

  test('uses key to identify unique calls', async () => {
    const memoized = _.promiseMemo(func, {
      key: arg => arg.user.id,
    })

    const resultA = await memoized({ user: { id: 'Alpha' } })
    const resultB = await memoized({ user: { id: 'Beta' } })
    const resultA2 = await memoized({ user: { id: 'Alpha' } })

    expect(resultA).toBe(resultA2)
    expect(resultA).not.toBe(resultB)
    expect(func).toHaveBeenCalledTimes(2)
  })

  test('does not call the function if ttl is passed & not expired', async () => {
    vi.useFakeTimers()

    const memoized = _.promiseMemo(func, {
      ttl: 1000,
    })

    const resultA = await memoized(2)

    vi.advanceTimersByTime(100)

    const resultB = await memoized(2)

    expect(func).toHaveBeenCalledTimes(1)
    expect(resultA).toBe(resultB)
  })

  test('calls the function again if ttl is passed & expired', async () => {
    vi.useFakeTimers()
    const memoized = _.promiseMemo(func, {
      ttl: 1,
    })

    const resultA = await memoized(2)

    vi.advanceTimersByTime(1000)
    vi.runOnlyPendingTimers()
    await Promise.resolve()

    const resultB = await memoized(2)

    expect(func).toHaveBeenCalledTimes(2)
    expect(resultA).toBe(resultB)
  })

  test('deletes the cache if input function throws error', async () => {
    func = vi.fn(async (_param: number) => {
      throw new Error('Nope!')
    })

    const memoized = _.promiseMemo(func)

    await expect(memoized(2)).rejects.toThrow('Nope!')
    await expect(memoized(2)).rejects.toThrow('Nope!')

    expect(func).toHaveBeenCalledTimes(2)
  })
})
