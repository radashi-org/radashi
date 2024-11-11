import { flushMicroTasks } from 'flush-microtasks'
import * as _ from 'radashi'

const interval = 1000
const smidge = 10

describe('bottleneck', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('limit calls within interval', async () => {
    const fn = vi.fn((x: number) => x)
    const limitedFn = _.bottleneck({ max: 2, interval }, fn)

    limitedFn(1)
    limitedFn(2)
    limitedFn(3)

    expect(fn).toHaveBeenCalledTimes(2)
    expect(fn).toHaveBeenNthCalledWith(1, 1)
    expect(fn).toHaveBeenNthCalledWith(2, 2)

    vi.advanceTimersByTime(interval - smidge)
    expect(fn).toHaveBeenCalledTimes(2)

    vi.advanceTimersByTime(smidge)
    expect(fn).toHaveBeenCalledTimes(3)
    expect(fn).toHaveBeenNthCalledWith(3, 3)
  })

  test('respect concurrency limit', async () => {
    const fn = vi.fn(async (x: number) => {
      await _.sleep(smidge)
      return x
    })
    const limitedFn = _.bottleneck(
      { max: Number.POSITIVE_INFINITY, interval, concurrency: 1 },
      fn,
    )

    const promise1 = limitedFn(1)
    const promise2 = limitedFn(2)

    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(smidge)
    await flushMicroTasks()

    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(interval)

    const [result1, result2] = await Promise.all([promise1, promise2])

    expect(result1).toBe(1)
    expect(result2).toBe(2)
  })

  test('queue calls beyond max limit', async () => {
    const fn = vi.fn((x: number) => x)
    const limitedFn = _.bottleneck({ max: 1, interval }, fn)

    const promise1 = limitedFn(1)
    const promise2 = limitedFn(2)

    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(smidge)

    expect(fn).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(interval)

    expect(fn).toHaveBeenCalledTimes(2)
    vi.advanceTimersByTime(interval)

    expect(fn).toHaveBeenCalledTimes(2)
    limitedFn(3) // <- Should run immediately.
    expect(fn).toHaveBeenCalledTimes(3)

    const result1 = await promise1
    expect(result1).toBe(1)

    const result2 = await promise2
    expect(result2).toBe(2)
  })

  test('error thrown by first call does not affect queued calls', async () => {
    const fn = vi.fn(async (x: number) => {
      await _.sleep(smidge)
      if (x === 1) {
        throw new Error('test')
      }
      return x
    })
    const limitedFn = _.bottleneck({ max: 1, interval }, fn)

    const promise1 = limitedFn(1)
    const promise2 = limitedFn(2)

    vi.advanceTimersByTime(smidge)
    await expect(promise1).rejects.toThrow('test')

    expect(fn).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(interval)
    await flushMicroTasks()

    expect(fn).toHaveBeenCalledTimes(2)

    await expect(promise2).resolves.toBe(2)
  })

  test('error thrown by queued call does not affect other queued calls', async () => {
    const fn = vi.fn(async (x: number) => {
      await _.sleep(smidge)
      if (x === 2) {
        throw new Error('test')
      }
      return x
    })
    const limitedFn = _.bottleneck({ max: 1, interval }, fn)

    const promise1 = limitedFn(1)
    const promise2 = limitedFn(2)
    const promise3 = limitedFn(3)

    vi.advanceTimersByTime(smidge)
    await expect(promise1).resolves.toBe(1)

    vi.advanceTimersByTime(interval)
    await expect(promise2).rejects.toThrow('test')

    vi.advanceTimersByTime(interval)
    await expect(promise3).resolves.toBe(3)
  })

  describe('cancel method', () => {
    test('cancels all queued calls', async () => {
      const fn = vi.fn((x: number) => x)
      const limitedFn = _.bottleneck({ max: 1, interval }, fn)

      limitedFn(1)
      limitedFn(2)

      expect(fn).toHaveBeenCalledTimes(1)
      limitedFn.cancel()

      vi.advanceTimersByTime(interval)
      await flushMicroTasks()

      expect(fn).toHaveBeenCalledTimes(1)
    })
  })
})
