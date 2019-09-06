function addVersionInfoCELLSPANCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CELLSPANCONTROLS');
}
function iccCS(cc,colspanprop)
{
cc.CASA_memValue = undefined;
if (colspanprop != null) cc.CASA_colspanprop = colspanprop;
}
function romuCS(cc)
{
if (cc == null) return;
var vValue = getPropertyValue(cc.CASA_colspanprop);
if(vValue == null) return;
if (cc.CASA_memValue == vValue) return;
cc.CASA_memValue = vValue;
cc.colSpan = vValue;
}
