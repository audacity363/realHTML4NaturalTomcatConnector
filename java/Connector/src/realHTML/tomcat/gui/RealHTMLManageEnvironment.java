package realHTML.tomcat.gui;
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import realHTML.handler.plain.RealHTMLInit;
import realHTML.servlet.exceptions.EnvironmentException;
import realHTML.tomcat.environment.Environment;
import realHTML.tomcat.environment.EnvironmentBuffer;

public class RealHTMLManageEnvironment extends RealHTMLInit {
	private static final long serialVersionUID = 1L;
       
    public RealHTMLManageEnvironment() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		EnvironmentBuffer envs = (EnvironmentBuffer)EnvironmentBuffer.getEnvironmentsfromContext(getServletContext());
		
		String envname = request.getParameter("envname");
		String natparm = request.getParameter("natparm");
        String natbinpath = request.getParameter("natbinpath");
		String natsrc = request.getParameter("natsrc");
        String encoding = request.getParameter("charencoding");
		String authServer = request.getParameter("authserver");
		String authHeaderField = request.getParameter("authheaderfield");
		String method = request.getParameter("_method");
		
		try {
			if(method.equals("put")) {
				envs.addEnviroment(envname, natparm, natsrc, natbinpath, encoding, authServer, authHeaderField);
				getServletContext().setAttribute("message", "Successfully added environment " + envname);
			} else if(method.equals("post")) {
				Environment env = envs.getEnvironment(envname);
				env.natparms = natparm;
				env.natsourcepath = natsrc;
                env.natbinpath = natbinpath;
                env.charEncoding = encoding;
                env.authServer = authServer;
                env.authHeaderField = authHeaderField;
				getServletContext().setAttribute("message", "Successfully edited environment " + envname);
			} else if(method.equals("delete")) {
				envs.deleteEnvironment(envname);
				getServletContext().setAttribute("message", "Successfully deleted environment " + envname);
			}
		} catch (EnvironmentException e) {
			throw(new ServletException(e));
		}
		
		EnvironmentBuffer.setEnvironmentsforContext(getServletContext(), envs);
		getServletContext().setAttribute("settingssaved", false);
		if(method.equals("post")) {
			response.sendRedirect("environment.jsp?name=" + envname);
		} else {
			response.sendRedirect("index.jsp");
		}
	}
}
