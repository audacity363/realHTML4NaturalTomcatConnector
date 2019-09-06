function addVersionInfoPOPUPVALUESCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('POPUPVALUESCONTROLS');
}
var m_userInputPOPUPVALUES="";
var m_selectedItemIndexPOPUPVALUES;
function reactOnModelUpdatePOPUPVALUES(pInfoprop)
{
var vAvailable = getPropertyValue(pInfoprop+".available");
if (vAvailable == null) return;
if (vAvailable == "false")
{
var div = findMPADIV(false);
if (div != null)
{
if (div.CASA_ismessagepopup != true)
{
div.style.display = "none";
div.innerHTML = "";
}
}
return;
}
var vMPADIV = findMPADIV();
var vHeight = getPropertyValue(pInfoprop+".pixelHeight")-0;
if (vHeight == null || vHeight <= 0)
vHeight = 150;
if (m_leftFIELD != null) vMPADIV.style.left = C_adjustUnits(m_leftFIELD);
vBodyHeight = parent.innerHeight;
if (m_topFIELD != null)
{
var vTop = m_topFIELD + m_heightFIELD;
var mozPageScroll = mozCalculatePageScoll(m_controlFIELD);
vMPADIV.style.top = C_adjustUnits((vTop-mozPageScroll));
if (m_topFIELD + m_heightFIELD + vHeight > vBodyHeight)
{
if (vHeight > m_topFIELD)
{
if (vBodyHeight - (m_topFIELD + m_heightFIELD) >= m_topFIELD)
{
vHeight = vBodyHeight - (m_topFIELD + m_heightFIELD) - 1;
}
else
{
vHeight = m_topFIELD-1;
vMPADIV.style.top = C_adjustUnits((m_topFIELD - vHeight +1));
}
}
else
{
if (mozPageScroll > 0)
{
maxHeight = m_topFIELD - mozPageScroll;
if (vHeight > maxHeight) vHeight = maxHeight;
}
vMPADIV.style.top = C_adjustUnits((m_topFIELD - mozPageScroll - vHeight));
}
}
}
var vWidth = getPropertyValue(pInfoprop+".pixelWidth")-0;
if (vWidth == null || vWidth <= 0)
{
if (m_controlFIELD.CASA_popupcombowidth != null)
vWidth = m_controlFIELD.CASA_popupcombowidth-0;
else if (m_widthFIELD != null && m_widthFIELD>150)
vWidth = m_widthFIELD;
else
vWidth = 150;
}
var vBodyWidth = parent.document.body.clientWidth;
if (m_leftFIELD + vWidth > vBodyWidth)
vWidth = vBodyWidth - m_leftFIELD -10;
m_selectedItemIndexPOPUPVALUES = 0;
var iRow = 0;
var rowCount = 0;
var vHTML = [];
vHTML.push("<div id='MPADIVDIV' tabindex='1' onkeydown='C.onkeydownPOPUPVALUES(\""+pInfoprop+"\", event);' onkeypress='C.onkeypressPOPUPVALUES(\""+pInfoprop+"\", event); event.stopPropagation(); return false;' class='POPUPVALUESDiv' style='overflow: auto; height: "+C_adjustUnits(vHeight)+"; width:"+C_adjustUnits(vWidth)+";' onclick='C.m_avoidClickAway = true;'>");
vHTML.push("<table cellspacing=0 cellpadding=1 width='100%' onmousemove='C.switchStylePOPUPVALUES(event,null,true);' onclick='C.selectValuePOPUPVALUES(\""+pInfoprop+"\",event);'>");
vMPADIV.CASA_plusOneItem = false;
vMPADIV.CASA_topList = [];
var hasMatches = false;
var kc = m_valuehelpKeyCodeFIELD;
if (kc != null && kc != "")
{
var matchListHTML = [];
while (true)
{
var vProp = pInfoprop + ".items[" + iRow + "].name";
if (m_textidmodeFIELD != 2) vProp = pInfoprop + ".items[" + iRow + "].id";
var value = getPropertyValue(vProp);
if (value == null) break;
var v = false;
try { v = compareSearchString(value,kc);} catch (css){ break;}
if(v == true)
{
var vRow = buildHTMLForRowPOPUPVALUES(pInfoprop, iRow, rowCount);
matchListHTML.push(vRow);
rowCount++;
hasMatches = true;
vMPADIV.CASA_topList.push(iRow);
}
iRow++;
}
if (rowCount == 0)
{
var mess = replaceLiteralTRANSLATION(m_language, "nomatch");
vHTML.push("<tr><td colspan=2 class='POPUPVALUESColName'><b>"+kc+"</b>  "+mess+"</td></tr>");
vMPADIV.CASA_plusOneItem = true;
}
else
{
vHTML.push("<tr><td colspan=2 class='POPUPVALUESColName'><b>"+kc+"</b></td></tr>");
vMPADIV.CASA_plusOneItem = true;
vHTML.push("<tr><td colspan=2><hr></td></tr>");
vHTML.push(matchListHTML.join(""));
}
vHTML.push("<tr><td colspan=2><hr></td></tr>");
}
iRow = 0;
while (true)
{
var vRow = buildHTMLForRowPOPUPVALUES(pInfoprop,iRow,rowCount);
if (vRow == null) break;
vHTML.push(vRow);
rowCount++;
iRow++;
}
vHTML.push("</table>");
vHTML.push("</div>");
vMPADIV.innerHTML = vHTML.join("");
var vInnerDiv = parent.gebid('MPADIVDIV');
vMPADIV.CASA_length = rowCount;
vMPADIV.CASA_innerdiv = vInnerDiv;
if (hasMatches == true)
m_selectedItemIndexPOPUPVALUES = 0;
vMPADIV.CASA_itemIndex = m_selectedItemIndexPOPUPVALUES;
vMPADIV.style.display = "";
m_controlFIELD.style.cursor = "";
if (m_controlFIELD != null && m_controlFIELD.CASA_autocallpopupmethod == "true")
{
addFocusRequestor(m_controlFIELD);
}
else
{
if (m_controlFIELD.className=="FIELDInputEditWithPopup" ||
m_controlFIELD.className=="FIELDInputErrorWithPopup")
clearFocusRequestor();
addFocusRequestor(vInnerDiv);
selectLinePOPUPVALUES(vMPADIV,m_selectedItemIndexPOPUPVALUES);
}
}
function compareSearchString(value,kc)
{
if (value == null) return false;
if (kc == null) return false;
var valuelc = value.toLowerCase();
var kclc = kc.toLowerCase();
var vMatch = valuelc.search(kclc);
return (vMatch == 0);
}
function buildHTMLForRowPOPUPVALUES(pInfoprop, vIndex, rowCount)
{
var vHTML = [];
var vProp = pInfoprop + ".items[" + vIndex + "].name";
var vName = getPropertyValue(vProp);
if (vName == null) return null;
vProp = pInfoprop + ".items[" + vIndex + "].id";
var vId = getPropertyValue(vProp);
var vProperty = getPropertyValue(pInfoprop+".property");
if (vProperty != null) var vCurValue = getPropertyValue(vProperty);
var vStyle = "";
if (vId == vCurValue)
{
vStyle = "style='font-weight: bold'";
m_selectedItemIndexPOPUPVALUES = vIndex;
}
var vNameClass = "POPUPVALUESColName";
vHTML.push("<tr id='MPADIVLIN_"+rowCount+"'>");
if (m_textidmodeFIELD != 2) vHTML.push("<td id='MPADIVLIN_"+rowCount+"' class='POPUPVALUESColId' "+vStyle+">"+vId+"</td>");
else vNameClass = "POPUPVALUESColId";
vName += "&nbsp;";
vHTML.push("<td id='MPADIVLIN_"+rowCount+"' class='"+vNameClass+"' "+vStyle+">"+vName+"</td>");
vHTML.push("</tr>");
return vHTML.join("");
}
function selectLinePOPUPVALUES(vMPADIV,itemIndex,withFocus)
{
var line = parent.gebid("MPADIVLIN_"+itemIndex);
if (line == null) return;
line.className = "POPUPVALUESRowRollin";
if(withFocus != undefined && withFocus != null && withFocus)
{
vMPADIV.CASA_innerdiv.focus();
}
var innerDiv = vMPADIV.CASA_innerdiv;
calculatePageOffset(innerDiv);
innerDiv.scrollTop  = line.offsetHeight*itemIndex;
}
function onkeydownPOPUPVALUES(pInfoprop,pEvent) { CL().C_onkeydownPOPUPVALUES(this,pInfoprop,pEvent); }
function onkeypressPOPUPVALUES(pInfoprop,pEvent) { CL().C_onkeypressPOPUPVALUES(this,pInfoprop,pEvent); }
function vscrollPOPUPVALUES(pDiv, pItemIndex, plusOneItem) { CL().C_vscrollPOPUPVALUES(this,pDiv,pItemIndex,plusOneItem); }
var m_selectedId = null;
function selectValuePOPUPVALUES(pInfoprop,pEvent)
{
if (checkIO() == false) return;
var srcElm = findSrcElement(pEvent);
var id = srcElm.id;
if(id != "" && id.search("MPADIVLIN_") > -1)
{
var index = id.split("MPADIVLIN_");
var pIndex = index[1];
setPropertyValue(pInfoprop+".flushMethod",m_flushMethodFIELD);
setPropertyValue(pInfoprop+".selIndex",determinSelectionIndexPOPUPVALUES(pIndex));
m_selectedId = pIndex;
invokeMethodInModel(pInfoprop+".triggerSel");
addFocusRequestor(m_controlFIELD);
pointFocus();
}
}
var m_rolledinRow = null;
function switchStylePOPUPVALUES(pEventOrIndex,pStyleIndex,eventMode)
{
if (checkIO() == false) return;
if(eventMode)
{
var vRow = findSrcElement(pEventOrIndex);
if(vRow.id != "" && vRow.id.search("MPADIVLIN_")> -1)
{
if(vRow.tagName == "TD")
vRow = vRow.parentNode;
if(m_rolledinRow == null)
{
vRow.className = "POPUPVALUESRowRollin";
m_rolledinRow = vRow;
}
else if(vRow != m_rolledinRow)
{
vRow.className = "POPUPVALUESRowRollin";
m_rolledinRow.className = "POPUPVALUESRowNormal";
m_rolledinRow = vRow;
}
}
}
else
{
vRow = parent.document.getElementById("MPADIVLIN_"+pEventOrIndex);
if (pStyleIndex == 1) vRow.className = "POPUPVALUESRowRollin";
else if (pStyleIndex == 2) vRow.className = "POPUPVALUESRowNormal";
}
}
function determinSelectionIndexPOPUPVALUES(itemIndex)
{
var vDIV = findMPADIV();
if (itemIndex >= vDIV.CASA_topList.length)
return itemIndex - vDIV.CASA_topList.length;
return vDIV.CASA_topList[itemIndex];
}
function mozCalculatePageScoll(pControl)
{
var vControl = pControl;
var vScroll = 0;
while (true)
{
try
{
if (vControl == null) break;
if (vControl.scrollTop > 0)
vScroll = vScroll + vControl.scrollTop;
var vTemp = vControl.parentNode;
if (vControl == vTemp) break;
vControl = vTemp;
}
catch (exc)
{
break;
}
}
return vScroll;
}
