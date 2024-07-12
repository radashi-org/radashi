/**
 * Compare the given tag to the result of `Object.prototype.toString`.
 *
 * ⚠️ You probably won't use this except when implementing another type guard.
 *
 * @internal
 * @example
 * ```ts
 * isTagged('foo', '[object String]') // true
 * ```
 */
export function isTagged(value: unknown, tag: string): boolean {
  return Object.prototype.toString.call(value) === tag
}
