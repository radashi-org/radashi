## ./scripts/radashi-db/

This folder contains scripts for managing the Radashi database (hosted on Supabase and Algolia). For example, when a pull request is updated, the `registerPullRequest` function from the `register-pr.ts` module is called to update the database with the latest information about the pull request. This data is then used on certain pages of the Radashi website and the Radashi VSCode extension.

### Environment Variables

To use these scripts, you may need these environment variables:

- `SUPABASE_KEY`: A private API key for Supabase
- `ALGOLIA_KEY`: A private API key for Algolia
- `GITHUB_TOKEN`: A GitHub token with access to the Radashi organization
