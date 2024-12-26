import { once } from "radashi";

type AnyFn<T = unknown> = (permit: SemaphorePermit) => Promise<T>

export interface SemaphorePermit {
  weight: number;
  /** Currently locked weight, including this permit */
  running: number;
  isAcquired: boolean;
  release: () => void;
}

export interface WithSemaphoreOptions {
  capacity: number;
}

export interface Semaphore {
  getRunning(): number;
  acquire(weight?: number): Promise<SemaphorePermit>;
  release(weight?: number): void;
}

/**
 * Creates a semaphore-protected async function that limits concurrent execution to a specified number of active uses.
 *
 * @see https://radashi.js.org/reference/async/withSemaphore
 * @example
 * ```ts
 * const limitedFn = withSemaphore(2)
 * limitedFn(() => ...)
 * ```
 */
export function withSemaphore(capacity: number): ExclusiveFn;

/**
 * Creates a semaphore-protected async function that limits concurrent execution to a specified number of active uses.
 *
 * @see https://radashi.js.org/reference/async/withSemaphore
 * @example
 * ```ts
 * const limitedFn = withSemaphore({ capacity: 2 })
 * limitedFn(() => ...)
 * ```
 */
export function withSemaphore(options: WithSemaphoreOptions): ExclusiveFn;

/**
 * Creates a semaphore-protected async function that limits concurrent execution to a specified number of active uses.
 *
 * @see https://radashi.js.org/reference/async/withSemaphore
 * @example
 * ```ts
 * const limitedFn = withSemaphore(2, () => ...)
 * limitedFn()
 * limitedFn(() => ...)
 * ```
 */
export function withSemaphore<T>(capacity: number, fn: AnyFn<T>): PrebuiltExclusiveFn<T>;

/**
 * Creates a semaphore-protected async function that limits concurrent execution to a specified number of active uses.
 *
 * @see https://radashi.js.org/reference/async/withSemaphore
 * @example
 * ```ts
 * const limitedFn = withSemaphore({ capacity: 2 }, () => ...)
 * limitedFn()
 * limitedFn(() => ...)
 * ```
 */
export function withSemaphore<T>(options: WithSemaphoreOptions, fn: AnyFn<T>): PrebuiltExclusiveFn<T>;
export function withSemaphore(optionsOrCapacity: number | WithSemaphoreOptions, baseFn?: AnyFn): PrebuiltExclusiveFn<unknown> {
  const options = useOptions(optionsOrCapacity);
  if (options.capacity < 1) throw new Error(`invalid capacity ${options.capacity}: must be positive`);

  const queue: QueuedTask[] = [];
  let running = 0;

  function _dispatch() {
    while (queue.length > 0 && running < options.capacity) {
      const task = queue.shift()!;
      running += task.weight;
      task.resolve(_createPermit(task.weight));
    }
  }

  function _createPermit(weight: number): SemaphorePermit {
    let isAcquired = true;

    return {
      get weight() { return weight },
      get isAcquired() { return isAcquired },
      get running() { return running },
      release: once(() => {
        release(weight)
        isAcquired = false;
      })
    }
  }

  function release(weight = 1) {
    if (weight < 1) throw new Error(`invalid weight ${weight}: must be positive`);

    running -= weight;
    _dispatch();
  }

  function acquire(weight = 1) {
    if (weight < 1) throw new Error(`invalid weight ${weight}: must be positive`);
    if (weight > options.capacity) throw new Error(`invalid weight ${weight}: must be lower than or equal capacity ${options.capacity}`);

    return new Promise<SemaphorePermit>((resolve) => {
      queue.push({ resolve, weight });
      _dispatch();
    });
  }

  async function runExclusive(optionsOrWeightOrFn?: number | ExclusiveOptions | AnyFn, innerFn?: AnyFn): Promise<unknown> {
    const options = typeof optionsOrWeightOrFn === "function" ? {} : useExclusiveFnOptions(optionsOrWeightOrFn);
    const fn = (typeof optionsOrWeightOrFn === "function" ? optionsOrWeightOrFn : innerFn) ?? baseFn;
    if (!fn) throw new Error(`invalid execution: function is required`);

    const permit = await acquire(options.weight)

    try {
      return await fn(permit);
    } finally {
      permit.release();
    }
  }

  runExclusive.acquire = acquire;
  runExclusive.release = release;
  runExclusive.getRunning = () => running;

  return runExclusive;
}

function useOptions(optionsOrCapacity: number | WithSemaphoreOptions): WithSemaphoreOptions {
  if (typeof optionsOrCapacity === "number") {
    return { capacity: optionsOrCapacity };
  }

  return optionsOrCapacity;
}

function useExclusiveFnOptions(optionsOrWeight?: number | ExclusiveOptions): ExclusiveOptions {
  if (typeof optionsOrWeight === "number") {
    return { weight: optionsOrWeight };
  }

  return optionsOrWeight ?? {};
}


type QueuedTask = {
  weight: number;
  resolve: (permit: SemaphorePermit) => void;
};


interface ExclusiveOptions {
  weight?: number;
}

interface ExclusiveFn extends Semaphore {
  <T>(fn: AnyFn<T>): Promise<T>;
  <T>(options: ExclusiveOptions, fn: AnyFn<T>): Promise<T>;
  <T>(weight: number, fn: AnyFn<T>): Promise<T>;
}

interface PrebuiltExclusiveFn<T> extends ExclusiveFn {
  (options: ExclusiveOptions): Promise<T>;
  (weight?: number): Promise<T>;
}
