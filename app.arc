@app
lambda-cmd

@aws
region us-west-1
profile personal

@http
get /nodejs12.x     # API: Lambda shell commands on AWS Linux 2 / Node 12
get /nodejs10.x     # API: Lambda shell commands on AWS Linux 2 / Node 10
get /python3.8      # API: Lambda shell commands on AWS Linux 2 / Python 3.8
get /python3.7      # API: Lambda shell commands on AWS Linux / Python 3.7
get /python3.6      # API: Lambda shell commands on AWS Linux / Python 3.6
get /ruby2.7        # API: Lambda shell commands on AWS Linux 2 / Ruby 2.7
get /ruby2.5        # API: Lambda shell commands on AWS Linux / Ruby 2.5

# TODO
# get /custom         # API: Lambda shell commands on AWS Linux 2 / Java 11
# get /java11         # API: Lambda shell commands on AWS Linux 2 / Java 11
# get /java8          # API: Lambda shell commands on AWS Linux / Java 8
# get /go1.x          # API: Lambda shell commands on AWS Linux / Go 1
# get /dotnetcore3.1  # API: Lambda shell commands on AWS Linux 2 / .NET 3.1
# get /dotnetcore2.1  # API: Lambda shell commands on AWS Linux / .NET 2.1

# EOL / retired
# get /nodejs8.10     # API: Lambda shell commands on AWS Linux / Node 8
