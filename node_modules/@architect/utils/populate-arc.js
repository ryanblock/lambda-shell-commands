let readArcFile = require('./read-arc')

/**
 * Try to populate basic Architect project configuration
 */
module.exports = function populateAWS () {
  let arc
  try {
    let parsed = readArcFile()
    arc = parsed.arc
    process.env.ARC_APP_NAME = arc.app[0]
  }
  catch(e) {
    if (e.message != 'not_found') {
      // Don't exit process here even if .arc isn't found; caller should be responsible (via ./read-arc)
      console.log(e)
    }
  }
}
