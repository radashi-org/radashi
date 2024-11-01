import { sleep, tryit } from 'radashi'

export type RetryOptions = {
  times?: number
  delay?: number | null
  onRetry?: (err: Error, attemptNumber: number) => void
  backoff?: (count: number) => number
}

/**
 * Retries the given function the specified number of times.
 *
 * @param {Object} options - The employee who is responsible for the project.
 * @param {number} [options.times=3] - Number of attempts.
 * @param {number} [options.delay] - Specify milliseconds to sleep between attempts.
 * @param {Function} [options.onRetry=null] - Is invoked after a new retry is performed. It's passed the Error that triggered it as a parameter and the attempt number.
 * @param {Function} [options.backoff=null] - The backoff option is like delay but uses a function to sleep -- makes for easy exponential backoff.
 * @param {Function} func - Function to be executed
 *
 * @see https://radashi.js.org/reference/async/retry
 * @example
 * ```ts
 * const result = await retry({ times: 3, delay: 1000, onRetry: (err, i) => console.log(`Trying again... Attempt: ${i}`) } }, async () => {
 *   return await fetch('https://example.com')
 * })
 * ```
 * @version 12.1.0
 */
export async function retry<TResponse>(
  options: RetryOptions,
  func: (exit: (err: any) => void) => Promise<TResponse>,
): Promise<TResponse> {
  const times = options?.times ?? 3
  const delay = options?.delay
  const backoff = options?.backoff ?? null
  const onRetry = options?.onRetry ?? null
  let i = 0
  while (true) {
    const [err, result] = (await tryit(func)((err: any) => {
      throw { _exited: err }
    })) as [any, TResponse]
    if (!err) {
      return result
    }
    if (err._exited) {
      throw err._exited
    }
    if (++i >= times) {
      throw err
    }
    if (onRetry) {
      onRetry(err, i)
    }
    if (delay) {
      await sleep(delay)
    }
    if (backoff) {
      await sleep(backoff(i))
    }
  }
}
