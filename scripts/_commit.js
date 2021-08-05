let { join } = require('path')
let { readFileSync } = require('fs')
let { Octokit } = require('@octokit/rest')
Octokit = Octokit.plugin(require('octokit-commit-multiple-files'))
let cwd = process.cwd()

module.exports = async function commitChanges ({ dirty }) {
  let auth = process.env.TOKEN
  let now = new Date().toISOString()
  let day = now.split('T')[0]

  let message = `Lambda shell commands update: ${dirty.join(', ')} (${day})`
  let files = {
    'readme.md': readFileSync(join(cwd, `readme.md`)).toString(),
    'data.json': readFileSync(join(cwd, `data.json`)).toString(),
  }
  dirty.forEach(runtime => {
    let file = `_${runtime}.md`
    let filePath = join(cwd, file)
    files[file] = readFileSync(filePath).toString()
  })

  let octokit = new Octokit({ auth })
  await octokit.repos.createOrUpdateFiles({
    owner: 'ryanblock',
    repo: 'lambda-shell-commands',
    branch: 'main',
    changes: [
      {
        message,
        files,
      }
    ]
  })
}
