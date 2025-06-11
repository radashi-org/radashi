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
  keyFn: (...args: TArgs) => string | number,
): (...args: TArgs) => Promise<TResult> {
  const queues = new Map<string | number, Promise<any>>()

  return async (...args: TArgs): Promise<TResult> => {
    const key = keyFn(...args)

    // Get the current promise chain for this key, or create a new one
    const currentQueue = queues.get(key) || Promise.resolve()

    // Create a new promise that waits for the current queue to finish
    const newQueue = currentQueue
      .then(() => asyncFn(...args))
      .catch(() => asyncFn(...args)) // Continue queue even if previous call failed

    // Update the queue for this key
    queues.set(key, newQueue)

    // Clean up the queue when this call completes
    const cleanup = () => {
      // Only delete if this is still the current queue
      if (queues.get(key) === newQueue) {
        queues.delete(key)
      }
    }

    // Return the result with cleanup
    return newQueue.then(
      result => {
        cleanup()
        return result
      },
      error => {
        cleanup()
        throw error
      },
    )
  }
}
