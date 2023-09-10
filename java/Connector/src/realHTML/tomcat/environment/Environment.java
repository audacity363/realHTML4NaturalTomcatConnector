package realHTML.tomcat.environment;

import java.util.ArrayList;

import realHTML.tomcat.routing.Routing;

public class Environment {
	public String natparms;
    public String natbinpath;
	public String natsourcepath;
    public String charEncoding;
	public ArrayList<EnvironmentVar> environvars;
	public Routing routing;

    public String authServer;
    public String authHeaderField;

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
			if(this.environvars.get(i).name.equals(name)) {
				return(this.environvars.get(i));
			}
		}
		return(null);
	}
	
	public void addEnvironmentVar(String name, String value, boolean append) {
		this.environvars.add(new EnvironmentVar(name, value, append));
	}
	
	public void deleteEnvironmentVar(String name) {
		for(int i = 0; i < this.environvars.size(); i++) {
			if(this.environvars.get(i).name.equals(name)) {
				this.environvars.remove(i);
				break;
			}
		}
	}
	
	public EnvironmentVar[] getEnvirons() {
		return(this.environvars.toArray(new EnvironmentVar[this.environvars.size()]));
	}

	public String getNatparms() { return this.natparms; }
	public void setNatparms(String natparms) { this.natparms = natparms; }  
	
	public String getNatbinpath() { return this.natbinpath; }
	public void setNatbinpath(String natbinpath) { this.natbinpath = natbinpath; }
	
	public String getNatsourcepath() { return this.natsourcepath; }
	public void setNatsourcepath(String natsourcepath) { this.natsourcepath = natsourcepath; } 
	
	public String getCharEncoding() { return this.charEncoding; }
	public void setCharEncoding(String charEncoding) { this.charEncoding = charEncoding; }
	
	public String getAuthServer() { return this.authServer; }
	public void setAuthServer(String authServer) { this.authServer = authServer; }
	
	public String getAuthHeaderField() { return this.authHeaderField; }
	public void setAuthHeaderField(String authHeaderField) { this.authHeaderField = authHeaderField; }
}
