import * as _ from 'radashi'

describe('throttle', () => {
  const interval = 600
  const smidge = 10

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
    vi.advanceTimersByTime(interval + smidge)
    func()
    func()
    func()
    expect(calls).toBe(2)
  })

  describe('trailing option', () => {
    test('single call with trailing set to true', async () => {
      let calls = 0
      const func = _.throttle({ interval, trailing: true }, () => calls++)
      func()
      expect(calls).toBe(1)
      vi.advanceTimersByTime(interval + smidge)
      expect(calls).toBe(1)
    })

    test('repeated calls with trailing set to true', async () => {
      let calls = 0
      const func = _.throttle({ interval, trailing: true }, () => calls++)
      func()
      expect(calls).toBe(1)
      vi.advanceTimersByTime(smidge)
      func()
      vi.advanceTimersByTime(interval + smidge)
      expect(calls).toBe(2)
    })

    test('', async () => {
      const wrapped = vi.fn()
      const func = _.throttle({ interval, trailing: true }, wrapped)

      func()
      func()

      expect(wrapped).toHaveBeenCalledTimes(1)

      // Advance time a bit (but still before the interval).
      vi.advanceTimersByTime(smidge)

      // Still throttled.
      func()
      func()

      expect(wrapped).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(interval)

      // By now, the trailing call should have occurred
      expect(wrapped).toHaveBeenCalledTimes(2)

      // The trailing call should re-throttle the function.
      expect(func.isThrottled()).toBe(true)

      // So these will be throttled.
      func()
      func()
      expect(wrapped).toHaveBeenCalledTimes(2)

      vi.advanceTimersByTime(interval + smidge)

      // By now another trailing call should have happened
      expect(wrapped).toHaveBeenCalledTimes(3)
    })
  })

  describe('isThrottled method', () => {
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
      vi.advanceTimersByTime(interval + smidge)
      results.push(func.isThrottled())
      assert.deepEqual(results, [false, true, true, true, false])
    })
  })

  describe('trigger method', () => {
    test('ignore any throttle in place', () => {
      const wrapped = vi.fn()
      const func = _.throttle({ interval }, wrapped)

      func()
      expect(wrapped).toHaveBeenCalledTimes(1)
      func()
      expect(wrapped).toHaveBeenCalledTimes(1)
      func()
      expect(wrapped).toHaveBeenCalledTimes(1)

      func.trigger()
      expect(wrapped).toHaveBeenCalledTimes(2)
    })

    test('clears trailing state', () => {
      const wrapped = vi.fn()
      const func = _.throttle({ interval, trailing: true }, wrapped)

      func()
      func() // <-- trailing call
      func.trigger()
      expect(wrapped).toHaveBeenCalledTimes(2)

      // Since trigger was called, the trailing call was cancelled.
      vi.advanceTimersByTime(interval + smidge)
      expect(wrapped).toHaveBeenCalledTimes(2)

      func()
      func.trigger()
      func() // <-- trailing call after trigger
      expect(wrapped).toHaveBeenCalledTimes(4)

      // Since the trailing call was queued after the trigger, it will
      // still be called.
      vi.advanceTimersByTime(interval + smidge)
      expect(wrapped).toHaveBeenCalledTimes(5)
    })
  })
})
