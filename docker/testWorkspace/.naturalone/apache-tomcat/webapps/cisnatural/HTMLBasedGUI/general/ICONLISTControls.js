function addVersionInfoICONLISTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('ICONLISTCONTROLS');
}
function reactOnModelUpdateICONLIST(cc)
{
var vChangeIndex = getPropertyValue(cc.CASA_iconlistprop+".changeIndex");
if (cc.CASA_prevChangeIndex != undefined &&
cc.CASA_prevChangeIndex == vChangeIndex)
return;
cc.CASA_prevChangeIndex = vChangeIndex;
cc.CASA_selindex = null;
var vImageHeight = "";
if (cc.CASA_imageheight != null) vImageHeight = "height='"+C_adjustUnits(cc.CASA_imageheight)+"'";
var vImageWidth = "";
if (cc.CASA_imagewidth != null) vImageWidth = "width='"+C_adjustUnits(cc.CASA_imagewidth)+"'";
var namePos = "aside";
if (cc.CASA_namePos != null && cc.CASA_namePos != "")
namePos = cc.CASA_namePos;
else if (cc.CASA_vertical == "false")
namePos = "below";
if (cc.CASA_displayMenuIndicator != null)
var displayMenuIndicator = cc.CASA_displayMenuIndicator;
var align = "align='center'";
if (cc.CASA_align != null)
align = "align='"+cc.CASA_align+"'";
var vHTML = [];
vHTML.push("<table width='100%' cellspacing='"+cc.CASA_cellspacing+"' cellpadding=0 style='"+cc.CASA_tablestyle+"'>");
var vCounter = 0;
if (cc.CASA_vertical == "false") vHTML.push("<tr>");
while (true)
{
var vIconId = "CasaICONLIST" + cc.CASA_id + "ICON"+vCounter;
var vRollOver = "onmouseenter='C.rollinICONLIST(\""+vIconId+"\");' onmouseleave='C.rolloutICONLIST(\""+vIconId+"\");'";
var vTextProp = cc.CASA_iconlistprop + ".items["+vCounter+"].text";
var vNameProp = cc.CASA_iconlistprop + ".items["+vCounter+"].name";
var vImageProp = cc.CASA_iconlistprop + ".items["+vCounter+"].imageURL";
var vDisabledProp = cc.CASA_iconlistprop + ".items["+vCounter+"].disabled";
var vInvisibleProp = cc.CASA_iconlistprop + ".items["+vCounter+"].invisible";
var vText = getPropertyValue(vTextProp);
var vName = getPropertyValue(vNameProp);
var vImageURL = getPropertyValue(vImageProp);
var vDisabled = getPropertyValue(vDisabledProp);
var vInvisible = getPropertyValue(vInvisibleProp);
if (vInvisible == "true" && cc.CASA_invisiblemode != "cleared") { vCounter++;continue; }
var vMouseDown = "";
var vdragInfo = getPropertyValue(cc.CASA_iconlistprop + ".items["+vCounter+"].dragInfo");
if (vdragInfo != null && vdragInfo != "")
{
var convertedName = vName.replace(/ /g,"&nbsp;");
vMouseDown = "event.preventDefault(); m_dragId = 'ICONLIST"+cc.CASA_id+"_"+vCounter+"'; C.startDragCL('"+vdragInfo+"', '<table><tr><td><img src="+vImageURL+"></td><td><font face=Verdana size=1>&nbsp;"+convertedName+"</font></td></tr></table>', event, self)";
}
var vDisplayMenuIndicator = "";
if (displayMenuIndicator == "true")
{
vDisplayMenuIndicator = "</td>";
if (namePos == "below")
vDisplayMenuIndicator += "</tr><tr>";
vDisplayMenuIndicator += "<td valign='middle' align ='center' nowrap='true' ";
if ( vInvisible=="true" && cc.CASA_invisiblemode == "cleared")
vDisplayMenuIndicator += "style='visibility:hidden' ";
vDisplayMenuIndicator +=">";
vDisplayMenuIndicator += "&nbsp;"
vDisplayMenuIndicator += "<span valign='middle' class=\"ICONLISTMenuIndicatorImg\">&nbsp;&nbsp;&nbsp;</span>";
vDisplayMenuIndicator += "&nbsp;"
}
var vNameTableElement = "";
if (vName != null && vName != "")
{
vNameTableElement = "</td>";
if (namePos == "below")
vNameTableElement += "</tr><tr>";
vNameTableElement += "<td valign='middle' nowrap='true' class='ICONText' ";
if ( vInvisible=="true" && cc.CASA_invisiblemode == "cleared")
vNameTableElement += "style='visibility:hidden' ";
vNameTableElement += ">";
if (cc.CASA_textsize != null)
vNameTableElement += "<font size=\""+cc.CASA_textsize+"\">";
vNameTableElement += "&nbsp;"
vNameTableElement += vName;
vNameTableElement += "&nbsp;";
if (cc.CASA_textsize != null)
vNameTableElement += "</font>";
}
var vMainTableStart = "<table cellpadding=0 cellspacing=0><tr><td align='center'>";
var vMainTableClose = vNameTableElement + vDisplayMenuIndicator + "</td></tr></table>";
var vTdWidth = "100%";
if (cc.CASA_vertical == "false") vTdWidth = "0";
if (vImageURL == null) break;
if (vText == null) vText = "";
if (vImageURL == "DISTANCE" || vImageURL == "SMALLDISTANCE")
{
var fontSize = "";
if ( vImageURL == "SMALLDISTANCE") fontSize = "font-size:4px";
if (cc.CASA_vertical != "false")
vHTML.push("<tr><td width='100%' style='"+fontSize+"'>&nbsp;</td></tr>");
else
vHTML.push("<td style='cursor: default;"+fontSize+"'>&nbsp;&nbsp;</td>");
}
else if (vImageURL == "SEPARATOR")
{
if (cc.CASA_vertical != "false")
vHTML.push("<tr><td width='100%'>&nbsp;</td></tr>");
else
vHTML.push("<td style='cursor: default'>&nbsp;<img "+vImageHeight+" "+vImageWidth+" src='../HTMLBasedGUI/images/distance.gif'>&nbsp;</td>");
}
else
{
if (cc.CASA_vertical != "false") vHTML.push("<tr>");
var handler = vRollOver+" "+
vHTML.push("<td style='"+cc.CASA_cellstyle+"' "+align+" id='"+vIconId+"' width='"+vTdWidth+"' title='"+convertApos(vText)+"' class='ICONImage ");
if ( cc.CASA_selindex != null && cc.CASA_selindex == vCounter ) vHTML.push("ICONImageSelected");
vHTML.push("' " );
if (cc.CASA_testtoolid != null)
vHTML.push(" "+ getTesttoolidHtml() + "='"+cc.CASA_testtoolid+vCounter+"' ");
if (vDisabled != "true" && vInvisible !="true")
vHTML.push(vRollOver+" onclick='invokeIcon"+cc.CASA_id+"("+vCounter+",event)' onmousedown=\""+vMouseDown+"\" onmouseup='reactOnMouseUp"+cc.CASA_id+"("+vCounter+")' ondrag='return false;' ");
vHTML.push(">"+vMainTableStart+"<img "+vImageHeight+" "+vImageWidth+" src='"+vImageURL+"' id='"+vIconId+"' ");
if ( vInvisible=="true" && cc.CASA_invisiblemode == "cleared")
vHTML.push("style='visibility:hidden' ");
vHTML.push(">"+vMainTableClose);
vHTML.push("</td>");
if (cc.CASA_vertical != "false") vHTML.push("</tr>");
}
vCounter++;
}
if (cc.CASA_vertical == "false" && cc.CASA_withrightpadding == "true") vHTML.push("</td><td width='100%'>&nbsp;</td></tr>");
vHTML.push("</table>");
cc.innerHTML = vHTML.join("");
}
function invokeIconICONLIST(cc,buttonIndex,evt)
{
if (checkIO() == false) return;
var disabled = getPropertyValue(cc.CASA_iconlistprop + ".items["+buttonIndex+"].disabled");
if (disabled == "true") return;
var vMethodName = cc.CASA_iconlistprop + ".items["+buttonIndex+"].execute";
if ( cc.CASA_selindex != null )
parent.$("#"+"CasaICONLIST" + cc.CASA_id + "ICON"+cc.CASA_selindex).removeClass("ICONImageSelected");
cc.CASA_selindex = buttonIndex;
parent.$("#"+"CasaICONLIST" + cc.CASA_id + "ICON"+cc.CASA_selindex).addClass("ICONImageSelected");
invokeMethodInModel(vMethodName);
}
function rollinICONLIST(pId)
{
if (checkIO() == false) return;
var vIcon = m_parentdocument.getElementById(pId);
var isSelected = parent.$("#"+pId).hasClass("ICONImageSelected");
vIcon.className = "ICONImageRollOver";
if ( isSelected ) parent.$("#"+pId).addClass("ICONImageSelected");
}
function rolloutICONLIST(pId)
{
var vIcon = m_parentdocument.getElementById(pId);
var isSelected = parent.$("#"+pId).hasClass("ICONImageSelected");
vIcon.className = "ICONImage";
if ( isSelected ) parent.$("#"+pId).addClass("ICONImageSelected");
}
function reactOnMouseUpICONLIST(cc,buttonIndex)
{
if (checkIO() == false) return;
if (parent.m_dragId == "ICONLIST"+cc.CASA_id+"_"+buttonIndex)
return;
var dropInfo = null;
if (checkIfDragProcessIsActiveCL())
{
dropInfo = endDragCL();
}
else if (parent.m_dragMode == true)
{
dropInfo = parent.m_dropInfo;
parent.endDrag();
}
if (dropInfo != null)
{
var dropInfoProp = cc.CASA_iconlistprop + ".items["+buttonIndex+"].dropInfo";
setPropertyValue(dropInfoProp, dropInfo);
var vMethodName = cc.CASA_iconlistprop + ".items["+buttonIndex+"].reactOnDropGeneric";
invokeMethodInModel(vMethodName);
}
}
