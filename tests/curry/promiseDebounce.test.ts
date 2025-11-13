import * as _ from 'radashi'

describe('promiseDebounce', () => {
  const delay = 600
  const smidge = 10

  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('resolves with the latest call result after the delay', async () => {
    const callee = vi.fn(async (value: number) => value * 2)
    const debounced = _.promiseDebounce({ delay }, callee)

    debounced(1)
    const latest = debounced(2)

    expect(callee).not.toHaveBeenCalled()

    await vi.advanceTimersByTimeAsync(delay + smidge)

    await expect(latest).resolves.toBe(4)
    expect(callee).toHaveBeenCalledTimes(1)
    expect(callee).toHaveBeenCalledWith(2)
  })

  test('flush executes the pending invocation immediately', async () => {
    const callee = vi.fn((value: string) => value.toUpperCase())
    const debounced = _.promiseDebounce({ delay }, callee)

    expect(debounced.flush).toBe(_.noop)
    const pending = debounced('radashi')
    expect(debounced.flush).not.toBe(_.noop)

    const flushed = debounced.flush()

    expect(flushed).toBe(pending)
    await expect(flushed).resolves.toBe('RADASHI')
    expect(debounced.flush).toBe(_.noop)
  })

  test('cancel prevents the pending invocation from running', () => {
    const callee = vi.fn()
    const debounced = _.promiseDebounce({ delay }, callee)

    debounced('value')
    expect(debounced.isDebounced()).toBe(true)

    debounced.cancel()
    expect(debounced.isDebounced()).toBe(false)

    vi.advanceTimersByTime(delay + smidge)
    expect(callee).not.toHaveBeenCalled()
  })

  test('leading option resolves immediately on the first call', async () => {
    const callee = vi.fn((value: number) => value)
    const debounced = _.promiseDebounce({ delay, leading: true }, callee)

    await expect(debounced(1)).resolves.toBe(1)
    expect(callee).toHaveBeenCalledTimes(1)

    const trailing = debounced(2)
    expect(callee).toHaveBeenCalledTimes(1)

    await vi.advanceTimersByTimeAsync(delay + smidge)
    await expect(trailing).resolves.toBe(2)
    expect(callee).toHaveBeenCalledTimes(2)
  })

  test('exposes the original callee and noop flush when idle', () => {
    const callee = vi.fn()
    const debounced = _.promiseDebounce({ delay }, callee)

    expect(debounced.callee).toBe(callee)
    expect(debounced.flush).toBe(_.noop)
    expect(debounced.flush()).toBeUndefined()
  })
})
