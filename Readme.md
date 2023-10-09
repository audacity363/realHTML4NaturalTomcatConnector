# RealHTML4Natural Tomcat connector

This repo contains a Java EE web application which allows you to use Natural as a backend for a HTTP REST API. See the [realHTML4Natural documentation]() to get familiar with the API on the backend side.

This connector handles the HTTP methods GET, POST, PUT and DELETE. All URL parameter are available trough the API. When you have multiple parameters with the same name, the value of the last one will be used.

For POST and PUT, you can send JSON data as a body payload (compressed and uncompressed). These structures can be accessed per URI or a structure in an LDA can be directly mapped.


## Build
### Prerequisite

* Java JDK >= 8
  * javac
  * jar
  * javah (only in use when using an older JDK version where `javac -h` does not exist)
* C compiler (e.g. gcc/xlc...)
* make
* ar

```
./configure && make all
```

This will build the core Framework (See [here](https://github.com/audacity363/realHTML4NaturalCore#dependencies) for more informations) and the following two objects:

* ./bin/realHTML4Natural.war
* ./bin/librealHTMLconnector.so

## Installation

1. Install the core framework following [these](https://github.com/audacity363/realHTML4NaturalCore#installation) steps.
2. Deploy the webapplication `./bin/realHTML4Natural.war` to your application server
3. Copy ./bin/librealHTMLconnector.so somewhere save. (my personal favorite `/srv/rh4n/`)
4. Set the following environment variables (this can be done globaly or application server dependend)
   - RH4NCONF: Absolute path where the config file should be saved (e.g. `/srv/rh4n/config.xml`)
   - RH4NLOG: Aboslute path to a folder where the logs should be saves (e.g. `/srv/rh4n/logs/`)
5. Append the `$JAVA_OPTS` environment variable with `-Djava.library.path=<path to folder containing librealHTMLconnector.so>`
6. Restart the application server

### Tomcat
On prestartup tomcat loads a file called `setenv.sh` located in the `bin` directory of the active installation. Here you can set up everything described above. In the next listing you can find an example of this file. Please adjust the path names to your environment.
```
> cat <path to your tomcat installation dir>/bin/setenv.sh
export RH4NCONF=/srv/rh4n/config.xml
export RH4NLOG=/srv/rh4n/logs/
export NATUSER=/srv/rh4n/librealHTML4Natural.so
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/softwareag/Natural/bin/
JAVA_OPTS="$JAVA_OPTS -Djava.library.path=/srv/rh4n/"
```

## Configuration
The connector persists its configuration in a file pointed to by the environment variable `$RH4NCONF`. You can ether edit this file manually and reload the configuration over the GUI or user entirely the GUI which is available at `<your server>/realHTML4Natural/config/`

## Architecture
### Environments
You can define multiple environments which serves the purpose when you want to call natural with different parameters.
Per environment you can specify the following:

* Character Encoding of the returned data
* Authentication
* Path to your Natural bin folder (See [here](https://github.com/audacity363/realHTML4NaturalCore#realhtml4naturalnatcaller) why this is necessary) 
* Path to the corresponding fuser
* Natural session parameter
* Environment variables which should be set before calling natural
* Mapping which URL is calling which Natural program in which library

#### Authentication 
You can protect routes via authentication. This means that you need a valid session to call a route. If this is not the case you will get an error back. Currently a method like OAuth is implemented. You can specify a server where the connector asks if the given session token is valid. The session token is expected in the Header in a field you can provide via the `Authheaderfield` property.

Example configuration data:

* Authserver: http://myserver.localdomain:8080/auth
* Authheaderfield: MyAuthToken

Example request to route which as the `login` flag set:
```
curl -s -H"MyAuthToken: 12345678" "http://localhost:8083/realHTML4Natural/nat/rh4ndemo/echo?msg=Hello%20World"
```

The connector will then make the following request to the authentication server 

```
GET /auth HTTP/1.1
Content-Type: application/json
MyAuthToken: 12345678
User-Agent: Java/17.0.8
Host: myserver.localdomain:8080
Accept: text/html, image/gif, image/jpeg, *; q=.2, */*; q=.2
Connection: keep-alive
```

and expects a response back within five seconds, HTTP status code 200 and a JSON object with at least one key named `username` with a string value which represents the username of the owner of the token. 


### Routes
Routes specify which Natural program corresponds to which URL. You can specify the following attributes:

* URL Template
* Natural Library 
* Natural Program
* Login Necessary?
* Is the route active?
* Loglevel of realHTML4Natural

#### URL template
This is the part after the environment in the final URL. You can ether specify a fully static route or one with placeholder.

A static route would be `/echo` and would match the url `http://<yourserver>/realHTML4Natural/nat/<your environment>/echo` and nothing else.

When you want to have parameters inside url URL, you can declare one with a `:` as the first character of the URL parts. `/article/:articleID` would match on `http://<yourserver>/realHTML4Natural/nat/<your environment>/article/4711` and you would have access to via the `RHGETUV` or `RHGETUO` function in natural via the name `articleID`. 

If you want to limit the value the parameter can have you can specify one or more options via a `=`.

`/article/:cmd=get|delete/:articleID` would match `http://<yourserver>/realHTML4Natural/nat/<your environment>/article/get/4711` and `http://<yourserver>/realHTML4Natural/nat/<your environment>/article/delete/4711` but not `http://<yourserver>/realHTML4Natural/nat/<your environment>/article/search/4711`.

The `|` separator function here as a OR operator.

#### Login Necessary?

The incomming request need to have a valid authentication token as described in [Authentication][Authentication]

#### Route active? 

When set to false/no this route will not be considered when search for a matching URL template.

#### Loglevel

This sets the loglevel for the realHTML4Natural framework. The logs can be found in the folder to which the environment variable `$RH4NLOG` points.

### Configurationfile structure
```
<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="realHTML4Natural">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="environment">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="route" maxOccurs="unbounded" minOccurs="0">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element type="xs:string" name="natLibrary"/>
                    <xs:element type="xs:string" name="natProgram"/>
                    <xs:element type="xs:string" name="login"/>
                    <xs:element type="xs:string" name="loglevel"/>
                    <xs:element type="xs:string" name="active"/>
                  </xs:sequence>
                  <xs:attribute type="xs:string" name="path" use="optional"/>
                </xs:complexType>
              </xs:element>
              <xs:element name="environ">
                <xs:complexType>
                  <xs:sequence>
                    <xs:element type="xs:string" name="name"/>
                    <xs:element type="xs:string" name="value"/>
                    <xs:element type="xs:string" name="append"/>
                  </xs:sequence>
                </xs:complexType>
              </xs:element>
            </xs:sequence>
            <xs:attribute type="xs:string" name="authHeaderField"/>
            <xs:attribute type="xs:string" name="authServer"/>
            <xs:attribute type="xs:string" name="name"/>
            <xs:attribute type="xs:string" name="natbinpath"/>
            <xs:attribute type="xs:string" name="natparms"/>
            <xs:attribute type="xs:string" name="natsrcpath"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
      <xs:attribute type="xs:string" name="loglevel"/>
    </xs:complexType>
  </xs:element>
</xs:schema>
```

## Update Notice
When updating from an earlier commit then 1b8e791 to 1b8e791 or higher the schema of the configuration has changed. For this purpose you find a helper page to convert your current configuration. Just open the file [config_converter.html](scripts/config_converter.html) in a semi modern browser, paste your configuration in the input textarea and click "Convert". You will find the updated configuration in the output textarea. Override your existing configuration on the server with this one and restart the application server.