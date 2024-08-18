import mri from 'mri'
import { publishVersion } from './src/publishVersion'

main()

async function main() {
  const args = parseArgs()
  await publishVersion(args)
}

function parseArgs() {
  const { gitCliffToken, npmToken, radashiBotToken } = verifyEnvVars({
    gitCliffToken: 'GIT_CLIFF_PAT',
    npmToken: 'NPM_TOKEN',
    radashiBotToken: 'RADASHI_BOT_TOKEN',
  })

  const args = mri(process.argv.slice(2), {
    boolean: ['no-push', 'tag'],
  })

  if (args.tag && args.tag !== 'beta' && args.tag !== 'next') {
    console.error('Error: --tag must be beta or next')
    process.exit(1)
  }

  return {
    push: !args['no-push'],
    tag: args.tag as 'beta' | 'next',
    gitCliffToken,
    npmToken,
    radashiBotToken,
  }
}

function verifyEnvVars<T extends Record<string, string>>(
  vars: T,
): { [K in keyof T]: string } {
  return Object.entries(vars).reduce(
    (acc, [alias, envName]) => {
      const value = process.env[envName]
      if (!value) {
        console.error(`Error: ${envName} is not set`)
        process.exit(1)
      }
      process.env[envName] = ''
      acc[alias as keyof T] = value
      return acc
    },
    {} as { [K in keyof T]: string },
  )
}
