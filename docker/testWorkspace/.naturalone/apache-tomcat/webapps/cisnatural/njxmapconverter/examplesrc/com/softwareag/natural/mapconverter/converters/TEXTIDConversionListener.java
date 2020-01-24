/*
 * Copyright (c) 2008 SOFTWARE AG, All Rights Reserved.
 *
 */

package com.softwareag.natural.mapconverter.converters;

import java.io.File;
import java.io.FileWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.logging.Level;

import com.softwareag.cis.file.FileManager;
import com.softwareag.natural.mapconverter.IConversionListener;
import com.softwareag.natural.mapconverter.MapxmlPage;
import com.softwareag.natural.mapconverter.logger.MapconverterLogger;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.IfField;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.LtLiteral;

/**
 * An example listener which generates localization files and corresponding
 * textids. <br>
 * It implements the IConversionListener interface: <li>In the start() method it
 * initializes private data structures to collect the textids.</li> <li>In the
 * finish() method it writes the following file:
 * ./multilanguage/en/textidconv.csv.</li> <li>In the startLiteral() method it
 * derives a convenient textid from the name of the passed literal.</li> <br>
 * 
 * @href {@link IConversionListener}
 */
public class TEXTIDConversionListener implements IConversionListener {

	private MapconverterLogger m_logger;
	private String m_project;
	private Map m_textids = new HashMap();
	private int m_idCounter = 0;

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IConversionListener#finish()
	 */
	public void finish() {
		try {
			m_logger.logMessageLine(Level.INFO, TEXTIDConversionListener.class.getName() + "finish()");
			FileManager.ensureThatDirectoryExists(m_project + "/" + "multilanguage");
			FileManager.ensureThatDirectoryExists(m_project + "/" + "multilanguage/en/");
			File file = new File(m_project + "/" + "multilanguage/en/" + "textidconv.csv");
			if (file.exists()) {
				file.delete();
				file.createNewFile();
			}
			StringBuffer buffer = new StringBuffer();
			Iterator iterator = m_textids.keySet().iterator();
			while (iterator.hasNext()) {
				String textid = (String) iterator.next();
				String textval = (String) m_textids.get(textid);
				buffer.append(textid);
				buffer.append(";");
				buffer.append(textval);
				buffer.append("\n");
			}
			FileWriter writer = new FileWriter(file);
			writer.write(buffer.toString());
			writer.flush();
			writer.close();

		}
		catch (Throwable t) {
			m_logger.logMessageLine(Level.SEVERE, t.getMessage());
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#finishField()
	 */
	public void finishField() {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#finishLiteral()
	 */
	public void finishLiteral() {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IConversionListener#finishMap()
	 */
	public void finishMap() {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IConversionListener#finishRow()
	 */
	public void finishRow() {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#start(java.lang
	 * .String, com.softwareag.natural.mapconverter.logger.MapconverterLogger)
	 */
	public void start(String projectName, MapconverterLogger logger) {
		m_logger = logger;
		m_project = projectName;
		m_logger.logMessageLine(Level.INFO, TEXTIDConversionListener.class.getName() + "start() " + projectName);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#startField(com
	 * .softwareag.natural.sdo.mapxml.nat.mapxml4sdo.IfField, java.util.Map)
	 */
	public void startField(IfField field, Map attributeVals) {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#startLiteral(
	 * com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.LtLiteral,
	 * java.util.Map)
	 */
	public void startLiteral(LtLiteral literal, Map attributeVals) {
		m_idCounter++;
		String textid = "TEXT_" + literal.getLtRow() + "_" + m_idCounter;
		m_textids.put(textid, attributeVals.get("$$name$$"));
		attributeVals.put("$$textid$$", textid);
		m_logger.logMessageLine(Level.INFO, TEXTIDConversionListener.class.getName() + "startLiteral()  " + attributeVals.toString());
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#startMap(com.
	 * softwareag.natural.mapconverter.MapxmlPage)
	 */
	public void startMap(MapxmlPage mapxml) {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#startRow(int)
	 */
	public void startRow(int i) {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#finishFieldTarget
	 * ()
	 */
	public void finishFieldTarget() {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#finishLiteralTarget
	 * ()
	 */
	public void finishLiteralTarget() {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#startFieldTarget
	 * (com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.IfField,
	 * java.lang.String, java.util.Map)
	 */
	public void startFieldTarget(IfField field, String targetItem, Map attributeVals) {
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IConversionListener#startLiteralTarget
	 * (com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.LtLiteral,
	 * java.lang.String, java.util.Map)
	 */
	public void startLiteralTarget(LtLiteral literal, String targetItem, Map attributeVals) {
	}

}
