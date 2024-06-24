import { sleep } from './sleep'
import { tryit } from './tryit'

/**
 * Retries the given function the specified number of times.
 */
export const retry = async <TResponse>(
  options: {
    times?: number
    delay?: number | null
    backoff?: (count: number) => number
  },
  func: (exit: (err: any) => void) => Promise<TResponse>
): Promise<TResponse> => {
  const times = options?.times ?? 3
  const delay = options?.delay
  const backoff = options?.backoff ?? null
  let i = 0
  while (true) {
    const [err, result] = (await tryit(func)((err: any) => {
      throw { _exited: err }
    })) as [any, TResponse]
    if (!err) return result
    if (err._exited) throw err._exited
    if (++i === times) throw err
    if (delay) await sleep(delay)
    if (backoff) await sleep(backoff(i))
  }
}
