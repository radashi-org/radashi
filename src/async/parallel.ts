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
  readonly reason: any
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

  let signal: AbortSignal | undefined
  if (isNumber(options)) {
    options = {
      limit: options,
    }
  } else {
    signal = options.signal
    signal?.throwIfAborted()
  }

  // Process array items
  const processor = async (resolve: (value: WorkItemResult<K>[]) => void) => {
    const results: WorkItemResult<K>[] = []
    while (!signal?.aborted) {
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
    return resolve(results)
  }

  const queues = Promise.all(
    list(1, options.limit).map(() => new Promise(processor)),
  )

  let signalPromise: Promise<never> | undefined
  if (signal) {
    signalPromise = new Promise((_, reject) => {
      const onAbort = () => reject(signal.reason)
      signal.addEventListener('abort', onAbort)
      queues.then(() => signal.removeEventListener('abort', onAbort))
    })
  }

  // Wait for all queues to complete
  const itemResults = await (signalPromise
    ? Promise.race([queues, signalPromise])
    : queues)

  const [errors, results] = fork(
    sort(flat(itemResults), r => r.index),
    x => !!x.error,
  )
  if (errors.length > 0) {
    throw new AggregateError(errors.map(error => error.error))
  }
  return results.map(r => r.result)
}
