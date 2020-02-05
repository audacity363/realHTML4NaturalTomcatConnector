package realHTML.auth.exceptions;

public class AuthException extends Exception {

    /**
	 * 
	 */
	private static final long serialVersionUID = -3853589024041506415L;
	int httpStatus = 0;

    public AuthException() {}

    public AuthException(String message, int httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public int getHttpStatus() {
        return(this.httpStatus);
    }
}
