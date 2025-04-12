import * as _ from 'radashi'

describe('withSemaphore', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('does not blocked while the semaphore has not reached zero', async () => {
    const values: number[] = []
    const exclusive = _.withSemaphore(2)

    exclusive(async () => {
      values.push(1)
    })
    exclusive(async () => {
      values.push(2)
    })

    await vi.advanceTimersByTimeAsync(0)

    expect(values).toEqual([1, 2])
  })

  test('does blocked while the semaphore has reached zero', async () => {
    const values: number[][] = []
    const exclusive = _.withSemaphore(2)
    exclusive(async permit => {
      await _.sleep(50)
      values.push([1, permit.running])
    })
    exclusive(async permit => {
      await _.sleep(100)
      values.push([2, permit.running])
    })
    exclusive(async permit => {
      await _.sleep(100)
      values.push([3, permit.running])
    })

    await vi.advanceTimersByTimeAsync(51)
    expect(values).toEqual([[1, 2]])

    await vi.advanceTimersByTimeAsync(51)
    expect(values).toEqual([
      [1, 2],
      [2, 2],
    ])

    await vi.advanceTimersByTimeAsync(51)
    expect(values).toEqual([
      [1, 2],
      [2, 2],
      [3, 1],
    ])
  })

  test('does weight the rexecution', async () => {
    const values: number[][] = []
    const exclusive = _.withSemaphore(2)
    exclusive(2, async permit => {
      values.push([1, permit.running])
    })
    exclusive(2, async permit => {
      values.push([2, permit.running])
    })
    exclusive(2, async permit => {
      values.push([3, permit.running])
    })

    await vi.advanceTimersByTimeAsync(0)
    expect(values).toEqual([
      [1, 2],
      [2, 2],
      [3, 2],
    ])
  })

  test('handler failures does not affect the semaphore release', async () => {
    const exclusive = _.withSemaphore(2, async () => {
      throw new Error('boom')
    })

    await expect(exclusive()).rejects.toThrow('boom')

    expect(exclusive.getRunning()).toEqual(0)
  })

  test('does expose manual lock management', async () => {
    const values: number[][] = []
    const semaphore = _.withSemaphore(2)
    const permit = await semaphore.acquire(2)
    expect(permit.weight).toBe(2)

    semaphore(async permit => {
      values.push([1, permit.running])
    })

    expect(values).toEqual([])

    permit.release()

    await vi.advanceTimersByTimeAsync(0)
    expect(values).toEqual([[1, 1]])
  })

  test('permit is released only once', async () => {
    const semaphore = _.withSemaphore(2)
    const permit = await semaphore.acquire(2)

    expect(permit.isAcquired).toBe(true)
    expect(semaphore.getRunning()).toBe(2)

    permit.release()
    expect(permit.isAcquired).toBe(false)
    expect(semaphore.getRunning()).toBe(0)

    permit.release()
    expect(permit.isAcquired).toBe(false)
    expect(semaphore.getRunning()).toBe(0)
  })

  test('signatures', () => {
    expect(_.withSemaphore(1)).toBeDefined()
    expect(_.withSemaphore(1, async () => {})).toBeDefined()
    expect(_.withSemaphore({ capacity: 1 })).toBeDefined()
    expect(_.withSemaphore({ capacity: 1 }, async () => {})).toBeDefined()
  })

  test('invalid options', async () => {
    const semaphore = _.withSemaphore(2)
    expect(() => _.withSemaphore(0)).toThrow(
      /invalid capacity 0: must be positive/,
    )
    expect(() => semaphore.acquire(0)).toThrow(
      /invalid weight 0: must be positive/,
    )
    expect(() => semaphore.acquire(5)).toThrow(
      /invalid weight 5: must be lower than or equal capacity 2/,
    )
    expect(() => semaphore.release(0)).toThrow(
      /invalid weight 0: must be positive/,
    )
    // @ts-expect-error should pass function
    await expect(semaphore(1)).rejects.toThrow(
      /invalid execution: function is required/,
    )
  })
})
