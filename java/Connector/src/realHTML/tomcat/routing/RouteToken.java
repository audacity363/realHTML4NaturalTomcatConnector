package realHTML.tomcat.routing;

import java.io.Serializable;
import java.util.Arrays;

public class RouteToken implements Cloneable, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -8149790381019143127L;
	RouteTokenType type;
	String name;
	String value;
	
	//is only set when type == SELECTION
	String[] options;
	
	public RouteToken(RouteTokenType type, String name) {
		this.type = type;
		this.name = name;
		this.options = null;
	}
	
	public RouteToken(RouteTokenType type, String name, String[] options) {
		this.type = type;
		this.name = name;
		this.options = options;
	}
	
	public Boolean isVariable() {
		if (this.type == RouteTokenType.VARIABLE) {
			return(true);
		}
		return(false);
	}
	
	public String getName() {
		return(this.name);
	}
	
	public String toString() {
		String representation = "PathEntry[Type=";
		switch(this.type) {
			case VARIABLE:
				representation += "Variable"; 
				break;
			case STATIC:
				representation += "Static";
				break;
			case SELECTION:
				representation += "Options(";
				for(int i = 0; i < this.options.length; i++) {
					representation += this.options[i];
					if(i+1 < this.options.length) { representation += "|"; } 
				}
				representation += ")";
				break;
		}
		return(representation += ", Name=" + this.name + "]");
	}
	
	public void setValue(String value) {
		this.value = value;
	}
	
	public String getValue() {
		return(this.value);
	}
	
	public RouteTokenType getType() {
		return(this.type);
	}

    public String[] getOptions() {
        return(this.options);
    }
	
	public Boolean containsOption(String option) {
		return(Arrays.asList(this.options).contains(option));
	}

    public Object clone() throws CloneNotSupportedException {
        return (RouteToken)super.clone();
    }
}
