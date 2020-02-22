package realHTML.handler.ws;

import java.io.IOException;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

import javax.websocket.Session;

import realHTML.jni.natural.Message;

public class WSThread extends Thread  {
	Set<Session> clients;
	Boolean exit = false;
	
	Queue<Message> queue;
	
	public WSThread(Set<Session> clients) {
		this.clients = clients;
		this.queue = new LinkedList<Message>();
	}

	public void run() {
		while(true) {
			try {
				Thread.sleep(10);
				if(this.exit) {
					break;
				}
				
				if(!this.queue.isEmpty()) {
					Message target = this.queue.poll();
					synchronized (this.clients) {
						for(Session client: this.clients) {
							client.getBasicRemote().sendText("Got message from Type: " + target.type);
						}
					}
				}
			} catch (InterruptedException e) {
				System.out.println("God an interrupt");
				if(this.exit) {
					break;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		System.out.println("Exiting sending thread");
		
		//Close Pipes and write shutdown message to pipe
	}
	
	public void stopSend() {
		this.exit = true;
	}
	
	public synchronized void addMessage(Message msg) {
		this.queue.add(msg);
	}	
}
