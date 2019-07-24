let parse = require('@architect/parser')
let fs = require('fs')
let path = require('path')

/**
 * Look up `.arc`, falling back to:
 * - `app.arc`
 * - `arc.yaml`
 * - `arc.json`
 */
module.exports = function readArc(params={}) {

  let cwd = params.cwd ? params.cwd : process.cwd()
  let read = p=> fs.readFileSync(p).toString()
  let exists = fs.existsSync
  let join = path.join

  let arcDefaultPath = join(cwd, '.arc')
  let appDotArcPath = join(cwd, 'app.arc')
  let arcYamlPath = join(cwd, 'arc.yaml')
  let arcJsonPath = join(cwd, 'arc.json')

  let raw
  let arc

  // if parse fails blow up
  // if not found throw not_found
  if (exists(arcDefaultPath)) {
    raw = read(arcDefaultPath)
    arc = parse(raw)
  }
  else if (exists(appDotArcPath)) {
    raw = read(appDotArcPath)
    arc = parse(raw)
  }
  else if (exists(arcYamlPath)) {
    raw = read(arcYamlPath)
    arc = parse.yaml(raw)
    // HACK
    raw = parse.yaml.stringify(raw)
  }
  else if (exists(arcJsonPath)) {
    raw = read(arcJsonPath)
    arc = parse.json(raw)
    // HACK
    raw = parse.json.stringify(raw)
  }
  else {
    throw Error('not_found')
  }

  return {raw, arc}
}
