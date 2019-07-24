let readArcFile = require('./read-arc')

/**
 * Look for @aws pragma and try to populate AWS configuration
 */
module.exports = function populateAWS () {
  let arc
  try {
    let parsed = readArcFile()
    arc = parsed.arc

    // Attempt to load and populate AWS_REGION + AWS_PROFILE
    if (arc && arc.aws) {
      let region = arc.aws.find(e=> e[0] === 'region')
      let profile = arc.aws.find(e=> e[0] === 'profile')

      if (region) {
        process.env.AWS_REGION = region[1]
      }

      if (profile) {
        process.env.AWS_PROFILE = profile[1]
      }
    }
  }
  catch(e) {
    if (e.message != 'not_found') {
      // Don't exit process here even if .arc isn't found; caller should be responsible (via ./read-arc)
      console.log(e)
    }
  }
}
