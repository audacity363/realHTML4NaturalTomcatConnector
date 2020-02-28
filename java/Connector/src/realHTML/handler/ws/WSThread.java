package realHTML.handler.ws;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;

import javax.websocket.CloseReason;
import javax.websocket.Session;

import realHTML.jni.ChildProcess;
import realHTML.jni.JNI;
import realHTML.jni.exceptions.SocketClosedException;
import realHTML.jni.natural.Message;

public class WSThread extends Thread  {
	private Set<Session> clients;
	private ChildProcess naturalProcess;
	private Boolean exit = false;
	
	private Queue<Message> queue;
	
	static JNI jnihandler;
	
	public WSThread(ChildProcess naturalProcess) {
		WSThread.jnihandler = new JNI();
		
		this.clients = Collections.synchronizedSet(new HashSet<Session>());
		this.naturalProcess = naturalProcess;
		this.queue = new LinkedList<Message>();
	}

	public void run() {
		ChildProcess naturalStatus = null;
		String msg = null;
		
		while(true) {
			try {
				Thread.sleep(10);
				if(this.exit) {
					break;
				}
				
				if(WSThread.jnihandler.checkForNewMessage(this.naturalProcess.udsClient)) {
					System.out.println("There is at leased one message in the queue");
					try {
						msg = WSThread.jnihandler.recvMessage(this.naturalProcess.udsClient);
						this.sendMessageToClient(-1,  msg);
					} catch(SocketClosedException e) {
						System.out.println("Socket was closed");
						this.naturalProcess.udsClient = -1;
					}
				}
				
				naturalStatus = WSThread.jnihandler.getChildProcessStatus(this.naturalProcess.pid);
				if(naturalStatus.exited) {
					System.out.println("Natural Process has exited");
					this.sendMessageToClient(-1, "Natural has exited with status [" + naturalStatus.exitCode + "]");
					break;
				}
				
				synchronized (this.queue) {
					if(!this.queue.isEmpty()) {
						Message target = this.queue.poll();
						this.sendMessageToClient(-1, "Got message from Type: " + target.type);
					}	
				}
			} catch (InterruptedException e) {
				System.out.println("God an interrupt");
				if(this.exit) {
					break;
				}
			} catch(IOException e) {
				e.printStackTrace();
				break;
			}
		}
		
		for(Session client: this.clients) {
			try {
				client.close(new CloseReason(CloseReason.CloseCodes.NORMAL_CLOSURE, "RH4NNATURALEXITED"));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}	
		this.clients = new HashSet<Session>();
		
		System.out.println("Exiting sending thread");
	}
	
	private void sendMessageToClient(int clientID, String msg) throws IOException {
		for(Session client: this.clients) {
			client.getBasicRemote().sendText(msg);
		}	
	}
	
	public void stopSend() {
		this.exit = true;
	}
	
	public void addMessage(Message msg) {
		synchronized (this.queue) {
			this.queue.add(msg);	
		}
	}
	
	public Message getMessage() {
		Message target = null;
		synchronized (this.queue) {
			target = this.queue.poll();
		}
		
		return(target);
	}
	
	public void addClient(Session client) {
		this.clients.add(client);
	}
	
	public boolean hasClient(Session client) {
		boolean contains = false;
		
		contains = this.clients.contains(client);
		
		return(contains);
	}
	
	public int getClientLength() {
		int length = 0;
		
		length = this.clients.size();
		
		return(length);
	}
	
	public void removeClient(Session client) {
		
		this.clients.remove(client);
		if(this.clients.size() == 0) {
			this.exit = true;
		}
		
	}
	
}
