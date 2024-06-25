import * as _ from 'radashi'
import { RetryOptions } from 'radashi'

const cast = <T = RetryOptions>(value: any): T => value

describe('_.retry', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('returns result of given function', async () => {
    const result = await _.retry(cast(null), async bail => {
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
    const result = await _.retry(cast(null), async bail => {
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
        bail('iquit')
      })
    } catch (err) {
      expect(err).toBe('iquit')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('quits after max retries', async () => {
    try {
      await _.retry({}, async () => {
        throw 'quitagain'
      })
    } catch (err) {
      expect(err).toBe('quitagain')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('quits after max retries without delay', async () => {
    try {
      const func = async () => {
        throw 'quitagain'
      }
      await _.retry({ times: 3 }, func)
    } catch (err) {
      expect(err).toBe('quitagain')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('quits after max retries with delay', async () => {
    try {
      const func = async () => {
        throw 'quitagain'
      }
      await _.retry({ delay: 100 }, func)
    } catch (err) {
      expect(err).toBe('quitagain')
      return
    }
    expect.fail('error should have been thrown')
  })
  test('uses backoff between retries', async () => {
    let count = 0
    let backoffs: number = 0
    const start = Date.now()
    await _.retry(
      {
        times: 3,
        backoff: i => {
          backoffs += i ** 10
          return i ** 10
        }
      },
      async () => {
        count++
        if (count < 3) throw 'error'
      }
    )
    const diff = Date.now() - start
    expect(count).toBe(3)
    // Time taken should at least be the
    // total ms backed off. Using exponential
    // backoff (above) 3 times (passing on
    // the third try) that is:
    //   - 10**1 + 10**2 = 1025
    // The performance typically comes in 1
    // or 2 milliseconds after.
    expect(diff).toBeGreaterThanOrEqual(backoffs)
  })
})
