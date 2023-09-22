package realHTML.tomcat.config;

import java.io.FileNotFoundException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Set;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.core.LoggerContext;
import org.apache.logging.log4j.core.config.Configuration;
import org.apache.logging.log4j.core.config.LoggerConfig;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import javax.servlet.ServletContext;

import realHTML.tomcat.config.exceptions.ConfigException;
import realHTML.tomcat.config.exceptions.ExportException;
import realHTML.tomcat.config.exceptions.ImportException;
import realHTML.tomcat.environment.Environment;

@Named
@ApplicationScoped
public class ConfigService {
	
	private class ConfigRevision implements Cloneable {
		private Integer revision;
		
		public ConfigRevision() {
			this.revision = 0;
		}
		
		public void increase() {
			this.revision += 1;
		}
		
		//Returns -1 if this is lower  than that
		//Returns 0  if this is equals than that
		//Returns +1 if this is higher than that
		public Integer compare(ConfigRevision that) {
			Integer themRevision = that.getRevision();
			
			if(this.revision > 0 && themRevision < 0)  {
				return -1;
			} else if(this.revision < 0 && themRevision > 0)
				return 1;
			
			if(this.revision < themRevision)
				return -1;
			else if(this.revision > themRevision)
				return 1;
			else
				return 0;
			
		}
		
		public Integer getRevision() {
			return this.revision;
		}
		
		public String toString() {
			return this.revision.toString();
		}
		
		@Override
		public ConfigRevision clone() throws CloneNotSupportedException {
			return (ConfigRevision)super.clone();
		}
	}

	private static final Logger LOGGER = LogManager.getLogger(ConfigService.class);
	
	private final String CONTEXT_PARAMETER_ENVIRONMENT = "environments";
	private final String CONTEXT_PARAMETER_CONFIGREVISION = "configrevision";
	private final String CONFIG_FILE_ENVIRONMENTVAR_NAME = "RH4NCONF";
	private final String LOGGING_PATH_ENVIRONMENTVAR_NAME = "RH4NLOG";
	
	private HashMap<String, Environment> environments;
	private boolean configFileDirty;
	private ServletContext context;
	private ConfigRevision configRevision = null;

	public String getLoggingPath() throws ConfigException {
		String loggingTargetPath = System.getenv(LOGGING_PATH_ENVIRONMENTVAR_NAME);
		if(loggingTargetPath == null) {
			throw new ConfigException("Could not get logging path from environmentvariable " + LOGGING_PATH_ENVIRONMENTVAR_NAME);
		}
		
		Path loggingPath = Paths.get(loggingTargetPath);
		if(!Files.exists(loggingPath)) {
			throw new ConfigException("Loggingpath [" + loggingTargetPath + "] does not exist");
		} else if(!Files.isDirectory(loggingPath)) {
			throw new ConfigException("Target loggingpath is not a directory ["+ loggingTargetPath + "]");
		} else if(!Files.isWritable(loggingPath)) {
			throw new ConfigException("Target loggingpath is not writeable ["+ loggingTargetPath + "]");
		}

		return loggingTargetPath;
	}

	public void setGlobalLogLevel(String level) {
		LoggerContext ctx = (LoggerContext)LogManager.getContext(false);
		Configuration config = ctx.getConfiguration();
		LoggerConfig loggerConfig = config.getLoggerConfig("realHTML");

		LOGGER.debug("Setting loglevel to " + level);
		switch(level) {
			case "TRACE":
				loggerConfig.setLevel(Level.TRACE);
				break;
			case "DEBUG":
				loggerConfig.setLevel(Level.DEBUG);
				break;
			case "INFO":
				loggerConfig.setLevel(Level.INFO);
				break;
			case "WARN":
				loggerConfig.setLevel(Level.WARN);
				break;
			case "ERROR":
				loggerConfig.setLevel(Level.ERROR);
				break;
			case "FATAL":
				loggerConfig.setLevel(Level.FATAL);
				break;
		}

		ctx.updateLoggers();
		this.configFileDirty = true;
	}

	public String getGlobalLoglevel() {
		LoggerContext ctx = (LoggerContext)LogManager.getContext(false);
		Configuration config = ctx.getConfiguration();
		LoggerConfig loggerConfig = config.getLoggerConfig("realHTML");
		Level currentLevel = loggerConfig.getLevel();

		if(currentLevel.compareTo(Level.TRACE) == 0) {
			return "TRACE";
		} else if(currentLevel.compareTo(Level.DEBUG) == 0) {
			return "DEBUG";
		} else if(currentLevel.compareTo(Level.INFO) == 0) {
			return "INFO";
		} else if(currentLevel.compareTo(Level.WARN) == 0) {
			return "WARN";
		} else if(currentLevel.compareTo(Level.ERROR) == 0) {
			return "ERROR";
		} else if(currentLevel.compareTo(Level.FATAL) == 0) {
			return "FATAL";
		}
		return "UNKOWN";
	}
	
	public void init(ServletContext context) throws ConfigException {
		this.context = context;
		
		ConfigRevision contextPtr = this.getConfigRevision();
		if(this.configRevision != null) {
			try {
				this.configRevision = contextPtr.clone();
			} catch(CloneNotSupportedException e) {
				throw new ConfigException("Could not clone config revision which is saved in the servlet context", e);
			}
		} else {
			this.configRevision = new ConfigRevision();
			this.setConfigRevision(this.configRevision);
		}
	}
	
	public HashMap<String, Environment> getEnvironments() throws ConfigException {
		this.loadConfig();
		return this.environments;
	}
	
	public Set<String> getEnvironmentNames() throws ConfigException {
		this.loadConfig();
		return this.environments.keySet();
	}
	
	public Environment getEnvironment(String name) throws ConfigException {
		this.loadConfig();
		return this.environments.get(name);
	}
	
	public boolean isConfigFileDirty() {
		return configFileDirty;
	}

	public void setConfigFileDirty(boolean configFileDirty) {
		this.configFileDirty = configFileDirty;
	}

	public void addEnvironment(String name, Environment environment) throws Exception {
		if(this.environments.containsKey(name)) {
			throw new Exception("Environment with the name [" + name + "] already exist!"); 
		}
		
		this.environments.put(name, environment);
		this.configFileDirty = true;
		this.increaseConfigRevision();
	}
	
	public void editEnvironment(String name, Environment environment) throws Exception {
		if(!this.environments.containsKey(name)) {
			throw new Exception("Could save changes. Environment name [" + name + "] could not be found in the cache");
		}
		this.environments.put(name, environment);
		this.configFileDirty = true;
		this.increaseConfigRevision();
	}
	
	public void deleteEnvironment(String name) throws Exception {
		if(!this.environments.containsKey(name)) {
			throw new Exception("Could delete environment. No environment with the name [" + name + "] was found");
		}
		this.environments.remove(name);
		this.configFileDirty = true;
		this.increaseConfigRevision();
	}
	
	public void reloadConfig() throws Exception {
		this.loadConfigFromFile();
		this.increaseConfigRevision();
	}
	
	private String getConfigFilePath() throws ConfigException {
		String configurationfile = System.getenv(CONFIG_FILE_ENVIRONMENTVAR_NAME);
		if(configurationfile == null) {
			throw new ConfigException("Enviroment variable " + CONFIG_FILE_ENVIRONMENTVAR_NAME + " is missing");
		}
		return configurationfile;
	}
	
	public void saveConfigToFile() throws ConfigException{
		Export export = new Export();
		try {
			export.exportConfigToFile(this.getConfigFilePath(), this.environments, this.getGlobalLoglevel());
		} catch(ExportException e) {
			throw new ConfigException("Error while saving config", e);
		}
		this.configFileDirty = false;
	}
	
	private void loadConfigFromFile() throws ConfigException {
		Import xmlimport = new Import();
		try {
			xmlimport.importFromFile(this.getConfigFilePath());
			this.environments = xmlimport.getEnvironments();
			this.setGlobalLogLevel(xmlimport.getGlobalLoglevel());
		} catch(ImportException e) {
			if(! (e.getCause() instanceof FileNotFoundException)) {
				throw new ConfigException(e);
			}
			LOGGER.warn("Configfile does not exist. There will be no environments defined");
			this.environments = new HashMap<>();
		}
		
		this.setEnvironmentsToContext();
		this.configFileDirty = false;
	}
	
	private void setEnvironmentsToContext() {
		context.setAttribute("environments", environments);
	}
	
	@SuppressWarnings("unchecked")
	private HashMap<String, Environment> loadConfigFromContext() throws ConfigException {
		Object environments = context.getAttribute(CONTEXT_PARAMETER_ENVIRONMENT);
		if(environments == null) {
			return null;
		}
		if(!environments.getClass().equals(HashMap.class)) {
			throw new ConfigException("Attribute \"" + CONTEXT_PARAMETER_ENVIRONMENT + "\" in ServletContext is class [" + environments.getClass() + "]. Expected a HashMap<String, Environment>.");
		}
		return (HashMap<String, Environment>)environments;
	}
	
	private boolean isConfigLoadedIntoContext() {
		return !(this.context.getAttribute(CONTEXT_PARAMETER_ENVIRONMENT) == null);
	}
	
	private void loadConfig() throws ConfigException {
		boolean isConfigInContext = isConfigLoadedIntoContext();
		ConfigRevision configRevision = this.getConfigRevision();
		
		LOGGER.debug("My revision: [" + this.configRevision + "] Global revision: [" + configRevision + "]");
		
		if(this.environments == null && !isConfigInContext) {
			//Nothing is loaded yet. Probably the first call after a restart of the webapp 
			LOGGER.debug("Config is not loaded into context. Loading from file");
			this.loadConfigFromFile();
			return;
		} else if((this.environments == null && isConfigInContext) || this.configRevision.compare(configRevision) < 0) {
			//Config is not yet loaded into the Service but is cached in the context. First Call of the Servlet/Bean
			LOGGER.debug("Config is not loaded into cache or revision has changed. (Re)loading from context");
			this.environments = this.loadConfigFromContext();
			try {
				this.configRevision = configRevision.clone();
			} catch(CloneNotSupportedException e) {
				throw new ConfigException("Could not clone config revision which is saved in the servlet context", e);
			}
		} else {
			LOGGER.debug("Nothing to do");
		}
	}
	
	private ConfigRevision getConfigRevision() throws ConfigException {
		Object revision = this.context.getAttribute(CONTEXT_PARAMETER_CONFIGREVISION);
		if(revision == null) {
			return null;
		}
		
		if(!(revision instanceof ConfigRevision)) {
			throw new ConfigException("Attribute \"" + CONTEXT_PARAMETER_CONFIGREVISION + "\" in ServletContext is class [" + revision.getClass() + "}. Expected a ConfigRevision");
		}
		
		return (ConfigRevision)revision;
	}
	
	private void increaseConfigRevision() throws ConfigException {
			this.configRevision.increase();
			this.setConfigRevision(this.configRevision);
	}
	
	private void setConfigRevision(ConfigRevision configRevision) {
		LOGGER.debug("Setting configRevision to " + configRevision);
		this.context.setAttribute(CONTEXT_PARAMETER_CONFIGREVISION, configRevision);
	}
}
