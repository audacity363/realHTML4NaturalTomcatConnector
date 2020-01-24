package realHTML.auth.oauth;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import com.eclipsesource.json.Json;
import com.eclipsesource.json.JsonObject;
import com.eclipsesource.json.JsonValue;

import realHTML.auth.exceptions.AuthException;

public class RealHTMLOAuth {
    public static String checkLogin(String target, String headerField, String token) throws Exception, AuthException {
        URL targeturl;
        HttpURLConnection con;
        BufferedReader in;
        String inputLine, username;
        StringBuffer content = new StringBuffer();
        int httpStatus;
        JsonObject root;

        try {
            targeturl = new URL(target);
            con = (HttpURLConnection)targeturl.openConnection();

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

        if(httpStatus != 200) {
            throw new AuthException(content.toString(), httpStatus);
        }

        root = Json.parse(content.toString()).asObject();
        username = root.getString("username", null);

        return username;
    }
}
