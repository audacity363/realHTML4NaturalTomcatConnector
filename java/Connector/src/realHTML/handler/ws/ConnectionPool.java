package realHTML.handler.ws;

import java.util.HashMap;
import java.util.Map;

import javax.websocket.Session;

import realHTML.jni.ChildProcess;
import realHTML.jni.JNI;
import realHTML.jni.SessionInformations;
import realHTML.jni.natural.Message;
import realHTML.tomcat.routing.Route;

public class ConnectionPool {
	static Map<Integer, WSThread> activeWSs = new HashMap<Integer, WSThread>();
	public static JNI jnihandler;
	
	static void handleClient(Route targetRoute, Session client) {
		synchronized (ConnectionPool.activeWSs) { 
			if(ConnectionPool.activeWSs.containsKey(targetRoute.id) && ConnectionPool.activeWSs.get(targetRoute.id).getClientLength() == 0) {
				System.out.println("No clients left on this sessions. Delete it and reopen");
				ConnectionPool.activeWSs.remove(targetRoute.id);
			} 
			
			if(ConnectionPool.activeWSs.containsKey(targetRoute.id)) {
				ConnectionPool.activeWSs.get(targetRoute.id).addClient(client);
			} else {
				ConnectionPool.activeWSs.put(targetRoute.id, ConnectionPool.startNewNaturalSession(targetRoute, client));
			}
		}
	}
	
	static WSThread startNewNaturalSession(Route targetroute, Session client) {
		SessionInformations sessionInfos = null;
		ChildProcess naturalProcess = null;
		WSThread sendingThread = null;
		
		System.out.println("First connection on that client");
		
		sessionInfos = new SessionInformations();
		sessionInfos.natlibrary = targetroute.natLibrary;
		sessionInfos.natprogram = targetroute.natProgram;
		sessionInfos.natparms = "etid=$$";
		sessionInfos.mode = 1;
		sessionInfos.natsrcpath = "/opt/softwareag/Natural/fuser";
		sessionInfos.logpath = "/opt/rh4n/logs/";
		sessionInfos.loglevel = "DEVELOP";
		sessionInfos.outputfile = "/tmp/rh4nws_" + targetroute.id;
		sessionInfos.username = "";
		
		naturalProcess = ConnectionPool.jnihandler.startNaturalWs(sessionInfos, "/opt/softwareag/Natural/bin/", null, null);
		
		sendingThread = new WSThread(naturalProcess);
		sendingThread.addClient(client);
		sendingThread.start();
		
		return(sendingThread);
	}
	
	static void removeClientFromNaturalSession(Session client) {
		synchronized (ConnectionPool.activeWSs) {
			for(Map.Entry<Integer, WSThread> entry: ConnectionPool.activeWSs.entrySet()) {
				if(entry.getValue().hasClient(client)) {
					entry.getValue().removeClient(client);
					
				}
			}
		}
	}
	
	static void addMessageToQueue(int routeID, Message msg) {
		synchronized (ConnectionPool.activeWSs) {
			ConnectionPool.activeWSs.get(routeID).addMessage(msg);
		}
	}
}
