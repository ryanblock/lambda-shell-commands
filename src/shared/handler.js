let { execSync: exec } = require('child_process')
let tidy = b => b.toString().trim()

module.exports = async function handler () {
  let cwd = process.cwd()
  let opts = { shell: true, cwd }

  let rawCmds = await exec('compgen -c', opts)
  let cmds = tidy(rawCmds).split('\n').sort()

  let nodeVer = exec('node --version')
  let npmVer = exec('npm --version')

  return {
    cmds,
    versions: [
      {
        name: 'Node.js',
        version: tidy(nodeVer),
      },
      {
        name: 'npm',
        version: tidy(npmVer),
      },
    ]
  }
}
