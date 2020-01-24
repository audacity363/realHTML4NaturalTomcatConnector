function addVersionInfoSTATUSBARCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('STATUSBARCENTRAL');
}
function iccSTATUSBAR(cc,tt)
{
cc.CASA_memtype = undefined;
cc.CASA_memst = undefined;
cc.CASA_memlt = undefined;
cc.C = tt;
tt.CASA_statusbar = cc;
}
function romuSTATUSBAR(cc,ccimage)
{
var vType = cc.C.getPropertyValue(cc.CASA_typeprop);
var vShortText = cc.C.getPropertyValue(cc.CASA_shorttextprop);
var vLongText = cc.C.getPropertyValue(cc.CASA_longtextprop);
if (vType == null) vType = "";
if (vShortText == null) vShortText = "";
if (vLongText == null) vLongText = vShortText;
if (vType == cc.CASA_memtype &&
vShortText == cc.CASA_memst &&
vLongText == cc.CASA_memlt)
{
return;
}
cc.CASA_memtype = vType;
cc.CASA_memst = vShortText;
cc.CASA_memlt = vLongText;
refreshSTATUSBARSSW(cc.C, cc, ccimage, vType, vShortText);
}
function resetSTATUSBAR(cc,ccimage)
{
cc.CASA_memtype = "";
cc.CASA_memst = "";
cc.CASA_memlt = "";
ccimage.innerHTML = "";
cc.innerHTML = "";
}
function showCurrentLongTextSTATUSBAR(tt, ltprop, tpprop)
{
try
{
if (ltprop != undefined && ltprop != null && tpprop != undefined && tpprop != null )
{
var thelt = tt.getPropertyValue(ltprop);
if (thelt == null || thelt == "") return;
if (ltprop!="messageLongText")
{
var thetp = tt.getPropertyValue(tpprop);
if ( thetp == null )  thetp="";
tt.setPropertyValue("cISAddons.statusbarLongtext", thelt);
tt.setPropertyValue("cISAddons.statusbarType", thetp);
}
}
}
catch (mexx)
{
}
if (tt.checkIO() == false)
{
tt.addLogMessage("STATUSBARControls.showCurrentLongTextSTATUSBAR(): checkIO is blocked");
return;
}
tt.invokeMethodInModel("reactonStatusBarHelpRequest");
}
function iccSTATUSBARSSW(cc, C, ccImage)
{
C_addSTATUSBARSSW(C.m_parentparent.getCurrentSessionId(),C.m_parentparent.getCurrentProcessId(), C, cc, ccImage);
}
function refreshSTATUSBARSSW(C, cc, ccImage, type, shortText)
{
if (type != null && type != "")
{
ccImage.innerHTML = "<img src='"+C.parent.parent.m_currentWebApp+"/HTMLBasedGUI/general/message"+type+".gif'>";
}
else
ccImage.innerHTML = "";
if (shortText != null && shortText != "")
{
cc.innerHTML = "&nbsp;&nbsp;<a onclick='CL.showCurrentLongTextSTATUSBAR(C,"+ '"' + cc.CASA_longtextprop +'","' + cc.CASA_typeprop+'"' + ");' class='STATUSBARCell'>" + shortText + "</a>";
}
else
{
cc.innerHTML = "";
}
}
