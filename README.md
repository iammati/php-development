![Version](https://img.shields.io/npm/v/@iammati/php-development?color=hotpink&label=version&style=for-the-badge)
![PHPstan support](https://img.shields.io/badge/supports-phpstan-gold?style=for-the-badge)
![php-cs-fixer support](https://img.shields.io/badge/supports-phpcsfixer-blue?style=for-the-badge)

# @iammati/php-development

### A PHP-linter on steroids

Built-in watcher for PHPstan and php-cs-fixer

## Why [another](https://github.com/seregazhuk/php-watcher) watcher?

I don't like that I got notified by GitLab's CI – which also requires some amount of time due to the speed of its executor –
so I decided to run a simple watcher before performing a `git commit` at all to:
a) get notified in case errors are detected locally
b) immediately able to see them instead of opening a web UI and scroll through a stacktrace

Also this watcher doesn't depend on any 3rd-party packages since you'll only make use of the binary.

## Installation

Install this package via:
`(pnpm|npm|yarn) i @iammati/php-development`

Once installed, you can simply execute the shipped binary-file via:
`node_modules/.bin/@iammati/php-development/`

## TODOs
- Refactor into Go to achieve faster and more performant watcher than in Node.js

## Credits

This package was created by myself, for myself (and educational purpose).
Thanks, Mati
