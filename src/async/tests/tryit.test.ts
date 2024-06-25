import * as _ from 'radashi'

describe('_.try function', () => {
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
  test('returns result when no error is thrown', async () => {
    const [err, result] = await _.try(async () => {
      return 'hello'
    })()
    expect(err).toBeUndefined()
    expect(result).not.toBeNull()
    expect(result).toBe('hello')
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
      if (1 < 0) return ''
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
