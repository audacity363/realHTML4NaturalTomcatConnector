function addVersionInfoPAGECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('PAGECONTROLS');
}
var m_stdDlgPopupFrame;
function registerStandardDlgPopupPAGE(pwindow)
{
m_stdDlgPopupFrame = pwindow;
}
function closeStandardDlgPopupPAGE()
{
if (m_stdDlgPopupFrame != null)
{
CL().C_deregisterPopupPage(m_stdDlgPopupFrame);
m_stdDlgPopupFrame.close();
m_stdDlgPopupFrame = null;
}
}
var m_wpKeysInited = false;
function initCasaControlPAGEBODY(casacontrol)
{
casacontrol.CASA_bufferedHeight = undefined;
casacontrol.CASA_bufferedWidth = undefined;
m_wpKeysInited = false;
}
var m_replacedCssPAGE = false;
var m_closedByApplication = false;
function reactOnModelUpdatePAGE()
{
if ( CL() == null ) return;
if ( !m_wpKeysInited )
{
m_wpKeysInited = true;
registerWPKeys(this.m_hotKeysPAGE);
}
try{if (romuINTPOPUP)romuINTPOPUP();} catch (ei){}
m_closedByApplication = false;
try
{
var vzoom = getPropertyValue('cISAddons.zoom');
if (vzoom == null) vzoom = "100%";
}
catch (eexxcc) {}
try
{
var vdir = getPropertyValue('cISAddons.dir');
if (vdir == null) vdir = "ltr";
if( vdir != parent.document.body.style.direction)
{
parent.document.body.style.direction = vdir;
}
}
catch (eexxcc) {}
try
{
var vClearDS = getPropertyValue('cISAddons.clearDS');
if (vClearDS == "true")
{
if (this.parent.document.selection)
this.parent.document.selection.empty();
else
this.parent.window.getSelection().removeAllRanges();
}
}
catch (eexxcc) {}
try
{
var vpw = getPropertyValue("cISAddons.popupWidth");
if (vpw != null)
{
var vph = getPropertyValue("cISAddons.popupHeight");
parent.parent.resizeTo(vpw,vph);
if ( parent.parent.dialogHeight != undefined  &&
parent.parent.dialogWidth != undefined )
{
parent.parent.dialogHeight = vph+"px";
parent.parent.dialogWidth = vpw+"px";
}
}
}
catch (eexxcc) { alert("POPUP WINDOW sizing "+eexxcc); }
parent.m_pageCompletelyBuilt = true;
var vcp = getPropertyValue('closeWindow');
var nextPage = getPropertyValue('nextPage');
addLogMessage("nextPage = " + nextPage);
var nextPageId = getPropertyValue('nextPageId');
if (parent.parent.isPopupPage == true)
{
if (vcp == 'true')
{
var isDivPopup = false;
m_continueUpdateModelListeners = false;
m_closedByApplication = true;
CL().C_deregisterPopupPage(parent.parent);
var frmName = getPropertyValue("cISAddons.popupDivFrame");
if(frmName != null && frmName != "" && frmName != undefined )
{
var vTopFrame = CL().C_findFrame(this,frmName,true);
if(vTopFrame != null)
{
if(extractContentWindow(vTopFrame).m_divPopUpStack != null &&
extractContentWindow(vTopFrame).m_divPopUpStack.length > 0)
isDivPopup = true;
}
}
if(isDivPopup)
removeDIVPOPUP();
else
parent.parent.close();
}
}
var vCloseWindow = getPropertyValue('cISAddons.closeWindow');
try
{
if (vCloseWindow == "true")
{
m_continueUpdateModelListeners = false;
m_closedByApplication = true;
top.window.close();
}
}
catch (eexxcc) {}
try {
if ( parent.parent.isPopupPage != true && this.m_modelName.indexOf("NatLogon") < 0 && this.m_modelName.indexOf("NatDisconnect") < 0 &&
this.m_modelName.indexOf("MFActivitiesAdapter") < 0  && this.m_modelName.indexOf("MFWorkplaceAdapter") < 0)
{
var availableFrame = CL().findFrame(top, "AVAILABLEACTIVITIES");
if ( availableFrame != null && availableFrame.WORKAREA != null && availableFrame.WORKAREA.csciframe != null &&
availableFrame.WORKAREA.csciframe.unblockWorkplaceSelect != undefined){
addLogMessage("triggering unblockWorkplace");
availableFrame.WORKAREA.csciframe.unblockWorkplaceSelect();
}
}
}
catch (exwp) {}
if (nextPage != null && nextPage != "null" && nextPage != "")
{
if (nextPageId == null) nextPageId = "";
nextPage = convertCasabacURL(nextPage);
var loadingOnPageSwitch = getPropertyValue('cISAddons.lops');
parent.parent.changeCurrentPage(nextPage,nextPageId,loadingOnPageSwitch);
m_continueUpdateModelListeners = false;
}
if (m_stdDlgPopupFrame != null)
{
if (nextPage != null && nextPage != "null" && nextPage != "")
{
closeStandardDlgPopupPAGE();
}
else
{
try
{
m_stdDlgPopupFrame.reactOnNewModel();
}
catch(exc)
{
alert("Date input refresh error "+exc);
closeStandardDlgPopupPAGE();
}
}
}
var vContextMenu = findTHISCONTEXTMENU(false);
if (vContextMenu != null)
{
var s = getPropertyValue('cISContextMenuItems[0].text')
if (s != null && s != "")
{
var onCloseMethod = getPropertyValue('cISAddons.cisContextMenuOnCloseMethod');
vContextMenu.style.display = "";
CL().openCONTEXTMENU(this,onCloseMethod, "marginAll");
}
else
{
vContextMenu.style.display = "none";
}
}
try { reactOnModelUpdatePOPUPVALUES('cISAddons.pvinfos'); } catch(exc) { }
var skippedpp = getPropertyValue('cISAddons.popupSkipped');
if ( skippedpp =='true')
setTimeout("refreshModel();",50);
}
function extractContentWindow(pTopFrame)
{
if (pTopFrame.contentWindow != undefined)
return pTopFrame.contentWindow;
else
return pTopFrame;
}
function reactOnClosePopup()
{
if ( CL() == null ) return;
CL().C_deregisterPopupPage(m_parentparent);
var op=CL().C_deregisterPopupOpener();
var vret = new Object();
vret.modelName = m_modelName;
vret.modelId = m_modelId;
if (m_closedByApplication == false)
{
if (m_parentparent.opener!=undefined && m_parentparent.opener != null)
{
m_parentparent.opener.csciframe.m_refreshPopupParams = vret;
}
else
{
if (op != null) op.m_refreshPopupParams = vret;
}
}
if (m_parentparent.opener!=undefined && m_parentparent.opener != null)
{
m_parentparent.opener.csciframe.refreshModel();
if (m_parentparent.opener.csciframe.m_parentparent.isPopupPage != true)
m_parentparent.opener.csciframe.flushRefreshOccuranceQueue();
}
else if (op != null)
{
op.refreshModel();
if (op.m_parentparent.isPopupPage != true)
op.flushRefreshOccuranceQueue();
}
}
var mm_openPopupPAGE;
function openPopupPAGE(pageName,pageId,pageModal,pageFeatures,pageTitle,sessionId,subsessionId,onCloseMethod,onCloseProperty,onClosePropertyValue)
{
if (mm_openPopupPAGE == null) mm_openPopupPAGE = CL().C_openPopupPAGE;
return mm_openPopupPAGE.call(this,pageName,pageId,pageModal,pageFeatures,pageTitle,sessionId, subsessionId,onCloseMethod,onCloseProperty,onClosePropertyValue);
}
function setContextMenuXYPAGE(xCoordinate, yCoordinate)
{
if (xCoordinate == 0 && yCoordinate == 0) return;
var vContextMenu = findTHISCONTEXTMENU();
if (vContextMenu.style.display != "none") return;
if (m_direction=="rtl")
vContextMenu.style.right = "" + C_adjustUnits((parent.innerWidth-xCoordinate-10));
else
vContextMenu.style.left = "" + C_adjustUnits((xCoordinate-10));
vContextMenu.style.top = "" + C_adjustUnits((yCoordinate-8));
}
function reactOnHelpPAGE()
{
if (checkIO() == false)
return;
if (parent.m_helpIdPAGE != null && parent.m_helpIdPAGE != "")
{
setPropertyValue("param2",parent.m_helpIdPAGE);
invokeMethodInModel("reactOnHelpRequestForHelpId");
}
}
function reactOnContextMenuRequestPAGE(evt)
{
if (checkIO() == false) return false;
if (parent.m_contextMenuMethodPAGE == null) return true;
setContextMenuXYPAGE(evt.clientX,evt.clientY);
invokeMethodInModel(parent.m_contextMenuMethodPAGE);
return false;
}
function onBlurPAGE(evt)
{
if (checkIO() == false) return;
CL().reactOnBlurPageCL(this);
}
var xxxxxxxxxx = 0;
function onFocusPAGE(evt)
{
if (checkIO() == false) return;
CL().reactOnFocusPageCL(this);
}
function invokeFlushMethodPAGE()
{
if (parent.m_flushMethodPAGE != null)
{
m_suppressFocusManagementOncePAGE = true;
invokeMethodInModel(parent.m_flushMethodPAGE);
}
}
