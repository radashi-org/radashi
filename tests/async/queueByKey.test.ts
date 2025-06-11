import * as _ from 'radashi'

describe('queueByKey', () => {
  test('calls with different keys run in parallel', async () => {
    const results: string[] = []
    const asyncFn = async (id: string, delay: number) => {
      await new Promise(resolve => setTimeout(resolve, delay))
      results.push(id)
      return id
    }

    const queuedFn = _.queueByKey(asyncFn, id => id)

    // Start calls with different keys at the same time
    const promises = [
      queuedFn('key1', 50),
      queuedFn('key2', 25),
      queuedFn('key3', 10),
    ]

    await Promise.all(promises)

    // Since key3 has shortest delay, it should finish first
    // key2 should finish second, key1 last
    expect(results).toEqual(['key3', 'key2', 'key1'])
  })

  test('calls with the same key run in order', async () => {
    const results: string[] = []
    const asyncFn = async (id: string, delay: number) => {
      await new Promise(resolve => setTimeout(resolve, delay))
      results.push(id)
      return id
    }

    const queuedFn = _.queueByKey(asyncFn, id => id.split('-')[0])

    // All calls use same key but different delays
    const promises = [
      queuedFn('same-1', 50),
      queuedFn('same-2', 25),
      queuedFn('same-3', 10),
    ]

    await Promise.all(promises)

    // Despite different delays, they should execute in order
    expect(results).toEqual(['same-1', 'same-2', 'same-3'])
  })

  test('results are returned to each caller properly', async () => {
    const asyncFn = async (value: number) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      return value * 2
    }

    const queuedFn = _.queueByKey(asyncFn, value => Math.floor(value / 10))

    const promises = [
      queuedFn(5), // key: 0
      queuedFn(15), // key: 1
      queuedFn(7), // key: 0
      queuedFn(18), // key: 1
    ]

    const results = await Promise.all(promises)
    expect(results).toEqual([10, 30, 14, 36])
  })

  test('errors from asyncFn are propagated correctly', async () => {
    const asyncFn = async (shouldFail: boolean, value: string) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      if (shouldFail) {
        throw new Error(`Failed: ${value}`)
      }
      return value
    }

    const queuedFn = _.queueByKey(asyncFn, (_, value) => value)

    // Test that error is propagated to the right caller
    await expect(queuedFn(true, 'test')).rejects.toThrow('Failed: test')

    // Test that queue continues after error
    const result = await queuedFn(false, 'test')
    expect(result).toBe('test')
  })

  test('queue continues after errors', async () => {
    const results: string[] = []
    const asyncFn = async (shouldFail: boolean, id: string) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      if (shouldFail) {
        throw new Error(`Failed: ${id}`)
      }
      results.push(id)
      return id
    }

    const queuedFn = _.queueByKey(asyncFn, () => 'same-key')

    // Queue multiple calls, some failing
    const promises = [
      queuedFn(false, 'success1').catch(() => 'caught1'),
      queuedFn(true, 'fail1').catch(() => 'caught2'),
      queuedFn(false, 'success2').catch(() => 'caught3'),
    ]

    const promiseResults = await Promise.all(promises)

    // Both successful calls should have executed
    expect(results).toEqual(['success1', 'success2'])
    expect(promiseResults).toEqual(['success1', 'caught2', 'success2'])
  })

  test('memory is cleaned up after queues empty', async () => {
    const asyncFn = async (value: string) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      return value
    }

    const queuedFn = _.queueByKey(asyncFn, value => value)

    // Create some queued calls
    await Promise.all([queuedFn('key1'), queuedFn('key2'), queuedFn('key1')])

    // Give a moment for cleanup
    await new Promise(resolve => setTimeout(resolve, 20))

    // We can't directly test the internal Map, but we can test that
    // new calls still work properly (indicating cleanup worked)
    const result = await queuedFn('key1')
    expect(result).toBe('key1')
  })

  test('handles complex key derivation', async () => {
    const results: Array<{ userId: string; action: string }> = []
    const asyncFn = async (userId: string, action: string) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      results.push({ userId, action })
      return `${userId}-${action}`
    }

    const queuedFn = _.queueByKey(asyncFn, userId => userId)

    // Multiple actions for same user should be sequential
    // Actions for different users should be parallel
    await Promise.all([
      queuedFn('user1', 'login'),
      queuedFn('user2', 'login'),
      queuedFn('user1', 'update'),
      queuedFn('user2', 'logout'),
      queuedFn('user1', 'logout'),
    ])

    // Check that actions for each user are in order
    const user1Actions = results
      .filter(r => r.userId === 'user1')
      .map(r => r.action)
    const user2Actions = results
      .filter(r => r.userId === 'user2')
      .map(r => r.action)

    expect(user1Actions).toEqual(['login', 'update', 'logout'])
    expect(user2Actions).toEqual(['login', 'logout'])
  })
})
