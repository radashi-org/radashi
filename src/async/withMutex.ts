import { withSemaphore, type SemaphorePermit } from "radashi";

type AnyFn<T = unknown> = (permit: SemaphorePermit) => Promise<T>

export interface Mutex {
  isLocked(): boolean;
  acquire(): Promise<SemaphorePermit>;
  release(): void;
}

/**
 * Creates a mutex-protected instance with supplied function that limits concurrent execution to a single active use.
 *
 * @see https://radashi.js.org/reference/async/withSemaphore
 * @example
 * ```ts
 * const limitedFn = withMutex()
 * limitedFn(() => ...)
 * ```
 */
export function withMutex(): ExclusiveFn;

/**
 * Creates a mutex-protected instance with supplied function that limits concurrent execution to a single active use.
 * Supports direct invocation and dynamic function passing.
 *
 * @see https://radashi.js.org/reference/async/withMutex
 * @example
 * ```ts
 * const limitedFn = withMutex(() => ...)
 * limitedFn()
 * limitedFn(() => ...)
 * ```
 */
export function withMutex<T>(fn: AnyFn<T>): PrebuiltExclusiveFn<T>;
export function withMutex(baseFn?: AnyFn): PrebuiltExclusiveFn<unknown> {
  // @ts-expect-error because baseFn is not optional
  const semaphore = withSemaphore({ capacity: 1 }, baseFn);

  async function runExclusive(innerFn?: AnyFn): Promise<unknown> {
    // @ts-expect-error because innerFn is not optional
    return semaphore({ weight: 1 }, innerFn);
  }

  runExclusive.isLocked = () => semaphore.getRunning() > 0;
  runExclusive.acquire = () => semaphore.acquire(1);
  runExclusive.release = () => semaphore.release(1);

  return runExclusive
}

interface ExclusiveFn extends Mutex {
  <T>(fn: AnyFn<T>): Promise<T>;
}

interface PrebuiltExclusiveFn<T> extends ExclusiveFn {
  (): Promise<T>;
}
