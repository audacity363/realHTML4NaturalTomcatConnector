#!/bin/bash

/opt/tomcat/apache-tomcat-9.0.31/bin/catalina.sh stop
cp bin/realHTML4Natural.war /opt/tomcat/apache-tomcat-9.0.31/webapps/
cp bin/librealHTMLconnector.so /opt/rh4n/
cp realHTML4NaturalCore/bin/librealHTML4Natural.so /opt/rh4n/
cp realHTML4NaturalCore/bin/realHTML4NaturalNatCaller /opt/softwareag/Natural/bin/
/opt/tomcat/apache-tomcat-9.0.31/bin/catalina.sh start
