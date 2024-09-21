# Radashi

<div align="center">
  <p align="center">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/banner.png" alt="Radashi" width="100%" />
  </p>
  <a href="https://github.com/radashi-org/radashi/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/radashi" alt="License" /></a>
  <a href="https://github.com/radashi-org/radashi/actions/workflows/publish-beta.yml"><img src="https://img.shields.io/github/actions/workflow/status/radashi-org/radashi/publish-beta.yml?logo=github" alt="Build Status" /></a>
  <a href="https://app.codecov.io/gh/radashi-org/radashi/tree/main/src"><img src="https://img.shields.io/codecov/c/github/radashi-org/radashi?logo=codecov" alt="Codecov" /></a>
  <a href="https://biomejs.dev/"><img src="https://img.shields.io/badge/code_style-biome.js-blue?logo=biome" alt="Code Style: Biome.js" /></a>
  <a href="https://github.com/radashi-org/radashi/discussions"><img src="https://img.shields.io/github/discussions/radashi-org/radashi?logo=github" alt="GitHub Discussions" /></a>
  <a href="https://app.gitter.im/#/room/#radashi:gitter.im"><img src="https://badges.gitter.im/join_chat.svg" alt="Gitter.im" /></a>
  <a href="https://jsr.io/@radashi-org/radashi"><img src="https://jsr.io/badges/@radashi-org/radashi" alt="JSR.io" /></a>
</div>

&nbsp;

**Ditch the bloat of Lodash. Stop reinventing the wheel.**

<!-- cSpell:ignore shee -->

Radashi (pronounced /ruh-DAH-shee/) is a TypeScript utility toolkit, packed with lightweight functions that are readable, performant, and robust.

Radashi is an actively maintained fork of Radash, the fastest growing Lodash alternative with 100K+ weekly downloads.

_“What makes Radashi so great?”_

- **unique** and **well-designed** functions
- **tree-shakeable** (use only what you need!)
- **dependency-free**
- **community-first** (your opinions matter)
- **future-proof** (written with modern ES6+ syntax)
- **actively maintained** (with a growing team of passionate maintainers)
- **type-safe** (the best type definitions possible)
- **full test coverage**
- **performance tracking** (we track perf regressions with continuous benchmarking)
- **well-documented**
- **nightly releases** (`radashi@beta`)
- **changelog** (easily see what's new in each release)

_If you've been using Radash (our predecessor), you're probably interested in what makes us different. Read [our comparison post](https://radashi.js.org/blog/vs-radash) to learn how we're bringing Radash to the next level while preserving its best features._

<a href="https://radashi.js.org">
  <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/docs-button.png" alt="Radash documentation" width="250px" />
</a>

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

### JSR.io

Radashi is also published to the [JSR registry](https://jsr.io/docs/why), which gives Radashi [its own page](https://jsr.io/@radashi-org/radashi).

```sh
jsr add @radashi-org/radashi
```

```sh
deno add @radashi-org/radashi
```

<img src="https://github.com/radashi-org/radashi/raw/main/.github/img/rule.png" width="100%" />

## FAQ

- **“I need XYZ, but Radashi doesn't have it.”**  
  If you have a need not met by our current set of functions, we want to hear about it. [Start a discussion](https://github.com/orgs/radashi-org/discussions/new?category=ideas) so we can explore the idea together!

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
  Yes! We want the transition from `radash` to this library to be smooth. If you're coming from Radash, we recommend installing `radashi@^12`. This version will continue to receive backported fixes even after Radashi v13 is released. You can upgrade to the latest major version when you're ready.

- **Automatic releases**  
  To ensure contributions are quickly rolled out, we have the following automatic processes:

  - **Beta releases**  
    Whenever the `main` branch receives a fix or feature, a beta release is automatically published to NPM at 5:00AM UTC.
    Installing `radashi@beta` will always fetch the latest beta release. Beta releases are always audited by the Radashi team.

  - **Preview releases**  
    When the _owner of a PR_ comments `/publish` (and nothing more), the PR is published to NPM under a version like `1.0.0-pr123.f7a9c3b` (i.e. `<latest version>-pr<PR number>.<commit SHA>`) and a tag like `pr123`. This allows the community to use the changes in the PR without waiting for the PR to be merged.

    - ⚠️ **Beware:** Preview releases are not audited by the Radashi team. Always look at their
      changes in the PR to ensure no malicious code was introduced.

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
