package realHTML.handler.ws;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.websocket.Decoder;
import javax.websocket.Endpoint;
import javax.websocket.server.ServerApplicationConfig;
import javax.websocket.server.ServerEndpointConfig;

import realHTML.tomcat.routing.Route;
import realHTML.tomcat.routing.Routing;
import realHTML.tomcat.routing.exceptions.EndpointException;
import realHTML.tomcat.routing.exceptions.RouteException;

public class WSConfig implements ServerApplicationConfig {
	
	@Override
	public Set<ServerEndpointConfig> getEndpointConfigs(Set<Class<? extends Endpoint>> endpointClasses) {
		return this.buildWebSocketEndpoints();
	}

	@Override
	public Set<Class<?>> getAnnotatedEndpointClasses(Set<Class<?>> arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	
	private Set<ServerEndpointConfig> buildWebSocketEndpoints() {
		Set<ServerEndpointConfig> result = new HashSet<>();
		Routing routing = this.generateDummyRouting();
		Route routes[] = routing.getRoutes();
		
		for(int i = 0; i < routes.length; i++) {
			result.add(this.buildConfigforRoute(routes[i]));
		}
		
		
		return result;
	}
	
	private ServerEndpointConfig buildConfigforRoute(Route target) {
		ServerEndpointConfig config;
		String pathString = "/ws/";
		
		for(int i = 0; i < target.getEntries().length; i++) {
			if(target.getEntries()[i].isVariable()) {
				pathString += "{" + target.getEntries()[i].getName() + "}";
			} else {
				pathString += target.getEntries()[i].getName();
			}
			
			if(i+1 < target.getEntries().length) {
				pathString += "/";
			}
		}
		
		System.out.println("Add [" + pathString + "]");
		
		ServerEndpointConfig.Builder builder = ServerEndpointConfig.Builder.create(WSHandler.class, pathString);
		List<Class<? extends Decoder>> decoders = new ArrayList<>();
		decoders.add(WSMessageDecoder.class);
		
		builder = builder.decoders(decoders);
		config = builder.build();
		
		Map<String, Object> properties = config.getUserProperties();
		properties.put("routeconfig", target.getRoute());
		
		return config;
	}
	
	
	private Routing generateDummyRouting() throws RouteException{
		//TODO:  Dummy. Load from config file
		Routing routing = new Routing();

		try {
		realHTML.tomcat.routing.Endpoint testroute = new realHTML.tomcat.routing.Endpoint("LIB1", "PROG1", false, "DEBUG", true);
		routing.addRoute("/path1/:parm1", testroute);
		
		testroute = new realHTML.tomcat.routing.Endpoint("RH4N", "WSTEST", false, "DEBUG", true);
		routing.addRoute("/path2", testroute);
		
		testroute = new realHTML.tomcat.routing.Endpoint("LIB1", "PROG3", false, "DEBUG", true);
		routing.addRoute("/path3/:parm1/:parm2/test", testroute);
		
		testroute = new realHTML.tomcat.routing.Endpoint("LIB1", "PROG4", false, "DEBUG", true);
		routing.addRoute("/path4/test", testroute);
		
		testroute = new realHTML.tomcat.routing.Endpoint("LIB1", "PROG5", false, "DEBUG", true);
		routing.addRoute("/path5/test/:parm2", testroute);
		} catch(EndpointException e) {
			throw new RouteException("", e);
		}
		
		return routing;
	}

}
