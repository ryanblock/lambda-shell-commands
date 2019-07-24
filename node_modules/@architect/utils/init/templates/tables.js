let nodejs = `// learn more about table streams here: https://arc.codes/primitives/tables 
exports.handler = async function subscribe(payload) {
  console.log(JSON.stringify(payload, null, 2))
  return
}`

let ruby = `# learn more about table streams here: https://arc.codes/primitives/tables
def handler(event)
  puts event
  true
end`

let python = `# learn more about table streams here: https://arc.codes/primitives/tables
def handler(event, context):
  print(event)
  print(context)
  return True`

module.exports = {nodejs, ruby, python}

