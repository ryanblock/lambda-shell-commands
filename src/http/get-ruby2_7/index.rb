require 'json'

def handler(req, *context)
  raw = `bash -c 'compgen -c'`
  raw = raw.split("\n").sort()
  { statusCode: 200, body: JSON.generate(raw) }
end
