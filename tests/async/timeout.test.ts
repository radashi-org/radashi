import * as _ from 'radashi'

describe('timeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  test('rejects after a specified number of milliseconds', async () => {
    const promise = _.timeout(10)

    vi.advanceTimersToNextTimerAsync()

    await expect(promise).rejects.toThrow(_.TimeoutError)
  })

  test('rejects with a custom error message', async () => {
    const promise = _.timeout(10, 'too slow')

    vi.advanceTimersToNextTimerAsync()

    await expect(promise).rejects.toThrow(new _.TimeoutError('too slow'))
  })

  test('rejects with a custom error function', async () => {
    class CustomError extends Error {}

    const promise = _.timeout(10, () => new CustomError())

    vi.advanceTimersToNextTimerAsync()

    await expect(promise).rejects.toThrow(CustomError)
  })

  describe('with Promise.race', () => {
    test('resolves correctly when sleep finishes before timeout', async () => {
      const promise = Promise.race([_.sleep(10), _.timeout(100)])

      vi.advanceTimersByTime(100)

      await expect(promise).resolves.toBeUndefined()
    })

    test('rejects with timeout when it finishes before sleep', async () => {
      const promise = Promise.race([_.sleep(100), _.timeout(10)])

      vi.advanceTimersByTime(100)

      await expect(promise).rejects.toThrow()
    })
  })
})
