#!/bin/bash

cd ${BASH_SOURCE%/*}

mkdir -p ./dumps

docker-compose exec db pg_dump -U postgres --clean db > ./dumps/db_$(date '+%Y_%m_%d_%H_%M').dump