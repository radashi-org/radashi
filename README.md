# Radashi

<div align="center">
  <p align="center">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/banner.png" alt="Radashi" width="100%" />
  </p>
</div>

**Radashi** (pronounced /ruh-DAH-shee/) is a minimal set of TypeScript utility library, packed with useful functions that are readable, performant, and robust. The package is dependency-free, tree-shakeable, type-safe, and future-proof (written with modern ES6+ syntax). Best of all, it's actively maintained, has full test coverage, and tracks performance regressions with continuous benchmarking.

**Ditch the bloat of Lodash. Stop reinventing the wheel.** If you have a need not met by our current set of functions, we want to hear about it! Open an issue so we can discuss it together.

*Radashi is an actively maintained fork of Radash, the fastest growing Lodash alternative with 100K+ weekly downloads.*

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## Documentation

An official website is in the works (tracked by [#40](https://github.com/radashi-org/radashi/issues/40)). Until then, you can refer to the original `radash` documentation and the [CHANGELOG.md](https://github.com/radashi-org/radashi/blob/main/CHANGELOG.md) file.

<a href="https://radash-docs.vercel.app">
  <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/docs-button.png" alt="Radash documentation" width="250px" />
</a>

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## FAQ

- **What does “community first” mean exactly?**  
  It means putting the community's needs first, leaning towards adding support for popular use cases, as opposed to being strictly minimalist. As such, your feedback is very welcome and we value your perspective. Specifically, we want you to [contribute your viewpoint](https://github.com/orgs/radashi-org/discussions/categories/rfcs?discussions_q=is%3Aopen+category%3ARFCs) to discussions in our RFCs category.

- **Are my contributions welcome?**  
  Yes! Pull requests are encouraged, but please keep them small and focused. Sweeping changes are discouraged and won't be merged (unless the rationale's been thoroughly discussed).

  Please review _“The ethos of Radashi”_ before submitting a pull request:

  <a href="https://github.com/orgs/radashi-org/discussions/20">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/ethos-button.png" alt="The ethos of Radashi" width="250px" />
  </a>

- **Can I help you maintain this?**  
  Yes! I'll add you as a contributor to the repository. You can review pull requests and even merge them. You can help with closing issues, too. Committing directly to the main branch is a privilege you can earn, as is publishing versions to NPM.

  <a href="https://github.com/orgs/radashi-org/discussions/4">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/apply-button.png" alt="Apply to join the Radashi team" width="250px" />
  </a>

- **Is backwards compatibility a goal?**  
  Yes! We want the transition from `radash` to this library to be smooth. We'll make sure to avoid breaking changes. If any are made, they will be clearly documented at the bottom of this page.

- **Automatic releases**  
  To ensure contributions are quickly rolled out, we have the following automatic processes:

  - **Beta releases**  
    Whenever the `main` branch receives a fix or feature, a beta release is automatically published to NPM.
    Installing `radashi@beta` will always fetch the latest beta release. Beta releases are always audited by the Radashi team.

  - **Preview releases**  
    When the _owner of a PR_ comments `/publish` (and nothing more), the PR is published to NPM under a version like `1.0.0-pr123.f7a9c3b` (i.e. `<latest version>-pr<PR number>.<commit SHA>`) and a tag like `pr123`. This allows the community to use the changes in the PR without waiting for the PR to be merged.

    - ⚠️ **Beware:** Preview releases are not audited by the Radashi team. Always look at their
      changes in the PR to ensure no malicious code was introduced.

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## Install

```sh
pnpm add radashi
```

```sh
yarn add radashi
```

```sh
npm install radashi
```

### Beta version

The `radashi@beta` version is a nightly release containing everything in the main branch at the time (5:00AM UTC).

```sh
pnpm add radashi@beta
```

Its changes are documented [here](https://github.com/radashi-org/radashi/blob/main/CHANGELOG.md#radashibeta). If there's no `radashi@beta` section in the changelog, it means no pull requests have been merged since the last stable release.

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## Contributing

Contributions are welcome and appreciated! Check out the contributing guide before you dive in:

<a href="https://github.com/radashi-org/radashi/blob/main/.github/contributing.md">
  <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/contributing-button.png" alt="Contributing to Radashi" width="250px" />
</a>

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

&nbsp;

<div align="center">
  <p align="center">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/footer.png" alt="Radashi" width="100%" />
  </p>
</div>
