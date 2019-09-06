#!/bin/bash

export RH4NCONF=/srv/rh4n/config.xml
export RH4NLOG=/srv/rh4n/logs/
export NATUSER=/srv/rh4n/librealHTML4Natural.so
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/softwareag/Natural/bin/
JAVA_OPTS="$JAVA_OPTS -Djava.library.path=/srv/rh4n/"
