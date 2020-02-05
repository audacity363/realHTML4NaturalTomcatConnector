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

RH4NCLASSPATH = ./bin/servlet/lib:./java/Connector/WebContent/WEB-INF/lib/json-20180813.jar:./java/Connector/WebContent/WEB-INF/lib/commons-io-1.3.2.jar:./java/Connector/WebContent/WEB-INF/lib/log4j-api-2.11.1.jar:./java/Connector/WebContent/WEB-INF/lib/log4j-core-2.11.1.jar:./java/Connector/WebContent/WEB-INF/lib/log4j-web-2.3.jar:./java/Connector/WebContent/WEB-INF/lib/servlet-api.jar:./java/Connector/WebContent/WEB-INF/lib/jsp-api.jar
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
all: core jniLibrary tomcatconnector_warfile 
	@printf "You find the binarys under ./bin\n"

core:
	@cd ./realHTML4NaturalCore && make all

#                         +-----------------+
#-------------------------| Tomcat Connector|----------------------------------
#                         +-----------------+

TOMCONNECTOR_SRC = ./java/Connector/src
TOMCONNECTOR_LIB_BIN = ./bin/servlet/lib

JAVA_REALHTML_AUTH_EXCEPTIONS_SRC = $(TOMCONNECTOR_SRC)/realHTML/auth/exceptions
JAVA_REALHTML_AUTH_EXCEPTIONS = $(JAVA_REALHTML_AUTH_EXCEPTIONS_SRC)/AuthException.java

JAVA_REALHTML_AUTH_OAUTH_SRC = $(TOMCONNECTOR_SRC)/realHTML/auth/oauth
JAVA_REALHTML_AUTH_OAUTH = $(JAVA_REALHTML_AUTH_OAUTH_SRC)/RealHTMLOAuth.java

JAVA_REALHTML_JSONCONVERTER_UTILS_SRC = $(TOMCONNECTOR_SRC)/realHTML/JSONConverter/utils
JAVA_REALHTML_JSONCONVERTER_UTILS = $(JAVA_REALHTML_JSONCONVERTER_UTILS_SRC)/NameStack.java

JAVA_REALHTML_JSONCONVERTER_SIGNATURES_SRC = $(TOMCONNECTOR_SRC)/realHTML/JSONConverter/signatures
JAVA_REALHTML_JSONCONVERTER_SIGNATURES = $(JAVA_REALHTML_JSONCONVERTER_SIGNATURES_SRC)/Types.java \
										 $(JAVA_REALHTML_JSONCONVERTER_SIGNATURES_SRC)/ArraySignature.java \
										 $(JAVA_REALHTML_JSONCONVERTER_SIGNATURES_SRC)/ObjectSignatureNode.java \
										 $(JAVA_REALHTML_JSONCONVERTER_SIGNATURES_SRC)/ObjectSignature.java

JAVA_REALHTML_JSONCONVERTER_SRC = $(TOMCONNECTOR_SRC)/realHTML/JSONConverter
JAVA_REALHTML_JSONCONVERTER = $(JAVA_REALHTML_JSONCONVERTER_SRC)/Rh4nArray.java \
							  $(JAVA_REALHTML_JSONCONVERTER_SRC)/Rh4nObjectArray.java \
							  $(JAVA_REALHTML_JSONCONVERTER_SRC)/Rh4nObject.java \
							  $(JAVA_REALHTML_JSONCONVERTER_SRC)/JSONConverter.java

JAVA_REALHTML_JNI_EXCEPTIONS_SRC = $(TOMCONNECTOR_SRC)/realHTML/jni/exceptions
JAVA_REALHTML_JNI_EXCEPTIONS = $(JAVA_REALHTML_JNI_EXCEPTIONS_SRC)/JNIException.java \
							   $(JAVA_REALHTML_JNI_EXCEPTIONS_SRC)/NoClientException.java

JAVA_REALHTML_JNI_NATURAL_SRC = $(TOMCONNECTOR_SRC)/realHTML/jni/natural
JAVA_REALHTML_JNI_NATURAL = $(JAVA_REALHTML_JNI_NATURAL_SRC)/ChildInformations.java \
							$(JAVA_REALHTML_JNI_NATURAL_SRC)/Message.java \
							$(JAVA_REALHTML_JNI_NATURAL_SRC)/MessageType.java

JAVA_REALHTML_JNI_SRC = $(TOMCONNECTOR_SRC)/realHTML/jni
JAVA_REALHTML_JNI = $(JAVA_REALHTML_JNI_SRC)/SessionInformations.java \
					$(JAVA_REALHTML_JNI_SRC)/ChildProcess.java \
					$(JAVA_REALHTML_JNI_SRC)/JNI.java

JAVA_REALHTML_TOMCAT_ROUTING_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/routing
JAVA_REALHTML_TOMCAT_ROUTING = $(JAVA_REALHTML_TOMCAT_ROUTING_SRC)/Route.java \
							   $(JAVA_REALHTML_TOMCAT_ROUTING_SRC)/PathType.java \
							   $(JAVA_REALHTML_TOMCAT_ROUTING_SRC)/PathTemplate.java \
							   $(JAVA_REALHTML_TOMCAT_ROUTING_SRC)/PathEntry.java \
							   $(JAVA_REALHTML_TOMCAT_ROUTING_SRC)/Routing.java

JAVA_REALHTML_SERVLET_EXCEPTIONS_SRC = $(TOMCONNECTOR_SRC)/realHTML/servlet/exceptions
JAVA_REALHTML_SERVLET_EXCEPTIONS = $(JAVA_REALHTML_SERVLET_EXCEPTIONS_SRC)/EnvironmentException.java \
								   $(JAVA_REALHTML_SERVLET_EXCEPTIONS_SRC)/EnvironmentVarException.java \
								   $(JAVA_REALHTML_SERVLET_EXCEPTIONS_SRC)/RouteException.java \
								   $(JAVA_REALHTML_SERVLET_EXCEPTIONS_SRC)/XMLException.java 

JAVA_REALHTML_TOMCAT_ENVIRONMENT_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/environment
JAVA_REALHTML_TOMCAT_ENVIRONMENT = $(JAVA_REALHTML_TOMCAT_ENVIRONMENT_SRC)/EnvironmentVar.java \
								   $(JAVA_REALHTML_TOMCAT_ENVIRONMENT_SRC)/Environment.java \
								   $(JAVA_REALHTML_TOMCAT_ENVIRONMENT_SRC)/EnvironmentBuffer.java


JAVA_REALHTML_HANDLER_PLAIN_SRC = $(TOMCONNECTOR_SRC)/realHTML/handler/plain
JAVA_REALHTML_HANDLER_PLAIN = $(JAVA_REALHTML_HANDLER_PLAIN_SRC)/RealHTMLInit.java \
							  $(JAVA_REALHTML_HANDLER_PLAIN_SRC)/RealHTMLHandler.java

JAVA_REALHTML_TOMCAT_GUI_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/gui
JAVA_REALHTML_TOMCAT_GUI = $(JAVA_REALHTML_TOMCAT_GUI_SRC)/RouteSorting.java \
						   $(JAVA_REALHTML_TOMCAT_GUI_SRC)/RouteTree.java \
						   $(JAVA_REALHTML_TOMCAT_GUI_SRC)/RealHTMLLoadConfig.java \
						   $(JAVA_REALHTML_TOMCAT_GUI_SRC)/RealHTMLManageEnvironment.java \
						   $(JAVA_REALHTML_TOMCAT_GUI_SRC)/RealHTMLManageEnvironmentVars.java \
						   $(JAVA_REALHTML_TOMCAT_GUI_SRC)/RealHTMLManageRoute.java \
						   $(JAVA_REALHTML_TOMCAT_GUI_SRC)/RealHTMLSaveConfig.java


JAVA_REALHTML_TOMCAT_XML_SRC = $(TOMCONNECTOR_SRC)/realHTML/tomcat/xml
JAVA_REALHTML_TOMCAT_XML = $(JAVA_REALHTML_TOMCAT_XML_SRC)/Export.java \
						   $(JAVA_REALHTML_TOMCAT_XML_SRC)/Import.java 


TOMCAT_SERVLETS_BIN = ./bin/servlet/servlets

WARFILE_PREFIX = ./java/Connector/WebContent

tomcatconnector_package: tomcatconnector_package_clean tomcatconnector_package_pre
	@printf "Compiling realHTML.auth.exceptions\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_AUTH_EXCEPTIONS)

	@printf "Compiling realHTML.auth.oauth\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_AUTH_OAUTH)

	@printf "Compiling realHTML.JSONConverter.utils\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_JSONCONVERTER_UTILS)

	@printf "Compiling realHTML.JSONConverter.signatures\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_JSONCONVERTER_SIGNATURES)

	@printf "Compiling realHTML.JSONConverter\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_JSONCONVERTER)

	@printf "Compiling realHTML.servlet.exceptions\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_SERVLET_EXCEPTIONS)

	@printf "Compiling realHTML.tomcat.routing\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_TOMCAT_ROUTING)

	@printf "Compiling realHTML.tomcat.environment\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_TOMCAT_ENVIRONMENT)

	@printf "Compiling realHTML.jni.exceptions\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_JNI_EXCEPTIONS)

	@printf "Compiling realHTML.jni.natural\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_JNI_NATURAL)

	@printf "Compiling realHTML.jni\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_JNI)

	@printf "Compiling realHTML.tomcat.xml\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_TOMCAT_XML)

	@printf "Compiling realHTML.handler.plain\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_HANDLER_PLAIN)

	@printf "Compiling realHTML.tomcat.gui\n"
	@$(JAVAC) -d $(TOMCONNECTOR_LIB_BIN) -cp $(CLASSPATH) $(JAVA_REALHTML_TOMCAT_GUI)

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

tomcatconnector_warfile: jniLibrary tomcatconnector_package \
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

JNI_BIN = ./bin/ws/
JNI_SRC = ./jniLibrary/src
JNI_OBJS = rh4n_jni_plain_main.o \
			  rh4n_jni_test_jsonconverter.o \
			  rh4n_jni_dumpSessionInformations.o \
			  rh4n_jni_dumpEnvirons.o \
			  rh4n_jni_callNatural.o \
			  rh4n_jni_utils.o

jniLibrary: core jni_jsonconverter jniLibrary_clean jniLibrary_pre $(JNI_OBJS)
	@printf "Linking librealHTMLconnector.so\n"
	@$(CC) $(LFLAGS1_SO) $(JNI_BIN)/*.o $(LIBS) -o ./bin/librealHTMLWSconnector.so

$(JNI_OBJS):
	@printf "CC $(JNI_SRC)/json/$*.c => $(JNI_BIN)/$*.o\n"
	@$(CC) $(CARGS_SO) -o $(JNI_BIN)/$*.o $(JNI_SRC)/$*.c

jniLibrary_pre:
	@printf "Creating jnilib output folder\n"
	@mkdir -p $(JNI_BIN)

jniLibrary_clean:
	@printf "Cleaning jniWSLibrary objects\n"
	@rm -f $(JNI_BIN)/*.o
	@printf "Cleaning librealHTMLWSConnector.so\n"
	@rm -f ./bin/librealHTMLWSConnector.so

