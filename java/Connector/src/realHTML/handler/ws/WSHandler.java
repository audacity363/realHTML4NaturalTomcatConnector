package realHTML.handler.ws;

import javax.websocket.CloseReason;
import javax.websocket.Endpoint;
import javax.websocket.EndpointConfig;
import javax.websocket.MessageHandler;
import javax.websocket.Session;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import realHTML.JSONConverter.JSONConverter;
import realHTML.jni.JNI;
import realHTML.jni.natural.Message;
import realHTML.jni.natural.MessageType;
import realHTML.tomcat.routing.Route;

import java.io.EOFException;
import java.io.IOException;

public class WSHandler extends Endpoint {

	final Logger LOGGER = LogManager.getLogger(this.getClass());

	public WSHandler() {
		LOGGER.info("Init WSHandler");
		ConnectionPool.jnihandler = new JNI();
	}

	@Override
	public void onOpen(Session client, EndpointConfig config) {
		LOGGER.info("User connected");
		
		Route targetRoute = (Route)config.getUserProperties().get("routeconfig");
		LOGGER.info("Staring id: [" + targetRoute.getTemplate() + "] " + targetRoute.getRoute().getNatProgram() + " in " + 
				targetRoute.getRoute().getNatLibrary());

		ConnectionPool.handleClient(targetRoute, client);
		
		client.addMessageHandler(new MessageHandler.Whole<Object>() {	
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
							client.getBasicRemote().sendText("Error: " + e.getMessage());
						} catch (IOException e1) {
							e1.printStackTrace();
						}
					}	
				} else {
					newmsg.msg = msg;
					newmsg.type = MessageType.TEXT;
				}
				
				ConnectionPool.addMessageToQueue(targetRoute.getTemplate(), newmsg);
			}
		});
	}
	
	@Override
	public void onClose(Session session, CloseReason reason) {
		String reasonString = reason.getReasonPhrase() == null ? "" : reason.getReasonPhrase();
		
		if(!reasonString.equals("RH4NNATURALEXITED")) {
			ConnectionPool.removeClientFromNaturalSession(session);
		}
	}
	
	@Override
	public void onError(Session session, Throwable error) {
		if (error instanceof EOFException) {
			LOGGER.info("Client disconnected");
		} else {
			LOGGER.info("Something bad has happen:");
			new Exception(error).printStackTrace();
		}
	}
}