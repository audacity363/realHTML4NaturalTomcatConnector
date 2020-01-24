package realHTML.auth.exceptions;

public class AuthException extends Exception {

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
