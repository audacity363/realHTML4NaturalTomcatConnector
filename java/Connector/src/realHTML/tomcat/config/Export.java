package realHTML.tomcat.config;

import java.io.File;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import realHTML.tomcat.config.exceptions.ExportException;
import realHTML.tomcat.environment.Environment;
import realHTML.tomcat.environment.EnvironmentVar;
import realHTML.tomcat.routing.Route;

public class Export {
	Document rootDoc;
	
	public void exportConfigToFile(String path, HashMap<String, Environment> environments, String globalLoglevel) throws  ExportException {
		DocumentBuilderFactory docFactory = DocumentBuilderFactory.newInstance();
		DocumentBuilder docBuilder;
		TransformerFactory transformerFactory;
		Transformer transformer;
		DOMSource source;
		StreamResult result;
		
		
		try {
			docBuilder = docFactory.newDocumentBuilder();
		} catch(Exception e) {
			throw new ExportException("Error while creating DocumentBuilder", e);
		}

		this.rootDoc = docBuilder.newDocument();
		Element rootElement = this.rootDoc.createElement("realHTML4Natural");
		rootElement.setAttribute("loglevel", globalLoglevel);
		this.rootDoc.appendChild(rootElement);
		
		Iterator<Entry<String, Environment>> itr = environments.entrySet().iterator();
		while(itr.hasNext()) {
			Entry<String, Environment> entry = itr.next();
			try {
				rootElement.appendChild(this.exportEnvironment(entry.getKey(), entry.getValue()));
			} catch(ExportException e) {
				throw new ExportException("Error while exporting environment " + entry.getKey(), e);	
			}
		}
		
		transformerFactory = TransformerFactory.newInstance();
		
		try {
			transformer = transformerFactory.newTransformer();
		} catch(Exception e) {
			throw new ExportException("Could not create XML transformer", e);
		}
		
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		source = new DOMSource(this.rootDoc);
		result = new StreamResult(new File(path));
		
		try {
			transformer.transform(source, result);
		} catch(Exception e) {
			throw new ExportException("Could not write XML document to file", e);
		}
	}
	
	private Element exportEnvironment(String name, Environment environment) throws ExportException{
		ImportExportHelper[] helper = {
				new ImportExportHelper(this.rootDoc, "natsrcpath"),
				new ImportExportHelper(this.rootDoc, "natbinpath"),
				new ImportExportHelper(this.rootDoc, "natparms"),
				new ImportExportHelper(this.rootDoc, "authServer"),
				new ImportExportHelper(this.rootDoc, "authHeaderField")
		};
		Element environmentElement = this.rootDoc.createElement("environment");
		Route[] routes = environment.getRouting().getRoutes();
		
		environmentElement.setAttribute("name", name);
		
		for(int i = 0; i < helper.length; i++) {
			helper[i].setValueOnAttributefromTarget(environment, environmentElement);
		}
		
		for(int i = 0; i < routes.length; i++) {
			environmentElement.appendChild(this.exportRoute(routes[i]));
		}
		
		for(int i = 0; i < environment.getEnvironvars().size(); i++) {
			environmentElement.appendChild(this.exportEnvironmentVariable(environment.getEnvironvars().get(i)));
		}
		
		return environmentElement;
	}
	
	private Element exportRoute(Route route) throws ExportException {
		Element routeElement = this.rootDoc.createElement("route");
		ImportExportHelper[] helper = {
			new ImportExportHelper(this.rootDoc, "natLibrary"),
			new ImportExportHelper(this.rootDoc, "natProgram"),
			new ImportExportHelper(this.rootDoc, "login"),
			new ImportExportHelper(this.rootDoc, "loglevel"),
			new ImportExportHelper(this.rootDoc, "active")
		};
		
		routeElement.setAttribute("path", route.getTemplate());
		for(int i = 0; i < helper.length; i++) {
			try {
				helper[i].setValueOnNodefromTarget(route.getRoute(), routeElement);
			} catch(ExportException e) {
				throw new ExportException("Error while exporting route " + route.getTemplate(), e);
			}
		}
		
		return routeElement;
	}
	
	private Element exportEnvironmentVariable(EnvironmentVar environmentVariable) throws ExportException {
		Element environmentVariableElement = this.rootDoc.createElement("environ");
		ImportExportHelper[] helper = {
				new ImportExportHelper(this.rootDoc, "name"),
				new ImportExportHelper(this.rootDoc, "value"),
				new ImportExportHelper(this.rootDoc, "append")
		};
		
		for(int i = 0; i < helper.length; i++) {
			try {
				helper[i].setValueOnNodefromTarget(environmentVariable, environmentVariableElement);
			} catch(ExportException e) {
				throw new ExportException("Error while exporting environment variable " + environmentVariable.getName(), e);
			}
		}
		
		return environmentVariableElement;
	}
}
