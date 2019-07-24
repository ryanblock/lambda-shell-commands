let chalk = require('chalk')
let notWin = !process.platform.startsWith('win')

/**
 * Windows cmd.exe supports a partial UCS-2 charset
 */
let buzz = notWin
  ? chalk.grey('⌁')
  : chalk.grey('~')

let start = notWin
  ? chalk.green.dim('⚬')
  : chalk.green.dim('○')

let done = notWin
  ? chalk.green.dim('✓')
  : chalk.green.dim('√')

module.exports = {
  buzz,
  start,
  done
}
