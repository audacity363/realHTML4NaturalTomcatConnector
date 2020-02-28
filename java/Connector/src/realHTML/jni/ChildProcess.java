package realHTML.jni;

public class ChildProcess {
	public int pid = 0;
	public boolean exited = false;
	public int exitCode = 0;
	public String reason = null;
	
	public int udsClient = 0;
	
	public ChildProcess(int pid, boolean exited, int exitCode, String reason, int udsClient) {
		this.pid = pid;
		this.exited = exited;
		this.exitCode = exitCode;
		this.reason = reason;
		
		this.udsClient = udsClient;
	}
	
	public String toString() {
		return(String.format("PID: %d; exited: %b; code: %d; Reason: %s; UDSClient %d", this.pid, this.exited, this.exitCode, this.reason, this.udsClient));
	}
}
