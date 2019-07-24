let nodejs = `// learn more about queue functions here: https://arc.codes/primitives/queues 
exports.handler = async function subscribe(payload) {
  console.log(JSON.stringify(payload, null, 2))
  return
}`

let ruby = `# learn more about queue functions here: https://arc.codes/primitives/queues
def handler(event)
  puts event
  true
end`

let python = `# learn more about queue functions here: https://arc.codes/primitives/queues
def handler(event, context):
  print(event)
  print(context)
  return True`

module.exports = {nodejs, ruby, python}

