package realHTML.handler.plain;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

import java.util.*;
import java.nio.charset.Charset;

import realHTML.tomcat.routing.Route;
import realHTML.tomcat.routing.exceptions.RouteException;
import realHTML.tomcat.config.ConfigService;
import realHTML.tomcat.config.exceptions.ConfigException;
import realHTML.tomcat.environment.Environment;

import realHTML.auth.oauth.RealHTMLOAuth;
import realHTML.jni.ChildProcess;
import realHTML.jni.JNI;
import realHTML.jni.SessionInformations;
import realHTML.JSONConverter.JSONConverter;
import realHTML.JSONConverter.signatures.ArraySignature;
import realHTML.JSONConverter.signatures.ObjectSignature;
import realHTML.JSONConverter.signatures.ObjectSignatureNode;
import realHTML.JSONConverter.signatures.Types;
import realHTML.auth.exceptions.AuthException;

import org.apache.commons.io.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.util.ArrayUtils;
import org.json.JSONArray;
import org.json.JSONObject;

public class RealHTMLHandler extends HttpServlet {
    /**
     * 
     */
    private static final long serialVersionUID = 1076903443567066328L;

    private final Logger LOGGER = LogManager.getLogger(this.getClass());

    private class RouteInformations {
        public Environment env;
        public Route route;
    }

    private JNI bs;
    private ConfigService configService;
    private String loggingPath;

    public void init(ServletConfig config) throws ServletException {
        super.init(config);

        this.bs = new JNI();

        this.configService = new ConfigService();
        try {
            this.configService.init(getServletContext());
            this.loggingPath = this.configService.getLoggingPath();
        } catch (ConfigException e) {
            throw new ServletException("Error while initialising ConfigService", e);
        }
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException {
        handleRequestWrapper(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException {
        handleRequestWrapper(request, response);
    }

    public void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException {
        handleRequestWrapper(request, response);
    }

    public void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException {
        handleRequestWrapper(request, response);
    }

    private void generateJSONExceptionArray(Throwable e, JSONArray arr) {
        arr.put(e.toString());
        if (e.getCause() != null) {
            generateJSONExceptionArray(e.getCause(), arr);
        }
    }

    private void handleRequestWrapper(HttpServletRequest request, HttpServletResponse response)
            throws ServletException {
        try {
            handleRequest(request, response);
        } catch (Exception e) {
            response.setStatus(500);

            JSONObject root = new JSONObject();
            JSONArray exceptions = new JSONArray();

            generateJSONExceptionArray(e, exceptions);

            root.put("status", 500);
            root.put("message", e.toString());
            root.put("stack", exceptions);

            try {
                response.getOutputStream().print(root.toString());
            } catch (Exception ex) {
                throw new ServletException(ex);
            }
        }
    }

    private void handleRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, AuthException {
        SessionInformations session = null;
        RouteInformations activatedRoute = null;
        String contentType, httpMethod;
        ObjectSignature urlvars = null, bodyvars = null;
        ChildProcess natret;

        activatedRoute = this.getRouteInformations(request, response);
        session = new SessionInformations(activatedRoute.env, activatedRoute.route);

        if (activatedRoute.route.getRoute().getLogin()) {
            session.username = checkLogin(request, activatedRoute.env.getAuthServer(),
                    activatedRoute.env.getAuthHeaderField());
        } else {
            session.username = "";
        }

        try {
            session.outputfile = createTmpFile(request.getSession().getId());
        } catch (Exception e) {
            throw (new ServletException(e));
        }

        httpMethod = request.getMethod();
        session.logpath = this.loggingPath;

        try {
            urlvars = getQueryParms(request, activatedRoute.route);
            if (urlvars != null) {
                urlvars.printList();
            }

            contentType = request.getContentType();
            if (contentType != null && contentType.equals("application/json")) {
                bodyvars = getBodyParms(request);
            }
        } catch (Exception e) {
            throw (new ServletException(e));
        }

        session.mode = 0;

        try {
            natret = bs.startNaturalPlain(session, httpMethod, activatedRoute.env.getNatbinpath(), null, urlvars,
                    bodyvars);
            deliverFile(response, session.outputfile, true, activatedRoute.env.getCharEncoding());

        } catch (Exception e) {
            throw (new ServletException(e));
        }
    }

    private String createTmpFile(String sessionID)
            throws Exception {
        try {
            File tmp = File.createTempFile("rh4n", "", new File("/tmp/"));
            return (tmp.getAbsolutePath());
        } catch (Exception e) {
            throw (e);
        }
    }

    private RouteInformations getRouteInformations(HttpServletRequest request, HttpServletResponse response)
            throws RouteException {
        String environmentName, routeURL;
        String[] urlTokens;
        Environment environment;
        RouteInformations infos = new RouteInformations();

        LOGGER.trace("getPathInfo: {}", request.getPathInfo());

        if (request.getPathInfo() == null) {
            throw new RouteException("no request URI was provided");
        }
        urlTokens = request.getPathInfo().split("/");
        if (urlTokens.length == 0 || urlTokens.length == 1) {
            throw new RouteException("Environment is missing in URL");
        } else if (urlTokens.length == 2) {
            throw new RouteException("Route is missing in URL");
        }

        environmentName = urlTokens[1];
        LOGGER.debug("Found environment {}", environmentName);
        urlTokens = ArrayUtils.remove(urlTokens, 0);
        urlTokens = ArrayUtils.remove(urlTokens, 0);
        routeURL = "/" + String.join("/", urlTokens);
        LOGGER.debug("Found route URL: {}", routeURL);

        try {
            environment = this.configService.getEnvironment(environmentName);
        } catch (ConfigException e) {
            throw new RouteException("Error while getting environment informations from ConfigService", e);
        }
        if (environment == null) {
            throw new RouteException("Could not find environment " + environmentName);
        }

        infos.route = environment.getRouting().getRoute(routeURL);
        infos.env = environment;
        if (infos.route == null) {
            throw new RouteException("Could not find a route definition for ["+ routeURL + "] in environment " + environmentName);
        }

        return (infos);
    }

    private String checkLogin(HttpServletRequest request, String target, String headerField)
            throws ServletException, AuthException {
        LOGGER.trace("Checking authentication against {}", target);
        LOGGER.trace("Getting authentication token from header field {}", headerField);

        String token = request.getHeader(headerField);
        if (token == null) {
            LOGGER.error("Could not find authentication token [{}] in header", headerField);
            throw new AuthException("Could not find authentication token in header");
        }

        LOGGER.trace("Found authentication token");

        try {
            return RealHTMLOAuth.checkLogin(target, headerField, token);
        } catch (AuthException e) {
            throw (e);
        } catch (Exception e) {
            throw (new ServletException("", e));
        }
    }

    private ObjectSignature getQueryParms(HttpServletRequest request, Route route) throws UnsupportedEncodingException {
        Map<String, String[]> urlparms;
        HashMap<String, String> routeparms;
        String[] values;
        ObjectSignature urlvars = new ObjectSignature();
        ObjectSignatureNode target = null;

        urlparms = request.getParameterMap();
        routeparms = route.getParms();

        if (urlparms.size() == 0 && routeparms.size() == 0) {
            return (null);
        }

        if (urlparms.size() > 0) {
            for (String key : urlparms.keySet()) {
                target = urlvars.addAtEnd(key);
                values = urlparms.get(key);
                if (values.length == 1) {
                    target.setValue(values[0]);
                    target.vartype = Types.STRING;
                } else {
                    target.setValue(values);
                    target.vartype = Types.ARRAY;
                    target.arrsig = new ArraySignature();
                    target.arrsig.dimensions = 1;
                    target.arrsig.length[0] = values.length;
                    target.arrsig.vartype = Types.STRING;
                }
            }
        }

        if (routeparms.size() > 0) {
            for (String key : routeparms.keySet()) {
                target = urlvars.addAtEnd(key);
                target.vartype = Types.STRING;
                target.setValue(routeparms.get(key));
            }
        }

        return (urlvars);
    }

    private ObjectSignature getBodyParms(HttpServletRequest request)
            throws IOException, Exception {
        String jsonString = "";
        JSONConverter bodyvars;

        jsonString = IOUtils.toString(request.getReader());

        if (jsonString.length() == 0) {
            return (null);
        }

        bodyvars = new JSONConverter(jsonString);
        return (bodyvars.parse());
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

            while (isr.ready()) {
                pw.append((char) isr.read());
            }

        } catch (Exception e) {
            throw (e);
        } finally {
            isr.close();
        }

        if (deletefile) {
            returnfile.delete();
        }

        returnfile = new File(propsfile);
        if (returnfile.exists()) {
            returnfile.delete();
        }
    }
}
