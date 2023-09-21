package realHTML.handler.ws;

import java.util.HashMap;
import java.util.Map;

import javax.websocket.Session;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import realHTML.jni.ChildProcess;
import realHTML.jni.JNI;
import realHTML.jni.SessionInformations;
import realHTML.jni.natural.Message;
import realHTML.tomcat.routing.Route;

public class ConnectionPool {
	static Map<String, WSThread> activeWSs = new HashMap<String, WSThread>();
	public static JNI jnihandler;
	final static Logger LOGGER = LogManager.getLogger(ConnectionPool.class);
	
	static void handleClient(Route targetRoute, Session client) {
		synchronized (ConnectionPool.activeWSs) { 
			if(ConnectionPool.activeWSs.containsKey(targetRoute.getTemplate()) && ConnectionPool.activeWSs.get(targetRoute.getTemplate()).getClientLength() == 0) {
				LOGGER.info("No clients left on this sessions. Delete it and reopen");
				ConnectionPool.activeWSs.remove(targetRoute.getTemplate());
			} 
			
			if(ConnectionPool.activeWSs.containsKey(targetRoute.getTemplate())) {
				ConnectionPool.activeWSs.get(targetRoute.getTemplate()).addClient(client);
			} else {
				ConnectionPool.activeWSs.put(targetRoute.getTemplate(), ConnectionPool.startNewNaturalSession(targetRoute, client));
			}
		}
	}
	
	static WSThread startNewNaturalSession(Route targetroute, Session client) {
		SessionInformations sessionInfos = null;
		ChildProcess naturalProcess = null;
		WSThread sendingThread = null;
		
		LOGGER.info("First connection on that client");
		
		sessionInfos = new SessionInformations();
		sessionInfos.natlibrary = targetroute.getRoute().getNatLibrary();
		sessionInfos.natprogram = targetroute.getRoute().getNatProgram();
		sessionInfos.natparms = "etid=$$";
		sessionInfos.mode = 1;
		sessionInfos.natsrcpath = "/opt/softwareag/Natural/fuser";
		sessionInfos.logpath = "/opt/rh4n/logs/";
		sessionInfos.loglevel = "DEVELOP";
		sessionInfos.outputfile = "/tmp/rh4nws_" + targetroute.getTemplate();
		sessionInfos.username = "";
		
		naturalProcess = ConnectionPool.jnihandler.startNaturalWs(sessionInfos, "/opt/softwareag/Natural/bin/", null, null);
		
		sendingThread = new WSThread(naturalProcess);
		sendingThread.addClient(client);
		sendingThread.start();
		
		return(sendingThread);
	}
	
	static void removeClientFromNaturalSession(Session client) {
		synchronized (ConnectionPool.activeWSs) {
			for(Map.Entry<String, WSThread> entry: ConnectionPool.activeWSs.entrySet()) {
				if(entry.getValue().hasClient(client)) {
					entry.getValue().removeClient(client);
					
				}
			}
		}
	}
	
	static void addMessageToQueue(String urlTemplate, Message msg) {
		synchronized (ConnectionPool.activeWSs) {
			ConnectionPool.activeWSs.get(urlTemplate).addMessage(msg);
		}
	}
}
