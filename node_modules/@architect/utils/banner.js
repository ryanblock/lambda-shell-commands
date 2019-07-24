let populateArc = require('./populate-arc')
let populateAWS = require('./populate-aws')
let chalk = require('chalk')
let chars = require('./chars')

module.exports = function printBanner(params) {
  params = params || {}
  if (process.env.QUIET || params.disableBanner) null
  else {
    // Boilerplate
    let log = (label, value) => console.log(chalk.grey(`${label.padStart(12)} ${chars.buzz}`), chalk.cyan(value))

    // Populate config
    populateArc()
    populateAWS()

    // App name
    let name = process.env.ARC_APP_NAME || 'Architect project manifest not found'
    log('app', name)

    // Region + profile
    let region = process.env.AWS_REGION || '@aws region / AWS_REGION not configured'
    let profile = process.env.AWS_PROFILE || '@aws profile / AWS_PROFILE not configured'
    if (!params.disableRegion) {
      log('region', region)
    }
    if (!params.disableProfile) {
      log('profile', profile)
    }

    // Caller version
    let {version} = params
    version = version || '–'
    log('version', version)

    // cwd
    log('cwd', process.cwd())

    // Space
    console.log()
  }
}
