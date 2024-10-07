import { AggregateError, flat, fork, list, sort, tryit } from 'radashi'

type WorkItemResult<K> = {
  index: number
  result: K
  error: any
}
/**
 * Executes many async functions in parallel. Returns the results from
 * all functions as an array. After all functions have resolved, if
 * any errors were thrown, they are rethrown in an instance of
 * AggregateError. The operation can be aborted by passing optional AbortSignal,
 * which will throw an Error if aborted.
 *
 * @see https://radashi.js.org/reference/async/parallel
 * @example
 * ```ts
 * // Process images concurrently, resizing each image to a standard size.
 * const abortController = new AbortController();
 * const images = await parallel(2, imageFiles, async (file) => {
 *   return await resizeImage(file)
 * }, abortController)
 *
 * // To abort the operation:
 * // abortController.abort()
 * ```
 * @version 12.1.0
 */
export async function parallel<T, K>(
  limit: number,
  array: readonly T[],
  func: (item: T) => Promise<K>,
  signal?: AbortSignal,
): Promise<K[]> {
  const work = array.map((item, index) => ({
    index,
    item,
  }))
  // Process array items
  const processor = async (
    res: (value: WorkItemResult<K>[]) => void,
    rej: (error: any) => void,
  ) => {
    const results: WorkItemResult<K>[] = []
    signal?.addEventListener(
      'abort',
      () => rej(new Error('Operation aborted')),
      {
        once: true,
      },
    )
    while (true) {
      const next = work.pop()
      if (!next) {
        return res(results)
      }
      const [error, result] = await tryit(func)(next.item)
      results.push({
        error,
        result: result as K,
        index: next.index,
      })
    }
  }
  // Create queues
  const queues = list(1, limit).map(() => new Promise(processor))
  // Wait for all queues to complete
  const itemResults = (await Promise.all(queues)) as WorkItemResult<K>[][]
  const [errors, results] = fork(
    sort(flat(itemResults), r => r.index),
    x => !!x.error,
  )
  if (errors.length > 0) {
    throw new AggregateError(errors.map(error => error.error))
  }
  return results.map(r => r.result)
}
