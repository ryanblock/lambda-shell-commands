let cp = require('./copy')
let fs = require('fs')
let path = require('path')
let series = require('run-series')
let getBasePaths = require('./get-base-paths')

/**
 * copies src/views
 * into function runtime discoverable directory
 *
 * Runtime    | Function Path
 * ----------------------------------------------------------
 * nodejs10.x | node_modules/@architect/shared/static.json
 * ruby2.5    | vendor/shared/static.json
 * python3.7  | vendor/shared/static.json
 *
 */
module.exports = function copyArc(callback) {
  getBasePaths('static', function gotBasePaths(err, paths) {
    if (err) throw err
    series(paths.map(dest=> {
      return function copier(callback) {
        let src = path.join(process.cwd(), 'public', 'static.json')
        if (fs.existsSync(src)) {
          cp(src, path.join(dest, 'shared', 'static.json'), callback)
        }
        else {
          callback()
        }
      }
    }),
    function done(err) {
      if (err) callback(err)
      else callback()
    })
  })
}
