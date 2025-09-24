import { type Result, sleep, tryit } from 'radashi'

type AbortSignal = {
  throwIfAborted(): void
}

export type RetryOptions = {
  times?: number
  delay?: number | null
  backoff?: (count: number) => number
  signal?: AbortSignal
}

/**
 * Retries the given function the specified number of times.
 *
 * @see https://radashi.js.org/reference/async/retry
 * @example
 * ```ts
 * const abortController = new AbortController();
 * const result = await retry({ times: 3, delay: 1000, signal: abortController.signal }, async () => {
 *   return await fetch('https://example.com')
 * })
 * // To abort the operation:
 * // abortController.abort()
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
  const signal = options?.signal

  let i = 0
  while (true) {
    const result = (await tryit(func)((err: any) => {
      throw { _exited: err }
    })) as Result<TResponse, { _exited: any }>
    signal?.throwIfAborted()
    if (result.ok) {
      return result.value
    }
    if (result.error._exited) {
      throw result.error._exited
    }
    if (++i >= times) {
      throw result.error
    }
    if (delay) {
      await sleep(delay)
    }
    if (backoff) {
      await sleep(backoff(i))
    }
  }
}
