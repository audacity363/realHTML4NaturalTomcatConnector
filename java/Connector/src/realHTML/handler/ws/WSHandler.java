package realHTML.handler.ws;

import javax.websocket.CloseReason;
import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
import javax.websocket.MessageHandler;
import javax.websocket.Session;

import realHTML.JSONConverter.JSONConverter;
import realHTML.jni.ChildProcess;
import realHTML.jni.JNI;
import realHTML.jni.exceptions.NoClientException;
import realHTML.jni.natural.ChildInformations;
import realHTML.jni.natural.Message;
import realHTML.jni.natural.MessageType;
import realHTML.tomcat.routing.Route;

import java.io.EOFException;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

public class WSHandler extends Endpoint {

//	JNI jnihandler;
	static Map<Integer, WSCollection> activeWSs =  
			Collections.synchronizedMap(new HashMap<Integer, WSCollection>());
	final int STARTUP_TIMEOUT_SEC = 5;
	
	public WSHandler() {
		System.out.println("Init WSHandler");
	}

	@Override
	public void onOpen(Session session, EndpointConfig config) {
		System.out.println("User connected");
		
		System.out.println("new JNI");
//		this.jnihandler = new JNI();
		System.out.println("Hopfully the jni is now loaded");
		
		System.out.println("Print URL Variables");
		for(Map.Entry<String, List<String>> entry: session.getRequestParameterMap().entrySet()) {
			System.out.println(entry.getKey() + " - " + entry.getValue().toString());
		}
		System.out.println("End-Print Variables");
		
		Route targetroute = (Route)config.getUserProperties().get("routeconfig");
		System.out.println("Staring id: [" + targetroute.id + "] " + targetroute.natProgram + " in " + 
				targetroute.natLibrary);

		if(activeWSs.containsKey(targetroute.id)) {
			System.out.println("There is already a running thread");
			this.addSessiontoPool(targetroute.id, session);
		} else {
			this.startUpRoute(targetroute.id, session);
		}
		
		session.addMessageHandler(new MessageHandler.Whole<Object>() {	
			@Override
			public void onMessage(Object msg) {
				Message newmsg = new Message();
				if(msg instanceof JSONConverter) {
					try {
						newmsg.msg =  ((JSONConverter)msg).parse();
						newmsg.type = MessageType.JSON;
					} catch (Exception e) {
						//JSON Parsing failed. Write Error Message to client
						e.printStackTrace();
						try {
							session.getBasicRemote().sendText("Error: " + e.getMessage());
						} catch (IOException e1) {
							e1.printStackTrace();
						}
					}	
				} else {
					newmsg.msg = msg;
					newmsg.type = MessageType.TEXT;
				}
				
				synchronized (WSHandler.activeWSs.get(targetroute.id).sendingThread) {
					WSHandler.activeWSs.get(targetroute.id).sendingThread.addMessage(newmsg);	
				}
			}
		});
	}
	
	@Override
	public void onClose(Session session, CloseReason reason) {
		this.removeSessionfromPool(session);
	}
	
	@Override
	public void onError(Session session, Throwable error) {
		if (error instanceof EOFException) {
			System.out.println("Client disconnected");
		} else {
			System.out.println("Something bad has happen:");
			new Exception(error).printStackTrace();
		}
	}
	
	void startUpRoute(int routeID, Session session) {
		WSCollection current = null;
		Message msg = null;
		String filepath;
		int serverFD = -1, timeout = 0, clientFD = -1, pid = 0;
		
		System.out.println("First connection on that client");
		current = new WSCollection();
		current.clients = Collections.synchronizedSet(new HashSet<Session>());
		current.clients.add(session);
		
		System.out.println("Starting Thread");
		current.sendingThread = new WSThread(current.clients);
		current.sendingThread.start();
		
		WSHandler.activeWSs.put(routeID, current);
		
		filepath = "/tmp/rh4nws_" + routeID;
//		serverFD = this.jnihandler.createNonBlockingUDS(filepath);
		System.out.printf("God new FD: [%d]\n", serverFD);
		if(serverFD == -1) {
			return;
		}
		
//		pid = this.jnihandler.startNaturalWS("/home/tom/Documents/Java/websockets/c", filepath);
		
		//give the new spawned child process some time to get up and running
		do {
			try {
//				clientFD = this.jnihandler.waitForClient(filepath, serverFD);
				System.out.printf("God new client: [%d]\n", clientFD);
			/*} catch(NoClientException e) {
				System.out.println("Client Timeout.");
				try {
					Thread.sleep(500);
				} catch(Exception e1) {
					
				}
				timeout += 1;*/
			} catch (Exception e) {
				e.printStackTrace();
			}
		} while(clientFD == -1 && timeout < this.STARTUP_TIMEOUT_SEC*2);
		
		if(clientFD == -1) {
			System.out.printf("No Client after %d seconds", this.STARTUP_TIMEOUT_SEC*2);
//			ChildProcess natchild = this.jnihandler.getChildProcessStatus(pid);
			ChildProcess natchild = new ChildProcess(-1, false, 0, "");
			System.out.println(natchild);
			if(!natchild.exited) {
//				this.jnihandler.killChildProcess(natchild.pid, 9);
				return;
			}
		}
		
		System.out.println("Send Session infos to child");
		msg = new Message();
		msg.type = MessageType.CHILDINFORMATIONS;
		msg.msg = new ChildInformations("testlib", "testprog", "etid=$$ parm=logiparm", "/tmp/nat/", "DEBUG", "/tmp/log/");
		try {
//			this.jnihandler.sendMessageToNatural(clientFD, msg);
		} catch(Exception e) {
			e.printStackTrace();
			return;
		}
	}
	
	void addSessiontoPool(int routeID, Session session) {
		if(!WSHandler.activeWSs.containsKey(routeID)) {
			return;
		}
		WSHandler.activeWSs.get(routeID).clients.add(session);
	}
	
	void removeSessionfromPool(Session session) {
		synchronized (WSHandler.activeWSs) {
			Integer id = 0;
			WSCollection target = null;
			
			for(Map.Entry<Integer, WSCollection> entry: WSHandler.activeWSs.entrySet()) {
				if(entry.getValue().clients.contains(session)) {
					System.out.println("delete Session from pool");
					entry.getValue().clients.remove(session);
					id = entry.getKey();
					target = entry.getValue();
					break;
				}
			}
			
			if(target.clients.size() == 0) {
				System.out.println("No client left. Clearing handler");
				target.sendingThread.stopSend();
				WSHandler.activeWSs.remove(id, target);
			}
			
		}
	}
}
