import mri from 'mri'
import { publishVersion } from './src/publishVersion'

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
    string: ['tag'],
  })

  if (argv.tag && argv.tag !== 'beta' && argv.tag !== 'next') {
    console.error('Error: --tag must be beta or next')
    process.exit(1)
  }

  return {
    push: !argv['no-push'],
    tag: argv.tag as 'beta' | 'next',
    gitCliffToken,
    npmToken,
    radashiBotToken,
    deployKey,
    nightlyDeployKey,
  }
}

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
