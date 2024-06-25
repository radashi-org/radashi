import { isFunction } from 'radashi'

/**
 * This is really a _best guess_ promise checking. You should probably
 * use Promise.resolve(value) to be 100% sure you're handling it
 * correctly.
 */
export const isPromise = (value: any): value is Promise<any> => {
  if (!value) return false
  if (!value.then) return false
  if (!isFunction(value.then)) return false
  return true
}
