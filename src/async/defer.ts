import { tryit } from './tryit'

/**
 * Useful when for script like things where cleanup should be done on
 * fail or sucess no matter.
 *
 * You can call defer many times to register many defered functions
 * that will all be called when the function exits in any state.
 */
export const defer = async <TResponse>(
  func: (
    register: (
      fn: (error?: any) => any,
      options?: { rethrow?: boolean }
    ) => void
  ) => Promise<TResponse>
): Promise<TResponse> => {
  const callbacks: {
    fn: (error?: any) => any
    rethrow: boolean
  }[] = []
  const register = (
    fn: (error?: any) => any,
    options?: { rethrow?: boolean }
  ) =>
    callbacks.push({
      fn,
      rethrow: options?.rethrow ?? false
    })
  const [err, response] = await tryit(func)(register)
  for (const { fn, rethrow } of callbacks) {
    const [rethrown] = await tryit(fn)(err)
    if (rethrown && rethrow) throw rethrown
  }
  if (err) throw err
  return response
}
