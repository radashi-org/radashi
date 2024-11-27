import * as _ from 'radashi'

describe('all', () => {
  const promise = {
    resolve: <T>(value: T) => new Promise<T>(res => res(value)),
    reject: (err: any) => new Promise((res, rej) => rej(err)),
  }
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  it('returns array with values in correct order when given array', async () => {
    const result = await _.all([
      promise.resolve(22),
      promise.resolve('hello'),
      promise.resolve({ name: 'ray' }),
    ])
    expect(result).toEqual([22, 'hello', { name: 'ray' }])
  })
  it('returns object with values in correct keys when given object', async () => {
    const result = await _.all({
      num: promise.resolve(22),
      str: promise.resolve('hello'),
      obj: promise.resolve({ name: 'ray' }),
    })
    expect(result).toEqual({
      num: 22,
      str: 'hello',
      obj: { name: 'ray' },
    })
  })
  it('throws aggregate error when a single promise fails (in object mode)', async () => {
    try {
      await _.all({
        num: promise.resolve(22),
        str: promise.resolve('hello'),
        err: promise.reject(new Error('broken')),
      })
    } catch (e: any) {
      const err = e as AggregateError
      expect(err.errors.length).toBe(1)
      expect(err.errors[0].message).toBe('broken')
      return
    }
    expect.fail('Expected error to be thrown but it was not')
  })
  it('throws aggregate error when a single promise fails (in array mode)', async () => {
    try {
      await _.all([
        promise.resolve(22),
        promise.resolve('hello'),
        promise.reject(new Error('broken')),
      ])
    } catch (e: any) {
      const err = e as AggregateError
      expect(err.errors.length).toBe(1)
      expect(err.errors[0].message).toBe('broken')
      return
    }
    expect.fail('Expected error to be thrown but it was not')
  })
})
