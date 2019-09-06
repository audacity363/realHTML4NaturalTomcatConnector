function addVersionInfoTRCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TRCENTRAL');
}
function iccTR(tt,cc,visibleprop,trstyleprop)
{
cc.CASA_memValue = undefined;
cc.C = tt;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (trstyleprop != null) cc.CASA_trstyleprop = trstyleprop;
}
function romuTR(cc)
{
var stlVal = cc.C.getStylePropertyValue(cc.CASA_itrstyleprop);
cc.style.cssText += ";"+stlVal;
if (cc.CASA_trstyleprop != null)
{
stlVal = cc.C.getStylePropertyValue(cc.CASA_trstyleprop);
if (stlVal != null && stlVal != "" && stlVal != " " )
cc.style.cssText = stlVal;
}
var vValue = cc.C.findVisibleValue(cc.C.getPropertyValue(cc.CASA_visibleprop));
if (cc.CASA_memValue == undefined && vValue == null) return;
if (cc.CASA_memValue != undefined && cc.CASA_memValue == vValue) return;
cc.CASA_memValue = vValue;
vValue = cc.C.convertStatusToVisible(vValue,cc.C.CONTROLTYPE_CONTAINER);
if (vValue == "false") { cc.style.display = "none"; cc.CASA_visible = "false"; }
else                   { cc.style.display = ""; cc.CASA_visible = "true"; }
}
