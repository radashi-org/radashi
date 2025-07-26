```sh
# Lint the codebase, except for scripts.
pnpm lint

# Lint only the scripts.
pnpm lint scripts

# Run specific linting commands.
pnpm lint tsc biome
```

### Why does this script exist?

Good question! Previously, we were using the well-known `concurrently` npm package to do all this, but unfortunately, we now need conditional logic to avoid linting the `./scripts/` directory in certain cases. Scripts are not guaranteed to have their dependencies installed, so it's better to avoid linting them unless explicitly asked to. One exception is in a CI environment, where we always lint scripts unless the `--ignore-scripts` or `--base` flag is used.
