let series = require('run-series')
let copyArc = require('./copy-arc')
let copyShared = require('./copy-shared')
let copyViews = require('./copy-views')
let copyStaticJSON = require('./copy-static-json')

/**
*/
module.exports = function shared(callback) {
  series([
    copyShared,
    copyViews,
    copyStaticJSON,
    copyArc,
  ], function done(err) {
    if (err) callback(err)
    else callback()
  })
}
