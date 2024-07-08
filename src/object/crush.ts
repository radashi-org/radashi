import { isDate, isPrimitive, objectify } from "radashi";

/**
 * Flattens a deep object to a single dimension, converting the keys
 * to dot notation.
 *
 * @see https://radashi-org.github.io/reference/object/crush
 * @example
 * ```ts
 * crush({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 * ```
 */
type Primitive =
	| number
	| string
	| boolean
	| Date
	| symbol
	| bigint
	| undefined
	| null;

export function crush<TValue extends object>(
	value: TValue,
): Record<string, Primitive> | Record<string, never> {
	if (!value) return {};
	const crushToPvArray: (
		obj: object,
		path: string,
	) => Array<{ p: string; v: Primitive }> = (obj: object, path: string) =>
		Object.entries(obj).flatMap(([key, value]) =>
			isPrimitive(value) || isDate(value)
				? { p: path === "" ? key : `${path}.${key}`, v: value }
				: crushToPvArray(value, path === "" ? key : `${path}.${key}`),
		);

	const result = objectify(
		crushToPvArray(value, ""),
		(o) => o.p,
		(o) => o.v,
	);
	return result;
}
