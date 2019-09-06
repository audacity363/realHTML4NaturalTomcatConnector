/*
 * Copyright (c) 2008 SOFTWARE AG, All Rights Reserved.
 *
 */

package com.softwareag.natural.mapconverter.converters;

import java.util.Map;

import com.softwareag.natural.mapconverter.ConvUtil;
import com.softwareag.natural.mapconverter.NameUtil;
import com.softwareag.natural.mapconverter.logger.MapconverterLogger;

/**
 * Tag converter for <code>&lt;rowtableare2&gt;</code> control tags.
 * 
 */
public class ROWTABLEAREA2Converter extends DEFAULTConverter {

	/**
	 * Default Constructor.
	 */
	public ROWTABLEAREA2Converter() {
		super();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.converters.DEFAULTConverter#
	 * resolveAttribute(java.lang.String, java.util.Map,
	 * com.softwareag.natural.mapconverter.logger.MapconverterLogger)
	 */
	public String resolveAttribute(String name, Map attributeValues, MapconverterLogger logger) {
		if (attributeValues.containsKey(name)) {
			return (String) attributeValues.get(name);
		}
		if (name.equalsIgnoreCase("griddataprop")) {
			return (String) attributeValues.get(NameUtil.VAR_ITEMNAME);
		}
		if (name.equalsIgnoreCase("rowcount")) {
			return (String) attributeValues.get(NameUtil.VAR_ROWCOUNT);
		}
		if (name.equalsIgnoreCase("width")) {
			return "" + (ConvUtil.convertWidth(attributeValues, logger));
		}
		return null;
	}
}
