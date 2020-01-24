function addVersionInfoDLMENUCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('DLMENUCONTROLS');
}
function reactOnModelUpdateTABSEL(pCC)
{
if (pCC.CASA_classSL == undefined ||
pCC.CASA_dir != m_direction)
{
if (pCC.CASA_reversecolors == undefined || pCC.CASA_reversecolors == false)
{
pCC.CASA_classSC = "TABSELSelectedCenter";
pCC.CASA_classUC = "TABSELUnselectedCenter";
if (m_direction == "ltr")
{
pCC.CASA_classSL = "TABSELSelectedLeft";
pCC.CASA_classUL = "TABSELUnselectedLeft";
pCC.CASA_classSR = "TABSELSelectedRight";
pCC.CASA_classUR = "TABSELUnselectedRight";
}
else if (m_direction == "rtl")
{
pCC.CASA_classSL = "TABSELSelectedRight";
pCC.CASA_classUL = "TABSELUnselectedRight";
pCC.CASA_classSR = "TABSELSelectedLeft";
pCC.CASA_classUR = "TABSELUnselectedLeft";
}
}
else
{
pCC.CASA_classSC = "TABSELUnselectedCenter";
pCC.CASA_classUC = "TABSELSelectedCenter";
if (m_direction == "ltr")
{
pCC.CASA_classSL = "TABSELUnselectedLeft";
pCC.CASA_classUL = "TABSELSelectedLeft";
pCC.CASA_classSR = "TABSELUnselectedRight";
pCC.CASA_classUR = "TABSELSelectedRight";
}
else if (m_direction == "rtl")
{
pCC.CASA_classSL = "TABSELUnselectedRight";
pCC.CASA_classUL = "TABSELSelectedRight";
pCC.CASA_classSR = "TABSELUnselectedLeft";
pCC.CASA_classUR = "TABSELSelectedLeft";
}
}
}
var vci = getPropertyValue(pCC.CASA_tabselprop + ".changeIndex");
var vcsv = getPropertyValue(pCC.CASA_tabselprop + ".itemsCSV");
var vselitem = getPropertyValue(pCC.CASA_tabselprop + ".selectedItem");
if (vci == null || vcsv == null) alert("TABSEL cannot be built - reference property not available");
if (pCC.CASA_bufferedci != undefined && pCC.CASA_bufferedci == vci && pCC.CASA_bufferedselitem == vselitem) return;
pCC.CASA_bufferedci = vci;
pCC.CASA_bufferedselitem = vselitem;
var vhtml = [];
var vitems = decodeCSVString(vcsv);
var vTitlesCSV = getPropertyValue(pCC.CASA_tabselprop + ".titlesCSV");
var vTitles = decodeCSVString(vTitlesCSV);
var vtdstyle = "";
if (pCC.CASA_bottomborder != undefined && pCC.CASA_bottomborder == false)
vtdstyle = "style='border-bottom: 0'"
vhtml.push("<table width=100% cellspacing=0 cellpadding=0>");
vhtml.push("<tr>");
var vRemainingLeft = "<td width='50%' class='TABSELRemainingLeft' "+vtdstyle+">&nbsp;</td>";
if (pCC.CASA_leftindent != null)
vRemainingLeft = "<td width='0' class='TABSELRemainingLeft' "+vtdstyle+"><div style='width:"+C_adjustUnits(pCC.CASA_leftindent)+"'>&nbsp;</div></td>";
vhtml.push(vRemainingLeft);
for (i=0;i<vitems.length;i++)
{
var vtdid = "TABSELTD"+ pCC.CASA_id + "_" + i;
var vtdidLEFT = vtdid+"LEFT";
var vtdidRIGHT = vtdid+"RIGHT";
var vclass;
vclass = pCC.CASA_classUL;
if (i == vselitem) vclass = pCC.CASA_classSL;
vttle = vTitles[i];
if (vttle == null || vttle == "cinull")
vttle = "";
vhtml.push("<td id='"+vtdidLEFT+"' class='"+vclass+"' "+vtdstyle+">");
vhtml.push("<div style='width: 7px'></div>");
vhtml.push("</td>");
vclass = pCC.CASA_classUC;
if (i == vselitem) vclass = pCC.CASA_classSC;
vhtml.push("<td id='"+vtdid+"' class='"+vclass+"' "+vtdstyle+" onclick='try { csciframe.reactOnSelectTABSEL(\""+pCC.CASA_id+"\","+i+"); } catch (eexxcc) {};' onmouseenter='try { csciframe.rollinTABSEL(\""+vtdid+"\"); } catch (eexxcc) {}' onmouseleave='try { csciframe.rolloutTABSEL(\""+vtdid+"\"); } catch (eexxcc) {}' title='"+convertApos(vttle)+"'>");
vhtml.push(vitems[i]);
vhtml.push("</td>");
vclass = pCC.CASA_classUR;
if (i == vselitem) vclass = pCC.CASA_classSR;
vhtml.push("<td id='"+vtdidRIGHT+"' class='"+vclass+"' "+vtdstyle+">");
vhtml.push("<div style='width: 6px'></div>");
vhtml.push("</td>");
}
var vRemainingRightWidth = "50%";
if (pCC.CASA_leftindent != null)
vRemainingRightWidth = "100%";
var vBackgroundImagePos = "style='background-position: left top;'";
if (m_direction == "rtl")
vBackgroundImagePos = "style='background-position: right top;'";
vhtml.push("<td width='"+vRemainingRightWidth+"' "+vBackgroundImagePos+" class='TABSELRemainingRight' "+vtdstyle+">&nbsp;</td>");
vhtml.push("</tr>");
vhtml.push("</table>");
pCC.innerHTML = vhtml.join("");
}
function reactOnSelectTABSEL(casacontrolid,selectedid)
{
var vcasacontrol = parent.document.getElementById("TABSEL"+casacontrolid);
if (selectedid == vcasacontrol.CASA_bufferedselitem) return;
try
{
var vtdid = "TABSELTD"+ vcasacontrol.CASA_id + "_" + vcasacontrol.CASA_bufferedselitem;
var vtdidLEFT = vtdid+"LEFT";
var vtdidRIGHT = vtdid+"RIGHT";
var vl = parent.document.getElementById(vtdidLEFT); vl.className = vcasacontrol.CASA_classUL;
var vr = parent.document.getElementById(vtdidRIGHT); vr.className = vcasacontrol.CASA_classUR;
var vc = parent.document.getElementById(vtdid); vc.className = vcasacontrol.CASA_classUC;
rolloutTABSEL(vtdid);
}
catch (eeccxx) {}
vtdid = "TABSELTD" + vcasacontrol.CASA_id + "_" + selectedid;
vtdidLEFT = vtdid+"LEFT";
vtdidRIGHT = vtdid+"RIGHT";
var vl = parent.document.getElementById(vtdidLEFT); vl.className = vcasacontrol.CASA_classSL;
var vr = parent.document.getElementById(vtdidRIGHT); vr.className = vcasacontrol.CASA_classSR;
var vc = parent.document.getElementById(vtdid); vc.className = vcasacontrol.CASA_classSC;
rolloutTABSEL(vtdid);
setPropertyValue(vcasacontrol.CASA_tabselprop + ".selectedItem",selectedid);
vcasacontrol.CASA_bufferedselitem = selectedid;
invokeMethodInModel(vcasacontrol.CASA_tabselprop+".reactOnSelect");
}
function rollinTABSEL(ptdid)
{
if (checkIO() == false) return;
var vObject = parent.document.getElementById(ptdid);
if (vObject == null) return;
vObject.style.color = "#FF0000";
}
function rolloutTABSEL(ptdid)
{
if (checkIO() == false) return;
var vObject = parent.document.getElementById(ptdid);
if (vObject == null) return;
vObject.style.color = "";
}
function initCasaControlDLMENU(pCC,submenucontrol,testtoolid)
{
pCC.CASA_prevChangeIndex = undefined;
pCC.CASA_forcerefresh = undefined;
pCC.CASA_subMenuIndex = undefined;
pCC.CASA_subSubMenuIndex = undefined;
pCC.CASA_dir = undefined;
pCC.CASA_testtoolid = testtoolid;
}
function getRTLSuffDLMENU(pCC)
{
if (pCC.CASA_dir == "rtl")
return "RTL";
else
return "";
}
function reactOnModelUpdateDLMENU(pCC,submenucontrol)
{
var vItemIndexForSelection = -1;
var vChangeIndex = getPropertyValue(pCC.CASA_menuprop+".changeIndex");
if (pCC.CASA_prevChangeIndex == vChangeIndex &&
!pCC.CASA_forcerefresh == true &&
pCC.CASA_dir == m_direction)
return;
pCC.CASA_prevChangeIndex = vChangeIndex;
pCC.CASA_forcerefresh = false;
pCC.CASA_dir = m_direction;
var classRightImageBase = "DLMENURightImageCell"+getRTLSuffDLMENU(pCC);
var classLeftImageBase = "DLMENULeftImageCell"+getRTLSuffDLMENU(pCC);
var vlwidth = "0";
var vrwidth = "100%";
if (pCC.CASA_align == "center") { vlwidth = "50%"; vrwidth = "50%"; }
if (pCC.CASA_align == "right") { vlwidth = "100%"; vrwidth = "0"; }
var vTopML = "";
vTopML += "<table cellpadding=0 cellspacing=0 width='100%'>";
vTopML += "<tr>";
vTopML += "<td width='"+vlwidth+"'><table cellpadding=0 cellspacing=0><tr><td style='padding-left:10px'></td></tr></table></td>";
if (pCC.CASA_cellseparatoronly != true)
vTopML += "<td height='100%'><span class='"+classRightImageBase+"'>&nbsp;</span></td>";
var vCounter = 0;
var vImageHTMLPrefix = "<div ";
var vImageHTMLSuffix = " ></div>";
while (true)
{
var vName = pCC.CASA_menuprop + ".topItems[" + vCounter + "].text";
var vValue = getPropertyValue(vName);
if (vValue == null)
break;
var vEnabledName = pCC.CASA_menuprop + ".topItems[" + vCounter + "].enabled";
var vEnabledValue = getPropertyValue(vEnabledName);
var vSelectedName = pCC.CASA_menuprop + ".topItems[" + vCounter + "].selected";
var vSelectedValue = getPropertyValue(vSelectedName);
if((vSelectedValue == "true") &&
vEnabledValue == "true")
{
vItemIndexForSelection = vCounter;
}
var vLinkId = "DLM"+pCC.CASA_id+"_"+vCounter;
var vCellId = "DLTC"+pCC.CASA_id+"_"+vCounter;
var vleftId = "DLL"+pCC.CASA_id+"_"+vCounter;
var vrightId = "DLR"+pCC.CASA_id+"_"+vCounter;
var vCurrentItemIndex = vCounter;
var vTopClassName = "DLMENUCell";
var vTDAroundControlClass = "TDAroundControl";
var vDLMenuLinkClass = "DLMENULink";
var vOnClickDLMenuLink = "onclick='if (C.checkIO() == false) return; selectSubMenu"+pCC.CASA_id+"("+vCounter+");'";
var vTopRollEvents = "onmouseover='C.rollinDLMENU(\""+vLinkId+"\",\""+vCellId+"\",false,\""+vleftId+"\",\""+vrightId+"\", "+vCurrentItemIndex+",undefined);' onmouseout='rollout"+pCC.CASA_id+"(\""+vLinkId+"\","+vCounter+",\""+vCellId+"\");'";
var classRightImage = classRightImageBase;
var classLeftImage = classLeftImageBase;
if(vEnabledValue!="true")
{
vTopClassName = vTopClassName+"Disabled";
vTDAroundControlClass = vTDAroundControlClass+"Disabled";
vDLMenuLinkClass = vDLMenuLinkClass+"Disabled";
vOnClickDLMenuLink = " ";
vTopRollEvents = " ";
classLeftImage = classLeftImage+"Disabled";
classRightImage = classRightImage+"Disabled";
}
var ttid = "";
if (pCC.CASA_testtoolid != null)
ttid = getTesttoolidHtml() + "='"+pCC.CASA_testtoolid+vCounter+"'";
vTopML += "<td id='"+vCellId+"' class='"+vTopClassName+"' "+vTopRollEvents+">"+
"<table height='100%' cellspacing=0 cellpadding=0><tr><td>" +
vImageHTMLPrefix + " id='"+vleftId+"' class='"+classLeftImage+"' " + vImageHTMLSuffix+
"</td><td class='"+vTDAroundControlClass+"' style='padding-left: 3px; padding-right: 3px'>" +
"<a id='"+vLinkId+"' "+vOnClickDLMenuLink+" class='"+vDLMenuLinkClass+"' "+ttid+">" +
vValue +
"</a>" +
"</td><td>" +
vImageHTMLPrefix + " id='"+vrightId+"' class='"+classRightImage+"' " + vImageHTMLSuffix+
"</td></tr></table>" +
"</td>";
vCounter++;
}
vTopML += "<td width='"+vrwidth+"' class='DLMENUStrip'>" +
"<table cellspacing=0 cellpadding=0><tr>";
if (pCC.CASA_cellseparatoronly != true)
vTopML += "<td height='100%' class='"+classLeftImage+"'>&nbsp;</td>";
vTopML += "<td class='TDAroundControl' style='padding-left: 3px; padding-right: 3px'>&nbsp;" +
"</td>" +
"</tr></table>" +
"</td>";
vTopML += "</tr>";
vTopML += "</table>";
pCC.innerHTML = vTopML;
vSubML = "<table cellpadding=0 cellspacing=0 width='100%'><tr><td><table width='100%' cellpadding=0 cellspacing=0><tr><td class='DLMENUSubStrip'>&nbsp;</td></tr></table></td></tr></table>";
submenucontrol.innerHTML = vSubML;
m_global_menuprop = pCC.CASA_menuprop;
closeMENUDLMENU();
if (vItemIndexForSelection != -1)
selectSubMenuDLMENU(pCC, submenucontrol , vItemIndexForSelection, true);
}
function rollinDLMENU(linkId,cellId,secondLine,imgLeftId,imgRightId, topItemIndex, subItemIndex)
{
if (checkIO() == false) return;
var vObject = parent.gebid(linkId);
if (vObject == null) return;
var cn = "DLMENULink";
if (vObject.className.indexOf("Selected") >= 0)
cn += "Selected";
setTimeoutToOpenSubLevelDLMENU(linkId, secondLine, topItemIndex, subItemIndex);
cn += "RolledOver";
vObject.className = cn;
vObject = parent.gebid(cellId);
if (vObject == null) return;
cn = "DLMENU";
if (secondLine == true) cn += "Sub";
cn += "Cell";
if (secondLine != true && vObject.className.indexOf("Selected") >= 0) cn += "Selected";
cn += "Rollover";
vObject.className = cn;
if (imgLeftId == null) return;
vObject = parent.gebid(imgLeftId);
cn = "DLMENULeftImageCell";
if(vObject.className.indexOf("RTL") >=0 ) cn += "RTL";
if (secondLine != true && vObject.className.indexOf("Selected") >= 0) cn += "Selected";
vObject.className = cn;
vObject = parent.gebid(imgRightId);
cn = "DLMENURightImageCell";
if(vObject.className.indexOf("RTL") >=0 ) cn += "RTL";
if (secondLine != true && vObject.className.indexOf("Selected") >= 0) cn += "Selected";
vObject.className = cn;
}
function rolloutDLMENU(linkId,className,cellId,className2)
{
clearTimeoutDLMENU();
setTimeoutToCloseDLMENU();
var vObject = parent.gebid(linkId);
if (vObject == null) return;
vObject.className = className;
vObject = parent.gebid(cellId);
if (vObject == null) return;
vObject.className = className2;
}
function selectSubMenuDLMENU(pCC,submenucontrol,subMenuIndex, topSelectionPropagation)
{
clearTimeoutDLMENU();
var vItemIndexForSelection = -1;
var vItemMethodForSelection	= null;
var vFlushClickToServerName = pCC.CASA_menuprop + ".topItems[" + subMenuIndex + "].flushClickToServer";
var vFlushClickToServerValue = getPropertyValue(vFlushClickToServerName);
if(topSelectionPropagation != true)
{
clearSelectionDLMENU(pCC);
pCC.CASA_forcerefresh = true;
reactOnModelUpdateDLMENU(pCC,submenucontrol);
}
var id = "DLTC"+pCC.CASA_id+"_"+subMenuIndex;
var o = parent.document.getElementById(id);
o.className = "DLMENUCellSelected";
id = "DLL"+pCC.CASA_id+"_"+subMenuIndex;
o = parent.document.getElementById(id);
o.className = "DLMENULeftImageCell"+getRTLSuffDLMENU(pCC)+"Selected";
id = "DLR"+pCC.CASA_id+"_"+subMenuIndex;
o = parent.document.getElementById(id);
o.className = "DLMENURightImageCell"+getRTLSuffDLMENU(pCC)+"Selected";
id = "DLM"+pCC.CASA_id+"_"+subMenuIndex;
o = parent.document.getElementById(id);
o.className = "DLMENULinkSelected";
pCC.CASA_subMenuIndex=subMenuIndex;
pCC.CASA_subSubMenuIndex = null;
var classRightImageBase = "DLMENURightImageCell"+getRTLSuffDLMENU(pCC);
var classLeftImageBase = "DLMENULeftImageCell"+getRTLSuffDLMENU(pCC);
var vlwidth = "0";
var vrwidth = "100%";
if (pCC.CASA_align == "center") { vlwidth = "50%"; vrwidth = "50%"; }
if (pCC.CASA_align == "right") { vlwidth = "100%"; vrwidth = "0"; }
var vSubML = "";
vSubML += "<table cellpadding=0 cellspacing=0 width='100%'>";
vSubML += "<tr>";
vSubML += "<td height='100%' class='DLMENUSubStrip' width='"+vlwidth+"'><table cellpadding=0 cellspacing=0><tr><td style='padding-left:50px'></td></tr></table></td>";
if ((vFlushClickToServerValue != "true") &&
(pCC.CASA_cellseparatoronly != true))
vSubML += "<td><span class='"+classRightImageBase+"'>&nbsp;</span></td>";
var vCounter = 0;
var vImageHTMLPrefix = "<div ";
var vImageHTMLSuffix = " ></div>";
while (true)
{
if (vFlushClickToServerValue == "true")
break;
var vbase = pCC.CASA_menuprop+".topItems["+subMenuIndex+"].subItems["+vCounter+"].";
var vValue = getPropertyValue(vbase+"text");
if (vValue == null)
break;
var vMethod = vbase+"invoke";
var vLinkId = "DLS"+pCC.CASA_id+"_"+vCounter;
var vCellId = "DLC"+pCC.CASA_id+"_"+vCounter;
var vCurrentItemIndex = vCounter;
var vEnabledName = vbase+"enabled";
var vEnabledValue = getPropertyValue(vEnabledName);
var vSelectedName = vbase+"selected";
var vSelectedValue = getPropertyValue(vSelectedName);
if((vSelectedValue == "true") &&
(vEnabledValue == "true"))
{
vItemIndexForSelection = vCounter;
vItemMethodForSelection = vMethod;
}
var vDLMENUSubCellClass = "DLMENUSubCell";
var vTDAroundControlClass = "TDAroundControl";
var vDLMenuSubLinkClass = "DLMENUSubLink";
var vOnClickDLMenuLink = "onclick='C.reactOnSubMenuClickedDLMENU(CT_"+pCC.CASA_id+",CS_"+pCC.CASA_id+","+vCounter+",\""+vMethod+"\");'";
var vSubRollEvents = "onmouseover='C.rollinDLMENU(\""+vLinkId+"\",\""+vCellId+"\", true, undefined, undefined, "+subMenuIndex+", "+vCurrentItemIndex+");' onmouseout='rolloutSubLink"+pCC.CASA_id+"(\""+vLinkId+"\","+vCounter+",\""+vCellId+"\");'";
var classRightImage = classRightImageBase;
var classLeftImage = classLeftImageBase;
if(vEnabledValue!="true")
{
vDLMENUSubCellClass = vDLMENUSubCellClass+"Disabled";
vTDAroundControlClass = vTDAroundControlClass+"Disabled";
vDLMenuSubLinkClass = vDLMenuSubLinkClass+"Disabled";
vOnClickDLMenuLink = "";
vSubRollEvents = "";
classRightImage = classRightImage+"Disabled";
classLeftImage = classLeftImage+"Disabled";
}
var ttid = "";
if (pCC.CASA_testtoolid != null)
ttid = getTesttoolidHtml() + "='"+pCC.CASA_testtoolid+subMenuIndex+"_"+vCounter+"'";
vSubML += "<td id='"+vCellId+"' class='"+vDLMENUSubCellClass+"' "+vSubRollEvents+">"+
"<table cellpadding=0 cellspacing=0>" +
"<tr>";
if (pCC.CASA_cellseparatoronly != true)
vSubML += "<td height='100%' class='"+classLeftImage+"'>&nbsp;</td>";
vSubML += "<td height='100%' nowrap='true' class='"+vTDAroundControlClass+"' style='padding-left: 3px; padding-right: 3px;'>" +
"<a id='"+vLinkId+"' "+vOnClickDLMenuLink+" class='"+vDLMenuSubLinkClass+"' "+ttid+">" +
vValue +
"</a>";
var hasMenu = getPropertyValue(vbase+"cISContextMenuItems[0].text") != null;
if (hasMenu)
vSubML += "<img src='../cis/styles/images/sag_wm_dlmenusubrightarrow.gif'>";
vSubML += "</td>";
if (pCC.CASA_cellseparatoronly != true)
vSubML += vImageHTMLPrefix + " class='"+classRightImage+"'" + vImageHTMLSuffix;
vSubML += "</tr>" +
"</table>" +
"</td>";
vCounter++;
if (vCounter <= 1 && pCC.CASA_cellseparatoronly)
vSubML += "<td>"+vImageHTMLPrefix + " class='DLMENUCellSeparator'" + vImageHTMLSuffix+"</td>";
}
vSubML += "<td width='"+vrwidth+"' class='DLMENUSubStrip'>"+
"<table cellpadding=0 cellspacing=0>" +
"<tr>";
if 	((vFlushClickToServerValue != "true") &&
(pCC.CASA_cellseparatoronly != true))
vSubML += "<td height='100%' class='"+classLeftImage+"'>&nbsp;</td>";
vSubML += "<td class='TDAroundControl' style='padding-left: 3px; padding-right: 3px;'>&nbsp;" +
"</td>" +
"</tr>" +
"</table>" +
"</td>";
vSubML += "</tr>";
vSubML += "</table>";
submenucontrol.innerHTML = vSubML;
if (vItemIndexForSelection != -1)
{
reactOnSubMenuClickedDLMENU(pCC, submenucontrol , vItemIndexForSelection, vItemMethodForSelection, true);
}
else
{
var vTopMethodProperty = pCC.CASA_menuprop+".topItems["+subMenuIndex+"].method";
var vTopMethod = getPropertyValue(vTopMethodProperty);
if (vTopMethod != null &&
vTopMethod != "")
{
invokeMethodInModel(vTopMethod);
}
}
}
function reactOnSubMenuClickedDLMENU(pCC,submenucontrol,index,method, forcedSelectItem)
{
clearTimeoutDLMENU();
if ((forcedSelectItem != true) && (checkIO() == false)) return;
if (pCC.CASA_previoussubmenuindex != undefined)
{
var vCellPId = "DLC"+pCC.CASA_id+"_"+pCC.CASA_previoussubmenuindex;
var vCellP = parent.document.getElementById(vCellPId);
if (vCellP != null)
{
vCellP.className = "DLMENUSubCell";
}
vCellPId = "DLS"+pCC.CASA_id+"_"+pCC.CASA_previoussubmenuindex;
vCellP = parent.document.getElementById(vCellPId);
if (vCellP != null)
{
vCellP.className = "DLMENUSubLink";
}
}
pCC.CASA_previoussubmenuindex = index;
pCC.CASA_subSubMenuIndex = index;
var vCellId = "DLC"+pCC.CASA_id+"_"+index;
var vCell = parent.document.getElementById(vCellId);
vCell.className = "DLMENUSubCellSelected";
vCellId = "DLS"+pCC.CASA_id+"_"+index;
vCell = parent.document.getElementById(vCellId);
vCell.className = "DLMENUSubLinkSelected";
if(forcedSelectItem != true)
invokeMethodInModel(method);
}
var m_timeoutDLMENU=null;
var m_menu_linkId=null;
var m_global_menuprop=null;
function clearTimeoutDLMENU()
{
try
{
if (m_timeoutDLMENU != null)
{
window.clearTimeout(m_timeoutDLMENU);
}
m_timeoutDLMENU = null;
m_menu_linkId = null;
}
catch (exc)
{
}
}
function setTimeoutToOpenSubLevelDLMENU(linkId, secondLine, topItemIndex, subItemIndex)
{
try
{
clearTimeoutDLMENU();
m_timeoutDLMENU = window.setTimeout("reactOnTimeoutToOpenContextMenuDLMENU("+secondLine+", "+topItemIndex+", "+subItemIndex+")", 200);
m_menu_linkId = linkId;
}
catch (exc)
{
}
}
function clearSelectionDLMENU(pCC)
{
var vCounter = 0;
while (true)
{
var vName = pCC.CASA_menuprop+".topItems["+vCounter+"].text";
var vValue = getPropertyValue(vName);
if (vValue == null) break;
var vSelectedName = pCC.CASA_menuprop+".topItems["+vCounter+"].selected";
if(getPropertyValue(vSelectedName) == "true")
setPropertyValue(vSelectedName, "false");
var vSubCounter = 0;
while(true)
{
var vSubName = pCC.CASA_menuprop+".topItems["+vCounter+"].subItems["+vSubCounter+"].text";
var vSubValue = getPropertyValue(vSubName);
if (vSubValue == null) break;
var vSubSelectedName = pCC.CASA_menuprop+".topItems["+vCounter+"].subItems["+vSubCounter+"].tselected";
if(getPropertyValue(vSubSelectedName) == "true")
setPropertyValue(vSubSelectedName, "false");
vSubCounter++;
}
vCounter++;
}
}
function reactOnTimeoutToOpenContextMenuDLMENU(secondLine, topItemIndex, subItemIndex)
{
if (checkIO() == false) return;
var linkId = m_menu_linkId;
clearTimeoutDLMENU();
clearTimeoutCloseDLMENU();
var vObject = parent.gebid(linkId);
if (vObject == null) return;
try
{
var vContextMenu = findTHISCONTEXTMENU(true);
if (vContextMenu != null)
{
vContextMenu.style.display = "none";
setControlMenuOffset(vObject, 2, 13);
var vPathToBasePropName = "";
if (secondLine)
vPathToBasePropName = m_global_menuprop+".topItems["+topItemIndex+"].subItems["+subItemIndex+"]";
else
vPathToBasePropName = m_global_menuprop+".topItems["+topItemIndex+"]";
var vBasePropName;
var vSourceText;
var vTargetOpened;
var vLastTargetReached = false;
var vLastSourceReached = false;
var vCounter = 0;
while(true)
{
if (secondLine)
vBasePropName = vPathToBasePropName +".cISContextMenuItems["+vCounter+"].";
else
vBasePropName = vPathToBasePropName +".cISContextMenuItems["+vCounter+"].";
if (vLastSourceReached)
vSourceText = null;
else
{
vSourceText = getPropertyValue(vBasePropName+"text");
if (vSourceText == null)
vLastSourceReached = true;
}
if (vLastTargetReached)
vTargetOpened = null;
else
{
if (getPropertyValue("cISContextMenuItems["+vCounter+"].opened") == null)
vLastTargetReached = true;
}
if (vLastSourceReached && vLastTargetReached)
break;
if (!vLastSourceReached)
{
setPropertyValue("cISContextMenuItems["+vCounter+"].text", vSourceText);
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].text", false);
setPropertyValue("cISContextMenuItems["+vCounter+"].opened", getPropertyValue(vBasePropName+"opened"));
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].opened", false);
setPropertyValue("cISContextMenuItems["+vCounter+"].level", getPropertyValue(vBasePropName+"level"));
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].level", false);
setPropertyValue("cISContextMenuItems["+vCounter+"].image", getPropertyValue(vBasePropName+"image"));
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].image", false);
setPropertyValue("cISContextMenuItems["+vCounter+"].inactive", getPropertyValue(vBasePropName+"inactive"));
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].inactive", false);
}
else
{
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].text", true);
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].opened", true);
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].level", true);
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].image", true);
setPropertyIsKilled("cISContextMenuItems["+vCounter+"].inactive", true);
}
vCounter++;
}
if (getPropertyValue('cISContextMenuItems[0].text') != null)
{
vContextMenu.style.display = "";
CL().openCONTEXTMENU(this ,null, "marginNone", vPathToBasePropName);
setPropertyIsKilled("cISContextMenuItems[0].text" , true);
}
}
}
catch (exc)
{
}
}
function closeMENUDLMENU()
{
var vContextMenu = findTHISCONTEXTMENU(false);
if (vContextMenu != null)
{
vContextMenu.style.display = "none";
}
}
var m_timeoutCloseDLMENU=null;
function clearTimeoutCloseDLMENU()
{
try
{
if (m_timeoutCloseDLMENU != null)
{
window.clearTimeout(m_timeoutCloseDLMENU);
m_timeoutCloseDLMENU = null;
}
}
catch (exc)
{
}
}
function setTimeoutToCloseDLMENU()
{
try
{
clearTimeoutCloseDLMENU();
m_timeoutCloseDLMENU = window.setTimeout("reactOnTimeToCloseDLMENU()", 400);
}
catch (exc)
{
}
}
function reactOnTimeToCloseDLMENU()
{
clearTimeoutCloseDLMENU();
closeMENUDLMENU();
}
