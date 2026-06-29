export async function waterfall<T>(
  funcs: Array<(input: T) => Promise<T>>,
  initialInput?: T,
) : Promise<T> {
  return funcs.reduce(
    async (acc, fn) => fn(await acc),
    Promise.resolve(initialInput as T)
  )
};
