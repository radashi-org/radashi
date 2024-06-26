import { type FilteredKeys, type KeyFilter, reduceKeys } from "radashi";

/**
 * Pick a list of properties from an object into a new object
 */
export function pick<T extends object, F extends KeyFilter<T, keyof T>>(
	obj: T,
	filter: F,
): Pick<T, FilteredKeys<T, F>> {
	if (!obj) return {} as any;
	return reduceKeys(
		obj,
		filter,
		(acc, value, key) => {
			acc[key] = value;
			return acc;
		},
		{} as any,
	);
}
