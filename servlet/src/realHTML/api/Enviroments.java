package realHTML.api;

import javax.ws.rs.GET;
import javax.ws.rs.PATH;
import javax.ws.rs.PathParm;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.json.JSONException;
import org.json.JSONObject;


public class RealHTML4NaturalEnviromentREST extends RealHTMLInit {

    public RealHTML4NaturalEnviromentREST() {
        super();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) {
		EnvironmentBuffer envs = (EnvironmentBuffer)EnvironmentBuffer.getEnvironmentsfromContext(getServletContext());

        String envname = request.getParameter("env");
        if(!envname)  {
            //Get a List of all environments

        } 
    }
}
