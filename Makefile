#CC = /usr/vac/bin/xlc
CC = gcc
AR = /usr/bin/ar
JAR = jar
#JAR = /SAG/cjp/v16/bin/jar
#JAVAC = /SAG/cjp/v16/bin/javac
JAVAC = javac
#JAVAH = /SAG/cjp/v16/bin/javah
JAVAH = javah
#XLC: #LFLAGS1_SO = -G
#LFLAGS2_SO = 

#GCC:
LFLAGS1_SO = -shared 
LFLAGS2_SO = 

TOMCAT_INSTALLATION = /home/tom/Documents/Java/apache-tomcat-9.0.16
#TOMCAT_INSTALLATION = /opt/tomcat/apache-tomcat-8.5.24

TOMCATCLASSPATH = $(TOMCAT_INSTALLATION)/lib/servlet-api.jar:$(TOMCAT_INSTALLATION)/lib/jsp-api.jar
RH4NCLASSPATH = ./bin/servlet/lib:./java/Connector/WebContent/WEB-INF/lib/realHTMLconnector.jar:./java/Connector/WebContent/WEB-INF/lib/minimal-json-0.9.5.jar:./java/Connector/WebContent/WEB-INF/lib/commons-io-1.3.2.jar
CLASSPATH = "$(TOMCATCLASSPATH):$(RH4NCLASSPATH)"

#JNIINCLUDE = -I/usr/java8_64/include/ -I/usr/java8_64/include//linux/
JNIINCLUDE = -I/usr/lib/jvm/java-8-openjdk-amd64/include/ -I/usr/lib/jvm/java-8-openjdk-amd64/include/linux


INCLUDE = -I./realHTML4NaturalCore/include/ \
		  -I./realHTML4NaturalCore/libs/rh4n_utils/include \
          -I./realHTML4NaturalCore/libs/rh4n_logging/include/ \
		  -I./realHTML4NaturalCore/libs/rh4n_vars/include/ \
		  -I./realHTML4NaturalCore/libs/rh4n_jsongenerator/include/ \
		  -I./realHTML4NaturalCore/libs/rh4n_ldaparser/include/ \
		  -I./realHTML4NaturalCore/libs/rh4n_var2name/include/ \
		  -I./realHTML4NaturalCore/libs/rh4n_messaging/include/ \
		  -I./jniLibrary/include/ \
		  -I./jniLibrary/libs/rh4n_jni_jsonconverter/include \
		  $(JNIINCLUDE)

LIBS = -L./realHTML4NaturalCore/bin/libs -L./bin/libs \
	   -ldl -lrh4nmessaging -lrh4njnijsonconverter -lrh4nutils -lrh4nlogging -lrh4nvar2name -lrh4nvars -lrh4nldaparser \
	   -lrh4njsongenerator -lcrypt -lrh4nlogging

#XLC:
#CARGS1 = -g -c -fpic $(INCLUDE)
#CARGS2 = 
#CARGS_SO = -c -g -fpic $(INCLUDE)

#GCC:
CARGS1 = -g -c -fpic $(INCLUDE)
CARGS2 = 
CARGS_SO = -c -g -fpic $(INCLUDE)

help:
	@printf "Targets:\n"
	@printf "\t+----------------------------CORE:---------------------------+\n"
	@printf "\t| core                                                       |\n"
	@printf "\t|   realHTML4Natural Core (./realHTML4NaturalCore)           |\n"
	@printf "\t+------------------------------------------------------------+\n\n"
	@printf "\t+--------------------------Tomcat:---------------------------+\n"
	@printf "\t| tomcatconnector_package                                    |\n"
	@printf "\t|   Utils for the servlet                                    |\n"
	@printf "\t|                                                            |\n"
	@printf "\t| tomcatconnector_servlet                                    |\n"
	@printf "\t|   Servlet which handels requests                           |\n"
	@printf "\t|                                                            |\n"
	@printf "\t| tomcatconnector_warfile                                    |\n"
	@printf "\t|   Creates a deployable warfile                             |\n"
	@printf "\t+------------------------------------------------------------+\n"
	@printf "\t| jnilibrary                                                 |\n"
	@printf "\t|   JNI library required by the servlet                      |\n"
	@printf "\t|                                                            |\n"
	@printf "\t| jniheader                                                  |\n"
	@printf "\t|   Generates JNI header file required by the JNI Library    |\n"
	@printf "\t+------------------------------------------------------------+\n\n"
	@printf "\tall: Compiles everything\n" 
all: core jnilibrary tomcatconnector_warfile 
	@printf "You find the binarys under ./bin\n"

core:
	@cd ./realHTML4NaturalCore && make all

#                         +-----------------+
#-------------------------| Tomcat Connector|----------------------------------
#                         +-----------------+

TOMCONNECTOR_SRC = ./java/Connector/src
TOMCONNECTOR_LIB_BIN = ./bin/servlet/lib

JAVA_JSON_PARSER_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/JSONMatcher
JAVA_JSON_PARSER =  $(JAVA_JSON_PARSER_SRC)/JSONArrayException.java \
					$(JAVA_JSON_PARSER_SRC)/JSONObjectException.java \
					$(JAVA_JSON_PARSER_SRC)/TypeException.java \
					$(JAVA_JSON_PARSER_SRC)/Types.java \
					$(JAVA_JSON_PARSER_SRC)/ArrayType.java \
					$(JAVA_JSON_PARSER_SRC)/JSONUtils.java \
					$(JAVA_JSON_PARSER_SRC)/LLNode.java \
					$(JAVA_JSON_PARSER_SRC)/LLHandler.java \
					$(JAVA_JSON_PARSER_SRC)/JSONObject.java \
					$(JAVA_JSON_PARSER_SRC)/JSONArray.java \
					$(JAVA_JSON_PARSER_SRC)/PrintFuncs.java \
					$(JAVA_JSON_PARSER_SRC)/JSONParser.java

JAVA_UTILS_PACKAGE_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/connector
JAVA_UTILS_PACKAGE = $(JAVA_UTILS_PACKAGE_SRC)/Environ.java \
					 $(JAVA_UTILS_PACKAGE_SRC)/RH4NReturn.java \
					 $(JAVA_UTILS_PACKAGE_SRC)/RH4NParams.java \
					 $(JAVA_UTILS_PACKAGE_SRC)/JNINatural.java \
					 $(JAVA_UTILS_PACKAGE_SRC)/JNILoader.java \
					 $(JAVA_UTILS_PACKAGE_SRC)/RH4NCallParms.java 

JAVA_UTILS_EXCEPTIONS_SRC = $(TOMCONNECTOR_SRC)/realHTML/servlet/exceptions
JAVA_UTILS_EXCEPTIONS = $(JAVA_UTILS_EXCEPTIONS_SRC)/RouteException.java \
						$(JAVA_UTILS_EXCEPTIONS_SRC)/EnvironmentException.java \
						$(JAVA_UTILS_EXCEPTIONS_SRC)/EnvironmentVarException.java \
						$(JAVA_UTILS_EXCEPTIONS_SRC)/XMLException.java

JAVA_ROUTING_PACKAGE_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/routing
JAVA_ROUTING_PACKAGE = $(JAVA_ROUTING_PACKAGE_SRC)/Route.java \
					   $(JAVA_ROUTING_PACKAGE_SRC)/PathType.java \
					   $(JAVA_ROUTING_PACKAGE_SRC)/PathEntry.java \
					   $(JAVA_ROUTING_PACKAGE_SRC)/PathTemplate.java \
					   $(JAVA_ROUTING_PACKAGE_SRC)/Routing.java 

JAVA_ENVIRONMENT_PACKAGE_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/environment
JAVA_ENVIRONMENT_PACKAGE = $(JAVA_ENVIRONMENT_PACKAGE_SRC)/EnvironmentVar.java \
						   $(JAVA_ENVIRONMENT_PACKAGE_SRC)/Environment.java \
						   $(JAVA_ENVIRONMENT_PACKAGE_SRC)/EnvironmentBuffer.java

JAVA_XML_PACKAGE_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/xml
JAVA_XML_PACKAGE = $(JAVA_XML_PACKAGE_SRC)/Export.java \
				   $(JAVA_XML_PACKAGE_SRC)/Import.java

JAVA_GUI_PACKAGE_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/gui
JAVA_GUI_PACKAGE = $(JAVA_GUI_PACKAGE_SRC)/RouteTree.java \
				   $(JAVA_GUI_PACKAGE_SRC)/RouteSorting.java

JAVA_AUTH_PACKAGE_SRC = $(TOMCONNECTOR_SRC)/realHTML/auth
JAVA_AUTH_PACKAGE = $(JAVA_AUTH_PACKAGE_SRC)/exceptions/AuthException.java \
					$(JAVA_AUTH_PACKAGE_SRC)/oauth/RealHTMLOAuth.java

TOMCAT_SERVLETS = $(TOMCONNECTOR_SRC)/RealHTMLInit.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLHandler.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLLogin.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLLogout.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLLoadConfig.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLManageEnvironment.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLManageEnvironmentVars.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLManageRoute.java \
				  $(TOMCONNECTOR_SRC)/RealHTMLSaveConfig.java


TOMCAT_SERVLETS_BIN = ./bin/servlet/servlets

WARFILE_PREFIX = ./java/Connector/WebContent

tomcatconnector_package: tomcatconnector_package_clean tomcatconnector_package_pre
	@printf "Compiling realHTML.servlet.exceptions\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_UTILS_EXCEPTIONS)

	@printf "Compiling realHTML.tomcat.JSONMatcher\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_JSON_PARSER)

	@printf "Compiling realHTML.tomcat.routing\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_ROUTING_PACKAGE)

	@printf "Compiling realHTML.tomcat.environment\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_ENVIRONMENT_PACKAGE)

	@printf "Compiling realHTML.tomcat.xml\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_XML_PACKAGE)

	@printf "Compiling realHTML.tomcat.gui\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_GUI_PACKAGE)

	@printf "Compiling realHTML.auth\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_AUTH_PACKAGE)

	@printf "Compiling realHTML.tomcat.connector\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_UTILS_PACKAGE)

	@printf "Creating realHTMLconnector.jar\n"
	@cd $(TOMCONNECTOR_LIB_BIN) && jar cf ../../../java/Connector/WebContent/WEB-INF/lib/realHTMLconnector.jar ./realHTML
	
tomcatconnector_package_pre:
	@printf "Creating tomcatconnector package output folder\n"
	@mkdir -p $(TOMCONNECTOR_LIB_BIN)

tomcatconnector_package_clean:
	@printf "Cleaning tomcatconnector package\n"
	@rm -rf $(TOMCONNECTOR_LIB_BIN)
	@printf "Cleaning realHTMLconnector.jar\n"
	@rm -f ./servlet/web/WEB-INF/lib/realHTMLconnector.jar

tomcatconnector_servlet: tomcatconnector_package tomcatconnector_servlet_clean tomcatconnector_servlet_pre
	@printf "Compiling servlets\n"
	@$(JAVAC) -d $(TOMCAT_SERVLETS_BIN) -cp $(CLASSPATH) $(TOMCAT_SERVLETS)
	@printf "Copying servlet classes into warfile\n"
	@cp $(TOMCAT_SERVLETS_BIN)/*.class $(WARFILE_PREFIX)/WEB-INF/classes/

tomcatconnector_servlet_pre:
	@printf "Creating servlets output folder\n"
	@mkdir -p $(TOMCAT_SERVLETS_BIN)

tomcatconnector_servlet_clean:
	@printf "Cleaning servlets\n"
	@rm -rf $(TOMCAT_SERVLETS_BIN)
	@printf "Cleaning servlets in warfile\n"
	@rm -f $(WARFILE_PREFIX)/WEB-INF/classes/*.class

tomcatconnector_warfile: jnilibrary tomcatconnector_package tomcatconnector_servlet \
						 tomcatconnector_warfile_pre tomcatconnector_warfile_clean
	@printf "Creating realHTML4Natural.war\n"
	@cd $(WARFILE_PREFIX); $(JAR) cvf ../../../bin/realHTML4Natural.war .

tomcatconnector_warfile_pre:
	@printf "Creating warfile output folder\n"
	@mkdir -p ./bin
	
tomcatconnector_warfile_clean:
	@printf "Cleaning warfile\n"
	@rm -f ./bin/realHTML4Natural.war

#                         +-----------------+
#-------------------------|   JNI library   |----------------------------------
#                         +-----------------+

JNI_JSON_HANDLERS = json_utils.o plain_handlers.o 1d_handlers.o \
					2d_handlers.o 3d_handlers.o handlers.o json_main.o

JNI_NAT_HANDLERS = rh4n_nat_parmgeneration.o rh4n_natcall_process.o rh4n_nat_errorhandling.o

JNI_MEMBER = rh4n_jni_main.o rh4n_jni_passwd.o rh4n_jni_javaParmReadout.o rh4n_jni_environ.o

JNI_BIN = ./bin/jnilib
JNI_SRC = ./jniLibrary/src

jnilibrary: core jniheader jnilibrary_clean jnilibrary_pre $(JNI_JSON_HANDLERS) $(JNI_NAT_HANDLERS) $(JNI_MEMBER)
	@printf "Linking librealHTMLconnector.so\n"
	@$(CC) $(LFLAGS1_SO) $(JNI_BIN)/*.o $(LIBS) -o ./bin/librealHTMLconnector.so

$(JNI_MEMBER):
	@printf "CC $(JNI_SRC)/$*.c => $(JNI_BIN)/$*.o\n"
	@$(CC) $(CARGS_SO) -o $(JNI_BIN)/$*.o $(JNI_SRC)/$*.c

$(JNI_JSON_HANDLERS):
	@printf "CC $(JNI_SRC)/json/$*.c => $(JNI_BIN)/$*.o\n"
	@$(CC) $(CARGS_SO) -o $(JNI_BIN)/$*.o $(JNI_SRC)/json/$*.c

$(JNI_NAT_HANDLERS):
	@printf "CC $(JNI_SRC)/natural/$*.c => $(JNI_BIN)/$*.o\n"
	@$(CC) $(CARGS_SO) -o $(JNI_BIN)/$*.o $(JNI_SRC)/natural/$*.c

jniheader: tomcatconnector_package
	@printf "Generating JNI headerfile\n"
	@cd $(TOMCONNECTOR_LIB_BIN); $(JAVAH) -jni \
		-o ../../../jniLibrary/include/realHTML_tomcat_connector_JNINatural.h \
		realHTML.tomcat.connector.JNINatural

jnilibrary_pre:
	@printf "Creating jnilib output folder\n"
	@mkdir -p $(JNI_BIN)

jnilibrary_clean:
	@printf "Cleaning jnilibrary objects\n"
	@rm -f $(JNI_BIN)/*.o
	@printf "Cleaning librealHTMLConnector.so\n"
	@rm -f ./bin/librealHTMLConnector.so



#                         +-----------------+
#-------------------------| new JNI library |----------------------------------
#                         +-----------------+

JNI_LIBOUTPUT = ./bin/libs

JNI_LIB_JSONCONVERTER_BIN = ./bin/libs/jsonconverter
JNI_LIB_JSONCONVERTER_SRC = ./jniLibrary/libs/rh4n_jni_jsonconverter/src
JNI_LIB_JSONCONVERTER_OBJS = rh4n_jni_jsonconverter.o \
							 rh4n_jni_jsonconverter_init.o \
							 rh4n_jni_jsonconverter_array.o \
							 rh4n_jni_jsonconverter_valueHandling.o
JNI_LIB_JSONCONVERTER = librh4njnijsonconverter.a

jni_jsonconverter: jni_jsonconverter_clean jni_jsonconverter_pre $(JNI_LIB_JSONCONVERTER_OBJS)
	@printf "Creating $(JNI_LIBOUTPUT)/$(JNI_LIB_JSONCONVERTER)\n"
	@$(AR) -cr $(JNI_LIBOUTPUT)/$(JNI_LIB_JSONCONVERTER) $(JNI_LIB_JSONCONVERTER_BIN)/*.o
	@printf "Done compiling and linking jni jsonconverter\n"

$(JNI_LIB_JSONCONVERTER_OBJS):
	@printf "CC $(JNI_LIB_JSONCONVERTER_SRC)/$*.c => $(JNI_LIB_JSONCONVERTER_BIN)/$*.o\n"
	@$(CC) $(CARGS_SO) -o $(JNI_LIB_JSONCONVERTER_BIN)/$*.o $(JNI_LIB_JSONCONVERTER_SRC)/$*.c 

jni_jsonconverter_pre:
	@printf "Creating jsonconverter output folder\n"
	@mkdir -p $(JNI_LIB_JSONCONVERTER_BIN)
	@mkdir -p $(JNI_LIBOUTPUT)

jni_jsonconverter_clean:
	@printf "Cleaning jni jsonconverter library\n"
	@rm -f $(LIBOUTPUT)/$(JNI_LIB_JSONCONVERTER)
	@printf "Cleaning jni jsonconverter objects\n"
	@rm -f $(JNI_LIB_JSONCONVERTER_BIN)/*.o

JNI_WS_BIN = ./bin/ws/
JNI_WS_SRC = ./jniLibrary/src
JNI_WS_OBJS = rh4n_jni_plain_main.o \
			  rh4n_jni_test_jsonconverter.o \
			  rh4n_jni_dumpSessionInformations.o \
			  rh4n_jni_dumpEnvirons.o \
			  rh4n_jni_callNatural.o \
			  rh4n_jni_utils.o

jniWSLibrary: core jni_jsonconverter jniWSLibrary_clean jniWSLibrary_pre $(JNI_WS_OBJS)
	@printf "Linking librealHTMLWSconnector.so\n"
	@$(CC) $(LFLAGS1_SO) $(JNI_WS_BIN)/*.o $(LIBS) -o ./bin/librealHTMLWSconnector.so

$(JNI_WS_OBJS):
	@printf "CC $(JNI_WS_SRC)/json/$*.c => $(JNI_WS_BIN)/$*.o\n"
	@$(CC) $(CARGS_SO) -o $(JNI_WS_BIN)/$*.o $(JNI_WS_SRC)/$*.c

jniWSLibrary_pre:
	@printf "Creating jniWSlib output folder\n"
	@mkdir -p $(JNI_WS_BIN)

jniWSLibrary_clean:
	@printf "Cleaning jniWSLibrary objects\n"
	@rm -f $(JNI_WS_BIN)/*.o
	@printf "Cleaning librealHTMLWSConnector.so\n"
	@rm -f ./bin/librealHTMLWSConnector.so

