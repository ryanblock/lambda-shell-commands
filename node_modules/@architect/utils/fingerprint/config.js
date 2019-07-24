module.exports = function fingerprintConfig ({static=[]}) {
  // Maybe enable fingerprint
  let fingerprint = false
  if (static.some(s => {
    if (!s[0]) return false
    if (s.includes('fingerprint') && (s.includes(true) || s.includes('enabled') || s.includes('on'))) return true
    return false
  })) {fingerprint = true}

  // Collect any strings to match against for ignore
  let ignore = static.find(s => s['ignore'])
  if (ignore) {ignore = Object.getOwnPropertyNames(ignore.ignore)}
  else ignore = []

  return {fingerprint, ignore}
}
