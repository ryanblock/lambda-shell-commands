let inventory = require('@architect/inventory')

module.exports = async function getRuntimes () {
  let { inv } = await inventory()
  let runtimes = inv.http.map(({ arcStaticAssetProxy, name }) => {
    if (!arcStaticAssetProxy) return name.split('get /')[1]
  }).filter(Boolean).sort()
  return runtimes
}
