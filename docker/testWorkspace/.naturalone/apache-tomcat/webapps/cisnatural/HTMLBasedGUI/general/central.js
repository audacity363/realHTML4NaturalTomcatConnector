function addVersionInfoCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CENTRAL');
}
var m_adapterstreams = [];
var m_natlogonAdapterStreams = [];
function bufferAdapterStream(paccesskey,pstream)
{
if ( paccesskey.indexOf("NatLogon") < 0 )
m_adapterstreams[paccesskey] = pstream;
else
m_natlogonAdapterStreams[paccesskey] = pstream;
}
function findBufferedAdapterStream(paccesskey)
{
if ( paccesskey.indexOf("NatLogon") < 0 )
return m_adapterstreams[paccesskey];
else
return m_natlogonAdapterStreams[paccesskey];
}
function clearBufferedAdapterStreams(pcaller)
{
m_adapterstreams = [];
}
function clearBufferedAdapterStream(paccesskey)
{
if ( paccesskey.indexOf("NatLogon") < 0 )
m_adapterstreams[paccesskey] = null;
else
m_natlogonAdapterStreams = [];
}
function buildBufferAccesKey(psessionid,psubsessionid,pmodelid,pclass,ppage)
{
return psessionid + "/" + psubsessionid + "/" + pmodelid + "/" + pclass + "/" + ppage;
}
var m_popupPages = [];
function C_registerPopupPage(popupPage, isModal)
{
for(var i=0;i<m_popupPages.length;i++)
{
if (m_popupPages[i].window == popupPage)
return;
}
var o = new Object();
o.window = popupPage;
o.isModal = isModal;
m_popupPages.push(o);
}
function C_deregisterPopupPage(popupPage)
{
var vArray = [];
for(var i=0;i<m_popupPages.length;i++)
{
if (m_popupPages[i].window != popupPage)
vArray.push(m_popupPages[i]);
}
m_popupPages = vArray;
}
var m_popupOpeners = [];
function C_registerPopupOpener(opener)
{
m_popupOpeners.push(opener);
}
function C_deregisterPopupOpener()
{
if ( m_popupOpeners.length > 0 )
return m_popupOpeners.pop();
return null;
}
function closePopupPages()
{
for(var i=0;i<m_popupPages.length;i++)
{
try { m_popupPages[i].window.close(); } catch(exccc) {}
}
}
var toFrontTimer = null;
var toFrontTimerOn = true;
function checkMozIO(popupPage,toFront)
{
if ( !toFrontTimerOn || (m_popupOpeners.length>0) ) return true;
try
{
for (i=m_popupPages.length-1;i>=0;i--)
{
if (m_popupPages[i].isModal==true)
{
if (isInnerFrameMoz(popupPage, m_popupPages[i].window) == true) return true;
if ((toFrontTimer==null) && (toFront != false))
{
m_popupPages[m_popupPages.length-1].window.focus();
toFrontTimer = setTimeout(function(){toFrontTimer=null;},1000);
}
return false;
}
}
}
catch(exc) { }
return true;
}
function isInnerFrameMoz(frame, searchIn)
{
if (frame == searchIn) return true;
for (var i=0; i < searchIn.frames.length; i++)
{
if (frame == searchIn.frames[i]) return true;
if (isInnerFrameMoz(frame, searchIn.frames[i]) == true) return true;
}
return false;
}
var m_dateInputSheetInfos = new Object();
function bufferCalendarSheetInfo(paccesskey,pSheetInfo)
{
m_dateInputSheetInfos[paccesskey] = pSheetInfo;
}
function findBufferCalendarSheetInfo(paccesskey)
{
return m_dateInputSheetInfos[paccesskey];
}
function buildCalendarSheetAccessKey(pCalendarId, pYear, pMonth)
{
return pCalendarId+"/"+pYear+"/"+pMonth;
}
var m_clientMessages;
var m_languagePacks;
function C_replaceLiteralTRANSLATION(lang, textid)
{
return C_replaceLiteralWithAddTextTRANSLATION(lang,textid,null);
}
function C_replaceLiteralWithAddTextTRANSLATION(lang,textid,addtext)
{
if (m_clientMessages == null)
{
var o = new Object();
try
{
self.initMessages_de(o);
}
catch (excccc)
{
}
try
{
self.initMessages_en(o);
}
catch (excccc)
{
}
try
{
self.initCLientSideMessages(o);
}
catch (excccc)
{
m_languagePacks = new Object();
}
m_clientMessages = o;
}
if ( (m_languagePacks != null) &&
(lang != "en") && (lang != "de") && (lang != "D") && (lang != "E"))
{
if ( m_languagePacks[lang] == null )
{
self["initMessages_" + lang](m_clientMessages);
m_languagePacks[lang] = "1";
}
}
if (addtext != null)
{
addtext = addtext.replace(/&quot;/g,'"');
addtext = addtext.replace(/&amp;/g,'&');
addtext = addtext.replace(/&lt;/g,'<');
addtext = addtext.replace(/&gt;/g,'>');
}
var result = m_clientMessages[lang+";"+textid];
if (addtext != null)
{
result = result.replace(/REPLACE/g,addtext);
}
if (result == null)
{
result = m_clientMessages["en;" + textid];
if (addtext != null)
{
result = result.replace(/REPLACE/g,addtext);
}
}
return result;
}
function C_openCasabacPageAsModalPopup(pPage,pWidth,pHeight)
{
var pageFeatures = "status:no;resizable:no;dialogWidth:"+C_adjustUnits(pWidth)+";dialogHeight:"+C_adjustUnits(pHeight);
Features = pageFeatures.replace(/;/g,",");
pageFeatures = pageFeatures.replace(/:/g,"=");
pageFeatures = pageFeatures.replace(/dialogWidth/g,"width");
pageFeatures = pageFeatures.replace(/dialogHeight/g,"height");
open(this.m_parentparent.m_currentWebApp+
"/servlet/StartCISPage"+
"?PAGEURL="+pageName+
"&SESSIONID="+this.m_parentparent.getCurrentSessionId()+
"&SUBSESSIONID="+this.m_parentparent.getCurrentProcessId()+
"&ISPOPUP=true"+
"&ONUNLOADBEHAVIOUR=POPUPCLOSED",
'dialog',
"dialog=yes,modal=1,minimizable=no,"+pageFeatures+",left=200px,top=200px");
}
var m_previewDragActive = false;
var m_previewDragKey = "";
var m_previewDoSelect = "false";
function controlMouseDown(tt,controlid,event)
{
m_previewDragActive = false;
event.stopPropagation();
}
function controlMouseUp(tt,controlid,event)
{
event.stopPropagation();
if (m_previewDragActive == true) return;
if(event.button == 2) controlContextMenu(tt,controlid,event);
else controlSelected(tt,controlid,event);
}
function controlDragStart(tt,controlid,e)
{
e.stopPropagation();
e.dataTransfer.setData('text',""+controlid);
m_previewDragActive = true;
m_previewDragKey = "";
m_previewDoSelect = "false";
if (e.shiftKey == true) m_previewDragKey += "shift";
if (e.ctrlKey == true) m_previewDragKey += "ctrl";
if ( !(e.target.classList.contains("previewActive") || e.target.classList.contains("previewSelect")) )
m_previewDoSelect = "true";
}
function controlDragEnd(tt,coontrolid,event)
{
m_previewDragActive = false;
event.stopPropagation();
}
function isEditorPreview() {
return (typeof(java__callback__controlselectiononload) !== 'undefined' );
}
function controlSelectionOnLoad(){
if ( typeof(java__callback__controlselectiononload) !== 'undefined' )
java__callback__controlselectiononload();
}
function controlSelected(tt,controlid,e)
{
if (controlid == tt.m_lastProcessedControlId)
{
if ( typeof(java__callback__previewcontrolselected) !== 'undefined' )
{
cancelEvent(e);
if (e.target.classList.contains("previewActive") && ((e.shiftKey != true)&& (e.ctrlKey != true)) ) return;
}
}
tt.m_lastProcessedControlId = controlid;
if (runsEditorModel6(tt))
{
cancelEvent(e);
var vFrame = C_findFrameSetWnd(tt);
vFrame.document.body.focus();
vFrame.csciframe.setPropertyValue("controlSelectionIndex",controlid);
vFrame.csciframe.avoidNextSynchronizationDrillDown();
vFrame.csciframe.invokeMethodInModel("onControlSelection");
try { e.target.focus(); }	catch (exc) {}
}
if ( typeof(java__callback__previewcontrolselected) !== 'undefined' )
{
var key = "";
if (e.shiftKey == true) key += "shift";
if (e.ctrlKey == true) key += "ctrl";
java__callback__previewcontrolselected(controlid,key);
}
}
function controlDrop(tt,controlid,e)
{
if ( typeof(java__callback__previewcontroldropped) !== 'undefined' )
{
m_previewDragActive = false;
cancelEvent(e);
var data = e.dataTransfer.getData("text");
java__callback__previewcontroldropped(controlid,data,m_previewDragKey,m_previewDoSelect);
return;
}
if (C_checkIfDragProcessIsActive() == false) return;
if (runsEditorModel6(tt))
{
var dropInfo = C_endDrag(e);
var vFrame = C_findFrameSetWnd(tt);
vFrame.document.body.focus();
var elm = tt.m_parentparent.frameElement.offsetParent;
tt.calculatePageOffset(elm);
vFrame.csciframe.setContextMenuXYPAGE(e.clientX+elm.CASA_pageoffsetleft, e.clientY+elm.CASA_pageoffsettop);
vFrame.csciframe.setPropertyValue("controlSelectionIndex",controlid);
vFrame.csciframe.setPropertyValue("droppedControlDragInfo", dropInfo);
vFrame.csciframe.avoidNextSynchronizationDrillDown();
vFrame.csciframe.invokeMethodInModel("onControlDropped");
}
}
function controlContextMenu(tt,controlid,e)
{
if (runsEditorModel6(tt))
{
if (e.preventDefault) e.preventDefault();
var vFrame = C_findFrameSetWnd(tt);
vFrame.document.body.focus();
var elm = tt.m_parentparent.frameElement.offsetParent;
tt.calculatePageOffset(elm);
vFrame.csciframe.setContextMenuXYPAGE(e.clientX+elm.CASA_pageoffsetleft, e.clientY+elm.CASA_pageoffsettop);
vFrame.csciframe.setPropertyValue("controlSelectionIndex",controlid);
vFrame.csciframe.avoidNextSynchronizationDrillDown();
vFrame.csciframe.invokeMethodInModel("onControlContextMenuRequestWEBCLIENT");
}
if ( typeof(java__callback__previewcontextmenu) !== 'undefined' )
{
cancelEvent(e);
var cDoSelect = "false";
if ( !(e.target.classList.contains("previewActive") || e.target.classList.contains("previewSelect")) )
cDoSelect = "true";
java__callback__previewcontextmenu(controlid, cDoSelect);
}
}
function controlONCONTEXTMENU(tt,controlid,e)
{
if (runsEditorModel6(tt) ) cancelEvent(e);
if ( typeof(java__callback__previewcontextmenu) !== 'undefined' ) cancelEvent(e);
}
function runsEditorModel6(frame)
{
if (frame.m_inEditMode == null)
{
frame.m_inEditMode = false;
if (frame.m_sessionId.length > 4 &&
frame.m_sessionId.charAt(0) == "T" &&
frame.m_sessionId.charAt(1) == "E" &&
frame.m_sessionId.charAt(2) == "M" &&
frame.m_sessionId.charAt(3) == "P")
{
frame.m_inEditMode = true;
}
}
if (frame.m_inEditMode == true &&
frame.parent != null &&
frame.m_parentparent != null &&
C_findFrameSetWnd(frame) != null &&
C_findFrameSetWnd(frame).csciframe != null &&
C_findFrameSetWnd(frame).csciframe.m_modelName == "com.softwareag.cis.editor.EditorModel6")
{
return true;
}
return false;
}
function C_processHotKeys(e)
{
var srcElm = this.findSrcElement(e);
if (e.ctrlKey == true &&
e.altKey == true &&
e.shiftKey == true &&
!this.m_parentparent.m_suppressClientLogHotKeys)
{
if (e.keyCode == 68) { outputLog(this); return; }
if (e.keyCode == 83) { outputLog(this, true); return; }
if (e.keyCode == 70) { outputWorkareaBufferLog(this); return; }
if (e.keyCode == 84) { outputFrameHierarchy(this); return; }
if (e.keyCode == 72) { outputHotkeys(this); return; }
if (e.keyCode == 73) { outputTabIndexes(this); return; }
if (e.keyCode == 80) { outputPerformance(this); return; }
}
if (this.m_noProcessingForNextHotKey == true)
{
this.m_noProcessingForNextHotKey = false;
return;
}
if(e.keyCode == 13 &&
e.ctrlKey == false &&
e.shiftKey == false &&
e.altKey == false)
{
if (srcElm != null &&
srcElm.CASA_kc13Handler == true)
{
this.addLogMessage("Hotkey Managment: hot key "+e.keyCode+" suppressed");
return;
}
}
var now = new Date();
if (this.checkIfNoActivities(now) == true)
{
this.addLogMessage("Hotkey Managment: hot key "+e.keyCode+" suppressed (block activities)");
return;
}
if (this.m_hotKeysPAGE.CASA_hotkeys != null)
{
var handled = this.reactOnKeyDownHOTKEY(this.m_hotKeysPAGE,e);
if (handled == true)
return cancelEvent(e);
}
for (i=0; i<this.m_hotKeys.length; i++)
{
var hotKey = this.m_hotKeys[i];
if (e.keyCode == hotKey.keyCode &&
e.ctrlKey == hotKey.ctrlKey &&
e.shiftKey == hotKey.shiftKey &&
e.altKey == hotKey.altKey)
{
if (e.keyCode == 13 &&
this.getPropertyValue("cISAddons.hE") == 1)
{
this.addLogMessage("Hotkey Managment: ENTER hot key suppressed because HOTKEYSEnterMode is disabled");
continue;
}
try
{
var vse = this.findSrcElement(e);
try { vse.blur(); } catch (exxe) {}
this.parent.CasaPAGE.focus();
try { vse.focus(); } catch (exxe) {}
}
catch (eexxcc) {}
this.invokeMethodInModel(hotKey.method);
return cancelEvent(e);
}
}
for (i=0; i<this.m_hotKeysWithCallback.length; i++)
{
var hotKey = this.m_hotKeysWithCallback[i];
if (e.keyCode != null &&
e.keyCode == hotKey.keyCode &&
e.ctrlKey == hotKey.ctrlKey &&
e.shiftKey == hotKey.shiftKey &&
e.altKey == hotKey.altKey)
{
try
{
var vse = this.findSrcElement(e);
try { vse.blur(); } catch (exxe) {}
this.parent.CasaPAGE.focus();
try { vse.focus(); } catch (exxe) {}
}
catch (eexxcc) {}
hotKey.callbackMethod(hotKey.callbackParam);
return cancelEvent(e);
}
}
if (e.keyCode == 8 &&
(srcElm == null || (srcElm.tagName != 'INPUT' && srcElm.tagName != 'TEXTAREA')))
return cancelEvent(e);
if (e.keyCode == 8 && srcElm != null && (srcElm.tagName == 'INPUT' || srcElm.tagName == 'TEXTAREA'))
{
if (srcElm.readOnly) return cancelEvent(e);
var thetype = srcElm.getAttribute('type');
if (thetype=='button' || thetype=='checkbox' || thetype=='radio'
|| thetype=='reset' || thetype=='hidden')
return cancelEvent(e);
}
if (e.keyCode > 111 && e.keyCode < 124)
{
return cancelEvent(e);
}
if ((e.keyCode == 87 && e.ctrlKey == true) ||
(e.keyCode == 82 && e.ctrlKey == true))
{
return cancelEvent(e);
}
if (this.getPropertyValue("cISAddons.isLayeredPopup") == "true" &&
(e.keyCode == 13 || e.keyCode == 27))
{
try
{
var vse = this.findSrcElement(e);
try { vse.blur(); } catch (exxe) {}
this.parent.CasaPAGE.focus();
try { vse.focus(); } catch (exxe) {}
}
catch (eexxcc) {}
var mn = "reactOnPagePopupEnterKey";
if (e.keyCode == 27) mn = "closePagePopupJS";
else if (this.getPropertyValue("cISAddons.pagePopupEnterHotKey") != "true")
return cancelEvent(e);
this.invokeMethodInModel(mn);
return cancelEvent(e);
}
if (this.getPropertyValue("cISAddons.eTT") != 1)
this.changeReturnToTab(e);
}
function cancelEvent(e)
{
if (e.stopPropagation && e.preventDefault)
{
e.stopPropagation();
e.preventDefault();
}
}
function C_changeReturnToTab(e)
{
try
{
if (e.keyCode == 13 &&
e.ctrlKey == false &&
e.shiftKey == false &&
e.altKey == false)
{
try
{
e.target.blur();
e.target.focus();
}
catch (exc) {}
this.focusNextInput(e.target);
this.clickAway();
}
}
catch (exc)
{
}
}
function C_focusNextInput(element)
{
try
{
var listenActive = false;
var vAll = this.m_parentdocument.getElementsByTagName('*');
var vmaxi = vAll.length;
var thisInputIndex = 0;
for (var i=0; i<vmaxi; i++)
{
if (vAll[i] == element)
{
listenActive = true;
thisInputIndex = i;
continue;
}
if (listenActive == true)
{
if (vAll[i].tagName == "INPUT" &&
vAll[i].tabIndex >= 0 &&
vAll[i].disabled == false)
{
vAll[i].focus();
vAll[i].select();
return;
}
}
}
for (var i=0; i<=thisInputIndex; i++)
{
if (vAll[i].tagName == "INPUT" &&
vAll[i].tabIndex >= 0 &&
vAll[i].disabled == false)
{
vAll[i].focus();
vAll[i].select();
break;
}
}
}
catch (exc)
{
}
}
function C_focusNextTabInput(element)
{
try
{
var afterCurrent = false;
var vAll = this.m_parentdocument.getElementsByTagName('input');
var vmaxi = vAll.length;
var nextInput = null;
var nextIndex = Number.MAX_VALUE;
for (var i=0; i<vmaxi; i++)
{
if(vAll[i] == element)
{
afterCurrent = true;
continue;
}
if(!afterCurrent && vAll[i].tabIndex == element.tabIndex)
{
continue;
}
if (vAll[i].tabIndex >= 0 &&
isEnabledAndVisible(vAll[i]) &&
vAll[i].tabIndex >= element.tabIndex &&
nextIndex > vAll[i].tabIndex - element.tabIndex)
{
nextInput = vAll[i];
nextIndex = vAll[i].tabIndex - element.tabIndex;
if(nextIndex == 0) break;
}
}
if(nextInput != null)
{
nextInput.focus();
nextInput.select();
}
else
{
for (var i=0; i<vmaxi; i++)
{
if (vAll[i].tabIndex >= 0 &&
isEnabledAndVisible(vAll[i]))
{
if(nextInput == null)
{
nextInput = vAll[i];
nextIndex = vAll[i].tabIndex;
}
if(vAll[i].tabIndex < nextIndex)
{
nextInput = vAll[i];
nextIndex = vAll[i].tabIndex;
if(nextIndex == 0) break;
}
}
}
if(nextInput != null)
{
nextInput.focus();
nextInput.select();
}
}
}
catch (exc)
{
}
}
function isEnabledAndVisible(cc)
{
var e = (cc.disabled == false);
if(!e) return false;
var v = (cc.style.display == "none" || (cc.CASA_td != null && cc.CASA_td.style.display == "none"));
return e && !v;
}
function C_findFrame(pwindow,target,withelements)
{
var result = null;
result = C_findFrame_2(pwindow,target,withelements);
return result;
}
function C_findFrame_2(pwindow,target,withelements)
{
try
{
if (target == "_top") return top;
if (target == "_blank") return null;
while (true)
{
if (pwindow == null)
return null;
if (withelements == true)
{
var vresult = pwindow.document.getElementById(target);
if (vresult != null)
return vresult;
}
var vframes = pwindow.frames;
for (var i=0; i<vframes.length; i++)
{
var vframe = vframes[i];
if (vframe.name == target)
return vframe;
}
var newwindow = pwindow.parent;
if (newwindow == null || newwindow == pwindow)
break;
pwindow = newwindow;
}
var vwindows = [];
var vcurrent = pwindow.top;
C_addFrames(vcurrent,vwindows);
var vout = "Elementcount = " + vwindows.length;
for (var i=0; i<vwindows.length; i++)
vout += "\n" + vwindows[i].name;
for (var i=0; i<vwindows.length; i++)
{
if (withelements == true)
{
var vresult = vwindows[i].document.getElementById(target);
if (vresult != null) return vresult;
}
else
{
if (vwindows[i].name == target) return vwindows[i];
}
}
}
catch (eexxcc)
{
return null;
}
}
function C_addFrames(pcurrent,pwindows)
{
var vframes = pcurrent.frames;
for (var i=0; i<vframes.length; i++)
{
pwindows.push(vframes[i]);
C_addFrames(vframes[i],pwindows);
}
}
function C_refreshOccuranceOfAdapter(casaocc,pLoc)
{
if(pLoc == undefined) pLoc = this;
var vs = pLoc.decodeCSVStringEMPTY(casaocc);
if (vs[0] == "CASASWI")
{
switchScreenOccuranceToSubsession(this,casaocc);
return;
}
pLoc.addLogMessage("refrehsOccuranceOfAdapter: " + casaocc);
var vsessionid = vs[1];
var vsubsessionid = vs[2];
var vadapter = vs[3];
var vmodelid = vs[4];
var vwindows = [];
var vcurrent = this.top;
C_addFrames(vcurrent,vwindows);
for (var i=0; i<vwindows.length; i++)
{
try
{
pLoc.addLogMessage("Checking " + vwindows[i].location.href);
if (vwindows == this) continue;
if (vwindows[i].m_modelName != undefined &&
vwindows[i].m_modelId != undefined &&
vwindows[i].m_sessionId != undefined &&
vwindows[i].m_processId != undefined &&
vwindows[i].m_modelName == vadapter &&
vwindows[i].m_modelId == vmodelid &&
vwindows[i].m_processId == vsubsessionid &&
vwindows[i].m_sessionId == vsessionid)
{
pLoc.addLogMessage("refrehsOccuranceOfAdapter, refreshing !!!!");
vwindows[i].refreshModel();
}
}
catch (exc)
{
}
}
}
function switchScreenOccuranceToSubsession(tt, casaswi)
{
tt.addLogMessage("refrehsOccuranceOfAdapter: " + casaswi);
var vs = tt.decodeCSVStringEMPTY(casaswi);
var vsessionid = vs[1];
var vformerssid = vs[2];
var vnewsssid= vs[3];
var vwindows = [];
var vcurrent = tt.top;
C_addFrames(vcurrent,vwindows);
for (var i=vwindows.length-1; i>=0; i--)
{
try
{
tt.addLogMessage("Checking " + vwindows[i].location.href);
if (vwindows == tt) continue;
if (vwindows[i].m_sessionId == vsessionid &&
vwindows[i].m_processId == vformerssid)
{
tt.addLogMessage("switchScreenOccuranceToSubsession, switching screen to "+vnewsssid);
vwindows[i].m_processId = vnewsssid;
vwindows[i].m_parentparent.m_currentProcessId = vnewsssid;
vwindows[i].reactOnInit();
}
}
catch (exc)
{
}
}
}
var m_refreshOccuranceQueue = [];
function C_repointFocusInScreen(casafoc)
{
this.addLogMessage("repointFocusInScreen: " + casafoc);
var vs = this.decodeCSVStringEMPTY(casafoc);
var vsubsessionid = vs[1];
var vpage = vs[2];
var vmodelid = vs[3];
var vwindows = [];
var vcurrent = this.top;
C_addFrames(vcurrent,vwindows);
for (var i=0; i<vwindows.length; i++)
{
try
{
this.addLogMessage("Checking " + vwindows[i].location.href);
if (vwindows == this) continue;
if (vwindows[i].m_processId != undefined &&
vwindows[i].m_processId == vsubsessionid &&
vwindows[i].m_modelId != undefined &&
vwindows[i].m_modelId == vmodelid &&
vwindows[i].parent != undefined &&
vwindows[i].parent.parent != undefined &&
vwindows[i].parent.parent.m_currentSSRC != undefined &&
vwindows[i].parent.parent.m_currentSSRC == vpage)
{
this.addLogMessage("repointFocusInScreen, refreshing !!!!");
vwindows[i].repointFocusInScreenExecute();
return;
}
}
catch (exc)
{
}
}
}
var m_njxWorkplaceBlocked = false;
function C_setURLInTarget(url,target)
{
try { if (target == "_top") closePopupPages(); } catch(exccccccc){}
try
{
var vDidDirectlySet = false;
var vframesetwindow = C_findFrameSetWnd(this);
if (vframesetwindow != null)
{
var vframe=C_findFrame(vframesetwindow,target);
if ( (vframe==null)&&(target!="_blank"))
{
if ( this.m_parentparent.opener != undefined && this.m_parentparent.opener != null )
vframesetwindow = C_findFrameSetWnd(this.m_parentparent.opener);
if (vframesetwindow != null) vframe = C_findFrame(vframesetwindow,target);
}
if (vframe != null)
{
if (vframe.m_currentSessionId != undefined)
{
var vstartpos = url.indexOf("servlet/StartCISPage?PAGEURL=");
if (vstartpos > 0)
{
var pathparts = url.split("/");
var webapp = null;
for (i=1;i<pathparts.length-1;i++)
{
if ( (pathparts[i] == "servlet") && (i > 1) )
{
webapp = pathparts[i-1];
if ( webapp == "." || webapp == ".." ) webapp = null;
break;
}
}
var vendpos = url.indexOf("&");
var vpage = url.substring(vstartpos+29,vendpos);
if (vpage.charAt(0) == "/")
{
if ( webapp != null ) vpage = "/" + webapp + vpage;
else vpage = ".." + vpage;
}
var vsessionid = C_findParameterInQuery(url,"SESSIONID");
var vsubsessionid = C_findParameterInQuery(url,"SUBSESSIONID");
var vmodelid = C_findParameterInQuery(url,"MODELID");
if (vmodelid == null) vmodelid = "";
if (vsessionid != null && vsubsessionid != null)
{
vDidDirectlySet = true;
vframe.pageInitParam = url.substring(vstartpos+25,url.length+1);
vpage = vpage.replace(/>Q</g,"?");
vpage = vpage.replace(/>E</g,"=");
vpage = vpage.replace(/>A</g,"&");
vframe.showPage(vpage,vmodelid,vsessionid,vsubsessionid);
}
}
}
if (vDidDirectlySet == false)
{
vframe.location.href = url;
}
return;
}
}
if (target == "_blank")
this.window.open(url);
}
catch (eexxcc) {}
}
function C_callMethodInTarget(methodName,target)
{
var vframesetwindow = C_findFrameSetWnd(this);
C_callMethodInTargetInternally(vframesetwindow,methodName,target);
}
function C_callMethodInTargetInternally(vframesetwindow,methodName,target)
{
if (vframesetwindow != null)
{
var vframe = C_findFrame(vframesetwindow,target);
if (vframe != null &&
vframe.WORKAREA != null &&
vframe.WORKAREA.csciframe != null)
{
try
{
vframe.WORKAREA.csciframe.invokeMethodInModel(methodName,true);
}
catch (eexxcc)
{
}
}
}
}
function findFrame2(win, name)
{
for (var j=0; j< win.frames.length; j++) {
if( win.frames[j].name == name ) return win.frames[j];
}
return null;
}
function findFrame(win, name)
{
var theFrame = null;
for (var j=0; j< win.frames.length; j++) {
if( win.frames[j].name == name ) return win.frames[j];
}
for (var k=0; k< win.frames.length; k++) {
theFrame = findFrame2(frames[k], name);
if (theFrame != null) return theFrame;
}
return theFrame;
}
function C_sizeTarget(pTarget,pSize)
{
try
{
var vFrame = C_findFrame(C_findFrameSetWnd(this),pTarget,true);
if ( vFrame == null ) vFrame = findFrame(top,pTarget);
if (vFrame.style == null) vFrame = vFrame.frameElement;
if (pSize == '0') vFrame.style.display = "none";
else vFrame.style.display = "";
vParentFrame = vFrame.parentNode;
var vSize;
var vIsCols;
if (vParentFrame.cols != null && vParentFrame.cols != "")
{
vSize = vParentFrame.cols;
vIsCols = true;
}
else
{
vSize = vParentFrame.rows;
vIsCols = false;
}
var vSplits = vSize.split(",");
var counter =0;
for (var j=0; j<vParentFrame.childNodes.length; j++)
{
if (vParentFrame.childNodes[j] == vFrame)
{
vSplits[counter] = "" + pSize;
break;
}
if (vParentFrame.childNodes[j].id != undefined)
counter++;
}
vSize = vSplits.join(",");
if (vIsCols == true) vParentFrame.cols = vSize;
else vParentFrame.rows = vSize;
}
catch (eexxcc) { }
}
function C_findParameterInQuery(pq,pname)
{
var vpos = pq.indexOf(pname + "=");
if (vpos < 0) return null;
pq = pq.substring(vpos+1+pname.length,pq.length);
vpos = pq.indexOf("&");
if (vpos < 0) vpos = pq.length+1;
return pq.substring(0,vpos);
}
function C_selectRowTEXTGRID(casacontrol,rowIndex, ctrlKey, shiftKey, suppressSubmit)
{
if (shiftKey == true)
{
if (this.parent.document.selection)
this.parent.document.selection.empty();
else
this.parent.window.getSelection().removeAllRanges();
}
if (!casacontrol || rowIndex < 0) return;
var vVariable = casacontrol.CASA_displayitemsprop+"["+rowIndex+"]."+casacontrol.CASA_selectprop;
this.setKeyboardFocusTEXTGRID(casacontrol, rowIndex);
if (casacontrol.CASA_selectprop != null && casacontrol.CASA_singleselect == false)
{
if (casacontrol.CASA_rowcount != null &&
casacontrol.CASA_rowcount > 0)
{
if (isWM(this) || casacontrol.CASA_collectionshiftselectprop == null)
{
this.deprecatedMultiSelectionTEXTGRID(casacontrol,rowIndex);
}
else
{
var vTopIndex = 0;
if (casacontrol.CASA_topindexprop != null)
vTopIndex = (-1) * (-1) * this.getPropertyValue(casacontrol.CASA_topindexprop);
if (casacontrol.CASA_lastselectprop != null)
{
var vTopIndex = 0;
if (casacontrol.CASA_topindexprop != null)
vTopIndex = (-1) * (-1) * this.getPropertyValue(casacontrol.CASA_topindexprop);
this.setPropertyValue(casacontrol.CASA_lastselectprop,(vTopIndex+rowIndex));
}
if (shiftKey == true && ctrlKey == false)
{
this.setPropertyValue(casacontrol.CASA_collectionshiftselectprop,(vTopIndex+rowIndex));
this.setPropertyValue(casacontrol.CASA_collectionselectprop,-1);
if (suppressSubmit != true) this.submitModel("submit");
return;
}
else if (shiftKey == false && ctrlKey == true)
{
var vCurrent = this.getPropertyValue(vVariable);
if (vCurrent == null) return;
var vNew = true;
if (vCurrent == "true" || vCurrent == true)
{
this.deselectItemTEXTGRID(casacontrol, rowIndex);
this.setPropertyValue(casacontrol.CASA_collectionselectprop,"-1");
}
else
{
this.selectItemsTEXTGRID(casacontrol, rowIndex, rowIndex);
var vSelectIndex = this.getPropertyValue(casacontrol.CASA_collectionselectprop);
if (vSelectIndex != null && vSelectIndex != -1)
this.setPropertyValue(casacontrol.CASA_collectionctrlselectprop,(vTopIndex+rowIndex));
}
if (suppressSubmit != true) this.submitModel("submit");
return;
}
else
{
var vCurrent = this.getPropertyValue(vVariable);
if (vCurrent == null) return;
this.deselectAllTEXTGRID(casacontrol);
if (vCurrent != "true" && vCurrent != true)
{
this.selectItemsTEXTGRID(casacontrol, rowIndex, rowIndex);
this.setPropertyValue(casacontrol.CASA_collectionselectprop,(vTopIndex+rowIndex));
}
if ( casacontrol.CASA_onloadbehaviour != "collection" &&
casacontrol.CASA_onloadbehaviour != "collectionorblock" )
this.setPropertyValue(casacontrol.CASA_collectionselectprop,(vTopIndex+rowIndex));
if ( casacontrol.CASA_singleselect != true && casacontrol.CASA_onclickmethod == null && casacontrol.CASA_ondblclickmethod == null)
{
if (suppressSubmit != true)
{
casacontrol.CASA_suppressModelUpdate = true;
this.submitModel("submit");
}
return;
}
}
}
}
else
{
if (shiftKey == true && ctrlKey == false)
{
var shiftSelectAnchor = -1;
for (var i0=rowIndex-1; i0>=0; i0--)
{
var vIsSelected = this.getPropertyValue(casacontrol.CASA_displayitemsprop+"["+i0+"]."+casacontrol.CASA_selectprop);
if (vIsSelected == "true" || vIsSelected == true)
{
shiftSelectAnchor = i0;
break;
}
}
if (shiftSelectAnchor == -1 || shiftSelectAnchor == rowIndex)
{
for (var i1=rowIndex-0+1-0; true; i1++)
{
var vIsSelected = this.getPropertyValue(casacontrol.CASA_displayitemsprop+"["+i1+"]."+casacontrol.CASA_selectprop);
if (vIsSelected == null) break;
if (vIsSelected == "true" || vIsSelected == true)
{
shiftSelectAnchor = i1;
break;
}
}
}
var fromIndex;
var toIndex;
if (shiftSelectAnchor < 0)
{
fromIndex = 0;
toIndex = rowIndex;
}
else if (shiftSelectAnchor < rowIndex)
{
fromIndex = shiftSelectAnchor;
toIndex = rowIndex;
}
else
{
fromIndex = rowIndex;
toIndex = shiftSelectAnchor;
}
var addIndex = -1;
if (shiftSelectAnchor < rowIndex)
{
for (var i2=shiftSelectAnchor-1; i2>=0; i2--)
{
var vIsSelected = this.getPropertyValue(casacontrol.CASA_displayitemsprop+"["+i2+"]."+casacontrol.CASA_selectprop);
if (vIsSelected == "false" || vIsSelected == false)
{
addIndex = i2+1;
break;
}
}
if (addIndex == -1)
addIndex = 0;
}
else
{
var i3=shiftSelectAnchor-0+1-0;
for (;true; i3++)
{
var vIsSelected = this.getPropertyValue(casacontrol.CASA_displayitemsprop+"["+i3+"]."+casacontrol.CASA_selectprop);
if (vIsSelected == null) break;
if (vIsSelected == "false" || vIsSelected == false)
{
addIndex = i3-1;
break;
}
}
if (addIndex == -1)
addIndex = i3-1;
}
if (addIndex != -1 && addIndex < fromIndex)
fromIndex = addIndex;
else if (addIndex != -1 && addIndex > toIndex)
toIndex = addIndex;
this.deselectAllTEXTGRID(casacontrol);
this.selectItemsTEXTGRID(casacontrol, fromIndex, toIndex);
}
else if (shiftKey == false && ctrlKey == true)
{
var vCurrent = this.getPropertyValue(vVariable);
if (vCurrent == null) return;
var vNew = true;
if (vCurrent == "true" || vCurrent == true)
this.deselectItemTEXTGRID(casacontrol, rowIndex);
else
this.selectItemsTEXTGRID(casacontrol, rowIndex, rowIndex);
}
else
{
var vCurrent = this.getPropertyValue(vVariable);
if (vCurrent == null) return;
this.deselectAllTEXTGRID(casacontrol);
if (vCurrent != "true" && vCurrent != true)
this.selectItemsTEXTGRID(casacontrol, rowIndex, rowIndex);
}
}
}
if (casacontrol.CASA_selectprop != null &&
casacontrol.CASA_singleselect == true)
{
var vCurrent = this.getPropertyValue(vVariable);
this.deselectAllTEXTGRID(casacontrol);
if (vCurrent != "true" && vCurrent != true)
this.selectItemsTEXTGRID(casacontrol, rowIndex, rowIndex);
}
if (casacontrol.CASA_lastselectprop != null)
{
var vTopIndex = 0;
if (casacontrol.CASA_topindexprop != null)
vTopIndex = (-1) * (-1) * this.getPropertyValue(casacontrol.CASA_topindexprop);
this.setPropertyValue(casacontrol.CASA_lastselectprop,(vTopIndex+rowIndex));
}
}
var m_idOnMouseUpTEXTGRID = null;
var m_ttOnMouseUpTEXTGRID = null;
var m_ccOnMouseUpTEXTGRID = null;
var m_propOnMouseUpTEXTGRID = null;
function C_startSortTimerTEXTGRID(tt,cc,colProperty)
{
m_ttOnMouseUpTEXTGRID = tt;
m_ccOnMouseUpTEXTGRID = cc;
m_propOnMouseUpTEXTGRID = colProperty;
m_idOnMouseUpTEXTGRID = tt.setTimeout("this.CL().C_reactOnMouseUpExceuteTEXTGRID()",300);
}
function C_stopSortTimerTEXTGRID()
{
m_idOnMouseUpTEXTGRID = null;
}
function C_reactOnMouseUpExceuteTEXTGRID()
{
if (m_idOnMouseUpTEXTGRID == null)
return;
m_ttOnMouseUpTEXTGRID.invokeSortTEXTGRID(m_ccOnMouseUpTEXTGRID,m_propOnMouseUpTEXTGRID);
}
function C_reactOnMouseUpTEXTGRID(cc,evt)
{
if (cc.CASA_personalizable == "false") return true;
if (this.parent.m_dragMode != true) return true;
if (this.m_dragIdTEXTGRID != cc.CASA_id) return true;
var dragTableVisible = this.m_colMoveVisTEXTGRID;
this.parent.endDrag();
var sourceIndex = this.parent.m_dragRsizable.CASA_colIndex;
var targetIndex = this.findColumnIndex(cc, evt);
if (targetIndex == undefined) return true;
if (targetIndex == sourceIndex)
{
if (dragTableVisible == true) return true;
if (targetIndex >= 0 && targetIndex < cc.CASA_colHeaders.length)
{
var colObject = cc.CASA_colHeaders[targetIndex];
if(colObject.withsorticon == undefined && colObject.withsorticon != "false")
{
var sortprop = colObject.property;
if (sortprop == null) sortprop = colObject.imageprop;
if (sortprop != null)
C_startSortTimerTEXTGRID(this, cc, sortprop);
}
}
return true;
}
var toLeft = true;
if (sourceIndex < targetIndex)
toLeft = false;
var reorderedCols = [];
for(var iii=0;iii<cc.CASA_colHeaders.length;iii++)
{
if (iii == sourceIndex)
continue;
if (iii == targetIndex && toLeft)
reorderedCols.push(cc.CASA_colHeaders[sourceIndex]);
reorderedCols.push(cc.CASA_colHeaders[iii]);
if (iii == targetIndex && !toLeft)
reorderedCols.push(cc.CASA_colHeaders[sourceIndex]);
}
cc.CASA_colHeaders = reorderedCols;
flushColumnInfos(this,cc,"reactOnGridColHeaderMove");
}
function C_selectAllLinesTEXTGRID(tt, casacontrol)
{
if (this.checkIO() == false) return;
var methodName = "processAsDefault";
if (casacontrol.CASA_selectalllinesprop != null)
{
var index = casacontrol.CASA_selectalllinesprop.indexOf("selectAllLines");
methodName =  casacontrol.CASA_selectalllinesprop.substring(0, index)+"onSelectAllLines";
}
if (casacontrol.CASA_singleselect == true || casacontrol.CASA_singleselect == "true")
{
if (casacontrol.CASA_lastselectprop != null) this.setPropertyValue(casacontrol.CASA_lastselectprop,-1);
if (casacontrol.CASA_rowcount == null || casacontrol.CASA_rowcount <= 0)
{
this.deselectAllTEXTGRID(casacontrol);
}
else
{
if (casacontrol.CASA_selectalllinesprop == null)
alert('TEXTGRID: CASA_selectalllinesprop is null. Can not deselect all lines.');
else
{
this.setPropertyValue(casacontrol.CASA_selectalllinesprop, false);
}
}
}
else
{
var vNewValue;
var selStatus = C_getSelectionStatus(tt, casacontrol);
if (casacontrol.CASA_rowcount == null || casacontrol.CASA_rowcount <= 0)
{
if (selStatus == 10 || selStatus == 30)
{
vNewValue = true;
this.selectAllTEXTGRID(casacontrol);
if (casacontrol.CASA_lastselectprop != null) this.setPropertyValue(casacontrol.CASA_lastselectprop,casacontrol.CASA_lsi);
}
else
{
vNewValue = false;
this.deselectAllTEXTGRID(casacontrol);
if (casacontrol.CASA_lastselectprop != null) this.setPropertyValue(casacontrol.CASA_lastselectprop,-1);
}
casacontrol.CASA_selectalllinespropertyvalue = vNewValue;
}
else
{
if (selStatus == 10 || selStatus == 30)
{
vNewValue = true;
this.selectAllTEXTGRID(casacontrol);
}
else
{
vNewValue = false;
this.deselectAllTEXTGRID(casacontrol);
if (casacontrol.CASA_lastselectprop != null) this.setPropertyValue(casacontrol.CASA_lastselectprop,-1);
}
this.setPropertyValue(casacontrol.CASA_selectalllinesprop, vNewValue);
this.setPropertyValue(casacontrol.CASA_collectionselectprop,-1);
}
var vStar = this.parent.document.getElementById("TG"+casacontrol.CASA_id+"TITLECELLSELECT");
if (vStar != null)
{
if (vNewValue == true)
vStar.className = "TEXTGRID"+casacontrol.CASA_stylevariant+"CellHeaderDeselectAllLines";
else
vStar.className = "TEXTGRID"+casacontrol.CASA_stylevariant+"CellHeaderSelectAllLines";
}
}
this.invokeMethodInModel(methodName);
}
function C_getSelectionStatus(tt, cc)
{
var selectedRow = false;
var unselectedRow = false;
for (i=0; true; i++)
{
var s = tt.getPropertyValue(cc.CASA_displayitemsprop+"["+i+"]."+cc.CASA_selectprop);
if (s == null) break;
if (s == true || s == "true") selectedRow = true;
else unselectedRow = true;
if (selectedRow && unselectedRow) return 10;
}
if (selectedRow) return 20;
return 30;
}
function C_deprecatedMultiSelectionTEXTGRID(casacontrol, rowIndex)
{
var vRowId = "TGROW"+casacontrol.CASA_id+"_"+rowIndex;
var vCurrent = this.getPropertyValue(casacontrol.CASA_displayitemsprop+"["+rowIndex+"]."+casacontrol.CASA_selectprop);
if (vCurrent == null) return;
var vNew = true;
if (vCurrent == "true" || vCurrent == true)
vNew = false;
this.setPropertyValue(casacontrol.CASA_arrayprop+"["+rowIndex+"]."+casacontrol.CASA_selectprop,vNew);
this.setPropertyValue(casacontrol.CASA_displayitemsprop+"["+rowIndex+"]."+casacontrol.CASA_selectprop,vNew);
var vRow = this.parent.document.getElementById(vRowId);
var vRowFC = this.parent.document.getElementById(vRowId+"FC");
if (vRow != null)
{
if (vNew == true)
{
vRow.className = "TEXTGRID"+casacontrol.CASA_stylevariant+"CellSelectedContent";
if (vRowFC != null) vRowFC.className = "TEXTGRID"+casacontrol.CASA_stylevariant+"CellSelectColumn";
}
else
{
if (rowIndex%2 == 0)
vRow.className = "TEXTGRID"+casacontrol.CASA_stylevariant+"CellContent";
else
vRow.className = "TEXTGRID"+casacontrol.CASA_stylevariant+"CellContentDark";
if (vRowFC != null) vRowFC.className = "TEXTGRID"+casacontrol.CASA_stylevariant+"CellUnselectColumn";
}
}
else
{
alert("NO ROW SELECTED");
}
}
var m_nbsp = String.fromCharCode(160);
var m_nbsps = "";
for (var i=0; i<300; i++)
m_nbsps += m_nbsp;
var m_nextPopupTitle;
function C_bufferNextPopupTitle(p) { m_nextPopupTitle = p; }
function C_getNextPopupTitleFromBuffer()
{
return C_formatPopupTitle(m_nextPopupTitle);
}
function C_formatPopupTitle(p)
{
if (p==null) return"";
return p + m_nbsps;
}
function C_openPopupPAGE(pageName,pageId,pageModal,pageFeatures,pageTitle,sessionId,subsessionId,onCloseMethod,onCloseProperty,onClosePropertyValue)
{
if (sessionId == null || sessionId == "")
{
sessionId = this.parent.parent.getCurrentSessionId();
subsessionId = this.parent.parent.getCurrentProcessId();
}
var ie11only = false;
try
{
if(pageModal != "div")
{
var browserFrameWidth = (this.parent.parent.outerWidth - this.parent.parent.innerWidth)/2;
var vi = pageFeatures.indexOf("SCRX(");
if (vi >= 0)
{
var vi2 = pageFeatures.indexOf(")",vi);
var vx = pageFeatures.substring(vi+5,vi2) * 1;
if (typeof window.screenX == "number")  vx += this.screenX + browserFrameWidth;
else vx += this.parent.parent.screenLeft;
pageFeatures = pageFeatures.substring(0,vi) + vx + pageFeatures.substring(vi2+1,pageFeatures.length);
}
vi = pageFeatures.indexOf("SCRY(");
if (vi >= 0)
{
var vi2 = pageFeatures.indexOf(")",vi);
var vy = pageFeatures.substring(vi+5,vi2) * 1;
if (typeof window.screenY == "number")  vy += this.screenY + this.parent.parent.outerHeight - this.parent.parent.innerHeight - browserFrameWidth;
else vy += this.parent.parent.screenTop;
pageFeatures = pageFeatures.substring(0,vi) + vy + pageFeatures.substring(vi2+1,pageFeatures.length);
}
vi = pageFeatures.indexOf("ie11only");
if (vi < 0 ) vi = pageFeatures.indexOf("IE11ONLY");
if (vi >=0)
{
ie11only = true;
pageFeatures = pageFeatures.replace(/ie11only:ie11only/gi,"");
pageFeatures = pageFeatures.replace(/ie11only/gi,"");
}
}
}
catch (eexxcc) {}
this.findTHISOCCUPIED().style.display = "none";
this.m_refreshPopupParams = undefined;
this.switchToDisplayPAGE();
C_bufferNextPopupTitle(pageTitle);
if(pageModal == "div")
{
var refreshIt = this.refreshModel;
this.createDIVPOPUP("../servlet/StartCISPage"+
"?PAGEURL="+pageName+
"&SESSIONID="+sessionId+
"&SUBSESSIONID="+subsessionId+
"&MODELID="+pageId+
"&ONUNLOADBEHAVIOUR=POPUPCLOSED"+
"&ISPOPUP=true",
pageFeatures,pageTitle,refreshIt);
}
else
{
if (ie11only && this.showModalDialog != undefined)
{
if (pageFeatures == null)
pageFeatures = ";help:no";
else if (pageFeatures.indexOf("help") < 0)
pageFeatures += ";help:no";
pageFeatures += ";center: yes";
C_registerPopupOpener(this);
this.showModalDialog(this.parent.parent.m_currentWebApp+
"/servlet/StartCISPage"+
"?PAGEURL="+pageName+
"&SESSIONID="+sessionId+
"&SUBSESSIONID="+subsessionId+
"&MODELID="+pageId+
"&ISPOPUP=true"+
"&ONUNLOADBEHAVIOUR=POPUPCLOSED"+
"&POPUPTITLE="+this.encodeURLParameter(pageTitle)+
"&CENTRALLIB=POP",
this.parent.parent.m_centralLib,
pageFeatures);
}
else
{
var isModal = pageModal == 'true';
var onUnloadBehaviour = "POPUPCLOSED";
var dlgLeft = pageFeatures.toLowerCase().indexOf("dialogleft");
var dlgTop = pageFeatures.toLowerCase().indexOf("dialogtop");
if (!isModal) onUnloadBehaviour = "nothing";
if ((dlgLeft == -1) || (dlgTop == -1))
{
var dlgWidth=200;
var dlgHeight=200;
var match = pageFeatures.toLowerCase().match(/dialogheight:(\w+)/);
if (match && pageFeatures.length >= 1)
{
dlgHeight = parseInt (match[1]);
}
match = pageFeatures.toLowerCase().match(/dialogwidth:(\w+)/);
if (match && pageFeatures.length >= 1)
{
dlgWidth = parseInt (match[1]);
}
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight;
var posX = (innerWidth-dlgWidth)/2;
if (window.screenX) posX += window.screenX;
if (dlgLeft == -1)  pageFeatures += ';left:'+C_adjustUnits(posX)+';';
var posY = (innerHeight-dlgHeight)/2;
if (window.screenY)
{
var browserFrameHeight = (top.outerHeight - top.innerHeight)/2;
posY += window.screenY + browserFrameHeight;
}
if (dlgTop == -1) pageFeatures += ';top:'+C_adjustUnits(posY)+';';
}
var vDName = "modal"+(new Date()).getTime();
pageFeatures = pageFeatures.replace(/;/g,",");
pageFeatures = pageFeatures.replace(/:/g,"=");
pageFeatures = pageFeatures.replace(/dialogWidth/gi,"width");
pageFeatures = pageFeatures.replace(/dialogHeight/gi,"height");
pageFeatures = pageFeatures.replace(/dialogTop/gi,"top");
pageFeatures = pageFeatures.replace(/dialogLeft/gi,"left");
pageFeatures = pageFeatures.replace(/px/g,"");
var popupurl = this.parent.parent.m_currentWebApp+
"/servlet/StartCISPage"+
"?PAGEURL="+pageName+
"&SESSIONID="+sessionId+
"&SUBSESSIONID="+subsessionId+
"&MODELID="+pageId+
"&ISPOPUP=true"+
"&ONUNLOADBEHAVIOUR="+onUnloadBehaviour+
"&POPUPTITLE="+this.encodeURLParameter(pageTitle)+
"&CENTRALLIB=POP";
var vWindow = this.parent.open(popupurl,
vDName,
"resizable=yes,status=no,"+pageFeatures);
C_registerPopupPage(vWindow, isModal);
if (!isModal) this.m_openedAmodals.push(vWindow);
this.refreshModel();
}
}
}
function findInnerWidth(elm)
{
var width = 0;
var children = elm.childNodes;
for(var iii=0;iii<children.length;iii++)
{
if (children[iii].offsetWidth > width)
width = children[iii].offsetWidth;
var innerWidth = findInnerWidth(children[iii]);
if (innerWidth > width)
width = innerWidth;
}
return width;
}
function flushColumnInfos(tt,cc,methodName)
{
var cols = cc.CASA_colHeaders;
for (var i=0;i<cols.length;i++)
{
var colprop = cols[i].property;
if (colprop == null)
colprop = cols[i].imageprop;
if (colprop != null)
{
colprop = colprop.replace(/\./g,"*dot*");
var prop = cc.CASA_griddataprop+".columnIndexFor"+colprop;
tt.setPropertyValue(prop, i);
prop = cc.CASA_griddataprop+".columnWidthFor"+colprop;
tt.setPropertyValue(prop, cols[i].width);
}
else
{
alert("No property information at textgrid column "+i);
}
}
tt.invokeMethodInModel(cc.CASA_griddataprop+"."+methodName);
}
var m_dragInfo;
function C_startDrag(dropInfo,innerHTML,evt,sourceFrame,useTT)
{
if (dropInfo != null)
{
dropInfo = dropInfo.replace(/\r/g,"");
dropInfo = dropInfo.replace(/\n/g,"");
}
m_dragInfo = new Object();
m_dragInfo.sourceFrame = sourceFrame;
m_dragInfo.innerHTML = innerHTML;
m_dragInfo.dropInfo = dropInfo;
m_dragInfo.mouseMoveCounter = 0;
m_dragInfo.startDate = new Date();
m_dragInfo.startXPos = null;
m_dragInfo.startYPos = null;
m_dragInfo.dragIconShiftLeft = 10;
m_dragInfo.dragIconShiftTop = -10;
m_dragInfo.dragDropFunction = null;
m_dragInfo.useSourceFrame = useTT;
m_dragInfo.popupPageFrame = null;
var frame = m_dragInfo.sourceFrame;
try
{
for (i=0; i<25; i++)
{
if (frame.isPopupPage == true)
{
m_dragInfo.popupPageFrame = frame;
break;
}
frame = frame.parent;
}
}
catch (exc)
{
}
}
function C_setDragShift(shiftLeft,shiftTop,dragDropFunction)
{
m_dragInfo.dragIconShiftLeft = shiftLeft;
m_dragInfo.dragIconShiftTop = shiftTop;
m_dragInfo.dragDropFunction = dragDropFunction;
}
function C_moveDrag(evt)
{
try
{
if (this.parent != null)
{
if (this.parent.document.selection)
this.parent.document.selection.empty();
else
this.parent.window.getSelection().removeAllRanges();
}
if (evt == null)
evt = window.event;
m_dragInfo.mouseMoveCounter++;
if (m_dragInfo.mouseMoveCounter > 3 && m_dragInfo.insertDragDivDone != true)
C_insertDragDiv(C_findFrameSetWnd(this));
var screenLeft = 0;
var screenTop = 0;
if (typeof window.screenX == "number")
{
screenLeft = m_dragInfo.frame.screenX;
}
else
{
screenLeft = m_dragInfo.frame.screenLeft;
}
if (typeof window.screenY == "number")
{
screenTop = m_dragInfo.frame.screenY+100;
}
else
{
screenTop = m_dragInfo.frame.screenTop;
}
if (m_dragInfo.div!=null)
{
m_dragInfo.div.style.left = C_adjustUnits((evt.screenX-screenLeft+m_dragInfo.dragIconShiftLeft));
m_dragInfo.div.style.top = C_adjustUnits((evt.screenY-screenTop+m_dragInfo.dragIconShiftTop));
}
if (m_dragInfo.startXPos == null)
{
m_dragInfo.startXPos = evt.screenX-screenLeft+m_dragInfo.dragIconShiftLeft;
m_dragInfo.startYPos = evt.screenY-screenTop+m_dragInfo.dragIconShiftTop;
}
}
catch(excc)
{
}
}
function C_endDrag(evt)
{
if (m_dragInfo != null)
{
var result = m_dragInfo.dropInfo;
if (m_dragInfo.div != null)
{
m_dragInfo.div.style.display = "none";
if (m_dragInfo.frame != null)
{
m_dragInfo.frame.document.body.removeChild(m_dragInfo.div);
}
}
if (m_dragInfo.dragDropFunction != null)
{
if (evt == null)
evt = m_dragInfo.frame.event;
var screenLeft = 0;
var screenTop = 0;
if (typeof window.screenX == "number")
{
screenLeft = m_dragInfo.frame.screenX+10-0;
}
else
{
screenLeft = m_dragInfo.frame.screenLeft;
}
if (typeof window.screenY == "number")
{
screenTop = m_dragInfo.frame.screenY+160-0;
}
else
{
screenTop = m_dragInfo.frame.screenTop
}
try
{
m_dragInfo.dragDropFunction(evt,
(m_dragInfo.frame.event.screenX-screenLeft+m_dragInfo.dragIconShiftLeft)-m_dragInfo.startXPos,
(m_dragInfo.frame.event.screenY-screenTop+m_dragInfo.dragIconShiftTop)-m_dragInfo.startYPos,
m_dragInfo.dragIconShiftLeft,
m_dragInfo.dragIconShiftTop,
result);
}
catch(excc)
{
}
}
m_dragInfo = null;
return result;
}
}
function C_insertDragDiv(pwindow)
{
m_dragInfo.insertDragDivDone = true;
var frame = null;
var vwindows = [];
var vcurrent = pwindow.top;
C_addFrames(vcurrent,vwindows);
if (m_dragInfo.useSourceFrame == true || m_dragInfo.useSourceFrame == 'true' )
{
frame = m_dragInfo.sourceFrame;
}
else
{
for (var i=0; i<vwindows.length; i++)
{
try
{
if (vwindows[i].name == "TOPWORKPLACE")
{
frame = vwindows[i];
break;
}
}catch(exc) {}
}
if (frame == null)
{
try
{
if (top.showPage != null)
{
frame = top;
}
}catch(exc) {}
}
if (frame == null)
{
frame = m_dragInfo.sourceFrame;
}
if (frame == null)
{
frame = top;
}
if (m_dragInfo.popupPageFrame != null)
{
frame = m_dragInfo.popupPageFrame;
}
}
m_dragInfo.frame = frame;
var div = frame.document.createElement("DIV");
m_dragInfo.div = div;
div.style.position = "absolute";
div.style.left = 0;
div.style.top = 0;
div.style.zIndex = 1000;
div.onmousemove = C_moveDrag;
div.onmouseup = C_endDrag;
frame.document.body.appendChild(div);
var table = frame.document.createElement("TABLE");
m_dragInfo.table = table;
table.style.position = "absolute";
table.style.left = 0;
table.style.top = 0;
table.style.zIndex = 1000;
var tBody = frame.document.createElement("TBODY");
var tRow = frame.document.createElement("TR");
var tCell = frame.document.createElement("TD");
tCell.innerHTML = m_dragInfo.innerHTML;
tRow.appendChild(tCell);
tBody.appendChild(tRow);
m_dragInfo.table.appendChild(tBody);
div.appendChild(table);
}
function C_checkIfDragProcessIsActive()
{
return m_dragInfo != null;
}
var m_lastBlurPage;
var m_openerCL;
function reactOnOpenPopupCL(opener)
{
m_openerCL = opener;
}
function reactOnBlurPageCL(page)
{
if (page.parent.m_flushMethodPAGE != null)
m_lastBlurPage = page;
}
function reactOnFocusPageCL(page)
{
if (m_openerCL != null)
{
var opener = m_openerCL;
m_openerCL = null;
var lastBlurPage = m_lastBlurPage;
m_lastBlurPage = null;
if (opener == lastBlurPage)
return;
}
if (m_lastBlurPage != null &&
m_lastBlurPage != page)
{
var lbp = m_lastBlurPage;
m_lastBlurPage = null;
lbp.invokeFlushMethodPAGE();
}
}
var m_statusbarSSWInfos = [];
var m_lastUpdateStatusbarSSW = (new Date()).getTime();
function C_addSTATUSBARSSW(sessionId, subsessionId, csciframe, cc, ccImage)
{
try
{
var href = csciframe.window.location.href;
for (var i=0; i<m_statusbarSSWInfos.length; i++)
{
var ssInfo = m_statusbarSSWInfos[i];
if (ssInfo.sessionId == sessionId &&
ssInfo.subsessionId == subsessionId &&
ssInfo.csciframe.window.location.href == href &&
ssInfo.cc.id == cc.id)
{
return;
}
}
} catch(e)
{
return;
}
var info = new Object();
info.cc = cc;
info.ccImage = ccImage;
info.sessionId = sessionId;
info.subsessionId = subsessionId;
info.csciframe = csciframe;
m_statusbarSSWInfos.push(info);
}
function C_outputMessageSSW(sessionId, subsessionId, type, shortText)
{
if (shortText == null || shortText == "")
{
var currentTime = (new Date()).getTime();
if (currentTime - m_lastUpdateStatusbarSSW < 1000)
return;
}
for(var i=0; i<m_statusbarSSWInfos.length; i++)
{
var ssInfo = m_statusbarSSWInfos[i];
if (ssInfo.sessionId == sessionId &&
ssInfo.subsessionId == subsessionId)
{
var frame = m_statusbarSSWInfos[i].csciframe;
var cc = m_statusbarSSWInfos[i].cc;
var ccImage = m_statusbarSSWInfos[i].ccImage;
try { refreshSTATUSBARSSW(frame, cc, ccImage, type, shortText); } catch (exc) { };
m_lastUpdateStatusbarSSW = (new Date()).getTime();
}
}
}
function outputFrameHierarchy(tt)
{
var vcur = tt;
var vstr = "";
var vcount = 1;
while (true)
{
vstr += "[" + vcount + "] " + vcur.location.href +" NAME="+vcur.name+"\n";
if ( vcur.frameElement )
vstr +=  " " + getTesttoolidHtml() +"="+vcur.frameElement.testtoolid+"\n";
var vtmp = vcur.parent;
if (vtmp == null) break;
if (vtmp == vcur) break;
vcur = vtmp;
vcount++;
}
alert("FRAME HIERARCHY:\n\n" + vstr);
}
function outputHotkeys(tt)
{
var vstr = "HOTKEYS\n===============================\n\n";
var ctrl = "CTRL+";
var alt = "ALT+";
var shift = "SHIFT+";
var vcount = 1;
for (var i=0; i<tt.m_hotKeys.length; i++)
{
h = tt.m_hotKeys[i];
vstr+= "("+vcount+") ";
if (h.ctrlKey == true) vstr+= ctrl;
if (h.altKey == true) vstr+= alt;
if (h.shiftKey == true) vstr+= shift;
vstr += h.keyCode+" ==> "+h.method+" (PAGE)\n";
vcount++;
}
for (var i=0; i<tt.m_hotKeysWithCallback.length; i++)
{
vstr+= "("+vcount+") ";
if (tt.m_hotKeyCode.indexOf("17")>=0) vstr+= ctrl;
if (tt.m_hotKeyCode.indexOf("18")>=0) vstr+= alt;
if (tt.m_hotKeyCode.indexOf("16")>=0) vstr+= shift;
vstr += tt.m_hotKeysWithCallback[i].keyCode;
m = ""+tt.m_hotKeysWithCallback[i].callbackMethod;
if (m.indexOf("anonymous")>0)
{
indexOfC = m.indexOf("C.");
if (indexOfC>0) vstr += " ==> "+m.substring(indexOfC, m.indexOf(")", indexOfC)+1);
else vstr += " ==> "+m;
}
else
{
vstr += " ==> "+m;
}
vstr += " (PAGE)\n";
vcount++;
}
for (var i=0; i<tt.m_hotKeysWithControlScope.length; i++)
{
vstr+= "("+vcount+") ";
h = tt.m_hotKeysWithControlScope[i];
if (h.ctrlKey == true) vstr+= ctrl;
if (h.altKey == true) vstr+= alt;
if (h.shiftKey == true) vstr+= shift;
if (h.keyCode.charAt(0) == "$")
vstr += getPropertyValue(h.keyCode);
else
vstr += h.keyCode;
vstr += " ==> "+h.method+" ("+h.controlInfo+")\n";
vcount++;
}
alert(vstr);
}
function outputTabIndexes(tt)
{
var joined = [];
for (var ccId in tt.m_tabElementsUndefined)
{
var tabElm = tt.m_tabElementsUndefined[ccId];
if (tabElm.CASA_cti < 0)
joined.push(tabElm);
}
for (var ccId in tt.m_tabElementsUndefined)
{
var tabElm = tt.m_tabElementsUndefined[ccId];
if (tabElm.CASA_cti >= 0)
joined.push(tabElm);
}
for (var i=2; true; i++)
{
var tabElm = tt.m_tabElements[i];
if (tabElm == null)
break;
joined.push(tabElm);
}
var vstr = "  CTI      TI      Control\n";
vstr += "=======================================\n";
for (var i = 0; i < joined.length; i++)
{
var cc = joined[i];
if (cc != null)
{
var s = "  "+cc.CASA_cti+"\t"+cc.CASA_tabindex+"\t"+cc.CASA_tabIndexInfo+" (";
if (cc.CASA_valueprop != null)
s += cc.CASA_valueprop;
if (cc.CASA_buttonlistprop != null)
s += cc.CASA_buttonlistprop;
if (cc.CASA_method != null)
s += cc.CASA_method;
if (cc.offsetWidth != null)
s += ";"+cc.offsetWidth;
}
vstr += s+")\n";
}
vstr += "=======================================\n";
alert(vstr);
}
function outputWorkareaBufferLog(tt)
{
var vout = "WORKAREABUFFER\n\n";
for (var i=0; i<tt.m_parentparent.m_wainfos.length; i++)
vout += tt.m_parentparent.m_wainfos[i] + "\n";
vout += "\n\*********************************************-\n";
vout += "\n\LIVING POPUPs\n\n";
var vPopups = tt.CL().m_popupPages;
for (var i=0; i<vPopups.length; i++)
{
vout +=  "["+i+"]"+vPopups[i].window.location.href+"\n\n";
}
alert(vout);
}
function outputPerformance(tt)
{
var vout = [];
vout = "Performance";
vout += "\n====================\n";
vout += "\nPage Load Start               ==> ";
vout += tt.parent.m_perfPageLoadStart.getMinutes() +'/'+ tt.parent.m_perfPageLoadStart.getSeconds() + '/' + tt.parent.m_perfPageLoadStart.getMilliseconds();
vout += "\nPage Load End                 ==> ";
vout += tt.parent.m_perfPageLoadEnd.getMinutes() + '/' + tt.parent.m_perfPageLoadEnd.getSeconds() + '/' + tt.parent.m_perfPageLoadEnd.getMilliseconds();
if ( tt.parent.m_perfPageFocusEnd != null ){
vout += "\nPage Focus Setting End        ==> ";
vout += tt.parent.m_perfPageFocusEnd.getMinutes() + '/' + tt.parent.m_perfPageFocusEnd.getSeconds() + '/' + tt.parent.m_perfPageFocusEnd.getMilliseconds();
}
vout += "\nPage Load Duration (ms)       ==> " + (tt.parent.m_perfPageLoadEnd.getTime() - tt.parent.m_perfPageLoadStart.getTime());
if ( tt.parent.m_perfPageFocusEnd != null ){
vout += "\nPage Load+Focus Duration (ms) ==> " + (tt.parent.m_perfPageFocusEnd.getTime() - tt.parent.m_perfPageLoadStart.getTime());
}
alert(vout);
}
var m_lastLogString = "not set";
var m_lastLogDate = new Date();
function outputLog(tt,pAbbreviated)
{
var vout = [];
vout.push(tt.m_sessionId+"//"+tt.m_processId+"//"+tt.m_modelId+"//"+tt.m_modelName);
if (m_lastLogString != undefined)
{
var vDate = m_lastLogDate;
vout.push("-----------------------------------------------------");
vout.push(vDate.getMinutes()+"/"+vDate.getSeconds()+"/"+vDate.getMilliseconds() + " ==> " + m_lastLogString);
vout.push("-----------------------------------------------------");
}
for (i=tt.m_logIndex-1; i>=0; i--)
{
if (pAbbreviated == true && tt.m_logStrings[i].indexOf("modellistener[") >= 0) continue;
if (pAbbreviated == true && tt.m_logStrings[i].indexOf("istenersTBP[") >= 0) continue;
var vDate = tt.m_logDates[i];
vout.push(vDate.getMinutes()+"/"+vDate.getSeconds()+"/"+vDate.getMilliseconds() + " ==> " + tt.m_logStrings[i]);
}
for (i=999; i>=tt.m_logIndex; i--)
{
if (i >= tt.m_logDates.length) break;
if (pAbbreviated == true && tt.m_logStrings[i].indexOf("modellistener[") >= 0) continue;
if (pAbbreviated == true && tt.m_logStrings[i].indexOf("istenersTBP[") >= 0) continue;
var vDate = tt.m_logDates[i];
vout.push(vDate.getMinutes()+"/"+vDate.getSeconds()+"/"+vDate.getMilliseconds() + " ==> " + tt.m_logStrings[i]);
}
vout.reverse();
var headline = vout.pop()+"\n"+vout.pop()+"\n";
while (vout.length > 0)
{
var str = headline;
for(var i=0; i<30 && vout.length > 0;i++)
{
str += vout.pop();
str += "\n";
}
if (!confirm(str)) break;
}
}
var m_wm = null;
function isWM(tt)
{
if (m_wm == null)
{
var css = tt.m_parentdocument.getElementById('casabacstylesheet').href;
if (css != null &&
css.indexOf("CIS_WM") >=0)
m_wm = true;
else
m_wm = false;
}
return m_wm;
}
var m_amn = null;
function isAMN(tt)
{
if (m_amn == null)
{
var css = tt.m_parentdocument.getElementById('casabacstylesheet').href;
if (css != null &&
css.indexOf("AMN.") >=0)
m_amn = true;
else
m_amn = false;
}
return m_amn;
}
var m_MPADIV;
var m_MPADIVOwnerFrame;
var m_MPADIVTimeout;
function romuSB(C,shortText,type, errValidationCC)
{
if (shortText != null && shortText != "")
{
if (m_MPADIV != null) romeSB();
var f = C;
if (C_findFrameSetWnd(f) != null && C_findFrameSetWnd(f).C != null) f = C_findFrameSetWnd(f).C;
m_MPADIVOwnerFrame = f;
m_MPADIV = f.findMPADIV();
m_MPADIV.CASA_ismessagepopup = true;
m_MPADIV.CASA_callbackcc = errValidationCC;
var vMsgW = 300, vMsgH = 100, vTopOffset = 50;
if(f.parent.innerHeight < (2*vTopOffset + vMsgH))
vTopOffset = (f.parent.innerHeight-vMsgH)/2;
m_MPADIV.style.top = C_adjustUnits(vTopOffset);
if (f.m_direction == 'ltr')
m_MPADIV.style.left = C_adjustUnits(((f.parent.innerWidth-vMsgW)/2));
else
m_MPADIV.style.left = C_adjustUnits((((f.parent.innerWidth-vMsgW)/2)+vMsgW));
var typeImg = "../HTMLBasedGUI/general/nothing.gif";
if (type != null && type != "") typeImg = "../HTMLBasedGUI/general/message"+type+".gif";
var tWidth = "width='"+C_adjustUnits(vMsgW)+"'";
var trWidth = "width:100%;";
if (type == "E_M" || type == "W_M" || type == "S_M")
{
tWidth = "";
trWidth = "";
}
var defAlign = 'right';
if(f.m_direction == 'rtl')
defAlign = 'left';
var vHTML = [];
vHTML.push("<table height='"+C_adjustUnits(vMsgH)+"' "+tWidth+" cellpadding=0 cellspacing=0 onmouseenter='CL.romeSB();' onmouseleave='CL.romlSB();' style='background-color:#E7EDF1; border: 1px solid #C6C6C6;'>");
vHTML.push("<tr><td colspan=2 style='height:9px;font-size:0; background-image: url(../cis/styles/images/sag_wmstatusbartitle.gif)'></td></tr>");
vHTML.push("<tr><td colspan=2 style='height:26px;' align='"+defAlign+"' valign='middle'><img style='cursor:pointer;' src='../HTMLBasedGUI/images/wm_closeone16.gif' onmouseup='CL.romdSB();' >&nbsp;</td></tr>");
vHTML.push("<tr><td style='padding-left:10px' valign='top'><img src='"+typeImg+"'/></td><td style='padding: 0 10px 10px 10px;height:100%;"+trWidth+"' class='TEXTOUTColumn' valign='top'><span class='TEXTOUTSpan' style='"+trWidth+"cursor:default'>");
vHTML.push(shortText);
vHTML.push("</span></td></tr>");
vHTML.push("</table>");
m_MPADIV.innerHTML = vHTML.join("");
m_MPADIV.style.display = "";
m_MPADIV.style.filter = "";
romlSB();
}
}
function decOpacitySB(value)
{
try
{
m_MPADIV.style.filter = "alpha(Opacity="+value+")";
value = value-10;
if (value < 0)
{
m_MPADIV.style.display= 'none';
m_MPADIV.style.filter = "";
m_MPADIV.CASA_ismessagepopup = false;
if(m_MPADIV.CASA_callbackcc != null && m_MPADIV.CASA_callbackcc.CASA_hasValidationError == true)
m_MPADIV.CASA_callbackcc.focus();
return;
}
m_MPADIVTimeout =  setTimeout("decOpacitySB("+value+")",100);
}
catch(e) {}
}
function romeSB()
{
try
{
m_MPADIV.style.filter = "";
if (m_MPADIVTimeout != null) window.clearTimeout(m_MPADIVTimeout);
m_MPADIVTimeout = null;
}
catch(e) {}
}
function romlSB()
{
try
{
m_MPADIVTimeout = setTimeout("decOpacitySB(90)",3000);
}
catch(e) {}
}
function romdSB()
{
try
{
if(m_MPADIV != null && m_MPADIV.CASA_callbackcc != null)
{
m_MPADIV.CASA_callbackcc.CASA_supresserror = true;
m_MPADIV.style.display = "none";
m_MPADIV.CASA_callbackcc.focus();
}
}
catch(e) {}
}
function buildLineInfoTREENODE(pLineInfo, ext,pOpened)
{
var vResult = [];
vResult.push("<td><img src='../HTMLBasedGUI/general/nothing.gif' width='5px' height='1px'></td>");
for(var vCounter = 0; vCounter < pLineInfo.length; vCounter++)
{
var vChar = pLineInfo.charAt(vCounter);
if (vChar == '0')
vResult.push("<td><img src='../HTMLBasedGUI/general/nothing.gif' width='15px' height='1px'></td>");
else if (vChar == '1')
vResult.push("<td style='background-image: url(../HTMLBasedGUI/images/treevline"+ext+");'><div style='width:15px'>&nbsp;</div></td>");
else if (vChar == '2')
vResult.push("<td style='background-image: url(../HTMLBasedGUI/images/treevhedge"+ext+");'><div style='width:15px'>&nbsp;</div></td>");
else
vResult.push("<td style='background-image: url(../HTMLBasedGUI/images/treehcross"+ext+");'><div style='width:15px'>&nbsp;</div></td>");
}
if(pOpened == 2) vResult.push("<td style='background-image: url(../HTMLBasedGUI/images/treehline"+ext+");'><div style='width:15px'>&nbsp;</div></td>");
return vResult.join("");
}
function romMoveIP(evt)
{
if(dragIP == null || mOffsetIP == null) return true;
var mPos = getMPosIP(evt);
dragIP.style.top = C_adjustUnits((mPos.y - mOffsetIP.y));
dragIP.style.left = C_adjustUnits((mPos.x - mOffsetIP.x));
if(dragIP.CASA_updated == false)
{
dragIP.CASA_intd.className = "INTPOPUPDragObject";
dragIP.CASA_updated = true;
}
return false;
}
function romUpIP()
{
if(dragIP == null) return true;
if(dragIP.CASA_updated == true)
{
try
{
var zoomF = C_getIE7Zoom();
var offPos = getObjPosIP(dragIP);
dragIP.CASA_incc.style.display = "none";
dragIP.CASA_incc.style.left = C_adjustUnits((offPos.x + offValIP));
dragIP.CASA_incc.style.top = C_adjustUnits((offPos.y + offValIP));
if(zoomF != 1)
{
dragIP.CASA_incc.document.parentWindow.scrollBy(1,0);
dragIP.CASA_incc.document.parentWindow.scrollBy(-1,0);
}
}
catch(ex){}
dragIP.CASA_incc.style.display = "";
}
dragIP.style.display = "none";
dragIP.CASA_incc = null;
dragIP.CASA_intd = null;
dragIP = null;
return false;
}
function C_getIE7Zoom()
{
var f = 1;
if (document.body.getBoundingClientRect)
{
var rect = document.body.getBoundingClientRect();
var pw = rect.right - rect.left;
var lw = document.body.offsetWidth;
f = Math.round((pw / lw) * 100) / 100;
}
return f;
}
function romDownIP(innerID,evt)
{
if(innerID == null||evt == null) return true;
dragIP = parent.document.getElementById("THISINTDRAG");
if(dragIP == null)
{
dragIP = parent.document.createElement("SPAN");
dragIP.id = "THISINTDRAG";
dragIP.style.position = 'absolute';
dragIP.style.zIndex = 1050;
parent.document.body.appendChild(dragIP);
}
dragIP.style.display = "";
dragIP.CASA_incc = innerID;
dragIP.style.width = C_adjustUnits((innerID.clientWidth + offValIP*2));
dragIP.style.height = C_adjustUnits((innerID.clientHeight + offValIP*2));
var offPos = getObjPosIP(innerID);
dragIP.style.left = C_adjustUnits((offPos.x - offValIP));
dragIP.style.top = C_adjustUnits((offPos.y - offValIP));
var vHtml = [];
vHtml.push("<table style='z-index:1050;' onmousemove='return romMoveIP(event);' onmouseup='return romUpIP();' cellspacing='0' cellpadding='0' >");
vHtml.push("<tr><td colspan='3' width='100%' height='"+C_adjustUnits(offValIP)+"'></td></tr>");
vHtml.push("<tr><td width='"+C_adjustUnits(offValIP)+"' height='"+C_adjustUnits((innerID.clientHeight+2))+"'></td>");
vHtml.push("<td id='THISINTDRAGFRAME' width='"+C_adjustUnits((innerID.clientWidth+2))+"'; height='"+C_adjustUnits((innerID.clientHeight+2))+"'>&nbsp;</td>");
vHtml.push("<td width='"+C_adjustUnits(offValIP)+"' height='"+C_adjustUnits((innerID.clientHeight+2))+"'></td></tr>");
vHtml.push("<tr><td colspan='3' width='100%' height='"+C_adjustUnits(offValIP)+"'></td></tr></table>");
dragIP.innerHTML = vHtml.join("");
dragIP.CASA_intd = parent.document.getElementById("THISINTDRAGFRAME");
dragIP.CASA_updated = false;
mOffsetIP = getMOffsetIP(dragIP,evt);
return false;
}
var dragIP  = null, mOffsetIP = null;
var offValIP = 400;
function getMOffsetIP(target,evt)
{
var docPos = getObjPosIP(target);
var mPos = getMPosIP(evt);
return {x:mPos.x - docPos.x, y:mPos.y - docPos.y};
}
function getObjPosIP(e)
{
var left = 0, top  = 0;
while (e.offsetParent)
{
left += e.offsetLeft; top  += e.offsetTop;
if(e == e.offsetParent) break;
e = e.offsetParent;
}
left += e.offsetLeft; top  += e.offsetTop;
return {x:left, y:top};
}
function getMPosIP(evt)
{
if(evt.pageX || evt.pageY)
{
return {x:evt.pageX, y:evt.pageY};
}
return {x:evt.clientX,y:evt.clientY};
}
var m_focusinfo = new Object();
var m_lastfocusinfo = new Object();
var m_maxUnregisterTime = 400;
var m_flushInProgress = null;
function C_unregFocusInfo(pCC)
{
if(m_focusinfo.unregisterTime == null)
m_focusinfo.unregisterTime = (new Date()).getTime();
}
function C_saveCurrFocusInfo(pCC)
{
m_lastfocusinfo.project = m_focusinfo.project;
m_lastfocusinfo.page = m_focusinfo.page;
m_lastfocusinfo.itemname = m_focusinfo.itemname;
if (pCC.CASA_flushmethod!=null)
{
m_flushInProgress = (new Date()).getTime();
}
}
function C_clearFocusInfo()
{
m_focusinfo.project = null;
m_focusinfo.page = null;
m_focusinfo.itemname = null;
m_focusinfo.unregisterTime = null;
}
function C_regFocusInfo(pCC)
{
C_updateProjectPage(pCC);
m_focusinfo.itemname = pCC.CASA_valueprop;
m_focusinfo.unregisterTime = null;
}
function C_flushFocusInfo(tt, isFlushFieldMethod)
{
if(m_focusinfo.unregisterTime != null && ((new Date()).getTime() - m_focusinfo.unregisterTime) > m_maxUnregisterTime)
C_clearFocusInfo();
var focProject = m_focusinfo.project;
var focPage = m_focusinfo.page;
var focItemName = m_focusinfo.itemname;
var lastFocused = tt.getPropertyValue("cISAddons.cursFieldLastFocused") == "true";
if (!lastFocused)
{
if (isFlushFieldMethod==true && m_lastfocusinfo.itemname==m_focusinfo.itemname && m_lastfocusinfo.page==m_focusinfo.page && m_focusinfo.project == m_lastfocusinfo.project )
focItemName=null;
}
else if (isFlushFieldMethod==true)
{
focProject  = m_lastfocusinfo.project;
focPage     = m_lastfocusinfo.page;
focItemName = m_lastfocusinfo.itemname;
}
tt.setPropertyValue("cISAddons.focusProject", focProject);
tt.setPropertyValue("cISAddons.focusPage", focPage);
tt.setPropertyValue("cISAddons.focusItemName", focItemName);
if (isFlushFieldMethod==true) m_flushInProgress=null;
}
function C_updateProjectPage(pCC)
{
m_focusinfo.project = null;
m_focusinfo.page = null;
try
{
var ssrc = pCC.ownerDocument.URL;
var pageStart = ssrc.lastIndexOf("/")+1;
var fileExtStart = ssrc.lastIndexOf(".");
if(fileExtStart < 0) fileExtStart = ssrc.length;
m_focusinfo.page = ssrc.substring(pageStart, fileExtStart);
var projectPath = ssrc.substring(0, pageStart-1);
m_focusinfo.project = projectPath.substring(projectPath.lastIndexOf("/")+1, pageStart);
}
catch(exc){	}
}
var m_svpControls = [];
function C_addSVPButton(tt, cc, visibleprop) { C_addSVPControl(tt, "button", cc, visibleprop); }
function C_addSVPIcon(tt, cc, visibleprop) { C_addSVPControl(tt, "icon", cc, visibleprop); }
function C_addSVPControl(tt, type, cc, visibleprop)
{
for (var i=0; i<m_svpControls.length; i++)
if (m_svpControls[i].cc == cc)
return;
var o = new Object();
o.tt = tt;
o.type = type;
o.cc = cc;
o.visibleprop = visibleprop;
m_svpControls[m_svpControls.length] = o;
}
function C_notifySVPControls()
{
for (var i=0; i<m_svpControls.length; i++)
{
try
{
var o = m_svpControls[i];
o.tt.setPropertyValue(o.visibleprop, "true");
if (o.type == "button")	o.tt.romuBUTTON(o.cc);
else if (o.type == "icon")	o.tt.romuICON(o.cc);
}
catch (e) {}
}
m_svpControls = [];
}
function C_findFrameSetWnd(pLoc)
{
if(pLoc == undefined) pLoc = this;
if(pLoc.m_parentparent==undefined) pLoc.m_parentparent=pLoc.parent.parent;
return pLoc.m_parentparent.parent;
}
function C_adjustUnits(elementString)
{
if (elementString == null || elementString == "")
{
return (elementString);
}
else
{
if (isNaN(elementString))
{
if (elementString == "0px")
return ("0");
else
return (elementString);
}
else
{
if (elementString != 0)
return (elementString+"px");
else
return (elementString);
}
}
}
function C_getTesttoolidHtml(val)
{
if (val == true) return "testtoolid";
return "data-testtoolid";
}
