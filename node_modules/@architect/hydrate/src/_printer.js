let chalk = require('chalk')
let chars = require('@architect/utils').chars

function start (params) {
  let {cwd, cmd, quiet} = params
  let status = chalk.grey('Hydrating dependencies:')
  let path = chalk.cyan(cwd.replace(process.cwd(), ''))
  let command = chalk.cyan.dim(`[${cmd}]`)
  let info = `${chars.start} ${status} ${path} ${command}`
  if (!quiet) console.log(info)
  return info
}

// Prints and passes along the result (in both raw and terminal (ANSI) formats)
function done (params, callback) {
  let {err, stdout, stderr, start, quiet} = params
  let result = {
    raw: {},
    term: {
      stdout: start
    }
  }
  let format = input => input.split('\n').map(l => `  ${chalk.grey('|')} ${l}`).join('\n')

  if (err) {
    result.raw.err = err
    result.term.err = format(chalk.red.bold(err.message.trim()))
    if (!quiet) console.error(err)
  }
  if (stdout && stdout.length > 0) {
    result.raw.stdout = stdout
    result.term.stdout += `\n${format(chalk.grey(stdout.trim()))}`
    if (!quiet) console.log(stdout)
  }
  if (stderr && stderr.length > 0) {
    result.raw.stderr = stderr
    result.term.stderr = format(chalk.yellow.dim(stderr.trim()))
    if (!quiet) console.log(stderr)
  }

  if (err) callback(Error('hydration_error'), result)
  else callback(null, result)
}

module.exports = {
  start,
  done
}