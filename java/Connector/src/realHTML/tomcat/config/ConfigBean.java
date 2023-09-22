package realHTML.tomcat.config;

import java.io.IOException;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Locale;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.context.ExternalContext;
import javax.faces.context.FacesContext;
import javax.faces.event.ValueChangeEvent;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.ServletContext;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.primefaces.PrimeFaces;
import org.primefaces.event.NodeSelectEvent;
import org.primefaces.model.DefaultTreeNode;
import org.primefaces.model.TreeNode;
import org.primefaces.util.LangUtils;

import lombok.Getter;
import lombok.Setter;
import realHTML.Utils;
import realHTML.tomcat.config.exceptions.ConfigException;
import realHTML.tomcat.environment.Environment;
import realHTML.tomcat.environment.EnvironmentVar;
import realHTML.tomcat.routing.Route;
import realHTML.tomcat.routing.Routing;

@Named("configBean")
@ViewScoped
public class ConfigBean implements Serializable {

	private static final long serialVersionUID = 9131248247829440254L;

	final Logger LOGGER = LogManager.getLogger(this.getClass());

	@Inject
	private @Getter ConfigService configService;

	private @Setter String globalLoglevel;
	
	private @Getter int selectedTabIndex;
	private @Getter ArrayList<String> environmentNames;

	private @Getter Environment currentEnv;
	private @Getter EditingModes environmentEditMode;
	private @Getter @Setter String environmentName;
	
	//Environment Variable
	private @Getter @Setter EnvironmentVar selectedEnvironmentVar;
	private @Getter EditingModes environmentVariableEditMode;
	
	//Route
	private TreeNode<RouteTreeWrapper> routeTree;
	private @Getter RouteTreeWrapper selectedRouteEntry;
	private @Getter EditingModes routeEditMode;

	private ServletContext getServletContext() {
		return (ServletContext)FacesContext.getCurrentInstance().getExternalContext().getContext();
	}
	
	private void addGrowl(FacesMessage.Severity severity, String summary, String detail) {
		FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(severity, summary, detail));
		PrimeFaces.current().ajax().update("growl");
		PrimeFaces.current().ajax().addCallbackParam("validationFailed", true);
	}
	
	private void showEnvironmentSaveWarning() {
		PrimeFaces.current().executeScript("showEnvironmentSaveWarning();");
	}
	
	private void resetEnvironmentConfigChanged() {
		PrimeFaces.current().executeScript("resetEnvironmentConfigChanged();");
	}

	@PostConstruct
	public void init() {
		
		try {
			this.configService.init(this.getServletContext());
		} catch(ConfigException e) {
			throw new RuntimeException(e);
		}
		
		try {
			this.environmentNames = new ArrayList<String>(this.configService
					.getEnvironments()
					.keySet());
		} catch (ConfigException e) {
			throw new RuntimeException(e);
		}

		this.environmentName = FacesContext.getCurrentInstance().getExternalContext().getRequestParameterMap()
				.get("environ");
		if (this.environmentName == null) {
			this.environmentEditMode = EditingModes.NEW;
			this.currentEnv = new Environment();
			return;
		}
		
		try {
			this.currentEnv = this.configService.getEnvironment(this.environmentName);
		} catch(ConfigException e) {
			throw new RuntimeException(e);
		}
			
		if(this.currentEnv == null) {
			this.redirectToEnvironment(null);
			return;
		}
		this.environmentEditMode = EditingModes.EDIT;

		this.selectedTabIndex = this.environmentNames.indexOf(this.environmentName)+1;

		LOGGER.debug("environentEditMode: " + this.environmentEditMode);
		LOGGER.debug("selected Tab Index:" + this.selectedTabIndex);
	}

	public void onSaveConfig(){
		LOGGER.debug("Saving config");
		try {
			this.configService.saveConfigToFile();
		} catch(ConfigException e) {
			this.addGrowl(FacesMessage.SEVERITY_ERROR, "Config Error", Utils.stackTraceToString(e));
		}
	}
	
	public void onReloadConfig() {
		LOGGER.debug("Reload config");
		try {
			this.configService.reloadConfig();
			this.environmentNames = new ArrayList<String>(this.configService
				.getEnvironments()
				.keySet());
		} catch(Exception e) {
			this.addGrowl(FacesMessage.SEVERITY_ERROR, "Config Error", Utils.stackTraceToString(e));
		}
		this.redirectToEnvironment(environmentName);
	}

	// TODO: Refactor and cleanup
	public TreeNode<RouteTreeWrapper> getRoutingTree() {
		RouteTreeWrapper wrapper;
		String type = null;

		this.routeTree = new DefaultTreeNode<RouteTreeWrapper>();
		if (this.currentEnv == null) {
			return this.routeTree;
		}

		Routing routing = this.currentEnv.getRouting();
		Route[] routes = routing.getRoutes();

		for (int i = 0; i < routes.length; i++) {
			TreeNode<RouteTreeWrapper> searchAnker = this.routeTree;
			for (int x = 0; x < routes[i].getEntries().length; x++) {
				if (x == routes[i].getEntries().length - 1) {
					wrapper = new RouteTreeWrapper(routes[i].getEntries()[x], routes[i].getRoute(), routes[i].getTemplate());
					type = "endpoint";
				} else {
					wrapper = new RouteTreeWrapper(routes[i].getEntries()[x], null, null);
					type = "entry";
				}
				int index = getIndexOfChildObject(searchAnker, wrapper);
				if (index < 0) {
					searchAnker = new DefaultTreeNode<RouteTreeWrapper>(type, wrapper, searchAnker);
				} else {
					searchAnker = searchAnker.getChildren().get(index);
					// It could be that entries in a higher level gets processed after deeper levels
					// If this is the case the type must be updated
					if (searchAnker.getType() == "entry" && type == "endpoint") {
						searchAnker.setType("endpoint");
					}
				}
			}
		}
		return this.routeTree;
	}

	private int getIndexOfChildObject(TreeNode<RouteTreeWrapper> searchRoot, RouteTreeWrapper search) {
		String searchName = search.getEntry().getName();
		for (int i = 0; i < searchRoot.getChildCount(); i++) {
			if (searchRoot.getChildren().get(i).getData().getEntry().getName().equals(searchName)) {
				return i;
			}
		}
		return -1;
	}

	public boolean treeFilter(TreeNode<RouteTreeWrapper> treeNode, Object filter, Locale locale) {
		if (treeNode.getData() == null || filter == null) {
			return true;
		}
		if (treeNode.getData().getEndpoint() == null) {
			return false;
		}

		String filterText = filter.toString().trim().toLowerCase(locale);
		if (LangUtils.isBlank(filterText)) {
			return true;
		}

		return treeNode.getData().getEndpoint().getNatLibrary().toLowerCase().contains(filterText)
				|| treeNode.getData().getEndpoint().getNatProgram().toLowerCase().contains(filterText);
	}
	
	//TODO: Get rid of the Exception. Display is the proper way on the page
	public void onEnvironmentSave() {
		try {
			switch(this.environmentEditMode) {
			case NEW:
				this.configService.addEnvironment(this.environmentName, this.currentEnv);
				this.redirectToEnvironment(this.environmentName);
				break;
			case EDIT:
				this.configService.editEnvironment(this.environmentName, this.currentEnv);
				break;
			case DELETE:
				this.configService.deleteEnvironment(this.environmentName);
				this.redirectToEnvironment(null);
				break;
			}
		} catch(Exception e) {
			this.addGrowl(FacesMessage.SEVERITY_ERROR, "Environment Error", Utils.stackTraceToString(e));
			return;
		}
		
		this.resetEnvironmentConfigChanged();
	}
	
	public void onEnvironmentDelete() {
		this.environmentEditMode = EditingModes.DELETE;
		this.onEnvironmentSave();
	}
	
	private void redirectToEnvironment(String name){
		ExternalContext context = FacesContext.getCurrentInstance().getExternalContext();
		String target = "index.xhtml";
		if(name != null) {
			target += "?environ=" + name;
		}
		try {
			context.redirect(target);
		} catch(IOException e) {
			//TODO: Throw a valid Exception and display it on the page
			LOGGER.fatal("Could not redirect: ", e);
		}
	}

	// Route handling
	//TODO: Get rid of the Exception. Display is the proper way on the page
	public void onRouteSave() {
		LOGGER.debug("Processing " + this.selectedRouteEntry + " with mode " + this.routeEditMode);
		
		try {
			switch (this.routeEditMode) {
			case NEW:
				this.currentEnv.getRouting().addRoute(this.selectedRouteEntry.getUrlTemplate(), this.selectedRouteEntry.getEndpoint());
				break;
			case EDIT:
				this.currentEnv.getRouting().editRoute(this.selectedRouteEntry.getUrlTemplate(), this.selectedRouteEntry.getEndpoint());
				break;
			case DELETE:
				this.currentEnv.getRouting().deleteRoute(this.selectedRouteEntry.getUrlTemplate());
				break;
			}
		} catch(Exception e) {
			this.addGrowl(FacesMessage.SEVERITY_ERROR, "Config Error", Utils.stackTraceToString(e));
			return;
		}
		
		this.showEnvironmentSaveWarning();
	}

	public void onRouteSelect(NodeSelectEvent event) {
		@SuppressWarnings("unchecked")
		TreeNode<RouteTreeWrapper> node = event.getTreeNode();
		if (node.getType().equals("entry")) {
			// Nothing to to. Just a entry was clicked
			return;
		}

		this.selectedRouteEntry = node.getData();
		this.routeEditMode = EditingModes.EDIT;
		PrimeFaces.current().executeScript("PF('routeEditDialog').show();");
		PrimeFaces.current().ajax().update("routeEditDialog");
	}

	public void onRouteNew() {
		this.routeEditMode = EditingModes.NEW;
		this.selectedRouteEntry = new RouteTreeWrapper();
	}

	public void onRouteDelete() {
		this.routeEditMode = EditingModes.DELETE;
		this.onRouteSave();
	}

	// Environment Variable handling
	public void onEnvironmentVariableSave() {
		LOGGER.debug(
				"Processing " + this.selectedEnvironmentVar + " with mode " + this.environmentVariableEditMode);
		switch (this.environmentVariableEditMode) {
		case NEW:
			this.currentEnv.addEnvironmentVar(this.selectedEnvironmentVar);
			break;
		case EDIT:
			this.currentEnv.editEnvironmentVar(this.selectedEnvironmentVar);
			break;
		case DELETE:
			this.currentEnv.deleteEnvironmentVar(this.selectedEnvironmentVar.getName());
			break;
		}
		this.showEnvironmentSaveWarning();
	}

	public void onEnvironmentVariableNew() {
		this.environmentVariableEditMode = EditingModes.NEW;
		this.selectedEnvironmentVar = new EnvironmentVar();
	}

	public void onEnvironmentVariableEdit() {
		this.environmentVariableEditMode = EditingModes.EDIT;
	}

	public void onEnvironmentVariableDelete() {
		this.environmentVariableEditMode = EditingModes.DELETE;
		this.onEnvironmentVariableSave();
	}

	public void onGlobalLoglevelChange(ValueChangeEvent event) {
		this.configService.setGlobalLogLevel((String)event.getNewValue());
		this.addGrowl(FacesMessage.SEVERITY_INFO, "Global Loglevel sucessfully saved", "");
	}

	public String getGlobalLoglevel() {
		return this.configService.getGlobalLoglevel();
	}

}
