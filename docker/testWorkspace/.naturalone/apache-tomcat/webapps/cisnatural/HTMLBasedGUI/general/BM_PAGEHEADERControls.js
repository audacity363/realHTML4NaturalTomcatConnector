function addVersionInfoBM_PAGEHEADERCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_PAGEHEADERCONTROLS');
}
function iccBM_PAGEHEADER(cc,romumethod,nameprop)
{
if (romumethod != null) registerListener(romumethod);
if (nameprop != null) cc.CASA_nameprop = nameprop;
addMLSpan(cc);
}
function romuBM_PAGEHEADER(cc)
{
if (cc == null) return;
if (cc.CASA_nameprop != null)
{
var v = getPropertyValue(cc.CASA_nameprop);
if (v == null) v = "";
cc.textContent = v;
}
}
