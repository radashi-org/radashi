// cSpell:ignore backoffs

import type { RetryOptions } from 'radashi'
import * as _ from 'radashi'

const cast = <T = RetryOptions>(value: any): T => value

describe('retry', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  test('returns result of given function', async () => {
    const result = await _.retry(cast(null), async _bail => {
      return 'hello'
    })
    expect(result).toBe('hello')
  })
  test('simple + quick + happy path', async () => {
    const result = await _.retry(cast(null), async () => {
      return 'hello'
    })
    expect(result).toBe('hello')
  })
  test('retries on failure', async () => {
    let failedOnce = false
    const result = await _.retry(cast(null), async _bail => {
      if (!failedOnce) {
        failedOnce = true
        throw 'Failing for test'
      }
      return 'hello'
    })
    expect(result).toBe('hello')
  })
  test('quits on bail', async () => {
    try {
      await _.retry({}, async bail => {
        bail('i quit')
      })
    } catch (err) {
      expect(err).toBe('i quit')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('quits after max retries', async () => {
    try {
      await _.retry({}, async () => {
        throw 'quit again'
      })
    } catch (err) {
      expect(err).toBe('quit again')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('quits after max retries without delay', async () => {
    try {
      const func = async () => {
        throw 'quit again'
      }
      await _.retry({ times: 3 }, func)
    } catch (err) {
      expect(err).toBe('quit again')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('quits after max retries with delay', async () => {
    try {
      const func = async () => {
        throw 'quit again'
      }
      const promise = _.retry({ delay: 1000, times: 2 }, func)
      vi.advanceTimersByTimeAsync(1000)
      await promise
    } catch (err) {
      expect(err).toBe('quit again')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('uses backoff between retries', async () => {
    let count = 0
    let backoffs = 0
    const start = Date.now()
    const promise = _.retry(
      {
        times: 3,
        backoff: i => {
          backoffs += i ** 10
          return i ** 10
        },
      },
      async () => {
        count++
        if (count < 3) {
          throw 'error'
        }
      },
    )
    // Two async advances for the first two async attempts, each of which are
    // followed by sleeps
    vi.advanceTimersToNextTimerAsync()
    vi.advanceTimersToNextTimerAsync()
    await promise

    const diff = Date.now() - start
    expect(count).toBe(3)
    // Time taken should at least be the
    // total ms backed off. Using exponential
    // backoff (above) 3 times (passing on
    // the third try) that is:
    //   - 1**10 + 2**10 = 1025
    // The performance typically comes in 1
    // or 2 milliseconds after.
    expect(diff).toBeGreaterThanOrEqual(backoffs)
  })
  test('aborts the retry operation when signal is aborted', async () => {
    try {
      const abortController = new AbortController()
      let attempt = 0
      await _.retry({ signal: abortController.signal }, async () => {
        attempt++
        if (attempt === 2) {
          abortController.abort()
        }
        throw 'quit again'
      })
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect((err as Error).message).toBe('This operation was aborted')
      return
    }

    expect.fail('error should have been thrown')
  })
})
