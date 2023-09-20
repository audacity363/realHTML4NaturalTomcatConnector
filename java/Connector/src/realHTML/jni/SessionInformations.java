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
		this.natlibrary = route.getRoute().getNatLibrary();
		this.natprogram = route.getRoute().getNatProgram();
		this.loglevel = route.getRoute().getLoglevel();
		
		this.natparms = env.getNatparms();
		this.natsrcpath = env.getNatsrcpath();
	}
}
