import { AggregateError } from 'radashi'

describe('AggregateError error', () => {
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
  test('does not fail if no errors given', () => {
    new AggregateError([])
    new AggregateError(undefined as unknown as Error[])
  })
})
