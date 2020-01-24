/*
 * Copyright (c) 2008 SOFTWARE AG, All Rights Reserved.
 *
 */

package com.softwareag.natural.mapconverter.converters;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.softwareag.natural.mapconverter.MapxmlPage;
import com.softwareag.natural.mapconverter.sdo.ItemWrapper;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.GridArea;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.GridHeader;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.SequenceArea;
import commonj.sdo.DataObject;

/**
 * Area header handler which tries to use underlined literals in the row above
 * the grid area as header. <br>
 * </br> The header identification is as follows: <br>
 * </br>
 * <ol>
 * <li>check if the rows above the grid contains underlined literals above the
 * grid area.</li>
 * <li>as underline pattern the following regex is used
 * <code>[\\p{Punct}\\p{Space}]+</code>. An empty line is also regarded as
 * underline pattern.</li>
 * <li>if the check above is not true, the default header identification based
 * on field names is used.</li>
 * <li>if the check is true, the literals used as grid headers are removed from
 * the row above. Removing a row means replacing the literals with an empty
 * area. Hint: empty areas can be mapped differently via mapping rules.</li>
 * </ol>
 */
public class UnderlineAreaHeaderHandler extends DEFAULTAreaHeaderHandler {

	private static final String UNDERLINE_PATTERN = "[\\p{Punct}\\p{Space}]+";

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.converters.DEFAULTAreaHeaderHandler
	 * #handleHeaders(com.softwareag.natural.mapconverter.MapxmlPage)
	 */
	public void handleHeaders(MapxmlPage mapxmlPage) {
		Collection gridAreas = mapxmlPage.findGridAreas();

		Iterator iterator = gridAreas.iterator();
		while (iterator.hasNext()) {
			GridArea area = (GridArea) iterator.next();
			List sareas = area.getSequenceArea();
			if (sareas.isEmpty())
				continue;
			// now check if there is a header line

			int underlineRow = area.getStartRow() - 1;
			boolean headerFound = false;

			List sitems = ((SequenceArea) sareas.get(0)).getIfField();
			int sitemsCount = sitems.size();
			if (underlineRow > 1) {
				List rowItems = mapxmlPage.getCols(underlineRow);

				if (isUnderline(rowItems)) {
					int headerRow = underlineRow - 1;
					List headerItems = mapxmlPage.getCols(headerRow);

					int itemcount = headerItems.size();
					for (int s = 0; s < itemcount; s++) {
						DataObject item = (DataObject) headerItems.get(s);
						GridHeader header = area.createGridHeader();
						header.setHdName(ItemWrapper.getName(item));
						if (sitemsCount > s)
							header.setPropName(ItemWrapper.getName((DataObject) sitems.get(s)));

					}
					headerFound = true;
					mapxmlPage.removeRow(underlineRow);
					mapxmlPage.removeRow(headerRow);
				}
			}

			if (!headerFound) {
				for (int s = 0; s < sitemsCount; s++) {
					DataObject item = (DataObject) sitems.get(s);
					super.createDefaultHeader(area, item);
				}
			}
		}

	}

	private boolean isUnderline(List items) {
		Pattern p = Pattern.compile(UNDERLINE_PATTERN);

		int ic = items.size();
		for (int i = 0; i < ic; i++) {
			DataObject item = (DataObject) items.get(i);
			if (!ItemWrapper.isLtLiteral(item))
				return false;
			String value = ItemWrapper.getName(item);
			Matcher m = p.matcher(value);
			if (!m.matches())
				return false;
		}
		// emtpy lines are also regarded as underline.
		return true;
	}
}
