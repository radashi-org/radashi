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

  test('single call with falling option is set to `true` calls source function once', async () => {
    let calls = 0
    const func = _.throttle({ interval, falling: true }, () => calls++)
    func()
    expect(calls).toBe(1)
    vi.advanceTimersByTime(interval + 10)
    expect(calls).toBe(1)
  })

  test('repeated calls with falling option is set to `true` calls source function again on falling edge', async () => {
    let calls = 0
    const func = _.throttle({ interval, falling: true }, () => calls++)
    func()
    expect(calls).toBe(1)
    vi.advanceTimersByTime(10)
    func()
    vi.advanceTimersByTime(interval + 10)
    expect(calls).toBe(2)
  })
})
