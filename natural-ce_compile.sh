#!/bin/bash

mkdir -p bin realHTML4NaturalCore/bin
docker build -t rh4nbuild:9.2.2 -f Dockerfile.build .
docker container rm rh4nbuild

docker run -it --name rh4nbuild rh4nbuild:9.2.2
docker cp rh4nbuild:/build/realHTML4NaturalCore/bin/librealHTML4Natural.so ./realHTML4NaturalCore/bin/librealHTML4Natural.so
docker cp rh4nbuild:/build/realHTML4NaturalCore/bin/realHTML4NaturalNatCaller ./realHTML4NaturalCore/bin/realHTML4NaturalNatCaller
docker cp rh4nbuild:/build/bin/librealHTMLconnector.so ./bin/librealHTMLconnector.so
docker cp rh4nbuild:/build/bin/realHTML4Natural.war ./bin/realHTML4Natural.war
docker container rm rh4nbuild

docker build -t rh4n:9.2.2 .
docker container rm -f rh4n
docker run -d --name rh4n -p8083:8080 -p2701:2700 -v./docker/coredumps:/mnt/wslg/dumps/ rh4n:9.2.2