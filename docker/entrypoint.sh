#!/bin/bash

ulimit -c unlimited
/srv/apache-tomcat-9.0.80/bin/catalina.sh start
exec /opt/softwareag/Natural/bin/entrypoint.sh
