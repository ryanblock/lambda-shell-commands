#!/usr/bin/env node

// eslint-disable-next-line
if (process.env.ARC_LOCAL) require('dotenv').config()
let { execSync: exec } = require('child_process')

/**
 * Setup!
 * - Verify git
 * - 'Config git'
 * - Create a new branch
 * - Create new origin using token
 * - Push branch to new origin
 */
try {
  let auth = process.env.TOKEN
  let owner = 'ryanblock'
  let name = owner
  let email = 'robot@ryanblock.com'
  let repo = 'lambda-shell-commands'
  let remote = `https://${owner}:${auth}@github.com/${name}/${repo}.git`

  let now = new Date().toISOString()
  let day = now.split('T')[0]

  let config = process.env.ARC_LOCAL
    ? `echo 'Not reconfiguring git' &&`
    : `git config user.email "${email}" &&\n` +
      `git config user.name "${name}" &&\n` +
      `git config github.user "${name}"`

  let cmd = `git --version &&
  ${config}
  git checkout -b ${day} &&
  git remote add https ${remote} &&
  git push -u https ${day}`

  exec(cmd)
}
catch (err) {
  console.log(err)
}
