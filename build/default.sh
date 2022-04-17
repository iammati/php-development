#!/bin/sh

node --experimental-modules src/index.js --config=app/ci/.php-development.js --path=test
