#!/usr/bin/env node

// eslint-disable-next-line
if (process.env.ARC_LOCAL) require('dotenv').config()
let fs = require('fs')
let path = require('path')
let sandbox = require('@architect/architect').sandbox.start
let tiny = require('tiny-json-http')

async function update() {
  // Ensure you have valid process.env.ENDPOINT pointing to a live Lambda
  if (!process.env.ENDPOINT || !process.env.AWS_REGION) throw ReferenceError('Missing env vars')

  // Run locally, start sandbox if needed
  let local = process.env.ARC_LOCAL
  let close
  if (local && process.env.ENDPOINT.includes('localhost')) close = await sandbox()

  console.log('Pulling results from:', process.env.ENDPOINT)

  let start = Date.now()
  let date = new Date(start).toISOString()
  let cwd = process.cwd()
  let endpoint = runtime => `${process.env.ENDPOINT}/${runtime}`
  let template = name => {
    let file = path.join(cwd, 'src', 'templates', `${name}.md`)
    let template = fs.readFileSync(file).toString()
    return template
  }
  let runtimes = [
    'nodejs10.x',
    'nodejs8.10',
    'python3.7',
    'python3.6',
    'ruby2.5'
  ]
  for (let runtime of runtimes) {
    let url = endpoint(runtime)
    let response = await tiny.get({url})
    console.log(`Got response for ${runtime}, parsing...`)
    parse(response, runtime)
  }

  function parse (response, runtime) {
    // Parse results
    let results = Array.from(new Set(response.body))
    if (results[0] === '') results.shift()
    results.sort().map((cmd,i) => {
      results[i] = '- `' + cmd + '`'
    })
    results = results.join('\n')

    // Write each
    let tmpl = template('results')
    let file = tmpl.replace('$RUNTIME', runtime)
                   .replace('$LAST_UPDATED', date)
                   .replace('$AWS_REGION', process.env.AWS_REGION)
                   .replace(`$SHELL_COMMANDS`, results)
    let filename = path.join(cwd, `_${runtime}.md`)
    fs.writeFileSync(filename, file)
    console.log(`Successfully updated ${filename.replace(process.cwd(), '')}`)
  }

  // Update readme
  let tmpl = template('readme')
  let links = runtimes.map(r => `### → [\`${r}\`](./_${r}.md)`).join('\n')
  let file = tmpl.replace('$LAST_UPDATED', date)
  .replace('$LINKS', links)
  let filename = path.join(cwd, 'readme.md')
  fs.writeFileSync(filename, file)
  console.log(`Successfully updated ${filename.replace(process.cwd(), '')}`)

  // Close the local server
  if (close) close()
  console.log('Done!')
}

try {
  // Run the updates
  update()
}
catch (err) {
  console.log(err)
}
