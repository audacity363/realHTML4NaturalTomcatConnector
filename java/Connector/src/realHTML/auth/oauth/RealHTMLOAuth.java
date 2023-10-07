package realHTML.auth.oauth;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.JSONObject;

import realHTML.auth.exceptions.AuthException;

public class RealHTMLOAuth {
    private final static Logger LOGGER = LogManager.getLogger(RealHTMLOAuth.class);
    
    public static String checkLogin(String target, String headerField, String token) throws Exception, AuthException {

        URL targeturl;
        HttpURLConnection con;
        BufferedReader in;
        String inputLine, username;
        StringBuffer content = new StringBuffer();
        int httpStatus;
        JSONObject root;

        try {
            targeturl = new URL(target);
            con = (HttpURLConnection)targeturl.openConnection();
            con.setReadTimeout(5);

            con.setRequestMethod("GET");
            con.setRequestProperty("Content-Type", "application/json");
            con.setRequestProperty(headerField, token);

            httpStatus = con.getResponseCode();

            if(httpStatus == 200) {
                in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                in = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }

            while((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }

            in.close();
            con.disconnect();
        } catch(Exception e) {
            throw(e);
        }

        LOGGER.error("Authentication response contains status code {}", httpStatus);

        if(httpStatus != 200) {
            LOGGER.trace("It seems that authentication has failed. Got http code {} expected 200", httpStatus);
            throw new AuthException(content.toString());
        }

        root = new JSONObject(content.toString());
        username = root.optString("username",  null);

        return username;
    }
}
