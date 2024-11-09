If you open a PR that introduces a new function, add it to the "New Functions" section. If you're extending an existing function, add it to the "New Features" section.

The `####` headline should be short and descriptive of the new functionality. In the body of the section, include a link to the PR. You don't need to include a description of the change itself, as we will extract that from the documentation.

## New Functions

####

## New Features

#### Return type narrowing for `first` and `last`

Previously, `first` and `last` would return `T | undefined`, making subsequent use of the returned value prone to Typescript warnings. 

With return type narrowing in https://github.com/radashi-org/radashi/pull/160, `first([])` will have return type `undefined`, and `last([1, 2, 3])` will have return type `number`. For mutable arguments, `first` and `last` will still return `T | undefined`, but for immutable arguments (`as const` or `readonly`), return type will be narrowed.     
