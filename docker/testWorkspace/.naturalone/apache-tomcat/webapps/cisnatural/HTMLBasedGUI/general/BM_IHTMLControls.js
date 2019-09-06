function addVersionInfoBM_IHTMLCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_IHTMLCONTROLS');
}
function iccBM_IHTML(cc,romumethod,valueprop)
{
cc.CASA_valueprop = valueprop;
cc.CASA_memvalue = "";
if (romumethod != null) registerListener(romumethod);
}
function romuBM_IHTML(cc)
{
if (cc == null) return;
var v = getPropertyValue(cc.CASA_valueprop);
if ( v == null ) return;
if ( v == cc.CASA_memvalue ) return;
cc.CASA_memvalue = v;
cc.innerHTML = v;
}
