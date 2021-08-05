#!/usr/bin/env node

// eslint-disable-next-line
if (process.env.ARC_LOCAL) require('dotenv').config()
let sandbox = require('@architect/sandbox')

let getRuntimes = require('./_get-runtimes')
let parse = require('./_parse')
let write = require('./_write')
let commit = require('./_commit')

try {
  (async function update () {
    // Ensure you have valid process.env.ENDPOINT pointing to a live Lambda
    [ 'AWS_REGION', 'ENDPOINT', 'TOKEN' ].forEach(env => {
      if (!process.env[env]) throw ReferenceError(`Missing ${env}`)
    })

    // Run locally, start sandbox if needed
    let local = process.env.ARC_LOCAL
    let runSandbox = local && process.env.ENDPOINT.includes('localhost')
    if (runSandbox) {
      await sandbox.start()
    }
    console.log('Pulling results from:', process.env.ENDPOINT)

    // Get the stuff
    let runtimes = await getRuntimes()
    let results = await parse(runtimes)

    // Write to filesystem (for local verification) and GitHub if anything changed
    if (results.dirty.length) {
      write(results, runtimes)
      commit(results)
    }

    // Close the local server
    if (runSandbox) {
      await sandbox.end()
    }
    console.log('Done!')
  })()
}
catch (err) {
  console.log(err)
}
