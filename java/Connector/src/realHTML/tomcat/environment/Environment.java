package realHTML.tomcat.environment;

import java.io.Serializable;
import java.util.ArrayList;

import realHTML.tomcat.routing.Routing;

public class Environment implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6497734296253862397L;
	private String natparms;
    private String natbinpath;
    private String natsourcepath;
    private String charEncoding;
    private ArrayList<EnvironmentVar> environvars;
    private Routing routing;

    private String authServer;
    private String authHeaderField;
    
    public Environment() {
    	this.routing = new Routing();
		this.environvars = new ArrayList<EnvironmentVar>();
    }

	public Environment(String natparms, String natsrc, String natbinpath, String charencoding, String authServer, String authHeaderField) {
		this.natparms = natparms;
		this.natsourcepath = natsrc;
        this.charEncoding = charencoding;
        this.natbinpath = natbinpath;

		this.routing = new Routing();
		this.environvars = new ArrayList<EnvironmentVar>();

        this.authServer = authServer;
        this.authHeaderField = authHeaderField;
	}
	
	public EnvironmentVar getEnvironmentVar(String name) {
		for(int i = 0; i < this.environvars.size(); i++) {
			if(this.environvars.get(i).getName().equals(name)) {
				return(this.environvars.get(i));
			}
		}
		return(null);
	}
	
	public void addEnvironmentVar(EnvironmentVar environmentVariable) {
		this.environvars.add(environmentVariable);
	}
	
	public void editEnvironmentVar(EnvironmentVar environmentVariable) {
		for(int i = 0; i < this.environvars.size(); i++) {
			if(this.environvars.get(i).getName().equals(environmentVariable.getName())) {
				this.environvars.set(i, environmentVariable);
				break;
			}
		}
	}
	
	public void deleteEnvironmentVar(String name) {
		for(int i = 0; i < this.environvars.size(); i++) {
			if(this.environvars.get(i).getName().equals(name)) {
				this.environvars.remove(i);
				break;
			}
		}
	}
	
	public String getNatparms() { return this.natparms; }
	public void setNatparms(String natparms) { this.natparms = natparms; }  
	
	public String getNatbinpath() { return this.natbinpath; }
	public void setNatbinpath(String natbinpath) { this.natbinpath = natbinpath; }
	
	public String getNatsrcpath() { return this.natsourcepath; }
	public void setNatsrcpath(String natsourcepath) { this.natsourcepath = natsourcepath; } 
	
	public String getCharEncoding() { return this.charEncoding; }
	public void setCharEncoding(String charEncoding) { this.charEncoding = charEncoding; }
	
	public ArrayList<EnvironmentVar> getEnvironvars() { return this.environvars; }
	
	public Routing getRouting() { return this.routing; }
	
	public String getAuthServer() { return this.authServer; }
	public void setAuthServer(String authServer) { this.authServer = authServer; }
	
	public String getAuthHeaderField() { return this.authHeaderField; }
	public void setAuthHeaderField(String authHeaderField) { this.authHeaderField = authHeaderField; }
}
