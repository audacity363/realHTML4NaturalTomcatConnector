package realHTML;

public class Utils {
	public static boolean onlyASCIIandNoSpace(String str) {
		int c;
		for(int i = 0; i < str.length(); i++) {
			c = str.charAt(i);
			if(c < 32 || c >= 127) {
				return false;
			}
		}
		return true;
	}
	
	public static String stackTraceToString(Throwable e) {
		String trace = e.toString();
		if(e.getCause() != null) {
			trace = trace + "\n" + Utils.stackTraceToString(e.getCause());
		}
		return trace;
	}
}