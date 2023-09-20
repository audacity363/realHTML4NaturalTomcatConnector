package realHTML.tomcat.config.exceptions;

public class ImportException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2257023971081264408L;

	public ImportException(String msg) {
		super(msg);
	}
	
	public ImportException(String msg, Throwable err) {
		super(msg, err);
	}
}
