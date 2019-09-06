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
 * Tag converter for <code>&lt;column&gt;</code> control tags.
 * 
 */
public class COLUMNConverter extends DEFAULTConverter {

	/**
	 * Default Constructor.
	 */
	public COLUMNConverter() {
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
		if (name.equalsIgnoreCase("width")) {
			return "" + ConvUtil.convertWidth(attributeValues, logger);
		}
		if (name.equalsIgnoreCase("property")) {
			return (String) attributeValues.get(NameUtil.VAR_ITEMNAME);
		}
		if (name.equalsIgnoreCase("name")) {
			return (String) attributeValues.get(NameUtil.VAR_ITEMNAME);
		}
		return null;
	}
}
