import realHTML.JSONConverter.JSONConverter;
import realHTML.JSONConverter.signatures.ObjectSignature;

public class Test {
	
	static {
		System.load(System.getProperty("user.dir") + "/../../bin/librealHTMLWSconnector.so");
	}
	
	public static native int devDumpJSONConverterValues(ObjectSignature sig);
	public static native void arrayTest(int[] arr);

	public static void main(String[] args) {
		JSONConverter conv = new JSONConverter("{\"test4\": false, \"test5\": 12, \"test1\": [\"Hellö Wörld\"], \"test2\": [1, 2], \"test3\": {\"test31\":\"Hello\"}  }");
		
		try {
			ObjectSignature sig = conv.parse();
			devDumpJSONConverterValues(sig);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
}
