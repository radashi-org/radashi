/**
 * Queues async function calls by key to ensure sequential execution per key.
 * Calls with the same key are executed sequentially, while calls with different
 * keys can run in parallel.
 *
 * @see https://radashi.js.org/reference/async/queueByKey
 * @example
 * ```ts
 * const updateUser = async (userId: string, data: object) => {
 *   // API call that should not overlap for the same user
 *   return fetch(`/api/users/${userId}`, { method: 'POST', body: JSON.stringify(data) })
 * }
 *
 * const queuedUpdate = queueByKey(updateUser, (userId) => userId)
 *
 * // These will run sequentially for user123
 * queuedUpdate('user123', { name: 'Alice' })
 * queuedUpdate('user123', { age: 30 })
 *
 * // This runs in parallel with user123's queue
 * queuedUpdate('user456', { name: 'Bob' })
 * ```
 */
export function queueByKey<TArgs extends any[], TResult>(
  asyncFn: (...args: TArgs) => Promise<TResult>,
  keyFn: (...args: TArgs) => string | number
): (...args: TArgs) => Promise<TResult> {
  const queues = new Map<string | number, Promise<any>>()

  return async (...args: TArgs): Promise<TResult> => {
    const key = keyFn(...args)
    const next = () => asyncFn(...args)

    // Run this function once all previous calls for this key have completed.
    const queue = (queues.get(key) || Promise.resolve()).then(next, next)
    queues.set(key, queue)

    // Reduce memory usage by removing the queue if it's done.
    const cleanup = () => queues.get(key) === queue && queues.delete(key)
    queue.then(cleanup, cleanup)

    return queue
  }
}
