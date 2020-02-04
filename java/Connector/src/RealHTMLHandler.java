import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;
import java.nio.charset.Charset;

import realHTML.servlet.exceptions.*;

import realHTML.tomcat.routing.PathTemplate;
import realHTML.tomcat.environment.Environment;
import realHTML.tomcat.environment.EnvironmentBuffer;

import realHTML.auth.oauth.RealHTMLOAuth;
import realHTML.jni.JNI;
import realHTML.jni.SessionInformations;
import realHTML.JSONConverter.JSONConverter;
import realHTML.JSONConverter.signatures.ObjectSignature;
import realHTML.auth.exceptions.AuthException;

import org.apache.commons.io.*;

import com.eclipsesource.json.JsonObject;


public class RealHTMLHandler extends RealHTMLInit {
	private class RouteInformations {
		public Environment env;
		public PathTemplate route;
	}
	
    private JNI bs;

    public void init() throws ServletException {
        super.init();

        this.bs = new JNI();
    }

    public void handleAuthError(AuthException authex, HttpServletResponse response) throws ServletException {
        response.setStatus(authex.getHttpStatus());
        try {
            response.getOutputStream().print(authex.getMessage());
        } catch(Exception e) {
            throw(new ServletException("", e));
        }
    }

    public void handleError(Exception ex, HttpServletResponse response) throws ServletException {
        response.setStatus(500);

        JsonObject root = new JsonObject();
        root.add("status", 500);
        root.add("message", ex.getMessage());

        try {
            response.getOutputStream().print(root.toString());
        } catch(Exception e) {
            throw new ServletException("", e);
        }

    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException {
        try {
            handleRequest(request, response);
        } catch(ServletException e) {
            handleError(e, response);
        } catch(AuthException e) {
            handleAuthError(e, response);
        } 
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException {
        try {
            handleRequest(request, response);
        } catch(ServletException e) {
            handleError(e, response);
        } catch(AuthException e) {
            handleAuthError(e, response);
        }
    }

    public void doPut(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException {
        try {
            handleRequest(request, response);
        } catch(ServletException e) {
            handleError(e, response);
        } catch(AuthException e) {
            handleAuthError(e, response);
        }
    }

    public void doDelete(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException {
        try {
            handleRequest(request, response);
        } catch(ServletException e) {
            handleError(e, response);
        } catch(AuthException e) {
            handleAuthError(e, response);
        }
    }

    private void handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, AuthException {
        SessionInformations session = null;
        RouteInformations activatedRoute = null;
        String contentType, httpMethod;
        ObjectSignature urlvars = null, bodyvars = null;
        HashMap<String, String> routeparms;
        int natret;

        activatedRoute = this.getRouteInformations(request, response);
        session = new SessionInformations(activatedRoute.env, activatedRoute.route.route);
        
        if(activatedRoute.route.route.login) {
            session.username = checkLogin(request, activatedRoute.env.authServer, activatedRoute.env.authHeaderField);
        } else {
            session.username = "";
        }

        try {
            session.outputfile = createTmpFile();
        } catch(Exception e) {
            throw(new ServletException(e));
        }

        httpMethod = request.getMethod();
        session.logpath = this.logpath;

        try {
            urlvars = getQueryParms(request);
            routeparms = activatedRoute.route.getParms();
            if(routeparms.size() > 0) {
            	if(urlvars == null) {
            		urlvars = new ObjectSignature();
            	}
            	
            	for(String key: routeparms.keySet()) {
            		urlvars.addAtEnd(key).setValue(routeparms.get(key));
            	}
            } 
            
            contentType = request.getContentType();
            if(contentType != null && contentType.equals("application/json")) {
                bodyvars = getBodyParms(request);
            }
        } catch(Exception e) {
            throw(new ServletException(e));
        }
            
        try {
            natret = bs.startNaturalPlain(session, httpMethod, activatedRoute.env.natbinpath, null, urlvars, bodyvars);
            if(natret < 0) {
                sendErrorMessage(response, "");
                return;
            }
            deliverFile(response, session.outputfile, true, activatedRoute.env.charEncoding);

        } catch(Exception e) {
            throw(new ServletException(e));
        }
    }

    private void sendErrorMessage(HttpServletResponse response, String errormessage) 
        throws Exception {
        try {
            response.sendError(500, errormessage);
        } catch (Exception e) {
            throw(e);
        }
    }

    private String createTmpFile() 
        throws Exception {
        try  {
            File tmp = File.createTempFile("rh4n", "", new File("/tmp/"));
            return(tmp.getAbsolutePath());
        } catch (Exception e) {
            throw(e);
        }
    }

    private RouteInformations getRouteInformations(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException {
        String environment, path;
        int index = 0;
        EnvironmentBuffer envs;
        RouteInformations infos = new RouteInformations();

        path = request.getRequestURI().substring((request.getContextPath() + "/nat").length());
        if(path.length() == 1) {
            throw(new ServletException(new RouteException("Enviroment and Route is missing")));
        }

        index = path.indexOf("/", 1);
        if(index == -1) {
            throw(new ServletException(new RouteException("No Route was given")));
        }

        environment = path.substring(1, index);
        path = path.replace("/" + environment, "");

        envs = EnvironmentBuffer.getEnvironmentsfromContext(getServletContext());
        try {
            infos.env = envs.getEnvironment(environment);
        } catch(Exception e) {
            throw(new ServletException(e));
        }

        infos.route = infos.env.routing.getRoute(path);
        if(infos.route == null) {
            throw(new ServletException("Unkown Route"));
        }
        
        return(infos);
    }

    private String checkLogin(HttpServletRequest request, String target, String headerField) throws ServletException, AuthException {
        String token = request.getHeader(headerField);
        if(token == null) {
            throw new AuthException("{\"message\":\"token is missing\",\"status\":400}", 400);
        }
        try {
            return RealHTMLOAuth.checkLogin(target, headerField, token);
        } catch(AuthException e) {
            throw(e);
        } catch (Exception e) {
            throw(new ServletException("", e));
        }
    }

    private ObjectSignature getQueryParms(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String[]> urlparms;
        String[] values;
        ObjectSignature urlvars = new ObjectSignature();

        urlparms = request.getParameterMap();
        if(urlparms.size() == 0) {
            return(null);
        }

        for(String key: urlparms.keySet()) {
        	values = urlparms.get(key);
        	if(values.length == 1) {
        		urlvars.addAtEnd(key).setValue(values);
        	} else {
        		urlvars.addAtEnd(key).setValue(values[0]);
        	}
        }

        return(urlvars);
    }

    private ObjectSignature getBodyParms(HttpServletRequest request) 
        throws IOException, Exception {
        String jsonString = "";
        JSONConverter bodyvars;

        jsonString = IOUtils.toString(request.getReader());

        if(jsonString.length() == 0) {
            return(null);
        }
        
        bodyvars = new JSONConverter(jsonString);
        return(bodyvars.parse());
    }

    private void deliverFile(HttpServletResponse response, String filepath, Boolean deletefile, String encoding) 
        throws Exception {
        File returnfile = null;
        FileInputStream fis = null;
        InputStreamReader isr = null;
        PrintWriter pw = null;
        String propsfile = filepath + ".props";

        response.setContentType("application/json");
        response.setCharacterEncoding(encoding);

        try {
            pw = response.getWriter();
            returnfile = new File(filepath);
            fis = new FileInputStream(returnfile);
            isr = new InputStreamReader(fis, Charset.forName("ISO-8859-1"));

            while(isr.ready()) {
                pw.append((char)isr.read());
            }

        } catch(Exception e) {
            throw(e);
        } finally {
            isr.close();
        }

        if(deletefile) {
            returnfile.delete();
        }

        returnfile = new File(propsfile);
        if(returnfile.exists()) {
            returnfile.delete();
        }
    }
}
