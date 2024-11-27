Generate release notes using `git log -p` output and Anthropic
Claude.

#### Required Environment Variables

- `ANTHROPIC_API_KEY`
- `GITHUB_TOKEN` (only required if `--publish` is used)

### Usage

```sh
# Generate release notes for changes between the last two
# stable versions.
scripts/run.js release-notes

# Generate release notes for changes between the last stable
# version and a given commit ref (e.g. HEAD).
scripts/run.js release-notes <commit-ref>
```

#### Options

```sh
-o, --output <file>
  Write the release notes to a file.

--publish
  Publish the release notes to GitHub.

--draft
  Publish the release notes as a draft.

--prerelease
  Publish the release notes as a prerelease.

--limit <number>
  Limit the number of commits to include in each section. (For testing purposes)
```
