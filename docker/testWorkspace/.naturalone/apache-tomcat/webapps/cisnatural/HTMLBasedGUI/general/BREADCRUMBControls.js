function addVersionInfoBREADCRUMBCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BREADCRUMBCONTROLS');
}
function iccBREADCRUMB(cc,id,romumethod,breadcrumbprop,cti,breadcrumbstyle,pixeldistance)
{
cc.CASA_id = id;
cc.CASA_breadcrumbprop = breadcrumbprop;
registerListener(romumethod);
if (cti != null) cc.CASA_cti = cti;
if (breadcrumbstyle != null) cc.CASA_breadcrumbstyle = breadcrumbstyle;
if (pixeldistance != null) cc.CASA_pixeldistance = pixeldistance;
cc.CASA_prevChangeIndex = undefined;
}
function romuBREADCRUMB(cc)
{
var vChangeIndex = getPropertyValue(cc.CASA_breadcrumbprop+".changeIndex");
if (cc.CASA_prevChangeIndex != undefined &&
cc.CASA_prevChangeIndex == vChangeIndex &&
cc.CASA_memDirection == m_direction)
return;
cc.CASA_prevChangeIndex = vChangeIndex;
cc.CASA_memDirection = m_direction;
var vHTML = [];
vHTML.push("<table cellpadding=0 cellspacing=0 border=0 >");
var vCounter = 0;
var vButtonIds = [];
var vPixelDistance = 0;
if (cc.CASA_pixeldistance != null)
{
try { vPixelDistance = cc.CASA_pixeldistance * 1; } catch (exc) {}
}
var vAddFixStyle = "";
if (cc.CASA_breadcrumbstyle != null) vAddFixStyle = cc.CASA_breadcrumbstyle;
var ext = "";
if (m_direction == "rtl") ext = "RTL";
while (true)
{
var vProp = cc.CASA_breadcrumbprop + ".items["+vCounter+"].";
vText = getPropertyValue(vProp+"text");
if (vText == null) break;
if (vCounter > 0)
{
vHTML.push("<td>");
vHTML.push("<div class='BREADCRUMBCell"+ext+"'>&nbsp;</div>");
vHTML.push("</td>");
}
vStyle = getPropertyValue(vProp+"style");
vClass = "BREADCRUMBInput";
var vTooltip = getPropertyValue(vProp+"tooltip");
if (vTooltip != null && vTooltip != "")
vTooltip = "title='"+convertApos(vTooltip)+"'";
if (vCounter != 0 && vPixelDistance != 0)
vHTML.push("<td><div style='font-size: 1px; width: "+C_adjustUnits(vPixelDistance)+"'></div></td>");
var vButtonId = "CasaBREADCRUMB" + cc.CASA_id + "BUTTON"+vCounter;
var vRollOver = "onmouseover='if (C.checkIO() == false) return false; this.className = \"BREADCRUMBInputRolledIn\"' onmouseout='this.className = \"BREADCRUMBInputRolledOut\";'";
vHTML.push("<td>" );
vHTML.push("<a id='"+vButtonId+"' "+vTooltip+" style='"+vStyle+";"+vAddFixStyle+"' class='"+vClass+"' "+vRollOver+" onclick='invokeBreadcrumb"+cc.CASA_id+"("+vCounter+")'>" );
vHTML.push(vText);
vHTML.push("</a>");
vHTML.push("</td>");
if (vPixelDistance != 0)
vHTML.push("<td><div style='font-size: 1px; width: "+C_adjustUnits(vPixelDistance)+"'></div></td>");
vButtonIds.push(vButtonId);
vCounter++;
}
vHTML.push("</table>");
cc.innerHTML = vHTML.join("");
if (cc.CASA_cti != null && cc.CASA_tabindex != null)
{
for (var i=0; i<vButtonIds.length;i++)
{
var b = parent.gebid(vButtonIds[i]);
b.CASA_cti = cc.CASA_cti;
b.CASA_tabindex = cc.CASA_tabindex;
applyCasaTabIndex(b, "BREADCRUMB");
}
}
}
function invokeBreadcrumb(cc,buttonIndex)
{
if (checkIO() == false) return;
var vMethodName = cc.CASA_breadcrumbprop + ".items["+buttonIndex+"].execute";
invokeMethodInModel(vMethodName);
}
