# Contributing to Radashi

Thank you for investing your time in contributing to Radashi!

## You have a question?

If you have a general question about Radashi, how to use it, the roadmap, or an idea to chat about you can ask it on the [discussions](https://github.com/aleclarson/radashi/discussions) page. Before you do, search to see if it's been asked before. If a related topic doesn't exist, you can start a new one.

## You have a problem?

If you have an issue with Radashi, you want to report a bug, or you need an improvement you can create an issue on the [issues](https://github.com/aleclarson/radashi/issues) page. Before you do, search to see if it's already been brought up. If a similar issue doesn't exist, you can create a new one.

## You want to contribute?

Scan through the [existing issues](https://github.com/aleclarson/radashi/issues) to find one that interests you. As a general rule, I don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix. Feel free to ask questions about the implementation or design in a comment on the issue before diving in.

## You want to write code?

- To get started, run `pnpm i` in the project's root directory to install the dependencies.
- You can add a new function with `pnpm add-function <group-name>/<function-name>`. This will create the necessary files and open a PR with the new function. Try to use a `group-name` that already exists, if possible (check the `src` directory). Note that you will need to manually export the function from `src/mod.ts` before you can use it.
- You can run the unit tests with `pnpm test`. They require Node v16+. You can run `nvm use` in the root directory to change to the correct Node version. The tests should pass (duh) and maintain 100% code coverage.
- You can lint your code with `pnpm lint`.
- To get familiar with the existing code I would recommend looking through the docs and the codebase in parallel. For each function in the docs, find the implementation in the source and skim over the code.

Please review _“The ethos of Radashi”_ before getting started:

<a href="https://github.com/orgs/radashi-org/discussions/20">
  <img src="https://github.com/radashi-org/radashi/raw/main/.github/img/ethos-button.png" alt="The ethos of Radashi" width="250px" />
</a>

## You're ready to push a change?

Once you've made your changes on a fork of the Radashi repo, create a pull request to the `master` branch of the [radashi](https://github.com/aleclarson/radashi) repository.

- Be sure to fill in a description that lets readers and reviewers understand both the implementation and intent of your changes.
- Don't forget to [link the PR to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.

Once you submit your PR, one of Radashi's maintainers will review it. They might ask questions or request additional information.

## Your PR gets labeled with `prerelease`

If your PR is labeled with `prerelease` by a maintainer, it will be published in either a `beta` or `next` version to NPM. You should be notified by the Radashi Bot when this happens. PRs for bug fixes are never published as prereleases.

## Your PR gets merged!

Congratulations :tada::tada: Currently, major and minor versions are published manually. If your PR was a bug fix, it will be immediately published to NPM as a patch version. Otherwise, you can use a `beta` or `next` version if you can't wait for your feature to be released.
