import { noop, type PromiseWithResolvers, withResolvers } from 'radashi'

interface AbortSignal {
  reason?: unknown
  addEventListener(type: 'abort', listener: () => void): void
  removeEventListener(type: 'abort', listener: () => void): void
}

/**
 * A permit that can be acquired from a {@link Semaphore}.
 */
export class SemaphorePermit {
  constructor(
    readonly semaphore: Semaphore,
    readonly request: PromiseWithResolvers<void>,
    readonly weight: number,
  ) {}

  /**
   * Releases this permit back to the semaphore, allowing another
   * operation to acquire it.
   */
  release(): void {
    // @ts-expect-error: Protected access
    this.semaphore.release(this)
    this.release = noop
  }
}

/**
 * Options for acquiring a permit from a semaphore.
 */
export type SemaphoreAcquireOptions = {
  signal?: AbortSignal
  weight?: number
}

/**
 * Implements a counting semaphore that controls access to a limited
 * resource. Useful for limiting concurrent operations or access to
 * constrained resources.
 *
 * @see https://radashi.js.org/reference/oop/Semaphore
 * @version 12.6.0
 */
export class Semaphore {
  protected queue: SemaphorePermit[] = []

  /**
   * Current number of permits available to be acquired
   */
  readonly capacity: number

  /**
   * Number of pending acquisition requests.
   */
  get queueLength(): number {
    return this.queue.length
  }

  /**
   * Creates a new semaphore with the specified capacity.
   * @param maxCapacity Maximum number of permits that can be issued simultaneously
   */
  constructor(readonly maxCapacity: number) {
    if (maxCapacity <= 0) {
      throw new Error('maxCapacity must be > 0')
    }
    this.capacity = maxCapacity
  }

  /**
   * Acquires a permit from this semaphore, waiting if necessary until
   * one becomes available.
   * @param options.signal - The signal to abort the acquisition
   * @param options.weight - The weight of the permit to acquire
   * @returns A promise that resolves to a permit when one is
   * available
   */
  async acquire({
    signal,
    weight = 1,
  }: SemaphoreAcquireOptions = {}): Promise<SemaphorePermit> {
    if (weight <= 0) {
      throw new Error('weight must be > 0')
    }
    if (weight > this.maxCapacity) {
      throw new Error('weight must be ≤ maxCapacity')
    }
    const request = withResolvers<void>()
    const permit = new SemaphorePermit(this, request, weight)
    if (signal) {
      const abort = () => {
        const index = this.queue.indexOf(permit)
        if (index >= 0) {
          this.queue.splice(index, 1)
          request.reject(signal.reason)
        }
      }
      signal.addEventListener('abort', abort)
      const cleanup = () => {
        signal.removeEventListener('abort', abort)
      }
      // Can't use `promise.finally` in legacy runtimes.
      request.promise.then(cleanup, cleanup)
    }
    if (this.capacity < weight) {
      this.queue.push(permit)
      await request.promise
    } else {
      // @ts-expect-error: Allow mutation
      this.capacity -= weight
    }
    return permit
  }

  /**
   * Rejects all pending acquisition requests.
   */
  reject(error: Error): void {
    this.acquire = () => Promise.reject(error)
    this.queue.forEach(permit => permit.request.reject(error))
    this.queue = []
  }

  /**
   * Releases a permit back to the semaphore, increasing capacity and
   * potentially fulfilling a pending acquisition request.
   */
  protected release(permit: SemaphorePermit): void {
    // @ts-expect-error: Allow mutation
    this.capacity += permit.weight

    // Fulfill the oldest pending acquisition request (if any)
    const nextPermit = this.queue[0]
    if (nextPermit && this.capacity >= nextPermit.weight) {
      // Update the capacity immediately to avoid race conditions.
      // @ts-expect-error: Allow mutation
      this.capacity -= nextPermit.weight
      this.queue.shift()
      nextPermit.request.resolve()
    }
  }
}
