package realHTML.jni;

import realHTML.tomcat.environment.Environment;
import realHTML.tomcat.routing.Route;

public class SessionInformations {
	public String natlibrary;
	public String natprogram;
	public String natsrcpath;
	public String natparms;
	public String logpath;
	public String loglevel;
	public String username;
	public String outputfile;
	public int mode; //0 == plain; 1 == ws
	
	public SessionInformations() {
		
	}
	
	public SessionInformations(Environment env, Route route) {
		this.natlibrary = route.natLibrary;
		this.natprogram = route.natProgram;
		this.loglevel = route.loglevel;
		
		this.natparms = env.natparms;
		this.natsrcpath = env.natsourcepath;
	}
}
