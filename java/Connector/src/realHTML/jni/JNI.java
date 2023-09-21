package realHTML.jni;

import realHTML.JSONConverter.signatures.ObjectSignature;
import realHTML.jni.exceptions.SocketClosedException;

//import org.apache.tomcat.jni.Library;

import realHTML.tomcat.environment.EnvironmentVar;

public class JNI {

	static {
		//Library.load("/home/tom/Documents/Java/websockets/c/librealHTMLconnector.so");
		//System.load(System.getProperty("user.dir") + "/../../bin/librealHTMLWSconnector.so");
        System.loadLibrary("realHTMLconnector");
	}
	
	native ChildProcess jni_startNatural(SessionInformations infos, String httpMethod, String naturalbinpath, EnvironmentVar[] environs, ObjectSignature urlvars, ObjectSignature bodyvars);
	native ChildProcess jni_getChildProcessStatus(int pid);
	native boolean jni_checkForNewMessage(int udsClient);
	native String jni_recvMessage(int udsClient);
	
	public ChildProcess startNaturalPlain(SessionInformations infos, String httpMethod, String naturalbinpath, EnvironmentVar[] environs, ObjectSignature urlvars, ObjectSignature bodyvars) {
		return(this.jni_startNatural(infos, httpMethod, naturalbinpath, environs, urlvars, bodyvars));
	}
	
	public ChildProcess startNaturalWs(SessionInformations infos, String naturalbinpath, EnvironmentVar[] environs, ObjectSignature urlvars) {
		return(this.jni_startNatural(infos, "get", naturalbinpath, environs, urlvars, null));
	}
	
	public ChildProcess getChildProcessStatus(int pid) {
		return(this.jni_getChildProcessStatus(pid));
	}
	
	public boolean checkForNewMessage(int udsClient) {
		return(this.jni_checkForNewMessage(udsClient));
	}
	
	public String recvMessage(int udsClient) throws SocketClosedException{
		return(this.jni_recvMessage(udsClient));
	}
}
