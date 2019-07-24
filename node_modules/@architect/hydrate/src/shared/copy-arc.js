let parse = require('@architect/parser')
let cp = require('./copy')
let fs = require('fs')
let path = require('path')
let series = require('run-series')
let getBasePaths = require('./get-base-paths')

/**
 * copies the current .arc, app.arc, arc.yaml or arc.json manifest
 * into function runtime discoverable directory
 *
 * Runtime    | Function Path
 * ----------------------------------------------------------
 * nodejs10.x | node_modules/@architect/shared/.arc
 * ruby2.5    | vendor/shared/.arc
 * python3.7  | vendor/shared/.arc
 *
 */
module.exports = function copyArc(callback) {
  getBasePaths('arcfile', function gotBasePaths(err, paths) {
    if (err) throw err
    series(paths.map(dest=> {
      return function copier(callback) {
        copy(path.join(dest, 'shared'), callback)
      }
    }),
    function done(err) {
      if (err) callback(err)
      else callback()
    })
  })
}

/**
 * copy the current manifest into the destination dir
 */
function copy(dest, callback) {
  // path to destination
  let arcFileDest = path.join(dest, '.arc')
  // .arc in current working dir
  let arcFileSrc = path.join(process.cwd(), '.arc')
  // fallback: app.arc in current working dir
  let arcAppDotArcPath = path.join(process.cwd(), 'app.arc')
  // fallback: arc.yaml in current working dir
  let arcYamlPath = path.join(process.cwd(), 'arc.yaml')
  // fallback: arc.json in current working dir
  let arcJsonPath = path.join(process.cwd(), 'arc.json')

  if (fs.existsSync(arcFileSrc)) {
    cp(arcFileSrc, arcFileDest, callback)
  }
  else if (fs.existsSync(arcAppDotArcPath)) {
    cp(arcAppDotArcPath, arcFileDest, callback)
  }
  else if (fs.existsSync(arcYamlPath)) {
    let raw = fs.readFileSync(arcYamlPath).toString()
    let arc = parse.yaml.stringify(raw)
    fs.writeFileSync(arcFileDest, arc)
    callback()
  }
  else if (fs.existsSync(arcJsonPath)) {
    let raw = fs.readFileSync(arcJsonPath).toString()
    let arc = parse.json.stringify(raw)
    fs.writeFileSync(arcFileDest, arc)
    callback()
  }
}
