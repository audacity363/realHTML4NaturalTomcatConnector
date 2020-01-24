function addVersionInfoBM_SUBPAGECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_SUBPAGECONTROLS');
}
function iccBM_SUBPAGE(cc,romumethod,valueprop)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_memURL = undefined;
cc.CASA_valueprop = valueprop;
}
function romuBM_SUBPAGE(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
if (v == null) v = '../HTMLBasedGUI/general/blankpage.html';
if (cc.CASA_memURL == v ) return;
cc.CASA_memURL = v;
cc.src = v;
}
