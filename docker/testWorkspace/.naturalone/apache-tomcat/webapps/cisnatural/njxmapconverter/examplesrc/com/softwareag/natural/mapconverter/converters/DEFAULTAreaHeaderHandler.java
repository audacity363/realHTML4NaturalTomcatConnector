/*
 * Copyright (c) 2008 SOFTWARE AG, All Rights Reserved.
 *
 */

package com.softwareag.natural.mapconverter.converters;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import com.softwareag.natural.mapconverter.IAreaHeaderHandler;
import com.softwareag.natural.mapconverter.MapxmlPage;
import com.softwareag.natural.mapconverter.sdo.ItemWrapper;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.GridArea;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.GridHeader;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.SequenceArea;
import commonj.sdo.DataObject;

/**
 * Default identification handler for area headers. It applies GridHeaders to
 * all GridAreas of the extended map extract. Default means that simple the name
 * of the corresponding column fields is used for the GridHeader.
 */
public class DEFAULTAreaHeaderHandler implements IAreaHeaderHandler {
	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IAreaHeaderHandler#handleHeaders(
	 * com.softwareag.natural.mapconverter.MapxmlPage)
	 */
	public void handleHeaders(MapxmlPage mapxmlPage) {

		Collection gridAreas = mapxmlPage.findGridAreas();

		Iterator iterator = gridAreas.iterator();
		while (iterator.hasNext()) {
			GridArea area = (GridArea) iterator.next();
			List sareas = area.getSequenceArea();
			if (sareas.isEmpty())
				continue;
			SequenceArea sarea = (SequenceArea) sareas.get(0);
			List sitems = sarea.getIfField();
			int itemcount = sitems.size();
			for (int s = 0; s < itemcount; s++) {
				DataObject item = (DataObject) sitems.get(s);
				createDefaultHeader(area, item);
			}
		}
	}

	/**
	 * Creates a default GridHeader object for the specified item. The
	 * GridHeader object is implicitly added to the GridArea. Default means that
	 * the corresponding item name is used. <br>
	 * The item usually is an IfField object. But it can be any of the following
	 * DataObjects: <br>
	 * <ul>
	 * <li>IfField</li>
	 * <li>LtLiteral</li>
	 * <li>SequenceArea</li>
	 * <li>GridArea</li>
	 * <li>DfField</li>
	 * 
	 * @param area
	 *            the GridArea object to which the GridHeader is added
	 * @param item
	 *            the item from which the default GridHeader is derived
	 */
	protected void createDefaultHeader(GridArea area, DataObject item) {
		GridHeader header = area.createGridHeader();
		String propName = ItemWrapper.getName(item);
		String displayName = propName;
		int idot = propName.lastIndexOf(".");
		if (idot > 0)
			displayName = propName.substring(idot + 1);

		header.setHdName(displayName);
		header.setPropName(propName);
	}
}
