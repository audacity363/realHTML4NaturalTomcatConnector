function addVersionInfoFILEUPLOADCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('FILEUPLOADCONTROLS');
}
function iccFILEUPLOAD2(cc,romumethod,enablemethod,disablemethod,occupymethod,switchtodisplaymethod,cfileprop,sfileprop,method,visibleprop,invisiblemode)
{
cc.CASA_memvalue = undefined;
cc.CASA_memDisbabled = undefined;
if (cfileprop != null) cc.CASA_cfileprop = cfileprop;
if (sfileprop != null) cc.CASA_sfileprop = sfileprop;
if (method != null) cc.CASA_method = method;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (romumethod != null) registerListener(romumethod);
if (enablemethod != null) cc.CASA_enablemethod = enablemethod;
if (occupymethod != null) cc.CASA_occupymethod = occupymethod;
if (switchtodisplaymethod != null) cc.CASA_switchtodisplaymethod = switchtodisplaymethod;
if (disablemethod != null) cc.CASA_disablemethod = disablemethod;
registerSwitchToOccupiedListener(occupymethod);
}
function romuFILEUPLOAD2(cc)
{
if (cc.CASA_visibleprop != null)
{
var v = findVisibleValue(getPropertyValue(cc.CASA_visibleprop));
if (cc.CASA_memvalue == undefined || v != cc.CASA_memvalue)
{
cc.CASA_memvalue = v;
cc.CASA_memDisbabled = false;
v = convertStatusToVisible(v);
if (v == null || v == "false")
{
if (cc.CASA_invisiblemode == null || cc.CASA_invisiblemode == "invisible")
{
cc.parentNode.style.display = "none";
}
if (cc.CASA_invisiblemode == "disabled")
{
cc.parentNode.style.display = "";
cc.style.display = "";
cc.CASA_memDisbabled = true;
}
else
{
cc.parentNode.style.display = "";
cc.style.display = "none";
}
}
else
{
cc.parentNode.style.display = "";
cc.style.display = "";
}
}
if (cc.CASA_memDisbabled == true)
cc.CASA_disablemethod();
else
cc.CASA_enablemethod();
}
else
{
cc.CASA_enablemethod();
}
}
function inokeMethodFILEUPLOAD2(clientFileName,serverFileName)
{
var id = "FU2_"+parent.m_bufferdCCIdFILEUPLOAD2;
var cc = parent.gebid(id);
setPropertyValue(cc.CASA_cfileprop,clientFileName);
setPropertyValue(cc.CASA_sfileprop,serverFileName);
parent.m_blockIOByFlush = true;
if (cc.CASA_method != null)
invokeMethodInModel(cc.CASA_method);
else
submitModel("submit");
}
