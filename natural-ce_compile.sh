#!/bin/bash

docker build -t rh4nbuild:9.2.2 -f Dockerfile.build .
docker container rm rh4nbuild
docker run -it --rm --entrypoint '' -v./:/build --name rh4nbuild rh4nbuild:9.2.2 bash -c "cd /build; make all"
docker build -t rh4n:9.2.2 .
docker container rm -f rh4n
docker run -d --name rh4n -p8083:8080 -p2701:2700 rh4n:9.2.2
