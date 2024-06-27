import { isFunction } from 'radashi'

/**
 * This is really a _best guess_ promise checking. You should probably
 * use Promise.resolve(value) to be 100% sure you're handling it
 * correctly.
 */
export function isPromise(value: any): value is Promise<any> {
  return !!value && isFunction(value.then)
}
