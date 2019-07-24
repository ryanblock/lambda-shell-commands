# `@architect/hydrate` [![Travis Build Status](https://travis-ci.com/architect/hydrate.svg?branch=master)](https://travis-ci.com/architect/hydrate) [![Appveyor Build Status](https://ci.appveyor.com/api/projects/status/1svykswtyce1k3u9/branch/master?svg=true)](https://ci.appveyor.com/project/ArchitectCI/hydrate/branch/master) [![codecov](https://codecov.io/gh/architect/hydrate/branch/master/graph/badge.svg)](https://codecov.io/gh/architect/hydrate)

[@architect/hydrate][npm] ensures that all functions managed by architect have
their dependencies installed. Functions containing all its required dependencies
are considered to be 'hydrated' - thus the name!

[@architect/hydrate][npm] supports dependencies managed in the following languages
using the following package managers:

- **node.js** via `npm` using `package.json` and `package-lock.json` files
- **python (3.7+)** via `pip3` using a `requirements.txt` file
- **ruby** via `bundle` using `Gemfile` and `Gemfile.lock` files

# Installation

    npm install @architect/hydrate

# API

## `hydrate(options)`

`options` object can include the following properties:

- `basepath`: What path hydrate should consider as the root for searching for
    functions to hydrate. Useful if you want to hydrate a subset of functions.
    Defaults to `src` in the current working directory.
- `install`: If truthy, will invoke [`hydrate.install()`][install].
- `update`: If truthy, will invoke [`hydrate.update()`][update].

By default, invokes [`hydrate.shared()`][shared].

## `hydrate.install(basepath='src', callback)`

Installs dependencies for all Functions found in the specified `basepath`. Invokes
[`hydrate.shared()`][shared].

Note that for the default value of `basepath='src'`, this means `install` will
also hydrate shared folders like `src/shared` and `src/views`.

To ensure local development behavior is as close to `staging` and `production`
as possible, `hydrate.install()` (and other hydrate functions) uses:

- **node.js**: `npm ci` if `package-lock.json` is present and `npm i` if not
- **python**: `pip3 install`
- **ruby**: `bundle install`

## `hydrate.update(basepath='src', callback)`

Updates dependencies in all Functions found in the specified `basepath`. Invokes
[`hydrate.shared()`][shared]. Note that this will only functionally differ from
[`hydrate.install()`][install] if you use a lockfile like `package-lock.json` or
`Gemfile.lock`.

Note that for the default value of `basepath='src'`, this means `update` will
also update dependencies in shared folders like `src/shared` and `src/views`.

`update` is functionally almost identical to [`install`][install],
except it will update dependencies to newer versions _if they exist_. This is
done via:

- **node.js**: `npm update`
- **python**: `pip3 install -U --upgrade-strategy eager`
- **ruby**: `bundle update`

## `hydrate.shared(callback)`

Copies shared code (from `src/shared` and `src/views`) into all Functions.

[shared]: #hydratesharedcallback
[install]: #hydrateinstallbasepathsrc-callback
[update]: #hydrateupdatebasepathsrc-callback
[npm]: https://www.npmjs.com/package/@architect/hydrate
