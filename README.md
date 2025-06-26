# Radashi

<div align="center">
  <p align="center">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/banner.png" alt="Radashi" width="100%" />
  </p>
  <a href="https://github.com/radashi-org/radashi/blob/main/LICENSE.md"><img src="https://img.shields.io/npm/l/radashi" alt="License" /></a>
  <a href="https://github.com/radashi-org/radashi/actions/workflows/check-main.yml"><img src="https://img.shields.io/github/actions/workflow/status/radashi-org/radashi/check-main.yml?logo=github" alt="Build Status" /></a>
  <a href="https://app.codecov.io/gh/radashi-org/radashi/tree/main/src"><img src="https://img.shields.io/codecov/c/github/radashi-org/radashi?logo=codecov" alt="Codecov" /></a>
  <a href="https://biomejs.dev/"><img src="https://img.shields.io/badge/code_style-biome.js-blue?logo=biome" alt="Code Style: Biome.js" /></a>
  <a href="https://github.com/radashi-org/radashi/discussions"><img src="https://img.shields.io/github/discussions/radashi-org/radashi?logo=github" alt="GitHub Discussions" /></a>
  <a href="https://jsr.io/@radashi-org/radashi"><img src="https://jsr.io/badges/@radashi-org/radashi" alt="JSR.io" /></a>
  <p align="center">
    <span>English</span> | <a href="./README-pt_br.md">Português</a>
  </p>
</div>

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
- **[changelog](https://github.com/radashi-org/radashi/blob/main/CHANGELOG.md)** (easily see what's new in each release)

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

### Beta versions

Beta versions are published regularly with new functions and improvements. They never contain breaking changes (see the [Breaking changes](#breaking-changes) section). The [beta](https://github.com/radashi-org/radashi/tree/beta) branch contains the source code for beta versions.

To get notified of a new beta version, watch the [radashi-canary](https://github.com/radashi-org/radashi-canary) repository. You can find release notes for beta versions [here](https://github.com/radashi-org/radashi-canary/releases).

The latest beta version can be installed with:

```sh
pnpm add radashi@beta -E
```

The `-E` flag ensures that the `beta` version is installed as an exact version (e.g. `radashi@12.3.0-beta.abc1234`). This is recommended to avoid accidental breakage.

### Breaking changes

Preview releases for the next major version are also announced in the [radashi-canary](https://github.com/radashi-org/radashi-canary/releases) repository. The [next](https://github.com/radashi-org/radashi/tree/next) branch contains the source code for the next major version.

We'd appreciate your help testing the latest `next` version before it's released:

```sh
pnpm add radashi@next -E
```

### JSR.io

Radashi is also published to the [JSR registry](https://jsr.io/docs/why), which gives Radashi [its own page](https://jsr.io/@radashi-org/radashi).

```sh
jsr add @radashi-org/radashi
```

```sh
deno add jsr:@radashi-org/radashi
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
  Yes! I'll add you as a contributor to the repository. You can review pull requests and help with triage. With time, you may earn the ability to merge approved PRs.

  <a href="https://github.com/orgs/radashi-org/discussions/4">
    <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/apply-button.png" alt="Apply to join the Radashi team" width="250px" />
  </a>

- **Is backwards compatibility a goal?**
  Yes! We want the transition from `radash` to this library to be smooth. If you're coming from Radash, we recommend installing `radashi@^12`. This version will continue to receive backported fixes even after Radashi v13 is released. You can upgrade to the latest major version when you're ready.

- **Automatic releases**
  To ensure contributions are quickly rolled out, we have the following automatic processes:

  - **Patch releases**
    Whenever the `main` branch receives a `^fix:` commit, a patch release is immediately published to NPM.

  - **Beta releases**
    Pull requests that add a new feature can be labeled with `prerelease` by a maintainer. This triggers a GitHub workflow that attempts to copy the PR into the `beta` branch. If that succeeds, a beta release is immediately published to NPM.

    Installing `radashi@beta` will always fetch the latest beta release. Although the name "beta" may suggest unstable code, PRs need tests to be eligible for a prerelease.

    Beta releases provide quick access to new features without waiting for a regular release cycle. They're also an opportunity for the community to provide feedback before the feature is released to the `main` branch.

  - **"Next" releases**
    Pull requests with breaking changes can also be labeled with `prerelease` by a maintainer. In this case, the PR is copied into the `next` branch. If that succeeds, a "next" release is published to NPM.

    Installing `radashi@next` will always fetch the latest "next" release.

- **Release cycle**
  Radashi is expected to release a new minor or major version on a monthly basis, but releases are not on a strict schedule. Pre-releases are available for testing and feedback before the final release.

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
