type Falsy = null | undefined | false | '' | 0 | 0n

/**
 * Given a list returns a new list with only truthy values
 */
export const sift = <T>(list: readonly (T | Falsy)[]): T[] => {
  return (list?.filter(x => !!x) as T[]) ?? []
}
