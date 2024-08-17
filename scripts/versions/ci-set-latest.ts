import { trackVersion } from './src/trackVersion'

main()

async function main() {
  const [version, ref] = process.argv.slice(2)
  await trackVersion(version, ref).catch(error => {
    console.error(error.message)
    process.exit(1)
  })
}
