
describe("async-queue", () => {  
  beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
  });

  test('executes tasks in FIFO order respecting concurrency', async () => {
  })

  test('limits concurrent execution to concurrency', async () => {
  })

  test('processes batch push in order', async () => {
  })

  test('unshift adds tasks to front of queue', async () => {
  })

  test('unshift with batch preserves relative order', async () => {
  })

  test('drain callback fires when queue becomes idle', async () => {
  })

  test('await q.drain() resolves after all tasks complete', async () => {
  })

  test('queue is reusable after drain', async () => {
  })

  test('error callback receives errors from worker', async () => {
  })

  test('per-task callback receives error or result', async () => {
  })

  test('queue continues processing after a task error', async () => {
  })

})