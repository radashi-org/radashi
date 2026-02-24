import { verifyEnvVars } from '@radashi-org/common/verifyEnvVars.ts'

main().catch(console.error)

async function main() {
  const args = await parseArgs()

  const { publishVersion, VALID_TAGS } = await import('./publishVersion.ts')

  if (args.tag && !VALID_TAGS.includes(args.tag)) {
    console.error(`Error: --tag must be one of [${VALID_TAGS.join(', ')}]`)
    process.exit(1)
  }

  await publishVersion(args)
}

async function parseArgs() {
  const {
    gitCliffToken,
    radashiBotToken,
    deployKey,
    canaryDeployKey,
  } = verifyEnvVars({
    gitCliffToken: 'GIT_CLIFF_PAT',
    radashiBotToken: 'RADASHI_BOT_TOKEN',
    deployKey: 'DEPLOY_KEY',
    canaryDeployKey: 'NIGHTLY_DEPLOY_KEY?',
  })

  const { default: mri } = await import('mri')

  const argv = mri(process.argv.slice(2), {
    boolean: ['no-push', 'patch', 'latest'],
    string: ['tag'],
  })

  if (argv.latest && argv.tag) {
    console.error('Error: --latest and --tag cannot be specified together')
    process.exit(1)
  }
  if (!argv.latest && !argv.patch && !argv.tag) {
    console.error('Error: --latest, --patch, or --tag must be specified')
    process.exit(1)
  }

  type ValidTag = typeof import('./publishVersion.ts').VALID_TAGS[number]

  return {
    push: !argv['no-push'],
    tag: argv.tag as ValidTag,
    patch: argv.patch,
    gitCliffToken,
    radashiBotToken,
    deployKey,
    canaryDeployKey,
  }
}
