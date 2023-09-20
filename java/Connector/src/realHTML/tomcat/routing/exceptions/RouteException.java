package realHTML.tomcat.routing.exceptions;

public class RouteException extends RuntimeException {

	/**
	 * 
	 */
	private static final long serialVersionUID = -5511681486973020167L;

	public RouteException (String message) {
		super(message);
	}
	
	public RouteException(String message, Throwable err) {
		super(message, err);
	}
}
