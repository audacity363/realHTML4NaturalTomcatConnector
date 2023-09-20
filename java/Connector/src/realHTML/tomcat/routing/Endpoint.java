package realHTML.tomcat.routing;

import java.io.Serializable;

import realHTML.Utils;
import realHTML.tomcat.routing.exceptions.EndpointException;

public class Endpoint implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -8088494236001664369L;
	private String natLibrary;
	private String natProgram;
	private boolean login;
	private String loglevel;
	private boolean active;
	
	public Endpoint() {
		this.natLibrary = new String();
		this.natProgram = new String();
		this.login = false;
		this.loglevel = new String("ERROR");
		this.active = true;
	}
	
	
	public Endpoint(String library, String program, Boolean login, String loglevel, Boolean active) throws EndpointException {
		this.setNatLibrary(library);
		this.setNatProgram(program);
		this.login = login;
		this.loglevel = loglevel;
		this.active = active;
	}
	
	public String toString() {
		return "Endpoint(natLibrary=" + this.natLibrary + ", natProgram=" + this.natLibrary + ", login=" + this.login + ", loglevel=" + this.loglevel + ",active=" + this.active +")";
	}

	public String getNatLibrary() {
		return natLibrary;
	}

	public void setNatLibrary(String natLibrary) throws EndpointException {
		if(!Utils.onlyASCIIandNoSpace(natLibrary)) {
			throw new EndpointException("Only ASCII characters and no spaces are allowed");
		}
		this.natLibrary = natLibrary;
	}

	public String getNatProgram() {
		return natProgram;
	}

	public void setNatProgram(String natProgram) throws EndpointException {
		if(!Utils.onlyASCIIandNoSpace(natProgram)) {
			throw new EndpointException("Only ASCII characters and no spaces are allowed");
		}
		this.natProgram = natProgram;
	}

	public boolean getLogin() {
		return login;
	}

	public void setLogin(boolean login) {
		this.login = login;
	}

	public String getLoglevel() {
		return loglevel;
	}

	public void setLoglevel(String loglevel) {
		this.loglevel = loglevel;
	}

	public boolean getActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	
	
}
