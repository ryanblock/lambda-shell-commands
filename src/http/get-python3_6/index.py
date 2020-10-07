import json
import os
import re

def handler(request, context):
  command = 'compgen -c'
  result = os.popen(command).read()
  result = re.split('\n', result)
  result.sort()
  return result
