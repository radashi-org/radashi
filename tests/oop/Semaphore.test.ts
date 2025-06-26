import { Semaphore, SemaphorePermit } from 'radashi'

describe('Semaphore', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('basic usage and signatures', async () => {
    const semaphore1 = new Semaphore(1)
    expect(semaphore1).toBeInstanceOf(Semaphore)
    expect(semaphore1.capacity).toBe(1)

    const permit1 = await semaphore1.acquire()
    expect(permit1).toBeInstanceOf(SemaphorePermit)
    expect(permit1.weight).toBe(1)
    permit1.release()

    const semaphore2 = new Semaphore(5)
    const permit2 = await semaphore2.acquire({ weight: 3 })
    expect(permit2.weight).toBe(3)
    permit2.release()
  })

  test('avoid blocking while capacity is above zero', async () => {
    const values: number[] = []
    const semaphore = new Semaphore(2)

    const permit1 = await semaphore.acquire()
    values.push(1)

    const permit2 = await semaphore.acquire()
    values.push(2)

    expect(values).toEqual([1, 2])

    permit1.release()
    permit2.release()
  })

  test('block while capacity is zero', async () => {
    const values: number[] = []
    const semaphore = new Semaphore(2)

    const permit1 = await semaphore.acquire()
    values.push(1)

    await semaphore.acquire()
    values.push(2)

    // Attempt to acquire a third permit, which should block
    semaphore.acquire().then(() => {
      values.push(3)
    })
    await vi.advanceTimersByTimeAsync(0)

    // At this point, both permits are acquired, the third should be blocked
    expect(values).toEqual([1, 2])

    // Release the first permit, allowing the third to be acquired
    permit1.release()
    await vi.advanceTimersByTimeAsync(0) // Allow promise to resolve
    expect(values).toEqual([1, 2, 3])
  })

  test('basic weighted acquisition', async () => {
    const values: number[] = []
    const semaphore = new Semaphore(3) // Increased capacity for weighted tests

    const permit1 = await semaphore.acquire({ weight: 2 })
    values.push(1)

    const acquire2Promise = semaphore.acquire({ weight: 1 }).then(permit => {
      values.push(2)
      return permit
    })

    semaphore.acquire({ weight: 3 }).then(() => {
      values.push(3)
    })

    // Permit 1 acquired (weight 2), capacity is 1.
    // Permit 2 acquired (weight 1), capacity is 0.
    // Permit 3 (weight 3) should be blocked.
    await vi.advanceTimersByTimeAsync(0)
    expect(values).toEqual([1, 2])

    // Release permit 1 (weight 2), capacity becomes 2.
    // Permit 3 (weight 3) should still be blocked.
    permit1.release()
    await vi.advanceTimersByTimeAsync(0)
    expect(values).toEqual([1, 2])

    // Release permit 2 (weight 1), capacity becomes 3.
    // Permit 3 (weight 3) should be acquired.
    const permit2 = await acquire2Promise
    permit2.release()
    await vi.advanceTimersByTimeAsync(0)
    expect(values).toEqual([1, 2, 3])
  })

  test('permit is released only once', async () => {
    const semaphore = new Semaphore(2)
    const permit = await semaphore.acquire({ weight: 2 })

    permit.release()
    expect(semaphore.capacity).toBe(2)

    permit.release() // Releasing again should have no effect
    expect(semaphore.capacity).toBe(2)

    // Verify that another permit can be acquired after the release
    await semaphore.acquire({ weight: 2 })
    expect(semaphore.capacity).toBe(0)
  })

  test('invalid options', async () => {
    expect(() => new Semaphore(0)).toThrowErrorMatchingInlineSnapshot(
      `[Error: maxCapacity must be > 0]`,
    )

    const semaphore = new Semaphore(2)
    await expect(
      semaphore.acquire({ weight: 0 }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`[Error: weight must be > 0]`)

    await expect(
      semaphore.acquire({ weight: 5 }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '[Error: weight must be ≤ maxCapacity]',
    )
  })

  test('aborting acquire before permit is acquired', async () => {
    const semaphore = new Semaphore(1)
    await semaphore.acquire() // Acquire the only permit
    expect(semaphore.capacity).toBe(0)

    const controller = new AbortController()
    const acquirePromise = semaphore.acquire({ signal: controller.signal })
    expect(semaphore.queueLength).toBe(1)

    // Abort before the permit is available
    controller.abort()

    await expect(acquirePromise).rejects.toThrow('This operation was aborted')
    await expect(acquirePromise).rejects.toHaveProperty('name', 'AbortError')
    expect(semaphore.queueLength).toBe(0)
  })

  test('rejecting semaphore while acquisition requests are pending', async () => {
    const semaphore = new Semaphore(1)
    await semaphore.acquire() // Acquire the only permit
    expect(semaphore.capacity).toBe(0)

    const acquirePromise = semaphore.acquire() // This should block
    expect(semaphore.queueLength).toBe(1)

    const rejectionError = new Error('Semaphore rejected')
    semaphore.reject(rejectionError)

    await expect(acquirePromise).rejects.toBe(rejectionError)
    expect(semaphore.queueLength).toBe(0)

    // Future acquisition requests should also be rejected
    await expect(() => semaphore.acquire()).rejects.toThrow(rejectionError)
  })
})
