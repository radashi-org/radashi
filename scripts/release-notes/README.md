This script collects all "fix" and "feat" commits since the last stable version. Then it concatenates their `git log -p` outputs into a single file, which can be fed into an LLM for high-quality release notes.

```
tsx scripts/release-notes/release-notes.ts > release-notes.diff
```
