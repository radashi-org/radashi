/**
 * Executes a sequence of asynchronous functions in order, where the output
 * of each function becomes the input to the next, and returns the final result.
 *
 * Execution:
 * initialInput → fn1() → fn2() → fn3() → ... → final result
 */
export async function waterfall<T>(
  funcs: Array<(input: T) => Promise<T>>,
  initialInput?: T,
): Promise<T> {
  return funcs.reduce<Promise<T>>(
    async (acc, fn) => fn(await acc),
    Promise.resolve(initialInput as T),
  );
}
