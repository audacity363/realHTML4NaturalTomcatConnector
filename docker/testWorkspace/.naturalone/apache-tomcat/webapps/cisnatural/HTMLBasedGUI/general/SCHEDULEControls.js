function addVersionInfoSCHEDULECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SCHEDULECONTROLS');
}
function initCasaControlSCHEDULELINE(cc)
{
cc.CASA_bufferedValue = undefined;
cc.CASA_bufferedId = undefined;
}
function reactOnModelUpdateSCHEDULELINE(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
var vid = null;
if (cc.CASA_selscheduleprop != null)
vid = getPropertyValue(cc.CASA_selscheduleprop);
if (v == null)
{
if (cc.CASA_height != null)
cc.innerHTML = "<div style='font-size: 1px; height:"+C_adjustUnits(cc.CASA_height)+"'></div>";
else
cc.innerHTML = "<div></div>";
cc.CASA_bufferedValue = v;
return;
}
if (v == cc.CASA_bufferedValue && cc.CASA_crosslineids == false)
return;
if (v == cc.CASA_bufferedValue && vid == cc.CASA_bufferedId)
return;
cc.CASA_bufferedValue = v;
cc.CASA_bufferedId = vid;
if (cc.CASA_verticalschedule != "true")
cc.innerHTML = reactOnModelUpdateHSCHEDULELINE(cc,v,vid);
else
cc.innerHTML = reactOnModelUpdateVSCHEDULELINE(cc,v,vid);
}
function reactOnModelUpdateHSCHEDULELINE(cc,v,vid)
{
var vHTML = [];
var vtabstyle = "";
if (cc.CASA_pixelsizemode == true) vtabstyle = "style='table-layout: fixed'";
vHTML.push("<table width='100%' cellpadding=0 cellspacing=0 "+vtabstyle+">");
vHTML.push("<tr>");
var vValues = decodeCSVString(v);
var vTooltips = "";
var vTooltipCSV = "";
var vTooltipIndex = 0;
if (cc.CASA_tooltipprop != null)
{
vTooltips = getPropertyValue(cc.CASA_tooltipprop);
if (vTooltips.indexOf(";") >= 0)
vTooltipCSV = decodeCSVString(vTooltips);
}
for (i=0; i<vValues.length-3; i=i+4)
{
var vColor = vValues[i];
var vWidth = vValues[i+1];
var vText = vValues[i+2];
var vSelectId = vValues[i+3];
var vHeight = "";
var vTesttoolid = "";
if (cc.CASA_height != null)
vHeight = "height='"+C_adjustUnits(cc.CASA_height)+"'";
var vEvents = "";
var vTooltip = "";
if (vTooltips.indexOf(";") >= 0 && vText != null && vText != "")
{
if (vTooltipIndex < vTooltipCSV.length && vTooltipCSV[vTooltipIndex].length != 0)
vTooltip = "title='"+convertApos(vTooltipCSV[vTooltipIndex])+"'";
vTooltipIndex++;
}
else if (vTooltips.indexOf(";") < 0)
vTooltip = "title='"+convertApos(vTooltips)+"'";
if (vSelectId != null && vSelectId != "")
{
vEvents = "oncontextmenu='selectItem2"+cc.CASA_id+"(\""+vSelectId+"\");' onclick='selectItem"+cc.CASA_id+"(\""+vSelectId+"\");'";
if (cc.CASA_preselectmode == true)
vEvents = "ondblclick='selectItemDblClick"+cc.CASA_id+"(\""+vSelectId+"\");' " + vEvents;
}
var vCSS = "SCHEDULEGRIDCellDivSelectable";
if (vSelectId == null || vSelectId == "") vCSS = 'SCHEDULEGRIDCellDiv';
if (vSelectId == vid) vCSS = "SCHEDULEGRIDCellDivSelected";
vNowrap = "nowrap";
if (cc.CASA_cellnowrap == false) vNowrap = "";
vtdof = "";
vTesttoolid = " "+ getTesttoolidHtml() + "='"+cc.CASA_valueprop+(i/4)+"' ";
if (cc.CASA_pixelsizemode == false)
{
vHTML.push("<td style='background-color: "+vColor+";' width='"+C_adjustUnits(vWidth)+"' "+C_adjustUnits(vHeight)+" "+vEvents+ " " + vTooltip + " " + vTesttoolid + " >");
if (vText != null && vText != "")
{
vHTML.push("<table border=0 width='100%' height='100%' cellpadding=0 cellspacing=0 border=0 style='table-layout: fixed'>");
vHTML.push("<tr><td id='SCH__"+vSelectId+"' "+vNowrap+" class='"+vCSS+"' style='"+cc.CASA_cellstyle+"' valign='"+cc.CASA_cellvalign+"' align='"+cc.CASA_cellalign+"' height='100%' width='100%'>");
vHTML.push("<div "+vNowrap+" style='width:100%; height:100%; overflow: hidden'>");
vHTML.push(vText);
vHTML.push("</div>");
vHTML.push("</td></tr>");
vHTML.push("</table>");
}
vHTML.push("</td>");
}
else
{
vHTML.push("<td width='"+C_adjustUnits(vWidth)+"' "+C_adjustUnits(vHeight)+" id='SCH__"+vSelectId+"' "+vNowrap+" class='"+vCSS+"' style='background-color: "+vColor+";"+cc.CASA_cellstyle+"' valign='"+cc.CASA_cellvalign+"' align='"+cc.CASA_cellalign+"' "+vEvents+ " " + vTooltip+ " " + vTesttoolid +" >");
if (vText != null && vText != "")
{
vHTML.push(vText);
}
vHTML.push("</td>");
}
}
vHTML.push("</tr>");
vHTML.push("</table>");
return vHTML.join("");
}
function reactOnModelUpdateVSCHEDULELINE(cc,v,vid)
{
var vHTML;
var vtabstyle = "";
var vImageURL = "";
var vImageOrientation = "";
var vTooltips = "";
var vTooltipCSV = "";
if (cc.CASA_pixelsizemode == true) vtabstyle = "style='table-layout: fixed'";
if (cc.CASA_tablestyle !=  null)	vtabstyle = "style='"+cc.CASA_tablestyle+"table-layout: fixed'";
if (cc.CASA_imageprop != null)  vImageURL = getPropertyValue(cc.CASA_imageprop);
if (cc.CASA_imageorientation != null) vImageOrientation = cc.CASA_imageorientation;
var vImage = undefined;
var vImageIndex = 0;
var vTooltipIndex = 0;
if (vImageURL.indexOf(";") >= 0)
vImage = decodeCSVString(vImageURL);
if (cc.CASA_tooltipprop != null)
{
vTooltips = getPropertyValue(cc.CASA_tooltipprop);
if (vTooltips.indexOf(";") >= 0)
vTooltipCSV = decodeCSVString(vTooltips);
}
vHTML = "<table height='"+C_adjustUnits(cc.CASA_height)+"' width='100%' cellpadding=0 cellspacing=0 style='"+cc.CASA_tablestyle+"table-layout: fixed'>";
var vValues = decodeCSVString(v);
var vTesttoolid = "";
for (i=0; i<vValues.length-3; i=i+4)
{
var vColor = vValues[i];
var vWidth = vValues[i+1];
var vText = vValues[i+2];
var vSelectId = vValues[i+3];
var vHeight = "";
if (cc.CASA_height != null)
vHeight = "height='"+C_adjustUnits(vWidth)+"'";
var vTooltip = "";
if (vTooltips.indexOf(";") >= 0 && vText != null && vText != "")
{
if (vTooltipIndex < vTooltipCSV.length && vTooltipCSV[vTooltipIndex].length != 0)
vTooltip = "title='"+convertApos(vTooltipCSV[vTooltipIndex])+"'";
vTooltipIndex++;
}
else if (vTooltips.indexOf(";") < 0)
vTooltip = "title='"+convertApos(vTooltips)+"'";
var vEvents = "";
if (vSelectId != null && vSelectId != "")
{
vEvents = "oncontextmenu='C.setContextMenuXYPAGE(event.clientX, event.clientY); selectItem2"+cc.CASA_id+"(\""+vSelectId+"\",\"false\"); return false;' onclick='selectItem"+cc.CASA_id+"(\""+vSelectId+"\",event.ctrlKey);'";
if (cc.CASA_preselectmode == true)
vEvents = "ondblclick='selectItemDblClick"+cc.CASA_id+"(\""+vSelectId+"\");'" + vEvents;
if (cc.CASA_resizemethod != null ||
cc.CASA_movemethod != null)
vEvents = "onmousedown='reactOnMouseDown"+cc.CASA_id+"(event);' onmouseup='reactOnMouseUp"+cc.CASA_id+"(event,this.id);'"+ vEvents;
}
var vCSS = "SCHEDULEGRIDCellDivSelectable";
if (vSelectId == null || vSelectId == "") vCSS = 'SCHEDULEGRIDCellDiv';
if (vid != null)
{
if (vid.indexOf(";") < 0)
{
if (vSelectId == vid)
vCSS = "SCHEDULEGRIDCellDivSelected";
}
else
{
var vIdValues = decodeCSVString(vid);
for(var idIndex=0; idIndex < vIdValues.length; idIndex++)
{
if(vIdValues[idIndex] != null && vIdValues[idIndex] == vSelectId)
vCSS = "SCHEDULEGRIDCellDivSelected";
}
}
}
vNowrap = "nowrap";
if (cc.CASA_cellnowrap == false) vNowrap = "";
vtdof = "";
vTesttoolid = " "+ getTesttoolidHtml() + "='"+cc.CASA_valueprop+(i/4)+"' ";
if (cc.CASA_pixelsizemode == false)
{
vHTML += "<tr style='height:"+C_adjustUnits(vWidth)+";width:100%'>";
vHTML += "<td id='SCH__"+vSelectId+"' height='"+C_adjustUnits(vWidth)+"' width='100%' style='background-color: "+vColor+";' class='"+vCSS+"' "+vEvents+ " " + vTesttoolid + " >";
vHTML += "<table id='SCH__"+vSelectId+"' border=0 width='100%' cellpadding=0 cellspacing=0 border=0 style='table-layout: fixed'>";
vHTML += "<tr style='height:100%;width:100%'><td id='SCH__"+vSelectId+"' "+vTooltip+" class='"+vCSS+"' style='"+cc.CASA_cellstyle+"' valign='"+cc.CASA_cellvalign+"' align='"+cc.CASA_cellalign+"' height='"+C_adjustUnits(vWidth)+"' width='100%'>";
vHTML += "<div id='SCH__"+vSelectId+"' "+vNowrap+" style='width: 100%; height:100%;overflow: hidden'>";
if (vText != null && vText != "")
{
if (vImageURL != "" && cc.CASA_imageorientation == "left")
{
if (vImageURL.indexOf(";") >= 0)
{
if (vImageIndex < vImage.length && vImage[vImageIndex].length != 0)
vHTML += "<img src='"+vImage[vImageIndex]+"' align='center' valign='middle'>&nbsp;";
vImageIndex++;
}
else
vHTML += "<img src='"+vImageURL+"' align='center' valign='middle'>&nbsp;";
}
vHTML += vText;
if (vImageURL != "" && cc.CASA_imageorientation == "right")
{
if (vImageURL.indexOf(";") >= 0)
{
if (vImageIndex < vImage.length && vImage[vImageIndex].length != 0)
vHTML += "&nbsp;<img src='"+vImage[vImageIndex]+"' align='center' valign='middle'>";
vImageIndex++;
}
else
vHTML += "&nbsp;<img src='"+vImageURL+"' align='center' valign='middle'>";
}
}
vHTML += "</div>";
vHTML += "</td></tr>";
vHTML += "</table>";
vHTML += "</td></tr>";
}
else
{
vHTML += "<tr style='height:"+C_adjustUnits(vWidth)+"; width:100%'>";
vHTML += "<td id='SCH__"+vSelectId+"' "+vTooltip+" width='100%' class='"+vCSS+"' style='background-color: "+vColor+";"+cc.CASA_cellstyle+" ;padding:0 0 0 5px;overflow: hidden' valign='"+cc.CASA_cellvalign+"' align='"+cc.CASA_cellalign+"' "+vEvents+" " + vTesttoolid +" >";
if (vText != null && vText != "")
{
vHTML += "<div id='SCHup__"+vSelectId+"' style='height:100%'>";
if (vImageURL != "" && cc.CASA_imageorientation == "left")
{
if (vImageURL.indexOf(";") >= 0)
{
if (vImageIndex < vImage.length && vImage[vImageIndex].length != 0)
vHTML += "<img src='"+vImage[vImageIndex]+"' align='center' valign='middle'>&nbsp;";
vImageIndex++;
}
else
vHTML += "<img src='"+vImageURL+"' align='center' valign='middle'>&nbsp;";
}
vHTML += vText;
if (vImageURL != "" && cc.CASA_imageorientation == "right")
{
if (vImageURL.indexOf(";") >= 0)
{
if (vImageIndex < vImage.length && vImage[vImageIndex].length != 0)
vHTML += "&nbsp;<img src='"+vImage[vImageIndex]+"' align='center' valign='middle'>";
vImageIndex++;
}
else
vHTML += "&nbsp;<img src='"+vImageURL+"' align='center' valign='middle'>";
}
vHTML += "</div>";
}
vHTML += "</td></tr>";
}
}
vHTML += "</table>";
return vHTML;
}
function selectItemSCHEDULELINE(cc,id,key)
{
selectItemInternallySCHEDULELINE(cc,id, key, 1);
}
function selectItem2SCHEDULELINE(cc,id,key)
{
selectItemInternallySCHEDULELINE(cc,id, key, 2);
}
function selectItemInternallySCHEDULELINE(cc,id,ctrlKey,evtbutton)
{
if (checkIO() == false) return;
if (id == null || id == "") return;
if (cc.CASA_selscheduleprop == null) return;
var vFormerId = getPropertyValue(cc.CASA_selscheduleprop);
if (vFormerId == null) vFormerId = "";
setPropertyValue(cc.CASA_selscheduleprop,id);
if (cc.CASA_controlkeyprop != null)
{
setPropertyValue(cc.CASA_controlkeyprop,ctrlKey);
}
if (cc.CASA_seltypeprop != null)
{
if (evtbutton == 2)
{
setPropertyValue(cc.CASA_seltypeprop,"RIGHT");
invokeMethodInModel(cc.CASA_selectmethod);
}
else
{
setPropertyValue(cc.CASA_seltypeprop,"LEFT");
if (cc.CASA_preselectmode == false)
invokeMethodInModel(cc.CASA_selectmethod);
else
{
var vSchId = "SCH__"+id;
var vFormerSchId = "SCH__"+vFormerId;
var vSchedules = parent.document.getElementsByTagName("td");
for (ii=0; ii<vSchedules.length; ii++)
{
if (vSchedules[ii].id == vSchId)
vSchedules[ii].className = "SCHEDULEGRIDCellDivSelected";
else if (vSchedules[ii].id == vFormerSchId)
vSchedules[ii].className = "SCHEDULEGRIDCellDivSelectable";
}
}
}
}
}
function selectItemDblClickSCHEDULELINE(cc,id,casaevent)
{
if (checkIO() == false) return;
if (id == null || id == "") return;
if (cc.CASA_selscheduleprop == null) return;
setPropertyValue(cc.CASA_selscheduleprop,id);
setPropertyValue(cc.CASA_seltypeprop,"LEFT");
invokeMethodInModel(cc.CASA_selectmethod);
}
CASA_posYEvent=null;
function reactOnMouseDownSCHEDULELINE(cc, event)
{
if (checkIO() == false) return false;
var id = findSrcIdSCHEDULELINE(event);
var vControlItem = findSrcElement(event);
var vLeft = 0;
var vTop = 0;
if (id == undefined || id == null)
{
var vId = vControlItem.id;
var tempid = vId.split("__");
id = tempid[1];
}
setPropertyValue(cc.CASA_selscheduleprop, id);
var vTemp;
vTemp = vControlItem;
while (true)
{
try
{
if (vControlItem == null) break;
vLeft = vLeft + vControlItem.offsetLeft - vControlItem.scrollLeft;
vTop = vTop + vControlItem.offsetTop - vControlItem.scrollTop;
if (vControlItem == vTemp) break;
vControlItem = vTemp;
}
catch (exc)
{
break;
}
}
cc.CASA_posY = vTop;
cc.CASA_posXMin = vLeft;
cc.CASA_posXMax = vLeft + vControlItem.offsetWidth;
cc.CASA_posXEvent = event.clientX;
CASA_posYEvent = event.clientY;
vTemp = vTemp.parentNode;
calculatePageOffset(vTemp);
var vClickedPlace;
if (cc.CASA_verticalschedule == "true")
{
vClickedPlace = CASA_posYEvent - vTemp.CASA_pageoffsettop;
if (vClickedPlace > (vTemp.offsetHeight-5) && vClickedPlace < vTemp.offsetHeight)
cc.CASA_method  = cc.CASA_resizemethod;
else
{
cc.CASA_method  = cc.CASA_movemethod;
dragItemSCHEDULELINE(cc, id, event);
}
}
}
function dragItemSCHEDULELINE(cc, id, event)
{
if (checkIO() == false) return false;
if (cc.CASA_blocked == true) return;
CL().cancelEvent(event);
if (id == null || id.indexOf("_") < 0 ) return;
cc.CASA_method = cc.CASA_movemethod;
var draginfo = id.substring(id.indexOf("_")+1, id.length);
parent.m_dragId = "SCH"+id;
var vValues = decodeCSVString(cc.CASA_bufferedValue);
for (i=0; i<vValues.length-3; i=i+4)
{
var vWidth = vValues[i+1];
var vText = vValues[i+2];
var vSelectId = vValues[i+3];
if(vSelectId != id)
continue;
var vHTML = "<td width='"+C_adjustUnits(vWidth)+"'>"+vText+"</td>";
}
startDragCL(id, vHTML, event, parent);
}
function reactOnMouseUpSCHEDULELINE(cc,id, event)
{
if (checkIO() == false) return false;
if (cc.CASA_blocked == true) return;
if (id == null) return;
cc.CASA_posX = event.clientX;
cc.CASA_posY = event.clientY;
var vid = getPropertyValue(cc.CASA_selscheduleprop);
var vCCOffset = 0;
if (cc.CASA_verticalschedule != "true")
vCCOffset = cc.CASA_posX - cc.CASA_posXEvent;
else
vCCOffset = cc.CASA_posY - CASA_posYEvent;
vId = id.split("__");
var vtargetid = vId[1];
if (vid == vtargetid && checkIfDragProcessIsActiveCL())
endDragCL();
if (vCCOffset == 0) return;
setPropertyValue(cc.CASA_seltypeprop,"LEFT");
setPropertyValue(cc.CASA_selscheduleprop,vtargetid);
cc.CASA_method = cc.CASA_movemethod;
var vLineWidth = findLengthSCHEDULELINE(cc);
if (cc.CASA_dropwidthprop != null && cc.CASA_dropoffsetprop != null)
{
setPropertyValue(cc.CASA_selscheduleprop, vid);
setPropertyValue(cc.CASA_dropoffsetprop, vCCOffset);
setPropertyValue(cc.CASA_dropwidthprop, vLineWidth);
if(cc.CASA_method == cc.CASA_resizemethod)
invokeMethodInModel(cc.CASA_method);
}
if (cc.CASA_dropinfoprop == null)
{
alert("DROPICON: no DROPINFOPROP for DROPMETHOD "+cc.CASA_dropmethod);
}
else if (checkIfDragProcessIsActiveCL())
{
var dropInfo = endDragCL();
setPropertyValue(cc.CASA_selscheduleprop, vtargetid);
setPropertyValue(cc.CASA_dropinfoprop, dropInfo);
invokeMethodInModel(cc.CASA_method);
}
else if (parent.m_dragMode == true)
{
var dropInfo = parent.m_dropInfo;
parent.endDrag();
setPropertyValue(cc.CASA_selscheduleprop, vtargetid);
setPropertyValue(cc.CASA_dropinfoprop, dropInfo);
invokeMethodInModel(cc.CASA_method);
}
}
function findSrcIdSCHEDULELINE(event)
{
var vId = findSrcElement(event).id;
vId = vId.split("__");
return vId[1];
}
function findLengthSCHEDULELINE(cc)
{
var vLineWidth = 0;
var vValues = decodeCSVString(cc.CASA_bufferedValue);
for (i=0; i<vValues.length-3; i=i+4)
{
var vSelectId = vValues[i+3];
var vItem = parent.gebid("SCH__"+vSelectId);
if (vItem.style.display == "none")
continue;
vLineWidth += parseInt(vItem.offsetWidth);
}
return vLineWidth;
}
