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
 * Tag converter for <code>&lt;textgridsss2&gt;</code> control tags.
 * 
 */
public class TEXTGRIDSSS2Converter extends DEFAULTConverter {

	/**
	 * Default Constructor.
	 */
	public TEXTGRIDSSS2Converter() {
		super();
	}

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
			return "" + ((ConvUtil.getWidth(attributeValues, logger) * ConvUtil.getWidthFactor(attributeValues, logger)) + 20);
		}
		return null;
	}
}
