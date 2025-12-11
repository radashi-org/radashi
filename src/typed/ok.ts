import { Ok } from "radashi"

/**
 * Creates an `Ok` result containing the provided value.
 *
 * @see https://radashi.js.org/reference/typed/ok
 * @example
 * ```ts
 * // Example usage
 * const result = ok(42)
 *
 * typeof result
 * //     ^? Ok<number> = { ok: true, value: number, error: undefined }
 * ```
 * @version 12.6.0
 */
export function ok<TOk>(value: TOk): Ok<TOk> {
    return { ok: true, value, error: undefined }
}