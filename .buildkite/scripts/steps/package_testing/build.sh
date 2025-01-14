#!/usr/bin/env bash

set -euo pipefail

.buildkite/scripts/bootstrap.sh

node scripts/build --all-platforms --debug

DOCKER_FILE="kibana-$KIBANA_PKG_VERSION-SNAPSHOT-docker-image.tar.gz"

cd target
buildkite-agent artifact upload "./$DOCKER_FILE;./*.deb;./*.rpm"
cd ..
