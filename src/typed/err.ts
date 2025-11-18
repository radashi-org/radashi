import { Err } from "radashi"

/**
 * Creates an `Err` result containing the provided value.
 *
 * @see https://radashi.js.org/reference/typed/ok
 * @example
 * ```ts
 * // Example usage
 * const result = err("Something went wrong")
 *
 * typeof result
 * //     ^? Err<string> = { ok: false, value: undefined, error: string }
 * ```
 * @version 12.6.0
 */
export function err<TErr>(error: TErr): Err<TErr> {
    return { ok: false, value: undefined, error }
}