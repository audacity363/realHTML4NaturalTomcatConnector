package realHTML.tomcat.config;

import java.lang.reflect.Method;

import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import realHTML.tomcat.config.exceptions.ExportException;
import realHTML.tomcat.config.exceptions.ImportException;

public class ImportExportHelper {
	private enum ImportExportMode {
		IMPORT, EXPORT;
	}
	
	private ImportExportMode mode;
	private Document doc;
	private String valueName;
	private Class<?> valueType;
	private String methodName;
	private boolean required;
	private Object defaultValue;

	//Constructors for import mode
	public ImportExportHelper(String valueName) {
		this.mode = ImportExportMode.IMPORT;
		this.valueName = valueName;
		this.valueType = String.class;
		this.required = true;
		this.defaultValue = "";
		this.setMethodName(valueName);
	}

	public ImportExportHelper(String valueName, boolean required) {
		this.mode = ImportExportMode.IMPORT;
		this.valueName = valueName;
		this.valueType = String.class;
		this.required = required;
		this.defaultValue = "";
		this.setMethodName(valueName);
	}
	
	public ImportExportHelper(String valueName, Class<?> valueType) {
		this.mode = ImportExportMode.IMPORT;
		this.valueName = valueName;
		this.valueType = valueType;
		this.required = true;
		this.defaultValue = null;
		this.setMethodName(valueName);
	}
	
	public ImportExportHelper(String valueName, Class<?> valueType, boolean required) {
		this.mode = ImportExportMode.IMPORT;
		this.valueName = valueName;
		this.valueType = valueType;
		this.required = required;
		this.defaultValue = null;
		this.setMethodName(valueName);
	}
	
	public ImportExportHelper(String valueName, Class<?> valueType, boolean required, Object defaultValue) {
		this.mode = ImportExportMode.IMPORT;
		this.valueName = valueName;
		this.valueType = valueType;
		this.required = required;
		this.defaultValue = defaultValue;
		this.setMethodName(valueName);
	}
	
	//Constructors for export mode
	
	public ImportExportHelper(Document doc, String valueName) {
		this.mode = ImportExportMode.EXPORT;
		this.doc = doc;
		this.valueName = valueName;
		this.setMethodName(valueName);
	}
	
	private void setMethodName(String valueName) {
		this.methodName = (this.mode == ImportExportMode.IMPORT ? "set" : "get") + valueName.substring(0, 1).toUpperCase() + valueName.substring(1);
	}
	
	
	//Import functions
	public void setValueOnTargetfromAttribute(Element src, Object dst) throws ImportException {
		if(!(this.mode == ImportExportMode.IMPORT)) {
			throw new ImportException("Setting values on objects is only valid in import mode");
		}
		
		String value = src.getAttribute(this.valueName);
		this.setValueOnTarget(value, dst);
	}
	
	public void setValueOnTargetfromNode(Element src, Object dst) throws ImportException {
		if(!(this.mode == ImportExportMode.IMPORT)) {
			throw new ImportException("Setting values on objects is only valid in import mode");
		}
		
		NodeList childs = src.getElementsByTagName(this.valueName);
		Element target;
		
		if(childs.getLength() == 0 && this.required) {
			throw new ImportException("Could not find node " + this.valueName + " but it is required");
		}
		
		target = (Element)childs.item(0);
		this.setValueOnTarget(target.getTextContent(), dst);
	}
	
	private void setValueOnTarget(String value, Object dst) throws ImportException {
		if(!(this.mode == ImportExportMode.IMPORT)) {
			throw new ImportException("Setting values on objects is only valid in import mode");
		}
		
		Object setValue;
		
		if(value.isEmpty() || StringUtils.isBlank(value)) {
			if (this.required) {
				throw new ImportException("Value in attribute or node " + this.valueName + " is empty but required");
			}
			setValue = this.defaultValue;
		} else {
			if(this.valueType == String.class) {
				setValue = value;
			} else if(this.valueType.equals(boolean.class)) {
				setValue = ((value.equals("true") ? true : false));
			} else {
				throw new ImportException("Class " + this.valueType + " currently not supported on import");
			}
		}
		
		try {
			Method setMethod = dst.getClass().getMethod(methodName, this.valueType);
			setMethod.invoke(dst, setValue);
		} catch(Exception e) {
			throw new ImportException("Error while calling setMethod " + this.methodName, e);
		}
	}
	
	//Export functions
	public void setValueOnAttributefromTarget(Object src, Element dst) throws ExportException {
		try {
			dst.setAttribute(this.valueName, this.getValueFromSourceObject(src));
		} catch(Exception e) {
			throw new ExportException("Could not get value from attribute " + this.valueName, e);
		}
	}
	
	public void setValueOnNodefromTarget(Object src, Element dst) throws ExportException {
		Element target = this.doc.createElement(this.valueName);
		try {
			target.setTextContent(this.getValueFromSourceObject(src));
		} catch(Exception e) {
			throw new ExportException("Could not get value from attribute " + this.valueName, e);
		}
		
		dst.appendChild(target);
	}
	
	private String getValueFromSourceObject(Object src) throws ExportException {
		Object value;
		
		try {
			Method getMethod = src.getClass().getMethod(this.methodName);
			value = getMethod.invoke(src);
		} catch(Exception e) {
			throw new ExportException("Error while calling setMethod " + this.methodName, e);
		}
		
		return value.toString();
	}
}
