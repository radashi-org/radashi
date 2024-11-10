import { vi } from 'vitest'

declare const globalThis: {
  AggregateError?: unknown
}

const { AggregateError: nativeAggregateError } = globalThis
globalThis.AggregateError = undefined!

const { AggregateError } = await import('radashi')

describe('AggregateError', () => {
  const fakeWork = (name?: string) => {
    const fakeJob = () => {
      const fakeTask = () => {
        const fakeMicrotask = () => {
          const err = new Error()
          err.name = name ?? 'MicrotaskError'
          throw err
        }
        return fakeMicrotask()
      }
      return fakeTask()
    }
    return fakeJob()
  }

  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  test('expect AggregateError polyfill in test environment', () => {
    expect(
      AggregateError.toString().startsWith(
        'class AggregateError extends Error',
      ),
    ).toBe(true)
  })

  test('uses stack from the first given error', () => {
    const errors: Error[] = []
    try {
      fakeWork()
    } catch (e) {
      errors.push(e as Error)
    }
    const aggregate = new AggregateError(errors)
    expect(aggregate.stack).toContain('at fakeMicrotask')
    expect(aggregate.message).toContain('with 1')
  })

  test('uses stack from first error with a stack', () => {
    const errors: Error[] = [{} as Error]
    try {
      fakeWork()
    } catch (e) {
      errors.push(e as Error)
    }
    const aggregate = new AggregateError(errors)
    expect(aggregate.name).toBe('AggregateError(MicrotaskError...)')
    expect(aggregate.stack).toContain('at fakeMicrotask')
    expect(aggregate.message).toContain('with 2')
  })

  test('does not throw on empty errors array', () => {
    expect(() => new AggregateError([])).not.toThrow()
  })

  // NOTE: This diverges from native AggregateError behavior.
  test('does not throw on undefined', () => {
    expect(
      () => new AggregateError(undefined as unknown as Error[]),
    ).not.toThrow()
  })
})

describe('AggregateError (native)', () => {
  beforeEach(() => {
    globalThis.AggregateError = nativeAggregateError
    vi.resetModules()
  })

  test('expect AggregateError polyfill when globalThis.AggregateError is undefined', async () => {
    globalThis.AggregateError = undefined!
    const { AggregateError } = await import('radashi')
    expect(
      AggregateError.toString().startsWith(
        'class AggregateError extends Error',
      ),
    ).toBe(true)
  })

  test('expect globalThis.AggregateError when defined', async () => {
    if (typeof globalThis.AggregateError === 'undefined') {
      expect.fail('AggregateError is not defined')
    }
    const { AggregateError } = await import('radashi')
    expect(AggregateError).toBe(globalThis.AggregateError)
  })
})
