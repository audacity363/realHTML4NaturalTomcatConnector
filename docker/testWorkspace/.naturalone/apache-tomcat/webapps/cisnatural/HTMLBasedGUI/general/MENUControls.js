function addVersionInfoMENUCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('MENUCONTROLS');
}
function initCasaControlMENU(pCC)
{
pCC.CASA_bufferedVCI = undefined;
pCC.isKeydown = 'false';
}
function clickAwayMENU(pCC)
{
closeMENU(pCC);
}
function reactOnModelUpdateMENU(pCC)
{
var mcp = pCC.CASA_menucollectionprop;
var vci = getPropertyValue(mcp+".changeIndex");
if (pCC.CASA_bufferedVCI != undefined &&
pCC.CASA_bufferedVCI == vci)
{
return;
}
pCC.CASA_bufferedVCI = vci;
pCC.CASA_isMenuSelected = "false";
pCC.CASA_tdElementPerLevel = new Array(30);
pCC.CASA_rowInfoStack = new Array(30);
refreshHeaderLineMENU(pCC, true);
}
function refreshHeaderLineMENU(pCC, romu)
{
var mcp = pCC.CASA_menucollectionprop;
var vHtml = [];
this.CL().m_contextmenuOwnerFrame = self.parent;
vHtml.push("<table cellpadding=0 cellspacing=0><tr>");
var vCounter = 0;
var vAddStyle = "";
if ( (pCC.CASA_menustyleprop != null) && (pCC.CASA_menustyle != null) )
vAddStyle = getStylePropertyValue(pCC.CASA_menustyleprop) + "; " + pCC.CASA_menustyle;
else if (pCC.CASA_menustyleprop != null)
vAddStyle = getStylePropertyValue(pCC.CASA_menustyleprop);
else
vAddStyle = pCC.CASA_menustyle;
var vSpanHeight = "";
var vTdaStyle = "";
if (pCC.CASA_height != null && pCC.CASA_height != "null")
vSpanHeight = "height: " + C_adjustUnits(pCC.CASA_height) + "; ";
if (pCC.CASA_height == null || pCC.CASA_height=="null" || pCC.CASA_height.indexOf("%") > -1)
{
var useHeight = "";
if (pCC.clientHeight != 0)
{
useHeight = pCC.clientHeight;
if (pCC.CASA_insideheader)
useHeight = useHeight-pCC.offsetTop;
}
else
{
useHeight= "100%";
}
vTdaStyle = "style='" + "height: " + C_adjustUnits(useHeight) + ";'";
}
var nodeIds = [];
pCC.CASA_itemInfos = new Object();
if (romu) removeHotKeys(pCC.id);
while (true)
{
var vBase = mcp+".items["+vCounter+"].";
var vLevel = getPropertyValue(vBase+"level");
if (vLevel == null) break;
var vText = getPropertyValue(vBase+"text");
var vInactive = this.getPropertyValue(vBase+"inactive");
var vHotkeyKeycode = getPropertyValue(vBase+"hotkeyKeycode");
if (vLevel == 0)
{
var vElementId = "CASAMENU" + pCC.CASA_id + "TOP_" + vCounter;
nodeIds.push(vElementId);
var vElement2Id = "CASAMENU" + pCC.CASA_id + "TOPTEXT_" + vCounter;
var vTDID = "CASAMENU" + pCC.CASA_id + "TD" + vCounter;
var vStyleVariant = "";
if (vInactive == true || vInactive == "true")
vStyleVariant = "Inactive";
if (romu == true && vInactive != true && vInactive != "true" && vHotkeyKeycode != null && vHotkeyKeycode != "")
{
param = new Object();
param.level = vLevel;
param.id = vElementId;
addControlBasedHotKey(pCC.id, vHotkeyKeycode.charCodeAt(0),pCC.CASA_rohkmethod,param);
}
vText = highlightHotKey(vText,vHotkeyKeycode);
var o = new Object();
o.id1 = vElementId;
o.id2 = vElementId;
o.id3 = vElementId;
o.level = 0;
o.opened = 0;
o.counter = vCounter;
o.active = !(vInactive == true || vInactive == "true");
pCC.CASA_itemInfos[vElementId] = o;
var vOnclick = "openItem"+pCC.CASA_id+"("+vCounter+", \""+vTDID+"\"); CL.C_rollOverInTopROLLOVER(C,\""+pCC.CASA_isMenuSelected+"\",\""+vElementId+"\"); CL.C_rollOverInTopTextROLLOVER(C,\""+pCC.CASA_isMenuSelected+"\",\""+vElement2Id+"\", \""+vStyleVariant+"\"); event.stopPropagation(); return false;";
var vOnmouseenter = "if("+pCC.isKeydown+" == true) { return; } CL.C_rollOverInTopROLLOVER(C,\""+pCC.CASA_isMenuSelected+"\",\""+vElementId+"\"); CL.C_rollOverInTopTextROLLOVER(C,\""+pCC.CASA_isMenuSelected+"\",\""+vElement2Id+"\", \""+vStyleVariant+"\"); C.checkOnmouseenterTopNodeMENU(\""+pCC.CASA_id+"\", "+vCounter+", \""+vTDID+"\");";
var vOnmouseleave = "C.rollOverOutTopMENU(\""+pCC.CASA_id+"\", \""+vElementId+"\"); C.rollOverOutTopTextMENU(\""+pCC.CASA_id+"\", \""+vElement2Id+"\", \""+vStyleVariant+"\");";
if (vInactive == true || vInactive == "true")
{
vOnclick = "CL.C_rollOverInTopROLLOVER(C,\""+pCC.CASA_isMenuSelected+"\",\""+vElementId+"\"); event.stopPropagation(); return false;";
vOnmouseenter = "CL.C_rollOverInTopROLLOVER(C,\""+pCC.CASA_isMenuSelected+"\",\""+vElementId+"\"); C.releaseHTMLMENU(CasaMENU"+pCC.CASA_id+", 0);";
vOnmouseleave = "C.rollOverOutTopMENU(\""+pCC.CASA_id+"\", \""+vElementId+"\"); C.rollOverOutTopTextMENU(\""+pCC.CASA_id+"\", \""+vElement2Id+"\", \""+vStyleVariant+"\");";
}
vHtml.push("<td class='TDAroundControl' "+vTdaStyle+">");
vHtml.push("<table tabindex='1' id='"+vElementId+"' onclick='"+vOnclick+"' onmouseover='"+vOnmouseenter+"' onmouseout='"+vOnmouseleave+"' class='MENUTop' style='position: relative;"+vSpanHeight+" "+vAddStyle+"' cellspacing=0 cellpadding=0>");
vHtml.push("<tr>");
vHtml.push("<td class='TDAroundControl'><img src='../HTMLBasedGUI/general/nothing.gif' width='5px'> </td>");
vHtml.push("<td id='"+vElement2Id+"' class='MENUTopTextCell"+vStyleVariant+"'><a>"+vText+"</a></td>");
vHtml.push("<td class='TDAroundControl'><img src='../HTMLBasedGUI/general/nothing.gif' width='5px'> </td>");
vHtml.push("<td id='"+vTDID+"'></td>");
vHtml.push("</tr>");
vHtml.push("</table>");
vHtml.push("</td>");
}
else
{
if (romu == true && vInactive != true && vInactive != "true" && vHotkeyKeycode != null && vHotkeyKeycode != "")
{
param = new Object();
param.level = vLevel;
param.method = pCC.CASA_menucollectionprop+".items["+vCounter+"].select";
addControlBasedHotKey(pCC.id, vHotkeyKeycode.charCodeAt(0),pCC.CASA_rohkmethod, param);
}
}
vCounter++;
}
vHtml.push("</tr></table>");
pCC.innerHTML =  vHtml.join("");
for (i=0; i<nodeIds.length; i++)
{
var o = parent.gebid(nodeIds[i]);
o.onkeydown = pCC.CASA_rokdmethod;
}
}
function highlightHotKey(text, pChar)
{
if (pChar == null || pChar.length==0) return text;
index = text.indexOf(pChar);
if (index<0)return text;
return text.substring(0,index)+"<u>"+pChar+"</u>"+text.substring(index+1, text.length);
}
function rohkMENU(cc, param)
{
if (param.level == 0)
{
var node = parent.gebid(param.id);
node.focus();
var vTDID = "CASAMENU"+cc.CASA_id+ "TD" +cc.CASA_itemInfos[node.id].counter;
openItemMENU(cc,cc.CASA_itemInfos[node.id].counter,vTDID);
rokdInternallyMENU(cc, node, 40);
}
else
{
closeMENU(cc);
invokeMethodInModel(param.method);
}
}
function rokdMENU(cc, event)
{
cc.isKeydown = true;
rokdInternallyMENU(cc,findSrcElement(event),event.keyCode);
if(event.preventDefault && event.stopPropagation)
{
event.preventDefault();
event.stopPropagation();
}
}
function rokdInternallyMENU(cc, srcElement, keyCode)
{
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
if (srcInfo.opened == 2 && srcInfo.active)
selectItemAndCloseMENU(cc,srcInfo.counter);
}
else if (keyCode == 27)
{
closeMENU(cc);
return;
}
else if (keyCode == 37)
{
if (vSrcLevel > 1)
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
releaseHTMLMENU(cc, vSrcLevel);
}
}
}
else
{
var topInfo = cc.CASA_itemInfos[cc.CASA_topElementId];
if (topInfo == null)
{
return;
}
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == 0 && o.counter < topInfo.counter)
{
if (info == null)
info = o;
else if (o.counter > info.counter)
info = o;
}
}
if (info == null)
{
var topInfo = cc.CASA_itemInfos[cc.CASA_topElementId];
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == 0)
{
if (info == null)
info = o;
else if (o.counter > info.counter)
info = o;
}
}
}
closeMENU(cc);
topNode = parent.gebid(info.id1);
var vTDID = "CASAMENU"+cc.CASA_id+ "TD" +info.counter;
openItemMENU(cc,info.counter,vTDID);
rokdInternallyMENU(cc, topNode, 40);
return;
}
}
else if (keyCode == 39)
{
if (srcInfo.opened != 2)
{
sc = parent.gebid(srcInfo.id1);
var vTDID = "CASAMENU"+cc.CASA_id+ "TD" + srcInfo.counter;
openItemMENU(cc,srcInfo.counter,vTDID);
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
if (info == null)
{
var topInfo = cc.CASA_itemInfos[cc.CASA_topElementId];
if (topInfo == null)
{
return;
}
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == 0 && o.counter > topInfo.counter)
{
if (info == null)
info = o;
else if (o.counter < info.counter)
info = o;
}
}
if (info == null)
{
var topInfo = cc.CASA_itemInfos[cc.CASA_topElementId];
for (var id in cc.CASA_itemInfos)
{
var o = cc.CASA_itemInfos[id];
if (o.level == 0)
{
if (info == null)
info = o;
else if (o.counter < info.counter)
info = o;
}
}
}
closeMENU(cc);
topNode = parent.gebid(info.id1);
var vTDID = "CASAMENU"+cc.CASA_id+ "TD" +info.counter;
openItemMENU(cc,info.counter,vTDID);
rokdInternallyMENU(cc, topNode, 40);
return;
}
}
else if (keyCode == 38)
{
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
if (vSrcLevel == 0) vSrcLevel++;
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
if (srcInfo.level != 0 && keyCode != 39)
{
if(!srcInfo.active)
styleVariant = "Inactive";
CL().C_rollOverOutImageCellROLLOVER(self,srcInfo.id1);
CL().C_rollOverOutLabelCellROLLOVER(self,srcInfo.id2);
CL().C_rollOverOutDDTextCellROLLOVER(self,srcInfo.id3,styleVariant);
}
if (info.level != 0 )
{
if(!info.active)
styleVariant = "Inactive";
CL().C_rollOverInImageCellROLLOVER(self,info.id1);
CL().C_rollOverInLabelCellROLLOVER(self,info.id2);
CL().C_rollOverInDDTextCellROLLOVER(self,info.id3,styleVariant);
}
sc = parent.gebid(info.id1);
sc.focus();
}
}
function openItemMENU(pCC, index, elementid)
{
if (checkIO() == false) return;
pCC.CASA_isMenuSelected = "true";
var vItemLevel = getPropertyValue(pCC.CASA_menucollectionprop + ".items["+index+"].level");
if (pCC.CASA_tdElementPerLevel[vItemLevel] != null)
releaseHTMLMENU(pCC, vItemLevel);
if (vItemLevel == 0)
{
var topElementIdBefore = pCC.CASA_topElementId
pCC.CASA_topElementId = "CASAMENU" + pCC.CASA_id + "TOP_" + index;
CL().C_rollOverInTopROLLOVER(self, pCC.CASA_isMenuSelected,pCC.CASA_topElementId);
if (topElementIdBefore != null)
rollOverOutTopMENU(pCC.CASA_id, topElementIdBefore);
}
if (vItemLevel == 0)
pCC.CASA_topElementId = "CASAMENU" + pCC.CASA_id + "TOP_" + index;
var vNextLevel = vItemLevel-0 + 1-0;
var vNextItemIndex = index-0 + 1-0;
if (vItemLevel == 0)
{
pCC.CASA_topIndex = index;
releaseHTMLMENU(pCC, 0);
}
var vObject = parent.document.getElementById(elementid);
vObject.level = vItemLevel;
vObject.index = index;
pCC.CASA_tdElementPerLevel[vItemLevel] = vObject;
for (id in pCC.CASA_itemInfos)
{
var srcInfo = pCC.CASA_itemInfos[id];
if(index == srcInfo.counter)
isActive = srcInfo.active;
}
if(isActive)
vObject.innerHTML = getHTMLForLevelMENU(pCC, vNextItemIndex, vNextLevel);
else
vObject.innerHTML ="";
if (vItemLevel == 0)
{
var vElementId = "CASAMENU" + pCC.CASA_id + "TOP_" + index;
vObject = parent.document.getElementById(vElementId);
pCC.CASA_itemInfos[vObject.id].opened = 2;
vObject.focus();
}
}
function getXOffsetValue(xStyle)
{
if (m_direction != "rtl")
return xStyle.offsetLeft;
else
return xStyle.offsetRight;
}
function getHTMLForLevelMENU(pCC, itemIndex, level)
{
try
{
var vHtml = [];
var vCounter = itemIndex;
var vRowInfos = [];
pCC.CASA_rowInfoStack[level] = vRowInfos;
var direction = "left";
if (m_direction == "rtl")
{
direction = "right";
}
var vImageNothing = "../HTMLBasedGUI/general/nothing.gif";
var vImageToggle = "../HTMLBasedGUI/images/textgridselect.gif";
if (pCC.CASA_toggleimageprop != null)
vImageToggle = getPropertyValue(pCC.CASA_toggleimageprop)
else
vImageToggle = pCC.CASA_toggleimage;
if (m_direction == "rtl" && vImageToggle == "../HTMLBasedGUI/images/textgridselect.gif")
vImageToggle = "../HTMLBasedGUI/images/textgridselect_rtl.gif";
var vAddStyle = "";
if ( (pCC.CASA_menustyleprop != null) && (pCC.CASA_menustyle != null) )
vAddStyle = getStylePropertyValue(pCC.CASA_menustyleprop) + "; " + pCC.CASA_menustyle;
else if (pCC.CASA_menustyleprop != null)
vAddStyle = getStylePropertyValue(pCC.CASA_menustyleprop);
else
vAddStyle = pCC.CASA_menustyle
var vOffsetTop = 0;
if (level == 1) vOffsetTop = pCC.clientHeight-3;
if (level == 1 && pCC.CASA_insideheader == false) vOffsetTop = pCC.clientHeight-1;
var vOffsetLeft = -2;
if (level == 1) vOffsetLeft = -1;
if (isSafari() == true)
{
vOffsetTop = -1;
if (level == 1) vOffsetTop = pCC.clientHeight-3;
}
else if (isFirefox() && getFirefoxVersion() <25)
{
if (isFirefox() && getFirefoxVersion() >=10)
{
vOffsetTop = pCC.clientHeight-3;
var vID = "CASAMENU"+pCC.CASA_id+ "TD" + (itemIndex-1);
var vTD = parent.document.getElementById(vID);
if (level > 1)
{
vOffsetLeft = getXOffsetValue(vTD);
vOffsetTop = vTD.offsetTop;
}
}
else if (isFirefox() && getFirefoxVersion() <10)
{
vOffsetTop = -1;
if (level == 1) vOffsetTop = pCC.clientHeight-3;
var vID = "CASAMENU"+pCC.CASA_id+ "TD" + (itemIndex-1);
var vTD = parent.document.getElementById(vID);
if (level > 1)
{
while (true)
{
vOffsetLeft += getXOffsetValue(vTD);
vOffsetTop += vTD.offsetTop;
vTD = vTD.offsetParent;
if (vTD == null || vTD == pCC)
break;
}
}
else
{
var vTopId = "CASAMENU" + pCC.CASA_id + "TOP_" + (itemIndex-1);
var vTop = parent.document.getElementById(vTopId);
vOffsetLeft = getXOffsetValue(vTop);
calculatePageOffset(vTop);
vOffsetTop = vTop.CASA_pageoffsettop+vTop.offsetHeight-0;
}
}
}
vHtml.push("<table id='MENU_OT_"+level+"' name='CASA_DD_OUTER_ELMNT' cellspacing=0 cellpadding=0 style='position: absolute; top: "+C_adjustUnits(vOffsetTop)+"; "+direction+": "+C_adjustUnits(vOffsetLeft)+"; z-index: 1000;'> ");
vHtml.push("<tr name='CASA_DD_OUTER_ELMNT'>");
vHtml.push("<td name='CASA_DD_OUTER_ELMNT'>");
if (level == 1 && m_direction == "rtl")
vHtml.push("<div style='margin=0 0 50px 50px'>");
else if (level == 1)
vHtml.push("<div style='margin=0 50px 50px 0'>");
else if (m_direction == "rtl")
vHtml.push("<div style='margin=50px 0 50px 50px'>");
else
vHtml.push("<div style='margin=50px 50px 50px 0'>");
vHtml.push("<table  id='MENU_IT_"+level+"' name='CASA_DD_TABLE' cellspacing=0 cellpadding=0  class='MENUItemTable'> ");
vHtml.push("<tr><td colspan=2 class='MENUSeparatorImgAboveCell'></td><td colspan=4 class='MENUSeparatorLabelAboveCell'></td></tr>");
while (true)
{
var vBase = pCC.CASA_menucollectionprop + ".items["+vCounter+"].";
var vLevel = getPropertyValue(vBase+"level");
if (vLevel == null) break;
if (vLevel < level) break;
if (vLevel == level)
{
var vText = getPropertyValue(vBase+"text");
var vOpened = getPropertyValue(vBase+"opened");
var vInactive = getPropertyValue(vBase+"inactive");
var vHotkeyKeycode = getPropertyValue(vBase+"hotkeyKeycode");
if (vText == "&SEPARATOR")
{
vHtml.push("<tr><td colspan=2 class='MENUSeparatorImgAboveCell' style='"+vAddStyle+"'></td><td colspan=4 class='MENUSeparatorLabelAboveCell' style='"+vAddStyle+"'></td></tr>");
vHtml.push("<tr><td colspan=6 class='MENUSeparatorFirstRow' style='"+vAddStyle+"'></td></tr>");
vHtml.push("<tr><td colspan=6 class='MENUSeparatorSecondRow' style='"+vAddStyle+"'></td></tr>");
vHtml.push("<tr><td colspan=2 class='MENUSeparatorImgBelowCell' style='"+vAddStyle+"'></td><td colspan=4 class='MENUSeparatorLabelBelowCell' style='"+vAddStyle+"'></td></tr>");
}
else
{
var vFirstImage = getPropertyValue(vBase+"image");
var vFirstImageWidth = "";
if ((vFirstImage == null)||(vFirstImage == ""))
{
vFirstImage = "../HTMLBasedGUI/general/nothing.gif";
vFirstImageWidth = "width='15px'";
}
var vId1 = "MENUIMG_L"+vLevel+"_C"+vCounter;
var vId2 = "MENULNK_L"+vLevel+"_C"+vCounter;
var vId3 = "MENUTXT_L"+vLevel+"_C"+vCounter;
var vId4A = vId2+"4A";
var vId4B = vId3+"4B";
var vId5A = vId2+"5A";
var vId5B = vId3+"5B";
var vTDID = "CASAMENU"+pCC.CASA_id+ "TD" + vCounter;
var o = new Object();
o.id1 = vId1;
o.id2 = vId2;
o.id3 = vId3;
o.level = vLevel;
o.opened = vOpened;
o.counter = vCounter;
o.active = !(vInactive == "true" || vInactive == true);
pCC.CASA_itemInfos[vId1] = o;
var vClassLinkCell = "MENUItemLabelCell";
var vClassImageCell = "MENUItemImageCell";
var vStyleVariant = "";
if (vInactive == true || vInactive == 'true')
vStyleVariant = "Inactive";
var vOnClickHandler = "";
var vOnMouseEnterHandler = "";
var vOnMouseLeaveHandler = "";
var vSecondImage;
if (vOpened != 2)
{
vOnClickHandler = "onclick='openItem"+pCC.CASA_id+"("+vCounter+", \""+vTDID+"\"); return false;'";
vOnMouseEnterHandler = "onmouseover='C.mozRolloutNodeMENU(CasaMENU"+pCC.CASA_id+", "+level+"); C.checkOnmouseenterNodeMENU(\""+pCC.CASA_id+"\", "+vLevel+", "+vCounter+"); CL.C_rollOverInImageCellROLLOVER(C,\""+vId1+"\"); CL.C_rollOverInLabelCellROLLOVER(C,\""+vId2+"\"); CL.C_rollOverInDDTextCellROLLOVER(C,\""+vId3+"\", \""+vStyleVariant+"\");'";
if (vInactive == true || vInactive == 'true')
vOnMouseEnterHandler = "onmouseover='C.mozRolloutNodeMENU(CasaMENU"+pCC.CASA_id+", "+level+"); CasaMENU"+pCC.CASA_id+".CASA_timeoutNodeCounter = "+vCounter+"; CL.C_rollOverInImageCellROLLOVER(C,\""+vId1+"\"); CL.C_rollOverInLabelCellROLLOVER(C,\""+vId2+"\"); CL.C_rollOverInDDTextCellROLLOVER(C,\""+vId3+"\", \""+vStyleVariant+"\");'";
vOnMouseLeaveHandler = "onmouseout='var vToId = null; if (event.toElement) vToId = event.toElement.name; else vToId = event.target.name; if (vToId == null) {CL.C_rollOverOutImageCellROLLOVER(C,\""+vId1+"\"); CL.C_rollOverOutLabelCellROLLOVER(C,\""+vId2+"\"); CL.C_rollOverOutDDTextCellROLLOVER(C,\""+vId3+"\", \""+vStyleVariant+"\"); return;} if (vToId == \"CASA_DD_OUTER_ELMNT\" || vToId == \"CASA_DD_TABLE\") {return;} if ((vToId.indexOf(\"CONTEXTMENUENDCELL\")>=0) || ((vToId.indexOf(\"CONTEXTMENU\")>=0) && (vToId.indexOf(\"CONTEXTMENU"+level+"\") < 0))) { return;} else { CL.C_rollOverOutImageCellROLLOVER(C,\""+vId1+"\"); CL.C_rollOverOutLabelCellROLLOVER(C,\""+vId2+"\"); CL.C_rollOverOutDDTextCellROLLOVER(C,\""+vId3+"\", \""+vStyleVariant+"\"); }'";
vSecondImage = vImageToggle;
var rowInfo = new Object();
rowInfo.imageId = vId1;
rowInfo.labelId = vId2;
rowInfo.textId = vId3;
vRowInfos.push(rowInfo);
}
else
{
vOnClickHandler = "onclick='selectItem"+pCC.CASA_id+"("+vCounter+");'";
vOnMouseEnterHandler = "onmouseover='CL.C_rollOverInImageCellROLLOVER(C,\""+vId1+"\"); CL.C_rollOverInLabelCellROLLOVER(C,\""+vId2+"\"); CL.C_rollOverInDDTextCellROLLOVER(C,\""+vId3+"\", \""+vStyleVariant+"\"); C.mozRolloutNodeMENU(CasaMENU"+pCC.CASA_id+", "+level+"); C.checkOnmouseenterEndNodeMENU(\""+pCC.CASA_id+"\", "+vLevel+");'";
vOnMouseLeaveHandler = "onmouseout='CL.C_rollOverOutImageCellROLLOVER(C,\""+vId1+"\"); CL.C_rollOverOutLabelCellROLLOVER(C,\""+vId2+"\"); CL.C_rollOverOutDDTextCellROLLOVER(C,\""+vId3+"\", \""+vStyleVariant+"\");'";
vSecondImage = vImageNothing;
}
if (vInactive == true || vInactive == 'true')
vOnClickHandler = "onclick='return false;'";
vHotKeyInfo = "";
if (vHotkeyKeycode != null && vHotkeyKeycode.length != 0)
{
if (m_hotKeyCode.indexOf("17")>=0)vHotKeyInfo+= (replaceLiteralTRANSLATION(m_language, "CTRL")+"+");
if (m_hotKeyCode.indexOf("18")>=0)vHotKeyInfo+= (replaceLiteralTRANSLATION(m_language, "ALT")+"+");
if (m_hotKeyCode.indexOf("16")>=0)vHotKeyInfo+= (replaceLiteralTRANSLATION(m_language, "SHIFT")+"+");
vHotKeyInfo += vHotkeyKeycode;
}
vHtml.push("<tr tabindex='"+itemIndex+"' id='"+vId1+"' "+vOnClickHandler+" name='CONTEXTMENU"+level+"'>");
vHtml.push("<td name='CONTEXTMENU"+level+"' class='MENUItemImageCell' style='position: relative; padding: 0' width=0><div name='CONTEXTMENUENDCELL' style='width: 1px'></div></td>");
vHtml.push("<td name='CONTEXTMENU"+level+"' id='"+vId1+"' "+vOnClickHandler+" "+vOnMouseEnterHandler+" "+vOnMouseLeaveHandler+" class='"+vClassImageCell+"' style='padding-right: 4px; "+vAddStyle+"'><img name='CONTEXTMENU"+level+"' src='" + vFirstImage + "' "+vFirstImageWidth+"></img></td>");
vHtml.push("<td name='CONTEXTMENU"+level+"' id='"+vId2+"' class='"+vClassLinkCell+"' "+vOnClickHandler+" "+vOnMouseEnterHandler+" "+vOnMouseLeaveHandler+" noWrap='true' style='"+vAddStyle+"'>");
vHtml.push("   <table name='CONTEXTMENU"+level+"' cellpadding=0 cellspacing=0 style='"+vAddStyle+"'><tr name='CONTEXTMENU"+level+"'>");
vHtml.push("   <td id='"+vId3+"' name='CONTEXTMENU"+level+"' class='MENUDropDownTextCell"+vStyleVariant+"' nowrap='true'><a name='CONTEXTMENU"+level+"'>"+vText+"</a></td>");
vHtml.push("   </tr></table>");
vHtml.push("</td>");
vHtml.push("<td name='CONTEXTMENU"+level+"' id='"+vId4A+"' class='"+vClassLinkCell+"' "+vOnClickHandler+" "+vOnMouseEnterHandler+" "+vOnMouseLeaveHandler+" noWrap='true' style='"+vAddStyle+"'>");
vHtml.push("   <table name='CONTEXTMENU"+level+"' cellpadding=0 cellspacing=0 style='"+vAddStyle+"'><tr name='CONTEXTMENU"+level+"'>");
vHtml.push("   <td id='"+vId4B+"' name='CONTEXTMENU"+level+"' class='MENUDropDownTextCell"+vStyleVariant+"' nowrap='true'><a name='CONTEXTMENU"+level+"'>"+vHotKeyInfo+"</a></td>");
vHtml.push("   </tr></table>");
vHtml.push("</td>");
vHtml.push("<td name='CONTEXTMENU"+level+"' id='"+vId5A+"' class='"+vClassLinkCell+"' "+vOnClickHandler+" "+vOnMouseEnterHandler+" "+vOnMouseLeaveHandler+" noWrap='true' style='"+vAddStyle+"'>");
vHtml.push("   <table name='CONTEXTMENU"+level+"' cellpadding=0 cellspacing=0 style='"+vAddStyle+"'><tr name='CONTEXTMENU"+level+"'>");
vHtml.push("   <td id='"+vId5B+"' name='CONTEXTMENU"+level+"' class='MENUDropDownTextCell"+vStyleVariant+"' nowrap='true'><img name='CONTEXTMENU"+level+"' src='"+vSecondImage+"'></img></td>");
vHtml.push("   </tr></table>");
vHtml.push("</td>");
vHtml.push("<td id='"+vTDID+"' name='CONTEXTMENUENDCELL' class='MENUItemLabelCell' style='position: relative; padding: 0' width=0>");
vHtml.push("</td>");
vHtml.push("</tr>");
}
}
vCounter++;
}
vHtml.push("<tr><td colspan=2 class='MENUSeparatorImgAboveCell'></td><td colspan=4 class='MENUSeparatorLabelAboveCell'></td></tr>");
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
function selectItemAndCloseMENU(pCC, index)
{
try
{
closeMENU(pCC);
var vMethod = pCC.CASA_menucollectionprop+".items["+index+"].select";
invokeMethodInModel(vMethod);
}
catch (exc)
{
}
}
function closeMENU(pCC)
{
try
{
clearTimeoutMENU(pCC);
releaseHTMLMENU(pCC, 0);
pCC.CASA_isMenuSelected = "false";
refreshHeaderLineMENU(pCC, false);
ccMENU = null;
}
catch (exc)
{
}
}
function releaseHTMLMENU(pCC, itemLevel)
{
try
{
var vOneLevelClosed = false;
for (var i=itemLevel; i <pCC.CASA_tdElementPerLevel.length; i++)
{
if (pCC.CASA_tdElementPerLevel[i] != null)
{
pCC.CASA_tdElementPerLevel[i].innerHTML = "";
pCC.CASA_tdElementPerLevel[i] = null;
vOneLevelClosed = true;
}
}
if (vOneLevelClosed == true)
{
var vRowInfos = pCC.CASA_rowInfoStack[itemLevel];
for (var j=0; j<vRowInfos.length; j++)
{
C_rollOverOutImageCellROLLOVER(self,vRowInfos[j].imageId);
C_rollOverOutLabelCellROLLOVER(self,vRowInfos[j].labelId);
C_rollOverOutDDTextCellROLLOVER(self,vRowInfos[j].textId);
}
}
}
catch (exc)
{
}
}
function checkOnmouseenterNodeMENU(casaId, level, itemIndex)
{
try
{
var cc = parent.gebid("MENU"+casaId);
if (cc.CASA_tdElementPerLevel[level] == null)
{
setTimeoutToOpenSubLevelMENU(cc, itemIndex);
}
else if (cc.CASA_tdElementPerLevel[level].index == itemIndex)
{
if (cc.CASA_tdElementPerLevel[level-0+1-0] != null)
releaseHTMLMENU(cc, level-0+1-0);
}
else
{
releaseHTMLMENU(cc, level);
setTimeoutToOpenSubLevelMENU(cc, itemIndex);
}
}
catch(exc)
{
}
}
function checkOnmouseenterEndNodeMENU(casaId, level)
{
try
{
var cc = parent.gebid("MENU"+casaId);
clearTimeoutMENU(cc);
if (cc.CASA_tdElementPerLevel[level] == null)
return;
releaseHTMLMENU(cc, level);
}
catch(exc)
{
}
}
function checkOnmouseenterTopNodeMENU(casaId, index, elementid)
{
var cc = parent.gebid("MENU"+casaId);
try
{
if ((cc.CASA_isMenuSelected == "true") && (cc.CASA_topIndex != index))
openItemMENU(cc, index, elementid);
}
catch(exc)
{
}
}
function mozRolloutNodeMENU(cc, level)
{
if (cc.CASA_timeoutNodeCounter != null)
{
var vId1 = "MENUIMG_L"+level+"_C"+cc.CASA_timeoutNodeCounter;
var vId2 = "MENULNK_L"+level+"_C"+cc.CASA_timeoutNodeCounter;
var vId3 = "MENUTXT_L"+level+"_C"+cc.CASA_timeoutNodeCounter;
CL().C_rollOverOutImageCellROLLOVER(self,vId1);
CL().C_rollOverOutLabelCellROLLOVER(self,vId2);
CL().C_rollOverOutDDTextCellROLLOVER(self,vId3, "");
cc.CASA_timeoutNodeCounter = null;
}
}
function setTimeoutToOpenSubLevelMENU(pCC, itemIndex)
{
try
{
clearTimeoutMENU(pCC);
pCC.CASA_timeoutNodeCounter = itemIndex;
pCC.CASA_timeoutId = window.setTimeout("reactOnTimeoutToOpenSubLevelMENU("+itemIndex+", "+pCC.CASA_id+")", 200);
}
catch (exc)
{
}
}
function reactOnTimeoutToOpenSubLevelMENU(itemIndex, controlid)
{
try
{
var pCC = parent.gebid("MENU"+controlid);
pCC.CASA_timeoutId = null;
openItemMENU(pCC, itemIndex, "CASAMENU"+pCC.CASA_id+"TD"+itemIndex);
}
catch (exc)
{
}
}
function clearTimeoutMENU(pCC)
{
try
{
if (pCC.CASA_timeoutId != null)
{
window.clearTimeout(pCC.CASA_timeoutId);
pCC.CASA_timeoutId = null;
}
}
catch (exc)
{
}
}
var ccMENU = null;
function rollOverOutTopMENU(ccCasaId, elementId)
{
if (ccMENU == null)
ccMENU = parent.gebid("MENU"+ccCasaId);
ccMENU.isKeydown = false;
CL().C_rollOverOutTopROLLOVER(self,elementId);
}
function rollOverOutTopTextMENU(ccCasaId, elementId, stylevarriant)
{
if (ccMENU == null)
ccMENU = parent.gebid("MENU"+ccCasaId);
ccMENU.isKeydown = false;
CL().C_rollOverOutTopTextROLLOVER(self,elementId, stylevarriant);
}
