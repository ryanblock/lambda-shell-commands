let spawn = require('child_process').spawnSync

exports.handler = async function handler () {
  let cwd = process.cwd()
  let raw = await spawn('compgen', [ '-c' ], { shell: true, cwd })
  let result = raw.stdout.toString().split('\n').sort()
  return result
}
