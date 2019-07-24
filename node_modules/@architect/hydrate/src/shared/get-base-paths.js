let parse = require('@architect/parser')
let utils = require('@architect/utils')
let series = require('run-series')
let path = require('path')
let fs = require('fs')

/**
 * reads the Architect manifest and returns base paths to function runtime deps base
 *
 * @param {string} copying - one of: arcfile, shared, views, static
 */
let inventory
module.exports = function getBasePaths(copying, callback) {
  if (!inventory) {
    inventory = utils.inventory()
  }
  series(inventory.localPaths.map(base=> {

    let runtime = 'nodejs10.x'
    let arcConfigPath = path.join(base, '.arc-config')
    let noop = false

    return function getPath(callback) {
      let paths = {
        'nodejs10.x': path.join(base, 'node_modules', '@architect'),
        'ruby2.5': path.join(base, 'vendor'),
        'python3.7': path.join(base, 'vendor'),
      }
      // check for override
      if (fs.existsSync(arcConfigPath)) {
        let raw = fs.readFileSync(arcConfigPath).toString()
        let config = parse(raw)
        // override runtime
        let findRuntime = t=> t[0] === 'runtime'
        if (config.aws && config.aws.some(findRuntime)) {
          runtime = config.aws.find(findRuntime)[1]
        }
        // toggle shared/views/arcfile/static
        let findCopying = t=> t[0] === copying
        if (config.arc && config.arc.some(findCopying)) {
          let val = config.arc.find(findCopying)[1]
          noop = (val === false || val === 'no' || val === 'disabled')
        }
      }
      if (noop) callback()
      else callback(null, paths[runtime])
    }
  }),
  function done(err, results) {
    if (err) throw err
    callback(null, results.filter(Boolean))
  })
}
