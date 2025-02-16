import { AsyncPushable } from 'radashi'

describe('AsyncPushable', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test('basic push and done', async () => {
    const stream = new AsyncPushable<number>()

    setTimeout(() => stream.push(1), 10)
    setTimeout(() => stream.push(2), 20)
    setTimeout(() => stream.push(3), 30)
    setTimeout(() => stream.done(), 40)

    const result: any[] = []

    const consumer = (async () => {
      for await (const value of stream) {
        result.push(value)
      }
    })()

    vi.advanceTimersByTime(40)
    await consumer

    expect(result).toEqual([1, 2, 3])
  })

  test.only('push and throw', async () => {
    const stream = new AsyncPushable<number>()

    const result: any[] = []
    let caughtError: any

    const consumer = (async () => {
      try {
        for await (const value of stream) {
          result.push(value)
        }
      } catch (e) {
        caughtError = e
      }
    })()

    stream.push(1)
    await vi.runAllTimersAsync()

    stream.push(2)
    await vi.runAllTimersAsync()

    const error = new Error('BOOM!')
    stream.push(3)
    stream.throw(error)

    await consumer

    expect(result).toEqual([1, 2, 3])
    expect(caughtError).toBe(error)
  })
})
