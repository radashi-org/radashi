import * as _ from 'radashi'

describe('withMutex', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('does blocked while the mutex is locked', async () => {
    const values: number[][] = [];
    const exclusive = _.withMutex()
    exclusive(async (permit) => {
      await _.sleep(50)
      values.push([1, permit.running])
    })
    exclusive(async (permit) => {
      await _.sleep(100)
      values.push([2, permit.running])
    })
    exclusive(async (permit) => {
      await _.sleep(100)
      values.push([3, permit.running])
    })

    await vi.advanceTimersByTimeAsync(51)
    expect(values).toEqual([[1, 1]])

    await vi.advanceTimersByTimeAsync(101)
    expect(values).toEqual([[1, 1], [2, 1]])

    await vi.advanceTimersByTimeAsync(101)
    expect(values).toEqual([[1, 1], [2, 1], [3, 1]])
  })

  test('handler failures does not affect the mutex release', async () => {
    const exclusive = _.withMutex(async () => {
      throw new Error('boom')
    })

    await expect(exclusive()).rejects.toThrow('boom')

    expect(exclusive.isLocked()).toBe(false)
  })

  test('does expose manual lock management', async () => {
    const values: number[][] = [];
    const mutex = _.withMutex()
    const permit = await mutex.acquire()
    expect(permit.isAcquired).toBe(true)

    mutex(async (permit) => {
      values.push([1, permit.running])
    })

    expect(values).toEqual([])

    permit.release()

    await vi.advanceTimersByTimeAsync(0)
    expect(values).toEqual([[1, 1]])
  })

  test('permit is released only once', async () => {
    const mutex = _.withMutex()
    const permit_a = await mutex.acquire()

    expect(permit_a.isAcquired).toBe(true)
    expect(mutex.isLocked()).toBe(true)

    permit_a.release()
    expect(permit_a.isAcquired).toBe(false)
    expect(mutex.isLocked()).toBe(false)

    const permit_b = await mutex.acquire()
    expect(permit_b.isAcquired).toBe(true)
    expect(mutex.isLocked()).toBe(true)

    permit_a.release() // permit_a release has no impact on permit_b
    expect(permit_a.isAcquired).toBe(false)
    expect(permit_b.isAcquired).toBe(true)
    expect(mutex.isLocked()).toBe(true)
  })

  test('signatures', () => {
    expect(_.withMutex()).toBeDefined()
    expect(_.withMutex(async () => { })).toBeDefined()
  })
})
