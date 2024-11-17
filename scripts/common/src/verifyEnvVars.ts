/**
 * This ensures that the environment variables are set and returns the
 * values as a typed object. To ensure sensitive variables are not
 * accessible to untrusted code, the environment variables are cleared
 * after they are read.
 */
export function verifyEnvVars<const T extends Record<string, string | false>>(
  vars: T,
): {
  [K in keyof T]: T[K] extends infer TEnvName
    ? TEnvName extends string
      ? TEnvName extends `${string}?`
        ? string | undefined
        : string
      : undefined
    : undefined
} {
  return Object.entries(vars).reduce(
    (acc, [alias, envName]) => {
      if (!envName) {
        return acc
      }
      let optional: boolean | undefined
      if (envName.endsWith('?')) {
        optional = true
        envName = envName.slice(0, -1)
      }
      const value = process.env[envName]
      if (!value) {
        if (optional) {
          return acc
        }
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
