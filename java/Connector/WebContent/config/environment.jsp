<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="javax.servlet.ServletContext" %>    
<%@ page import="realHTML.tomcat.routing.*" %>
<%@ page import="realHTML.tomcat.environment.*" %> 
<%@ page import="realHTML.tomcat.gui.*" %>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="../css/treeview.css">
<title>Environment configuration</title>
<style>
	.container {
		width: 100%
	}
	div.left {
		float: left;
		width: 50%
	}
</style>
</head>
<body>
<jsp:include page="messagebar.jsp"></jsp:include>
<%
	EnvironmentBuffer environments = EnvironmentBuffer.getEnvironmentsfromContext(application);
	if(environments == null) {
		response.sendRedirect("import");
        return;
	} 
	String envname = request.getParameter("name");
	
	Environment environment = environments.getEnvironment(envname);
	String[] routes = environment.routing.getRoutesTemplates();
	EnvironmentVar[] environs = environment.getEnvirons();
	
	RouteTree routetree = RouteSorting.sortRoutes(environment.routing);
%>
    <h1>Environment: <% out.print(envname); %></h1>
    <form method="post" action="environment">
        <table>
            <tr>
                <td>Natural Parms:</td>
                <td><input type="text" name="natparm" value="<%= environment.natparms %>"></td>
            </tr>
            <tr>
                <td>Natural Bin Path:</td>
                <td><input type="text" name="natbinpath" value="<%= environment.natbinpath %>"></td>
            </tr>
            <tr>
                <td>Natural Src Path:</td>
                <td><input type="text" name="natsrc" value="<%= environment.natsourcepath %>"></td>
            </tr>
            <tr>
                <td>Character Encoding:</td>
                <td><input type="text" name="charencoding" value="<%= environment.charEncoding %>"></td>
            </tr>
        </table>

        <h2>Authentication</h2>
        <table>
            <tr>
                <td>Target Server:</td>
                <td><input type="text" name="authserver" value="<%= environment.authServer %>"></td>
            </tr>
            <tr>
                <td>Header Field:</td>
                <td><input type="text" name="authheaderfield" value="<%= environment.authHeaderField %>"></td>
            </tr>
        </table>
        <input value="<%= envname %>" name="envname" type="hidden">
        <input value="post" name="_method" type="hidden">
        <br>
        <button type="submit">Save</button>
    </form>
    <form method="post" action="environment" style="margin-top:5px">
        <input value="<%= envname %>" name="envname" type="hidden">
        <input value="delete" name="_method" type="hidden">
        <button type="submit">Delete Environment</button>
    </form>
    <hr>

    <h2>Routes</h2>
    <select id="viewchanger" onchange="changeView(this)">
        <option value="tree" selected>Tree View</option>
        <option value="list">List View</option>
    </select>
    <div id="treeview">
        <button onClick="unfoldeverything()">Unfold everything</button>
        <button onClick="collapseeverything()">Collapse everything</button>
        <%
            routetree.printHTML(out, envname, 0);
        %>
    </div>
    <div id="listview" style="display: none">
	    <ul>
	<%
		for(int i = 0; i < routes.length; i++) {
			out.print("<li><a href='route.jsp?id=" + i + "&name=" + envname + "'>" + routes[i] + "</a></li>");
		}
	%>
	    </ul>
    </div>
	<form method="post" action="routes">
        <table>
            <tr>
                <td>Route Template:</td>
		        <td><input type="text" name="routelink"></td>
            </tr>
            <tr>
                <td>Natural Library:</td>
		        <td><input type="text" name="library"></td>
            </tr>
            <tr>
                <td>Natural Program:</td>
		        <td><input type="text" name="program"></td>
            </tr>
            <tr>
                <td style="text-align: center">Login: <input type="checkbox" name="login"></td>
                <td style="text-align: center">Active: <input type="checkbox" name="active" checked></td>
            </tr>
            <tr>
                <td>Loglevel:</td>
                <td>
                    <select name="loglevel" style="width: 100%">
                        <option value="DEVELOP">Develop</option>
                        <option value="DEBUG">Debug</option>
                        <option value="INFO">Info</option>
                        <option value="WARN">Warning</option>
                        <option value="ERROR" selected>Error</option>
                        <option value="FATAL">Fatal</option>
                    </select>
                </td>
            </tr>
        </table>
		<input value="<%= envname %>" name="_envname" type="hidden">
		<input value="put" name="_method" type="hidden">
		<button type="submit">Add Route</button>
	</form>
    <hr>
    <h2>Environment Variablen</h2>
    <ul>
<%
	for(int i = 0; i < environs.length; i++) {
		out.print("<li><a href='environmentvar.jsp?envname=" + envname + "&environname=" + environs[i].name + "'>" + environs[i].name + "</a></li>");
	}
%>
    </ul>
    <form method="post" action="environmentvar">
        <table>
            <tr>
                <td>Name:</td>
                <td><input type="text" name="varname"></td>
            </tr>
            <tr>
                <td>Value:</td>
                <td><input type="text" name="content"></td>
            </tr>
            <tr>
                <td>Append?:</td>
                <td><input type="checkbox" name="append"></td>
            </tr>
        </table>
        <input value=<%= envname %> name="_envname" type="hidden">
        <input value="put" name="_method" type="hidden">
        <button type="submit">Add Environ</button>
    </form>
</body>
<script>
	function changeView(target) {
		var view = target.options[target.selectedIndex].value;
		console.log(view);
		if(view === "tree") {
			document.getElementById("treeview").style.display = "block";
			document.getElementById("listview").style.display = "none";
		} else {
			document.getElementById("treeview").style.display = "none";
			document.getElementById("listview").style.display = "block";
		}
	}
	
	function unfoldeverything() {
		var targets = document.getElementsByClassName("tree")[0].getElementsByTagName("li");
		for(var i = 0; i < targets.length; i = i + 1) {
			targets[i].style.display = "block";
		}
		
		targets = document.getElementsByClassName("arrow");
		for(var i = 0; i < targets.length; i = i + 1) {
			targets[i].className += " rotate-arrow";
		}
	}
	
	function collapseeverything() {
		var targets  = document.getElementsByClassName("tree")[0].children;
		//TODO: find a better way. 
		//The list elements in the first ul are not allowed to get set to "display: none"
		//so I must jump over them
		for(var i = 0; i < targets.length; i = i + 1) {
			if(targets[i].tagName === "LI") {
				var childs = targets[i].getElementsByTagName("li");;
				for(var x = 0; x < childs.length; x = x + 1) {
						childs[x].style.display = "none";
				}
			}
		}
		
		var tmp = document.querySelectorAll(".rotate-arrow");
		for(var i = 0; i < tmp.length; i = i + 1) {
			tmp[i].className = tmp[i].className.replace(" rotate-arrow", "");
		}
		
	}
	
	var arrows = document.getElementsByClassName("arrow");
	for(var i = 0; i < arrows.length; i = i + 1) {
		arrows[i].onclick = function() {
			var childs = this.parentElement.children;
			for(var i = 0; i < childs.length; i = i + 1) {
				if(childs[i].tagName === "LI") {
					if(childs[i].style.display == "none") {
						childs[i].style.display = "block";	
					} else {
						childs[i].style.display = "none";
					}
				}
			}
			if(!this.classList.contains("rotate-arrow")) {
				this.className += " rotate-arrow";
			} else {
				this.className = this.className.replace(" rotate-arrow", "");
			}
		}
	}
</script>
</html>
