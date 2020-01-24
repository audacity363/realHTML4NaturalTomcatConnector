package com.softwareag.natural.mapconverter.converters;

import java.util.Map;

import com.softwareag.natural.mapconverter.ComplexTemplate;
import com.softwareag.natural.mapconverter.ITagConverter;
import com.softwareag.natural.mapconverter.logger.MapconverterLogger;

public class EMPTYConverter implements ITagConverter {

	public void convert(ComplexTemplate template, Map attributeValues, StringBuffer outBuffer, MapconverterLogger logger) {
		// simply do nothing

	}

}
