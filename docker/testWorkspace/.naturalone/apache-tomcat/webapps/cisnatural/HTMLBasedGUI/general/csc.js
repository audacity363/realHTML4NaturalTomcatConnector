function addVersionInfoCSC()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CSC');
}
var m_doLog = true;
var m_firstUsage = true;
var m_pageInactive = false;
var m_modelName;
var m_modelId;
var m_sessionId;
var m_processId;
var m_pageName = "dummy";
var m_modelListeners = [];
var m_modelListenersLast = [];
var m_modelListenersSCROLL = [];
var m_propertyListeners = [];
var m_propertyListenersTBP = [];
var m_statuspropListeners = [];
var m_switchToDisplayListeners = [];
var m_switchToOccupiedListeners = [];
var m_dcListeners = [];
var m_properties;
var m_model;
var m_currentArray;
var m_currentRow;
var m_internalProperties = [];
var m_bufferNeedsRefresh = false;
var m_callcounter = 0;
var m_processCasabacSynchronizeIfNecessary;
var m_processInvokeMethodInModel;
var m_dateDisplay = "DD.MM.YYYY";
var m_americanStyle = null;
var m_timeDisplay = "HH:MM:SS";
var m_decimalSeparator = ",";
var m_1000Separator = true;
var m_language = "en";
var m_direction = "ltr";
var m_hotKeyCode = "17;18";
var m_headerObjects = [];
var m_footerObjects = [];
var m_clickAwayObjects = [];
var m_clickAwayMethods = [];
var m_avoidClickAway = false;
var m_modelDeltaId = "inittini";
var m_formulas=[];
var m_FieldsArray = [];
var m_validationRules = [];
var m_calledInPopup = false;
var casaPopupParameters;
var casaPopupReturnValue;
var m_parentparent = parent.parent;
var m_parentdocument = parent.document;
var m_parentparentdocument = parent.parent.document;
var m_bufferedxml = null;
var m_validationErrors = [];
var m_logStrings = [];
var m_logDates = [];
var m_logIndex = 0;
var m_mozdivs = [];
var m_isSafari;
var m_isFirefox;
var m_firefoxVersion;
var m_inEditMode = null;
var m_lastProcessedControlId = -1;
var m_continueMethod = null;
var m_innerFrames = [];
var m_innerFramesIndex = 0;
var m_innerMFFrames = [];
var m_innerMFFramesIndex = 0;
var m_synchronizePage = false;
var m_synchronizeAvoidDrillDown = false;
var m_firstFocusCall = true;
var m_newModelForAddFocusRequestor = false;
var m_focusRequestors = [];
var m_focusables = [];
var m_focusablesCat = [];
var m_focusSETIN = undefined;
var m_suppressFocusManagementOncePAGE;
var m_hotKeys = [];
var m_hotKeysWithCallback = [];
var m_hotKeysWithControlScope = [];
var m_hotKeysPAGE = new Object();
var m_noProcessingForNextHotKey = false;
var m_tabElements = new Object();
var m_tabElementsUndefined = new Object();
var m_completeCounter = 0;
var m_cscformOccupied = false;
var m_cscformxmlstack = [];
var m_cre1 = "\001";
var m_cre2 = "\002";
var m_cre3 = "\003";
var m_cre4 = "\004";
var m_cre5 = "\005";
var m_cre6 = "\006";
var m_cre35 = "\035";
var m_cre36 = "\036";
var m_re1 = new RegExp("\001","g");
var m_re2 = new RegExp("\002","g");
var m_re3 = new RegExp("\003","g");
var m_re4 = new RegExp("\004","g");
var m_re5 = new RegExp("\005","g");
var m_re6 = new RegExp("\006","g");
var m_re35 = new RegExp("\035","g");
var m_re36 = new RegExp("\036","g");
var m_beforeFirstReactOnNewModel = true;
var m_firstModel = true;
var m_continueUpdateModelListeners;
var m_killedItems = 0;
var m_pushedContinueMethod;
var m_bufferedMethodName = "inittini";
var m_noactivityuntil;
var m_displayOccupied = true;
var m_suppressClearAdapterStream = false;
var m_doBlockIO = true;
var m_checkIOFalseCounter = 0;
var m_MLValues = [];
var m_MLTextNodes = [];
var m_MLSpans = [];
var m_MLButtons = [];
var m_MLOptions = [];
var m_MLImages = [];
var m_MLTabs = [];
var m_openedAmodals = [];
var m_lastStamp = undefined;
var m_jsversions = [];
var m_jsfiles = [];
var m_consolelog = undefined;
var m_islogonform = false;
var m_uiprop = null;
var m_uipropframe;
var m_resetValiddationErrorsAndFlush;
var m_iccInfos = [];
var m_resizeTimeout = null;
var m_focusTimeout = null;
function doReactOnResize(timestamp)
{
for (i=parent.m_resizeListeners.length-1; i>=0; i--) parent.m_resizeListeners[i]();
updateModelListenersScroll(null);
m_resizeTimeout = null;
}
function handleReactOnResize()
{
if ( m_modelName == undefined || m_modelName == null ) return;
if ( m_modelName.indexOf("natlegacy") > 0 ) doReactOnResize();
else {
if (m_resizeTimeout != null) return;
m_resizeTimeout = 99;
parent.window.requestAnimationFrame(this.doReactOnResize);
}
}
function addMozDiv(pd, continueMethod)
{
if (addMozDivInternally) addMozDivInternally(pd, continueMethod);
}
function replaceMozDiv(pd, continueMethod)
{
if (replaceMozDivInternally) replaceMozDivInternally(pd, continueMethod);
}
function deactivatePage()
{
m_pageInactive = true;
for (var i=0; i<m_openedAmodals.length; i++)
{
try
{
m_openedAmodals[i].close();
}
catch (eexxcc) {}
}
m_openedAmodals = [];
for (var ifi=0; ifi<m_innerFrames.length; ifi++)
{
try
{
m_innerFrames[ifi].WORKAREA.csciframe.deactivatePage();
}
catch (exc) { }
}
}
function setDisplayPage(style)
{
try
{
setDisplayTHISOCCUPIED(style);
}
catch (exc) { }
for (var ifi=0; ifi<m_innerFrames.length; ifi++)
{
try
{
m_innerFrames[ifi].WORKAREA.csciframe.setDisplayPage(style);
}
catch (exc) { }
}
}
function checkIfPageIsDeactivated() { return m_pageInactive; }
function getTargetFrame(pwindow,target,withelements)
{
return CL().C_findFrame(pwindow,target,withelements);
}
function initGlobals()
{
if (m_firstUsage == true)
{
m_firstUsage = false;
return;
}
m_modelName = undefined;
m_modelId = undefined;
m_sessionId = undefined;
m_processId = undefined;
m_pageName = "dummy";
m_properties = undefined;
m_model = undefined;
m_currentArray = undefined;
m_currentRow = undefined;
m_internalProperties = [];
m_bufferNeedsRefresh = false;
m_processCasabacSynchronizeIfNecessary = false;
m_processInvokeMethodInModel = false;
m_avoidClickAway = false;
m_modelDeltaId = "inittini";
m_calledInPopup = false;
casaPopupParameters = null;
casaPopupReturnValue = null;
m_bufferedxml = null;
m_validationErrors = [];
m_inEditMode = null;
m_continueMethod = null;
m_innerFrames = [];
m_innerFramesIndex = 0;
m_innerMFFrames = [];
m_innerMFFramesIndex = 0;
m_synchronizePage = false;
m_firstFocusCall = true;
m_focusSETIN = undefined;
m_hotKeys = [];
m_hotKeysPAGE = new Object();
m_noProcessingForNextHotKey = false;
m_tabElements = new Object();
m_tabElementsUndefined = new Object();
m_completeCounter = 0;
m_cscformOccupied = false;
m_cscformxmlstack = [];
m_beforeFirstReactOnNewModel = true;
m_firstModel = true;
m_continueUpdateModelListeners = undefined;
m_killedItems = 0;
m_pushedContinueMethod = undefined;
m_bufferedMethodName = "inittini";
m_openedAmodals = [];
m_lastStamp = undefined;
m_formulas = [];
m_FieldsArray = [];
m_islogonform = false;
m_uiprop = null;
m_uipropframe = null;
m_currentFocusLine = null;
m_currentFocusGrid = null;
m_iccInfos = [];
if (parent.m_roi_firstusage != false)
{
m_mozdivs = [];
m_headerObjects = [];
m_footerObjects = [];
}
}
function dragEnter(event)
{
event.preventDefault();
var previous = parent.document.querySelector('.previewDragOver');
if ( previous != null ) previous.classList.remove('previewDragOver');
if ( event.target != null ) event.target.classList.add('previewDragOver');
}
function dragLeave(event)
{
event.preventDefault();
if ( event.target != null ) event.target.classList.remove('previewDragOver');
}
function dragEnd(event)
{
event.preventDefault();
var previous = parent.document.querySelector('.previewDragOver');
if ( previous != null ) previous.classList.remove('previewDragOver');
}
function addEventListenerIFRAME(casaPageId)
{
if ( casaPageId == null ) return;
var x = parent.document.getElementById(casaPageId);
if ( x == null ) return;
var y = (x.contentWindow || x.contentDocument);
if (y.document) y = y.document;
if (y.addEventListener) {
y.addEventListener("keydown", suppressBrowserKeysIFRAME, false);
y.addEventListener("mousewheel", suppressBrowserKeysIFRAME, false);
}
}
function suppressBrowserKeysIFRAME(event)
{
if ( event == null ) return;
if ( event.type == "mousewheel" && event.shiftKey ) return CL().cancelEvent(event);
try
{
if (event.keyCode > 111 && event.keyCode < 124)
return CL().cancelEvent(event);
if ((event.keyCode == 87 && event.ctrlKey == true) ||
(event.keyCode == 82 && event.ctrlKey == true))
return CL().cancelEvent(event);
if (event.keyCode == 8)
return CL().cancelEvent(event);
}
catch(sxx){}
}
function addIccInfo(name, baseIndex, s)
{
var o = new Object();
o.name = name;
o.baseIndex = baseIndex;
o.iccString = s;
m_iccInfos.push(o);
}
function repeatIcc(index)
{
index = (-1)*index*(-1);
for (var i=0; i<m_iccInfos.length; i++)
{
var o = m_iccInfos[i];
var rowIndex = o.baseIndex+index;
var s = o.iccString.replace(/items\[[0-9]+\]/g,"items["+rowIndex+"]");
parent.iccExec(o.name, s);
}
}
function initCasaControl(pcc)
{
for (var vname in pcc)
if (vname.indexOf("CASA_") >= 0)
pcc[vname] = undefined;
}
function findVisibleValue(pVal)
{
if (pVal != null && pVal!=undefined && pVal!="") return pVal;
if (parent.m_visiblevalueifundefined == undefined) return pVal;
return parent.m_visiblevalueifundefined;
}
function CL()
{
var vresult = m_parentparent.m_centralLib;
return vresult;
}
function calculatePageOffset(pControl)
{
var vLeft = 0;
var vTop = 0;
var viewportElement = document.documentElement;
var box = pControl.getBoundingClientRect();
var scrollLeft = viewportElement.scrollLeft;
var scrollTop = viewportElement.scrollTop;
if (m_direction=="rtl")
vLeft = box.right + scrollLeft;
else
vLeft = box.left + scrollLeft;
vTop = box.top + scrollTop;
pControl.CASA_pageoffsetleft = vLeft;
pControl.CASA_pageoffsettop = vTop;
}
function calculateFrameOffset(topFrameName)
{
var w = m_parentparent;
var mozOffsetTop = 0;
var mozOffsetLeft = 0;
while (true)
{
try
{
if (w == null) break;
if (topFrameName == '_top') break;
if (topFrameName != null && w.name == topFrameName) break;
mozOffsetTop += w.frameElement.offsetTop;
mozOffsetLeft += w.frameElement.offsetLeft;
var vTemp = w.parent.parent;
if (w == vTemp) break;
w = vTemp;
}
catch (exc)
{
return null;
}
}
var result = new Object();
result.frameOffsetLeft = mozOffsetLeft;
result.frameOffsetTop =  mozOffsetTop;
return result;
}
function calculateScrollTop(pControl)
{
var vControl = pControl;
var vTop = 0;
while (true)
{
try
{
if (vControl == null) break;
vTop = vTop + vControl.scrollTop;
var vTemp = vControl.offsetParent;
if (vControl == vTemp) break;
vControl = vTemp;
}
catch (exc)
{
break;
}
}
return vTop;
}
var mm_openCasabacPageAsModalPopup = null;
function openCasabacPageAsModalPopup(pPage,pWidth,pHeight)
{
if (mm_openCasabacPageAsModalPopup == null) mm_openCasabacPageAsModalPopup = CL().C_openCasabacPageAsModalPopup;
return mm_openCasabacPageAsModalPopup(pPage,pWidth,pHeight);
}
function setPageName(pageName)
{
m_pageName = pageName;
}
function reactOnInit()
{
if (parent.parent.m_centralLib == null) { window.location.href = '../HTMLBasedGUI/general/aboutBlank.html'; return; }
parent.reactOnInit();
}
function convertDoubleTildeToUTag(pText)
{
if (pText == null)
return null;
if (pText.indexOf("~~")<0)
return pText;
var vResult = [];
var vStart = 0;
var vEnd = pText.indexOf("~~");
while (vEnd >= 0 && (vEnd+2)<pText.length)
{
vResult.push(pText.substring(vStart, vEnd));
vResult.push("<u>");
vResult.push(pText.charAt(vEnd+2));
vResult.push("</u>");
vStart = vEnd + 3;
vEnd = pText.indexOf("~~", vStart);
}
vResult.push(pText.substring(vStart, pText.length));
return vResult.join("");
}
function reactOnResizePAGEBODY(casacontrol)
{
doResizePAGEBODY(casacontrol);
if(this.sizeMozDivs != undefined) sizeMozDivs();
doResizePAGEBODY(casacontrol);
}
function doResizePAGEBODY(casacontrol)
{
var vHeight = parent.innerHeight || parent.document.body.clientHeight;
vHeight = vHeight - calculateHeaderHeight() - calculateFooterHeight();
if (vHeight < 0) vHeight = 0;
var vWidth = parent.innerWidth || parent.document.body.clientWidth;
if (casacontrol.CASA_bufferedHeight == vHeight && casacontrol.CASA_bufferedWidth == vWidth) return;
casacontrol.CASA_bufferedHeight = vHeight;
casacontrol.CASA_bufferedWidth = vWidth;
passPagePixelSize(vWidth,vHeight);
casacontrol.style.height = C_adjustUnits(vHeight);
casacontrol.style.width = C_adjustUnits(vWidth);
}
function passPagePixelSize(pWidth,pHeight)
{
if (pHeight <= 0)
{
pHeight = parent.innerHeight || parent.document.body.clientHeight;
}
if (pWidth <= 0)
{
pWidth = parent.innerWidth || parent.document.body.clientWidth;
}
setPropertyValue("pagePixelHeight",pHeight);
setPropertyValue("pagePixelWidth",pWidth);
}
function passTimeZoneOffset()
{
try
{
var offset = new Date();
setPropertyValue("timeZoneOffset",(-1)*(offset.getTimezoneOffset()));
}
catch (e) {}
}
function switchToOccupiedPAGE()
{
m_focusTimeout = 99;
if ( m_doBlockIO )
parent.m_blockIO = true;
m_doBlockIO = true;
if ( m_displayOccupied )
setDisplayTHISOCCUPIED("");
m_displayOccupied = true;
for(var i=0; i<m_switchToOccupiedListeners.length; i++)
{
var o = m_switchToOccupiedListeners[i];
try { o.listenermethod(o.param); }
catch(exc)
{
addLogMessage("ERROR on calling switchToOccupiedListeners "+exc);
addLogMessage("ERROR on calling switchToOccupiedListeners "+o.listenermethod);
}
}
}
m_firstMozillaSwitch = true;
function switchToDisplayPAGE()
{
m_focusTimeout = null;
m_pageInactive = false;
m_cscformOccupied = false;
parent.m_blockIO = false;
parent.m_blockIOByFlush = false;
parent.CasaPAGE.style.display = '';
var vOcc = findTHISOCCUPIED(false);
if (vOcc != null)
{
setDisplayTHISOCCUPIED("");
setDisplayTHISOCCUPIED("none");
}
if (m_firstMozillaSwitch == true)
{
if ( parent.C.sizeMozDivs != undefined ) parent.C.sizeMozDivs();
m_firstMozillaSwitch = false;
}
if (parent.CasaLOADING &&
parent.CasaLOADING.style.display == '')
parent.CasaLOADING.style.display = 'none';
try
{
parent.parent.bringToFrontSCP(parent.location.href);
}
catch (eexxcc) {}
}
var mm_startDragCL = null;
function startDragCL(dropInfo,innerHTML,evt,tt,useTT)
{
if (mm_startDragCL == null) mm_startDragCL = CL().C_startDrag;
return mm_startDragCL.call(this, dropInfo,innerHTML,evt,tt,useTT);
}
var mm_setDragShift = null;
function setDragShift(shiftLeft,shiftTop,dragDropFunction)
{
if (mm_setDragShift == null) mm_setDragShift = CL().C_setDragShift;
return mm_setDragShift.call(this, shiftLeft,shiftTop,dragDropFunction);
}
var mm_moveDragCL = null;
function moveDragCL(evt)
{
if (mm_moveDragCL == null) mm_moveDragCL = CL().C_moveDrag;
return mm_moveDragCL.call(this, evt);
}
var mm_checkIfDragProcessIsActiveCL = null;
function checkIfDragProcessIsActiveCL()
{
if (mm_checkIfDragProcessIsActiveCL == null) mm_checkIfDragProcessIsActiveCL = CL().C_checkIfDragProcessIsActive;
return mm_checkIfDragProcessIsActiveCL.call(this);
}
var mm_endDragCL = null;
function endDragCL(evt)
{
if (mm_endDragCL == null) mm_endDragCL = CL().C_endDrag;
return mm_endDragCL.call(this,evt);
}
var m_startDragTime = null;
function startDragPAGE(dragHTML,eve)
{
try
{
var casadragdrop = findDRAGDROP();
m_startDragTime = (new Date()).getTime();
parent.m_dragMode = true;
casadragdrop.innerHTML = dragHTML;
}
catch (eexxcc) {}
}
function setDragShiftPAGE(shiftLeft,shiftTop)
{
parent.m_dragIconShiftLeft = shiftLeft;
parent.m_dragIconShiftTop = shiftTop;
}
var m_colMoveVisTEXTGRID;
function moveDragPAGE(eve)
{
try
{
if(eve != null && eve.button != 0)
{
if(checkIO() == false)
{
var ddiv = findTHISOCCUPIED(false);
if (ddiv != null)
{
setDisplayTHISOCCUPIED("");
if (m_parentparent.m_fixedOccupiedImage)
{
ddiv.style.left = 0;
ddiv.style.top = 0;
}
else
{
ddiv.style.left = C_adjustUnits((eve.clientX + 10));
ddiv.style.top = C_adjustUnits((eve.clientY + 10));
}
}
}
else
{
setDisplayTHISOCCUPIED("none");
}
}
if (checkIfDragProcessIsActiveCL())
{
moveDragCL(eve);
return;
}
var casadragdrop = findDRAGDROP(false);
if (casadragdrop == null) return;
if (parent.m_dragMode == false) return;
if (m_startDragTime != null &&
(new Date().getTime() - m_startDragTime < 250))
{
return;
}
casadragdrop.style.display = "";
if (parent.m_dragType == "RESIZABLE")
{
var vCC = parent.m_dragRsizable;
casadragdrop.style.top = C_adjustUnits(vCC.CASA_posY);
casadragdrop.style.left = C_adjustUnits(eve.clientX);
}
else if (parent.m_dragType == "COLMOVE")
{
m_colMoveVisTEXTGRID = true;
var vCC = parent.m_dragRsizable;
casadragdrop.style.top = C_adjustUnits(vCC.CASA_posY);
var eventX = eve.clientX;;
if (vCC.CASA_posXMin > eventX)
casadragdrop.style.left = C_adjustUnits(vCC.CASA_posXMin);
else if (vCC.CASA_posXMax < eventX)
casadragdrop.style.left = C_adjustUnits(vCC.CASA_posXMax);
else
casadragdrop.style.left = C_adjustUnits((eventX-10));
}
else if (parent.m_dragType == "VSPLIT")
{
var vCC = parent.document.getElementById(parent.m_dragId);
casadragdrop.style.top = C_adjustUnits(vCC.CASA_posY);
var eventX = eve.clientX;;
if (vCC.CASA_posXMin > eventX)
casadragdrop.style.left = C_adjustUnits(vCC.CASA_posXMin);
else if (vCC.CASA_posXMax < eventX)
casadragdrop.style.left = C_adjustUnits(vCC.CASA_posXMax);
else
casadragdrop.style.left = C_adjustUnits(eventX);
}
else if (parent.m_dragType == "HSPLIT")
{
var vCC = parent.document.getElementById("HSPLIT" + parent.m_dragId);
casadragdrop.style.left = C_adjustUnits(vCC.CASA_posX);
var eventY = eve.clientY;
if (vCC.CASA_posYMin > eventY-3)
casadragdrop.style.top = C_adjustUnits(vCC.CASA_posYMin);
else if (vCC.CASA_posYMax < eventY)
casadragdrop.style.top = C_adjustUnits(vCC.CASA_posYMax);
else
casadragdrop.style.top = C_adjustUnits(eventY);
}
else if (parent.m_dragType == "CHARTAREA")
{
casadragdrop.style.left = C_adjustUnits((eve.clientX+parent.m_dragIconShiftLeft));
casadragdrop.style.top = C_adjustUnits((eve.clientY+parent.m_dragIconShiftTop));
}
else
{
casadragdrop.style.left = C_adjustUnits((eve.clientX+10));
casadragdrop.style.top = C_adjustUnits((eve.clientY+10));
}
dsc();
return false;
}
catch (eexxcc) {}
}
function dsc()
{
if (this.parent.document.selection) this.parent.document.selection.empty();
else {
var sel = this.parent.window.getSelection();
if ( sel && sel.rangeCount > 0 && sel.getRangeAt(0).getClientRects().length > 0)
this.parent.window.getSelection().removeAllRanges();
}
}
var m_dragEndCallback;
var m_draggingControl;
function endDragPAGE(eve)
{
if (checkIfDragProcessIsActiveCL())
{
endDragCL(eve);
return;
}
try
{
if (m_dragEndCallback != null)
{
m_dragEndCallback(m_draggingControl);
m_dragEndCallback = null;
}
var casadragdrop = findDRAGDROP(false);
if (casadragdrop == null) return;
m_startDragTime = null;
m_colMoveVisTEXTGRID = undefined;
parent.document.body.style.cursor = '';
casadragdrop.style.display = 'none';
parent.m_dragMode = false;
parent.m_dragId = null;
parent.m_dropMethod = null;
if (parent.m_dragType == "VSPLIT")
reactOnMouseUpVSPLIT(casadragdrop.CASA_splitCC, eve);
else if (parent.m_dragType == "HSPLIT")
reactOnMouseUpHSPLIT(casadragdrop.CASA_splitCC, eve);
parent.m_dragType = null;
return true;
}
catch (eexxcc) {}
}
function registerValidationError(cc)
{
cc.CASA_cscValidationErrorStamp = "FIELD";
cc.CASA_hasValidationError=true;
m_validationErrors.push(cc);
}
function registerValidationErrorForDateInput(cc)
{
cc.CASA_cscValidationErrorStamp = "DATEINPUT";
m_validationErrors.push(cc);
}
function unregisterValidationError(cc)
{
var vTmp = [];
for (var vI = 0; vI < m_validationErrors.length; vI++)
if (m_validationErrors[vI] != cc)
vTmp.push(m_validationErrors[vI]);
m_validationErrors = vTmp;
}
function checkAllValidations()
{
checkAllValidations(true);
}
function checkAllValidations(doConfirm)
{
if (m_resetValiddationErrorsAndFlush == true)
{
resetValidationErrors();
m_resetValiddationErrorsAndFlush = false;
return true;
}
for (var ifi=0; ifi<m_innerFrames.length; ifi++)
{
try
{
var ifOK = m_innerFrames[ifi].WORKAREA.csciframe.checkAllValidations();
if (ifOK == false) return false;
}
catch (exc) { }
}
if(m_FieldsArray.length > 0 && m_validationRules.length > 0)
{
for(var controlIndex=0 ;controlIndex < m_FieldsArray.length; controlIndex++)
{
var cc = m_FieldsArray[controlIndex];
for(var vri = 0; vri < m_validationRules.length; vri++)
{
var validationrules = m_validationRules[vri];
var tempValueProp = validationrules.split(";");
tempValueProp = self.rulesStringtoFieldValueProp(tempValueProp[0]);
if(cc.CASA_valueprop == tempValueProp)
{
var rules = validationrules.split("_");
if(rules[rules.length-1] == "onsubmit")
{
cc.CASA_checkOnSubmit = true;
var value = cc.value;
if (cc.CASA_datatype == "float")
value = convertDisplayStringIntoFLOAT(value);
self.checkValidationRules(cc,rules,value);
}
}
}
}
}
if (m_validationErrors.length == 0) return true;
var msg = "";
for(var i=0 ;i < m_validationErrors.length;i++)
{
if (m_validationErrors[i].CASA_valErrors != null )
{
var valErrors = m_validationErrors[i].CASA_valErrors;
for( var k = 0 ;k < valErrors.length ; k++ )
{
if(msg.search(valErrors[k])< 0)
msg += valErrors[k] +"\n\n";
}
m_validationErrors[i].lastTitle = m_validationErrors[i].title;
m_validationErrors[i].title = msg;
self.decorateInputFieldOnError(m_validationErrors[i]);
m_validationErrors[i].CASA_valErrors = [];
}
}
try { m_validationErrors[m_validationErrors.length-1].focus(); } catch(excc) {}
msg = msg.substring(0,msg.lastIndexOf('\n'));
var smsg = msg;
msg =  replaceLiteralWithAddTextTRANSLATION(m_language, "labelNoValidInput", msg, self);
if (msg == null || msg == "" || doConfirm == false )
msg =  replaceLiteralTRANSLATION(m_language, "labelNoValidPage");
if (getPropertyValue("cISAddons.cisA1") != "false")
{
return false;
}
else
{
if (doConfirm==true && confirm(msg))
{
resetValidationErrors();
return true;
}
if (doConfirm == false)
{
var iquest = msg.lastIndexOf('\n');
if ( iquest > 0) msg = msg.substring(0,iquest);
alert(msg + "\n\n" + smsg);
m_validationErrors = [];
}
}
if (window.location.href.indexOf("ZZZZZZZZGenerated") > 0)
return true;
return false;
}
function isValueHelpOpen()
{
var vMPADIV = findMPADIV();
return ((vMPADIV != null) && (vMPADIV.style.display != "none"));
}
function isContextMenuOpen()
{
var contextMenu = findTHISCONTEXTMENU(false);
return ((contextMenu != null) && (contextMenu.style.display != "none"));
}
function resetValidationErrors()
{
for (var vI = 0; vI < m_validationErrors.length; vI++)
{
var cc = m_validationErrors[vI];
if (cc.CASA_cscValidationErrorStamp == "DATEINPUT")
{
resetValidationErrorDI(cc);
if(cc.lastValue != undefined)
cc.value = cc.lastValue;
}
else
{
resetValidationErrorFIELD(cc);
if(cc.lastValue != undefined)
cc.value = cc.lastValue;
}
}
m_validationErrors = [];
var vMPADIV = findMPADIV();
if (vMPADIV != null) vMPADIV.style.display = "none";
}
function addLogMessage(logMessage)
{
vDate = new Date();
m_logStrings[m_logIndex] = logMessage;
m_logDates[m_logIndex] = vDate;
m_logIndex++;
if (m_logIndex > 300) m_logIndex = 0;
try
{
CL().m_lastLogString = logMessage + " in " + parent.location.href;
CL().m_lastLogDate = vDate;
}
catch (exc)
{}
if ( m_consolelog == undefined )
m_consolelog =  getPropertyValue("cISAddons.jsconsolelog");
if ( m_consolelog == true || m_consolelog == "true" )
console.log(vDate.getMinutes()+"/"+vDate.getSeconds()+"/"+vDate.getMilliseconds() + " ==> " + m_modelName + " ==> " + logMessage );
}
function convertCasabacURL(urlString)
{
if (urlString == null) return null;
if (urlString.charAt(0) == '/') return m_parentparent.m_currentWebApp + urlString;
return urlString;
}
function isFirefox()
{
if (m_isFirefox == undefined)
{
m_isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
m_firefoxVersion = new Number(RegExp.$1);
}
return m_isFirefox;
}
function getFirefoxVersion()
{
if (isFirefox())
{
return m_firefoxVersion;
}
return -1;
}
function isSafari()
{
if (m_isSafari == undefined)
{
m_isSafari = navigator.userAgent.toLowerCase().indexOf( 'safari' ) != -1;
}
return m_isSafari;
}
function findSrcElement(evt)
{
if (evt == null) return null;
return evt.target;
}
function handleLastInput(srcElement)
{
srcElement.blur();
try { srcElement.focus(); } catch (exxe) {}
}
function avoidNextSynchronizationDrillDown()
{
m_synchronizeAvoidDrillDown = true;
}
function addInnerFrame(innerFrame)
{
m_innerFrames[m_innerFrames.length] = innerFrame;
}
function synchronizeAndContinue(continueMethod)
{
synchronizePageAndInnerPagesAndContinue(continueMethod);
}
function synchronizePageAndInnerPagesAndContinue(continueMethod)
{
m_continueMethod = continueMethod;
m_innerFramesIndex = m_innerFrames.length - 1;
m_synchronizePage = true;
synchronizeAndContinueWithNextIndex();
}
function synchronizeInnerPagesAndContinue(continueMethod)
{
m_continueMethod = continueMethod;
if (m_synchronizeAvoidDrillDown == false)
{
m_innerFramesIndex = m_innerFrames.length - 1;
}
else
{
m_innerFramesIndex = -1;
m_synchronizeAvoidDrillDown = false;
}
m_synchronizePage = false;
try
{
synchronizeAndContinueWithNextIndex();
}
catch (exc)
{
}
}
function synchronizeAndContinueWithNextIndex()
{
if (m_innerFrames != null &&
m_innerFramesIndex >= 0 &&
m_innerFramesIndex < m_innerFrames.length)
{
var innerFrame = m_innerFrames[m_innerFramesIndex];
m_innerFramesIndex--;
try
{
if (innerFrame != null &&
innerFrame.WORKAREA != null &&
innerFrame.m_isCasabacMFPAGE != true &&
innerFrame.WORKAREA.csciframe != null)
{
addLogMessage("synchronizing inner frame " + (m_innerFramesIndex+1));
innerFrame.WORKAREA.m_blockIOByFlush = true;
if (m_resetValiddationErrorsAndFlush == true)
innerFrame.WORKAREA.csciframe.m_resetValiddationErrorsAndFlush = true;
innerFrame.WORKAREA.csciframe.synchronizePageAndInnerPagesAndContinue(synchronizeAndContinueWithNextIndex);
}
else if (innerFrame != null &&
innerFrame.WORKAREA != null &&
innerFrame.WORKAREA.m_isCasabacMFPAGE == true)
{
addLogMessage("synchronizing inner frame " + (m_innerFramesIndex+1) + " - this is a MFPAGE");
m_innerMFFrames = innerFrame.WORKAREA.getCasabacFrames();
m_innerMFFramesIndex = m_innerMFFrames.length;
synchronizeNextMFFrame();
}
else
{
synchronizeAndContinueWithNextIndex();
}
}
catch (exc)
{
synchronizeAndContinueWithNextIndex();
}
}
else
{
if (m_synchronizePage == true)
{
var unSubmittedChangeExists = false;
if (m_properties == null)
{
var vtcm = m_continueMethod;
m_continueMethod = null;
if (vtcm!=null) vtcm();
return;
}
invokeDCListeners();
var vmaxi = m_properties.length;
for (var i=0; i<vmaxi; i++)
{
if (m_properties[i].isChanged == true)
{
var irc = m_properties[i].name.indexOf("rowCount");
if (irc > 0 &&
irc == m_properties[i].name.length - 8)
{
}
else if (!m_internalProperties[m_properties[i].name] == true)
{
unSubmittedChangeExists = true;
break;
}
}
}
if (unSubmittedChangeExists == true)
{
setPropertyValue("cISubPageRefresh","true");
submitModel("submit");
}
else
{
var vtcm = m_continueMethod;
m_continueMethod = null;
if (vtcm!=null) vtcm();
}
}
else
{
var vtcm = m_continueMethod;
m_continueMethod = null;
if (vtcm!=null) vtcm();
}
}
}
function synchronizeNextMFFrame()
{
m_innerMFFramesIndex--;
if (m_innerMFFramesIndex < 0)
{
synchronizeAndContinueWithNextIndex();
return;
}
addLogMessage("synchronizing inner MF frame " + m_innerMFFramesIndex);
try
{
m_innerMFFrames[m_innerMFFramesIndex].WORKAREA.csciframe.synchronizePageAndInnerPagesAndContinue(synchronizeNextMFFrame);
}
catch (eexxcc)
{
addLogMessage('Exception caught: csc.synchronizeNextMFFrame:' + eexxcc);
synchronizeNextMFFrame();
}
}
function checkIO()
{
if ( m_modelName == undefined || m_modelName == null ) return false;
if ( m_modelName.indexOf("natlegacy") > 0 ) return checkIOTrue();
if (parent.m_blockIOByFlush == true) return checkIOTrue();
if (parent.m_blockIO == true) return checkIOFalse2();
if (CL().checkMozIO(m_parentparent,false)==false) return checkIOFalse();
return checkIOTrue();
}
function checkIOForNoSubmits()
{
if (parent.m_blockIO == true && parent.m_blockIOByFlush == true)
{
var vcd = new Date();
if (m_lastServerFetch != null)
{
var vdiff = vcd.getTime() - m_lastServerFetch.getTime();
if (vdiff > 250)
return checkIOFalse2();
}
}
return checkIO();
}
function checkIOFalse(addText)
{
return false;
}
function checkIOFalse2()
{
m_checkIOFalseCounter++;
if ( m_checkIOFalseCounter >= 5 ) resetCheckIO();
return false;
}
function checkIOTrue()
{
m_checkIOFalseCounter = 0;
return true;
}
function resetCheckIO()
{
parent.m_blockIOByFlush = false;
parent.m_blockIO = false;
m_checkIOFalseCounter = 0;
}
function addFocusable(pfocusable,pfirstcategory)
{
if (parent.m_roi_firstusage == false) return;
m_focusables.push(pfocusable);
m_focusablesCat.push(pfirstcategory);
}
var m_currentFocusLine;
var m_currentFocusGrid;
function startFocusGrid(cc)
{
try
{
var vfcs = m_currentFocusGrid[0];
var vlcs = m_currentFocusGrid[1];
var vdelta = vfcs.length - vlcs.length
var vfccs = [];
for (var i=0; i<vlcs.length; i++)
vfccs.push(vfcs[i+vdelta]);
m_currentFocusGrid[0] = vfccs;
cc.CASA_fg = m_currentFocusGrid;
m_currentFocusGrid = null;
}
catch (exc) {}
}
function startFocusLine()
{
if (m_currentFocusGrid == null) m_currentFocusGrid = [];
m_currentFocusGrid.push(m_currentFocusLine);
m_currentFocusLine = null;
}
function startFocusCell(cc)
{
if (m_currentFocusLine == null) m_currentFocusLine = [];
m_currentFocusLine.push(cc);
}
function buildLineCells(vcs)
{
var vres = [];
for (var i=0; i<vcs.length; i++)
{
var vcsi = vcs[i];
var vsubs = vcsi.CASA_fgsubs;
if (vsubs == null)
{
vres.push(vcsi);
}
else
{
for (var j=0; j<vsubs.length; j++)
{
vres.push(vsubs[j]);
}
}
}
return vres;
}
function findFocusControl(vgrid,vcell,vdelta)
{
var vls = vgrid.CASA_fg;
if (vls == null) return -1;
if (vls.length == 0) return -1;
for (var il=0; il<vls.length; il++)
{
var vcs = vls[il];
vcs = buildLineCells(vcs);
for (var ic=0; ic<vcs.length; ic++)
{
if (vcs[ic] == vcell)
{
try
{
var newIndex = il + vdelta;
if (vdelta == 1000) newIndex = 0;
if (vdelta == 1001) newIndex = vls.length-1;
var vccs = vls[newIndex];
vccs = buildLineCells(vccs);
var vres = vccs[ic];
return vres;
}
catch (exc)
{
return 0;
}
}
}
}
return -1;
}
function findFirstFocusControl(vgrid)
{
var vls = vgrid.CASA_fg;
if (vls == null) return null;
if (vls.length == 0) return null;
var vcs = buildLineCells(vls[0]);
return vcs[0];
}
function findLastFocusControl(vgrid)
{
var vls = vgrid.CASA_fg;
if (vls == null) return null;
if (vls.length == 0) return null;
var vcs = buildLineCells(vls[vls.length-1]);
return vcs[vcs.length-1];
}
function findIndexOfLastTabableFocusLine(vgrid)
{
var vls = vgrid.CASA_fg;
if (vls == null) return null;
if (vls.length == 0) return null;
var result = -1;
for (var il=0; il<vls.length; il++)
{
var vcs = vls[il];
vcs = buildLineCells(vcs);
for (var ic=0; ic<vcs.length; ic++)
if (vcs[ic].tabIndex >= 0 &&
vcs[ic].readOnly != true &&
vcs[ic].disabled != true)
{
result = il;
break;
}
}
return result;
}
function findFocusControlXY(vgrid,vcell)
{
var vls = vgrid.CASA_fg;
if (vls == null) return null;
if (vls.length == 0) return null;
for (var il=0; il<vls.length; il++)
{
var vcs = vls[il];
vcs = buildLineCells(vcs);
for (var ic=0; ic<vcs.length; ic++)
if (vcs[ic] == vcell)
{
var vres = new Object();
vres.X = ic;
vres.Y = il;
return vres;
}
}
return null;
}
function findFocusControlForXY(vgrid,vx,vy)
{
var vls = vgrid.CASA_fg;
if (vls == null) return null;
if (vls.length == 0) return null;
var vlsvy = vls[vy];
vlsvy = buildLineCells(vlsvy);
return vlsvy[vx];
}
function repointFocusInScreenExecute()
{
m_firstFocusCall = true;
pointFocusInternally(false);
}
function repointFocus()
{
m_firstFocusCall = true;
pointFocusInternally(true);
}
function pointFocus()
{
if (m_focusTimeout == null)
pointFocusInternally(true);
m_focusTimeout = null;
}
function isSuppressFocus()
{
var vSuppFocus = getPropertyValue("cISAddons.suppressFocusManagement");
return ((vSuppFocus == true || vSuppFocus == "true"));
}
function pointFocusInternally(pCheckSuppressFocusMgmt)
{
addLogMessage("FOCUS - pointFocus started");
var vSuppFocus = getPropertyValue("cISAddons.suppressFocusManagement");
if (pCheckSuppressFocusMgmt && (vSuppFocus == true || vSuppFocus == "true"))
{
addLogMessage("FOCUS - Adapter suppressed focus management");
return;
}
if (m_suppressFocusManagementOncePAGE == true)
{
m_suppressFocusManagementOncePAGE = null;
addLogMessage("FOCUS - Flas suppressFocusManagementOncePAGE suppressed focus management");
return;
}
var vResult = false;
try
{
addLogMessage("pointFocus - pointFocusToFirstRequestor");
vResult = pointFocusToFirstRequestor();
}
catch (eexxcc) {}
if (vResult == true)
{
m_firstFocusCall = false;
return;
}
if (vResult == false && m_firstFocusCall == false)
{
try{ if (pointFocusAfterIP) pointFocusAfterIP(); } catch (ei){}
return;
}
m_firstFocusCall = false;
addLogMessage("FOCUS - No explicit focus set by application, normal focus selection started");
pointFocusForFreshPage();
}
function pointFocusForFreshPage()
{
var vSuppFocus = getPropertyValue("cISAddons.suppressFocusManagement");
if (vSuppFocus == true || vSuppFocus == "true")
{
addLogMessage("FOCUS - Adapter suppressed focus management");
return;
}
for (var j=0; j<2; j++)
{
if (j == 1) vfirstcat = false;
for (var i=0; i<m_focusables.length; i++)
{
if (j == 0 && m_focusablesCat[i] != true) continue;
var vcon = m_focusables[i];
if (vcon.disabled != true && vcon.tabIndex >= 0)
try
{
addLogMessage("FOCUS - Setting focus in focusable " + i+ " ==> "+vcon.tagName);
vcon.focus();
if (vcon.offsetWidth == 0){
throw ("set focus not succeessfull");
}
if(vcon.CASA_alwaysflush != "true")
{
if (parent.m_flushMethodPAGE == null) parent.focus();
vcon.focus();
}
return;
}
catch (ee)
{
addLogMessage("FOCUS - Execption occurred in focusable " + i + ": " + ee);
}
}
}
try { parent.gebid("THISBODY").focus(); } catch (e) {}
}
function pointFocusToFirstRequestor()
{
if (m_focusRequestors == null)
return false;
addLogMessage("FOCUS - pointFocusToFirstRequestor started, number of focus requestors = " + m_focusRequestors.length);
if (m_focusRequestors.length == 1)
{
try
{
var frInfo = m_focusRequestors[0];
if (frInfo.setActiveOnly != true)
{
frInfo.control.focus();
if(frInfo.control.CASA_alwaysflush != "true")
{
if (parent.m_flushMethodPAGE == null) parent.focus();
frInfo.control.focus();
}
try { frInfo.control.select(); } catch (eee) {}
}
else if ((frInfo.control.type == "textarea") || (frInfo.control.type == "text"))
{
setSelectionRange (frInfo.control,0,0);
}
try { if (frInfo.control.setActive) frInfo.control.setActive(); } catch (eee) {}
m_focusRequestors = null;
addLogMessage("FOCUS - Did set focus to first requestor");
return true;
}
catch (exception)
{
m_focusRequestors = null;
addLogMessage("FOCUS - Exception occurred " + exception);
return false;
}
}
var vmaxj = m_focusRequestors.length;
for (var j=0; j<vmaxj; j++)
{
try
{
var frInfo = m_focusRequestors[j];
if (frInfo.control.focus != null)
{
if (frInfo.setActiveOnly != true)
{
frInfo.control.focus();
if (frInfo.control.offsetWidth == 0){
throw ("set focus not succeessfull");
}
if(frInfo.control.CASA_alwaysflush != "true")
{
if (parent.m_flushMethodPAGE == null) parent.focus();
frInfo.control.focus();
}
try { frInfo.control.select(); } catch (eee) {}
}
else if ((frInfo.control.type == "textarea") || (frInfo.control.type == "text"))
{
setSelectionRange (frInfo.control,0,0);
}
try { if (frInfo.control.setActive) frInfo.control.setActive(); } catch (eee) {}
m_focusRequestors = null;
addLogMessage("FOCUS - Did set focus to requestor " + j);
return true;
}
else
{
addLogMessage("FOCUS - Focus requestor does not support focus() " + j);
}
}
catch (exception)
{
addLogMessage("FOCUS - Could not set focus for requestor " + j +": " + exception);
}
}
m_focusRequestors = null;
return false;
}
function setSelectionRange(input, selectionStart, selectionEnd)
{
if (input.setSelectionRange)
{
input.focus();
input.setSelectionRange(selectionStart, selectionEnd);
}
else if (input.createTextRange)
{
var range = input.createTextRange();
range.collapse(true);
range.moveEnd('character', selectionEnd);
range.moveStart('character', selectionStart);
range.select();
}
}
function addFocusRequestorInternal (control, activeOnly)
{
if (m_newModelForAddFocusRequestor)
{
clearFocusRequestor ();
m_newModelForAddFocusRequestor=false;
}
if (m_focusRequestors == null)
m_focusRequestors = [];
var reqInfo = new Object();
reqInfo.control = control;
reqInfo.setActiveOnly = activeOnly;
m_focusRequestors[m_focusRequestors.length] = reqInfo;
}
function addFocusRequestor(control)
{
addFocusRequestorInternal(control, false);
}
function clearFocusRequestor()
{
m_focusRequestors = null;
}
function addActiveElementRequestor(control)
{
addFocusRequestorInternal(control, true);
}
function applyCasaTabIndex(cc, pCallerInfo)
{
applyCasaTabIndexFor(cc, cc, pCallerInfo);
}
function disableCasaTabIndexFor(cc, tabElm, pCallerInfo)
{
applyCasaTabIndexFor(cc, tabElm, pCallerInfo);
tabElm.tabIndex = -1;
}
function applyCasaTabIndexFor(cc, tabElm, pCallerInfo)
{
if (cc.CASA_cti == null)
{
cc.CASA_cti = 1;
}
tabElm.tabIndex = cc.CASA_cti;
if (cc.CASA_tabindex == null)
{
cc.CASA_tabindex = "-";
}
if (m_tabElements["LOGCOUNT"] == null)
m_tabElements["LOGCOUNT"] = 0;
if (m_tabElements["LOGCOUNT"] > 100)
return;
m_tabElements["LOGCOUNT"] += 1;
tabElm.CASA_tabIndexInfo = pCallerInfo;
tabElm.CASA_tabindex = cc.CASA_tabindex;
tabElm.CASA_cti = cc.CASA_cti;
if (cc.CASA_cti > 1)
m_tabElements[cc.CASA_cti] = tabElm;
else
m_tabElementsUndefined[tabElm.id] = tabElm;
}
function addAreaTabIndexInfo(id,name,cti,tabindex)
{
var o = new Object();
o.CASA_cti = cti;
o.CASA_tabindex = tabindex;
o.CASA_valueprop = name;
o.id = id;
applyCasaTabIndex(o, "ROWAREA")
}
function addHotKey(keyCode,ctrlKey,shiftKey,altKey,method)
{
var hotKey = new Object();
hotKey.keyCode = keyCode;
hotKey.ctrlKey = ctrlKey;
hotKey.shiftKey = shiftKey;
hotKey.altKey = altKey;
hotKey.method = method;
m_hotKeys.push(hotKey);
}
function addControlBasedHotKey(ccId, keyCode,callbackMethod,callbackParam)
{
var hotKey = new Object();
hotKey.ccId = ccId;
hotKey.keyCode = keyCode;
hotKey.ctrlKey = m_hotKeyCode.indexOf("17")>=0;
hotKey.shiftKey = m_hotKeyCode.indexOf("16")>=0;
hotKey.altKey = m_hotKeyCode.indexOf("18")>=0;
hotKey.callbackMethod = callbackMethod;
hotKey.callbackParam = callbackParam;
m_hotKeysWithCallback.push(hotKey);
}
function addHotKeyWithControlScope(keyCode,ctrlKey,shiftKey,altKey,method,controlInfo)
{
var hotKey = new Object();
hotKey.keyCode = keyCode;
hotKey.ctrlKey = ctrlKey;
hotKey.shiftKey = shiftKey;
hotKey.altKey = altKey;
hotKey.method = method;
hotKey.controlInfo = controlInfo;
m_hotKeysWithControlScope.push(hotKey);
}
function removeHotKeys(ccId)
{
v = [];
for (var i=0; i<m_hotKeysWithCallback.length; i++)
if (m_hotKeysWithCallback[i].ccId != ccId)
v.push(m_hotKeysWithCallback[i]);
m_hotKeysWithCallback = v;
}
var mm_processHotKeys = null;
function processHotKeys(bodyEvent)
{
if (mm_processHotKeys == null) mm_processHotKeys = CL().C_processHotKeys;
return mm_processHotKeys.call(this, bodyEvent);
}
var mm_changeReturnToTab = null;
function changeReturnToTab(bodyEvent)
{
if (mm_changeReturnToTab == null) mm_changeReturnToTab = CL().C_changeReturnToTab;
return mm_changeReturnToTab.call(this, bodyEvent);
}
var mm_focusNextInput = null;
function focusNextInput(element)
{
if (mm_focusNextInput == null) mm_focusNextInput = CL().C_focusNextInput;
return mm_focusNextInput.call(this, element);
}
var mm_focusNextTabInput = null;
function focusNextTabInput(element)
{
if (mm_focusNextTabInput == null) mm_focusNextTabInput = CL().C_focusNextTabInput;
return mm_focusNextTabInput.call(this, element);
}
function avoidProcessingForNextHotKey()
{
m_noProcessingForNextHotKey = true;
}
function findHotkeyKeycode(name)
{
if (name == null) return null;
var index = name.indexOf("~~");
if (index >= 0 && index != name.length-2)
{
var c = name.charCodeAt(name.indexOf("~~")+2);
if (c >= 97) c -=32;
return c;
}
return null;
}
function decodeCSVStringEMPTY(s)
{
if (s == "")
{
var vResult = [];
vResult[0] = "";
return vResult;
}
else
return decodeCSVString(s);
}
var s_bufferCSV = [];
function decodeCSVStringUsingBuffer(s)
{
var result = s_bufferCSV[s];
if (result != null)
return result;
result = decodeCSVString(s);
s_bufferCSV[s] = result;
return result;
}
function decodeCSVString(s)
{
return decodeString(s, ";");
}
function decodeString(s,separator)
{
var vResult = [];
if ((s == null)||(s == "")) return vResult;
var vNextSubStringStartIndex = 0;
var vNextCommaIndex = s.indexOf(separator);
var vTmpString = "";
while (vNextCommaIndex >= 0)
{
if ((vNextCommaIndex == 0) || (s.charAt(vNextCommaIndex-1) != "\\"))
{
vTmpString = vTmpString + s.substring(vNextSubStringStartIndex, vNextCommaIndex);
vResult[vResult.length] = vTmpString;
vTmpString= "";
}
else
{
vTmpString = vTmpString + s.substring(vNextSubStringStartIndex, vNextCommaIndex-1) + separator;
}
vNextSubStringStartIndex = vNextCommaIndex +1;
vNextCommaIndex = s.indexOf(separator, vNextCommaIndex + 1);
}
vResult[vResult.length] = vTmpString + s.substring(vNextSubStringStartIndex, s.length);
return vResult;
}
function addClickAwayObject(cao)
{
m_clickAwayObjects[m_clickAwayObjects.length] = cao;
}
function addClickAwayMethod(pMethod)
{
m_clickAwayMethods.push(pMethod);
}
function avoidClickAway()
{
m_avoidClickAway = true;
}
function clickAway()
{
if (m_avoidClickAway == false)
{
for (var i=0; i<m_clickAwayObjects.length; i++)
{
if(m_clickAwayObjects[i].CASA_callbackcc != null &&
m_clickAwayObjects[i].CASA_callbackcc.CASA_hasValidationError == true) continue;
m_clickAwayObjects[i].style.display = "none";
}
for (var i=0; i<m_clickAwayMethods.length; i++) m_clickAwayMethods[i]();
try { if (CL().m_MPADIVOwnerFrame != null && CL().m_MPADIVOwnerFrame != this) CL().m_MPADIVOwnerFrame.clickAway(); } catch(e) {}
}
m_avoidClickAway = false;
}
function addHeaderObject(headerObject)
{
if (parent.m_roi_firstusage == false) return;
m_headerObjects.push(headerObject);
}
function addFooterObject(footerObject)
{
if (parent.m_roi_firstusage == false) return;
m_footerObjects.push(footerObject);
}
function calculateHeaderHeight()
{
var zHeight = 0;
for (var i=0; i<m_headerObjects.length; i++)
zHeight += m_headerObjects[i].offsetHeight;
return zHeight;
}
function calculateFooterHeight()
{
var zHeight = 0;
for (var i=0; i<m_footerObjects.length; i++)
zHeight += m_footerObjects[i].offsetHeight;
return zHeight;
}
function addMLValue(pval) { if (parent.m_roi_firstusage == false) return; if (pval != null) m_MLValues.push(pval); }
function addMLTextNode(ptext) { if (parent.m_roi_firstusage == false) return; if (ptext != null) m_MLTextNodes.push(ptext); }
function addMLSpan(pspan) { if (parent.m_roi_firstusage == false) return; if (pspan != null) m_MLSpans.push(pspan); }
function addMLOption(poption) { if (parent.m_roi_firstusage == false) return; if (poption != null) m_MLOptions.push(poption); }
function addMLImage(pimage) { if (parent.m_roi_firstusage == false) return; if (pimage != null) m_MLImages.push(pimage); }
function addMLButton(pbutton, callbackMethod, callbackParam)
{
if (parent.m_roi_firstusage == false) return;
if (pbutton != null)
{
o = new Object();
o.input = pbutton;
o.callbackMethod= callbackMethod;
o.callbackParam = callbackParam;
m_MLButtons.push(o);
}
}
function addMLTab(ptab, callbackMethod, callbackParam)
{
if (parent.m_roi_firstusage == false) return;
if (ptab != null)
{
o = new Object();
o.span = ptab;
o.callbackMethod= callbackMethod;
o.callbackParam = callbackParam;
m_MLTabs.push(o);
}
}
function doReplaceValue(val) {
if (val.charAt(0) != '$') return null;
var vText = getPropertyValue(val);
if (vText == null || vText == '') return null;
return convertDoubleTildeToUTag(vText);
}
function replaceTextIds()
{
var vmaxi = 0;
var values = m_MLValues;
vmaxi = values.length;
for (var i=0; i<vmaxi; i++)
{
var nVal = null;
if (values[i].value == undefined) {
nVal = doReplaceValue(values[i].textContent);
if (nVal != null) values[i].innerHTML = values[i].innerHTML.replace(values[i].textContent, nVal);
}
else {
nVal = doReplaceValue(values[i].value);
if (nVal != null) values[i].value = nVal;
}
}
var spans = m_MLSpans;
vmaxi = spans.length;
for (var i=0; i<vmaxi; i++)
{
if (spans[i].id.charAt(0) == '$')
{
var vText = getPropertyValue(spans[i].innerHTML);
if (vText == null) continue;
if (vText == '') continue;
spans[i].innerHTML = convertDoubleTildeToUTag(vText);
}
}
var textNodes = m_MLTextNodes;
vmaxi = textNodes.length;
for (var i=0; i<vmaxi; i++)
{
var tVal = doReplaceValue(textNodes[i].nodeValue);
if (tVal != null) textNodes[i].nodeValue = tVal;
}
var tabs = m_MLTabs;
vmaxi = tabs.length;
for (var i=0; i<vmaxi; i++)
{
if (tabs[i].span.id.charAt(0) == '$')
{
var vText = getPropertyValue(tabs[i].span.innerHTML);
if (vText == null) continue;
if (vText == '') continue;
var keyCode = findHotkeyKeycode(vText);
if (keyCode != null) addControlBasedHotKey(tabs[i].span.id, keyCode,tabs[i].callbackMethod,tabs[i].callbackParam);
tabs[i].span.innerHTML = convertDoubleTildeToUTag(vText);
}
}
buttons = m_MLButtons
vmaxi = buttons.length;
for (var i=0; i<vmaxi; i++)
{
var vvalue = buttons[i].input.innerHTML;
var vdollar1 = vvalue.indexOf("$1$");
var vdollar2 = vvalue.indexOf("$2$");
if (vdollar1 >= 0 && vdollar2 > vdollar1)
{
var vwholetext = vvalue.substring(0,vdollar1);
var vtextprop = vvalue.substring(vdollar1+3,vdollar2);
var vText = getPropertyValue("$"+vtextprop);
if (vText == null) continue;
if (vText == '') continue;
var keyCode = findHotkeyKeycode(vText);
if (keyCode != null) addControlBasedHotKey(buttons[i].input.id, keyCode,buttons[i].callbackMethod,buttons[i].callbackParam);
if (vText != null) vwholetext += convertDoubleTildeToUTag(vText);
vwholetext += vvalue.substring(vdollar2+3,vvalue.length);
buttons[i].input.innerHTML = vwholetext;
}
}
var options = m_MLOptions;
vmaxi = options.length;
for (var i=0; i<vmaxi; i++)
{
if (options[i].text != null && options[i].text.charAt(0) == "$")
{
var vText = getPropertyValue(options[i].text);
if (vText == null) continue;
if (vText == '') continue;
options[i].text = vText;
}
}
var images = m_MLImages;
vmaxi = images.length;
for (var i=0; i<vmaxi; i++)
{
if (images[i].title != null && images[i].title.charAt(0) == "$")
{
var vText = getPropertyValue(images[i].title);
if (vText == null) continue;
if (vText == '') continue;
images[i].title = vText;
}
}
}
var mm_refreshOccuranceOfAdapter = null;
function refreshOccuranceOfAdapter(casaocc)
{
if (mm_refreshOccuranceOfAdapter == null) mm_refreshOccuranceOfAdapter = CL().C_refreshOccuranceOfAdapter;
return mm_refreshOccuranceOfAdapter(casaocc,this);
}
function enqueueRefreshOccuranceOfAdapter(casaocc)
{
try { CL().m_refreshOccuranceQueue.push(casaocc); } catch (e) {}
}
function flushRefreshOccuranceQueue()
{
try
{
var q = CL().m_refreshOccuranceQueue;
for (var i=0; i<q.length; i++)
refreshOccuranceOfAdapter(q[i]);
CL().m_refreshOccuranceQueue = [];
}
catch(e) {}
}
var mm_repointFocusInScreen = null;
function repointFocusInScreen(casafoc)
{
if (mm_repointFocusInScreen == null) mm_repointFocusInScreen = CL().C_repointFocusInScreen;
return mm_repointFocusInScreen(casafoc);
}
var mm_setURLInTarget = null;
function setURLInTarget(url,target)
{
if (mm_setURLInTarget == null) mm_setURLInTarget = CL().C_setURLInTarget;
return mm_setURLInTarget.call(this,url,target);
}
var mm_callMethodInTarget = null;
function callMethodInTarget(methodName,target)
{
if (mm_callMethodInTarget == null) mm_callMethodInTarget = CL().C_callMethodInTarget;
return mm_callMethodInTarget.call(this,methodName,target);
}
var mm_findParameterInQuery = null;
function findParameterInQuery(pq,pname)
{
if (mm_findParameterInQuery == null) mm_findParameterInQuery = CL().C_findParameterInQuery;
return mm_findParameterInQuery(pq,pname);
}
var mm_sizeTarget = null;
function sizeTarget(target,size)
{
if (mm_sizeTarget == null) mm_sizeTarget = CL().C_sizeTarget;
return mm_sizeTarget(target,size);
}
function initAlreadyLoadedPage()
{
}
function initWithModelIdAndSessionIdAndProcessId(modelName,modelId,sessionId,processId)
{
addLogMessage("initWithModelId... - started");
m_pageInactive = false;
if (parent.m_roi_firstusage != false)
{
for (var i=0; i<m_modelListenersLast.length; i++)
m_modelListeners.push(m_modelListenersLast[i]);
m_modelListenersLast = [];
}
if (parent.m_roi_firstusage)
{
var vserverversion = m_parentparent.m_cisversion;
for (var i=0; i<m_jsversions.length; i++)
{
var vjsversion = m_jsversions[i];
if (vjsversion != vserverversion)
alert("VERSIONING PROBLEM\n\nThe file " + m_jsfiles[i] + " is version "+vjsversion+". The server's version is " + vserverversion+ ".\nLayout definitions need to be regenerated.");
}
}
passPagePixelSize(-1,-1);
passTimeZoneOffset();
m_modelName = modelName;
m_sessionId = sessionId;
m_processId = processId;
m_modelId = modelId;
vPageInitParam = m_parentparent.pageInitParam;
if (vPageInitParam != null)
{
setPropertyValue("pageInitParam",vPageInitParam);
cscformiframe.document.getElementById("PAGEINITPARAM").value = vPageInitParam;
m_parentparent.pageInitParam = null;
}
if (m_parentparent.CasaSessionSTYLESHEET != null &&
m_parentparent.CasaSessionSTYLESHEET != "")
{
setPropertyValue("style",m_parentparent.CasaSessionSTYLESHEET);
}
try
{
if (m_parentparent.m_previousWORKAREA == null ||
m_parentparent.m_previousWORKAREA.m_withownborder != parent.m_withownborder)
setWithOwnBorder(parent.m_withownborder);
} catch(exc) {}
var vxml = buildFirstTag("i","") +
buildXMLFromModel("initWithModelIdAndSessionIdAndProcessId");
if (m_doLog) addLogMessage("initWithModelId... - submitting");
if (m_parentparent.isPopupPage == true)
{
CL().C_registerPopupPage(m_parentparent, true);
try {m_parentparent.focus();} catch(exc){}
}
fetchModelFromServer(vxml);
m_parentparent.pageInitParam = null;
}
function setWithOwnBorder(isVisible)
{
var vstyle = "visible";
if (isVisible == "false") vstyle = "hidden";
var o = m_parentparent.document.getElementById("SCPRowHeader");
if (o == null) return;
o.style.visibility = vstyle;
o = m_parentparent.document.getElementById("SCPCellIFrameLeft");
o.style.visibility = vstyle;
o = m_parentparent.document.getElementById("SCPCellIFrameRight");
o.style.visibility = vstyle;
o = m_parentparent.document.getElementById("SCPRowFooter");
o.style.visibility = vstyle;
}
function findPseudoURL()
{
var vhref = parent.location.href;
var vx = vhref.lastIndexOf("/");
var vresult = vhref.substring(vx,vhref.length);
vhref = vhref.substring(0,vx);
vx = vhref.lastIndexOf("/");
vresult = vhref.substring(vx,vhref.length) + vresult;
return vresult;
}
var m_lastServerFetch;
function fetchModelFromServer(pxml)
{
m_bufferedxml = null;
var pAccessKey = null;
try
{
if (CL() != null)
{
pAccessKey = CL().buildBufferAccesKey(m_sessionId,m_processId,m_modelId,m_modelName,findPseudoURL());
m_bufferedxml = CL().findBufferedAdapterStream(pAccessKey);
}
}
catch (exc) { m_bufferedxml = null; }
if (m_cscformOccupied == true)
{
if (m_doLog) addLogMessage("fetchModelFromServer - Try again in 20 ms");
setTimeout("fetchModelFromServer(\""+pxml+"\")",20);
return;
}
m_lastServerFetch = new Date();
if (m_bufferedxml == null)
{
if (m_doLog) addLogMessage("fetchModelFromServer - Model is fetched from server");
m_cscformOccupied = true;
var hiddenFrameCom = true;
if ((parent.m_usexmlhttprequest == "true") || (parent.m_usexmlhttprequest == "mozilla") ||
(m_parentparent.m_usexmlhttprequest == "true") || (m_parentparent.m_usexmlhttprequest == "mozilla"))
{
hiddenFrameCom = false;
}
if (hiddenFrameCom == true)
{
cscformiframe.document.getElementById("SESSIONID").value = m_sessionId;
cscformiframe.document.getElementById("XML").value = pxml;
try
{
cscformiframe.submitPost();
}
catch(njx1269) { m_cscformOccupied = false; return;}
if (m_doLog) addLogMessage("fetchModelFromServer - Submit executed");
}
else
{
executeXMLHTTTPPost(pxml);
}
}
else
{
if (m_doLog) addLogMessage("fetchModelFromServer - Model is available in central library");
CL().clearBufferedAdapterStream(pAccessKey);
reactOnNewModel(true);
}
}
function createXMLHttpRequest()
{
try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch (e) {}
try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch (e) {}
try { return new XMLHttpRequest(); } catch(e) {}
alert("XMLHttpRequest not supported");
return null;
}
function continueInit(modelName,modelId,sessionId,processId)
{
setTimeout("initWithModelIdAndSessionIdAndProcessId('"+modelName+"','"+modelId+"','"+sessionId+"','"+processId+"')",30);
}
function doMozResize(xml)
{
if (m_doLog) addLogMessage("doMozResize - calling reactOnResize()");
parent.reactOnResize();
}
function reactOnNewModel(pbufferedcall,presponse)
{
m_callcounter++;
CL();
if ( CL()== null ) return;
if (pbufferedcall == null || pbufferedcall == false)
{
if (m_processCasabacSynchronizeIfNecessary != true &&
m_processInvokeMethodInModel == true)
{
if (CL() != null && m_suppressClearAdapterStream != true)
CL().clearBufferedAdapterStreams(parent.location.href + " in reactOnNewModel");
}
}
m_newModelForAddFocusRequestor = true;
m_processInvokeMethodInModel = false;
m_beforeFirstReactOnNewModel = false;
m_bufferNeedsRefresh = false;
m_resetValiddationErrorsAndFlush = false;
if (m_doLog) addLogMessage("reactOnNewModel - started");
var startReactDate = new Date();
var nextLoop = true;
var errorMessage = null;
if (m_continueMethod != null)
{
try
{
var tempContinueMethod = m_continueMethod;
m_continueMethod = null;
tempContinueMethod();
}
catch (eexxcc) {}
}
if (presponse == null)
{
var vEMSG = cscformiframe.document.getElementById("ERRORMESSAGE");
if (vEMSG != null) errorMessage = vEMSG.value;
}
else
{
errorMessage = presponse.error;
}
if (errorMessage != null && errorMessage != "")
{
if (m_doLog) addLogMessage("reactOnNewModel - error message was passed from server");
if ( (errorMessage.indexOf("(1)") >= 0 &&
errorMessage.indexOf("(2)") >= 0 &&
errorMessage.indexOf("(3)") >= 0) || (errorMessage.indexOf("Session was already removed") >= 0))
{
window.top.location.href =  "../servlet/StartMessagePage?TYPE=SESSIONTIMEOUT";
status = "";
return;
}
else if (errorMessage.indexOf("ProcessNotAvailableError") >= 0)
{
try
{
addLogMessage("reactOnNewModel - Suppressed ProcessNotAvailableError");
switchToDisplayPAGE();
}
catch (eexxcc) {}
status = "";
return;
}
else if (errorMessage.indexOf("MAXIMUM NUMBER OF PARALLEL SESSIONS WAS REACHED.") >= 0)
{
parent.location.href = "../HTMLBasedGUI/general/toomanysessions.html";
alert("Number of parallel sessions is reached.");
return;
}
else
{
alert("ERROR IN APPLICATION:\n\n" + errorMessage);
switchToDisplayPAGE();
status = "";
return;
}
}
var stamp = cscformiframe.document.getElementById("STAMP").value;
if (m_lastStamp != undefined &&
m_lastStamp != "INIT" &&
stamp != undefined &&
stamp != "INIT")
{
var i1 = m_lastStamp * (-1) * (-1);
var i2 = stamp * (-1) * (-1);
if (i1 > i2)
{
if ( getPropertyValue("cISAddons.reloadpageonbackbutton") == "true" ) {
alert("Warning - Your session is no longer synchronized with the server. This is the result of one of the following\n\n" +
"(1) Most Likely Cause - You have used your browsers back button - which is not permitted in order to keep the application session consistent.\n" +
"(2) Your Server has been restarted - please contact your System Administrator for more information.\n" +
"(3) There is a error in your server configuration - please contact your System Administrator if this message persists.\n\n" +
"After pressing 'Ok' your session will be synchronized with the server."
);
parentLocationReload();
}
else {
window.top.location.replace("../servlet/StartMessagePage?TYPE=BACKBUTTONPRESSED");
}
status = "";
return;
}
}
m_lastStamp = stamp;
try
{
if ( unloadINTPOPUP ) unloadINTPOPUP();
}
catch(ex) {}
var xml = null;
if (presponse != null)
{
xml = presponse.xml;
if (xml.indexOf(m_cre1) >= 0) xml = xml.replace(m_re1,"\b");
if (xml.indexOf(m_cre2) >= 0) xml = xml.replace(m_re2,"\t");
if (xml.indexOf(m_cre3) >= 0) xml = xml.replace(m_re3,"\n");
if (xml.indexOf(m_cre4) >= 0) xml = xml.replace(m_re4,"\f");
if (xml.indexOf(m_cre5) >= 0) xml = xml.replace(m_re5,"\r");
if (xml.indexOf(m_cre6) >= 0) xml = xml.replace(m_re6,"&");
if (xml.indexOf(m_cre35) >= 0) xml = xml.replace(m_re35,"<");
if (xml.indexOf(m_cre36) >= 0) xml = xml.replace(m_re36,">");
if (m_doLog) addLogMessage("reactOnNewModel - convert special characters - end");
}
else if (pbufferedcall == null || pbufferedcall == false)
{
if (m_doLog) addLogMessage("reactOnNewModel - convert special characters - start");
xml = cscformiframe.document.getElementById("XML").value;
if (xml.indexOf(m_cre1) >= 0) xml = xml.replace(m_re1,"\b");
if (xml.indexOf(m_cre2) >= 0) xml = xml.replace(m_re2,"\t");
if (xml.indexOf(m_cre3) >= 0) xml = xml.replace(m_re3,"\n");
if (xml.indexOf(m_cre4) >= 0) xml = xml.replace(m_re4,"\f");
if (xml.indexOf(m_cre5) >= 0) xml = xml.replace(m_re5,"\r");
if (xml.indexOf(m_cre6) >= 0) xml = xml.replace(m_re6,"&");
if (xml.indexOf(m_cre35) >= 0) xml = xml.replace(m_re35,"<");
if (xml.indexOf(m_cre36) >= 0) xml = xml.replace(m_re36,">");
if (m_doLog) addLogMessage("reactOnNewModel - convert special characters - end");
}
else
{
xml = m_bufferedxml;
m_bufferedxml = null;
}
m_cscformOccupied = false;
if (xml == null || xml.length == 0)
{
switchToDisplayPAGE();
status = "";
return;
}
if (m_doLog) addLogMessage("reactOnNewModel - transfer model into datastructure - start");
var transferExRaised = transferXMLIntoModel(xml);
if (m_doLog) addLogMessage("reactOnNewModel - transfer model into datastructure - end");
if(transferExRaised == true)
{
if (m_doLog) addLogMessage("reactOnNewModel - transfer model into datastructure - have found an unsupported char! \n XML: " + xml);
switchToDisplayPAGE();
status = "";
return;
}
var vInterim;
vInterim = getPropertyValue("dateDisplay");
if (vInterim != null && vInterim != "") m_dateDisplay = vInterim;
vInterim = getPropertyValue("fdiw");
if (vInterim != null && vInterim != "") m_americanStyle = vInterim;
vInterim = getPropertyValue("timeDisplay");
if (vInterim != null && vInterim != "") m_timeDisplay = vInterim;
vInterim = getPropertyValue("decimalSeparator");
if (vInterim != null && vInterim != "") m_decimalSeparator = vInterim;
m_1000Separator = getPropertyValue("cISAddons.suppress1000Sep");
vInterim = getPropertyValue("language");
if (vInterim != null && vInterim != "") m_language = vInterim;
vInterim = getPropertyValue("hotKeyCode");
if (vInterim != null && vInterim != "") m_hotKeyCode = vInterim;
vInterim = getPropertyValue("cISAddons.dir");
if (vInterim != null && vInterim != "") m_direction = vInterim;
if (m_firstModel == true)
{
if (m_doLog) addLogMessage("reactOnNewModel - fill textid spans - start");
parent.fillTextIdSpans();
if (m_doLog) addLogMessage("reactOnNewModel - fill textid spans - end");
}
var vStyle = getPropertyValue('style');
parent.parent.CasaSTYLESHEET = vStyle;
if (vStyle != null && vStyle != "" && m_parentparent.CasaSessionSTYLESHEET != null) m_parentparent.CasaSessionSTYLESHEET = vStyle;
var vStyleSheet = m_parentdocument.getElementById('casabacstylesheet');
if (parent.CASAstylesheetfile == null &&
m_parentparent.CasaSTYLESHEET != null &&
m_parentparent.CasaSTYLESHEET != "")
{
if (vStyleSheet.href.substring(0, 4) != "http")
{
if (vStyleSheet.href != m_parentparent.CasaSTYLESHEET)
vStyleSheet.href = m_parentparent.CasaSTYLESHEET;
}
else
{
hrefSheetName = vStyleSheet.href;
if (vStyleSheet.href.lastIndexOf("/") > 0)
hrefSheetName = vStyleSheet.href.substring(vStyleSheet.href.lastIndexOf("/")-0+1, vStyleSheet.href.length);
ppSheetName = m_parentparent.CasaSTYLESHEET;
if (ppSheetName.lastIndexOf("/") > 0)
ppSheetName = ppSheetName.substring(ppSheetName.lastIndexOf("/")-0+1, ppSheetName.length);
if (hrefSheetName != ppSheetName)
vStyleSheet.href = m_parentparent.CasaSTYLESHEET;
}
}
executeFormulas();
var ulb = getPropertyValue("cISAddons.ulb");
if (ulb != null) m_parentparent.updateULB(ulb);
try
{
var ncu = getPropertyValue("cISAddons.noControlUpdate");
if(ncu != "true")
{
if (m_doLog) addLogMessage("reactOnNewModel - informing listeners");
updateModelListeners(xml);
var vBrowserTitle = getPropertyValue("cISAddons.browserTitle");
if (m_parentparent.isPopupPage == true)
vBrowserTitle = CL().C_formatPopupTitle(vBrowserTitle);
if(vBrowserTitle != null && vBrowserTitle.length > 0)
{
try
{
top.document.title = vBrowserTitle;
}
catch (exxi)
{
}
}
var messType = getPropertyValue('messageType');
var messShortText = getPropertyValue('messageShortText');
CL().C_outputMessageSSW(m_parentparent.getCurrentSessionId(),m_parentparent.getCurrentProcessId(),messType,messShortText);
if (getPropertyValue("cISAddons.cisA1") != "false") CL().romuSB(this,messShortText,messType);
}
else
{
reactOnModelUpdatePAGE();
if (m_doLog) addLogMessage("reactOnNewModel - SKIPPING informing listeners - cisAddons.noControlUpdate is set");
}
if (m_doLog) addLogMessage("reactOnNewModel - informing listeners - finished");
var stdBefore = new Date();
try
{
if (getPropertyValue('cISAddons.lops') != "true")
switchToDisplayPAGE();
}
catch (eexxcc)
{
addLogMessage("Error when switching to display occurred");
addLogMessage("This error normally happens when back is pressed in the browser");
alert("Reloading page, reason (most likely): back-button pressed in browser");
parentLocationReload();
}
var stdEnd = new Date();
if ( parent.m_perfPageLoadEnd == null ) parent.m_perfPageLoadEnd = stdEnd;
if (m_doLog) addLogMessage("reactOnNewModel - Duration of switchToDisplay = " + (stdEnd.getTime()-stdBefore.getTime()));
if(ncu != "true")
{
upateSwitchToDisplayListerners(xml);
doMozResize(xml);
}
status = "";
var nextPopup = getPropertyValue('nextPopup');
var nextPopupId = getPropertyValue('nextPopupId');
var nextPopupModal = getPropertyValue('nextPopupModal');
var nextPopupFeatures = getPropertyValue('nextPopupFeatures');
var nextPopupTitle = getPropertyValue('nextPopupTitle');
var doOpenPopup = nextPopup != null && nextPopup != "null" && nextPopup != "";
if (doOpenPopup)
{
CL().reactOnOpenPopupCL(this);
if (nextPopupId == null) nextPopupId = "";
var nextPopupSessionId = getPropertyValue('nextPopupSessionId');
var nextPopupSubsessionId = getPropertyValue('nextPopupSubsessionId');
var nextPopupOnCloseMethod = getPropertyValue('nextPopupOnCloseMethod');
var nextPopupOnCloseProperty = getPropertyValue('nextPopupOnCloseProperty');
var nextPopupOnClosePropertyValue = getPropertyValue('nextPopupOnClosePropertyValue');
openPopupPAGE(nextPopup,nextPopupId,nextPopupModal,nextPopupFeatures,nextPopupTitle,nextPopupSessionId,nextPopupSubsessionId,nextPopupOnCloseMethod,nextPopupOnCloseProperty,nextPopupOnClosePropertyValue);
}
var favName = getPropertyValue("cISAddons.favName");
if (favName!=null && favName!="")
{
var favURL = getPropertyValue("cISAddons.favURL");
try
{
if (window.sidebar)window.sidebar.addPanel(favName, favURL, "");
else alert("Adding Favorites is not supported by your browser.");
}
catch(exc)
{
alert("Error when calling the \"Add To Favorites...\"-Popup with...\n"+
"Title = "+favName+"\n"+
"URL = "+favURL+"\n"+
exc.message);
}
}
try
{
var vCounter = 0;
while (true)
{
var vurl = getPropertyValue("frameMessages["+vCounter+"].frameURL");
var vtarget = getPropertyValue("frameMessages["+vCounter+"].frameTarget");
var vmethod = getPropertyValue("frameMessages["+vCounter+"].frameMethod");
if (vtarget == null) break;
if (m_doLog) addLogMessage("reactOnNewModel - frame communication "+vtarget+"/"+vmethod+"/"+vurl);
if (vmethod == "FRAMERESIZE") sizeTarget(vtarget,vurl);
else if (vtarget != null && (vtarget.substring(0,8) == "CASAOCC;" || vtarget.substring(0,8) == "CASASWI;"))
{
if (m_parentparent.isPopupPage) enqueueRefreshOccuranceOfAdapter(vtarget);
else refreshOccuranceOfAdapter(vtarget);
}
else if (vtarget != null && vtarget.substring(0,8) == "CASAFOC;") repointFocusInScreen(vtarget);
else if (vurl != null && vurl != "") setURLInTarget(vurl,vtarget);
else if (vmethod != null && vmethod != "") callMethodInTarget(vmethod,vtarget);
vCounter++;
}
var vurl = getPropertyValue("frameURL");
var vtarget = getPropertyValue("frameTarget");
if (vurl != null && vurl != "" && vtarget != null && vtarget != "")
setURLInTarget(vurl,vtarget);
}
catch (eexxcc) {}
try { if ( m_focusSETIN == null ); } catch (eset) { m_focusSETIN = undefined; }
try
{
var vRefreshParent = getPropertyValue("refreshParent");
if (vRefreshParent != null && vRefreshParent == "true")
{
if (m_parentparent != null &&
m_parentparent.parent != null &&
m_parentparent.parent.csciframe != null)
{
switchToDisplayPAGE();
try {
if (m_focusSETIN == null)
m_parentparent.parent.csciframe.m_focusSETIN = self;
else
{
m_parentparent.parent.csciframe.m_focusSETIN = m_focusSETIN;
m_focusSETIN = undefined;
}
}catch(eset){m_focusSETIN = undefined;}
m_parentparent.parent.m_blockIOByFlush = true;
m_parentparent.parent.csciframe.submitModel("submit");
status = "";
return;
}
if (m_parentparent != null &&
m_parentparent.parent != null &&
m_parentparent.parent.m_isCasabacMFPAGE == true &&
m_parentparent.parent.parent != null &&
m_parentparent.parent.parent.parent != null &&
m_parentparent.parent.parent.parent.csciframe != null)
{
switchToDisplayPAGE();
try{
if (m_focusSETIN == null)
m_parentparent.parent.parent.parent.csciframe.m_focusSETIN = self;
else
{
m_parentparent.parent.parent.parent.csciframe.m_focusSETIN = m_focusSETIN;
m_focusSETIN = undefined;
}
} catch (eset){m_focusSETIN = undefined;}
m_parentparent.parent.parent.parent.csciframe.submitModel("submit");
status = "";
return;
}
if (parent != null &&
m_parentparent != null &&
m_parentparent.leaveToPage != null)
{
switchToDisplayPAGE();
m_parentparent.window.location.href = m_parentparent.leaveToPage;
status = "";
return;
}
if(CL().CASA_popupopenersvalues != null &&
CL().CASA_popupopenersvalues.length  > 0 &&
CL().CASA_popupopenersvalues[CL().CASA_popupopenersvalues.length - 1].csciframe != null )
{
var vPopupFrame = CL().CASA_popupopenersvalues[CL().CASA_popupopenersvalues.length - 1].csciframe;
switchToDisplayPAGE();
try{
if (m_focusSETIN == null)
vPopupFrame.m_focusSETIN = self;
else
{
vPopupFrame.m_focusSETIN = m_focusSETIN;
m_focusSETIN = undefined;
}
} catch (ppex) { m_focusSETIN=undefined;vPopupFrame.m_focusSETIN = self;}
vPopupFrame.m_blockIOByFlush = true;
if(vPopupFrame.parent)	vPopupFrame.parent.m_blockIOByFlush = true;
vPopupFrame.submitModel("submit");
status = "";
return;
}
if (parent != null &&
m_parentparent != null)
{
if (!(m_parentparent.isPopupPage == true ||
m_parentparent.isPopupPage == "true"))
{
switchToDisplayPAGE();
m_parentparent.window.location.href = "../../HTMLBasedGUI/general/aboutBlank.html";
status = "";
return;
}
else
{
}
}
}
}
catch (eexxcc) { m_firstModel = false; }
m_firstModel = false;
var vfpl = getPropertyValue("forcePageReload");
if (vfpl == "true")
{
setPropertyValue("forcePageReload",false,true);
CL().clearBufferedAdapterStream(CL().buildBufferAccesKey(m_sessionId,m_processId,m_modelId,m_modelName,findPseudoURL()));
parentLocationReload();
}
if ( !doOpenPopup ) {
if (m_doLog) addLogMessage("reactOnNewModel - Setting focus");
var ft = 0;
if ( m_resizeTimeout == null && m_focusTimeout == null ) ft = 10;
else if ( m_focusTimeout == null ) ft = 200;
if ( ft > 0 ) parent.window.requestAnimationFrame(this.doSetFocus);
}
var endReactDate = new Date();
if ( doOpenPopup && parent.m_perfPageFocusEnd == null ) parent.m_perfPageFocusEnd = endReactDate;
if (m_doLog) addLogMessage("reactOnNewModel - Duration of client update = " + (endReactDate.getTime()-startReactDate.getTime()));
if (m_doLog) addLogMessage("reactOnNewModel - finished");
}
catch (fxx)
{
if (m_doLog) addLogMessage("reactOnNewModel - exception caught" + fxx);
}
}
function doSetFocus(timestamp)
{
pointFocus();
try{
if (m_focusSETIN == null)
{
if ( parent.m_perfPageFocusEnd == null ) parent.m_perfPageFocusEnd = new Date();
status = "";
}
else
{
try { m_focusSETIN.pointFocus(); } catch (eexxcc) {}
m_focusSETIN = undefined;
status = "";
}
} catch(eset){m_focusSETIN=undefined;}
}
function executeFormulas(cc)
{
try { executeFORMULA(cc); } catch (e) { }
}
function getSCPBufferPriortity()
{
return getPropertyValue("cISAddons.scpBufferPriority");
}
function parentLocationReload()
{
var ssrc = parent.location.href;
parent.location.replace(ssrc);
}
function updateModelListenersS()
{
updateModelListeners(null);
m_focusRequestors = null;
}
function updateModelListenersScroll(xml)
{
for(var sIndex =0; sIndex < m_modelListenersSCROLL.length;sIndex++)
{
m_modelListenersSCROLL[sIndex](xml);
}
}
function updateModelListeners(xml)
{
m_continueUpdateModelListeners = true;
addLogMessage("updateModelListeners - processing statusproplisteners");
for (var id in m_statuspropListeners)
{
try
{
var s = getPropertyValue(id);
if (s == "ERROR" || s == "FOCUS" || s=="FOCUS_NO_SELECT")
{
vls = m_statuspropListeners[id];
for(iiii=0;iiii<vls.length;iiii++)
{
if (vls[iiii].CASA_displayprop != null)
{
var d = getPropertyValue(vls[iiii].CASA_displayprop);
s = applyDisplayProperty(d, s);
}
if(s == "ERROR" || s == "FOCUS")
{
addFocusRequestor(vls[iiii]);
}
else if (s == "FOCUS_NO_SELECT")
{
addActiveElementRequestor(vls[iiii]);
}
}
}
}
catch (exc) {}
}
var vmaxii = m_modelListeners.length;
addLogMessage("updateModelListeners - #modellisteners: " + m_modelListeners.length);
for (var ii=0; ii<m_modelListeners.length; ii++)
{
try
{
var vbefore = new Date();
m_modelListeners[ii](xml);
var vend = new Date();
}
catch (exc) {}
if (m_continueUpdateModelListeners == false) return;
}
for (var id in m_propertyListenersTBP)
{
try
{
var vbefore = new Date();
m_propertyListenersTBP[id](xml);
var vend = new Date();
if (m_doLog) addLogMessage("updateModelListeners - propertyListenersTBP["+id+"] " + (vend.getTime()-vbefore.getTime()));
}
catch (exc) {}
}
m_propertyListenersTBP = [];
}
function transferXMLIntoModel(xml)
{
var vPropStack = [];
var vAbbrs = [];
var vPropStackTop = 0;
var vPropString = "";
if (m_properties == null)
{
m_properties = [];
m_model = [];
addLogMessage("transferXMLIntoModel - m_properties was null");
reapplyPropertyListeners("transferXMLIntoModel");
}
var transferExRaised = false;
var length = xml.length;
var i=0;
var pCount = 0;
while (true)
{
if (i >= length) { break; }
vcurrentchar = xml.charAt(i);
if (vcurrentchar == "p" || vcurrentchar == "q" || vcurrentchar == "z" || vcurrentchar == "w")
{
pCount++;
var pvallength = 5;
if (vcurrentchar == "z") { pvallength = 10; vcurrentchar = "p"; }
else if (vcurrentchar == "w") { pvallength = 10; vcurrentchar = "q"; }
nLength = xml.substr(i+1,2) * 1;
vLength = xml.substr(i+3,pvallength) * 1;
i += (3 + pvallength);
var vName = xml.substr(i,nLength);
if (vcurrentchar == "q")
{
vNameBefore = vName;
vName = vAbbrs[vName];
}
vName = vPropString + vName;
i += nLength;
var vValue = xml.substr(i,vLength);
i = i + vLength;
var property = m_model[vName];
if (property == null)
{
property = new Object();
property.isNormalField = true;
property.name = vName;
property.value = vValue;
property.isChanged = false;
property.isKilled = false;
m_properties[m_properties.length] = property;
m_model[vName] = property;
addPropertyListenerTBP(property);
}
else
{
property.value = vValue;
property.isChanged = false;
property.isKilled = false;
addPropertyListenerTBP(property);
}
}
else if (vcurrentchar == "s")
{
var abbr = new Object();
nLength1 = xml.substr(i+1,1) * 1;
nLength2 = xml.substr(i+2,2) * 1;
i += 4;
var vAbbr = xml.substr(i,nLength1);
i += nLength1;
var vAbPr = xml.substr(i,nLength2);
i += nLength2;
vAbbrs[vAbbr] = vAbPr;
}
else if (vcurrentchar == "x")
{
nLength = xml.substr(i+1,2) * 1;
i += 3;
m_modelDeltaId = xml.substr(i,nLength);
i += nLength;
}
else if (vcurrentchar == "b")
{
nLength = xml.substr(i+1,2) * 1;
i += 3;
vPropStack[vPropStackTop] = xml.substr(i,nLength);
vPropStackTop++;
vPropString = "";
for (var ijk = 0; ijk<vPropStackTop; ijk++)
{
vPropString += vPropStack[ijk];
vPropString += ".";
}
i += nLength;
}
else if (vcurrentchar == "c")
{
i += 1;
vPropStackTop--;
vPropString = "";
for (var ijk = 0; ijk<vPropStackTop; ijk++)
{
vPropString += vPropStack[ijk];
vPropString += ".";
}
}
else if (vcurrentchar == "k")
{
nLength = xml.substr(i+1,2) * 1;
i += 3;
var vName = xml.substr(i,nLength);
var vConvertedName = vName;
i += nLength;
var property = m_model[vConvertedName];
if (property != null)
{
property.isKilled = true;
property.isChanged = false;
addPropertyListenerTBP(property);
}
m_killedItems++;
}
else if (vcurrentchar == "l")
{
addLogMessage("transferXMLIntoModel - model needs to be killed!");
m_properties = [];
m_model = [];
reapplyPropertyListeners("vcurrentchar == l");
i++;
}
else if (vcurrentchar == "a")
{
var vlengths = xml.substr(i+1,2) * 1;
var vlengthss = xml.substr(i+3,2) * 1;
var vlengthpid = xml.substr(i+5,2) * 1;
var vlengthcn = xml.substr(i+7,2) * 1;
var vlengthpg = xml.substr(i+9,2) * 1;
var vlengthxml = xml.substr(i+11,8) * 1;
i += 19;
var vs = xml.substr(i,vlengths); i += vlengths;
var vss = xml.substr(i,vlengthss); i+= vlengthss;
var vpid = xml.substr(i,vlengthpid); i+= vlengthpid;
var vcn = xml.substr(i,vlengthcn); i += vlengthcn;
var vpg = xml.substr(i,vlengthpg); i += vlengthpg;
var vxml = xml.substr(i,vlengthxml); i+= vlengthxml;
var vbuffkey = CL().buildBufferAccesKey(vs,vss,vpid,vcn,vpg);
CL().bufferAdapterStream(vbuffkey,vxml);
}
else
{
if(checkCharSequence(xml.substr(0,20)))
{
transferExRaised = true;
}
else
{
alert("Previous property: " + vName);
alert(xml.substr(i,i+10));
alert("This should never happen: " + xml.charAt(i) + "\nat" + i + "\n\n" + xml);
}
break;
}
}
if (m_killedItems > 100)
{
var newModel = [];
var newProps = [];
for (var propName in m_model)
{
var tempObject = m_model[propName];
if (tempObject != null &&
(tempObject.isKilled == false || tempObject.listeners != null))
{
newModel[propName] = m_model[propName];
newProps[newProps.length] = tempObject;
}
}
m_model = newModel;
m_properties = newProps;
m_killedItems = 0;
}
return transferExRaised;
}
function checkCharSequence(pSeq)
{
var vMatch  = new RegExp("^[a-z]{1}[0-9]{19}$").exec(pSeq);
if (vMatch == null) return false;
var vTemp = ""+vMatch[0];
return (vMatch.index == 0 && vTemp.length == pSeq.length);
}
function normalizeItemValuePair(item, value)
{
var newValue ="";
var splitRes = value.split(" ");
var subVal = "";
var stringArray = ["width", "height", "font-size", "padding", "margin", "top", "left", "right", "bottom", "border",
"border-top", "border-left", "border-right", "border-bottom", "margin-top", "margin-left", "margin-right", "margin-bottom", "padding-top", "padding-left",
"padding-right", "padding-bottom", "text-indent", "background-position", "box-shadow", "text-shadow", "line-height", "letter-spacing", "max-height", "min-height",
"max-width", "min-width"];
if (stringArray.indexOf(item)>=0)
{
var idx;
for(idx = 0; idx < splitRes.length; idx++)
{
subVal = splitRes[idx];
if (idx>0) newValue+=" ";
newValue +=C_adjustUnits(subVal);
}
}
else
{
newValue=value;
}
return  item + ":" + newValue;
}
function getStylePropertyValue (name)
{
var propValue = getPropertyValue(name);
if (propValue != null)
{
var newValue ="";
var splitRes = propValue.split(";");
var i;
for(i = 0; i < splitRes.length; i++)
{
var keyValPair = splitRes[i].split(":");
if (i>0) newValue+=";";
if (keyValPair.length==2)
{
newValue += normalizeItemValuePair (keyValPair[0].trim(), keyValPair[1].trim());
}
else
{
newValue += splitRes[i];
}
}
}
return newValue;
}
function getPropertyValue(name)
{
if (name == null) return null;
var propertyName = name;
if (m_model == null) return;
property = m_model[propertyName];
if (property == null) return null;
if (property.isKilled == true) return null;
return property.value;
}
function setPropertyIsKilled(name, isKilledValue)
{
if (isKilledValue == null) isKilledValue = false;
if (m_properties == null) return;
if (m_model == null) return;
property = m_model[name];
if (property != null)
{
property.isKilled = isKilledValue;
}
}
function setPropertyValue(name,value,nodirtyflag)
{
if (value == null) value = "";
value = "" + value;
if (m_properties == null)
{
m_properties = [];
m_model = [];
}
property = m_model[name];
if (property != null)
{
property.value = value;
if (nodirtyflag != true)
{
property.isChanged = true;
addPropertyListenerTBP(property);
}
}
else
{
property = new Object();
property.isNormalField = true;
property.name = name;
property.value = value;
if (nodirtyflag != true) property.isChanged = true;
m_properties[m_properties.length] = property;
m_model[name] = property;
}
if (m_beforeFirstReactOnNewModel == true)
m_internalProperties[property.name] = true;
else
{
handleUserInputProp(name);
}
if (m_internalProperties[name] != true)
m_bufferNeedsRefresh = true;
}
function handleUserInputProp(propertyName)
{
if (m_uiprop == null)
{
if (parent.m_userinputprop != null)
{
m_uiprop = parent.m_userinputprop;
m_uipropframe = this;
}
else
{
try
{
if (m_parentparent.parent.m_userinputprop != null)
{
m_uiprop = m_parentparent.parent.m_userinputprop;
m_uipropframe = m_parentparent.parent.C;
}
else
{
m_uiprop = "";
}
}
catch (uxxx)
{
m_uiprop = "";
}
}
}
if (m_uiprop != "")
{
if (m_uipropframe.getPropertyValue(m_uiprop) != "true" &&
propertyName.indexOf("pagePixel") != 0 &&
propertyName.indexOf("repeatIndex") != 0 &&
propertyName.indexOf("cISAddons.focus") != 0 &&
m_uiprop != propertyName)
{
m_uipropframe.setPropertyValue(m_uiprop, "true");
m_uipropframe.updateModelListeners(null);
}
}
}
function removePropertyValue(name)
{
if(m_model[name] != null)
m_model[name] = null;
}
function blockActivities()
{
m_noactivityuntil = new Date();
}
function checkIfNoActivities(pDate)
{
if (m_noactivityuntil==null)return false;
if (pDate.valueOf() < (m_noactivityuntil.valueOf()+250)) return true;
return false;
}
function pushContinueMethod()
{
m_pushedContinueMethod = m_continueMethod;
}
function popContinueMethod()
{
m_continueMethod = m_pushedContinueMethod;
}
var m_submitModelFlushCalled;
function submitModelFlush(command,withClearingBuffer)
{
if (m_lastServerFetch != null &&
m_submitModelFlushCalled != null &&
m_lastServerFetch.getTime() >= m_submitModelFlushCalled.getTime())
{
addLogMessage("submitModelFlush(): Already transferred!");
return;
}
else
{
addLogMessage("submitModelFlush(): Not yet transferred!");
submitModel(command,withClearingBuffer);
}
}
function submitModel(command,withClearingBuffer)
{
var vNoResponse = getPropertyValue("cISAddons.noResponse");
if (vNoResponse == "true")
{
addLogMessage("submitModel(): no submit - adapter sends noResponse==true");
return;
}
if (parent.m_blockIOByFlush == true)
{
addLogMessage("submitModel(): parent.m_blockIOByFlush = " + parent.m_blockIOByFlush);
addLogMessage("submitModel(): Processing Mozilla Flush Management!");
parent.m_blockIOByFlush = false;
m_submitModelFlushCalled = new Date();
setTimeout("submitModelFlush(\""+command+"\","+withClearingBuffer+")",100);
return;
}
if (checkAllValidations() == false) { parent.m_blockIOByFlush = false; return;}
if (m_sessionId == null)
{
addLogMessage("submitModel - page not initialized yet, submit suppressed"+
"\nThis may happen in multi frame pages when not carefully paying attention to order of building up frame content"+
"\nProcessing will be interrupted for this page.");
return;
}
if (m_bufferNeedsRefresh == true || withClearingBuffer == true)
{
CL().clearBufferedAdapterStream(CL().buildBufferAccesKey(m_sessionId,m_processId,m_modelId,m_modelName,findPseudoURL()));
}
if (checkIO() == false)
{
if (m_doLog) addLogMessage("submitModel - ended, page just blocked");
return;
}
switchToOccupiedPAGE();
pushContinueMethod();
synchronizeInnerPagesAndContinue(submitModelContinue);
}
function submitModelContinue()
{
popContinueMethod();
invokeDCListeners();
var vxml = buildFirstTag("m","") +
buildXMLFromModel("submitModel");
fetchModelFromServer(vxml);
}
function refreshModel()
{
addLogMessage("refreshModel - started");
if (this.m_refreshPopupParams != null)
{
setPropertyValue("cISAddons.closedPopupAdapterName",m_refreshPopupParams.modelName);
setPropertyValue("cISAddons.closedPopupAdapterId",m_refreshPopupParams.modelId);
m_refreshPopupParams = null;
}
if (checkIO() == false)
{
addLogMessage("refreshModel - need to repeat page or inner page just blocked");
setTimeout("refreshModel();",50);
return;
}
switchToOccupiedPAGE();
var vxml = buildFirstTag("e","") +
buildXMLFromModel("refreshModel");
addLogMessage("refreshModel - sending " + vxml);
m_continueUpdateModelListeners = false;
fetchModelFromServer(vxml);
}
function invokeMethodInModel(methodName,withoutClearingBuffer, isFlushFieldMethod)
{
if ( methodName == "casabacSynchronizeIfNecessary" && this.m_modelName != null &&
(this.m_modelName.indexOf("NatLogon") > 0 || this.m_modelName.indexOf("NatDisconnect") >0)  ) return;
if (CL().m_flushInProgress != null)
{
if(((new Date()).getTime() - CL().m_flushInProgress) > 200)
{
CL().m_flushInProgress = null;
}
if (isFlushFieldMethod != true)
{
setTimeout("invokeMethodInModel(\""+methodName+"\", \""+withoutClearingBuffer+"\")",20);
return;
}
}
var vNoResponse = getPropertyValue("cISAddons.noResponse");
if (vNoResponse == "true")
{
addLogMessage("invokeMethodInModel(): no invoke - adapter sends noResponse==true");
return;
}
if (withoutClearingBuffer != true)
CL().clearBufferedAdapterStream(CL().buildBufferAccesKey(m_sessionId,m_processId,m_modelId,m_modelName,findPseudoURL()));
if (methodName != "casabacSynchronizeIfNecessary" &&
checkAllValidations(false) == false)
{
return;
}
if (methodName == "xyzzyxxyzzyxxyzzyx_cishelp")
m_firstFocusCall = true;
if (m_doLog) addLogMessage("invokeMethodInModel - started ("+methodName+")");
if (checkIO() == false)
{
if (m_doLog) addLogMessage("invokeMethod - ended, page just blocked");
return;
}
var now = new Date();
if (checkIfNoActivities(now))
{
addLogMessage("invokeMethodInModel - page is blocked (Reason: noactivityuntil was set)");
return;
}
try { if (m_islogonform) for (var i=0; i<m_FieldsArray.length; i++) transferChangeFIELD(m_FieldsArray[i],false); } catch(e) {}
switchToOccupiedPAGE();
CL().C_flushFocusInfo(this, isFlushFieldMethod);
m_bufferedMethodName = methodName;
pushContinueMethod();
synchronizeInnerPagesAndContinue(invokeMethodInModelContinue);
}
function invokeMethodInModelContinue()
{
try
{
var url = parent.window.location.href;
if ((url.indexOf("com.softwareag.cis.workplace.MFWorkplace") >= 0 ||
url.indexOf("com.softwareag.cis.workplace.MFActivities") >= 0 ||
url.indexOf("PluggableUI/Taskbar") >= 0) &&
m_bufferedMethodName != "xxxxxxxxxx")
{
callMethodInTarget("casabacSynchronizeIfNecessary","CONTENT");
}
}
catch (exc)
{
}
if (m_doLog) addLogMessage("invokeMethodInModelContinue - started");
popContinueMethod();
invokeDCListeners();
m_processCasabacSynchronizeIfNecessary = false;
if (m_bufferedMethodName != null &&
m_bufferedMethodName.indexOf("xxxxxxx") < 0) m_processInvokeMethodInModel = true;
if (m_bufferedMethodName == "casabacSynchronizeIfNecessary")
{
var unSubmittedChangeExists = false;
var vmaxi = m_properties.length;
for (var i=0; i<vmaxi; i++)
{
if (m_properties[i].isChanged == true &&
!(m_internalProperties[m_properties[i].name] == true) &&
m_properties[i].name != null &&
m_properties[i].name.indexOf("rowCount") < 0 &&
m_properties[i].name.indexOf("rowCount") < 0)
{
unSubmittedChangeExists = true;
break;
}
}
if (unSubmittedChangeExists == false)
{
switchToDisplayPAGE();
return;
}
else
{
m_processCasabacSynchronizeIfNecessary = true;
}
}
var vxml;
if (m_bufferedMethodName != "casabacSynchronizeIfNecessary")
vxml = buildFirstTag("v",m_bufferedMethodName) +
buildXMLFromModel("invokeMethodInModel");
else
var vxml = buildFirstTag("m","") +
buildXMLFromModel("submitModel");
m_bufferedMethodName = "inittini";
if (m_doLog) addLogMessage("invokeMethodInModelContinue - submitting");
fetchModelFromServer(vxml);
}
function buildXMLFromModel(caller)
{
if (m_properties == null) return "";
var vsb = [];
var vmaxi = m_properties.length;
for (var i=0; i<vmaxi; i++)
{
vprop = m_properties[i];
if (vprop == null) continue;
if (vprop.isChanged == true)
{
vName = vprop.name;
vValue = vprop.value;
if (vName == null) { continue; }
if (vValue == null) { continue; }
if (vValue == null || vValue.length < 100000)
{
vsb.push("p" + detLength(vName,2) + detLength(vValue,5) + vName + vValue);
}
else
{
vsb.push("z" + detLength(vName,2) + detLength(vValue,10) + vName + vValue);
}
vprop.isChanged = false;
}
}
vsb.push("x" + detLength(m_modelDeltaId,2) + m_modelDeltaId);
var s = vsb.join("");
return s;
}
function registerListener(listener)
{
if (parent.m_roi_firstusage == false) return;
if (listener == null) return;
m_modelListeners.push(listener);
}
function registerPropertyListener(listener,propertyName,listenerId,isreregistration)
{
if (isreregistration == false && parent.m_roi_firstusage == false) return;
if (propertyName == null) return;
if (propertyName == "") return;
if (m_properties == null)
{
m_properties = [];
m_model = [];
}
property = m_model[propertyName];
if (property == null)
{
property = new Object();
property.isNormalField = true;
property.name = propertyName;
property.value = null;
m_properties[m_properties.length] = property;
m_model[propertyName] = property;
}
if (property.listeners == null)
property.listeners = [];
property.listeners[listenerId] = listener;
var o = new Object();
o.listener = listener;
o.propertyName = propertyName;
o.listenerId = listenerId;
if (isreregistration != true)
{
m_propertyListeners.push(o);
}
m_propertyListenersTBP[listenerId] = listener;
}
function registerStatusPropertyListener(listener,propertyName,listenerId, cc)
{
if (parent.m_roi_firstusage == false) return;
registerPropertyListener(listener,propertyName,listenerId,false);
if (m_statuspropListeners[propertyName] == null)
m_statuspropListeners[propertyName] = [];
m_statuspropListeners[propertyName].push(cc);
}
function registerSwitchToDisplayListener(listenermethod, param, param2)
{
if (parent.CasaPAGE.style.display != "none")
return;
var o = new Object();
o.listenermethod = listenermethod;
o.param = param;
o.param2 = param2;
m_switchToDisplayListeners.push(o);
}
function upateSwitchToDisplayListerners(xml)
{
for (var stdlcounter = 0; stdlcounter < m_switchToDisplayListeners.length; stdlcounter++)
{
var stdlistener = m_switchToDisplayListeners[stdlcounter];
if (stdlistener.param2 != null)
{
stdlistener.listenermethod(stdlistener.param,stdlistener.param2);
}
else stdlistener.listenermethod(stdlistener.param);
}
m_switchToDisplayListeners = [];
}
function registerSwitchToOccupiedListener(listenermethod, param)
{
if (parent.m_roi_firstusage == false) return;
var o = new Object();
o.listenermethod = listenermethod;
o.param = param;
m_switchToOccupiedListeners.push(o);
}
function reapplyPropertyListeners(comment)
{
addLogMessage("reapplyPropertyListeners was called: " + m_propertyListeners.length);
for (var i=0; i<m_propertyListeners.length; i++)
{
var o = m_propertyListeners[i];
registerPropertyListener(o.listener,o.propertyName,o.listenerId,true);
}
}
function addPropertyListenerTBP(property)
{
var pls = property.listeners;
if (pls == null) property.listeners = [];
for (var id in pls)
m_propertyListenersTBP[id] = pls[id];
}
function registerListenerAsFirst(listener)
{
if (parent.m_roi_firstusage == false) return;
index = m_modelListeners.length;
var i;
for (var i=index; i>0; i--)
m_modelListeners[i] = m_modelListeners[i-1];
m_modelListeners[0] = listener;
}
function registerListenerAsLast(listener)
{
if (parent.m_roi_firstusage == false) return;
m_modelListenersLast.push(listener);
}
function registerListenerforSCROLLBAR(listener)
{
m_modelListenersSCROLL.push(listener);
}
function removeListener(containedstring)
{
for (var i=0; i<m_modelListeners.length; i++)
{
var code = "" + m_modelListeners[i];
if (code.indexOf(containedstring) >= 0)
{
m_modelListeners.splice(i,1);
break;
}
}
}
function removePropertyListener(listenerId)
{
var propertyListeners = [];
var propertyListenersTBP = [];
var propertyNames = [];
for (var i=0; i<m_propertyListeners.length; i++)
{
var o = m_propertyListeners[i];
if (o.listenerId != listenerId)
{
propertyListeners.push(o);
}
else
{
propertyNames.push(o.propertyName);
}
}
m_propertyListeners = propertyListeners;
for (var i=0; i<propertyNames.length; i++)
{
var property = m_model[propertyNames[i]];
if (property == null) continue;
var listeners = new Object();
for (var id in property.listeners)
{
if (id != listenerId)
listeners[id] = property.listeners[id];
}
property.listeners = listeners;
}
for (var id in m_propertyListenersTBP)
{
if(id != listenerId)
propertyListenersTBP[id] = m_propertyListenersTBP[id];
}
m_propertyListenersTBP = propertyListenersTBP;
}
function registerDCListener(pl)
{
m_dcListeners.push(pl);
}
function invokeDCListeners()
{
for (var i=0; i<m_dcListeners.length; i++)
m_dcListeners[i]();
}
function removeProcess()
{
alert("should not be called (csc.removeProcess)");
}
function submitConnector(sessid, myXml, vpim, stamp)
{
var xHttpReq;
var params = "SESSIONID=" + sessid + "&XML=" + myXml + "&PAGEINITPARAM="+vpim + "&STAMP=" + stamp;
if(typeof ActiveXObject == 'undefined'){
xHttpReq = new XMLHttpRequest();
}
else{
xHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
}
try{
xHttpReq.open("POST", "../servlet/Connector", false);
xHttpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xHttpReq.setRequestHeader("Content-length", params.length);
xHttpReq.send(params);
}
catch(eexxcc){}
return true;
}
function removeSession()
{
try
{
var removeStr = buildFirstTag("s","") +
buildXMLFromModel("removeSession");
var vpim = " ";
var stamp = cscformiframe.document.getElementById("STAMP").value;
submitConnector (m_sessionId, removeStr, vpim, stamp);
}
catch (eexxcc) {}
}
var mm_convertValue = null;
function convertValue(value,dataType,decimalDigitsFloat)
{
if (mm_convertValue == null) mm_convertValue = CL().C_convertValue;
return mm_convertValue.call(this, value,dataType,decimalDigitsFloat);
}
var mm_convertYYYYMMDDIntoDisplayString = null;
function convertYYYYMMDDIntoDisplayString(yyyymmdd)
{
if (mm_convertYYYYMMDDIntoDisplayString == null) mm_convertYYYYMMDDIntoDisplayString = CL().C_convertYYYYMMDDIntoDisplayString;
return mm_convertYYYYMMDDIntoDisplayString.call(this, yyyymmdd);
}
var mm_convertDisplayStringIntoYYYYMMDD = null;
function convertDisplayStringIntoYYYYMMDD(value)
{
if (mm_convertDisplayStringIntoYYYYMMDD == null)
{
if (getPropertyValue("cISAddons.completedateinput") == "false")
mm_convertDisplayStringIntoYYYYMMDD = CL().C_convertDisplayStringIntoYYYYMMDD_2;
else
mm_convertDisplayStringIntoYYYYMMDD = CL().C_convertDisplayStringIntoYYYYMMDD;
}
return mm_convertDisplayStringIntoYYYYMMDD.call(this, value);
}
var mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString = null;
function convertYYYYMMDDHHMMSSMMMIntoDisplayString(yyyymmddhhmmssmmm)
{
if (mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString == null) mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString = CL().C_convertYYYYMMDDHHMMSSMMMIntoDisplayString;
return mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString.call(this, yyyymmddhhmmssmmm, "HHMMSSMMM");
}
function convertYYYYMMDDHHMMSSIntoDisplayString(yyyymmddhhmmss)
{
if (mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString == null) mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString = CL().C_convertYYYYMMDDHHMMSSMMMIntoDisplayString;
return mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString.call(this, yyyymmddhhmmss, "HHMMSS");
}
function convertYYYYMMDDHHMMIntoDisplayString(yyyymmddhhmmss)
{
if (mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString == null) mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString = CL().C_convertYYYYMMDDHHMMSSMMMIntoDisplayString;
return mm_convertYYYYMMDDHHMMSSMMMIntoDisplayString.call(this, yyyymmddhhmmss, "HHMM");
}
var mm_convertDisplayStringIntoYYYYMMDDHHMMSSMMM = null;
function convertDisplayStringIntoYYYYMMDDHHMMSSMMM(dispstring)
{
if (mm_convertDisplayStringIntoYYYYMMDDHHMMSSMMM == null) mm_convertDisplayStringIntoYYYYMMDDHHMMSSMMM = CL().C_convertDisplayStringIntoYYYYMMDDHHMMSSMMM;
return mm_convertDisplayStringIntoYYYYMMDDHHMMSSMMM.call(this, dispstring);
}
function convertDisplayStringIntoYYYYMMDDHHMMSS(vDisplay)
{
return vDisplay;
}
var mm_convertHHMMSSIntoDisplayString = null;
function convertHHMMSSIntoDisplayString(hhmmss)
{
if (mm_convertHHMMSSIntoDisplayString == null) mm_convertHHMMSSIntoDisplayString = CL().C_convertHHMMSSIntoDisplayString;
return mm_convertHHMMSSIntoDisplayString.call(this, hhmmss);
}
var mm_convertDisplayStringIntoHHMMSS = null;
function convertDisplayStringIntoHHMMSS(value)
{
if (mm_convertDisplayStringIntoHHMMSS == null) mm_convertDisplayStringIntoHHMMSS = CL().C_convertDisplayStringIntoHHMMSS;
return mm_convertDisplayStringIntoHHMMSS.call(this, value);
}
var mm_convertFLOATIntoDisplayString = null;
function convertFLOATIntoDisplayString(vFloat,decimalDigitsFloat)
{
if (mm_convertFLOATIntoDisplayString == null) mm_convertFLOATIntoDisplayString = CL().C_convertFLOATIntoDisplayString;
return mm_convertFLOATIntoDisplayString.call(this, vFloat,decimalDigitsFloat);
}
var mm_convertDisplayStringIntoFLOAT = null;
function convertDisplayStringIntoFLOAT(vDisplay)
{
if (mm_convertDisplayStringIntoFLOAT == null) mm_convertDisplayStringIntoFLOAT = CL().C_convertDisplayStringIntoFLOAT;
return mm_convertDisplayStringIntoFLOAT.call(this, vDisplay);
}
var mm_convertINTIntoDisplayString = null;
function convertINTIntoDisplayString(vINT)
{
if (mm_convertINTIntoDisplayString == null) mm_convertINTIntoDisplayString = CL().C_convertINTIntoDisplayString;
return mm_convertINTIntoDisplayString.call(this, vINT);
}
var mm_checkIfValueHasError = null;
function checkIfValueHasError(value,dataType,decimalDigitsFloat,digitsFloat)
{
if (mm_checkIfValueHasError == null) mm_checkIfValueHasError = CL().C_checkIfValueHasError;
return mm_checkIfValueHasError.call(this, value,dataType,decimalDigitsFloat,digitsFloat);
}
var mm_checkIf1000SeparatorsHasError = null;
function checkIf1000SeparatorsHasError(floatValue)
{
if (mm_checkIf1000SeparatorsHasError == null) mm_checkIf1000SeparatorsHasError = CL().C_checkIf1000SeparatorsHasError;
return mm_checkIf1000SeparatorsHasError.call(this, floatValue);
}
function convertDURATIONIntoDisplayString(duration)
{
}
var CONTROLTYPE_CONTAINER = 0;
var CONTROLTYPE_INPUT = 1;
function convertStatusToVisible(pstatus,pcontroltype)
{
if (pstatus == "true") return pstatus;
if (pstatus == "false") return pstatus;
if (pstatus == "INVISIBLE") return "false";
if (pstatus == "DISPLAY")
{
if (pcontroltype == CONTROLTYPE_CONTAINER) return "true";
else return "false";
}
if (pstatus == "EDIT") return "true";
if (pstatus == "FOCUS" || pstatus == "FOCUS_NO_SELECT") return "true";
if (pstatus == "ERROR") return "true";
if (pstatus == "ERROR_NO_FOCUS") return "true";
return pstatus;
}
function detLength(s,digits)
{
if (s == null) s = "";
s = ""+s;
s = s.replace(/\r\n/g,"\n")
s = s.replace(/\n/g,"\r\n");
vl = s.length;
if (digits == 1) return ""+vl;
if (digits == 2)
{
if (vl < 10) return "0"+vl;
return ""+vl;
}
if (digits == 3)
{
if (vl < 10) return "00"+vl;
if (vl < 100) return "0"+vl;
return ""+vl;
}
if (digits == 5)
{
if (vl < 10) return "0000"+vl;
if (vl < 100) return "000"+vl;
if (vl < 1000) return "00"+vl;
if (vl < 10000) return "0"+vl;
return ""+vl;
}
if (digits == 10)
{
if (vl < 10) return "000000000"+vl;
if (vl < 100) return "00000000"+vl;
if (vl < 1000) return "0000000"+vl;
if (vl < 10000) return "000000"+vl;
if (vl < 100000) return "00000"+vl;
if (vl < 1000000) return "0000"+vl;
if (vl < 10000000) return "000"+vl;
if (vl < 100000000) return "00"+vl;
if (vl < 1000000000) return "0"+vl;
return ""+vl;
}
alert("This method is not prepared for the call, digits = " + digits);
}
function detString(s)
{
if (s != null) return s;
return "";
}
function convertForSend(v)
{
alert("convertForSend: Not required anymore!");
return v;
}
function convertForReceive(v)
{
alert("convertForReceive: Not required anymore!");
return v;
}
function convertPropertyNameIn(v)
{
alert("convertPropertyNameIn: Not required anymore!");
return v;
}
function convertApos(v)
{
var vs = v;
if (vs != null && vs.indexOf("'") >= 0)  vs = vs.replace(/'/g,"&#146;");
return vs;
}
function convertSpecialHTMLCharacters(v)
{
var vs = v;
if (vs.indexOf("&") >= 0)  vs = vs.replace(/&/g,"&amp;");
if (vs.indexOf("\"") >= 0) vs = vs.replace(/\"/g,"&quot;");
if (vs.indexOf("<") >= 0)  vs = vs.replace(/\</g,"&lt;");
if (vs.indexOf(">") >= 0)  vs = vs.replace(/\>/g,"&gt;");
return vs;
}
function buildFirstTag(firstChar,param)
{
var vpageURL = m_parentdocument.URL;
var vispopup = m_parentparent.isPopupPage;
if (vispopup == null) vispopup = false;
return firstChar +
detLength(m_sessionId,2) +
detLength(m_processId,2) +
detLength(m_modelId,2) +
detLength(m_modelName,2) +
detLength(m_pageName,2) +
detLength(vpageURL,3) +
detLength(param,5) +
detLength(vispopup,1) +
detString(m_sessionId) +
detString(m_processId) +
detString(m_modelId) +
detString(m_modelName) +
detString(m_pageName) +
detString(vpageURL) +
detString(param) +
detString(vispopup);
}
function encodeURLParameter(ps)
{
if (ps == null) return null;
var psMem = ps;
try
{
ps = encodeStringIntoUTF8(ps);
ps = escape(ps).replace(/\+/g, '%2C').replace(/\"/g,'%22').replace(/\'/g, '%27');
return ps;
}
catch (exc)
{
return psMem;
}
}
function encodeStringIntoUTF8(rohtext)
{
rohtext = rohtext.replace(/\r\n/g,"\n");
var utftext = "";
for(var n=0; n<rohtext.length; n++)
{
var c=rohtext.charCodeAt(n);
if (c<128)
utftext += String.fromCharCode(c);
else if((c>127) && (c<2048)) {
utftext += String.fromCharCode((c>>6)|192);
utftext += String.fromCharCode((c&63)|128);}
else {
utftext += String.fromCharCode((c>>12)|224);
utftext += String.fromCharCode(((c>>6)&63)|128);
utftext += String.fromCharCode((c&63)|128);}
}
return utftext;
}
var mm_replaceLiteralTRANSLATION = null;
function replaceLiteralTRANSLATION(lang, textid)
{
if (mm_replaceLiteralTRANSLATION == null) mm_replaceLiteralTRANSLATION = CL().C_replaceLiteralTRANSLATION;
return mm_replaceLiteralTRANSLATION.call(this, lang, textid);
}
var mm_replaceLiteralWithAddTextTRANSLATION = null;
function replaceLiteralWithAddTextTRANSLATION(lang,textid,addtext,thisthis)
{
if (mm_replaceLiteralWithAddTextTRANSLATION == null) mm_replaceLiteralWithAddTextTRANSLATION = CL().C_replaceLiteralWithAddTextTRANSLATION;
return mm_replaceLiteralWithAddTextTRANSLATION.call(this, lang,textid,addtext);
}
function controlSelectionRefresh(selList,activeC) {
var prev = parent.document.querySelectorAll('.previewSelect');
var i;
for (i = 0; i < prev.length; i++)
prev[i].classList.remove('previewSelect');
prev = parent.document.querySelectorAll('.previewActive');
for (i = 0; i < prev.length; i++)
prev[i].classList.remove('previewActive');
var theControl;
if ( selList == null && activeC < 0 ) return;
var selListArr = selList.split(';');
for ( i = 0; i < selListArr.length-1; i ++ )
{
theControl = parent.document.querySelector('[data-casaindex="'+ selListArr[i] + '"]');
if (theControl!=null) theControl.classList.add('previewSelect');
}
theControl = parent.document.querySelector('[data-casaindex="'+ activeC + '"]');
if (theControl!=null) {
theControl.classList.remove('previewSelect');
theControl.classList.add('previewActive');
}
}
function reactOnClickPage(evt)
{
if (parent.CASA_supressXYContextMenu == true)
{
parent.CASA_supressXYContextMenu = false;
return;
}
var elm = findSrcElement(evt);
if(elm.tagName == 'BUTTON' || elm.tagName == 'IMG' || elm.tagName == 'TD')
{
setControlMenuOffset(elm, 12, 10);
}
else
{
try { setContextMenuXYPAGE(evt.clientX, evt.clientY); } catch (exc) {}
}
}
function setControlMenuOffset(elm, leftOffsetValue, topOffsetValue)
{
calculatePageOffset(elm);
var posLeft = elm.CASA_pageoffsetleft + leftOffsetValue;
var posTop = elm.CASA_pageoffsettop + elm.offsetHeight + topOffsetValue;
setContextMenuXYPAGE(posLeft, posTop);
}
var m_MPADIV = null;
function findMPADIV(createIfNotExists)
{
if (m_MPADIV == null && createIfNotExists != false)
{
var vdiv = parent.createElement("DIV");
vdiv.id = "MPADIV";
vdiv.style.position = "absolute";
vdiv.style.display = "none";
vdiv.style.left = "0";
vdiv.style.top = "0";
vdiv.style.zIndex = "100000";
vdiv.style.width = "0";
vdiv.style.height = "0";
parent.document.body.appendChild(vdiv);
addClickAwayObject(vdiv);
m_MPADIV = vdiv;
}
return m_MPADIV;
}
var m_THISOCCUPIED = null;
var m_THISOCCUPIEDIMG = null;
function findTHISOCCUPIED(createIfNotExists, prefferTopFrame)
{
if (m_THISOCCUPIED == null && createIfNotExists != false)
{
var frmName = getPropertyValue("cISAddons.popupDivFrame");
var vTopFrame;
if(frmName != null && frmName != "")
vTopFrame = CL().C_findFrame(this,frmName,true);
var vdiv;
var vimg = null;
if(vTopFrame != null)
{
var topWindow = findOwnerTHISOCCUPIED(vTopFrame, prefferTopFrame);
vdiv = topWindow.document.getElementById("THISOCCUPIED");
if (vdiv == null) vdiv = topWindow.document.createElement("DIV");
}
else
{
vdiv = parent.createElement("DIV");
vimg = parent.createElement("IMG");
}
vdiv.id = "THISOCCUPIED";
vdiv.style.position = "absolute";
vdiv.style.display = "none";
vdiv.style.cursor = "wait";
if (parent.m_immediatedisplay == true)
vdiv.style.display = "";
vdiv.style.left = "0";
vdiv.style.top = "0";
vdiv.style.zIndex = "1010";
vdiv.style.width = "100%";
vdiv.style.height = "100%";
m_THISOCCUPIEDIMG = buildOccupiedImage();
if(vTopFrame != null)
{
findOwnerTHISOCCUPIED(vTopFrame, prefferTopFrame).document.body.appendChild(vdiv);
}
else
{
parent.document.body.appendChild(vdiv);
parent.document.body.appendChild(m_THISOCCUPIEDIMG);
}
m_THISOCCUPIED = vdiv;
}
return m_THISOCCUPIED;
}
function findOwnerTHISOCCUPIED(vTopFrame, prefferTopFrame)
{
if(prefferTopFrame != true &&
(CL().CASA_popupopenersvalues != null && CL().CASA_popupopenersvalues.length  > 0 &&
m_parentparent != null && m_parentparent.parent != null))
return m_parentparent.parent;
if(CL().m_frameBufferSize == 1)
return parent;
return extractContentWindow(vTopFrame);
}
function buildOccupiedImage()
{
var vimg = parent.createElement("IMG");
vimg.style.position = "absolute";
vimg.style.left = "0";
vimg.style.top = "0";
vimg.style.zIndex = "1011";
if (parent.m_immediatedisplay == true)
vimg.style.display = "";
vimg.src = "../HTMLBasedGUI/general/occupied.gif";
var v = parent.m_occupiedpixelwidth
if (parent.m_occupiedpixelwidth == null)
v = "29px";
vimg.style.width = C_adjustUnits(v);
v = parent.m_occupiedpixelheight;
v=C_adjustUnits(v);
if (v == null)
v = "36px";
vimg.style.height = C_adjustUnits(v);
if (parent.m_occupiedimage != null)
vimg.src = parent.m_occupiedimage;
return vimg;
}
function removeTHISOCCUPIED()
{
}
function setDisplayTHISOCCUPIED(style)
{
var occdiv = findTHISOCCUPIED();
occdiv.style.display = style;
if (m_THISOCCUPIEDIMG != null) m_THISOCCUPIEDIMG.style.display = style;
}
function extractContentWindow(pTopFrame)
{
if(pTopFrame == null) return null;
if (pTopFrame.contentWindow != undefined)
return pTopFrame.contentWindow;
else
return pTopFrame;
}
function prepareDIR(divDoc)
{
if(divDoc.body.style.direction != parent.document.body.style.direction)
divDoc.body.style.direction = parent.document.body.style.direction;
}
var m_THISCONTEXTMENU = null;
function findTHISCONTEXTMENU(createIfNotExists)
{
if (m_THISCONTEXTMENU == null && createIfNotExists != false)
{
try
{
var vdiv;
var vTopFrame = null;
var isCentralCM = parent.m_centralContextMenu;
var frmName = getPropertyValue("cISAddons.popupDivFrame");
if(frmName != null)
vTopFrame = CL().C_findFrame(this,frmName,true);
if(isCentralCM && vTopFrame != null)
{
var divDoc = extractContentWindow(vTopFrame).document;
vdiv = divDoc.createElement("DIV");
if ( !isSafari() ) prepareDIR(divDoc);
else if (vdiv.style.direction != parent.document.body.style.direction)
vdiv.style.direction = parent.document.body.style.direction;
}
else
vdiv = parent.createElement("DIV");
vdiv.id = "THISCONTEXTMENU";
vdiv.style.display = "none";
vdiv.style.position = "absolute";
vdiv.style.top = "0";
vdiv.style.width = "100%";
vdiv.style.height = "100%";
vdiv.style.zIndex = "1000";
if (parent.document.body.style.direction == "rtl")
{
vdiv.style.right ="0";
vdiv.style.align = "right";
}
else
{
vdiv.style.left ="0";
vdiv.style.align = "left";
}
vdiv.style.valign = "middle";
if(isCentralCM && vTopFrame != null)
{
vdiv.CASA_cmOwnerFrame = extractContentWindow(vTopFrame);
vdiv.CASA_iscentralCM = true;
extractContentWindow(vTopFrame).document.body.appendChild(vdiv);
var o = calculateFrameOffset(frmName);
if (o != null)
{
vdiv.CASA_frameOffsetLeft = o.frameOffsetLeft;
vdiv.CASA_frameOffsetTop = o.frameOffsetTop;
}
}
else
{
vdiv.CASA_cmOwnerFrame = parent;
vdiv.CASA_iscentralCM = false;
parent.document.body.appendChild(vdiv);
}
addClickAwayObject(vdiv);
m_THISCONTEXTMENU = vdiv;
}
catch(exx)
{}
}
if (parent.m_centralContextMenu &&
m_THISCONTEXTMENU != null)
{
var o = calculateFrameOffset(getPropertyValue("cISAddons.popupDivFrame"));
if(o != null)
{
m_THISCONTEXTMENU.CASA_frameOffsetLeft = o.frameOffsetLeft;
m_THISCONTEXTMENU.CASA_frameOffsetTop = o.frameOffsetTop;
}
}
return m_THISCONTEXTMENU;
}
var m_DRAGDROP = null;
function findDRAGDROP(createIfNotExists)
{
if (m_DRAGDROP == null && createIfNotExists != false)
{
var vdiv = parent.createElement("DIV");
vdiv.id = "DRAGDROP";
vdiv.style.display = "none";
vdiv.style.position = "absolute";
vdiv.style.cursor = "move";
vdiv.style.left = "0";
vdiv.style.top = "0";
vdiv.style.width = "100px";
vdiv.style.height = "100px";
parent.document.body.appendChild(vdiv);
addClickAwayObject(vdiv);
m_DRAGDROP = vdiv;
}
return m_DRAGDROP;
}
function submitModelFastBufferSwitch()
{
submitModel("submit");
}
function executeXMLHTTTPPost(pxml)
{
var xhreq = createXMLHttpRequest();
var vpim = "";
if (m_parentparent.pageInitParam != null) vpim = m_parentparent.pageInitParam;
pxml = pxml.replace(/%/g,"%25");
pxml = pxml.replace(/&/g,"%26");
pxml = pxml.replace(/\n/g,"%0D%0A");
var vxml = "SESSIONID="+m_sessionId+
"&XML="+pxml+
"&PAGEINITPARAM="+vpim+
"&STAMP=";
var purl = parent.location.href;
var plix = purl.indexOf("?");
if (plix > 0) purl = purl.substring(0,plix);
var plix = purl.lastIndexOf("/");
purl = purl.substring(0,plix);
var plix = purl.lastIndexOf("/");
purl = purl.substring(0,plix);
xhreq.open("POST",purl + "/servlet/Connector",true);
xhreq.onreadystatechange = function()
{
if (xhreq.readyState != 4) return;
var sr = xhreq.responseText;
var vresponse = new Object();
var vsi = sr.indexOf('<textarea id="XML" name="XML">');
var vei = sr.indexOf('</textarea>',vsi);
vresponse.xml = sr.substring(vsi+30,vei);
vsi = sr.indexOf('<textarea id="ERRORMESSAGE" name="ERRORMESSAGE">');
vei = sr.indexOf('</textarea>',vsi);
vresponse.error = sr.substring(vsi+48,vei);
vsi = sr.indexOf('<input type="text" name="STAMP" id="STAMP" value="');
vei = sr.indexOf('">',vsi);
vresponse.stamp = sr.substring(vsi+50,vei);
reactOnNewModel(null,vresponse);
};
xhreq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhreq.send(vxml);
}
function createDIVPOPUP(url,pagefeature,popupTitle,refreshIt)
{
var frmName = getPropertyValue("cISAddons.popupDivFrame");
if(frmName == null)
{
alert('Unable to open popup');
return;
}
var vTopFrame = CL().C_findFrame(this,frmName,true);
if(vTopFrame == null)
{
alert('Unable to open popup');
return;
}
var vHTML = "";
var contentWindow = extractContentWindow(vTopFrame);
var doc = contentWindow.document;
var cHeight = contentWindow.innerHeight;
var vdiv = doc.createElement("DIV");
vdiv.style.position = "absolute";
vdiv.style.display = "";
vdiv.style.left = "0";
vdiv.style.top = "0";
vdiv.style.height = "100%";
vdiv.style.width = "100%";
vdiv.style.zIndex = "1000";
vdiv.style.backgroundColor = "transparent";
vHTML += "<table height='100%' width='100%'>\n";
vHTML += "<tr align='center' valign='middle'>\n";
vHTML += "<td align='center' valign='middle'>\n";
vHTML += "<div id=\'POPUPDIV\' name=\'POPUPDIV\' style=\'align:center;valign:middle;"+abstractStyleInfo(pagefeature,cHeight)+"\'>\n";
vHTML += "<table cellspacing='0' cellpadding='0' height=\'100%\' width=\'100%\' class='POPUPDIVTable'>";
vHTML += "<tr class='POPUPDIVTitleBarCell'>";
vHTML += "<td class='POPUPDIVTitleBarCell'><div nowrap=\"true\" style=\"overflow-x: hidden;\">"+popupTitle+"</div></td></tr>";
vHTML += "<tr class='POPUPDIVCell'><td class='POPUPDIVCell'>";
vHTML += "<iframe name=\'POPUPFRAME\' frameborder=\"0\" scrolling=\"no\" class=\"POPUPDIVFrame\" id=\'POPUPFRAME\' src=\'"+url+"\'>\n";
vHTML += "</iframe>";
vHTML += "</td></tr></table>";
vHTML += "</div>";
vHTML += "</td></tr></table>";
vdiv.innerHTML = vHTML;
doc.body.appendChild(vdiv);
vdiv.refreshIt = refreshIt;
if (extractContentWindow(vTopFrame).m_divPopUpStack != null)
extractContentWindow(vTopFrame).m_divPopUpStack.push(vdiv);
}
function findTHISPOPUPDIV()
{
var frmName = getPropertyValue("cISAddons.popupDivFrame");
var vTopFrame = CL().C_findFrame(this,frmName,true);
if(extractContentWindow(vTopFrame).m_divPopUpStack == null)	return null;
return extractContentWindow(vTopFrame).m_divPopUpStack[extractContentWindow(vTopFrame).m_divPopUpStack.length-1];
}
function removeDIVPOPUP()
{
try
{
var frmName = getPropertyValue("cISAddons.popupDivFrame");
var vTopFrame = CL().C_findFrame(this,frmName,true);
var vdiv = null;
if (extractContentWindow(vTopFrame).m_divPopUpStack != null)
vdiv = extractContentWindow(vTopFrame).m_divPopUpStack.pop();
var refreshOpener = vdiv.refreshIt;
extractContentWindow(vTopFrame).document.body.removeChild(vdiv);
refreshOpener();
}
catch(exc)
{}
}
function setHieghtWidthDIVPOPUP()
{
var popupdiv = findTHISPOPUPDIV();
var vdiv = popupdiv.getElementById("POPUPDIV");
var oldstyle = vdiv.style;
}
function abstractStyleInfo(pStyle,bcheight)
{
var sInfo = pStyle.split(';');
var finalStyle = "";
var totalHeight = 0;
var posX = 0;
var posY = 0;
var height = 0;
var width = 0;
if((pStyle.indexOf("dialogTop") >= 0) || (pStyle.indexOf("dialogLeft") >=0))
finalStyle += "position:absolute;";
for(var i =0;i<sInfo.length;i++)
{
var style = sInfo[i];
var value = style.split(":");
if(style.indexOf("dialogHeight") >= 0)
{
totalHeight += parseInt(value[1]);
height = value[1];
height = height.replace("px","");
}
if(style.indexOf("dialogWidth") >= 0)
{
width = value[1];
width = width.replace("px","");
}
if(style.indexOf("dialogTop") >= 0)
{
var temp = value[1];
temp = temp.substring(temp.indexOf('(')+1,temp.indexOf(')'));
totalHeight+= parseInt(temp);
posY = temp;
}
if(style.indexOf("dialogLeft") >= 0)
{
var temp = value[1];
temp = temp.substring(temp.indexOf('(')+1,temp.indexOf(')'));
posX = temp;
}
}
if(totalHeight > bcheight)
height = height-(parseInt(totalHeight) - parseInt(bcheight))-5;
finalStyle += "left:"+C_adjustUnits(posX)+";"+ "top:"+C_adjustUnits(posY)+";" + "width:"+C_adjustUnits(width)+";" + "height:" + C_adjustUnits(height)+";";
return finalStyle;
}
function applyDisplayProperty(d, s)
{
if(d == null) return s;
if(d.toLowerCase() == "true")
{
if(s == "FOCUS" || s == "FOCUS_NO_SELECT") return "DISPLAY";
if(s == "ERROR" || s == "ERROR_NO_FOCUS") return "ERROR_DISPLAY";
if(s == "INVISIBLE" || s == "ERROR_DISPLAY" || s == "EDIT") return s;
return "DISPLAY";
}
else
{
if(s == "FOCUS" || s == "FOCUS_NO_SELECT" || s == "ERROR" || s == "ERROR_NO_FOCUS" ||
s == "INVISIBLE" || s == "ERROR_DISPLAY" || s == "DISPLAY") return s;
return "EDIT";
}
}
function showMessageInStatusBar (messType, messShortText)
{
setPropertyValue(CASA_statusbar.CASA_typeprop, messType);
if (messShortText.length > 0)
{
messShortText = "<font color='#B42C2C'><b>" + messShortText + "</b></font>"
}
setPropertyValue(CASA_statusbar.CASA_shorttextprop, messShortText);
updateModelListenersS();
}
function getDateDisplay()
{
return m_dateDisplay;
}
function getTimeDisplay()
{
return m_timeDisplay;
}
function getDecimalSeparator()
{
return m_decimalSeparator;
}
function get1000Separator()
{
return m_1000Separator;
}
function getLanguage()
{
return m_language;
}
function registerPopupPage(popupWin, isModal)
{
return CL().C_registerPopupPage(popupWin, isModal);
}
function C_adjustUnits(elementString)
{
return CL().C_adjustUnits(elementString);
}
function getTesttoolidHtml()
{
var ishtml4 = false;
if ( getPropertyValue("testtoolidhtml4") == "true" )
ishtml4 = true;
addLogMessage ("ishtml4=" + ishtml4);
return CL().C_getTesttoolidHtml(ishtml4);
}
