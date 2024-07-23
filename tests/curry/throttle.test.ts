import * as _ from 'radashi'

describe('throttle', () => {
  const interval = 600

  beforeEach(() => {
    vi.useFakeTimers()
  })

  test('throttles!', async () => {
    let calls = 0
    const func = _.throttle({ interval }, () => calls++)
    func()
    func()
    func()
    expect(calls).toBe(1)
    vi.advanceTimersByTime(interval + 10)
    func()
    func()
    func()
    expect(calls).toBe(2)
  })

  test('returns if the throttle is active', async () => {
    const results = []
    const func = _.throttle({ interval }, () => {})
    results.push(func.isThrottled())
    func()
    results.push(func.isThrottled())
    func()
    results.push(func.isThrottled())
    func()
    results.push(func.isThrottled())
    vi.advanceTimersByTime(interval + 10)
    results.push(func.isThrottled())
    assert.deepEqual(results, [false, true, true, true, false])
  })

  describe('trailing option', () => {
    test('single call with trailing option is set to `true` calls source function once', async () => {
      let calls = 0
      const func = _.throttle({ interval, trailing: true }, () => calls++)
      func()
      expect(calls).toBe(1)
      vi.advanceTimersByTime(interval + 10)
      expect(calls).toBe(1)
    })

    test('repeated calls with trailing option is set to `true` calls source function again on trailing edge', async () => {
      let calls = 0
      const func = _.throttle({ interval, trailing: true }, () => calls++)
      func()
      expect(calls).toBe(1)
      vi.advanceTimersByTime(10)
      func()
      vi.advanceTimersByTime(interval + 10)
      expect(calls).toBe(2)
    })

    test('with trailing option is set to `true`, throttling is still effective after a trailing invocation', async () => {
      let calls = 0
      const func = _.throttle({ interval, trailing: true }, () => calls++)
      func()
      func()
      expect(calls).toBe(1)
      vi.advanceTimersByTime(10)
      func()
      func()
      expect(calls).toBe(1)
      vi.advanceTimersByTime(interval)
      // By now, the trailing call should have occurred
      expect(calls).toBe(2)

      vi.advanceTimersByTime(10)
      func()
      func()
      // This call should still be throttled
      expect(calls).toBe(2)

      vi.advanceTimersByTime(interval + 10)
      // By now another trailing call should have happened
      expect(calls).toBe(3)
    })
  })
})
