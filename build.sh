#!/bin/bash

# Thanks to https://gist.github.com/armand1m/b8061bcc9e8e9a5c1303854290c7d61e

if [ ! -f .yarn-cache.tgz ]; then
  echo "+ build: Init empty .yarn-cache.tgz"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

docker build -t ner1vah0s:latest .

docker run \
  --rm \
  --entrypoint cat \
  ner1vah0s:latest \
  yarn.lock > /tmp/yarn.lock

if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "+ build: Saving Yarn cache"

  docker run \
    --rm \
    --entrypoint tar \
    ner1vah0s:latest \
    czf - /usr/local/share/.cache/yarn/v1 > .yarn-cache.tgz

  echo "+ build: Saving yarn.lock"

  cp /tmp/yarn.lock yarn.lock
fi
