

import realHTML.JSONConverter.JSONConverter;
import realHTML.JSONConverter.signatures.ObjectSignature;
import realHTML.jni.JNI;
import realHTML.jni.SessionInformations;
import realHTML.tomcat.environment.EnvironmentVar;

public class Test {
	
	static {
		System.out.println(System.getProperty("user.dir"));
		System.load(System.getProperty("user.dir") + "/bin/librealHTMLconnector.so");
	}
	
	public static native int devDumpJSONConverterValues(ObjectSignature sig);
//	public static native void arrayTest(int[] arr);
//	public static native int startPlainNatural(SessionInformations sessionInformations, String httpMethod, String natbin, ObjectSignature urlvars, ObjectSignature bodyvars);
//
//	public static void main(String[] args) {
//		JSONConverter conv = new JSONConverter("{\"test4\": false, \"test5\": 12, \"test1\": [\"Hello World\"], \"test2\": [1, 2], \"test3\": {\"test31\":\"Hello\"}  }");
//		
//		try {
//			ObjectSignature sig = conv.parse();
//			devDumpJSONConverterValues(sig);
//		} catch(Exception e) {
//			e.printStackTrace();
//		}
//	}
	
	public static void main(String[] argv) throws Exception {
		
		ObjectSignature sig = new JSONConverter("{\"var1\": [], \"var2\": [[], []]}").parse();
		
		Test.devDumpJSONConverterValues(sig);
		
//		JNI jniloader = new JNI();
		
//		EnvironmentVar[] testvars = {new EnvironmentVar("var1", "content1", false), new EnvironmentVar("var2", "var2", true)};
		
//		SessionInformations infos = new SessionInformations();
//		infos.natlibrary = "LIB1"; infos.natprogram ="PROG1";
//		infos.natsrcpath = "/tmp/natsrc"; infos.natparms = "etid=$$";
//		infos.loglevel = "DEVELOP"; infos.logpath = "";
//		infos.outputfile = "/tmp/outputfile";
//		infos.username = "";
		
		
		
		
		//jniloader.startNaturalPlain(infos, "GET", "/SAG/nat/v63140/bin/", testvars, null, null);
	}
}
