package realHTML.tomcat.config;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import realHTML.tomcat.config.exceptions.ImportException;
import realHTML.tomcat.environment.Environment;
import realHTML.tomcat.environment.EnvironmentVar;
import realHTML.tomcat.routing.Endpoint;

public class Import {	
	public HashMap<String, Environment> importFromFile(String path) throws ImportException {
		HashMap<String, Environment> environments = new HashMap<String, Environment>();
		Environment newEnvironment;
		String environmentName;
		ImportExportHelper[] importFields = {
				new ImportExportHelper("natsrcpath"), 
				new ImportExportHelper("natbinpath"), 
				new ImportExportHelper("natparms", false), 
				new ImportExportHelper("authServer", false), 
				new ImportExportHelper("authHeaderField", false)};
		
		DocumentBuilderFactory dbFactory; 
        DocumentBuilder dBuilder;
        Document doc;
        NodeList environmentsElements;
		Element targetElement;

        File inputFile = new File(path);
        
        if(!inputFile.exists()) {
        	throw new ImportException("Error while importing realHTML4Natural config", 
        			new FileNotFoundException("File " + path + " does not exist"));
        }

        dbFactory = DocumentBuilderFactory.newInstance();
        
        try {
        	dBuilder = dbFactory.newDocumentBuilder();
        	doc = dBuilder.parse(inputFile);
        } catch(Exception e) {
        	throw new ImportException("Could not parse realHTML4Natural config. Please check XML formating", e);
        }
        
        doc.getDocumentElement().normalize();
        
        environmentsElements = doc.getElementsByTagName("environment");
        for(int i = 0; i < environmentsElements.getLength(); i++) {
        	newEnvironment = new Environment();
			targetElement = (Element)environmentsElements.item(i);
			
			environmentName = targetElement.getAttribute("name");
			if(environmentName.isEmpty() || environmentName.isBlank()) {
				throw new ImportException("Name of environment in index " + i + " is empty");
			}
			
			for(int x = 0; x < importFields.length; x++) {
				try {
					importFields[x].setValueOnTargetfromAttribute(targetElement, newEnvironment);
				} catch(Exception e) {
					throw new ImportException("Error getting/setting attribute in environment " + environmentName, e);
				}
			}
				
			try {
				this.readRoutes(targetElement, newEnvironment);
			} catch(Exception e) {
				throw new ImportException("Error while reading routes for environment " + environmentName, e);
			}
			
			try {
				this.readEnvironmentVariables(targetElement, newEnvironment);
			} catch(Exception e) {
				throw new ImportException("Error while reading environment variables for environment " + environmentName, e);
			}
			
			environments.put(environmentName, newEnvironment);
        }
		
		return(environments);
	}
	
	private void readRoutes(Element environmentElement, Environment environment) throws ImportException {
		NodeList routeElements;
		Element routeElement;
		String urlTemplate;
		Endpoint newEndpoint;
		
		ImportExportHelper[] importFields = {
				new ImportExportHelper("natLibrary"), 
				new ImportExportHelper("natProgram"), 
				new ImportExportHelper("login", boolean.class, false, false), 
				new ImportExportHelper("loglevel", String.class, false, "ERROR"), 
				new ImportExportHelper("active", boolean.class, false, true)};
		
		routeElements = environmentElement.getElementsByTagName("route");
		for(int i = 0; i < routeElements.getLength(); i++) {
			newEndpoint = new Endpoint();
			routeElement = (Element)routeElements.item(i);
			urlTemplate = routeElement.getAttribute("path");
			if(urlTemplate.isEmpty() || urlTemplate.isBlank()) {
				throw new ImportException("url template on index " + i + "is empty or does not exist");
			}
			
			for(int x = 0; x < importFields.length; x++) {
				importFields[x].setValueOnTargetfromNode(routeElement, newEndpoint);
			}
			
			try {
				environment.getRouting().addRoute(urlTemplate, newEndpoint);
			} catch(Exception e) {
				throw new ImportException("Error while adding route " + urlTemplate, e);
			}
		}
		
	}
	
	private void readEnvironmentVariables(Element environmentElement, Environment environment) throws ImportException{
		NodeList environmentVariableElements;
		Element environmentVariableElement;
		EnvironmentVar newEnvironmentVariable;
		
		ImportExportHelper[] importFields = {
				new ImportExportHelper("name"), 
				new ImportExportHelper("value", String.class, false, ""), 
				new ImportExportHelper("append", boolean.class, false, false)};
		
		environmentVariableElements = environmentElement.getElementsByTagName("environ");
		for(int i = 0; i < environmentVariableElements.getLength(); i++) {
			newEnvironmentVariable = new EnvironmentVar();
			environmentVariableElement = (Element)environmentVariableElements.item(i);
			
			for(int x = 0; x < importFields.length; x++) {
				try {
					importFields[x].setValueOnTargetfromNode(environmentVariableElement, newEnvironmentVariable);
				} catch(Exception e) {
					throw new ImportException("Error reading node value", e);
				}
			}
			
			environment.addEnvironmentVar(newEnvironmentVariable);
		}
	}
}
