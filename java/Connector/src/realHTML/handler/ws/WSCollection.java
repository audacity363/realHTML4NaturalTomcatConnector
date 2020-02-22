
package realHTML.handler.ws;

import javax.websocket.Session;

public class WSCollection {
	public WSThread sendingThread;
	public int serverHandle = -1;
	public java.util.Set<Session> clients;
}
