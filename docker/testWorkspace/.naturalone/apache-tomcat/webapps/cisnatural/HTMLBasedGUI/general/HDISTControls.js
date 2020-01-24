function addVersionInfoHDISTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('HDISTCONTROLS');
}
function iccHDIST(cc,romumethod,visibleprop)
{
if (cc == null) return;
cc.CASA_romumethod = romumethod;
cc.CASA_visibleprop = visibleprop;
cc.CASA_mem = undefined;
registerPropertyListener(romumethod,visibleprop,cc.id);
}
function romuHDIST(cc)
{
if (cc == null) return;
var v = getPropertyValue(cc.CASA_visibleprop);
v = convertStatusToVisible(v,CONTROLTYPE_CONTAINER);
if (v == null) v = "false";
if (v == cc.CASA_mem)
return;
cc.CASA_mem = v;
if (v == "false")
cc.style.display = "none";
else
cc.style.display = "";
}
