/**
 * @param {string} runtime - string that starts with: node, python, ruby
 * @returns {string} one of: js, py or rb
 */
module.exports = function getExtension(runtime) {
  if (runtime.startsWith('node')) return 'js'
  if (runtime.startsWith('python')) return 'py'
  if (runtime.startsWith('ruby')) return 'rb'
  throw Error('invalid runtime')
}
