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
})
