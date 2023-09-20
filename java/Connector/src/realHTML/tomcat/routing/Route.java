package realHTML.tomcat.routing;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

public class Route implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4633713834074131268L;
	private String template;
	private Endpoint route;
	private RouteToken[] entries;
	
	public Route(String template, Endpoint route) {
		this.template = template;
		this.route = route;
	}

    public Route() { }
	
	public void parseTemplate() {
		ArrayList<String> entries;
		
		entries = splitTemplate();
		this.entries = convertEntries(entries);
		
		for(int i = 0; i < this.entries.length; i++) {
			System.out.println(this.entries[i]);
		}
	}
	
	
	//public Boolean matchPath(String url) {
	public Route matchPath(String url) throws CloneNotSupportedException {
		String[] urlentries_complete = url.split("/"),
				 urlentries;
        ArrayList<RouteToken> routeValuesClone = new ArrayList<RouteToken>();
        RouteToken clonedEntry;
        Route clonedReturnTemplate;

		if(!this.route.getActive()) {
			return(null);
		}
		
		urlentries = new String[urlentries_complete.length-1];
		System.arraycopy(urlentries_complete, 1, urlentries, 0, urlentries_complete.length-1);
		
		if (urlentries.length != this.entries.length) {
			return(null);
		}
		
		for(int i = 0; i < this.entries.length; i++) {
			switch(this.entries[i].type) {
				case STATIC:
					if(!this.entries[i].getName().equals(urlentries[i])) { return(null); }
					break;
				case VARIABLE:
                    clonedEntry = (RouteToken)this.entries[i].clone();
					clonedEntry.setValue(urlentries[i]);
                    routeValuesClone.add(clonedEntry);
					break;
				case SELECTION:
					if(!this.entries[i].containsOption(urlentries[i])) { return(null); }
                    clonedEntry = (RouteToken)this.entries[i].clone();
					clonedEntry.setValue(urlentries[i]);
                    routeValuesClone.add(clonedEntry);
					break;
			}
		}
	
        clonedReturnTemplate = new Route();
        clonedReturnTemplate.route = this.route;
        clonedReturnTemplate.entries = routeValuesClone.toArray(new RouteToken[routeValuesClone.size()]);
		
		return(clonedReturnTemplate);
	}
	
	public HashMap<String, String> getParms() {
		HashMap<String, String> parms = new HashMap<String, String>();
		
		for(int i = 0; i < this.entries.length; i++) {
			if(this.entries[i].type == RouteTokenType.STATIC) { continue; }
			parms.put(this.entries[i].name, this.entries[i].value);
		}
		
		return(parms);
	}
	
	private RouteToken[] convertEntries(ArrayList<String> entries) {
		RouteToken[] peentries = new RouteToken[entries.size()];
		int i = 0;
		for(String entry: entries) {
			peentries[i++] = parseParmString(entry);
		}
		return(peentries);
	}
	
	private RouteToken parseParmString(String strEntry) {
		ArrayList<String> options = new ArrayList<String>(); 
		String name = "";
		String items[] = null;
		
		if (strEntry.charAt(0) != ':') {
			return(new RouteToken(RouteTokenType.STATIC, strEntry));
		}
		
		if (!strEntry.contains("=")) {
			return(new RouteToken(RouteTokenType.VARIABLE, strEntry.substring(1)));
		}
		
		strEntry = strEntry.substring(1);
		
		items = strEntry.split("=", 2);
		if (items[1].length() == 0) {
			//TODO: Throw Exception
		}
		
		if(!items[1].contains("|")) {
			options.add(items[1]);
			return(new RouteToken(RouteTokenType.SELECTION, items[0], 
					options.toArray(new String[options.size()])));
		}
		
		name = items[0];
		items = items[1].split("\\|");
		
		return(new RouteToken(RouteTokenType.SELECTION, name, items));
	}
	
	
	
	private ArrayList<String> splitTemplate() {
		int length = this.template.length();
		String entry = "";
		char target = ' ';
		ArrayList<String> entries = new ArrayList<String>();
		
		
		for(int i=0; i < length; i++) {
			target = this.template.charAt(i);
			if(target == '\\') {
				if(i+1 < length && this.template.charAt(i+1) == '/') {
					entry += "/";
					i++;
				} else {
					entry += '\\';
				}
			} else if(target == '/') {
				if(entry.length() != 0) {
					entries.add(entry);
				}
				entry = "";
			} else {
				entry += target;
			}
		}
		entries.add(entry);
		
		return(entries);
	}
	
	public String toString() {
		String ret = "PathTemplate[template=(" + this.template +"), parms="; //"]";
		for(int i = 0; i < this.entries.length; i++) {
			if(this.entries[i].type == RouteTokenType.STATIC) { continue; }
			ret += "(" + this.entries[i].name + "=" + this.entries[i].value + ")";
			if(i+1 < this.entries.length) {
				ret += ",";
			}
		}
		ret += "]";
		
		return(ret);
		
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public Endpoint getRoute() {
		return route;
	}

	public void setRoute(Endpoint route) {
		this.route = route;
	}

	public RouteToken[] getEntries() {
		return entries;
	}

	public void setEntries(RouteToken[] entries) {
		this.entries = entries;
	}
	
	
}
