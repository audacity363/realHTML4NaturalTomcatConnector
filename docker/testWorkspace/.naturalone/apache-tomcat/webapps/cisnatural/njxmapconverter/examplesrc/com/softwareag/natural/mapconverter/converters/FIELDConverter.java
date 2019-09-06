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
 * Tag converter for <code>&lt;field&gt;</code> control tags.
 * 
 */
public class FIELDConverter extends DEFAULTConverter {

	/**
	 * Default Constructor.
	 */
	public FIELDConverter() {
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

		if (name.equalsIgnoreCase("valueprop")) {
			return (String) attributeValues.get(NameUtil.VAR_ITEMNAME);
		}
		if (name.equalsIgnoreCase("length")) {
			return "" + ConvUtil.convertLength(attributeValues, logger);
		}
		return null;
	}
}
