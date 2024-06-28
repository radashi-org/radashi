export function flip<Arg1, Arg2, Result>(
  fn: (arg1: Arg1, arg2: Arg2) => Result,
): (arg2: Arg2, arg1: Arg1) => Result {
  return (arg2, arg1) => fn(arg1, arg2)
}
