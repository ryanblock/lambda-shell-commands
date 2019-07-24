let cp = require('cpr')
// local helper to cleanup the cpr sig
module.exports = function copy(source, destination, callback) {
  cp(source, destination, {overwrite: true}, function done(err) {
    if (err) callback(err)
    else callback()
  })
}
