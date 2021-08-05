require 'json'

def handler(req, *context)
  raw = `bash -c 'compgen -c'`
  raw = raw.split("\n").sort()
  { cmds: raw }
end
