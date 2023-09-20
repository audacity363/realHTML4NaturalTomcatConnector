package realHTML.tomcat.config;

import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import realHTML.tomcat.config.exceptions.ConfigException;

public class ServletTest extends HttpServlet {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -8830078863366401443L;
	
	private ConfigService configService;
	
	public void init(ServletConfig config) throws ServletException{
		super.init(config);
		
		this.configService = new ConfigService();
		
		try {
			this.configService.init(getServletContext());
		} catch (ConfigException e) {
			throw new ServletException(e);
		}
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException {
		PrintWriter writer;
		try {
			writer = response.getWriter();
		} catch(Exception e) {
			throw new ServletException(e);
		}
		
		writer.print("<html><body>");
		try {
			this.configService.getEnvironments().forEach((name, env) -> {
				writer.print(name + " " + env);
				writer.print("<br>");
			});
		} catch(ConfigException e) {
			throw new ServletException(e);
		}
		writer.print("</body></html>");

	}
}
