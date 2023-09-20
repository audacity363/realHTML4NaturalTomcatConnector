package realHTML.tomcat.config.exceptions;

public class ConfigException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -370492324134085456L;

	public ConfigException(String msg) {
		super(msg);
	}
	
	public ConfigException(String msg, Throwable err) {
		super(msg, err);
	}
	
	public ConfigException(Throwable e) {
		super(e);
	}
}
