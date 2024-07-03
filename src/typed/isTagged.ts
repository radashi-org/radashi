/** @internal */
export function isTagged(value: unknown, tag: string): boolean {
  return Object.prototype.toString.call(value) === tag
}
