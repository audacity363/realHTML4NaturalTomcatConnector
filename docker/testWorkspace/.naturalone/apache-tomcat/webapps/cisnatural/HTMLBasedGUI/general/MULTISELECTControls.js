function addVersionInfoMULTISELECTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('MULTISELECTCONTROLS');
}
function initCasaControlMS2(pCC)
{
pCC.CASA_divleft.CASA_selection = null;
pCC.CASA_divleft.CASA_lastSelectedId = null;
pCC.CASA_divright.CASA_selection = null;
pCC.CASA_divright.CASA_lastSelectedId = null;
pCC.CASA_lastDir = null;
}
function reactOnModelUpdateMS2(pCC,forceRefresh)
{
var changeIndex = getPropertyValue(pCC.CASA_valueprop+".changeIndex");
if (pCC.CASA_changeindex == changeIndex && forceRefresh != true && pCC.CASA_lastDir == m_direction)
{
return;
}
pCC.CASA_changeindex = changeIndex;
if(pCC.CASA_lastDir != m_direction)
{
if(m_direction == "rtl")
{
pCC.CASA_button1.className = "MULTISELECTButtonInput1RTL";
pCC.CASA_button2.className = "MULTISELECTButtonInput2RTL";
pCC.CASA_button2b.className = "MULTISELECTButtonInput2BRTL";
pCC.CASA_button3.className = "MULTISELECTButtonInput3RTL";
}
else
{
pCC.CASA_button1.className = "MULTISELECTButtonInput1";
pCC.CASA_button2.className = "MULTISELECTButtonInput2";
pCC.CASA_button2b.className = "MULTISELECTButtonInput2B";
pCC.CASA_button3.className = "MULTISELECTButtonInput3";
try { pCC.CASA_button4.className = "MULTISELECTButtonInput4"; } catch (e) {}
try { pCC.CASA_button5.className = "MULTISELECTButtonInput5";  } catch (e) {}
}
pCC.CASA_lastDir = m_direction;
}
var displayStatus = "DISPLAY";
if (pCC.CASA_displayonly != "true")
{
displayStatus = getPropertyValue(pCC.CASA_valueprop+".displayStatus");
if (displayStatus == null)
displayStatus = "EDIT";
}
pCC.CASA_displaystatus = displayStatus;
if (displayStatus == "EDIT" || displayStatus == "FOCUS" || displayStatus == "FOCUS_NO_SELECT")
{
if (pCC.CASA_divleft.className != "MULTISELECTSelectedEdit") pCC.CASA_divleft.className = "MULTISELECTSelectedEdit";
if (pCC.CASA_divright.className != "MULTISELECTSelectedEdit") pCC.CASA_divright.className = "MULTISELECTSelectedEdit";
pCC.CASA_button1.disabled = false;
pCC.CASA_button2.disabled = false;
pCC.CASA_button2b.disabled = false;
pCC.CASA_button3.disabled = false;
}
else if (displayStatus == "ERROR" || displayStatus == "ERROR_NO_FOCUS")
{
if (pCC.CASA_divleft.className != "MULTISELECTSelectError") pCC.CASA_divleft.className = "MULTISELECTSelectError";
if (pCC.CASA_divright.className != "MULTISELECTSelectError") pCC.CASA_divright.className = "MULTISELECTSelectError";
pCC.CASA_button1.disabled = false;
pCC.CASA_button2.disabled = false;
pCC.CASA_button2b.disabled = false;
pCC.CASA_button3.disabled = false;
}
else if (displayStatus == "DISPLAY")
{
if (pCC.CASA_divleft.className != "MULTISELECTSelectDisplay") pCC.CASA_divleft.className = "MULTISELECTSelectDisplay";
if (pCC.CASA_divright.className != "MULTISELECTSelectDisplay") pCC.CASA_divright.className = "MULTISELECTSelectDisplay";
pCC.CASA_button1.disabled = true;
pCC.CASA_button2.disabled = true;
pCC.CASA_button2b.disabled = true;
pCC.CASA_button3.disabled = true;
pCC.CASA_divleft.CASA_selection = [];
pCC.CASA_divright.CASA_selection = [];
}
var vHTMLLeft = [];
vHTMLLeft.push("<table cellspacing=0 cellpadding=0 width=\"100%\">");
if (pCC.CASA_divleft.CASA_selection == null)
pCC.CASA_divleft.CASA_selection = [];
var vHTMLRight = [];
vHTMLRight.push("<table cellspacing=0 cellpadding=0 width=\"100%\">");
if (pCC.CASA_divright.CASA_selection == null)
pCC.CASA_divright.CASA_selection = [];
var vClassLeft = "MULTISELECTUnselectedEdit";
var vClassRight = "MULTISELECTSelectedEdit";
if (displayStatus == "ERROR"  || displayStatus == "ERROR_NO_FOCUS")
{
vClassLeft = "MULTISELECTSelectError";
vClassRight = "MULTISELECTSelectError";
}
else if (displayStatus == "DISPLAY")
{
vClassLeft = "MULTISELECTSelectDisplay";
vClassRight = "MULTISELECTSelectDisplay";
}
var ttid = "";
if (pCC.CASA_testtoolid != null) ttid = getTesttoolidHtml()+ "='"+pCC.CASA_testtoolid;
var selectionLeft = [];
var selectionRight = [];
var vCounter = 0;
while (true)
{
var vBase = pCC.CASA_valueprop+".items["+vCounter+"].";
var vId = getPropertyValue(vBase+"id");
if (vId == null) break;
var vText = getPropertyValue(vBase+"text");
var vSelected = getPropertyValue(vBase+"selected");
if (pCC.CASA_testtoolid != null) ttid += vCounter+"'";
if (vSelected == "true" || vSelected == true)
{
var vClass = vClassRight;
for (vI=0; vI < pCC.CASA_divright.CASA_selection.length; vI++)
if (pCC.CASA_divright.CASA_selection[vI] == vId)
{
selectionRight.push(vId);
vClass = "MULTISELECTCellSelectedRight";
break;
}
vHTMLRight.push("<tr id=\"MS2"+pCC.CASA_id+"TR"+vId+"\" class=\""+vClass+"\" onclick='selectItem"+pCC.CASA_id+"(\""+vId+"\", \"RIGHT\", event);'  return false;' ondblclick='mvToLeft"+pCC.CASA_id+"();' oncontextmenu='openContextMenu"+pCC.CASA_id+"(\""+vId+"\", \"RIGHT\", event); return false;' "+ttid+"><td><span>"+vText+"</span></td></tr>");
}
else
{
var vClass = vClassLeft;
for (vI=0; vI < pCC.CASA_divleft.CASA_selection.length; vI++)
if (pCC.CASA_divleft.CASA_selection[vI] == vId)
{
selectionLeft.push(vId);
vClass = "MULTISELECTCellSelectedLeft";
break;
}
vHTMLLeft.push("<tr id=\"MS2"+pCC.CASA_id+"TR"+vId+"\" class=\""+vClass+"\" onclick='selectItem"+pCC.CASA_id+"(\""+vId+"\", \"LEFT\", event); return false;' ondblclick='mvToRight"+pCC.CASA_id+"();' oncontextmenu='openContextMenu"+pCC.CASA_id+"(\""+vId+"\", \"LEFT\", event); return false;' "+ttid+"><td><span>"+vText+"</span></td></tr>");
}
vCounter++;
}
pCC.CASA_divleft.CASA_selection = selectionLeft;
pCC.CASA_divright.CASA_selection = selectionRight;
vHTMLLeft.push("</table>");
pCC.CASA_divleft.innerHTML = vHTMLLeft.join("");
vHTMLRight.push("</table>");
pCC.CASA_divright.innerHTML = vHTMLRight.join("");
}
function singleSelectMS2(pCC, pId, pSide)
{
var vUnselected;
var vDS = getPropertyValue(pCC.CASA_valueprop+".displayStatus");
if (vDS == "ERROR" || vDS == "ERROR_NO_FOCUS")
{
vUnselected =  "MULTISELECTSelectError";
}
else
{
vUnselected =  "MULTISELECTUnselectedEdit";
if (pSide == "RIGHT")
vUnselected = "MULTISELECTSelectedEdit";
}
var vSelected =  "MULTISELECTCellSelectedLeft";
if (pSide == "RIGHT")
vSelected = "MULTISELECTCellSelectedRight";
var vCC = pCC.CASA_divleft;
for(vI=0; vI < vCC.CASA_selection.length; vI++)
{
var vO = parent.gebid("MS2"+pCC.CASA_id+"TR"+vCC.CASA_selection[vI]);
vO.className = vUnselected;
}
pCC.CASA_divleft.CASA_selection = [];
vCC = pCC.CASA_divright;
for(vI=0; vI < vCC.CASA_selection.length; vI++)
{
var vO = parent.gebid("MS2"+pCC.CASA_id+"TR"+vCC.CASA_selection[vI]);
vO.className = vUnselected;
}
pCC.CASA_divright.CASA_selection = [];
var vO = parent.gebid("MS2"+pCC.CASA_id+"TR"+pId);
if (vO != null) vO.className = vSelected;
vCC = pCC.CASA_divleft;
if (pSide == "RIGHT")
vCC = pCC.CASA_divright;
vCC.CASA_selection.push(pId);
vCC.CASA_lastSelectedId = pId;
}
function onkeydownMS2(pCC, pSide, pEvent)
{
if (checkIOForNoSubmits() == false)
return;
if (pEvent.keyCode != 38 && pEvent.keyCode != 40)
return;
if (pCC.CASA_displayonly == true || pCC.CASA_displayonly == "true")
return;
var displayStatus = getPropertyValue(pCC.CASA_valueprop+".displayStatus");
if (displayStatus == "DISPLAY")
return;
var vCC = pCC.CASA_divleft;
if (pSide == "RIGHT")
vCC = pCC.CASA_divright;
if (vCC.CASA_lastSelectedId == null)
return;
var vDirection = 1-0;
if (pEvent.keyCode == 38)
vDirection = -1;
var vNeighId = findNeighbourId(pCC, pSide, vCC.CASA_lastSelectedId, vDirection);
if (vNeighId == null)
return;
var pItemId = vNeighId;
if (pEvent.shiftKey == true)
{
var found = false;
for(vI=0; vI < vCC.CASA_selection.length; vI++)
if (vCC.CASA_selection[vI] == vNeighId)
{
found = true;
break;
}
if (found)
pItemId = vCC.CASA_lastSelectedId;
var vTmp = [];
for(vI=0; vI < vCC.CASA_selection.length; vI++)
if (vCC.CASA_selection[vI] != pItemId)
vTmp.push(vCC.CASA_selection[vI]);
if (vCC.CASA_selection.length == vTmp.length)
vTmp.push(pItemId);
vCC.CASA_selection = vTmp;
if (found)
{
var vNextN = findNeighbourId(pCC, pSide, vCC.CASA_lastSelectedId, vDirection);
if (vNextN != null)
vCC.CASA_lastSelectedId = vNextN;
else
vCC.CASA_lastSelectedId = pItemId;
}
else
vCC.CASA_lastSelectedId = pItemId;
}
else
{
vCC.CASA_selection = [];
vCC.CASA_selection.push(pItemId);
vCC.CASA_lastSelectedId = pItemId;
}
reactOnModelUpdateMS2(pCC,true);
try
{
calculatePageOffset(vCC);
var vYMin = vCC.CASA_pageoffsettop + vCC.scrollTop;
var vYMax = vYMin + vCC.offsetHeight - 0;
var vCounter = 0;
while (true)
{
var vBase = pCC.CASA_valueprop+".items["+vCounter+"].";
var vId = getPropertyValue(vBase+"id");
if (vId == null) break;
if (vId == vCC.CASA_lastSelectedId)
break;
vCounter++;
}
var vTR = parent.document.getElementById("MS2"+pCC.CASA_id+"TR"+vCounter);
var vTRHeight = vTR.offsetHeight-0;
var vTRIndex = findItemIndex(pCC, pSide, vCC.CASA_lastSelectedId);
var vTROffsetTop = vCC.CASA_pageoffsettop-0 + vTR.offsetHeight*vTRIndex-0;
if (vTROffsetTop < vYMin)
vCC.scrollTop = vCC.scrollTop - vTRHeight;
else if ((vTROffsetTop+10) >= vYMax)
vCC.scrollTop = vCC.scrollTop + vTRHeight -0;
}
catch (exc)
{
}
}
function findItemIndex(pCC, pSide, pId)
{
var vItemList = [];
var vCounter = 0;
while (true)
{
var vBase = pCC.CASA_valueprop+".items["+vCounter+"].";
var vId = getPropertyValue(vBase+"id");
if (vId == null) break;
var vSelected = getPropertyValue(vBase+"selected");
if (pSide == "LEFT" && (vSelected == false || vSelected == "false"))
vItemList.push(vId);
if (pSide == "RIGHT" && (vSelected == true || vSelected == "true"))
vItemList.push(vId);
vCounter++;
}
var vItemIndex = -1;
for (vCounter=0; vCounter < vItemList.length; vCounter++)
if (vItemList[vCounter] == pId)
{
vItemIndex = vCounter;
break;
}
return vItemIndex;
}
function findNeighbourId(pCC, pSide, pId, pDirection)
{
var vItemList = [];
var vCounter = 0;
while (true)
{
var vBase = pCC.CASA_valueprop+".items["+vCounter+"].";
var vId = getPropertyValue(vBase+"id");
if (vId == null) break;
var vSelected = getPropertyValue(vBase+"selected");
if (pSide == "LEFT" && (vSelected == false || vSelected == "false"))
vItemList.push(vId);
if (pSide == "RIGHT" && (vSelected == true || vSelected == "true"))
vItemList.push(vId);
vCounter++;
}
var itemIndex = -1;
for (vCounter=0; vCounter < vItemList.length; vCounter++)
if (vItemList[vCounter] == pId)
{
itemIndex = vCounter;
break;
}
if (itemIndex == -1)
return null;
if (itemIndex == 0 && pDirection == -1)
return null;
if (itemIndex == (vItemList.length-1) && pDirection == 1)
return null;
if (pDirection == -1)
return vItemList[itemIndex-1];
return vItemList[itemIndex+1-0];
}
function moveSelectedItemsMS2(pCC, pDirection)
{
if (checkIOForNoSubmits() == false)
return;
var vSelected = true;
var vCC = pCC.CASA_divleft;
var vCC2 = pCC.CASA_divright;
if (pDirection == "TOLEFT")
{
vCC = pCC.CASA_divright;
vCC2 = pCC.CASA_divleft;
vSelected = false;
}
for(vI=0; vI < vCC.CASA_selection.length; vI++)
setPropertyValueMS2(pCC, vCC.CASA_selection[vI], vSelected);
vCC.CASA_selection = [];
vCC.CASA_lastSelectedId = null;
vCC2.CASA_selection = [];
vCC2.CASA_lastSelectedId = null;
reactOnModelUpdateMS2(pCC,true);
if (pCC.CASA_flush == "server" || pCC.CASA_flushmethod != null)
{
setPropertyValue("param1",pCC.CASA_valueprop);
if(pCC.CASA_flushmethod != null)
invokeMethodInModel(pCC.CASA_flushmethod);
else
submitModel("submit");
}
else if (pCC.CASA_flush == "screen")
updateModelListenersS();
}
function moveAllMS2(pCC, pDirection)
{
if (checkIOForNoSubmits() == false)
return;
var vSide = "LEFT";
var vSelected = true;
var vCC2 = pCC.CASA_divright;
if (pDirection == "TOLEFT")
{
vSelected = false;
vCC2 = pCC.CASA_divleft;
vSide = "RIGHT";
}
var vCounter = 0;
while (true)
{
var vId = getPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].id");
if (vId == null) break;
setPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].selected", vSelected);
vCounter++;
}
pCC.CASA_divright.CASA_selection = [];
pCC.CASA_divright.CASA_lastSelectedId = null;
pCC.CASA_divleft.CASA_selection = [];
pCC.CASA_divleft.CASA_lastSelectedId = null;
reactOnModelUpdateMS2(pCC,true);
if (pCC.CASA_flush == "server" || pCC.CASA_flushmethod != null)
{
setPropertyValue("param1",pCC.CASA_valueprop);
if(pCC.CASA_flushmethod != null)
invokeMethodInModel(pCC.CASA_flushmethod);
else
submitModel("submit");
}
else if (pCC.CASA_flush == "screen")
updateModelListenersS();
}
function setPropertyValueMS2(pCC, identifier, value)
{
var vCounter = 0;
while (true)
{
var vId = getPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].id");
if (vId == null) break;
if (vId == identifier)
{
setPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].selected", value);
return;
}
vCounter++;
}
}
function selectItemMS2(pCC, pId, pSide, pEvent)
{
if (checkIOForNoSubmits() == false)
return;
if (this.parent.document.selection)
this.parent.document.selection.empty();
else
this.parent.window.getSelection().removeAllRanges();
if (pCC.CASA_displayonly == true || pCC.CASA_displayonly == "true")
return;
var displayStatus = getPropertyValue(pCC.CASA_valueprop+".displayStatus");
if (displayStatus == "DISPLAY")
return;
if (pEvent.ctrlKey != true && pEvent.shiftKey != true)
{
singleSelectMS2(pCC, pId, pSide);
return;
}
var vCC = pCC.CASA_divleft;
if (pSide == "RIGHT")
vCC = pCC.CASA_divright;
if (vCC.CASA_selection == null)
vCC.CASA_selection = [];
if (pEvent.ctrlKey == true)
{
var vTmp = [];
for(vI=0; vI < vCC.CASA_selection.length; vI++)
if (vCC.CASA_selection[vI] != pId)
vTmp.push(vCC.CASA_selection[vI]);
if (vCC.CASA_selection.length == vTmp.length)
vTmp.push(pId);
vCC.CASA_lastSelectedId = pId;
vCC.CASA_selection = vTmp;
}
else if (pEvent.shiftKey == true)
{
var vItemList = [];
var vCounter = 0;
while (true)
{
var vBase = pCC.CASA_valueprop+".items["+vCounter+"].";
var vId = getPropertyValue(vBase+"id");
if (vId == null) break;
var vSelected = getPropertyValue(vBase+"selected");
if (pSide == "LEFT" && (vSelected == false || vSelected == "false"))
vItemList.push(vId);
if (pSide == "RIGHT" && (vSelected == true || vSelected == "true"))
vItemList.push(vId);
vCounter++;
}
var rowIndex = -1;
for (vCounter=0; vCounter < vItemList.length; vCounter++)
if (vItemList[vCounter] == pId)
{
rowIndex = vCounter;
break;
}
if (rowIndex == -1)
return;
var shiftSelectAnchor = -1;
for (var i0=rowIndex-1; i0>=0; i0--)
{
var vIsSelected = isSelectedMS2(pCC, vItemList[i0], pSide);
if (vIsSelected == "true" || vIsSelected == true)
{
shiftSelectAnchor = i0;
break;
}
}
if (shiftSelectAnchor == -1 || shiftSelectAnchor == rowIndex)
{
for (var i1=rowIndex-0+1-0; i1 < vItemList.length; i1++)
{
var vIsSelected = isSelectedMS2(pCC, vItemList[i1], pSide);
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
var vIsSelected = isSelectedMS2(pCC, vItemList[i2], pSide);
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
for (;i3 < vItemList.length; i3++)
{
var vIsSelected = isSelectedMS2(pCC, vItemList[i3], pSide);
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
vCC.CASA_selection = [];
for(i4=fromIndex; i4<=toIndex; i4++)
vCC.CASA_selection.push(vItemList[i4]);
vCC.CASA_lastSelectedId = vItemList[rowIndex];
}
else
{
vCC.CASA_selection = [];
vCC.CASA_selection.push(pId);
vCC.CASA_lastSelectedId = pId;
}
if (pSide == "RIGHT")
pCC.CASA_divleft.CASA_selection = [];
else
pCC.CASA_divright.CASA_selection = [];
reactOnModelUpdateMS2(pCC,true);
}
function isSelectedMS2(pCC, pId, pSide)
{
var vCC = pCC.CASA_divleft;
if (pSide == "RIGHT")
vCC = pCC.CASA_divright;
for(var vI=0; vI<vCC.CASA_selection.length; vI++)
if (vCC.CASA_selection[vI] == pId)
return true;
return false;
}
function openContextMenuMS2(pCC, pId, pSide, pEvent)
{
if (checkIO() == false) return;
if (pCC.CASA_displayonly == "true") return false;
if (getPropertyValue(pCC.CASA_valueprop+".displayStatus") == "DISPLAY") return false;
if (isSelectedMS2(pCC, pId, pSide) == false)
{
if (pSide == "LEFT")
{
pCC.CASA_divleft.CASA_selection = [];
pCC.CASA_divleft.CASA_selection.push(pId);
}
else
{
pCC.CASA_divright.CASA_selection = [];
pCC.CASA_divright.CASA_selection.push(pId);
}
}
if (pSide == "LEFT")
pCC.CASA_divright.CASA_selection = [];
else
pCC.CASA_divleft.CASA_selection = [];
setContextMenuXYPAGE(pEvent.clientX,pEvent.clientY);
var vIndex = -1;
var vCounter = 0;
while (true)
{
var vId = getPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].id");
if (vId == null) break;
if (vId == pId)
{
vIndex = vCounter;
break;
}
vCounter++;
}
if (vIndex == -1)
return;
reactOnModelUpdateMS2(pCC,true);
var vItemIdsCSV = null;
if (pSide == "LEFT")
vItemIdsCSV = pCC.CASA_divleft.CASA_selection.join(";")
else
vItemIdsCSV = pCC.CASA_divright.CASA_selection.join(";")
setPropertyValue(pCC.CASA_valueprop+".contextMenuItemsCSV", vItemIdsCSV);
invokeMethodInModel(pCC.CASA_valueprop+".items["+vIndex+"].reactOnContextMenuRequest");
}
function reactOnHelpMS2(pCC,parentevent)
{
if (checkIOForNoSubmits() == false)
{
parent.event.returnValue = false;
return;
}
if (pCC.CASA_helpid != undefined)
{
var vHelpId = pCC.CASA_helpid;
if (pCC.CASA_helpid == "$valueprop$")
vHelpId = pCC.CASA_valueprop;
setPropertyValue("param2",vHelpId);
invokeMethodInModel("reactOnHelpRequestForHelpId");
}
parentevent.returnValue = false;
}
function moveSelectedItemUp(pCC)
{
var vCC = pCC.CASA_divright;
if (vCC.CASA_selection == null) return;
if (vCC.CASA_selection.length == 0) return;
for(var i=0; i < vCC.CASA_selection.length; i++)
{
var vSelectedId = vCC.CASA_selection[i];
var vLastSelectedItemPos = -1;
var vCounter = 0;
while (true)
{
var vCurrentId = getPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].id");
if (vCurrentId == null) break;
var vCurrentSelected = getPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].selected")+"";
if((vCurrentId != vSelectedId) && (vCurrentSelected == "true"))
vLastSelectedItemPos = vCounter;
if(vCurrentId == vSelectedId)
{
if(vLastSelectedItemPos < 0) break;
swapItems(pCC, vCounter, vLastSelectedItemPos);
break;
}
vCounter++;
}
if(vLastSelectedItemPos < 0) break;
}
reactOnModelUpdateMS2(pCC,true);
}
function moveSelectedItemDown(pCC)
{
var vCC = pCC.CASA_divright;
if (vCC.CASA_selection == null) return;
if (vCC.CASA_selection.length == 0) return;
for(var i=vCC.CASA_selection.length-1; i >=0 ; i--)
{
var vSelectedId = vCC.CASA_selection[i];
var vNextSelectedItemPos = -1;
var vCounter = 0;
while (true)
{
var vCurrentId = getPropertyValue(pCC.CASA_valueprop+".items["+vCounter+"].id");
if (vCurrentId == null) break;
vNextSelectedItemPos = getNextSelectedPos(pCC, vCounter + 1);
if(vNextSelectedItemPos < 0) break;
if(vCurrentId == vSelectedId)
{
swapItems(pCC, vCounter, vNextSelectedItemPos);
break;
}
vCounter++;
}
if(vNextSelectedItemPos < 0) break;
}
reactOnModelUpdateMS2(pCC,true);
}
function swapItems(pCC, pFromPos, pToPos)
{
var vPrevId = getPropertyValue(pCC.CASA_valueprop+".items["+pToPos+"].id");
if (vPrevId == null) return;
var vCurrentId = getPropertyValue(pCC.CASA_valueprop+".items["+pFromPos+"].id");
if (vCurrentId == null) return;
var vPrevSelected = getPropertyValue(pCC.CASA_valueprop+".items["+pToPos+"].selected");
var vPrevText = getPropertyValue(pCC.CASA_valueprop+".items["+pToPos+"].text");
var vCurrentSelected = getPropertyValue(pCC.CASA_valueprop+".items["+pFromPos+"].selected");
var vCurrentText = getPropertyValue(pCC.CASA_valueprop+".items["+pFromPos+"].text");
setPropertyValue(pCC.CASA_valueprop+".items["+pToPos+"].id" , vCurrentId);
setPropertyValue(pCC.CASA_valueprop+".items["+pToPos+"].selected" , vCurrentSelected);
setPropertyValue(pCC.CASA_valueprop+".items["+pToPos+"].text" , vCurrentText);
setPropertyValue(pCC.CASA_valueprop+".items["+pFromPos+"].id" , vPrevId);
setPropertyValue(pCC.CASA_valueprop+".items["+pFromPos+"].selected" , vPrevSelected);
setPropertyValue(pCC.CASA_valueprop+".items["+pFromPos+"].text" , vPrevText);
}
function getNextSelectedPos(pCC, pStartCounter)
{
while (true)
{
var vNextId = getPropertyValue(pCC.CASA_valueprop+".items["+pStartCounter+"].id");
if (vNextId == null) break;
var vNextSelected = getPropertyValue(pCC.CASA_valueprop+".items["+pStartCounter+"].selected")+"";
if (vNextSelected == "true")
return pStartCounter;
pStartCounter++;
}
return -1;
}
