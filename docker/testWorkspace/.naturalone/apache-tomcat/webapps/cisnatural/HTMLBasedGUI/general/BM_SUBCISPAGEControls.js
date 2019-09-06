function addVersionInfoBM_SUBCISPAGECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_SUBCISPAGECONTROLS');
}
var m_SUBCISPAGEshowpagemethod = "showPageBM_SUBCISPAGE";
function iccBM_SUBCISPAGE(cc, romumethod, valueprop)
{
cc.CASA_valueprop = valueprop;
cc.CASA_memPageURL = undefined;
cc.CASA_memProcessId = undefined;
cc.CASA_memModelId = undefined;
cc.CASA_memSessionId = undefined;
cc.CASA_memRefresh = undefined;
if (romumethod != null) registerListener(romumethod);
}
function reactOnModelUpdateBM_SUBCISPAGE(cc,showpagemethod)
{
var vPageURL = getPropertyValue(cc.CASA_valueprop + ".page");
var vPageURL = convertCasabacURL(vPageURL);
if (vPageURL == null || vPageURL == "") vPageURL = "../HTMLBasedGUI/general/blankpage.html";
var vProcessId = getPropertyValue(cc.CASA_valueprop + ".pageid");
if (vProcessId == null || vProcessId == "inittini")
vProcessId = parent.parent.getCurrentProcessId();
var vModelId =  parent.parent.getCurrentModelId();
var vSessionId = parent.parent.getCurrentSessionId();
var vRefreshedIFRAME = false;
if (cc.CASA_memPageURL != vPageURL ||
cc.CASA_memProcessId != vProcessId ||
cc.CASA_memModelId != vModelId ||
cc.CASA_memSessionId != vSessionId )
{
cc.CASA_memPageURL = vPageURL;
cc.CASA_memProcessId = vProcessId;
cc.CASA_memModelId = vModelId;
cc.CASA_memSessionId = vSessionId;
cc.CASA_memRefresh = vRefresh;
m_SUBCASAPAGEpageURL = vPageURL;
m_SUBCASAPAGEprocessId = vProcessId;
m_SUBCASAPAGEmodelId = vModelId;
m_SUBCASAPAGEsessionId = vSessionId;
m_SUBCASAPAGEcasacontrol = cc;
m_SUBCISPAGEshowpagemethod = showpagemethod;
vRefreshedIFRAME = true;
continueSUBCISPAGE();
}
if (cc.CASA_refreshprop != null && vRefreshedIFRAME == false)
{
if (vRefresh != cc.CASA_memRefresh ||
vRefresh == "true")
{
var vNoResponse = getPropertyValue("cISAddons.noResponse");
if (vNoResponse == "true")
{
addLogMessage("reactOnModelUpdateSUBCISPAGE(): no refresh - adapter sends noResponse==true");
}
else
{
cc.refreshModel();
}
}
cc.CASA_memRefresh = vRefresh;
}
}
function continueSUBCISPAGE()
{
m_SUBCISPAGEshowpagemethod(m_SUBCASAPAGEpageURL,
m_SUBCASAPAGEmodelId,
m_SUBCASAPAGEsessionId,
m_SUBCASAPAGEprocessId);
}
function showPageBM_SUBCISPAGE(cc, pageURL,modelId,sessionId,processId)
{
if (cc.document.readyState != "complete")
{
setTimeout("showPageBM_SUBCISPAGE(\""+cc+"\",\""+pageURL+"\",\""+modelId+"\",\""+sessionId+"\",\""+processId+"\")",200);
return;
}
if(cc.showPage) cc.showPage(pageURL,modelId,sessionId,processId);
}
