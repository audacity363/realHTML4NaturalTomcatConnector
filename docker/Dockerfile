FROM store/softwareag/natural-ce:9.1.1
user root

RUN usermod -u 1000 sagadmin

RUN find /opt -user 1724 -exec chown -h  sagadmin {} \;
RUN find /home -user 1724 -exec chown -h  sagadmin {} \;

RUN yum -y update && yum -y install java-1.8.0-openjdk
RUN mkdir -p /srv/rh4n/logs

RUN chown sagadmin:sagadmin /srv/rh4n

COPY ./realHTML4NaturalCore/bin/librealHTML4Natural.so /srv/rh4n/librealHTML4Natural.so
COPY ./realHTML4NaturalCore/bin/realHTML4NaturalNatCaller /opt/softwareag/Natural/bin/realHTML4NaturalNatCaller
COPY ./docker/config.xml /srv/rh4n/config.xml

RUN curl "http://ftp.fau.de/apache/tomcat/tomcat-9/v9.0.24/bin/apache-tomcat-9.0.24.tar.gz" -o /tmp/tomcat.tar.gz
RUN tar -C /srv -xf /tmp/tomcat.tar.gz

COPY ./bin/realHTML4Natural.war /srv/apache-tomcat-9.0.24/webapps/realHTML4Natural.war
COPY ./bin/librealHTMLconnector.so /srv/rh4n/librealHTMLconnector.so

COPY ./docker/setenv.sh /srv/apache-tomcat-9.0.24/bin/setenv.sh
COPY ./docker/entrypoint.sh /srv/entrypoint.sh

ENV ACCEPT_EULA=Y

RUN chown -R sagadmin:sagadmin /srv/*

RUN chown -R sagadmin:sagadmin /opt/softwareag/Natural/fuser

user sagadmin

ENTRYPOINT bash /srv/entrypoint.sh
