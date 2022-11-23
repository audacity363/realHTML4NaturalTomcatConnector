package realHTML.tomcat.routing;

import java.util.ArrayList;
import java.util.HashMap;

public class PathTemplate {
	public String template;
	public Route route;
	public PathEntry[] entries;
	
	public PathTemplate(String template, Route route) {
		this.template = template;
		this.route = route;
	}

    public PathTemplate() { }
	
	public void parseTemplate() {
		ArrayList<String> entries;
		
		entries = splitTemplate();
		this.entries = convertEntries(entries);
		
		for(int i = 0; i < this.entries.length; i++) {
			System.out.println(this.entries[i]);
		}
	}
	
	
	//public Boolean matchPath(String url) {
	public PathTemplate matchPath(String url) throws CloneNotSupportedException {
		String[] urlentries_complete = url.split("/"),
				 urlentries;
        ArrayList<PathEntry> routeValuesClone = new ArrayList<PathEntry>();
        PathEntry clonedEntry;
        PathTemplate clonedReturnTemplate;

		if(!this.route.active) {
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
                    clonedEntry = (PathEntry)this.entries[i].clone();
					clonedEntry.setValue(urlentries[i]);
                    routeValuesClone.add(clonedEntry);
					break;
				case SELECTION:
					if(!this.entries[i].containsOption(urlentries[i])) { return(null); }
                    clonedEntry = (PathEntry)this.entries[i].clone();
					clonedEntry.setValue(urlentries[i]);
                    routeValuesClone.add(clonedEntry);
					break;
			}
		}
	
        clonedReturnTemplate = new PathTemplate();
        clonedReturnTemplate.route = this.route;
        clonedReturnTemplate.entries = routeValuesClone.toArray(new PathEntry[routeValuesClone.size()]);
		
		return(clonedReturnTemplate);
	}
	
	public HashMap<String, String> getParms() {
		HashMap<String, String> parms = new HashMap<String, String>();
		
		for(int i = 0; i < this.entries.length; i++) {
			if(this.entries[i].type == PathType.STATIC) { continue; }
			parms.put(this.entries[i].name, this.entries[i].value);
		}
		
		return(parms);
	}
	
	private PathEntry[] convertEntries(ArrayList<String> entries) {
		PathEntry[] peentries = new PathEntry[entries.size()];
		int i = 0;
		for(String entry: entries) {
			peentries[i++] = parseParmString(entry);
		}
		return(peentries);
	}
	
	private PathEntry parseParmString(String strEntry) {
		ArrayList<String> options = new ArrayList<String>(); 
		String name = "";
		String items[] = null;
		
		if (strEntry.charAt(0) != ':') {
			return(new PathEntry(PathType.STATIC, strEntry));
		}
		
		if (!strEntry.contains("=")) {
			return(new PathEntry(PathType.VARIABLE, strEntry.substring(1)));
		}
		
		strEntry = strEntry.substring(1);
		
		items = strEntry.split("=", 2);
		if (items[1].length() == 0) {
			//TODO: Throw Exception
		}
		
		if(!items[1].contains("|")) {
			options.add(items[1]);
			return(new PathEntry(PathType.SELECTION, items[0], 
					options.toArray(new String[options.size()])));
		}
		
		name = items[0];
		items = items[1].split("\\|");
		
		return(new PathEntry(PathType.SELECTION, name, items));
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
			if(this.entries[i].type == PathType.STATIC) { continue; }
			ret += "(" + this.entries[i].name + "=" + this.entries[i].value + ")";
			if(i+1 < this.entries.length) {
				ret += ",";
			}
		}
		ret += "]";
		
		return(ret);
		
	}
}
