let fs = require('fs')
let http = require('./templates/http')
let events = require('./templates/events')
let queues = require('./templates/queues')
let ws = require('./templates/ws')
let scheduled = require('./templates/scheduled')
let tables = require('./templates/tables')

module.exports = function writeCode({fullPath, type, runtime}, callback) {
  let types = {http, events, queues, ws, scheduled, tables}
  let run = runtime.split(/\d/)[0]
  let body = types[type][run]
  fs.writeFile(fullPath, body, callback)
}
