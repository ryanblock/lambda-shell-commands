let { join } = require('path')
let { readFileSync, writeFileSync } = require('fs')

let date = new Date().toISOString()
let cwd = process.cwd()
let template = name => {
  let file = join(cwd, 'src', 'templates', `${name}.md`)
  let template = readFileSync(file).toString()
  return template
}
let write = (filename, file) => {
  writeFileSync(filename, file)
  console.log(`Successfully updated ${filename.replace(cwd, '')}`)
}

module.exports = function writeResults ({ results, dirty }, runtimes) {

  // Update readme
  let tmpl = template('readme')
  let links = runtimes.map(r => `### → [\`${r}\`](./_${r}.md)`).join('\n')
  let file = tmpl
    .replace('$LAST_UPDATED', date)
    .replace('$LINKS', links)
  let filename = join(cwd, 'readme.md')
  write(filename, file)

  // Update the individual runtime files
  dirty.forEach(runtime => {
    let { cmds, versions } = results[runtime]
    let commands = cmds
      .map(cmd => `- \`${cmd}\``)
      .join('\n')
    let ver = versions
      ? `\n## Runtime version\n\n${versions.map(({ name, version }) => `**${name}**: ${version}`).join('\n\n')}\n`
      : ''

    // Write each
    let tmpl = template('results')
    let file = tmpl
      .replace('$RUNTIME', runtime)
      .replace('$LAST_UPDATED', date)
      .replace('$AWS_REGION', process.env.AWS_REGION)
      .replace('$VERSIONS', ver)
      .replace(`$SHELL_COMMANDS`, commands)
    let filename = join(cwd, `_${runtime}.md`)
    write(filename, file)
  })
}
