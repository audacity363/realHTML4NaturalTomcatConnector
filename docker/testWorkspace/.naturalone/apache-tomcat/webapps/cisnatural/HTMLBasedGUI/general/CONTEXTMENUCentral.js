function addVersionInfoCONTEXTMENUCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CONTEXTMENUCENTRAL');
}
var m_tdElementPerLevel = new Array(30);
var m_rowInfoStack = new Array(30);
var m_treenodeToFocusCONTEXTMENU = null;
var m_textgridRowToFocusCONTEXTMENU = null;
var m_contextmenuOwnerFrame = null;
function openCONTEXTMENU(tt,onCloseMethod, pMarginType, pPredefinedOnClickMethod)
{
try
{
var contextMenu = tt.findTHISCONTEXTMENU();
contextMenu.CASA_cmOwnerFrame.m_contextMenuTarget = tt;
m_contextmenuOwnerFrame = contextMenu.CASA_cmOwnerFrame;
contextMenu.CASA_onCloseMethod = onCloseMethod;
var vHTML = C_getHTMLForLevelCONTEXTMENU(tt,contextMenu, 0, 0, tt.m_direction, pMarginType, pPredefinedOnClickMethod);
if (contextMenu.CASA_frameOffsetLeft != null)
{
var s = getXValue(tt, contextMenu.style);
if (s.indexOf("px") > 0) s = s.substring(0,s.length-2);
setXValue(tt, contextMenu.style, C_adjustUnits((s-0+contextMenu.CASA_frameOffsetLeft)));
s = contextMenu.style.top;
if (s.indexOf("px") > 0) s = s.substring(0,s.length-2);
contextMenu.style.top = C_adjustUnits((s-0+contextMenu.CASA_frameOffsetTop));
}
var up = false;
var middle = false;
var ownerFrame = contextMenu.CASA_cmOwnerFrame;
var ownerFrameDocument = ownerFrame.document;
var documentHeight = ownerFrame.innerHeight;
var vContextMenuHeight = 6*C_getSeparatorCountLevel0CONTEXTMENU()-0+18*C_geNodeCountLevel0CONTEXTMENU()-0;
var vContextMenuTop = contextMenu.style.top;
var vEnd = vContextMenuTop.lastIndexOf("px");
if (vEnd < 0)
vEnd = vContextMenuTop.length();
vContextMenuTop = vContextMenuTop.substring(0, vEnd);
var vAdditionOffset = 150;
if (pMarginType == "marginNone")
vAdditionOffset = 20;
if (C_getHasOneLevelOnlyCONTEXTMENU() == true)
vAdditionOffset = 20;
if (vContextMenuTop-0+vContextMenuHeight-0+vAdditionOffset-0 > documentHeight)
{
var vAdjustedTop;
if (vContextMenuTop-vContextMenuHeight-vAdditionOffset < 0)
{
middle = true;
vAdjustedTop = Math.round(documentHeight/2)-Math.round(vContextMenuHeight/2);
}
else
{
up = true;
vAdjustedTop = (vContextMenuTop-0-vContextMenuHeight-0);
}
if(vAdjustedTop < vContextMenuTop)
contextMenu.style.top = "" + C_adjustUnits(vAdjustedTop);
}
contextMenu.innerHTML = vHTML;
var XValue = getXOffsetValue(tt, contextMenu);
var vtable = ownerFrameDocument.getElementById("CASA_CM_TABLE20");
var documentWidth = ownerFrame.innerWidth;
if (XValue-0+vtable.offsetWidth+20 > documentWidth)
{
if (XValue-0 < vtable.offsetWidth-0)
{
setXValue(tt, contextMenu.style, C_adjustUnits((Math.round((documentWidth-vtable.offsetWidth)/2))));
}
else
{
reposMenuCONTEXTMENU(tt,"0");
}
}
tt.resetCheckIO();
var itemInfo = contextMenu.CASA_itemFirst;
if (up)
c = contextMenu.CASA_itemLast;
else if (middle)
itemInfo = null;
if (itemInfo != null)
{
C_rollOverInImageCellROLLOVER(tt,itemInfo.id1);
C_rollOverInLabelCellROLLOVER(tt,itemInfo.id2);
C_rollOverInCMTextCellROLLOVER(tt,itemInfo.id3);
try { ownerFrameDocument.getElementById(itemInfo.id1).focus(); } catch(e) {}
}
else
{
try { ownerFrameDocument.getElementById(contextMenu.CASA_itemFirst.id1).focus(); } catch(e) {}
}
}
catch(exc)
{
outputError(exc, 20);
}
}
function openItemCONTEXTMENU(tt,itemIndex, elementid, pMarginType, pPredefinedOnClickMethod)
{
try
{
var contextMenu = tt.findTHISCONTEXTMENU();
var vItemLevel = tt.getPropertyValue("cISContextMenuItems["+itemIndex+"].level");
if (m_tdElementPerLevel[vItemLevel] != null)
releaseHTMLCONTEXTMENU(tt,vItemLevel);
var vNextLevel = vItemLevel-0 + 1-0;
var vNextItemIndex = itemIndex-0 + 1-0;
var vObject = contextMenu.CASA_cmOwnerFrame.document.getElementById(elementid);
if (vObject != null)
{
vObject.level = vItemLevel;
vObject.index = itemIndex;
m_tdElementPerLevel[vItemLevel] = vObject;
for (id in contextMenu.CASA_itemInfos)
{
var srcInfo = contextMenu.CASA_itemInfos[id];
if(itemIndex == srcInfo.counter)
isActive = srcInfo.active;
}
if(isActive)
vObject.innerHTML = C_getHTMLForLevelCONTEXTMENU(tt, contextMenu, vNextItemIndex, vNextLevel, tt.m_direction, pMarginType, pPredefinedOnClickMethod);
else
vObject.innerHTML ="";
var ownerFrame = contextMenu.CASA_cmOwnerFrame;
var ownerFrameDocument = ownerFrame.document;
var documentWidth = ownerFrame.innerWidth;
var vOuterTable = ownerFrameDocument.getElementById("CASA_CM_TABLE"+vNextLevel)
var vInnerTable = ownerFrameDocument.getElementById("CASA_CM_TABLE2"+vNextLevel);
var vMax = getXOffsetValue(tt, contextMenu)+getXOffsetValue(tt, vOuterTable.offsetParent)+vInnerTable.offsetWidth+20;
if (vMax > documentWidth)
{
reposMenuCONTEXTMENU(tt, vNextLevel);
}
}
}
catch(exc)
{
}
}
function reposMenuCONTEXTMENU(tt,pLevel)
{
var contextMenu = tt.findTHISCONTEXTMENU();
var vOuterTable = contextMenu.CASA_cmOwnerFrame.document.getElementById("CASA_CM_TABLE"+pLevel);
var vInnerTable = contextMenu.CASA_cmOwnerFrame.document.getElementById("CASA_CM_TABLE2"+pLevel);
if (pLevel == "0")
{
setXValue(tt, vOuterTable.style, C_adjustUnits(0-vInnerTable.clientWidth+15));
}
else
{
setXValue(tt, vOuterTable.style, C_adjustUnits((0-getXOffsetValue(tt, vOuterTable.offsetParent)-vInnerTable.offsetWidth)));
}
}
function selectItemAndCloseCONTEXTMENU(tt,itemIndex, pPredefinedOnClickMethod, jsmethod )
{
try
{
var contextMenu = tt.findTHISCONTEXTMENU();
tt.m_noProcessingForNextHotKey = true;
contextMenu.CASA_onCloseMethod = null;
closeCONTEXTMENU(tt);
if (jsmethod != null && jsmethod.substr(0,11) == "javascript:")
this[jsmethod.substring(11)]();
else
{
var vMethod = "cISObjects1["+itemIndex+"].select";
if ((pPredefinedOnClickMethod != null) && (pPredefinedOnClickMethod != "undefined"))
vMethod = pPredefinedOnClickMethod+".cISContextMenuItems["+itemIndex+"].reactOnSelect";
tt.invokeMethodInModel(vMethod);
passBackFocusCONTEXTMENU(tt);
tt.blockActivities();
}
}
catch (exc)
{
}
}
function cbCopyAll()
{
if (m_ctm != null)
{
m_ctm.select();
if (document.execCommand) document.execCommand("copy");
m_ctm = null;
}
}
function cbCopyMarked()
{
if ( m_ctm != null && (typeof m_ctmStart == "number" && typeof m_ctmEnd == "number"))
{
if (m_ctm.setSelectionRange)
m_ctm.setSelectionRange(m_ctmStart, m_ctmEnd);
else
m_ctm.select();
if (document.execCommand) document.execCommand("copy");
m_ctm = null;
}
}
function cbCutAll()
{
if (m_ctm != null)
{
m_ctm.select();
if (document.execCommand) document.execCommand("cut");
m_ctm = null;
}
}
function cbCutMarked()
{
if ( m_ctm != null && (typeof m_ctmStart == "number" && typeof m_ctmEnd == "number"))
{
if (m_ctm.setSelectionRange)
m_ctm.setSelectionRange(m_ctmStart, m_ctmEnd);
else
m_ctm.select();
if (document.execCommand) document.execCommand("cut");
m_ctm = null;
}
}
function cbReplace()
{
if (m_ctm != null)
{
m_ctm.select();
if (document.execCommand) document.execCommand("paste");
m_ctm = null;
}
}
function cbReplaceMarked(){
if ( m_ctm != null && (typeof m_ctmStart == "number" && typeof m_ctmEnd == "number")) {
if (m_ctm.setSelectionRange)
m_ctm.setSelectionRange(m_ctmStart, m_ctmEnd);
else
m_ctm.select();
if (document.execCommand) document.execCommand("paste");
m_ctm = null;
}
}
function cbPasteBeforeMarked(){
if ( m_ctm != null && (typeof m_ctmStart == "number")) {
if (m_ctm.setSelectionRange)
m_ctm.setSelectionRange(m_ctmStart, m_ctmStart);
else
m_ctm.select();
if (document.execCommand) document.execCommand("paste");
m_ctm = null;
}
}
function cbPasteAfterMarked(){
if ( m_ctm != null && (typeof m_ctmEnd == "number")) {
if (m_ctm.setSelectionRange)
m_ctm.setSelectionRange(m_ctmEnd, m_ctmEnd);
else
m_ctm.select();
if (document.execCommand) document.execCommand("paste");
m_ctm = null;
}
}
function cbPasteBefore()
{
if (m_ctm != null)
{
if (m_ctm.setSelectionRange)
m_ctm.setSelectionRange(0, 0);
else
m_ctm.select();
if (document.execCommand) document.execCommand("paste");
m_ctm = null;
}
}
function cbPasteAfter()
{
if (m_ctm != null)
{
if (m_ctm.setSelectionRange)
m_ctm.setSelectionRange(m_ctm.value.length, m_ctm.value.length);
else
m_ctm.select();
if (document.execCommand) document.execCommand("paste");
m_ctm = null;
}
}
function isParentNode(parentNode, relatedTarget)
{
var isParent = false;
while((parentNode != null) && (relatedTarget != null) &&
(relatedTarget.parentNode != null))
{
if(relatedTarget == parentNode)
{
isParent = true;
break;
}
relatedTarget = relatedTarget.parentNode;
}
return isParent;
}
function cancelTimeoutCloseCONTEXTMENU(tt)
{
try
{
tt.clearTimeoutCloseDLMENU();
}
catch (exc)
{
}
}
function closeCONTEXTMENU(tt, evt)
{
try
{
var contextMenu = tt.findTHISCONTEXTMENU();
if ((contextMenu != null) &&
(evt != null) && (evt.relatedTarget != null))
{
var relatedTarget = evt.relatedTarget;
var parentNode;
if (contextMenu.CASA_cmOwnerFrame != null &&
contextMenu.CASA_cmOwnerFrame.document != null)
parentNode = contextMenu.CASA_cmOwnerFrame.document.getElementById("CASA_CM_TABLE0");
if (isParentNode(parentNode, relatedTarget) == true) return;
}
clearTimeoutCONTEXTMENU(tt,contextMenu);
releaseHTMLCONTEXTMENU(tt,0);
contextMenu.CASA_indexOfItemLastRolledOver = null;
contextMenu.style.display = "none";
if (contextMenu.CASA_onCloseMethod != null)
{
tt.invokeMethodInModel(contextMenu.CASA_onCloseMethod);
contextMenu.CASA_onCloseMethod = null;
}
}
catch (exc)
{
}
}
function passBackFocusCONTEXTMENU(tt)
{
return;
}
function releaseHTMLCONTEXTMENU(tt,itemLevel)
{
try
{
var vOneLevelClosed = false;
for (var i=itemLevel; i <m_tdElementPerLevel.length; i++)
{
if (m_tdElementPerLevel[i] != null)
{
m_tdElementPerLevel[i].innerHTML = "";
m_tdElementPerLevel[i] = null;
vOneLevelClosed = true;
}
}
if (vOneLevelClosed == true)
{
var vRowInfos = m_rowInfoStack[itemLevel];
for (var j=0; j<vRowInfos.length; j++)
{
C_rollOverOutImageCellROLLOVER(tt,vRowInfos[j].imageId);
C_rollOverOutLabelCellROLLOVER(tt,vRowInfos[j].labelId);
C_rollOverOutCMTextCellROLLOVER(tt,vRowInfos[j].textId);
}
}
}
catch (exc)
{
}
}
function rokdCONTEXTMENU(tt,evt,pMarginType, pPredefinedOnClickMethod)
{
var cc = tt.findTHISCONTEXTMENU();
rokdInternallyCONTEXTMENU(tt,cc,tt.findSrcElement(evt),evt.keyCode, pMarginType, pPredefinedOnClickMethod);
if(evt.preventDefault != null && evt.preventDefault != undefined)
{
evt.preventDefault();
evt.stopPropagation();
}
}
function rokdInternallyCONTEXTMENU(tt, cc, srcElement, keyCode, pMarginType, pPredefinedOnClickMethod)
{
var win = cc.CASA_cmOwnerFrame;
var srcInfo = cc.CASA_itemInfos[srcElement.id];
if (srcInfo == null)
{
return;
}
var vSrcLevel = srcInfo.level;
var vSrcCounter = srcInfo.counter;
var info = null;
if (keyCode == 13)
{
if (srcInfo.opened == 2)
{
selectItemAndCloseCONTEXTMENU(tt,srcInfo.counter, pPredefinedOnClickMethod);
}
}
else if (keyCode == 27)
{
closeCONTEXTMENU(tt);
passBackFocusCONTEXTMENU(tt);
return;
}
else if (keyCode == 37)
{
if (vSrcLevel > 0)
{
var firstInLevel = null;
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == vSrcLevel)
{
if (firstInLevel == null)
firstInLevel = o;
else if (o.counter < firstInLevel.counter)
firstInLevel = o;
}
}
vSrcLevel--;
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == vSrcLevel && o.counter == (firstInLevel.counter-1))
{
info = o;
releaseHTMLCONTEXTMENU(tt,vSrcLevel);
}
}
}
}
else if (keyCode == 39)
{
if (srcInfo.opened != 2)
{
sc = win.document.getElementById(srcInfo.id1);
var vTDID="CONTEXTMENUTD" + srcInfo.counter;
openItemCONTEXTMENU(tt,srcInfo.counter,vTDID,pMarginType, pPredefinedOnClickMethod);
vSrcLevel++;
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == vSrcLevel)
{
if (info == null)
info = o;
else if (o.counter < info.counter)
info = o;
}
}
}
}
else if (keyCode == 38)
{
checkLeafCONTEXTMENU(tt,cc, vSrcLevel, vSrcCounter);
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == vSrcLevel)
{
if (info == null && o.counter < vSrcCounter)
info = o;
else if (o.counter < vSrcCounter && o.counter > info.counter)
info = o;
}
}
if (info == null)
{
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == vSrcLevel)
{
if (info == null)
info = o;
else if (o.counter > info.counter)
info = o;
}
}
}
}
else if (keyCode == 40)
{
checkLeafCONTEXTMENU(tt,cc, vSrcLevel, vSrcCounter);
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == vSrcLevel)
{
if (info == null && o.counter > vSrcCounter)
info = o;
else if (o.counter > vSrcCounter && o.counter < info.counter)
info = o;
}
}
if (info == null)
{
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == vSrcLevel)
{
if (info == null)
info = o;
else if (o.counter < info.counter)
info = o;
}
}
}
}
if (info != null)
{
var styleVariant;
if (keyCode != 39)
{
if(!srcInfo.active)
styleVariant = "Inactive";
C_rollOverOutImageCellROLLOVER(tt,srcInfo.id1);
C_rollOverOutLabelCellROLLOVER(tt,srcInfo.id2);
C_rollOverOutCMTextCellROLLOVER(tt,srcInfo.id3,styleVariant);
}
var styleVariant;
if(!info.active)
styleVariant ="Inactive";
C_rollOverInImageCellROLLOVER(tt,info.id1);
C_rollOverInLabelCellROLLOVER(tt,info.id2);
C_rollOverInCMTextCellROLLOVER(tt,info.id3,styleVariant);
var sc = win.document.getElementById(info.id1);
if (sc == null)
{
var str = info.id1+"\n";
for (var id in cc.CASA_itemInfos)
{
str += "["+id+"]";
for (var innerId in cc.CASA_itemInfos[id])
{
if (innerId == "text") str += " "+cc.CASA_itemInfos[id][innerId];
}
str += "\n";
}
alert(str);
}
else
sc.focus();
}
}
function onmouseenterNodeCONTEXTMENU(tt,ccId, level, itemIndex, TDId, pMarginType, pPredefinedOnClickMethod)
{
var cc ;
var contextMenu = tt.findTHISCONTEXTMENU();
var win = contextMenu.CASA_cmOwnerFrame;
cc = win.document.getElementById(ccId);
try
{
if (m_tdElementPerLevel[level] == null)
{
setTimeoutToOpenSubLevelCONTEXTMENU(tt, cc, itemIndex, TDId, pMarginType, pPredefinedOnClickMethod);
}
else if (m_tdElementPerLevel[level].index == itemIndex)
{
if (m_tdElementPerLevel[level-0+1-0] != null)
releaseHTMLCONTEXTMENU(tt,level-0+1-0);
}
else
{
releaseHTMLCONTEXTMENU(tt,level);
setTimeoutToOpenSubLevelCONTEXTMENU(tt, cc, itemIndex, TDId, pMarginType, pPredefinedOnClickMethod);
}
}
catch(exc)
{
}
}
function checkLeafCONTEXTMENU(tt,ccId, level, itemIndex)
{
try
{
ccId.CASA_indexOfItemLastRolledOver = itemIndex;
clearTimeoutCONTEXTMENU(tt,ccId);
if (m_tdElementPerLevel[level] == null)
return;
releaseHTMLCONTEXTMENU(tt,level);
}
catch(exc)
{
}
}
var m_reactOnTimeoutToOpenSubLevelCONTEXTMENU;
function setTimeoutToOpenSubLevelCONTEXTMENU(tt,contextMenu, itemIndex, TDId, pMarginType, pPredefinedOnClickMethod)
{
try
{
clearTimeoutCONTEXTMENU(tt,contextMenu);
m_reactOnTimeoutToOpenSubLevelCONTEXTMENU = tt;
contextMenu.CASA_timeoutId = self.setTimeout( "self.reactOnTimeoutToOpenSubLevelCONTEXTMENU("+itemIndex+", \""+TDId+"\", \""+pMarginType+"\" , \""+pPredefinedOnClickMethod+"\" )", 300 );
}
catch (exc)
{
}
}
function reactOnTimeoutToOpenSubLevelCONTEXTMENU(itemIndex, TDId,pMarginType, pPredefinedOnClickMethod)
{
try
{
var tt = m_reactOnTimeoutToOpenSubLevelCONTEXTMENU;
var vContextMenu = tt.findTHISCONTEXTMENU();
vContextMenu.CASA_timeoutId = null;
openItemCONTEXTMENU(tt,itemIndex, TDId,pMarginType, pPredefinedOnClickMethod);
}
catch (exc)
{
}
}
function clearTimeoutCONTEXTMENU(tt,contextMenu)
{
try
{
contextMenu = tt.findTHISCONTEXTMENU();
if (contextMenu.CASA_timeoutId != null && contextMenu.CASA_timeoutId != undefined)
{
self.clearTimeout(contextMenu.CASA_timeoutId);
contextMenu.CASA_timeoutId = null;
}
}
catch (exc)
{
}
}
var m_separatorCountLevel0 = 0;
function C_getSeparatorCountLevel0CONTEXTMENU()
{
return m_separatorCountLevel0;
}
var m_nodeCountLevel0 = 0;
function C_geNodeCountLevel0CONTEXTMENU()
{
return m_nodeCountLevel0;
}
var m_hasOneLevelOnly = true;
function C_getHasOneLevelOnlyCONTEXTMENU()
{
return m_hasOneLevelOnly;
}
function C_filterIdStrCM(vText)
{
if(vText == null) return null;
var res = vText.replace(/&quot;/g,'@DQ@');
res = res.replace(/"/g, '@DQ@');
res = res.replace(/'/g, '@SQ@');
return res;
}
function getOffsetTopCM(pMarginType)
{
if (pMarginType == "marginNone")
return (-1 -5);
else
return (-1 -50);
}
function getMarginRTLCM(pMarginType)
{
if (pMarginType == "marginNone")
return "margin: 5px -1px 20px 20px";
else
return "margin: 50px 0 50px 50px";
}
function getMarginCM(pMarginType)
{
if (pMarginType == "marginNone")
return "margin: 5px 20px 20px -1px";
else
return "margin: 50px 50px 50px 0";
}
function C_getHTMLForLevelCONTEXTMENU(tt,contextMenu, itemIndex, level, pDir, pMarginType, pPredefinedOnClickMethod)
{
try
{
var vHtml = [];
var vCounter = itemIndex;
var vRowInfos = [];
m_rowInfoStack[level] = vRowInfos;
var isCentralCM = contextMenu.CASA_iscentralCM;
if (level == 0)
{
m_separatorCountLevel0 = 0;
m_nodeCountLevel0 = 0;
m_hasOneLevelOnly = true;
contextMenu.CASA_itemInfos = new Object();
}
var itemInfos = new Object();
for (var id in contextMenu.CASA_itemInfos)
if (contextMenu.CASA_itemInfos[id].level < level)
itemInfos[id] = contextMenu.CASA_itemInfos[id];
contextMenu.CASA_itemInfos = itemInfos;
var vImageNothing = "../HTMLBasedGUI/general/nothing5x15.gif";
var vImageToggle = "../HTMLBasedGUI/images/textgridselect.gif";
if (isWM(tt)) vImageToggle = "../HTMLBasedGUI/images/contextMenuArrowWM.gif";
var direction = "left";
if (pDir == "rtl")
{
direction = "right";
vImageToggle = "../HTMLBasedGUI/images/textgridselect_rtl.gif";
}
if (contextMenu.CASA_toggleimageprop != null)
vImageToggle = tt.getPropertyValue(contextMenu.CASA_toggleimageprop)
var functionPrefix = "C.CL().";
var functionParam = "self.C";
if(isCentralCM)
{
functionPrefix = "self.m_contextMenuTarget.CL().";
functionParam = "self.m_contextMenuTarget";
}
var vOnMozillaEnterLeave = "";
if (level == 0) vOnMozillaEnterLeave = "onmouseout='"+functionPrefix+"closeCONTEXTMENU("+functionParam+",event);' onmouseover='"+functionPrefix+"cancelTimeoutCloseCONTEXTMENU("+functionParam+");'";
var vOffsetLeft = 0;
if (level == 0)
vOffsetLeft = -2;
else
{
vOffsetLeft = 2;
}
var vOffsetTop = getOffsetTopCM(pMarginType);
vHtml.push("<table id='CASA_CM_TABLE"+level+"' name='CASA_CM_OUTER_ELMNT' cellspacing=0 cellpadding=0 style='position: absolute; top: "+C_adjustUnits(vOffsetTop)+"; "+direction+": "+C_adjustUnits(vOffsetLeft)+"; z-index: 1000;'> ");
vHtml.push("<tr "+vOnMozillaEnterLeave+" name='CASA_CM_OUTER_ELMNT'>");
vHtml.push("<td name='CASA_CM_OUTER_ELMNT'>");
var vMargin = "";
if(pDir == "rtl")
vMargin = getMarginRTLCM(pMarginType);
else
vMargin = getMarginCM(pMarginType);
vHtml.push("<div style='"+vMargin+"'>");
vHtml.push("<table tabindex='1' id='CASA_CM_TABLE2"+level+"' name='CASA_CM_TABLE' cellspacing=0 cellpadding=0  class='MENUItemTable' oncontextmenu='return false;' onkeydown='try { CL.rokdCONTEXTMENU(C,event,\""+pMarginType+"\", \"" + pPredefinedOnClickMethod + "\"); } catch(exccc) { }'>");
var isTitle = false;
while (true)
{
var vBase = "cISContextMenuItems["+vCounter+"].";
var vLevel = tt.getPropertyValue(vBase+"level");
if (vLevel == null) break;
if (vLevel < level) break;
if (vLevel == level)
{
var vText = tt.getPropertyValue(vBase+"text");
var vJs = tt.getPropertyValue(vBase+"jsmethod");
var vOpened = tt.getPropertyValue(vBase+"opened");
if (vText == "&SEPARATOR")
{
if (level == 0) m_separatorCountLevel0++;
var vOnMouseLeaveHandler = "onmouseout='event.stopPropagation();'";
vHtml.push("<tr><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=2 class='MENUSeparatorImgAboveCell'></td><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=2 class='MENUSeparatorLabelAboveCell'></td></tr>");
vHtml.push("<tr><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=4 class='MENUSeparatorFirstRow'></td></tr>");
vHtml.push("<tr><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=4 class='MENUSeparatorSecondRow'></td></tr>");
vHtml.push("<tr><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=2 class='MENUSeparatorImgBelowCell'></td><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=2 class='MENUSeparatorLabelBelowCell'></td></tr>");
}
else if (vText.indexOf("&TITLE") == 0)
{
isTitle = true;
vText = vText.substring(6,vText.length)+"&nbsp;&nbsp;";
var vOnMouseLeaveHandler = "onmouseout='event.stopPropagation();'";
vHtml.push("<tr><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=40 width='100%'><span style='width:100%;text-align:center;font-weight:bold;font-size:10px' class='MENUItemImageCell'>"+vText+"</span></td></tr>");
vHtml.push("<tr><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=4 class='MENUSeparatorFirstRow'></td></tr>");
vHtml.push("<tr><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=2 class='MENUSeparatorImgBelowCell'></td><td oncontextmenu='event.returnValue=false;' "+vOnMouseLeaveHandler+" colspan=2 class='MENUSeparatorLabelBelowCell'></td></tr>");
}
else
{
if (level == 0) m_nodeCountLevel0++;
var vFirstImage = tt.getPropertyValue(vBase+"image");
var vFirstImageWidth = "";
if ((vFirstImage == null)||(vFirstImage == ""))
{
vFirstImage = "../HTMLBasedGUI/general/nothing.gif";
vFirstImageWidth = "width='15px'";
}
var isDefaultNode = tt.getPropertyValue(vBase+"isDefaultNode");
if (isDefaultNode == "true")
vText = "<b>"+vText+"</b>";
var vInactive = tt.getPropertyValue(vBase+"inactive");
var vId1 = "CONTEXTMENUIMAGE_"+C_filterIdStrCM(vText)+"_"+vLevel+"_"+vCounter;
var vId2 = "CONTEXTMENULINK_"+C_filterIdStrCM(vText)+"_"+vLevel+"_"+ vCounter;
var vId3 = "CONTEXTMENUTEXT_"+C_filterIdStrCM(vText)+"_"+vLevel+"_"+ vCounter;
var o = new Object();
o.id1 = vId1;
o.id2 = vId2;
o.id3 = vId3;
o.level = vLevel;
o.opened = vOpened;
o.counter = vCounter;
o.active = !(vInactive == "true" || vInactive == true);
o.text = vText;
contextMenu.CASA_itemInfos[o.id1] = o;
if (level == 0 && vCounter == 0)
contextMenu.CASA_itemFirst = o;
else if(isTitle && vCounter == 1)
{
contextMenu.CASA_itemFirst = o;
isTitle = false;
}
if (level == 0)
contextMenu.CASA_itemLast = o;
var vTDID = "CONTEXTMENUTD" + vCounter;
var vClassLinkCell = "MENUItemLabelCell";
var vClassImageCell = "MENUItemImageCell";
var vClassTextCell = "MENUTextCell";
var vStyleVariant = "";
if (vInactive == true || vInactive == "true")
vStyleVariant = "Inactive";
var vOnClickHandler = "";
var vOnMouseEnterHandler = "";
var vOnMouseLeaveHandler = "";
var vOnKeyDownHandler = "onkeydown='"+functionPrefix+"rokdCONTEXTMENU("+functionParam+",event,\""+pMarginType+"\" , \"" + pPredefinedOnClickMethod + "\");'";
var vSecondImage;
if (vOpened != 2)
{
vOnClickHandler = "onclick='try { "+functionPrefix+"openItemCONTEXTMENU("+functionParam+","+vCounter+", \""+vTDID+"\",\""+pMarginType+"\" , \"" + pPredefinedOnClickMethod + "\" ); C.m_avoidClickAway = true; return false; } catch(exccc) { }'";
vOnMouseEnterHandler = "onmouseover='try { "+functionPrefix+"onmouseenterNodeCONTEXTMENU("+functionParam+",\""+contextMenu.id+"\", "+vLevel+", "+vCounter+", \""+vTDID+"\",\""+pMarginType+"\" , \"" + pPredefinedOnClickMethod + "\"); "+functionPrefix+"C_rollOverInImageCellROLLOVER("+functionParam+",\""+vId1+"\"); "+functionPrefix+"C_rollOverInLabelCellROLLOVER("+functionParam+",\""+vId2+"\"); "+functionPrefix+"C_rollOverInCMTextCellROLLOVER("+functionParam+",\""+vId3+"\", \""+vStyleVariant+"\"); } catch(exccc) { }'";
if (vInactive == true || vInactive == 'true')
vOnMouseEnterHandler = "onmouseover='try { "+functionPrefix+"C_rollOverInImageCellROLLOVER("+functionParam+",\""+vId1+"\"); "+functionPrefix+"C_rollOverInLabelCellROLLOVER("+functionParam+",\""+vId2+"\"); "+functionPrefix+"C_rollOverInCMTextCellROLLOVER("+functionParam+",\""+vId3+"\", \""+vStyleVariant+"\"); } catch(exccc) { }'";
vOnMouseLeaveHandler = "onmouseout='try {"+functionPrefix+"clearTimeoutCONTEXTMENU("+functionParam+",null); event.stopPropagation(); var vToId = null; if (event.toElement) vToId = event.toElement.name; else vToId = event.target.name; if (vToId == null) {"+functionPrefix+"C_rollOverOutImageCellROLLOVER("+functionParam+",\""+vId1+"\"); "+functionPrefix+"C_rollOverOutLabelCellROLLOVER("+functionParam+",\""+vId2+"\"); "+functionPrefix+"C_rollOverOutCMTextCellROLLOVER("+functionParam+",\""+vId3+"\", \""+vStyleVariant+"\"); return;} if (vToId == \"CASA_CM_OUTER_ELMNT\" || vToId == \"CASA_CM_TABLE\") {return;} if ((vToId.indexOf(\"CONTEXTMENUENDCELL\")>=0) || (event.target && event.target.offsetWidth==5) || ((vToId.indexOf(\"CONTEXTMENU\")>=0) && (vToId.indexOf(\"CONTEXTMENU"+level+"\") < 0))) { return;} else { "+functionPrefix+"C_rollOverOutImageCellROLLOVER("+functionParam+",\""+vId1+"\"); "+functionPrefix+"C_rollOverOutLabelCellROLLOVER("+functionParam+",\""+vId2+"\"); "+functionPrefix+"C_rollOverOutCMTextCellROLLOVER("+functionParam+",\""+vId3+"\", \""+vStyleVariant+"\"); } } catch(exccc) { }'";
vSecondImage = vImageToggle;
var rowInfo = new Object();
rowInfo.imageId = vId1;
rowInfo.labelId = vId2;
rowInfo.textId = vId3;
vRowInfos.push(rowInfo);
if (level == 0) m_hasOneLevelOnly = false;
}
else
{
vOnClickHandler = "onclick='"+functionPrefix+"selectItemAndCloseCONTEXTMENU("+functionParam+","+vCounter+"," +"\"" + pPredefinedOnClickMethod + "\",\"" + vJs +"\"); '";
if (tt.parent.m_dragMode == true)
vOnClickHandler = "onmouseup='"+functionPrefix+"selectItemAndCloseCONTEXTMENU("+functionParam+","+vCounter+","+"\"" + pPredefinedOnClickMethod + "\",\"" + vJs +"\"); '";
vOnMouseEnterHandler = "onmouseover='"+functionPrefix+"C_rollOverInImageCellROLLOVER("+functionParam+",\""+vId1+"\"); "+functionPrefix+"C_rollOverInLabelCellROLLOVER("+functionParam+",\""+vId2+"\"); "+functionPrefix+"C_rollOverInCMTextCellROLLOVER("+functionParam+",\""+vId3+"\", \""+vStyleVariant+"\"); "+functionPrefix+"checkLeafCONTEXTMENU("+functionParam+",\""+contextMenu.id+"\", "+vLevel+", "+vCounter+");'";
vOnMouseLeaveHandler = "onmouseout='event.stopPropagation(); "+functionPrefix+"C_rollOverOutImageCellROLLOVER("+functionParam+",\""+vId1+"\"); "+functionPrefix+"C_rollOverOutLabelCellROLLOVER("+functionParam+",\""+vId2+"\"); "+functionPrefix+"C_rollOverOutCMTextCellROLLOVER("+functionParam+",\""+vId3+"\", \""+vStyleVariant+"\");'";
vSecondImage = vImageNothing;
}
if (vInactive == true || vInactive == 'true')
vOnClickHandler = "onclick='event.stopPropagation(); return false;'";
vHtml.push("<tr name='CONTEXTMENU"+level+"' id='"+vId1+"' tabindex='1' "+vOnClickHandler+"  "+vOnKeyDownHandler+">");
vHtml.push("<td oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"' class='MENUItemImageCell' style='position: relative; padding: 0' width='1px'><div name='CONTEXTMENUENDCELL' style='width: 1px'></div></td>");
vHtml.push("<td oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"' id='"+vId1+"' "+vOnClickHandler+" "+vOnMouseEnterHandler+" "+vOnMouseLeaveHandler+" class='"+vClassImageCell+"' style='padding-right: 4px'><img oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"' src='" + vFirstImage + "' "+vFirstImageWidth+"></img></td>");
vHtml.push("<td oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"' id='"+vId2+"' class='"+vClassLinkCell+"' "+vOnClickHandler+" "+vOnMouseEnterHandler+" "+vOnMouseLeaveHandler+" noWrap='true'>");
vHtml.push("   <table name='CONTEXTMENU"+level+"'  cellpadding=0 cellspacing=0><tr>");
vHtml.push("   <td oncontextmenu='event.returnValue=false;' id='"+vId3+"' name='CONTEXTMENU"+level+"' class='MENUTextCell"+vStyleVariant+"' width='100%' noWrap='true'><a oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"'>"+vText+"</a></td>");
vHtml.push("   <td oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"'><img oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"' src='"+vSecondImage+"'></img></td>");
vHtml.push("   <td oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"'><img oncontextmenu='event.returnValue=false;' name='CONTEXTMENU"+level+"' src='"+vImageNothing+"' width=5px></img></td>");
vHtml.push("   </tr></table>");
vHtml.push("</td>");
vHtml.push("<td id='"+vTDID+"' name='CONTEXTMENUENDCELL' class='MENUItemLabelCell' style='position: relative; padding: 0' width=0>");
vHtml.push("</td>");
vHtml.push("</tr>");
}
}
vCounter++;
}
vHtml.push("</table>");
vHtml.push("</div>");
vHtml.push("</td>");
vHtml.push("</tr>");
vHtml.push("</table>");
return vHtml.join("");
}
catch (exc)
{
return "";
}
}
function setXValue(tt, xStyle, xValue)
{
if (tt.m_direction != "rtl")	{
xStyle.left=xValue;
} else {
xStyle.right=xValue;
}
}
function getXValue(tt, xStyle)
{
if (tt.m_direction != "rtl")
return xStyle.left;
else
return xStyle.right;
}
function getXOffsetValue(tt, xStyle)
{
return Math.abs(xStyle.offsetLeft);
}
