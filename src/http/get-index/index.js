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
  let AWSLinux2URL = process.env.ENDPOINT + '/aws-linux-2'
  let AMI201803URL = process.env.ENDPOINT + '/ami-2018-03'
  let AWSLinux2
  let AMI201803
  try {
    AWSLinux2 = await tiny.get({url: AWSLinux2URL})
    AMI201803 = await tiny.get({url: AMI201803URL})
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
  let AWSLinux2Results = Array.from(new Set(AWSLinux2.body))
  AWSLinux2Results.shift()
  AWSLinux2Results.map((cmd,i) => {
    AWSLinux2Results[i] = '- `' + cmd + '`'
  })
  let AMI201803Results = Array.from(new Set(AMI201803.body))
  AMI201803Results.shift()
  AMI201803Results.map((cmd,i) => {
    AMI201803Results[i] = '- `' + cmd + '`'
  })

  // Intended for local dev!
  let template = path.join(cwd, '..', '..', '..', '_readme.tmpl')
  let readme = fs.readFileSync(template).toString()
  let date = new Date(Date.now()).toISOString()
  let dated = readme.replace('LAST_UPDATED', date)
  let final = dated.replace('$AWS_LINUX_2_SHELL_COMMANDS', AWSLinux2Results.join('\n'))
                   .replace('$AMI_2018_03_SHELL_COMMANDS', AMI201803Results.join('\n'))
  fs.writeFileSync(path.join(cwd, '..', '..', '..', 'readme.md'), final)
  return {
    type: 'text/html; charset=utf8',
    body: 'Success!'
  }
}
