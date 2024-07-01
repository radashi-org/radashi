import * as _ from 'radashi'

describe('throttle', () => {
  test('throttles!', async () => {
    let calls = 0
    const func = _.throttle({ interval: 600 }, () => calls++)
    func()
    func()
    func()
    expect(calls).toBe(1)
    await _.sleep(610)
    func()
    func()
    func()
    expect(calls).toBe(2)
  })

  test('returns if the throttle is active', async () => {
    const results = []
    const func = _.throttle({ interval: 600 }, () => {})
    results.push(func.isThrottled())
    func()
    results.push(func.isThrottled())
    func()
    results.push(func.isThrottled())
    func()
    results.push(func.isThrottled())
    await _.sleep(610)
    results.push(func.isThrottled())
    assert.deepEqual(results, [false, true, true, true, false])
  })
})
