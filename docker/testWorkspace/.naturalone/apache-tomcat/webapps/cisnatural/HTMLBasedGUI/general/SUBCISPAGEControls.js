function addVersionInfoSUBCISPAGECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SUBCISPAGECONTROLS');
}
var m_SUBCISPAGEshowpagemethod;
function initCasaControlSUBCISPAGE14(cc)
{
cc.CASA_memPageURL = undefined;
cc.CASA_memProcessId = undefined;
cc.CASA_memModelId = undefined;
cc.CASA_memSessionId = undefined;
cc.CASA_memRefresh = undefined;
cc.CASA_refreshprop = undefined;
}
function reactOnModelUpdateSUBCISPAGE14(cc,
showpagemethod)
{
var vPageURL = getPropertyValue(cc.CASA_valueprop);
var vPageURL = convertCasabacURL(vPageURL);
if (vPageURL == null || vPageURL == "") vPageURL = "../HTMLBasedGUI/general/blankpage.html";
var vProcessId = null;
if (cc.CASA_processidprop != null)
vProcessId = getPropertyValue(cc.CASA_processidprop);
if (vProcessId == null || vProcessId == "inittini")
vProcessId = parent.parent.getCurrentProcessId();
var vModelId = null;
if (cc.CASA_modelidprop != null)
vModelId = getPropertyValue(cc.CASA_modelidprop);
if (vModelId == null || vModelId == "inittini")
vModelId = parent.parent.getCurrentModelId();
var vSessionId = null;
if (cc.CASA_sessionidprop != null)
vSessionId = getPropertyValue(cc.CASA_sessionidprop);
if (vSessionId == null || vSessionId == "inittini")
vSessionId = parent.parent.getCurrentSessionId();
var vRefresh = getPropertyValue(cc.CASA_refreshprop);
var vRefreshedIFRAME = false;
if (cc.CASA_memPageURL != vPageURL ||
cc.CASA_memProcessId != vProcessId ||
cc.CASA_memModelId != vModelId ||
cc.CASA_memSessionId != vSessionId)
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
continueSUBCISPAGE14();
}
if (cc.CASA_refreshprop != null && vRefreshedIFRAME == false)
{
if (vRefresh != cc.CASA_memRefresh ||
vRefresh == "true")
{
var vNoResponse = getPropertyValue("cISAddons.noResponse");
if (vNoResponse == "true")
{
addLogMessage("reactOnModelUpdateSUBCISPAGE14(): no refresh - adapter sends noResponse==true");
}
else
{
cc.CASA_page.refreshModel();
}
}
cc.CASA_memRefresh = vRefresh;
}
}
function continueSUBCISPAGE14()
{
m_SUBCISPAGEshowpagemethod(m_SUBCASAPAGEpageURL,
m_SUBCASAPAGEmodelId,
m_SUBCASAPAGEsessionId,
m_SUBCASAPAGEprocessId);
}
function showPageSUBCISPAGE14(cc,pageURL,modelId,sessionId,processId)
{
var subInitParams = "";
try
{
var amp = pageURL.indexOf("&");
if (amp > 0 &&
pageURL.indexOf("StartDynamicPage?") < 0 &&
pageURL.indexOf("StartDynamicContent?") < 0)
{
cc.CASA_page.pageInitParam = pageURL.substring(amp+1, pageURL.length);
subInitParams = "&" + cc.CASA_page.pageInitParam;
pageURL = pageURL.substring(0,amp);
}
}
catch (exc) {}
try
{
if ( pageURL.indexOf("/") < 0 )
{
var vpurl9 = parent.location.href;
pageURL = vpurl9.substring(0, vpurl9.lastIndexOf("/")) + "/" + pageURL;
}
else
{
pageURL = pageURL.substring(1,pageURL.length);
while (true)
{
if (pageURL.charAt(0) != "/")
pageURL = pageURL.substring(1,pageURL.length);
else
break;
}
var vpurl = parent.location.href;
vpurl = vpurl.substring(0,vpurl.lastIndexOf("/"));
vpurl = vpurl.substring(0,vpurl.lastIndexOf("/"));
pageURL = vpurl + pageURL;
}
cc.CASA_page.showPage(pageURL,modelId,sessionId,processId);
}
catch(exc)
{
setTimeout("showPageSUBCISPAGE(\""+cc.CASA_page.name+"\", \""+pageURL+"\",\""+modelId+"\",\""+sessionId+"\",\""+processId+"\")",200);
}
}
function showPageSUBCISPAGE(casaPageId, pageURL,modelId,sessionId,processId)
{
var casaPage = parent.frames[casaPageId];
if(casaPage == null) casaPage = getFrameSUBCISPAGE(casaPageId);
if(casaPage == null) return;
if (casaPage.document.readyState != "complete")
{
setTimeout("showPageSUBCISPAGE(\""+casaPageId+"\",\""+pageURL+"\",\""+modelId+"\",\""+sessionId+"\",\""+processId+"\")",200);
return;
}
if(casaPage.showPage) casaPage.showPage(pageURL,modelId,sessionId,processId);
}
function getFrameSUBCISPAGE(pCasaPageId)
{
var vCasaPage = null;
try
{
var frmName = getPropertyValue("cISAddons.popupDivFrame");
var vTopFrame = null;
if(frmName != null && frmName != "") vTopFrame = CL().C_findFrame(this,frmName,true);
if(vTopFrame == null) vTopFrame = CL().C_findFrame(this,"_top",true);
if(vTopFrame != null)
{
vCasaPage = extractContentWindow(vTopFrame).frames[pCasaPageId];
}
}catch(exc) {}
return vCasaPage;
}
