import mri from 'mri'

main().catch(console.error)

async function main() {
  const argv = mri(process.argv.slice(2))

  if (argv._[0] === 'minor') {
    const { generateNextMinorReleaseNotes } = await import('./next-minor.ts')
    return generateNextMinorReleaseNotes(argv)
  }

  if (argv._[0] === 'legacy') {
    const { legacyGenerateReleaseNotes } = await import('./legacy.ts')
    return legacyGenerateReleaseNotes(argv)
  }

  throw new Error('Expected one of: minor, legacy')
}
