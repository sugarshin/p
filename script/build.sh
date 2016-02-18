#!/bin/bash
set -eu

npm run clean:build && \
npm run webpack && \
MAIN_SCRIPT=assets/$(basename `ls build/assets/app-*.js`) npm run jade:build
