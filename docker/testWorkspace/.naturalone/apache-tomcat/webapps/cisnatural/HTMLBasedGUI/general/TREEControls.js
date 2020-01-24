function addVersionInfoTREECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TREECONTROLS');
}
function initCasaControlTREENODE(cc)
{
cc.CASA_memMarked = undefined;
cc.CASA_memLevel = undefined;
cc.CASA_memOpened = undefined;
cc.CASA_memText = undefined;
cc.CASA_memImage = undefined;
cc.CASA_memChangeindex = undefined;
cc.CASA_memLineInfo = undefined;
cc.CASA_memShowTextInput = undefined;
cc.CASA_memDirection = undefined;
cc.CASA_memInactive = undefined;
}
function reactOnModelUpdateTREENODE(casacontrol)
{
var vLevel = getPropertyValue(casacontrol.CASA_levelprop) * 20;
var vOpened = getPropertyValue(casacontrol.CASA_openedprop);
var vText = getPropertyValue(casacontrol.CASA_textprop);
var vIndex = getPropertyValue(casacontrol.CASA_indexprop);
var vChangeIndex = getPropertyValue(casacontrol.CASA_changeindexprop);
var vImage = null;
if (casacontrol.CASA_imageprop != null)
vImage = getPropertyValue(casacontrol.CASA_imageprop);
var vLineInfo = null;
if (casacontrol.CASA_lineinfoprop != null)
vLineInfo = getPropertyValue(casacontrol.CASA_lineinfoprop);
var imageExt = ".gif";
if (m_direction == "rtl")
imageExt = "_rtl.gif";
var vMarked = false;
if (vIndex != null && vIndex == casacontrol.CASA_index)
vMarked = true;
var vSelection = [];
if (casacontrol.CASA_arrayprop != null)
{
var vSelectionCounter = 0;
while (true)
{
var vSelIndex = getPropertyValue(casacontrol.CASA_arrayprop+".selectedItemIndices["+vSelectionCounter+"].index");
if (vSelIndex == null) break;
vSelection.push(vSelIndex);
vSelectionCounter++;
}
}
for(vSelCheck=0; vSelCheck < vSelection.length; vSelCheck++)
if (vSelection[vSelCheck] == casacontrol.CASA_index)
{
vMarked = true;
break;
}
if (vMarked == casacontrol.CASA_memMarked &&
vLevel == casacontrol.CASA_memLevel &&
vOpened == casacontrol.CASA_memOpened &&
vText == casacontrol.CASA_memText &&
vImage == casacontrol.CASA_memImage&&
vLineInfo == casacontrol.CASA_memLineInfo &&
m_direction == casacontrol.CASA_memDirection)
return;
casacontrol.CASA_memMarked = vMarked;
casacontrol.CASA_memLevel = vLevel;
casacontrol.CASA_memOpened = vOpened;
casacontrol.CASA_memText = vText;
casacontrol.CASA_memImage = vImage;
casacontrol.CASA_memLineInfo = vLineInfo;
casacontrol.CASA_memDirection = m_direction;
var vClass = "TREENODETable";
if (vMarked == true)
vClass = "TREENODESelectedTable";
else
{
for (var i=0; i<vSelection.length; i++)
if (vSelection[i] == casacontrol.CASA_index)
{
vClass = "TREENODESelectedTable";
break;
}
}
if (vText == null)
{
casacontrol.innerHTML = "<table cellspacing=0 cellpadding=0 class='"+vClass+"'>"+
"<tr><td class='TREENODECell'>&nbsp;</td></tr></table>";
return;
}
if (vImage == null || vImage == "")
{
vImage = casacontrol.CASA_imageopened;
if (vOpened == 0) vImage = casacontrol.CASA_imageclosed;
else if (vOpened == 2) vImage = casacontrol.CASA_imageendnode;
}
var vPlusMinus = "";
if (casacontrol.CASA_withplusminus == true && vOpened != 2)
{
var vPMImage = "../HTMLBasedGUI/images/treeminus"+imageExt;
if (vOpened == 0)
vPMImage = "../HTMLBasedGUI/images/treeplus"+imageExt;
else if (casacontrol.CASA_withlines == true)
{
var vChildInfo = getPropertyValue(casacontrol.CASA_childinfoprop);
if (vChildInfo == "1")
vPMImage = "../HTMLBasedGUI/images/treeminus2"+imageExt;
else
vPMImage = "../HTMLBasedGUI/images/treeminus"+imageExt;
}
vPlusMinus += "<td valign='middle' height='1px'>"+
"<a class='links' onclick='if (csciframe.checkIO()) { csciframe.setPropertyValue(\""+casacontrol.CASA_indexprop+"\","+casacontrol.CASA_index+");csciframe.invokeMethodInModel(\""+casacontrol.CASA_method+"\"); }'>"+
"<img border='0' src='"+vPMImage+"'>"+
"</a>"+
"</td>";
}
var vLinkId = "C_" + casacontrol.CASA_id;
var vEventHandler = "onmouseover='rollin"+casacontrol.CASA_id+"(\""+vLinkId+"\");' onmouseout='rollout"+casacontrol.CASA_id+"(\""+vLinkId+"\");'";
if (casacontrol.CASA_withplusminus == true && vOpened == 2)
vLevel += 15;
var vTDs = "<td><img src='../HTMLBasedGUI/general/nothing.gif' width='"+C_adjustUnits(vLevel)+"' height='1px'></td>";
if (vLevel == 0)
vTDs = "";
if (casacontrol.CASA_withlines == true && vLineInfo != null && vLineInfo != "")
vTDs = CL().buildLineInfoTREENODE(vLineInfo, imageExt, vOpened);
var vTooltip = "";
if (casacontrol.CASA_tooltipprop != null)
{
vTooltip = getPropertyValue(casacontrol.CASA_tooltipprop);
if (vTooltip != null && vTooltip != "")
vTooltip = "title='"+convertApos(vTooltip)+"'";
}
else if (casacontrol.CASA_withtooltip == true)
vTooltip = "title='"+convertApos(vText)+"'";
if (vOpened != 2)
{
casacontrol.innerHTML = "<table cellspacing=0 cellpadding=0 width='100%' class='"+vClass+"'>"+
"<tr>"+
vTDs+
vPlusMinus+
"<td width=20px align='center'>"+
"<a class='links' onclick='if (csciframe.checkIO()) { csciframe.setPropertyValue(\""+casacontrol.CASA_indexprop+"\","+casacontrol.CASA_index+");csciframe.invokeMethodInModel(\""+casacontrol.CASA_method+"\"); }'>"+
"<img border='0' src='"+vImage+"'>"+
"</a>"+
"</td>"+
"<td nowrap='true' width='100%'>"+
"<div nowrap='true' style='width:100%; overflow:hidden; border:0' oncontextmenu='CASA_event = event; csciframe.onContextMenuTREENODE(event,C_"+casacontrol.CASA_id+"); return false;' onmouseup='reactOnMouseUp"+casacontrol.CASA_id+"(event);'>"+
"&nbsp;"+
"<span id='"+vLinkId+"' "+vEventHandler+" class='links' "+vTooltip+" onclick='if (event.ctrlKey == true) { selectItem"+casacontrol.CASA_id+"(\"ctrl\"); return false; } else if (event.shiftKey == true) { selectItem"+casacontrol.CASA_id+"(\"shift\"); } else { selectItem"+casacontrol.CASA_id+"(); return false; }' onmousedown='reactOnMouseDown"+casacontrol.CASA_id+"(event);'>"+
vText+
"</span>"+
"</div>"+
"</td>"+
"<td class='TREENODECell'>&nbsp;</td>"+
"</tr>"+
"</table>";
}
else
{
casacontrol.innerHTML = "<table cellspacing=0 cellpadding=0 width='100%' class='"+vClass+"'>"+
"<tr>"+
vTDs+
"<td width=20px align='center'>"+
"<a class='links' onclick='selectItem"+casacontrol.CASA_id+"();'>"+
"<img border='0' src='"+vImage+"'>"+
"</a>"+
"</td>"+
"<td nowrap='true' width='100%'>"+
"<div nowrap='true' style='width:100%; overflow:hidden; border:0' oncontextmenu='CASA_event = event; csciframe.onContextMenuTREENODE(event,C_"+casacontrol.CASA_id+"); return false;' onmouseup='reactOnMouseUp"+casacontrol.CASA_id+"(event);'>"+
"&nbsp;"+
"<span id='"+vLinkId+"' "+vEventHandler+" class='links' "+vTooltip+" onclick='if (event.ctrlKey == true) { selectItem"+casacontrol.CASA_id+"(\"ctrl\"); return false; } else if (event.shiftKey == true) { selectItem"+casacontrol.CASA_id+"(\"shift\"); return false; } else { selectItem"+casacontrol.CASA_id+"(); return false; }' onmousedown='reactOnMouseDown"+casacontrol.CASA_id+"(event);'>"+
vText+
"</span>"+
"</div>"+
"</td>"+
"<td class='TREENODECell'>&nbsp;</td>"+
"</tr>"+
"</table>";
}
}
function selectItemTREENODE(cc, key)
{
if (checkIO() == false) return;
if (parent.document.selection)
parent.document.selection.empty();
else
parent.window.getSelection().removeAllRanges();
var vInactive = getPropertyValue(cc.CASA_inactiveprop);
if (vInactive == "true") return;
if (key == "shift" &&
cc.CASA_singleselect != "true" &&
cc.CASA_shiftindexprop != null)
{
setPropertyValue(cc.CASA_shiftindexprop, cc.CASA_index);
}
else if (key == "ctrl" &&
cc.CASA_singleselect != "true" &&
cc.CASA_ctrlindexprop != null)
{
setPropertyValue(cc.CASA_ctrlindexprop, cc.CASA_index);
}
else
{
setPropertyValue(cc.CASA_indexprop, cc.CASA_index);
}
invokeMethodInModel(cc.CASA_selectmethod);
}
function onContextMenuTREENODE(event,cc)
{
if (checkIO() == false) return;
if (getPropertyValue(cc.CASA_textprop) == null) return;
setContextMenuXYPAGE(event.clientX,event.clientY);
if (checkIfIndexIsInSelectionTREECONTROLS(cc, cc.CASA_index) == false)
setPropertyValue(cc.CASA_indexprop, cc.CASA_index);
invokeMethodInModel(cc.CASA_contextselectmethod);
}
function checkIfIndexIsInSelectionTREECONTROLS(cc, index)
{
var vSelIndex;
var vCounter = 0;
while (true)
{
vSelIndex = getPropertyValue(cc.CASA_arrayprop+".selectedItemIndices["+vCounter+"].index");
if (vSelIndex == null) break;
if (vSelIndex == index)
return true;
vCounter++;
}
return false;
}
var m_dragMasterIndexTREENODE;
function reactOnMouseDownTREENODE(cc, evt, CONST_TREE)
{
if (checkIO() == false) return;
if (cc.CASA_enabledrag != "true" && cc.CASA_enabledrag != true) return;
var dragInfo = getPropertyValue(cc.CASA_arrayprop+".items["+cc.CASA_index+"].dragInfo");
if (dragInfo == null || dragInfo == "")
{
m_dragMasterIndexTREENODE = cc.CASA_index;
var found = false;
var vCounter = 0;
while (true)
{
var vSelIndex = getPropertyValue(cc.CASA_arrayprop+".selectedItemIndices["+vCounter+"].index");
if (vSelIndex == null) break;
if (vSelIndex == m_dragMasterIndexTREENODE)
{
found = true;
break;
}
vCounter++;
}
var vSelection = [];
var vSelectionCounter = 0;
if (found == false)
{
return;
}
else
{
while (true)
{
var vSelIndex = getPropertyValue(cc.CASA_arrayprop+".selectedItemIndices["+vSelectionCounter+"].index");
if (vSelIndex == null) break;
vSelection.push(vSelIndex);
vSelectionCounter++;
}
}
var vHTML = getHTMLDragTableCLIENTTREE(cc, vSelection, cc.CASA_arrayprop);
parent.startDrag(vHTML, evt);
if(evt.preventDefault && evt.stopPropagation)
{
evt.preventDefault();
evt.stopPropagation();
}
}
else
{
var arr = [];
arr.push(cc.CASA_index);
var vHTML = getHTMLDragTableCLIENTTREE(cc, arr, cc.CASA_arrayprop);
startDragCL(dragInfo, vHTML, evt, parent);
if(evt.preventDefault && evt.stopPropagation)
{
evt.preventDefault();
evt.stopPropagation();
}
}
}
function reactOnMouseUpTREENODE(cc, pEvent)
{
if (checkIO() == false) return;
if (parent.m_dragMode != true) return true;
parent.endDrag();
var vMethod = cc.CASA_reactondropmethod;
var vTargetIndex = cc.CASA_index;
var id = pEvent.currentTarget.id;
id = id.replace("C_","TREE");
var vObject = parent.gebid(id);
if (vObject == null)
{
id = id.replace("TREE","T_");
vObject = parent.gebid(id);
}
vMethod = vObject.CASA_reactondropmethod;
vTargetIndex = vObject.CASA_index;
if (m_dragMasterIndexTREENODE == vTargetIndex) return true;
setContextMenuXYPAGE(pEvent.clientX, pEvent.clientY);
invokeMethodInModel(vMethod);
}
function checkIfNodeIsINACTIVE(cc,index,isClientTree)
{
if(isClientTree == true)
{
var tcp = cc.CASA_treecollectionprop;
var vBase = tcp+".items["+index+"].";
var vInactive = getPropertyValue(vBase+"inactive");
return vInactive == "true";
}
else
{
return getPropertyValue(cc.CASA_inactiveprop)=="true";
}
}
function findTREENODESelectedTable(cc)
{
var result = "TREENODESelectedTable";
if (cc.CASA_selectionstylevariant != null)
result += cc.CASA_selectionstylevariant;
return result;
}
var m_lastSelectWorkplace = 0;
var m_maxBlockWorkplace = 3000;
function unblockWorkplaceSelect()
{
if (m_doLog) addLogMessage("unblockWorkplaceSelect() - unblocking" );
CL().m_njxWorkplaceBlocked = false;
}
function checkWorkplaceSelect(start)
{
if ( this.m_modelName == null || this.m_modelName.indexOf("MFWorkplaceAdapter") <= 0 )
return true;
if (m_doLog) addLogMessage("checkWorkplaceSelect(" + start + ")" );
var now = new Date().getTime();
if ( CL().m_njxWorkplaceBlocked == true ) {
if ( (now - m_lastSelectWorkplace) > m_maxBlockWorkplace )
this.unblockWorkplaceSelect();
}
if ( CL().m_njxWorkplaceBlocked == true ) {
if (m_doLog) addLogMessage("checkWorkplaceSelect() - workplace is blocked" );
return false;
}
if ( start==true ) {
m_lastSelectWorkplace = now;
CL().m_njxWorkplaceBlocked = true;
}
if (m_doLog) addLogMessage("checkWorkplaceSelect() - workplace is NOT blocked" );
return true;
}
function initCasaControlCLIENTTREE(cc)
{
cc.CASA_forcerefresh = undefined;
cc.CASA_bufferedVCI = undefined;
cc.CASA_bufferedDIR = undefined;
}
function reactOnModelUpdateCLIENTTREE(cc, toggleIndex)
{
var tcp = cc.CASA_treecollectionprop;
var vci = getPropertyValue(tcp+".changeIndex");
if (cc.CASA_forcerefresh != true &&
cc.CASA_bufferedVCI != undefined &&
cc.CASA_bufferedVCI == vci &&
cc.CASA_bufferedDIR == m_direction)
{
return;
}
cc.CASA_bufferedVCI = vci;
cc.CASA_forcerefresh = false;
cc.CASA_bufferedDIR = m_direction;
var imageExt = ".gif";
if (m_direction == "rtl")
imageExt = "_rtl.gif";
var vSelectedIndex = -1;
vSelectedIndex = getPropertyValue(tcp+".selectedIndex") * (-1) * (-1);
var vSelection = [];
var vSelectionCounter = 0;
while (true)
{
var vSelIndex = getPropertyValue(tcp+".selectedItemIndices["+vSelectionCounter+"].index");
if (vSelIndex == null) break;
vSelection.push(vSelIndex);
vSelectionCounter++;
}
cc.CASA_selection = vSelection;
var vDirectSelEv = "onclick";
if (cc.CASA_directselectevent == "ondblclick")
vDirectSelEv = "ondblclick";
var vHtml = [];
vStyle = null;
vClass = "TREENODETable";
if (cc.CASA_treestyleprop != null)
vStyle = getStylePropertyValue(cc.CASA_treestyleprop);
if (cc.CASA_treeclassprop != null)
vClass = getPropertyValue(cc.CASA_treeclassprop);
if (vStyle!=null) cc.style.cssText += vStyle;
var vFocusRequestor = null;
var vCounter = 0;
if (cc.CASA_treeclassprop != null)
cc.className = getPropertyValue(cc.CASA_treeclassprop);
var vItemClass = "TREENODETable";
if (vClass != null && vClass != "")
vItemClass = vClass;
vHtml.push("<table cellspacing=0 cellpadding=0 width='99%'><tr><td height='10px'></td></tr>");
var vImageOpened = null;
var vImageClosed = null;
var vImageEndNode = null;
var vPickImagesFromItems = false;
if ((cc.CASA_imageopenedprop != null)&&(cc.CASA_imageclosedprop != "null"))
{
vPickImagesFromItems = true;
}
else
{
vImageOpened = cc.CASA_imageopened;
vImageClosed = cc.CASA_imageclosed;
vImageEndNode = cc.CASA_imageendnode;
}
var vItemToHide = "false";
var vLevelOfLastClosedItem = 0;
while (true)
{
var vBase = tcp+".items["+vCounter+"].";
var vLevel = getPropertyValue(vBase+"level");
var vInactive = getPropertyValue(vBase+"inactive");
if (vLevel == null) break;
var vOpened = getPropertyValue(vBase+"opened");
var vFocused = getPropertyValue(vBase+cc.CASA_focusedprop);
if (vFocused == "true" && vFocusRequestor == null)
vFocusRequestor = vCounter;
if (vPickImagesFromItems == true)
{
vImageOpened = getPropertyValue(vBase+cc.CASA_imageopenedprop);
vImageClosed = getPropertyValue(vBase+cc.CASA_imageclosedprop);
if (vImageOpened == null || vImageOpened == "")
vImageEndNode = cc.CASA_imageendnode;
else
vImageEndNode = vImageOpened;
if (vImageOpened == null || vImageOpened == "") vImageOpened = cc.CASA_imageopened;
if (vImageClosed == null || vImageClosed == "") vImageClosed = cc.CASA_imageclosed;
}
if (vLevel <= vLevelOfLastClosedItem) vItemToHide = "false";
if (vItemToHide == "false")
{
var vText = getPropertyValue(vBase+"text");
var vTableClass = "class='TREENODETable'";
if (vClass != null && vClass != "")
vTableClass = "class='"+vClass+"'";
if (cc.CASA_selectionvisible == true)
{
var sc = findTREENODESelectedTable(cc);
if (vCounter == vSelectedIndex)
{
vTableClass = "class='"+sc+"'";
}
else
{
for (var i=0; i<vSelection.length; i++)
if (vSelection[i] == vCounter)
{
vTableClass = "class='"+sc+"'";
break;
}
}
}
var vImage = vImageOpened;
if (vOpened == 0) vImage = vImageClosed;
else if (vOpened == 2) vImage = vImageEndNode;
var vOnClickHandler = "onclick='event.preventDefault(); event.stopPropagation(); toggleItem"+cc.CASA_id+"("+vCounter+");'";
if (vOpened == 2) vOnClickHandler = "";
var vStyleClass = "class='links'";
if (vOpened == 2) vStyleClass = "";
var vLinkId = "CasaCLIENTTREE" + cc.CASA_id + "Link" + vCounter;
var vDistance = vLevel * 20 + 10;
var vshift = 20;
var vshiften = 20;
var leftPadding = 10;
if (cc.CASA_withleftpadding == "false") leftPadding = 0;
if (cc.CASA_pixelshift != null) vshift = cc.CASA_pixelshift;
if (cc.CASA_pixelshiftendnode != null) vshiften = cc.CASA_pixelshiftendnode;
if (vOpened == 2)
{
if (vLevel > 0)
vDistance = (vLevel-1) * vshift + vshiften + leftPadding;
}
else
{
vDistance = vLevel * vshift + leftPadding;
}
var vPlusMinus = "";
if (cc.CASA_withplusminus == true)
{
if (vOpened == 0) vPlusMinus = "<td><img "+vStyleClass+" "+vOnClickHandler+" src='../HTMLBasedGUI/images/treeplus"+imageExt+"'></td>";
if (vOpened == 1) vPlusMinus = "<td><img "+vStyleClass+" "+vOnClickHandler+" src='../HTMLBasedGUI/images/treeminus"+imageExt+"'></td>";
if (vOpened == 2) vDistance += 15;
}
var vTooltip = "";
if (cc.CASA_tooltipprop != null)
{
vTooltip = getPropertyValue(vBase+cc.CASA_tooltipprop);
if (vTooltip != null && vTooltip != "")
vTooltip = "title='"+convertApos(vTooltip)+"'";
}
else if (cc.CASA_withtooltip == true)
vTooltip = "title='"+convertApos(vText)+"'";
var ti = cc.CASA_cti;
if (ti == null)
ti = 0;
var vOnKeyDownHandler = "onkeydown='rokdMOZ"+cc.CASA_id+"(event)'";
var vRollOver = "onmouseover='rollin"+cc.CASA_id+"("+vCounter+"); CASA_event = event;' onmouseout='rollout"+cc.CASA_id+"("+vCounter+");'";
vHtml.push("<tr><td nowrap='true' width='100%'>");
vHtml.push("<div nowrap='true' style='width: 100%'>");
vHtml.push("<table id='CTREE_"+cc.CASA_id+"_"+vCounter+"' tabindex="+ti+" "+vOnKeyDownHandler+" "+vDirectSelEv+"='if (event.ctrlKey == true) { selectItem"+cc.CASA_id+"("+vCounter+", \"ctrl\"); return false;} else if (event.shiftKey == true) { selectItem"+cc.CASA_id+"("+vCounter+", \"shift\"); return false;} else selectItem"+cc.CASA_id+"("+vCounter+");' oncontextmenu='CASA_event = event; onContextMenuRequest"+cc.CASA_id+"(null); return false;' border=0 cellspacing=0 cellpadding=0><tr id='CTREE_TR"+cc.CASA_id+"_"+vCounter+"' "+vTableClass+" "+vRollOver+">");
vHtml.push("<td><img src='../HTMLBasedGUI/general/nothing.gif' height=1px width='"+C_adjustUnits(vDistance)+"'></td>");
vHtml.push(vPlusMinus);
vHtml.push("<td><img "+vStyleClass+" "+vOnClickHandler+" src='"+vImage+"' "+vStyleClass+"></td>");
vHtml.push("<td><img src='../HTMLBasedGUI/general/nothing.gif' width='5px'></td>");
vHtml.push("<td width='99%' class='TREENODECell' nowrap='true'>");
if (vInactive != "true")
vHtml.push("<a class='TREENODELink' id='"+vLinkId+"' "+vTooltip+" onmouseup='reactOnMouseUp"+cc.CASA_id+"("+vCounter+",event);' onmousedown='reactOnMouseDown"+cc.CASA_id+"("+vCounter+",event);' oncontextmenu='CASA_event = event; onContextMenuRequest"+cc.CASA_id+"("+vCounter+"); return false;' ondragstart='event.stopPropagation(); return false;' ondrag='event.stopPropagation(); return false;' ondragend='event.stopPropagation(); return false;'>");
else
vHtml.push("<a "+vTooltip+" class='TREENODEInactiveText'>");
vHtml.push(vText);
vHtml.push("</a></td>");
vHtml.push("</tr></table>");
vHtml.push("</div></td></tr>");
}
if ((vOpened == 0) && (vItemToHide == "false"))
{
vItemToHide = "true";
vLevelOfLastClosedItem = vLevel;
}
vCounter++;
}
vHtml.push("</table>");
if (vStyle != null || vClass != null)
{
vHtml.push("</div>");
}
cc.innerHTML = vHtml.join("");
if (toggleIndex != null)
{
var node = getNodeForIndexCLIENTREE(cc, toggleIndex);
if(node.setActive)
node.setActive();
else
node.focus();
}
else if (vFocusRequestor != null)
{
var node = getNodeForIndexCLIENTREE(cc, vFocusRequestor);
addActiveElementRequestor(node);
}
else if (cc.CASA_requestFocusForSelectedNode == true)
{
cc.CASA_requestFocusForSelectedNode = false;
if (vSelectedIndex != -1)
{
var node = getNodeForIndexCLIENTREE(cc, vSelectedIndex);
addFocusRequestor(node);
}
}
}
function rollinLinkCLIENTTREE(cc, index)
{
if(checkIfNodeIsINACTIVE(cc,index,true)) return;
if (checkIO() == false) return;
var changeTableClassName = true;
if (cc.CASA_selectionvisible != true ||
checkIfIsInSelectionCLIENTTREE(cc, index) == false)
{
elm = parent.gebid("CTREE_TR"+cc.CASA_id+"_"+index);
elm.className = "TREENODETableRollover";
}
elm = parent.gebid("CasaCLIENTTREE"+cc.CASA_id+"Link"+index);
if (elm == null) return;
elm.className = "TREENODELinkRollover";
}
function rolloutLinkCLIENTTREE(cc, index)
{
if(checkIfNodeIsINACTIVE(cc,index,true)) return;
if (checkIO() == false) return;
var vClass = "TREENODETable";
if (cc.CASA_selectionvisible == true &&
checkIfIsInSelectionCLIENTTREE(cc, index) == true)
vClass = findTREENODESelectedTable(cc);
var elm = parent.gebid("CTREE_TR"+cc.CASA_id+"_"+index);
if (elm == null) return;
elm.className = vClass;
elm = parent.gebid("CasaCLIENTTREE"+cc.CASA_id+"Link"+index);
if (elm == null) return;
elm.className = "TREENODELink";
}
function rollinDragLinkCLIENTTREE(cc, index)
{
if(checkIfNodeIsINACTIVE(cc,index,true)) return;
if (checkIO() == false) return;
if (cc.CASA_selectionvisible != true &&
checkIfNodeIsVisibleCLIENTREE(cc, index) == false)
{
elm = parent.gebid("CTREE_TR"+cc.CASA_id+"_"+index);
elm.className = "TREENODETableRollover";
}
elm = parent.gebid("CasaCLIENTTREE"+cc.CASA_id+"Link"+index);
if (elm == null) return;
elm.className = "TREENODELinkRolloverDragDrop";
}
function rokdMOZCLIENTTREE(cc, evt)
{
var node = findSrcElement(evt);
nodeId = node.id;
var nodeIndex = nodeId.split("_");
var vNode = parseInt(nodeIndex[2]);
rokdCLIENTTREE(cc, evt, vNode);
}
function rokdCLIENTTREE(cc, evt, itemIndex)
{
if (evt.keyCode == 13 || evt.keyCode == 32)
{
selectItemCLIENTTREE(cc,itemIndex);
m_noProcessingForNextHotKey = true;
}
else if (evt.keyCode == 39 || evt.keyCode == 187 || evt.keyCode == 107)
{
var openedprop = cc.CASA_treecollectionprop + ".items["+itemIndex+"].opened";
var opened = getPropertyValue(openedprop);
if (opened == 0)
{
toggleItemCLIENTTREE(cc,itemIndex);
}
}
else if (evt.keyCode == 37 || evt.keyCode == 189 || evt.keyCode == 109)
{
var openedprop = cc.CASA_treecollectionprop + ".items["+itemIndex+"].opened";
var opened = getPropertyValue(openedprop);
if (opened == 1)
{
toggleItemCLIENTTREE(cc,itemIndex);
}
}
else if (evt.keyCode == 38)
{
var index =  findIndexNextNodeUpCLIENTREE(cc, itemIndex);
node = getNodeForIndexCLIENTREE(cc, index);
if(node.setActive)
node.setActive();
else
node.focus();
if (itemIndex != 0)
{
evt.returnValue = false;
cc.scrollTop -= 18;
}
}
else if (evt.keyCode == 40)
{
var index =  findIndexNextNodeDownCLIENTREE(cc, itemIndex);
node = getNodeForIndexCLIENTREE(cc, index);
if(node.setActive)
node.setActive();
else
node.focus();
evt.returnValue = false;
cc.scrollTop += 18;
}
}
function findIndexNextNodeUpCLIENTREE(cc, nodeIndex)
{
if (nodeIndex == 0)
return 0;
var vCounter = nodeIndex-1;
while (true)
{
if (vCounter < 0)
{
return null;
}
var vis = checkIfNodeIsVisibleCLIENTREE(cc, vCounter);
if (vis == true)
{
return vCounter;
}
vCounter--;
}
}
function checkIfNodeIsVisibleCLIENTREE(cc, nodeIndex)
{
var prop = cc.CASA_treecollectionprop + ".items["+nodeIndex+"].level";
var level = getPropertyValue(prop);
if (level == 0)
return true;
var vCounter = nodeIndex-1;
while (true)
{
prop = cc.CASA_treecollectionprop + ".items["+vCounter+"].level";
var vLevel = getPropertyValue(prop);
if (vLevel < level)
{
prop = cc.CASA_treecollectionprop + ".items["+vCounter+"].opened";
var opened = getPropertyValue(prop);
if (opened == 0)
return false;
return checkIfNodeIsVisibleCLIENTREE(cc, vCounter);
}
vCounter--;
}
}
function findIndexNextNodeDownCLIENTREE(cc, nodeIndex)
{
var prop = cc.CASA_treecollectionprop + ".items["+nodeIndex+"].opened";
var opened = getPropertyValue(prop);
var level = 1000;
if (opened == 0)
{
prop = cc.CASA_treecollectionprop + ".items["+nodeIndex+"].level";
level = getPropertyValue(prop);
}
var vCounter = nodeIndex+1;
while (true)
{
var vBase = cc.CASA_treecollectionprop+".items["+vCounter+"].";
var vLevel = getPropertyValue(vBase+"level");
if (vLevel == null)
{
return nodeIndex;
}
if (vLevel <= level)
{
return vCounter;
}
vCounter++;
}
}
function getNodeForIndexCLIENTREE(cc, nodeIndex)
{
return parent.gebid("CTREE_"+cc.CASA_id+"_"+nodeIndex);
}
function selectItemCLIENTTREE(cc,itemIndex, key)
{
if ( checkWorkplaceSelect(true) != true ) return;
if(checkIfNodeIsINACTIVE(cc,itemIndex,true)) return;
if (checkIO() == false) return;
if (key == "shift" && cc.CASA_singleselect != true)
{
setPropertyValue(cc.CASA_treecollectionprop+".shiftSelectedIndex",itemIndex);
invokeMethodInModel(cc.CASA_treecollectionprop+".items["+itemIndex+"].shiftKeySelect");
}
else if (key == "ctrl" && cc.CASA_singleselect != true)
{
setPropertyValue(cc.CASA_treecollectionprop+".ctrlSelectedIndex",itemIndex);
invokeMethodInModel(cc.CASA_treecollectionprop+".items["+itemIndex+"].ctrlKeySelect");
}
else
{
cc.CASA_requestFocusForSelectedNode = true;
if (cc.CASA_selectionvisible == true)
{
try
{
for (var i=0; i<cc.CASA_selection.length; i++)
{
var node = getNodeForIndexCLIENTREE(cc, cc.CASA_selection[i]);
node.className = "TREENODETable";
}
node = getNodeForIndexCLIENTREE(cc, itemIndex);
node.className = findTREENODESelectedTable(cc);
}
catch(excc) {}
}
setPropertyValue(cc.CASA_treecollectionprop+".selectedIndex",itemIndex);
invokeMethodInModel(cc.CASA_treecollectionprop+".items["+itemIndex+"].select");
}
}
function toggleItemCLIENTTREE(cc,itemIndex)
{
if ( checkWorkplaceSelect(false) != true ) return;
if(checkIfNodeIsINACTIVE(cc,itemIndex,true)) return;
if (checkIO() == false) return;
var vOpenedProp = cc.CASA_treecollectionprop + ".items["+itemIndex+"].opened";
var vOpenedValue = getPropertyValue(vOpenedProp);
if (cc.CASA_dynamicloading == true && vOpenedValue == 0)
{
var nextIndex = itemIndex + 1;
var vLevelProp = cc.CASA_treecollectionprop + ".items["+itemIndex+"].level";
var vLevelValue = getPropertyValue(vLevelProp) * (-1) * (-1);
var vNextLevelProp = cc.CASA_treecollectionprop + ".items["+nextIndex+"].level";
var vNextLevelValue = getPropertyValue(vNextLevelProp) * (-1) * (-1);
if (vNextLevelValue == null || vNextLevelValue <= vLevelValue)
{
var vToggleMethod = cc.CASA_treecollectionprop + ".items["+itemIndex+"].toggle";
invokeMethodInModel(vToggleMethod);
}
else
{
if (vOpenedValue == 1) vOpenedValue = 0;
else vOpenedValue = 1;
}
}
else
{
if (vOpenedValue == 1) vOpenedValue = 0;
else vOpenedValue = 1;
}
setPropertyValue(vOpenedProp,vOpenedValue);
cc.CASA_forcerefresh = true;
reactOnModelUpdateCLIENTTREE(cc, itemIndex);
}
function onContextMenuRequestCLIENTTREE(cc, itemIndex)
{
if ( checkWorkplaceSelect(false) != true ) return;
if (checkIO() == false) return;
setContextMenuXYPAGE(parent.CASA_event.clientX, parent.CASA_event.clientY);
if (itemIndex != null)
{
if (checkIfIsInSelectionCLIENTTREE(cc, itemIndex) == false)
setPropertyValue(cc.CASA_treecollectionprop+".selectedIndex",itemIndex);
invokeMethodInModel(cc.CASA_treecollectionprop+".items["+itemIndex+"].reactOnContextMenuRequest");
}
else if (cc.CASA_oncontextmenumethod != null)
invokeMethodInModel(cc.CASA_oncontextmenumethod);
}
function checkIfIsInSelectionCLIENTTREE(cc, itemIndex)
{
var vCounter = 0;
while (true)
{
var vIndex = getPropertyValue(cc.CASA_treecollectionprop+".selectedItemIndices["+vCounter+"].index");
if (vIndex == null) break;
if (vIndex == itemIndex)
return true;
vCounter++;
}
return false;
}
var m_dragMasterIndexCLIENTTREE;
function reactOnMouseDownCLIENTTREE(cc, mousedownevent, index, CONST_TREE)
{
if ( checkWorkplaceSelect(false) != true ) return;
if (checkIO() == false) return;
if(checkIfNodeIsINACTIVE(cc,index,true)) return;
if (cc.CASA_enabledrag != "true" && cc.CASA_enabledrag != true) return;
m_dragMasterIndexCLIENTTREE = index;
var tcp = cc.CASA_treecollectionprop;
var vCounter = 0;
var found = false;
while (true)
{
var vSelIndex = getPropertyValue(tcp+".selectedItemIndices["+vCounter+"].index");
if (vSelIndex == null) break;
if (vSelIndex == m_dragMasterIndexCLIENTTREE)
{
found = true;
break;
}
vCounter++;
}
var vSelection = [];
var vSelectionCounter = 0;
parent.m_dropInfo = "";
if (found == false)
{
return;
}
else
{
while (true)
{
var vSelIndex = getPropertyValue(cc.CASA_treecollectionprop+".selectedItemIndices["+vSelectionCounter+"].index");
if (vSelIndex == null) break;
vSelection.push(vSelIndex);
parent.m_dropInfo += getPropertyValue(cc.CASA_treecollectionprop+".items["+vSelIndex+"].dragInfo")+";";
vSelectionCounter++;
}
}
if (parent.m_dropInfo.length > 0)
parent.m_dropInfo = parent.m_dropInfo.substring(0,parent.m_dropInfo.length-1);
var vHTML = getHTMLDragTableCLIENTTREE(cc, vSelection, tcp);
parent.startDrag(vHTML, mousedownevent);
}
function reactOnMouseUpCLIENTTREE(cc, index, evt)
{
if ( checkWorkplaceSelect(false) != true ) return;
if (checkIO() == false) return;
if(checkIfNodeIsINACTIVE(cc,index,true)) return;
setContextMenuXYPAGE(evt.clientX, evt.clientY);
if (checkIfDragProcessIsActiveCL())
{
var dropInfo = endDragCL();
var base = cc.CASA_treecollectionprop+".items["+index+"].";
var vProp = base + "dropInfo";
setPropertyValue(vProp, dropInfo);
var vMethod = base + "reactOnDropGeneric";
invokeMethodInModel(vMethod);
}
else if (parent.m_dragMode == true)
{
parent.endDrag();
if (m_dragMasterIndexCLIENTTREE == index) return true;
var vMethod = cc.CASA_treecollectionprop+".items["+index+"].reactOnDrop";
invokeMethodInModel(vMethod);
}
return true;
}
function getHTMLDragTableCLIENTTREE(cc, itemIndices, collectionprop)
{
var vHTML = [];
vHTML.push("<table style='position: absolute; top: 0; left: 0; z-index: 1000;' class='DRAGTable'>");
for (var i=0; i<itemIndices.length; i++)
{
if (itemIndices[i] < 0) continue;
var vText = getPropertyValue(collectionprop+".items["+itemIndices[i]+"].text");
vHTML.push("<tr><td class='DRAGTableCellImage' width=7px></td><td class='DRAGTableCellText' nowrap=true>"+vText+"<td></tr>");
}
vHTML.push("</table>");
return vHTML.join("");
}
function iccTREENODE3(cc,outerTable,treesubcontrols,treepart2,romumethod,closemethod,id,levelprop,
openedprop,textprop,indexprop,draginfoprop,inactiveprop,pmethod,
index,selectmethod,contextselectmethod,reactondropmethod,
reactondropgenericmethod,width,imageopened,imageclosed,imageendnode,
arrayprop,changeindexprop,singleselect,enabledrag,lineinfoprop,
childinfoprop,disabletextinputprop,triggertextinputprop,ctrlindexprop,
ctrlkeyselectmethod,shiftindexprop,shiftkeyselectmethod,
cti,tabindex,directselectevent,flush,flushmethod,repeatindex,
pixelheight,imageprop,withplusminus,withtextinput,pixelshift,
pixelshiftendnode,withlines,withtooltip,rowtableareaid,dropinfoprop,focusedprop,
reactmethod,tooltipprop,validdraginfosprop, backgroundcolorprop, textstylevariant,
directselectelement,selectionstylevariant,testtoolid)
{
initCasaControlTREENODE(cc);
cc.CASA_treesubcontrols = treesubcontrols;
cc.CASA_outerTable = outerTable;
registerListener(romumethod);
cc.CASA_id = id;
cc.CASA_treepart2 = treepart2;
cc.CASA_levelprop = levelprop;
cc.CASA_openedprop = openedprop;
cc.CASA_textprop = textprop;
cc.CASA_indexprop = indexprop;
cc.CASA_draginfoprop = draginfoprop;
cc.CASA_dropinfoprop = dropinfoprop;
cc.CASA_inactiveprop = inactiveprop;
cc.CASA_method = pmethod;
cc.CASA_index = index;
cc.CASA_selectmethod = selectmethod;
cc.CASA_contextselectmethod = contextselectmethod;
cc.CASA_reactondropmethod = reactondropmethod;
cc.CASA_reactondropgenericmethod = reactondropgenericmethod;
cc.CASA_width = width;
cc.CASA_imageopened = imageopened;
cc.CASA_imageclosed = imageclosed;
cc.CASA_imageendnode = imageendnode;
cc.CASA_arrayprop = arrayprop;
cc.CASA_changeindexprop = changeindexprop;
cc.CASA_singleselect = singleselect;
cc.CASA_enabledrag = enabledrag;
cc.CASA_lineinfoprop = lineinfoprop;
cc.CASA_childinfoprop = childinfoprop;
cc.CASA_disabletextinputprop = disabletextinputprop;
cc.CASA_triggertextinputprop = triggertextinputprop;
cc.CASA_ctrlindexprop = ctrlindexprop;
cc.CASA_ctrlkeyselectmethod = ctrlkeyselectmethod;
cc.CASA_shiftindexprop = shiftindexprop;
cc.CASA_shiftkeyselectmethod = shiftkeyselectmethod;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (directselectevent != null) cc.CASA_directselectevent = directselectevent;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (repeatindex != null) cc.CASA_repeatindex = repeatindex;
if (pixelheight != null) cc.CASA_pixelheight = pixelheight;
if (imageprop != null) cc.CASA_imageprop = imageprop;
if (withplusminus != null) cc.CASA_withplusminus = withplusminus;
if (withtextinput != null) cc.CASA_withtextinput = withtextinput;
if (pixelshift != null) cc.CASA_pixelshift = pixelshift;
if (pixelshiftendnode != null) cc.CASA_pixelshiftendnode = pixelshiftendnode;
if (focusedprop != null) cc.CASA_focusedprop = focusedprop;
if (tooltipprop != null) cc.CASA_tooltipprop = tooltipprop;
if (textstylevariant != null) cc.CASA_textstylevariant = textstylevariant;
if (directselectelement != null) cc.CASA_directselectelement = directselectelement;
if (selectionstylevariant != null) cc.CASA_selectionstylevariant = selectionstylevariant;
cc.CASA_withlines = withlines;
cc.CASA_withtooltip = withtooltip;
applyCasaTabIndexFor(cc,cc.CASA_outerTable,"TREENODE");
addFocusable(cc.CASA_outerTable);
startFocusCell(cc.CASA_outerTable);
cc.CASA_isTreeNode3 = true;
cc.CASA_rowtableareaid = rowtableareaid;
cc.CASA_validdraginfosprop = validdraginfosprop;
cc.CASA_backgroundcolorprop = backgroundcolorprop;
cc.CASA_textpropnextnode = arrayprop+".items["+(repeatindex-1+2)+"].text";
cc.CASA_testtoolid = testtoolid;
cc.CASA_reactmethod = reactmethod;
}
function romuTREENODE3(pCC,pShowTextInput)
{
var vBackGroundStyle = "";
if(pCC.CASA_backgroundcolorprop != null && pCC.CASA_backgroundcolorprop != "")
{
var vBackgroundColor = getPropertyValue(pCC.CASA_backgroundcolorprop);
if(vBackgroundColor != null && vBackgroundColor != "")
vBackGroundStyle = "style='background-color:"+vBackgroundColor+"; background-image:none;'";
}
var vLevel = getPropertyValue(pCC.CASA_levelprop)*1;
var vOpened = getPropertyValue(pCC.CASA_openedprop);
var vText = getPropertyValue(pCC.CASA_textprop);
var vIndex = getPropertyValue(pCC.CASA_indexprop);
var vInactive = getPropertyValue(pCC.CASA_inactiveprop);
var vFocused = getPropertyValue(pCC.CASA_focusedprop);
var vshift = 20;
var vshiften = 20;
if (pCC.CASA_pixelshift != null) vshift = pCC.CASA_pixelshift;
if (pCC.CASA_pixelshiftendnode != null) vshiften = pCC.CASA_pixelshiftendnode;
if (vOpened == 2)
{
if (vLevel > 0)
vLevel = (vLevel-1) * vshift + vshiften;
}
else
{
vLevel = vLevel * vshift;
}
vLevel += 5;
var vImage = null;
if (pCC.CASA_imageprop != null)
vImage = getPropertyValue(pCC.CASA_imageprop);
var vLineInfo = null;
if (pCC.CASA_lineinfoprop != null)
vLineInfo = getPropertyValue(pCC.CASA_lineinfoprop);
var vTriggerTextInput = getPropertyValue(pCC.CASA_triggertextinputprop);
if (vTriggerTextInput == "true")
vTriggerTextInput = true;
var vMarked = false;
if (vIndex != null && vIndex == pCC.CASA_index)
vMarked = true;
var vSelection = [];
if (pCC.CASA_arrayprop != null)
{
var vSelectionCounter = 0;
while (true)
{
var vSelIndex = getPropertyValue(pCC.CASA_arrayprop+".selectedItemIndices["+vSelectionCounter+"].index");
if (vSelIndex == null) break;
vSelection.push(vSelIndex);
vSelectionCounter++;
}
}
for(vSelCheck=0; vSelCheck < vSelection.length; vSelCheck++)
if (vSelection[vSelCheck] == pCC.CASA_index)
{
vMarked = true;
break;
}
var imageExt = ".gif";
if (m_direction == "rtl")
imageExt = "_rtl.gif";
if (vFocused == "true")
{
setPropertyValue(pCC.CASA_focusedprop, "false");
addActiveElementRequestor(pCC.CASA_outerTable);
}
if (vMarked == pCC.CASA_memMarked &&
vLevel == pCC.CASA_memLevel &&
vOpened == pCC.CASA_memOpened &&
vText == pCC.CASA_memText &&
vInactive == pCC.CASA_memInactive &&
vImage == pCC.CASA_memImage &&
pShowTextInput == pCC.CASA_memShowTextInput &&
vTriggerTextInput == pCC.CASA_memOpenTextInput &&
vLineInfo == pCC.CASA_memLineInfo &&
pCC.CASA_memDirection == m_direction &&
pCC.CASA_requestFocusForIndex == null &&
pCC.CASA_enforceClassName == null)
{
return;
}
pCC.CASA_memMarked = vMarked;
pCC.CASA_memLevel = vLevel;
pCC.CASA_memOpened = vOpened;
pCC.CASA_memText = vText;
pCC.CASA_memInactive = vInactive;
pCC.CASA_memImage = vImage;
pCC.CASA_memLineInfo = vLineInfo;
pCC.CASA_memShowTextInput = pShowTextInput;
pCC.CASA_memDirection = m_direction;
pCC.CASA_memOpenTextInput = vTriggerTextInput;
var vPixelHeight = "";
if (pCC.CASA_pixelheight != null)
vPixelHeight = "height="+pCC.CASA_pixelheight;
if (vText == null)
{
pCC.CASA_isNull = true;
disableCasaTabIndexFor(pCC, pCC.CASA_outerTable, "TREENODE");
if (pCC.CASA_treesubcontrols == null)
return;
pCC.CASA_treesubcontrols.style.display = 'none';
pCC.innerHTML = "<table cellspacing=0 cellpadding=0 class='"+vClass+"'>"+
"<tr "+vPixelHeight+"><td>&nbsp;</td></tr></table>";
pCC.CASA_treepart2.innerHTML = "<table cellspacing=0 cellpadding=0  class='"+vClass+"'>"+
"<tr "+vPixelHeight+"><td>&nbsp;</td></tr></table>";
return;
}
else
{
pCC.CASA_isNull = false;
applyCasaTabIndexFor(pCC, pCC.CASA_outerTable, "TREENODE");
pCC.CASA_treesubcontrols.style.display = '';
}
var vClass = "TREENODETable";
if (pCC.CASA_enforceClassName != null)
{
vClass = pCC.CASA_enforceClassName;
}
else
{
var sc = findTREENODESelectedTable(pCC);
if (vMarked == true)
vClass = sc;
else
{
for (var i=0; i<vSelection.length; i++)
if (vSelection[i] == pCC.CASA_index)
{
vClass = sc;
break;
}
}
}
if (vImage == null || vImage == "")
{
vImage = pCC.CASA_imageopened;
if (vOpened == 0) vImage = pCC.CASA_imageclosed;
else if (vOpened == 2) vImage = pCC.CASA_imageendnode;
}
var vPlusMinus = "";
if (pCC.CASA_withplusminus == true && vOpened != 2)
{
var vPMImage = "../HTMLBasedGUI/images/treeminus"+imageExt;
if (vOpened == 0)
vPMImage = "../HTMLBasedGUI/images/treeplus"+imageExt;
else if (pCC.CASA_withlines == true)
{
var vChildInfo = getPropertyValue(pCC.CASA_childinfoprop);
if (vChildInfo == "1")
vPMImage = "../HTMLBasedGUI/images/treeminus2"+imageExt;
else
vPMImage = "../HTMLBasedGUI/images/treeminus"+imageExt;
}
vPlusMinus += "<td "+getTesttoolidHtml()+"='"+pCC.CASA_testtoolid+"_pm' valign='middle' height='1px' class='links' onclick='event.preventDefault(); toggleItem"+pCC.CASA_id+"();'>"+
"<img border='0' src='"+vPMImage+"'>"+
"</td>";
}
pCC.CASA_linkId = "C_" + pCC.CASA_id;
if (pCC.CASA_withplusminus == true && vOpened == 2)
vLevel += 15;
var vTDs = "<td><img src='../HTMLBasedGUI/general/nothing.gif' width='"+C_adjustUnits(vLevel)+"' height='1px'></td>";
if (vLevel == 0)
vTDs = "";
if (pCC.CASA_withlines == true && vLineInfo != null && vLineInfo != "")
vTDs = CL().buildLineInfoTREENODE(vLineInfo, imageExt, vOpened);
var vTooltip = "";
if (pCC.CASA_tooltipprop != null)
{
vTooltip = getPropertyValue(pCC.CASA_tooltipprop);
if (vTooltip != null && vTooltip != "")
vTooltip = "title='"+convertApos(vTooltip)+"'";
}
else if (pCC.CASA_withtooltip == true)
vTooltip = "title='"+convertApos(vText)+"'";
var vDirectSelEv = "onclick";
if (pCC.CASA_directselectevent == "ondblclick")
vDirectSelEv = "ondblclick";
if (vText == "") vText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var vTextClass = "TREENODELink";
if (vOpened == 2)
vTextClass = "TREENODELinkEndNode";
else if (getPropertyValue(pCC.CASA_levelprop) == 0)
vTextClass = "TREENODELinkTopNode";
if (pCC.CASA_textstylevariant != null)
vTextClass += pCC.CASA_textstylevariant;
if (vInactive == "true")
vTextClass = "TREENODEInactiveText";
pCC.CASA_className = vTextClass;
var vTextElement = "<a class='"+vTextClass+"' id='"+pCC.CASA_linkId+"' style='padding-left: 1px;' "+vTooltip+" ";
if (vInactive != "true")
{
vTextElement += "onmousedown='reactOnMouseDown"+pCC.CASA_id+"(event);' onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);'";
if (pCC.CASA_isNull != true && pCC.CASA_directselectelement == "textonly")
vTextElement += " "+vDirectSelEv+"='if (event.ctrlKey == true) { selectItem"+pCC.CASA_id+"(\"ctrl\"); return false;} else if (event.shiftKey == true) { selectItem"+pCC.CASA_id+"(\"shift\"); return false;} else selectItem"+pCC.CASA_id+"();'";
}
vTextElement += ">";
vTextElement += "&nbsp;"
vTextElement += vText+"</a>";
var vTextInput = false;
if (pCC.CASA_withtextinput == true && (pShowTextInput == true || (vTriggerTextInput == true && vMarked==true)))
vTextInput = true;
if (vTextInput)
{
var vDisabled = "";
if (getPropertyValue(pCC.CASA_disabletextinputprop) == "true" || getPropertyValue(pCC.CASA_disabletextinputprop) == true)
vDisabled = "disabled=true";
vTextElement = "<input id='TN3IP"+pCC.CASA_id+"' type='text' "+vDisabled+" style='width: 100%' class='TREENODETextInputCell' "+vDirectSelEv+"='event.stopPropagation();return false;' onkeydown='event.stopPropagation();' onchange='csciframe.reactOnTextChangeTREENODE3(\""+pCC.CASA_textprop+"\",this.value,\""+pCC.id+"\");'/>";
pCC.CASA_textinputopened = true;
}
var vTDDist = "<td><span style='width:2px;font-size:0'></span></td>";
var vSpanDist = "<span style='width:1px;font-size:0'></span>";
if (vOpened != 2)
{
pCC.innerHTML = "<table height='100%' id='TR_1_"+pCC.CASA_id+"' cellspacing=0 cellpadding=0  "+vBackGroundStyle+" class='"+vClass+"' onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);' ondrag='return false;'>"+
"<tr>"+
vTDs+
vPlusMinus+
"<td "+getTesttoolidHtml()+"='"+pCC.CASA_testtoolid+"_toggle' width=20px align='center' class='links' onclick='event.preventDefault(); if (C.checkIO()) { if (event.ctrlKey == true) { selectItem"+pCC.CASA_id+"(\"ctrl\"); return false;} else if (event.shiftKey == true) { selectItem"+pCC.CASA_id+"(\"shift\"); return false;} if (\""+pCC.CASA_directselectevent+"\" != \"ondblclick\") toggleItem"+pCC.CASA_id+"(); }'>"+
"<img border='0' src='"+vImage+"'>"+
"</td>"+
vTDDist+
"</tr>"+
"</table>";
pCC.CASA_treepart2.innerHTML = "<table id='TR_2_"+pCC.CASA_id+"' cellspacing=0 cellpadding=0 width='100%'  "+vBackGroundStyle+" class='"+vClass+"' onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);' ondrag='return false;'>"+
"<tr "+vPixelHeight+">"+
"<td style='padding-left: 0' nowrap='true' width='100%'>"+
"<div nowrap='true' style='width: 100%; border:0'>"+
vSpanDist+
vTextElement+
"</div>"+
"</td>"+
"<td class='TREENODECell'>&nbsp;</td>"+
"</tr>"+
"</table>";
}
else
{
pCC.innerHTML = "<table height='100%' id='TR_1_"+pCC.CASA_id+"' cellspacing=0 cellpadding=0  "+vBackGroundStyle+" class='"+vClass+"' onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);' ondrag='return false;'>"+
"<tr>"+
vTDs+
"<td "+getTesttoolidHtml()+"='"+pCC.CASA_testtoolid+"_toggle' width=20px align='center' class='links' "+vDirectSelEv+"='if (event.ctrlKey == true) { selectItem"+pCC.CASA_id+"(\"ctrl\"); return false;} else if (event.shiftKey == true) { selectItem"+pCC.CASA_id+"(\"shift\"); return false;} selectItem"+pCC.CASA_id+"();'>"+
"<img border='0' src='"+vImage+"'>"+
"</td>"+
vTDDist+
"</tr>"+
"</table>";
pCC.CASA_treepart2.innerHTML = "<table id='TR_2_"+pCC.CASA_id+"' cellspacing=0 cellpadding=0 width='100%'  "+vBackGroundStyle+" class='"+vClass+"' onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);' ondrag='return false;'>"+
"<tr "+vPixelHeight+">"+
"<td nowrap='true' width='100%'>"+
"<div nowrap='true' style='width:100%; border:0'>"+
vSpanDist+
vTextElement+
"</div>"+
"</td>"+
"<td class='TREENODECell'>&nbsp;</td>"+
"</tr>"+
"</table>";
}
var vtable = parent.gebid("TR_1_"+pCC.CASA_id);
var vtable2 = parent.gebid("TR_2_"+pCC.CASA_id);
var vlink = parent.gebid(pCC.CASA_linkId);
vtable.CASA_ref = vtable2;
vtable.CASA_link = vlink;
vtable2.CASA_ref = vtable;
vtable2.CASA_link = vlink;
vtable.onmouseover = pCC.CASA_reactmethod;
vtable.onmouseout = pCC.CASA_reactmethod;
vtable2.onmouseover = pCC.CASA_reactmethod;
vtable2.onmouseout = pCC.CASA_reactmethod;
if (vTextInput)
{
vIp = parent.document.getElementById("TN3IP"+pCC.CASA_id);
if (vIp != null)
if (pShowTextInput == true)
{
vIp.value = vText;
try { vIp.focus(); } catch (exc) {}
try { vIp.select(); } catch (exc) {}
}
else
{
addFocusRequestor(vIp)
}
}
else if (pCC.CASA_requestFocusForIndex == pCC.CASA_index)
{
pCC.CASA_requestFocusForIndex = null;
addFocusRequestor(pCC.CASA_outerTable);
}
}
function reactOnTextChangeTREENODE3(propName,
propValue,
pCCid)
{
var vCC = parent.document.getElementById(pCCid);
if (vCC.CASA_memText == propValue)
{
closeTextInputTREENODE3(vCC);
return;
}
setPropertyValue(propName,propValue);
if (vCC.CASA_flush == "server" || vCC.CASA_flushmethod != null)
{
if(vCC.CASA_flushmethod != null)
{
invokeMethodInModel(vCC.CASA_flushmethod);
}
else
submitModel("submit");
}
else
{
vCC.CASA_textInputFinished = true;
if (vCC.CASA_flush == "screen")
updateModelListenersS();
else
romuTREENODE3(vCC);
}
}
function findListOfTreeNodesTREENODE3(cc)
{
if (cc.CASA_treeNodes == null)
{
cc.CASA_treeNodes = [];
var func = new Function("return parent.getRowTableAreaIds"+cc.CASA_rowtableareaid+"();");
var ids = func();
ids = decodeCSVString(ids);
for (var i = 0; i < ids.length; i++)
{
var item = parent.gebid("T_"+ids[i]);
if (item != null) cc.CASA_treeNodes.push(item);
}
}
return cc.CASA_treeNodes;
}
function selectItemTREENODE3(pCC, key)
{
if (checkIO() == false) return;
if(checkIfNodeIsINACTIVE(pCC,null,false)) return;
if (pCC.CASA_withtextinput == true && pCC.CASA_arrayprop != null)
{
var vSelected = false;
var vCounter = 0;
while (true)
{
var vSelIndex = getPropertyValue(pCC.CASA_arrayprop+".selectedItemIndices["+vCounter+"].index");
if (vSelIndex == null) break;
if (vSelIndex == pCC.CASA_index)
vSelected = true;
vCounter++;
}
if (vCounter == 1 &&
vSelected == true)
{
romuTREENODE3(pCC, true);
return;
}
}
if (pCC.CASA_singleselect == "true" ||
!(key == "shift" || key == "ctrl"))
{
try
{
var nodes = findListOfTreeNodesTREENODE3(pCC);
for (var i = 0; i < nodes.length; i++)
{
if (nodes[i].CASA_memMarked == true ||
nodes[i].CASA_memMarked == "true")
{
nodes[i].CASA_enforceClassName = "TREENODETable";
romuTREENODE3(nodes[i]);
nodes[i].CASA_enforceClassName = null;
}
}
pCC.CASA_enforceClassName = findTREENODESelectedTable(pCC);
romuTREENODE3(pCC);
pCC.CASA_enforceClassName = null;
}
catch(exccc) {}
}
pCC.CASA_requestFocusForIndex = pCC.CASA_index;
selectItemTREENODE(pCC, key);
}
function toggleItemTREENODE3(cc)
{
if (checkIO() == false) return;
cc.CASA_requestFocusForIndex = cc.CASA_index;
setPropertyValue(cc.CASA_indexprop, cc.CASA_index);
invokeMethodInModel(cc.CASA_method);
}
function closeTextInputTREENODE3(pCC)
{
if(pCC.CASA_textinputopened == true)
{
pCC.CASA_textinputopened = false;
romuTREENODE3(pCC);
addActiveElementRequestor(pCC);
pointFocus();
}
}
function rokdTREENODE3(cc, evt, itemIndex)
{
if (evt.keyCode == 13)
{
m_noProcessingForNextHotKey = true;
if (cc.CASA_textinputopened == true)
{
var input = parent.gebid("TN3IP"+cc.CASA_id)
if (input.disabled != true)
{
var vText = getPropertyValue(cc.CASA_textprop);
if (vText != input.value)
reactOnTextChangeTREENODE3(cc.CASA_textprop, input.value ,cc.id);
else
closeTextInputTREENODE3(cc);
}
else
{
closeTextInputTREENODE3(cc);
}
cc.CASA_textinputopened = false;
}
else
{
selectItemTREENODE3(cc);
}
}
if (evt.keyCode == 27)
{
if (cc.CASA_textinputopened == true)
{
closeTextInputTREENODE3(cc);
}
}
else if (evt.keyCode == 32)
{
if (cc.CASA_textinputopened == true)
{
}
else
{
selectItemTREENODE3(cc);
}
}
else if (evt.keyCode == 39 || evt.keyCode == 187 || evt.keyCode == 107)
{
if (cc.CASA_textinputopened == true)
{
}
else
{
var opened = getPropertyValue(cc.CASA_openedprop);
if (opened == 0)
{
cc.CASA_requestFocusForIndex = cc.CASA_index;
setPropertyValue(cc.CASA_indexprop,cc.CASA_index);
invokeMethodInModel(cc.CASA_method);
return false;
}
}
}
else if (evt.keyCode == 37 || evt.keyCode == 189 || evt.keyCode == 109)
{
if (cc.CASA_textinputopened == true)
{
}
else
{
var opened = getPropertyValue(cc.CASA_openedprop);
if (opened == 1)
{
cc.CASA_requestFocusForIndex = cc.CASA_index;
setPropertyValue(cc.CASA_indexprop,cc.CASA_index);
invokeMethodInModel(cc.CASA_method);
return false;
}
}
}
else if ((evt.keyCode == 38 || evt.keyCode == 40) && (cc.CASA_textinputopened == true))
{
closeTextInputTREENODE3(cc);
}
return true;
}
function getFocusCellTREENODE3(cc)
{
return cc.CASA_outerTable;
}
function reactOnMouseUpTREENODE3(cc, evt)
{
if(checkIfNodeIsINACTIVE(cc,null,false)) return;
if (cc.CASA_memShowTextInput == true)
{
return false;
}
if (checkIO() == false) return;
if (checkIfDragProcessIsActiveCL())
{
var dropInfo = endDragCL();
if (dropInfo == getPropertyValue(cc.CASA_arrayprop+".items["+cc.CASA_index+"].dragInfo"))
return;
setContextMenuXYPAGE(evt.clientX, evt.clientY);
setPropertyValue(cc.CASA_dropinfoprop, dropInfo);
invokeMethodInModel(cc.CASA_reactondropgenericmethod);
}
else
{
reactOnMouseUpTREENODE(cc, evt);
}
}
function reactTREENODE3(cc, evt)
{
if      (evt.type == "focus") return reactOnFocusTREENODE3(cc,evt);
else if (evt.type == "blur") return reactOnBlurTREENODE3(cc,evt);
else if (evt.type == "mouseover") return rinTREENODE3(cc,evt);
else if (evt.type == "mouseout") return routTREENODE3(cc,evt);
else alert("Unhandled event (reactTREENODE3): " + evt.type);
}
function setCursorStyleTREENODE3(elm, cursorStyle)
{
if (elm == null) return;
try { elm.style.cursor = cursorStyle; } catch(excc) {}
for (var i=0; i<elm.childNodes.length;i++)
setCursorStyleTREENODE3(elm.childNodes[i], cursorStyle);
}
function rinTREENODE3(cc, evt)
{
try
{
if (checkIO() == false) return;
if(checkIfNodeIsINACTIVE(cc,null,false)) return;
elm = parent.gebid("TR_1_"+cc.CASA_id);
if (cc.CASA_memMarked != true)
{
elm.className = "TREENODETableRollover";
elm.CASA_ref.className = "TREENODETableRollover";
}
elm.CASA_link.className = cc.CASA_className + "Rollover";
var vSubnodes = getPropertyValue(cc.CASA_validdraginfosprop);
var cursorStyle = "hand";
var  vDraggedNode = CL().m_dragInfo.dropInfo;
if(vDraggedNode != null && vDraggedNode.indexOf("<control") < 0 && vSubnodes!=null && vSubnodes.indexOf(vDraggedNode) < 0)
cursorStyle = "not-allowed";
setCursorStyleTREENODE3(elm, cursorStyle);
} catch (exc) {}
}
function routTREENODE3(cc, evt)
{
try
{
if (checkIO() == false) return;
if(checkIfNodeIsINACTIVE(cc,null,false)) return;
var className = "TREENODETable";
if (cc.CASA_memMarked == true)
className = findTREENODESelectedTable(cc);
elm = parent.gebid("TR_1_"+cc.CASA_id);
elm.className = className;
elm.CASA_ref.className = className;
elm.CASA_link.className = cc.CASA_className;
setCursorStyleTREENODE3(elm, "");
} catch (exc) {}
}
function reactOnFocusTREENODE3(cc, evt)
{
try
{
if (cc.CASA_memMarked == true)return;
var table = parent.gebid("TR_1_"+cc.CASA_id);
table.className = "TREENODEFocusedTable";
table = parent.gebid("TR_2_"+cc.CASA_id);
table.className = "TREENODEFocusedTable";
}
catch (excc) {}
}
function reactOnBlurTREENODE3(cc, evt)
{
try
{
var vClass = "TREENODETable";
if (cc.CASA_memMarked == true)
vClass = findTREENODESelectedTable(cc);
var table = parent.gebid("TR_1_"+cc.CASA_id);
table.className = vClass;
table = parent.gebid("TR_2_"+cc.CASA_id);
table.className = vClass;
}
catch (excc) {}
}
