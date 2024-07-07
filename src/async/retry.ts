import { sleep, tryit } from 'radashi'

export type RetryOptions = {
  times?: number
  delay?: number | null
  backoff?: (count: number) => number
}

/**
 * Retries the given function the specified number of times.
 */
export async function retry<TResponse>(
  options: RetryOptions,
  func: (exit: (err: any) => void) => Promise<TResponse>,
): Promise<TResponse> {
  const times = options?.times ?? 3
  const delay = options?.delay
  const backoff = options?.backoff ?? null
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
    if (delay) {
      await sleep(delay)
    }
    if (backoff) {
      await sleep(backoff(i))
    }
  }
}
