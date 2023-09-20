package realHTML.tomcat.routing;

import java.io.Serializable;
import java.util.ArrayList;

import realHTML.tomcat.routing.exceptions.RouteException;
import realHTML.Utils;

public class Routing implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 7972594055474751932L;
	private ArrayList<Route> routes;
	
	public Routing() {
		this.routes = new ArrayList<Route>();
	}
	
	public void addRoute(String template, Endpoint route) throws RouteException {
		if(this.doesURLTemplateExist(template)) {
			throw new RouteException("Route with Template [" + template + "] does already exist"); 
		} else if(template.charAt(0) != '/') {
			throw new RouteException("URL template must begin with a '/'");
		} else if(template.charAt(template.length()-1) == '/') {
			throw new RouteException("URL template must not end with a '/'");
		} else if(!Utils.onlyASCIIandNoSpace(template)) {
			throw new RouteException("Only ACII characters and no spaces allowed");
		}
		
		Route newroute = new Route(template, route);
		newroute.parseTemplate();
		this.routes.add(newroute);
	}
	
	public void editRoute(String template, Endpoint endpoint) throws RouteException {
		if(!this.doesURLTemplateExist(template)) {
			throw new RouteException("Route with Template [" + template + "] does not exist"); 
		}
		
		for(Route entry: this.routes) {
			if(entry.getTemplate().equals(template)) {
				entry.setRoute(endpoint);
				break;
			}
		}
	}
	
	public void deleteRoute(String template) throws RouteException {
		if(!this.doesURLTemplateExist(template)) {
			throw new RouteException("Route with Template [" + template + "] does not exist"); 
		}
		
		for(int i = 0; i < this.routes.size(); i++) {
			if(this.routes.get(i).getTemplate().equals(template)) {
				this.routes.remove(i);
				break;
			}
		}
	}
	
	public Route getRoute(String url) throws RouteException {
        Route matchedRoute;

		for(Route entry: this.routes) {
			try {
				matchedRoute = entry.matchPath(url);
			} catch(CloneNotSupportedException e) {
				throw new RouteException("Exception while finding matching route", e);
			}
			if(matchedRoute != null) {
				return(matchedRoute);
			}
		}
		return(null);
	}
	
	public String[] getRoutesTemplates() {
		String[] routes = new String[this.routes.size()];
		
		for(int i = 0; i < this.routes.size(); i++) {
			routes[i] = this.routes.get(i).getTemplate();
		}
		
		return(routes);
	}
	
	public Route[] getRoutes() {
		return(this.routes.toArray(new Route[this.routes.size()]));
	}
	
	private boolean doesURLTemplateExist(String urlTemplate) {
		for(Route entry: this.routes) {
			if(entry.getTemplate().equals(urlTemplate)) {
				return true;
			}
		}
		return false;
	}
}
