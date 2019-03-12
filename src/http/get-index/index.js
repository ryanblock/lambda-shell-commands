let fs = require('fs')
let path = require('path')
let tiny = require('tiny-json-http')

exports.handler = async function http() {
  // This path intended to be run locally so we can write out the results and publish to git
  if (process.env.NODE_ENV !== 'testing') {
    return {
      type: 'text/html; charset=utf8',
      body: 'Please hit this route locally with a valid process.env.ENDPOINT running Lambda'
    }
  }

  let cwd = process.cwd()
  let url = process.env.ENDPOINT + '/commands'
  let result
  try {
    result = await tiny.get({url})
  }
  catch (e) {
    console.log(e)
    return {
      code: 500,
      type: 'text/html; charset=utf8',
      body: `Uh oh, something failed.\n${e}`
    }
  }

  // Prep results
  let results = Array.from(new Set(result.body))
  results.shift()
  results.map((cmd,i) => {
    results[i] = '- `' + cmd + '`'
  })

  // Intended for local dev!
  let template = path.join(cwd, '..', '..', '..', '_readme.tmpl')
  let readme = fs.readFileSync(template).toString()
  let date = new Date(Date.now()).toISOString()
  let dated = readme.replace('LAST_UPDATED', date)
  let final = dated.replace('SHELL_COMMANDS', results.join('\n'))
  fs.writeFileSync(path.join(cwd, '..', '..', '..', 'readme.md'), final)
  return {
    type: 'text/html; charset=utf8',
    body: 'Success!'
  }
}
