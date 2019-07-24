# `@architect/utils` [![Travis Build Status](https://travis-ci.com/architect/utils.svg?branch=master)](https://travis-ci.com/architect/utils) [![Appveyor Build status](https://ci.appveyor.com/api/projects/status/dooe6ku7k0x83bud/branch/master?svg=true)](https://ci.appveyor.com/project/ArchitectCI/utils/branch/master) [![codecov](https://codecov.io/gh/architect/utils/branch/master/graph/badge.svg)](https://codecov.io/gh/architect/utils)

[@architect/utils][npm] are common utilities for the @architect suite of projects.

## Installation

    npm i @architect/utils

# API

## `utils.banner(params)`

Based on information read from the `.arc` project file, prints out app name, AWS
region, AWS profile, version and current working directory.

`params` is an object which can provide the following properties to customize
this behaviour:

- `disableRegion`: don't print the AWS region
- `disableProfile`: don't print the AWS profile
- `version`: the version to print out

## `utils.getLambdaName(fn)`

Returns a valid AWS Lambda function name based on its URL (route).

## `utils.getLayers(arc)`

Returns any layers defined in a project arc file. `arc` is an
[`@architect/parser`][parser]-parsed arc file object.

## `utils.getRuntime(arc)`

Returns the runtime defined in a project arc file. `arc` is an
[`@architect/parser`][parser]-parsed arc file object.

## `utils.getRuntime.allowed(runtime)`

Based on the passed-in `runtime` string, will return the same string if it is an
allowed Architect Function runtime. Otherwise, will return a default runtime
which Architect will use (at the time of this writing, the default is
`nodejs10.x`.

## `utils.init(callback)`

Initializes an Architect project directory structure based on contents read from
a `.arc` file.

## `utils.inventory(arc)`

Returns an object containing:

1. an AWS inventory via the properties `restapis`, `websocketapis`, `lambdas`,
   `types`, `iamroles`, `snstopics`, `sqstopics`, `s3buckets`, `cwerules` and
   `tables`.
2. a list of `localPaths` mapping inventory code (where applicable) to paths on
   the local filesystem.

The returned object is based on the provided `arc` argument, which should be a
parsed `.arc` file (or will attempt to parse one if none is passed).

## `utils.populateEnv(callback)`

Populates the runtime environment with variables from a `.arc-env` if present.
Details about this functionality can be found in the [@architect/env][env]
project (pending resolution of architect/env#2).

## `utils.portInUse(port, callback)`

Tests that the port specified by `port` is available to be used. If an error is
raised attempting to listen on the specified port, `callback` will be invoked
with an error argument. If it is available, `callback` will be invoked with no
arguments.

## `utils.readArc(params={})`

Returns an object containing the following properties:

1. `raw`: the raw string contents of the arc project file.
2. `arc`: the parsed (via [@architect/parser][parser]) contents of the arc
   project file.

The project file is attempted to be parsed, in order, from `.arc`, `app.arc`,
`arc.yaml`, and `arc.json`.

## `utils.toLogicalID(str)`

Converts `str` into PascalCase.

## `utils.validate(arc, raw, callback)`

Validates a parsed arc file. Parameters to this function are:

- `arc`: an [`@architect/parser`][parser]-parsed arc file object
- `raw`: the raw arc file text
- `callback`: will be invoked with an error as its first argument if validation
    fails; otherwise will invoke passing null as the first argument and the
    parsed arc object as the second argument.

[npm]: https://www.npmjs.com/package/@architect/utils
[env]: https://github.com/architect/env
[parser]: https://www.npmjs.com/package/@architect/parser
