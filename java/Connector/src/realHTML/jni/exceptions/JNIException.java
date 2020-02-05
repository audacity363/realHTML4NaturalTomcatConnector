package realHTML.jni.exceptions;

public class JNIException extends Exception {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4031662591829179197L;
	String message;
	int errno;
	
	public JNIException(int errno, String message) {
		super(message);
		this.errno = errno;
		this.message = message;
	}
	
	public String toString() {
		return(this.message + " (" + this.errno + ")");
	}
	
}
