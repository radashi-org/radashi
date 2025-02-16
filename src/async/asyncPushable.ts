const doneSymbol = Symbol('done')

type Promisable<T> = T | Promise<T>

/**
 * Creates an async iterable whose results are determined through method calling.
 *
 * @see https://radashi.js.org/reference/async/asyncPushable
 * @example
 * ```ts
 * const stream = new AsyncPushable<number>()
 *
 * setTimeout(() => stream.push(1), 100)
 * setTimeout(() => stream.push(2), 200)
 * setTimeout(() => stream.push(3), 300)
 * setTimeout(() => stream.done(), 400)
 *
 * for await (const value of stream) {
 *   console.log(value)
 * }
 * // logs "1" 100ms later
 * // logs "2" 100ms later
 * // logs "3" 100ms later
 *
 * // You can also throw an error, which gets rethrown by the async iterable.
 * stream.throw(new Error('BOOM!'))
 * ```
 */
export class AsyncPushable<T> implements AsyncIterable<T> {
  private buffer: (T | typeof doneSymbol)[] = []
  private error: any = undefined
  private promise: Promise<void>
  private resolve!: (value: Promisable<void>) => void

  constructor() {
    this.promise = new Promise(resolve => (this.resolve = resolve))
  }

  push(value: T): void {
    this.buffer.push(value)
    this.resolve()
  }

  throw(error: Error): void {
    this.error = error
    this.resolve()
  }

  done(): void {
    this.buffer.push(doneSymbol)
    this.resolve()
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<T, void, unknown> {
    while (true) {
      await this.promise
      for (const value of this.buffer) {
        if (value === doneSymbol) {
          return
        }
        yield value
      }
      if (this.error) {
        throw this.error
      }
      this.promise = new Promise(resolve => (this.resolve = resolve))
      this.buffer.length = 0
    }
  }
}
