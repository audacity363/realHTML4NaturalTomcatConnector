<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.ServletContext" %>    
<%@ page import="realHTML.tomcat.routing.*" %>
<%@ page import="realHTML.tomcat.environment.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>RealHTML4Natural Config</title>
</head>
<body>
<jsp:include page="messagebar.jsp"></jsp:include>
<h2>Environments</h2>
<%
	EnvironmentBuffer environments = EnvironmentBuffer.getEnvironmentsfromContext(application);
	if(environments == null) {
		response.sendRedirect("import");
	} 
    else {
		String[] envnames =  environments.getEnviromentNames();
%>
	<ul>
	<%
		for(int i = 0; i < envnames.length; i++) {
			out.print("<li><a href='environment.jsp?name=" + envnames[i] +"'>" + envnames[i] + "</a></li>");
		}
	%>
	</ul>
<% } %>
	<hr>
	<form method="post" action="environment">
        <table>
            <tr>
                <td>Environment name:</td>
		        <td><input type="text" name="envname"></td>
            </tr>
            <tr>
                <td>Natural Parms:</td>
                <td><input type="text" name="natparm"></td>
            </tr>
            <tr>
                <td>Natural Bin Path:</td>
                <td><input type="text" name="natbinpath"></td>
            </tr>
            <tr>
                <td>Natural Src Path:</td>
                <td><input type="text" name="natsrc"></td>
            </tr>
            <tr>
                <td>Character Encoding:</td>
                <td><input type="text" name="charencoding"></td>
            </tr>
        </table>
		<input value="put" name="_method" type="hidden">
		<button type="submit">Add Environment</button>
	</form>
</body>
</html>
