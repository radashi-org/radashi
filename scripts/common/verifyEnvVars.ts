/**
 * This ensures that the environment variables are set and returns the
 * values as a typed object. To ensure sensitive variables are not
 * accessible to untrusted code, the environment variables are cleared
 * after they are read.
 */
export function verifyEnvVars<T extends Record<string, string | false>>(
  vars: T,
): {
  [K in keyof T]: T[K] extends infer Value
    ? Value extends string
      ? string
      : undefined
    : undefined
} {
  return Object.entries(vars).reduce(
    (acc, [alias, envName]) => {
      if (!envName) {
        return acc
      }
      const value = process.env[envName]
      if (!value) {
        console.error(`Error: ${envName} is not set`)
        process.exit(1)
      }
      process.env[envName] = ''
      acc[alias] = value
      return acc
    },
    {} as Record<string, string>,
  ) as any
}
