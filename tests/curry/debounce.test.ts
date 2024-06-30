import * as _ from 'radashi'
import { DebounceFunction } from 'radashi'

describe('debounce function', () => {
  let func: DebounceFunction<any>
  const mockFunc = vi.fn()
  const runFunc3Times = () => {
    func()
    func()
    func()
  }

  beforeEach(() => {
    func = _.debounce({ delay: 600 }, mockFunc)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  test('only executes once when called rapidly', async () => {
    runFunc3Times()
    expect(mockFunc).toHaveBeenCalledTimes(0)
    await _.sleep(610)
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
    await _.sleep(610)
    expect(mockFunc).toHaveBeenCalledTimes(2)
    func.flush()
    expect(mockFunc).toHaveBeenCalledTimes(3)
  })

  test('cancels all pending invocations when the cancel method is called', async () => {
    const results: boolean[] = []
    func()
    results.push(func.isPending())
    results.push(func.isPending())
    await _.sleep(610)
    results.push(func.isPending())
    func()
    results.push(func.isPending())
    await _.sleep(610)
    results.push(func.isPending())
    assert.deepEqual(results, [true, true, false, true, false])
  })

  test('returns if there is any pending invocation when the pending method is called', async () => {
    func()
    func.cancel()
    await _.sleep(610)
    expect(mockFunc).toHaveBeenCalledTimes(0)
  })
})
