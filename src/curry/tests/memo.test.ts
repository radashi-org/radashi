import * as _ from 'radashi'

describe('memo function', () => {
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
        key: arg => arg.user.id
      }
    )
    const resultA = func({ user: { id: 'alpha' } })
    const resultB = func({ user: { id: 'beta' } })
    const resultA2 = func({ user: { id: 'alpha' } })
    expect(resultA).toBe(resultA2)
    expect(resultB).not.toBe(resultA)
  })
  test('calls function again when first value expires', async () => {
    const func = _.memo(() => new Date().getTime(), {
      ttl: 1
    })
    const resultA = func()
    await new Promise(res => setTimeout(res, 100))
    const resultB = func()
    expect(resultA).not.toBe(resultB)
  })
  test('does not call function again when first value has not expired', async () => {
    const func = _.memo(() => new Date().getTime(), {
      ttl: 1000
    })
    const resultA = func()
    await new Promise(res => setTimeout(res, 100))
    const resultB = func()
    expect(resultA).toBe(resultB)
  })
})
