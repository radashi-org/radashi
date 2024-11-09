import mri from 'mri'
import { publishVersion, VALID_TAGS } from './src/publishVersion'

main()

async function main() {
  const args = parseArgs()
  await publishVersion(args)
}

function parseArgs() {
  const {
    gitCliffToken,
    npmToken,
    radashiBotToken,
    deployKey,
    nightlyDeployKey,
  } = verifyEnvVars({
    gitCliffToken: !!process.env.CI && 'GIT_CLIFF_PAT',
    npmToken: !!process.env.CI && 'NPM_TOKEN',
    radashiBotToken: 'RADASHI_BOT_TOKEN',
    deployKey: 'DEPLOY_KEY',
    nightlyDeployKey: 'NIGHTLY_DEPLOY_KEY',
  })

  const argv = mri(process.argv.slice(2), {
    boolean: ['no-push'],
    string: ['tag', 'latest'],
  })

  if (argv.latest && argv.tag) {
    console.error('Error: --latest and --tag cannot be specified together')
    process.exit(1)
  }

  if (!argv.latest && !VALID_TAGS.includes(argv.tag)) {
    console.error(
      `Error: --tag must be one of [${VALID_TAGS.join(', ')}] or --latest must be specified instead`,
    )
    process.exit(1)
  }

  return {
    push: !argv['no-push'],
    tag: argv.tag as (typeof VALID_TAGS)[number],
    gitCliffToken,
    npmToken,
    radashiBotToken,
    deployKey,
    nightlyDeployKey,
  }
}

/**
 * This ensures that the environment variables are set and returns the
 * values as a typed object. To ensure sensitive variables are not
 * accessible to untrusted code, the environment variables are cleared
 * after they are read.
 */
function verifyEnvVars<T extends Record<string, string | false>>(
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
