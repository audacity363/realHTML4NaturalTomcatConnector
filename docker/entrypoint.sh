#!/bin/bash

/srv/apache-tomcat-9.0.27/bin/catalina.sh start
exec /opt/softwareag/Natural/bin/entrypoint.sh
