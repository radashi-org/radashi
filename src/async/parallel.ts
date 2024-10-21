import {
  AggregateError,
  flat,
  fork,
  isNumber,
  list,
  sort,
  tryit,
} from 'radashi'

type AbortSignal = {
  readonly aborted: boolean
  addEventListener(type: 'abort', listener: () => void): void
  removeEventListener(type: 'abort', listener: () => void): void
  throwIfAborted(): void
}
type WorkItemResult<K> = {
  index: number
  result: K
  error: any
}
export type ParallelOptions =
  | {
      limit: number
      signal?: AbortSignal
    }
  | number

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
 * const images = await parallel(
 * {
 *  limit: 2,
 *  signal: abortController.signal,
 * },
 *  imageFiles,
 *  async file => {
 *   return await resizeImage(file)
 * })
 *
 * // To abort the operation:
 * // abortController.abort()
 * ```
 * @version 12.1.0
 */
export async function parallel<T, K>(
  options: ParallelOptions,
  array: readonly T[],
  func: (item: T) => Promise<K>,
): Promise<K[]> {
  const work = array.map((item, index) => ({
    index,
    item,
  }))

  if (isNumber(options)) {
    options = {
      limit: options,
    }
  }

  options.signal?.throwIfAborted()

  // Process array items
  const processor = async (
    resolve: (value: WorkItemResult<K>[]) => void,
    reject: (error: any) => void,
  ) => {
    const results: WorkItemResult<K>[] = []
    const abortListener = () => reject(new Error('This operation was aborted'))
    options.signal?.addEventListener('abort', abortListener)
    while (true) {
      const next = work.pop()
      if (!next) {
        break
      }
      const [error, result] = await tryit(func)(next.item)
      results.push({
        error,
        result: result as K,
        index: next.index,
      })
    }
    options.signal?.removeEventListener('abort', abortListener)
    return resolve(results)
  }
  const queues = list(1, options.limit).map(() => new Promise(processor))
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
