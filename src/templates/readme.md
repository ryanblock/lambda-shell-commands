# AWS Lambda shell commands
### Last updated: $LAST_UPDATED


## Shell command lists by Lambda runtime

$LINKS


## How Lambda works

AWS Lambda is a full Linux microcontainer that boots up on-demand in milliseconds, billing in 100ms increments.

Lambda is primarily used for running whatever business logic you feed one of its [supported runtimes](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtimes.html) (or the [custom runtime](https://docs.aws.amazon.com/lambda/latest/dg/runtimes-custom.html) of your choosing, if you're into that!).

As in any application, it's not unusual to need to shell out for some kinds of operations – after all, UNIX is pretty powerful! 🏋🏽‍♀️

Fortunately, Lambdas – which run a lightweight AWS AMI – come equipped with a full complement of common Linux shell commands.


### Helpful notes

- AWS [pre-installs the AWS SDK in its Lambdas](https://docs.aws.amazon.com/lambda/latest/dg/current-supported-versions.html), so don't include it in your application's dependencies!
  - In fact, doing so will only slow down your Lambda's startup times, so don't do that.
- Important local paths
  - `/var/task` - Your default cwd (and where your code is located)
  - `/tmp` - A nice place to perform local operations
- ⚠️ Security warning: If dealing with any potentially sensitive data on the Lambda filesystem, **always be sure to destroy those files before ending each execution**.
  - Lambda microcontainers are kept warm and recycled across your invocations. Not cleaning up after temp files leaves open the possibility of leaking data across executions – statelessness is a feature!


### Build your own Lambda-based application

Partially self-serving plug: this here project is built with [Architect](https://arc.codes), an open source serverless framework created and maintained by the company I cofounded: [Begin](https://begin.com), an open source-centric serverless app platform, created to help people like you build the fast, durable, scalable, affordable, maintainable, serverless software of the future.


## Credits

This project inspired by [What's on Lambda](https://github.com/mbrock/whats-on-lambda)!
