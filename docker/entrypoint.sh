#!/bin/bash

/srv/apache-tomcat-9.0.24/bin/catalina.sh start
exec /opt/softwareag/Natural/bin/entrypoint.sh
