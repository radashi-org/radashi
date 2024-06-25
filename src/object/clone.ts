import { isPrimitive } from 'radashi'

/**
 * Creates a shallow copy of the given obejct/value.
 * @param {*} obj value to clone @returns {*} shallow clone of the
 * given value
 */
export const clone = <T>(obj: T): T => {
  // Primitive values do not need cloning.
  if (isPrimitive(obj)) {
    return obj
  }

  // Binding a function to an empty object creates a copy function.
  if (typeof obj === 'function') {
    return obj.bind({})
  }

  const proto = Object.getPrototypeOf(obj)
  const newObj =
    typeof proto?.constructor === 'function'
      ? new proto.constructor()
      : Object.create(proto)

  Object.getOwnPropertyNames(obj).forEach(key => {
    newObj[key] = obj[key as keyof T]
  })

  return newObj
}
