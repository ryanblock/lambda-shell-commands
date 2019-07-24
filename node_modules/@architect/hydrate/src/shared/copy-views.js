let cp = require('./copy')
let rmrf = require('rimraf')
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
 * nodejs10.x | node_modules/@architect/views/
 * ruby2.5    | vendor/views/
 * python3.7  | vendor/views/
 *
 */
module.exports = function copyArc(callback) {
  getBasePaths('views', function gotBasePaths(err, paths) {
    if (err) throw err
    series(paths.map(dest=> {
      return function copier(callback) {
        let src = path.join(process.cwd(), 'src', 'views')
        if (fs.existsSync(src) && dest.includes('get-')) {
          let finalDest = path.join(dest, 'views')
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
