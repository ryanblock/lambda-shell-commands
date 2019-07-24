let fs = require('fs')

module.exports = function writeArcConfig({configPath, runtime}, callback) {
  let config = `@aws
runtime ${runtime}
# timeout 30
# concurrency 1
# memory 1152
`
  fs.writeFile(configPath, config, callback)
}
