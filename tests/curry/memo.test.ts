import * as _ from 'radashi'

describe('memo', () => {
  test('only executes function once', () => {
    const func = _.memo(() => new Date().getTime())
    const resultA = func()
    const resultB = func()
    expect(resultA).toBe(resultB)
  })
  test('uses key to identify unique calls', () => {
    const func = _.memo(
      (arg: { user: { id: string } }) => {
        const ts = new Date().getTime()
        return `${ts}::${arg.user.id}`
      },
      {
        key: arg => arg.user.id,
      },
    )
    const resultA = func({ user: { id: 'alpha' } })
    const resultB = func({ user: { id: 'beta' } })
    const resultA2 = func({ user: { id: 'alpha' } })
    expect(resultA).toBe(resultA2)
    expect(resultB).not.toBe(resultA)
  })
  test('calls function again when first value expires', async () => {
    vi.useFakeTimers()
    const func = _.memo(() => new Date().getTime(), {
      ttl: 1,
    })
    const resultA = func()
    vi.advanceTimersByTime(100)
    const resultB = func()
    expect(resultA).not.toBe(resultB)
  })
  test('does not call function again when first value has not expired', async () => {
    vi.useFakeTimers()
    const func = _.memo(() => new Date().getTime(), {
      ttl: 1000,
    })
    const resultA = func()
    vi.advanceTimersByTime(100)
    const resultB = func()
    expect(resultA).toBe(resultB)
  })
  test('calls function for keys that match Object.prototype properties', () => {
    const func = _.memo((key: string) => `value:${key}`, {
      key: key => key,
    })
    expect(func('constructor')).toBe('value:constructor')
    expect(func('toString')).toBe('value:toString')
    expect(func('__proto__')).toBe('value:__proto__')
    expect(func('__proto__')).toBe('value:__proto__')
  })
  test('caches an undefined result', () => {
    const fn = vi.fn(() => undefined)
    const func = _.memo(fn)
    func()
    func()
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
