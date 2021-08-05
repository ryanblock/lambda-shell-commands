let { join } = require('path')
let { writeFileSync } = require('fs')
let { deepStrictEqual } = require('assert')
let tiny = require('tiny-json-http')

let dataPath = join(process.cwd(), 'data.json')
let data = require(dataPath)

let endpoint = runtime => `${process.env.ENDPOINT}/${runtime}`

module.exports = async function parseResults (runtimes) {
  let results = {}
  let dirty = []

  for (let runtime of runtimes) {
    let url = endpoint(runtime)
    let response = await tiny.get({ url })
    console.log(`Got response for ${runtime}, parsing...`)
    let { cmds, versions } = response.body
    results[runtime] = {
      cmds: [ ...new Set(cmds) ].filter(Boolean).sort(),
      versions: versions || false,
    }
    try {
      deepStrictEqual(results[runtime], data[runtime])
    }
    catch (err) {
      dirty.push(runtime)
    }
  }

  if (dirty.length) {
    console.log(`Found some updates to publish: ${dirty.join(', ')}`)
    writeFileSync(dataPath, JSON.stringify(results, null, 2) + '\n')
  }

  return { results, dirty }
}
