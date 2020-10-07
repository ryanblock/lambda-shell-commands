import json
import os
import re

def handler(request, context):
  command = 'compgen -c'
  result = os.popen(command).read()
  result = re.split('\n', result)
  result.sort()
  headers = {'content-type': 'application/json; charset=utf8'}
  body = json.dumps(result)
  return {'headers': headers, 'body': body}
