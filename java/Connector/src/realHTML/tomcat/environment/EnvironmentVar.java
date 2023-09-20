package realHTML.tomcat.environment;

import java.io.Serializable;

public class EnvironmentVar implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1240105653087990208L;
	private String name;
    private String value;
    private boolean append;

    public EnvironmentVar() {
        this.append = false;
    }

    public EnvironmentVar(String name, String value, boolean append) {
        this.name = name;
        this.value = value;
        this.append = append;
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public boolean getAppend() {
		return append;
	}

	public void setAppend(boolean append) {
		this.append = append;
	}
    
	public String toString() {
		return new String("EnvironmentVar(name=" + this.name + ", value=" + 
				this.value + ", append=" + this.append + ")");
	}
}
