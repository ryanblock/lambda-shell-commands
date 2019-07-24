let cp = require('./copy')
let rmrf = require('rimraf')
let fs = require('fs')
let path = require('path')
let series = require('run-series')
let getBasePaths = require('./get-base-paths')

/**
 * copies src/shared
 * into function runtime discoverable directory
 *
 * Runtime    | Function Path
 * ----------------------------------------------------------
 * nodejs10.x | node_modules/@architect/shared/
 * ruby2.5    | vendor/shared/
 * python3.7  | vendor/shared/
 *
 */
module.exports = function copyShared(callback) {
  getBasePaths('shared', function gotBasePaths(err, paths) {
    if (err) throw err
    series(paths.map(dest=> {
      return function copier(callback) {
        let src = path.join(process.cwd(), 'src', 'shared')
        if (fs.existsSync(src)) {
          let finalDest = path.join(dest, 'shared')
          rmrf(finalDest, {glob:false}, function(err) {
            if (err) callback(err)
            else cp(src, finalDest, callback)
          })
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
