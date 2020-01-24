/*
 * Copyright (c) 2008 SOFTWARE AG, All Rights Reserved.
 *
 */

package com.softwareag.natural.mapconverter.converters;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import com.softwareag.natural.mapconverter.MapxmlPage;
import com.softwareag.natural.mapconverter.sdo.ItemWrapper;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.GridArea;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.GridHeader;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.SequenceArea;
import commonj.sdo.DataObject;

/**
 * Area header handler which tries to use literals in the row above the grid
 * area as header. <br>
 * </br> The header identification is as follows: <br>
 * </br>
 * <ol>
 * <li>check if the row above the grid contains only literals above the grid
 * area.</li>
 * <li>if the check above is not true, the default header identification based
 * on field names is used.</li>
 * <li>if the check is true, the literals used as grid headers are removed from
 * the row above. Removing a row means replacing the literals with an empty
 * area. Hint: empty areas can be mapped differently via mapping rules.</li>
 * </ol>
 * 
 */
public class LiteralAreaHeaderHandler extends DEFAULTAreaHeaderHandler {

	static final String SPLIT_PATTERN = "[\\p{Space}]+";

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.converters.DEFAULTAreaHeaderHandler
	 * #handleHeaders(com.softwareag.natural.mapconverter.MapxmlPage)
	 */
	public void handleHeaders(MapxmlPage mapxmlPage) {
		Collection gridAreas = mapxmlPage.findGridAreas();

		int areacount = gridAreas.size();
		int[] rowsToRemove = new int[areacount];
		for (int i = 0; i < areacount; i++) {
			rowsToRemove[i] = -1;
		}

		Iterator iterator = gridAreas.iterator();
		int ai = -1;
		while (iterator.hasNext()) {
			GridArea area = (GridArea) iterator.next();
			ai++;
			List sareas = area.getSequenceArea();
			if (sareas.isEmpty())
				continue;
			// now check if there is a header line

			int literalRow = area.getStartRow() - 1;
			if (literalRow > 1) {
				List headerItems = mapxmlPage.getCols(literalRow);
				SequenceArea seqArea = (SequenceArea) sareas.get(0);
				List seqItems = seqArea.getIfField();
				int scount = seqItems.size();
				if (isLiteralRow(headerItems, scount)) {
					int hindex = 0;
					int s = 0;
					while (s < scount) {
						DataObject sitem = (DataObject) seqItems.get(s);
						int scol = ItemWrapper.getCol(sitem);
						int scolnext = -1;
						if (s + 1 < scount)
							scolnext = ItemWrapper.getCol((DataObject) seqItems.get(s + 1));
						String sname = ItemWrapper.getName(sitem);
						DataObject hitem = null;
						if (hindex < headerItems.size()) {
							hitem = (DataObject) headerItems.get(hindex);
						}

						int hcol = ItemWrapper.getCol(hitem);
						int hcolwidth = ItemWrapper.getWidth(hitem);
						if (hcolwidth < 0)
							hcolwidth = 0;

						if ((hcol <= scol && (hcol >= area.getStartCol())) || (scolnext > -1 && (hcol + hcolwidth) > scol && hcol < scolnext)) {
							String headerValue = ItemWrapper.getName(hitem);
							String[] headers = headerValue.split(SPLIT_PATTERN);
							for (int hi = 0; hi < headers.length; hi++) {
								GridHeader header = area.createGridHeader();
								header.setHdName(headers[hi]);
								sitem = (DataObject) seqItems.get(s);
								sname = ItemWrapper.getName(sitem);
								header.setPropName(sname);
								s++;
							}
							hindex++;
						}
						else {
							GridHeader header = area.createGridHeader();
							header.setHdName(" ");
							header.setPropName(sname);
							s++;
						}
					}
					rowsToRemove[ai] = literalRow;
				}
				else {
					for (int s = 0; s < scount; s++) {
						super.createDefaultHeader(area, (DataObject) seqItems.get(s));
					}
				}
			}
		}
		for (int i = 0; i < areacount; i++) {
			if (rowsToRemove[i] > 1)
				mapxmlPage.removeRow(rowsToRemove[i]);
		}

	}

	private boolean isLiteralRow(List items, int cols) {
		int ic = items.size();
		if (ic == 0)
			return false;
		for (int i = 0; i < ic; i++) {
			DataObject item = (DataObject) items.get(i);
			if (!ItemWrapper.isLtLiteral(item))
				return false;
		}
		return true;
	}
}
