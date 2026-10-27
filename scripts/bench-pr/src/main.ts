main().catch(error => {
  console.error(error)
  process.exit(1)
})

async function main() {
  if (process.argv[2] === 'comment') {
    const { commentOnPullRequest } = await import('./commentOnPullRequest.ts')
    await commentOnPullRequest(process.argv.slice(3))
    return
  }

  const { runBenchmarks } = await import('./runBenchmarks.ts')
  await runBenchmarks(process.argv.slice(2))
}
