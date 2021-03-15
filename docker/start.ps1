$scriptDir = Split-Path -Path $MyInvocation.MyCommand.Definition

docker-compose up -f $scriptDir\docker-compose.yml --build -d