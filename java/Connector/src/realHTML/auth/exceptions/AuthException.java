package realHTML.auth.exceptions;

public class AuthException extends Exception {

    /**
	 * 
	 */
	private static final long serialVersionUID = -3853589024041506415L;

    public AuthException() {}

    public AuthException(String message) {
        super(message);
    }

    public AuthException(String message, Throwable e) {
        super(message, e);
    }

    public AuthException(Throwable e) {
        super(e);
    }
}
