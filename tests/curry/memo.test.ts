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

  test('uses multiple keys to identify unique calls', () => {
    const rawFn = vi.fn((arg: { id: string; withAdditionalStuff: boolean }) => {
      if (arg.withAdditionalStuff) {
        // do stuff
      }

      return arg.id
    })

    const func = _.memo(rawFn, {
      key: arg =>
        arg.withAdditionalStuff
          ? `${arg.id}_withAdditionalStuff`
          : [`${arg.id}`, `${arg.id}_withAdditionalStuff`], // we also look for the shared key
      setKey: arg =>
        arg.withAdditionalStuff
          ? [`${arg.id}`, `${arg.id}_withAdditionalStuff`] // we also set the shared key
          : `${arg.id}`,
    })

    func({ id: '1', withAdditionalStuff: true })
    func({ id: '1', withAdditionalStuff: false })
    expect(rawFn).toHaveBeenCalledTimes(1)

    rawFn.mockClear()

    func({ id: '2', withAdditionalStuff: false })
    func({ id: '2', withAdditionalStuff: true })
    expect(rawFn).toHaveBeenCalledTimes(2)
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
})
