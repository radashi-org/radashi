# This script is used to publish an official release.
set -e

NEXT_VERSION=$(git cliff --bumped-version | sed 's/.//')
npm version $NEXT_VERSION --no-git-tag-version
npm publish

git cliff 2be4acf455ebec86e846854dbab57bd0bfbbceb7..HEAD --tag v$NEXT_VERSION --output CHANGELOG.md
git add package.json CHANGELOG.md
git commit -m "chore(release): $NEXT_VERSION"
git tag v$NEXT_VERSION
git push
git push --tags
