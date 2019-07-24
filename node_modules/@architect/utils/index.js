let banner = require('./banner')
let chars = require('./chars')
let fingerprint = require('./fingerprint')
let getLambdaName = require('./get-lambda-name')
let getLayers = require('./get-layers')
let getRuntime = require('./get-runtime')
let init = require('./init')
let inventory = require('./inventory')
let populateEnv = require('./populate-env')
let portInUse = require('./port-in-use')
let readArc = require('./read-arc')
let toLogicalID = require('./to-logical-id')
let validate = require('./validate')

module.exports = {
  banner,         // Prints banner and loads basic env vars and AWS creds
  chars,          // Returns platform appropriate characters for CLI UI printing
  fingerprint,    // Generates public/static.json for @static fingerprint true
  getLambdaName,  // Get Lambda name from Arc path
  getLayers,      // Get layer config from Arc file or config
  getRuntime,     // Get runtime config from Arc file or config
  init,           // Boilerplate code generator for Arc projects
  inventory,      // Get inventory of current AWS resources from Arc file
  populateEnv,    // Populate env vars from .arc-env config
  portInUse,      // Checks to see if a port is in use
  readArc,        // Reads Arc file and returns raw + parsed versions
  toLogicalID,    // Converts dash casing into Pascal casing for
  validate,       // Validates an Arc file
}
