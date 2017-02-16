#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd dist

git init
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git remote add upstream "https://$GH_TOKEN@github.com/Convicted202/PixelShape.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "Deploy to gh-pages at ${rev}"
git push -q upstream HEAD:gh-pages
