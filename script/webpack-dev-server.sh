#!/bin/bash
set -eu

PORT=${PORT:-8080}

npm run clean:dev && \
node_modules/.bin/jade -o build-dev -P -w src/template/index.jade | \
node_modules/.bin/webpack-dev-server --config config/webpack.config.babel.js --port $PORT --progress --host 0.0.0.0
