import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;
import java.util.Map.Entry;
import java.util.logging.FileHandler;
import java.nio.charset.Charset;

import realHTML.servlet.exceptions.*;
import realHTML.tomcat.connector.RH4NParams;
import realHTML.tomcat.connector.RH4NReturn;
import realHTML.tomcat.connector.Environ;
import realHTML.tomcat.connector.JNILoader;

import realHTML.tomcat.JSONMatcher.*;
import realHTML.tomcat.routing.PathTemplate;
import realHTML.tomcat.environment.Environment;
import realHTML.tomcat.environment.EnvironmentBuffer;
import realHTML.tomcat.environment.EnvironmentVar;

import realHTML.auth.oauth.RealHTMLOAuth;
import realHTML.auth.exceptions.AuthException;

import org.apache.commons.io.*;

import com.eclipsesource.json.JsonObject;


public class RealHTMLHandler extends RealHTMLInit {
    private JNILoader bs;

    public void init() throws ServletException {
        super.init();

        this.bs = new JNILoader();
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
        RH4NParams parms = new RH4NParams();
        LLHandler bodyvars = null;
        String contentType;
        Environ envvars[] = null;
        RH4NReturn natret = null;

        parms = getRoute(request, response);
        if(parms == null) {
            return;
        }

        try {
            parms.outputfile = createTmpFile();
        } catch(Exception e) {
            throw(new ServletException(e));
        }

        parms.reqType = request.getMethod();
        parms.logpath = this.logpath;
        parms.errorRepresentation = "JSON";
        //envvars = call_parms.enviromentvars;

        try {
            parms = getQueryParms(request, parms);
            contentType = request.getContentType();
            if(contentType != null && contentType.equals("application/json")) {
                bodyvars = getBodyParms(request);
            }
        } catch(Exception e) {
            throw(new ServletException(e));
        }

        //parms.printUrlVariables();
            
        try {
            natret = bs.callNatural(parms, parms.environs, bodyvars);
            if(natret.natprocess_ret < 0) {
                sendErrorMessage(response, natret.error_msg);
                return;
            }
            deliverFile(response, parms.outputfile, true, parms.charEncoding);

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

    private RH4NParams getRoute(HttpServletRequest request, HttpServletResponse response) 
        throws ServletException, AuthException {
        String environment, path;
        int index = 0;
        RH4NParams parms = new RH4NParams();
        HttpSession session = null;
        EnvironmentBuffer envs;
        Environment env;
        PathTemplate route;

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
            env = envs.getEnvironment(environment);
        } catch(Exception e) {
            throw(new ServletException(e));
        }

        route = env.routing.getRoute(path);
        if(route == null) {
            throw(new ServletException("Unkown Route"));
        }

        if(route.route.login) {
            parms.username = checkLogin(request, env.authServer, env.authHeaderField);
        } else {
            parms.username = "";
        }

        parms.natLibrary = route.route.natLibrary;
        parms.natProgram = route.route.natProgram;
        parms.loglevel = route.route.loglevel;
        parms.natparms = env.natparms;
        parms.natbinpath = env.natbinpath;
        //System.out.printf("Imported Natbin path: [%s]\n", parms.natbinpath);
        parms.natsrcpath = env.natsourcepath;
        parms.charEncoding = env.charEncoding;
        parms.environs = env.environvars.toArray(new EnvironmentVar[env.environvars.size()]);

        HashMap<String, String> routeparms = route.getParms();
        if(routeparms.size() != 0) {
            try {
                for(String key: routeparms.keySet()) {
                    parms.addUrlVariable(key, routeparms.get(key));
                }
            } catch(UnsupportedEncodingException e) {
                throw(new ServletException(e));
            }

        } 

        return(parms);
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

    private RH4NParams getQueryParms(HttpServletRequest request, RH4NParams parms) throws UnsupportedEncodingException {
        Map urlparms;
        int parmsize = 0;

        urlparms = request.getParameterMap();
        parmsize = urlparms.size();
        if(parmsize == 0) {
            return(parms);
        }

        for(String key: (Set<String>)urlparms.keySet()) {
            parms.addUrlVariable(key, ((String[])urlparms.get(key))[0]);
        }

        return(parms);
    }

    private LLHandler getBodyParms(HttpServletRequest request) 
        throws IOException, Exception {
        String jsonString = "";
        int jsonChar = 0;
        BufferedReader br = null;
        LLHandler varlist = null;
        JSONParser jsonparser = null;


        jsonString = IOUtils.toString(request.getReader());

        if(jsonString.length() == 0) {
            return(null);
        }

        //System.out.printf("Trying to parse string: [%s]\n", jsonString);

        jsonparser = new JSONParser(jsonString);
        try {
            varlist = jsonparser.run();
            //varlist.printList();
        } catch(Exception e) {
            throw(e);
        }

        return(varlist);
    }

    private void deliverFile(HttpServletResponse response, String filepath, Boolean deletefile, String encoding) 
        throws Exception {
        File returnfile = null;
        FileReader filereader = null;
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
