#!/bin/bash

docker build -t rh4n:9.2.2 --progress=plain . 2>&1 | stdbuf --output=L awk -f scripts/filterBuildOutput.awk
if [[ "${PIPESTATUS[0]}" != "0" ]]; then
    cat build.log;
    exit 1;
fi

docker rm -f rh4n
docker run -d --name rh4n -p8083:8080 -p2701:2700 -v./docker/coredumps:/mnt/wslg/dumps/ rh4n:9.2.2