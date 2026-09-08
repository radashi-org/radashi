import * as _ from 'radashi'

describe('queue', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  test('executes tasks in FIFO order respecting concurrency', async () => {
    const results: string[] = []
    const worker = async (task: string) => {
      await _.sleep(5)
      results.push(task)
    }
    const q = _.queue(worker, 2)
    q.push('a')
    q.push('b')
    q.push('c')
    await q.drain()
    expect(results).toEqual(['a', 'b', 'c'])
  })

  test('limits concurrent execution to concurrency', async () => {
    let running = 0
    let maxRunning = 0
    const worker = async (task: number) => {
      running++
      maxRunning = Math.max(maxRunning, running)
      await _.sleep(100)
      running--
    }
    const q = _.queue(worker, 2)
    q.push([1, 2, 3, 4])
    await q.drain()
    expect(maxRunning).toBeLessThanOrEqual(2)
    expect(maxRunning).toBe(2)
  })

  test('processes batch push in order', async () => {
    const results: number[] = []
    const worker = async (task: number) => {
      await _.sleep(10)
      results.push(task)
    }
    const q = _.queue(worker, 1)
    q.push([1, 2, 3])
    await q.drain()
    expect(results).toEqual([1, 2, 3])
  })

  test('unshift adds tasks to front of pending queue', async () => {
    const results: string[] = []
    const worker = async (task: string) => {
      await _.sleep(10)
      results.push(task)
    }
    const q = _.queue(worker, 1)
    q.push('b')
    q.push('c')
    q.unshift('a')
    await q.drain()
    expect(results).toEqual(['b', 'a', 'c'])
  })

  test('unshift with batch preserves relative order', async () => {
    const results: string[] = []
    const worker = async (task: string) => {
      await _.sleep(10)
      results.push(task)
    }
    const q = _.queue(worker, 1)
    q.push('c')
    q.unshift(['a', 'b'])
    await q.drain()
    expect(results).toEqual(['c', 'a', 'b'])
  })

  test('drain callback fires when queue becomes idle', async () => {
    const spy = vi.fn()
    const worker = async (task: string) => {
      await _.sleep(10)
    }
    const q = _.queue(worker, 2)
    q.drain(spy)
    q.push('a')
    q.push('b')
    await vi.advanceTimersToNextTimerAsync()
    expect(spy).toHaveBeenCalledTimes(1)
  })

  test('await q.drain() resolves after all tasks complete', async () => {
    const results: string[] = []
    const worker = async (task: string) => {
      await _.sleep(10)
      results.push(task)
    }
    const q = _.queue(worker, 2)
    q.push('a')
    q.push('b')
    await q.drain()
    expect(results).toEqual(['a', 'b'])
  })

  test('queue is reusable after drain', async () => {
    const results: number[] = []
    const worker = async (task: number) => {
      await _.sleep(10)
      results.push(task)
    }
    const q = _.queue(worker, 2)
    q.push([1, 2])
    await q.drain()
    expect(results).toEqual([1, 2])
    q.push([3, 4])
    await q.drain()
    expect(results).toEqual([1, 2, 3, 4])
  })

  test('error callback receives errors from worker', async () => {
    const errorSpy = vi.fn()
    const worker = async (task: string) => {
      if (task === 'fail') {
        throw new Error('oops')
      }
      await _.sleep(10)
    }
    const q = _.queue(worker, 1)
    q.error(errorSpy)
    q.push('ok')
    q.push('fail')
    q.push('ok2')
    await q.drain()
    expect(errorSpy).toHaveBeenCalledTimes(1)
    expect(errorSpy).toHaveBeenCalledWith(expect.any(Error), 'fail')
  })

  test('per-task callback receives error or result', async () => {
    const okSpy = vi.fn()
    const failSpy = vi.fn()
    const worker = async (task: string) => {
      if (task === 'fail') {
        throw new Error('oops')
      }
      await _.sleep(10)
      return task.toUpperCase()
    }
    const q = _.queue(worker, 1)
    q.push('ok', okSpy)
    q.push('fail', failSpy)
    await q.drain()
    expect(okSpy).toHaveBeenCalledWith(undefined, 'OK')
    expect(failSpy).toHaveBeenCalledWith(expect.any(Error), undefined)
  })

  test('queue continues processing after a task error', async () => {
    const results: string[] = []
    const worker = async (task: string) => {
      await _.sleep(10)
      if (task === 'fail') {
        throw new Error('oops')
      }
      results.push(task)
    }
    const q = _.queue(worker, 2)
    q.push(['ok1', 'fail', 'ok2'])
    await q.drain()
    expect(results).toEqual(['ok1', 'ok2'])
  })

  test('push with empty array does nothing', () => {
    const worker = vi.fn()
    const q = _.queue(worker, 2)
    q.push([])
    expect(worker).not.toHaveBeenCalled()
  })

  test('unshift with empty array does nothing', () => {
    const worker = vi.fn()
    const q = _.queue(worker, 2)
    q.unshift([])
    expect(worker).not.toHaveBeenCalled()
  })

  test('unshift with callback', async () => {
    const cb = vi.fn()
    const worker = async (task: string) => task.toUpperCase()
    const q = _.queue(worker, 2)
    q.push('b')
    q.unshift('a', cb)
    await q.drain()
    expect(cb).toHaveBeenCalledWith(undefined, 'A')
  })
})
