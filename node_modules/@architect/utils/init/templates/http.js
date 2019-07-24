let nodejs = `// learn more about http functions here: https://arc.codes/primitives/http
exports.handler = async function http(req) {
  return {
    headers: {'content-type': 'text/html; charset=utf8'}, 
    body: '<b>hello world</b> from nodejs'
  }
}`

let ruby = `# learn more about http functions here: https://arc.codes/primitives/http
def handler(req)
  {headers: {'content-type': 'text/html'}, body: '<b>hello world</b> from ruby'}
end`

let python = `# learn more about http functions here: https://arc.codes/primitives/http
def handler(req, context):
  return {'headers': {'content-type': 'text/html'}, 'body': '<b>hello world</b> from python'}`

module.exports = {nodejs, ruby, python}
