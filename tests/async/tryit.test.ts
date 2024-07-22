import * as _ from 'radashi'

describe('tryit', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('returns error when error is thrown', async () => {
    const fn = _.try(async () => {
      throw new Error('not good enough')
    })
    const [err, result] = await fn()
    expect(result).toBeUndefined()
    expect(err).not.toBeNull()
    expect(err!.message).toBe('not good enough')
  })
  test('returns error when error is thrown, handled as return object', async () => {
    const fn = _.try(async () => {
      throw new Error('not good enough')
    })
    const either = await fn()
    expect(_.isLeft(either)).toBeTruthy()
    expect(_.isRight(either)).toBeFalsy()
    expect(_.left(either)).not.toBeNull()
    expect(_.left(either)).not.toBeUndefined()
    expect(_.right(either)).toBeUndefined()
    expect(_.left(either).message).toBe('not good enough')
  })
  test('Error in async function returns promise of Left', async () => {
    const fn = _.try(async () => {
      throw new Error('not good enough')
    })
    const either = fn()
    expect(_.isPromise(either)).toBeTruthy()
    expect(_.isLeft(await either)).toBeTruthy()
    expect(_.isRight(await either)).toBeFalsy()
  })
  test('Tryit converts non-Error into Error', async () => {
    const either = _.try(() => {
      throw 'not good enough'
    })()
    expect(_.isEither(either)).toBe(true)
    expect(_.isLeft(either)).toBe(true)
    expect(_.isRight(either)).toBe(false)
    expect(either[0]).toBeInstanceOf(Error)
  })
  test('Tryit comverts non-Error into Error async', async () => {
    const either = _.try(async () => {
      throw 'not good enough'
    })()
    expect(_.isPromise(either)).toBe(true)
    expect(_.isLeft(await either)).toBe(true)
    expect((await either)[0]).toBeInstanceOf(Error)
  })
  test('returns result when no error is thrown', async () => {
    const [err, result] = await _.try(async () => {
      return 'hello'
    })()
    expect(err).toBeUndefined()
    expect(result).not.toBeNull()
    expect(result).toBe('hello')
  })
  test('returns Right Either when no error is thrown', async () => {
    const either = _.try(() => {
      return 'hello'
    })()
    expect(_.isEither(either)).toBe(true)
    expect(_.isRight(either)).toBe(true)
    expect(_.right(either)).toBe('hello')
  })

  test('Must pass Error object to createLeft', async () => {
    //@ts-expect-error
    const either = _.createLeft('fault')
  })

  test('createLeft creates a Left Either', async () => {
    const either = _.createLeft(new Error('fault'))
    expect(_.isEither(either)).toBe(true)
    expect(_.isLeft(either)).toBe(true)
    expect(_.isRight(either)).toBe(false)
    expect(_.left(either)).toBeInstanceOf(Error)
    expect(_.left(either).message).toBe('fault')
  })

  test('createRight creates a Right Either', async () => {
    const either = _.createRight('success')
    expect(_.isEither(either)).toBe(true)
    expect(_.isRight(either)).toBe(true)
    expect(_.isLeft(either)).toBe(false)
    expect(_.right(either)).toBe('success')
  })

  test('handles non-async function results', async () => {
    const [err, result] = _.try(() => {
      return 'hello'
    })()
    expect(err).toBeUndefined()
    expect(result).not.toBeNull()
    expect(result).toBe('hello')
  })
  test('handles non-async function errors', async () => {
    const [err, result] = _.try(() => {
      // biome-ignore lint/correctness/noConstantCondition:
      if (1 < 0) {
        return ''
      }
      throw new Error('unknown')
    })()
    expect(result).toBeUndefined()
    expect(err).not.toBeNull()
    expect(err!.message).toBe('unknown')
  })
  test('alias exists', () => {
    expect(_.tryit).not.toBeNull()
  })
})
