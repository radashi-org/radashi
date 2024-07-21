import * as _ from 'radashi'
import type { DebounceFunction } from 'radashi'

describe('debounce', () => {
  let func: DebounceFunction<any>
  const mockFunc = vi.fn()
  const runFunc3Times = () => {
    func()
    func()
    func()
  }
  const delay = 600

  beforeEach(() => {
    vi.useFakeTimers()
    func = _.debounce({ delay }, mockFunc)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('only executes once when called rapidly', async () => {
    runFunc3Times()
    expect(mockFunc).toHaveBeenCalledTimes(0)
    vi.advanceTimersByTime(delay + 10)
    expect(mockFunc).toHaveBeenCalledTimes(1)
  })

  test('does not debounce after cancel is called', () => {
    runFunc3Times()
    expect(mockFunc).toHaveBeenCalledTimes(0)
    func.cancel()
    runFunc3Times()
    expect(mockFunc).toHaveBeenCalledTimes(3)
    runFunc3Times()
    expect(mockFunc).toHaveBeenCalledTimes(6)
  })

  test('executes the function immediately when the flush method is called', () => {
    func.flush()
    expect(mockFunc).toHaveBeenCalledTimes(1)
  })

  test('continues to debounce after flush is called', async () => {
    runFunc3Times()
    expect(mockFunc).toHaveBeenCalledTimes(0)
    func.flush()
    expect(mockFunc).toHaveBeenCalledTimes(1)
    func()
    expect(mockFunc).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(delay + 10)
    expect(mockFunc).toHaveBeenCalledTimes(2)
    func.flush()
    expect(mockFunc).toHaveBeenCalledTimes(3)
  })

  test('cancels all pending invocations when the cancel method is called', async () => {
    const results: boolean[] = []
    func()
    results.push(func.isPending())
    results.push(func.isPending())
    vi.advanceTimersByTime(delay + 10)
    results.push(func.isPending())
    func()
    results.push(func.isPending())
    vi.advanceTimersByTime(delay + 10)
    results.push(func.isPending())
    assert.deepEqual(results, [true, true, false, true, false])
  })

  test('returns if there is any pending invocation when the pending method is called', async () => {
    func()
    func.cancel()
    vi.advanceTimersByTime(delay + 10)
    expect(mockFunc).toHaveBeenCalledTimes(0)
  })

  test('executes the function immediately on the first invocation of the debounce function when set `leading` to true', async () => {
    func = _.debounce({ delay: delay, leading: true }, mockFunc)
    runFunc3Times()
    expect(mockFunc).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(delay + 10)
    expect(mockFunc).toHaveBeenCalledTimes(2)
  })
})
