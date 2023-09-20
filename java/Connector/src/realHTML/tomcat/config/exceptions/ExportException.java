package realHTML.tomcat.config.exceptions;

public class ExportException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6484113285708217663L;

	public ExportException(String msg) {
		super(msg);
	}
	
	public ExportException(String msg, Throwable err) {
		super(msg, err);
	}
	
	public ExportException(Throwable err) {
		super(err);
	}
}
