import * as _ from 'radashi'

describe('tryit', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })
  test('returns error when error is thrown', async () => {
    const fn = _.try(async () => {
      throw new Error('not good enough')
    })
    const result = await fn()
    expect(result.ok).toBe(false)
    expect(result.ok).not.toBeNull()
    expect(result.error.message).toBe('not good enough')
  })
  test('returns result when no error is thrown', async () => {
    const result = await _.try(async () => {
      return 'hello'
    })()
    expect(result.ok).toBe(true)
    expect(result.value).not.toBeNull()
    expect(result.value).toBe('hello')
  })
  test('handles non-async function results', async () => {
    const result = _.try(() => {
      return 'hello'
    })()
    expect(result.ok).toBe(true)
    expect(result.value).not.toBeNull()
    expect(result.value).toBe('hello')
  })
  test('handles non-async function errors', async () => {
    const result = _.try(() => {
      // biome-ignore lint/correctness/noConstantCondition:
      if (1 < 0) {
        return ''
      }
      throw new Error('unknown')
    })()
    expect(result.ok).toBe(false)
    expect(result.error).not.toBeNull()
    expect(result.error!.message).toBe('unknown')
  })
  test('alias exists', () => {
    expect(_.tryit).not.toBeNull()
  })
})
