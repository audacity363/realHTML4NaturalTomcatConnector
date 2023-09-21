package realHTML.handler.ws;

import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import realHTML.JSONConverter.JSONConverter;

public class WSMessageDecoder implements Decoder.Text<Object> {

	final Logger LOGGER = LogManager.getLogger(this.getClass());

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
	}
	
	
	@Override
	public void init(EndpointConfig arg0) {
		LOGGER.info("Decoder registered");
	}

	@Override
	public Object decode(String arg0) throws DecodeException {
		return new JSONConverter(arg0);
	}

	@Override
	public boolean willDecode(String arg0) {
		try {
			new JSONConverter(arg0);
			return true;
		} catch(Exception e) {
			return false;
		}
	}

}
