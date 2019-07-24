let parse = require('@architect/parser')
let chalk = require('chalk')
let chars = require('./chars')
let path = require('path')
let fs = require('fs')

/**
 * populate process.env with .arc-env
 * if NODE_ENV=staging the process.env is populated by @staging (etc)
 * if ARC_LOCAL is present process.env is populated by @testing (so you can access remote dynamo locally)
 */
module.exports = function populateEnv(callback) {
  let exists = fs.existsSync
  let join = path.join
  let envPath = join(process.cwd(), '.arc-env')
  if (exists(envPath)) {
    let raw = fs.readFileSync(envPath).toString()
    try {
      let env = parse(raw)
      let actual = process.env.hasOwnProperty('ARC_LOCAL')
        ? 'testing'
        : process.env.NODE_ENV
      env[actual].forEach(tuple=> {
        process.env[tuple[0]] = tuple[1]
      })
      let local = 'Init process.env from .arc-env @testing (ARC_LOCAL override)'
      let not = 'Init process.env from .arc-env @' + process.env.NODE_ENV
      let msg = process.env.hasOwnProperty('ARC_LOCAL')? local : not
      console.log(chalk.grey(chars.done, msg))
    }
    catch(e) {
      console.log(chalk.bold.red(`Parse Error`), chalk.bold.white('invalid '+envPath))
      console.log(chalk.dim(e.stack))
      process.exit(1)
    }
  }
  callback()
}
