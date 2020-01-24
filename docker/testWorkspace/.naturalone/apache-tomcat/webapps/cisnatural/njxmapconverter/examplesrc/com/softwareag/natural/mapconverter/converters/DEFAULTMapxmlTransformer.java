package com.softwareag.natural.mapconverter.converters;

import java.util.List;
import java.util.Map;

import com.softwareag.natural.mapconverter.IExtendedIfField;
import com.softwareag.natural.mapconverter.IMapxmlTransformer;
import com.softwareag.natural.mapconverter.MapxmlPage;
import com.softwareag.natural.mapconverter.sdo.ItemWrapper;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.IfField;
import com.softwareag.natural.sdo.mapxml.nat.mapxml4sdo.IfIndex;
import commonj.sdo.DataObject;

/**
 * Implements a IMapxmlTransformer. This transformer adds additional information
 * to the map extract which allows the map converter to generate GRID controls
 * for multidimensional arrays.
 * <p>
 * Multidimensional arrays cannot be bound directly to GRID controls. For each
 * column in a GRID control a column name is required. This transformer is doing
 * the following:
 * <li>Identifies rows and columns with multidimensional array fields, which can
 * be bound to a grid.</li>
 * <li>Adds a column name to the identified multidimensional array fields.</li>
 * <li>Applies a name for the griddataprop. It uses the original
 * multidimensional arrayname and a prefix.</li>
 * <p>
 * The transformer can be customized via the following variables in the rules
 * file:
 * <li>$$colname$$ - the applied column name</li>
 * <li>$$mutidimprefix$$ - a prefix for the griddataprop</li>
 * <p>
 * <br>
 * *
 * 
 * @author zim
 * 
 */
public class DEFAULTMapxmlTransformer implements IMapxmlTransformer {
	private final static String VAR_COLNAME = "$$colname$$";
	private final static String VAR_MULTIDIMPREFIX = "$$mutidimprefix$$";
	private String m_colname = "col";
	private String m_multidimprefix = "MD_";
	private String m_arrayIndex = null;
	private String m_arrayIndexValue = null;
	private int m_colIndex = -1;
	private String m_arrayName = null;

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.softwareag.natural.mapconverter.IMapxmlTransformer#init(java.util
	 * .Map)
	 */
	public void init(Map globalVariables) {
		String value = (String) globalVariables.get(VAR_COLNAME);
		if (value != null && value.length() > 0)
			m_colname = value;
		value = (String) globalVariables.get(VAR_MULTIDIMPREFIX);
		if (value != null && value.length() > 0)
			m_multidimprefix = value;
		resetIndex();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IMapxmlTransformer#
	 * transformAfterRowsLoaded(com.softwareag.natural.mapconverter.MapxmlPage)
	 */
	public void transformAfterRowsLoaded(MapxmlPage mapxml) {
		int rowcount = mapxml.getRowCount();
		for (int i = 1; i <= rowcount; i++) {
			transformRow(mapxml.getCols(i));
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IMapxmlTransformer#
	 * transformAfterGridAreaIdentification
	 * (com.softwareag.natural.mapconverter.MapxmlPage)
	 */
	public void transformAfterGridAreaIdentification(MapxmlPage mapxml) {
		// no transformation
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IMapxmlTransformer#
	 * findMultidimensionalGridIndex
	 * (com.softwareag.natural.mapconverter.IExtendedIfField)
	 */
	public String findMultidimensionalGridIndex(IExtendedIfField field) {
		IfField iffield = field.getIfField();
		List indexList = iffield.getIfIndex();
		if (indexList.size() <= 1 || !field.hasMultiDimensionalIndex())
			return null;
		return field.getMultiDimensionalIndex();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IMapxmlTransformer#
	 * isRowInMultidimensionalGrid(int, java.lang.String, java.lang.String)
	 */
	public boolean isRowInMultidimensionalGrid(int row, String previousIndex, String index) {
		String[] multis = previousIndex.split(";");
		String[] nextMultis = index.split(";");
		if (multis.length != nextMultis.length)
			return false;

		boolean found = false;

		for (int i = 0; i < multis.length; i++) {
			if ((multis[i] == null) || (multis[i].trim().length() == 0)) {
				if (!((nextMultis[i] == null) || (nextMultis[i].trim().length() == 0)))
					return false;
			}
			else {
				int i1;
				int i2;
				try {
					i1 = Integer.parseInt(multis[i]);
					i2 = Integer.parseInt(nextMultis[i]);
				}
				catch (NumberFormatException e) {
					return false;
				}
				if (i2 == i1 + row)
					found = true;
				else {
					if (i1 != i2)
						return false;
				}
			}
		}
		return found;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.softwareag.natural.mapconverter.IMapxmlTransformer#discard()
	 */
	public void discard() {
	}

	// ===================================================

	private void transformRow(List cols) {
		resetIndex();
		int colcount = cols.size();
		int c = 0;
		while (c < colcount) {
			DataObject item = (DataObject) cols.get(c);
			if (!ItemWrapper.isIfField(item)) {
				resetIndex();
				c++;
				continue;
			}
			if (m_colIndex == -1) {
				c++;
				if (c < colcount) {
					DataObject nextitem = (DataObject) cols.get(c);
					if (!ItemWrapper.isIfField(nextitem)) {
						resetIndex();
						c++;
						continue;
					}
					findArrayIndex((IfField) item, (IfField) nextitem);
					if (m_colIndex >= 0) {
						transformIfField((IfField) item);
						transformIfField((IfField) nextitem);
						c++;
					}
				}
				else {
					break;
				}
			}
			else {
				findArrayIndex((IfField) item);
				if (m_colIndex >= 0) {
					transformIfField((IfField) item);
					c++;
				}
			}
		}
	}

	private void transformIfField(IfField iffield) {
		// set the name of the col
		iffield.set(ItemWrapper.NJX_ARRAYINDEX, m_arrayIndexValue);
		List indexList = iffield.getIfIndex();
		IfIndex indexobj = (IfIndex) indexList.get(m_colIndex);
		StringBuilder colname = new StringBuilder();
		colname.append(m_multidimprefix);
		colname.append(iffield.getIfName());
		colname.append(".");
		colname.append(m_colname);
		colname.append((indexobj.getIfOffset()));
		iffield.setString(ItemWrapper.NJX_COLNAME, colname.toString());
	}

	private void findArrayIndex(IfField iffield) {
		List indexlist = iffield.getIfIndex();
		int indexcount = indexlist.size();
		if (!iffield.getIfName().equalsIgnoreCase(m_arrayName) || indexcount < 2) {
			resetIndex();
			return;
		}

		StringBuilder arrayIndex = new StringBuilder();
		StringBuilder arrayValue = new StringBuilder();

		for (int i = 0; i < indexcount; i++) {
			if (i != m_colIndex) {
				IfIndex index = (IfIndex) indexlist.get(i);
				arrayIndex.append(i);
				arrayValue.append(index.getIfOffset());
			}
			else {
				arrayIndex.append(" ");
				arrayValue.append(" ");
			}
			arrayIndex.append(";");
			arrayValue.append(";");
		}

		if (!arrayIndex.toString().equals(m_arrayIndex) || !arrayValue.toString().equals(m_arrayIndexValue))
			resetIndex();

	}

	private void resetIndex() {
		m_arrayIndex = null;
		m_colIndex = -1;
		m_arrayName = null;
		m_arrayIndexValue = null;
	}

	private void findArrayIndex(IfField iffield, IfField nextfield) {
		resetIndex();

		List indexlist = iffield.getIfIndex();
		List nextlist = nextfield.getIfIndex();

		int indexcount = indexlist.size();
		int nextindexcount = nextlist.size();

		if (!iffield.getIfName().equals(nextfield.getIfName()) || indexcount < 2 || indexcount != nextindexcount)
			return;

		// check the following
		// Is one of the offsets different while all other offsets are
		// identical??

		boolean found = false;
		int differentOffset = -1;
		StringBuilder arrayIndex = new StringBuilder();
		StringBuilder arrayValue = new StringBuilder();

		for (int i = 0; i < indexcount; i++) {
			differentOffset = -1;
			IfIndex index = (IfIndex) indexlist.get(i);
			IfIndex nextIndex = (IfIndex) nextlist.get(i);
			if (nextIndex.getIfOffset() != index.getIfOffset()) {
				if (found) {
					found = false;
					break;
				}
				differentOffset = i;
				found = true;
				// check if other offsets are identical
				for (int j = 0; j < indexcount; j++) {
					if (j == differentOffset)
						continue;
					IfIndex aindex = (IfIndex) indexlist.get(j);
					IfIndex anextIndex = (IfIndex) nextlist.get(j);
					if (anextIndex.getIfOffset() != aindex.getIfOffset()) {
						found = false;
						break;
					}
				}
				arrayIndex.append(" ");
				arrayValue.append(" ");
			}
			else {
				arrayIndex.append(i);
				arrayValue.append(index.getIfOffset());
			}
			arrayIndex.append(";");
			arrayValue.append(";");
		}

		if (!found)
			return;

		m_colIndex = differentOffset;
		m_arrayName = iffield.getIfName();
		m_arrayIndex = arrayIndex.toString();
		m_arrayIndexValue = arrayValue.toString();
	}
}
