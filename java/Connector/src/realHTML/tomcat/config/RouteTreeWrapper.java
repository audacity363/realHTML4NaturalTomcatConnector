package realHTML.tomcat.config;

import realHTML.tomcat.routing.RouteToken;

import java.io.Serializable;

import realHTML.tomcat.routing.Endpoint;

public class RouteTreeWrapper implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 9120244015653576866L;
	private RouteToken entry;
	private Endpoint endpoint;
	private String urlTemplate;
	
	public RouteTreeWrapper() {
		this.endpoint = new Endpoint();
		this.urlTemplate = new String();
	}
	
	public RouteTreeWrapper(RouteToken entry, Endpoint endpoint, String urlTemplate) {
		this.entry = entry;
		this.endpoint = endpoint;
		this.urlTemplate = urlTemplate;
	}
	
	public Endpoint getEndpoint() {
		return endpoint;
	}

	public void setEndpoint(Endpoint endpoint) {
		this.endpoint = endpoint;
	}

	public RouteToken getEntry() {
		return entry;
	}

	public void setEntry(RouteToken entry) {
		this.entry = entry;
	}
	
	public String toString() {
		return new String("PathTreeWrapper(pathEntry=" + this.entry + ", endpoint=" + this.endpoint + ")");
	}

	public String getUrlTemplate() {
		return urlTemplate;
	}

	public void setUrlTemplate(String urlTemplate) {
		this.urlTemplate = urlTemplate;
	}
	
	
}
