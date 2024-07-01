import * as _ from 'radashi'

describe('guard', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  it('returns result of given async function', async () => {
    const result = await _.guard(async () => {
      return 'hello'
    })
    expect(result).toBe('hello')
  })
  it('returns result of given sync function', async () => {
    const result = _.guard(() => {
      return 'hello'
    })
    expect(result).toBe('hello')
  })
  it('returns error if given async function throws', async () => {
    const result =
      (await _.guard(async () => {
        throw new Error('error')
      })) ?? 'good-bye'
    expect(result).toBe('good-bye')
  })
  it('returns error if given sync function throws', async () => {
    const alwaysThrow = () => {
      // biome-ignore lint/correctness/noConstantCondition:
      if (1 > 0) {
        throw new Error('error')
      }
      return undefined
    }
    const result = _.guard(alwaysThrow) ?? 'good-bye'
    expect(result).toBe('good-bye')
  })
  it('throws error if shouldGuard returns false', async () => {
    const makeFetchUser = (id: number) => {
      return async () => {
        if (id === 1) {
          return 'user1'
        }
        if (id === 2) {
          throw new Error('user not found')
        }
        throw new Error('unknown error')
      }
    }
    const isUserNotFoundErr = (err: any) => err.message === 'user not found'
    const fetchUser = async (id: number) =>
      (await _.guard(makeFetchUser(id), isUserNotFoundErr)) ?? 'default-user'

    const user1 = await fetchUser(1)
    expect(user1).toBe('user1')

    const user2 = await fetchUser(2)
    expect(user2).toBe('default-user')

    try {
      await fetchUser(3)
      expect.fail()
    } catch (err: any) {
      expect(err.message).toBe('unknown error')
    }
  })
})
