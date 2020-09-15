#!/usr/bin/env node

// eslint-disable-next-line
if (process.env.ARC_LOCAL) require('dotenv').config()
let { execSync: exec } = require('child_process')
let { version: ver } = require('../package.json')
let github = require('@octokit/rest')

try {
  /**
   * Finisher
   * - Commit & push changes from updater
   * - Intantiate client
   * - Find the ref
   * - Create a new PR
   */
  let auth = process.env.TOKEN
  let owner = 'ryanblock'
  let repo = 'lambda-shell-commands'

  let now = new Date().toISOString()
  let day = now.split('T')[0]

  async function run () {
    let msg = `Lambda shell commands update: ${now}`
    let cmd = `git add -A &&\n` +
    `git commit -m '${msg}' &&\n` +
    `git push https ${day}`
    exec(cmd)

    let gh = github({
      auth,
      userAgent: `Lambda Shell Commands ${ver}`,
    })
    let refs = await gh.git.listRefs({
      owner,
      repo
    })
    let title = msg
    let head = refs.data.find(r => r.ref.startsWith(`refs/heads/${day}`))
    head = head.ref.replace('refs/heads/', '')
    let base = 'master'

    let pull = await gh.pulls.create({
      owner,
      repo,
      title,
      head,
      base
    })
    console.log('Pull request status:', pull.status)
  }
  run()
}
catch (err) {
  console.log(err)
}
