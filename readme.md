# AWS Lambda shell commands
### Last updated: 2019-05-15T21:51:32.534Z, [skip to the command list ↓](#available-aws-lambda-shell-commands-shortcuts-and-syntax)

## How Lambda works

AWS Lambda is a full Linux microcontainer that boots up on-demand in milliseconds, billing in 100ms increments.

Lambda is primarily used for running whatever business logic you feed one of its [supported runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html) (or the [custom runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) of your choosing, if you're into that!).

As in any application, it's not unusual to need to shell out for some kinds of operations – after all, UNIX is pretty powerful! 🏋🏽‍♀️

Fortunately, Lambdas – which run a lightweight AWS AMI – come equipped with a full complement of common Linux shell commands.


### Helpful notes

- AWS [pre-installs the AWS SDK in all JS and Python Lambdas](https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html), so you don't need to include it in your application's dependencies!
  - In fact, doing so will only slow down your Lambda's startup times, so don't do that.
- Important local paths
  - `/var/task` - Your default cwd (and where your code is located)
  - `/tmp` - A nice place to perform local operations
- ⚠️ Security warning: If dealing with any potentially sensitive data on the Lambda filesystem, **be sure to destroy those files before completing your application's execution**.
  - Your Lambda microcontainers are kept warm and recycled across processes, so you really don't leave open the possibility of leaking data across executions – statelessness is a feature!


### Build your own Lambda-based application

Partially self-serving plug: this here project is built with [Architect](https://arc.codes), an open source serverless framework created and maintained by the company I cofounded: [Begin](https://begin.com), an open source-centric serverless app platform, created to help people like you build the fast, durable, scalable, affordable, maintainable, serverless software of the future.


## Available AWS Lambda shell commands, shortcuts, and syntax

- `!`
- `.`
- `:`
- `[`
- `[[`
- `]]`
- `alias`
- `arch`
- `awk`
- `base64`
- `basename`
- `bash`
- `bashbug`
- `bashbug-64`
- `bg`
- `bind`
- `break`
- `builtin`
- `ca-legacy`
- `caller`
- `captoinfo`
- `case`
- `cat`
- `catchsegv`
- `cd`
- `chcon`
- `chgrp`
- `chmod`
- `chown`
- `cksum`
- `clear`
- `comm`
- `command`
- `compgen`
- `complete`
- `compopt`
- `continue`
- `coproc`
- `cp`
- `csplit`
- `cut`
- `date`
- `dd`
- `declare`
- `df`
- `dgawk`
- `dir`
- `dircolors`
- `dirname`
- `dirs`
- `disown`
- `do`
- `done`
- `du`
- `echo`
- `egrep`
- `elif`
- `else`
- `enable`
- `env`
- `esac`
- `eval`
- `exec`
- `exit`
- `expand`
- `export`
- `expr`
- `factor`
- `false`
- `fc`
- `fg`
- `fgrep`
- `fi`
- `fmt`
- `fold`
- `for`
- `function`
- `gawk`
- `gencat`
- `getconf`
- `getent`
- `getopts`
- `grep`
- `groups`
- `hash`
- `head`
- `help`
- `history`
- `hostid`
- `iconv`
- `id`
- `if`
- `igawk`
- `in`
- `info`
- `infocmp`
- `infokey`
- `infotocap`
- `install`
- `jobs`
- `join`
- `kill`
- `ldd`
- `let`
- `link`
- `ln`
- `local`
- `locale`
- `localedef`
- `logname`
- `logout`
- `ls`
- `makedb`
- `mapfile`
- `md5sum`
- `mkdir`
- `mkfifo`
- `mknod`
- `mktemp`
- `mv`
- `nice`
- `nl`
- `node`
- `nohup`
- `npm`
- `nproc`
- `npx`
- `numfmt`
- `od`
- `p11-kit`
- `paste`
- `pathchk`
- `pgawk`
- `pinky`
- `pldd`
- `popd`
- `pr`
- `printenv`
- `printf`
- `ptx`
- `pushd`
- `pwd`
- `read`
- `readarray`
- `readlink`
- `readonly`
- `realpath`
- `reset`
- `return`
- `rm`
- `rmdir`
- `rpcgen`
- `runcon`
- `sed`
- `select`
- `seq`
- `set`
- `sh`
- `sha1sum`
- `sha224sum`
- `sha256sum`
- `sha384sum`
- `sha512sum`
- `shift`
- `shopt`
- `shred`
- `shuf`
- `sleep`
- `sort`
- `sotruss`
- `source`
- `split`
- `sprof`
- `stat`
- `stdbuf`
- `stty`
- `sum`
- `suspend`
- `sync`
- `tabs`
- `tac`
- `tail`
- `tee`
- `test`
- `then`
- `tic`
- `time`
- `timeout`
- `times`
- `toe`
- `touch`
- `tput`
- `tr`
- `trap`
- `true`
- `truncate`
- `trust`
- `tset`
- `tsort`
- `tty`
- `type`
- `typeset`
- `tzselect`
- `ulimit`
- `umask`
- `unalias`
- `uname`
- `unexpand`
- `uniq`
- `unlink`
- `unset`
- `until`
- `update-ca-trust`
- `users`
- `vdir`
- `wait`
- `wc`
- `while`
- `who`
- `whoami`
- `yes`
- `{`
- `}`


## Credits

This project inspired by [What's on Lambda](https://github.com/mbrock/whats-on-lambda)!
