function addVersionInfoTREENODE4CONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TREENODE4CONTROLS');
}
function iccTREENODE4(cc,outerTable,treesubcontrols,treepart2,id,index,
romumethod,reactmethod,arrayprop,imageprop,backgroundcolorprop,
imageopened,imageclosed,imageendnode,
singleselect,withplusminus,withlines,
textstylevariant,directselectelement,selectionstylevariant, tooltipprop,testtoolid)
{
cc.CASA_treesubcontrols = treesubcontrols;
cc.CASA_outerTable = outerTable;
registerListener(romumethod);
cc.CASA_reactmethod = reactmethod;
cc.CASA_id = id;
cc.CASA_treepart2 = treepart2;
cc.CASA_index = index;
if (imageendnode == null) imageendnode = "../HTMLBasedGUI/general/nothing.gif";
cc.CASA_imageopened = imageopened;
cc.CASA_imageclosed = imageclosed;
cc.CASA_imageendnode = imageendnode;
cc.CASA_singleselect = singleselect;
cc.CASA_withlines = withlines;
cc.CASA_arrayprop = arrayprop;
if (imageprop != null) cc.CASA_imageprop = imageprop;
if (withplusminus != null) cc.CASA_withplusminus = withplusminus;
if (textstylevariant != null) cc.CASA_textstylevariant = textstylevariant;
if (directselectelement != null) cc.CASA_directselectelement = directselectelement;
if (selectionstylevariant != null) cc.CASA_selectionstylevariant = selectionstylevariant;
if (tooltipprop != null) cc.CASA_tooltipprop = tooltipprop;
cc.CASA_backgroundcolorprop = backgroundcolorprop;
cc.CASA_testtoolid = testtoolid;
cc.CASA_indexprop = arrayprop+".selectedIndex";
cc.CASA_changeindexprop = arrayprop+".changeIndex";
cc.CASA_ctrlindexprop = arrayprop+".ctrlSelectedIndex";
cc.CASA_ctrlkeyselectmethod = arrayprop+".ctrlKeySelect";
cc.CASA_shiftindexprop = arrayprop+".shiftSelectedIndex";
cc.CASA_shiftkeyselectmethod = arrayprop+".shiftKeySelect";
var base = arrayprop+".items["+index+"].";
cc.CASA_levelprop = base+"level";
cc.CASA_openedprop = base+"opened";
cc.CASA_textprop = base+"text";
cc.CASA_method = base+"toggle";
cc.CASA_selectmethod = base+"select";
cc.CASA_contextselectmethod = base+"reactOnContextMenuRequest";
cc.CASA_lineinfoprop = base+"lineInfo";
cc.CASA_childinfoprop = base+"childInfo";
}
function romuTREENODE4(cc)
{
var vBackGroundStyle = "";
if(cc.CASA_backgroundcolorprop != null && cc.CASA_backgroundcolorprop != "")
{
var vBackgroundColor = getPropertyValue(cc.CASA_backgroundcolorprop);
if(vBackgroundColor != null && vBackgroundColor != "")
vBackGroundStyle = "style='background-color:"+vBackgroundColor+"; background-image:none;'";
}
var vLevel = getPropertyValue(cc.CASA_levelprop)*1;
var vOpened = getPropertyValue(cc.CASA_openedprop);
var vText = getPropertyValue(cc.CASA_textprop);
var vIndex = getPropertyValue(cc.CASA_indexprop);
var vInactive = getPropertyValue(cc.CASA_inactiveprop);
var vshift = 20;
var vshiften = 20;
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
if (cc.CASA_imageprop != null)
vImage = getPropertyValue(cc.CASA_imageprop);
var vLineInfo = null;
if (cc.CASA_lineinfoprop != null)
vLineInfo = getPropertyValue(cc.CASA_lineinfoprop);
var vMarked = false;
if (vIndex != null && vIndex == cc.CASA_index)
vMarked = true;
var vSelection = [];
if (cc.CASA_arrayprop != null)
{
var vSelectionCounter = 0;
while (true)
{
var vSelIndex = getPropertyValue(cc.CASA_arrayprop+".selectedItemIndices["+vSelectionCounter+"].index");
if (vSelIndex == null) break;
vSelection.push(vSelIndex);
vSelectionCounter++;
}
}
for(vSelCheck=0; vSelCheck < vSelection.length; vSelCheck++)
if (vSelection[vSelCheck] == cc.CASA_index)
{
vMarked = true;
break;
}
var imageExt = ".gif";
if (m_direction == "rtl")
imageExt = "_rtl.gif";
if (vMarked == cc.CASA_memMarked &&
vLevel == cc.CASA_memLevel &&
vOpened == cc.CASA_memOpened &&
vText == cc.CASA_memText &&
vInactive == cc.CASA_memInactive &&
vImage == cc.CASA_memImage &&
vLineInfo == cc.CASA_memLineInfo)
{
return;
}
cc.CASA_memMarked = vMarked;
cc.CASA_memLevel = vLevel;
cc.CASA_memOpened = vOpened;
cc.CASA_memText = vText;
cc.CASA_memInactive = vInactive;
cc.CASA_memImage = vImage;
cc.CASA_memLineInfo = vLineInfo;
var vClass = "TREENODETable";
var sc = findTREENODE4SelectedTable(cc);
if (vMarked == true)
vClass = sc;
else
{
for (var i=0; i<vSelection.length; i++)
if (vSelection[i] == cc.CASA_index)
{
vClass = sc;
break;
}
}
if (vText == null)
{
cc.CASA_isNull = true;
disableCasaTabIndexFor(cc, cc.CASA_outerTable, "TREENODE");
if (cc.CASA_treesubcontrols == null)
return;
cc.CASA_treesubcontrols.style.display = 'none';
cc.innerHTML = "<table cellspacing=0 cellpadding=0 class='"+vClass+"'>"+
"<tr><td>&nbsp;</td></tr></table>";
cc.CASA_treepart2.innerHTML = "<table cellspacing=0 cellpadding=0  class='"+vClass+"'>"+
"<tr><td>&nbsp;</td></tr></table>";
return;
}
else
{
cc.CASA_isNull = false;
cc.CASA_treesubcontrols.style.display = '';
}
if (cc.CASA_imageopened == null) cc.CASA_imageopened = "../HTMLBasedGUI/images/areaimgWM"+imageExt;
if (cc.CASA_imageclosed == null) cc.CASA_imageclosed = "../HTMLBasedGUI/images/areaimgfoldedWM"+imageExt;
if (vImage == null || vImage == "")
{
vImage = cc.CASA_imageopened;
if (vOpened == 0) vImage = cc.CASA_imageclosed;
else if (vOpened == 2) vImage = cc.CASA_imageendnode;
}
var vPlusMinus = "";
if (cc.CASA_withplusminus == true && vOpened != 2)
{
var vPMImage = "../HTMLBasedGUI/images/treeminus"+imageExt;
if (vOpened == 0)
vPMImage = "../HTMLBasedGUI/images/treeplus"+imageExt;
else if (cc.CASA_withlines == true)
{
var vChildInfo = getPropertyValue(cc.CASA_childinfoprop);
if (vChildInfo == "1")
vPMImage = "../HTMLBasedGUI/images/treeminus2"+imageExt;
else
vPMImage = "../HTMLBasedGUI/images/treeminus"+imageExt;
}
vPlusMinus += "<td "+getTesttoolidHtml()+"='"+cc.CASA_testtoolid+"_pm' valign='middle' height='1px' class='links' onclick='event.preventDefault(); reactType"+cc.CASA_id+"(\"toggle\");'>"+
"<img border='0' src='"+vPMImage+"'>"+
"</td>";
}
cc.CASA_linkId = "C_" + cc.CASA_id;
if (cc.CASA_withplusminus == true && vOpened == 2)
vLevel += 15;
var vTDs = "<td><img src='../HTMLBasedGUI/general/nothing.gif' width='"+C_adjustUnits(vLevel)+"' height='1px'></td>";
if (vLevel == 0)
vTDs = "";
if (cc.CASA_withlines == true && vLineInfo != null && vLineInfo != "")
vTDs = CL().buildLineInfoTREENODE(vLineInfo, imageExt, vOpened);
if (vText == "") vText = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
var vTextClass = "TREENODELink";
if (vOpened == 2)
vTextClass = "TREENODELinkEndNode";
else if (getPropertyValue(cc.CASA_levelprop) == 0)
vTextClass = "TREENODELinkTopNode";
if (cc.CASA_textstylevariant != null)
vTextClass += cc.CASA_textstylevariant;
if (vInactive == "true")
vTextClass = "TREENODEInactiveText";
cc.CASA_className = vTextClass;
var vTooltip = "";
if (cc.CASA_tooltipprop != null)
{
vTooltip = getPropertyValue(cc.CASA_tooltipprop);
if (vTooltip != null && vTooltip != "")
vTooltip = " title='"+convertApos(vTooltip)+"' ";
}
else
vTooltip = " title='"+convertApos(vText)+"' ";
var vTextElement = "<a class='"+vTextClass+"' id='"+cc.CASA_linkId+"' style='padding-left: 1px;' " + vTooltip;
if (vInactive != "true")
{
if (cc.CASA_isNull != true && cc.CASA_directselectelement == "textonly")
vTextElement += " onclick='if (event.ctrlKey == true) { reactType"+cc.CASA_id+"(\"select\",\"ctrl\"); return false;} else if (event.shiftKey == true) { reactType"+cc.CASA_id+"(\"select\",\"shift\"); return false;} else reactType"+cc.CASA_id+"(\"select\");'";
}
vTextElement += ">";
vTextElement += "&nbsp;"
vTextElement += vText+"</a>";
var vTDDist = "<td><span style='width:2px;font-size:0'></span></td>";
var vSpanDist = "<span style='width:1px;font-size:0'></span>";
if (vOpened != 2)
{
cc.innerHTML = "<table height='100%' id='TR_1_"+cc.CASA_id+"' cellspacing=0 cellpadding=0  "+vBackGroundStyle+" class='"+vClass+"'>"+
"<tr>"+
vTDs+
vPlusMinus+
"<td data-testtoolid='"+cc.CASA_testtoolid+"_toggle' width=20px align='center' class='links' onclick='event.preventDefault(); if (C.checkIO()) { if (event.ctrlKey == true) { selectItem"+cc.CASA_id+"(\"ctrl\"); return false;} else if (event.shiftKey == true) { selectItem"+cc.CASA_id+"(\"shift\"); return false;} reactType"+cc.CASA_id+"(\"toggle\"); }'>"+
"<img border='0' src='"+vImage+"'>"+
"</td>"+
vTDDist+
"</tr>"+
"</table>";
cc.CASA_treepart2.innerHTML = "<table id='TR_2_"+cc.CASA_id+"' cellspacing=0 cellpadding=0 width='100%'  "+vBackGroundStyle+" class='"+vClass+"'>"+
"<tr>"+
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
cc.innerHTML = "<table height='100%' id='TR_1_"+cc.CASA_id+"' cellspacing=0 cellpadding=0  "+vBackGroundStyle+" class='"+vClass+"'>"+
"<tr>"+
vTDs+
"<td data-testtoolid='"+cc.CASA_testtoolid+"_toggle' width=20px align='center' class='links' onclick='if (event.ctrlKey == true) { selectItem"+cc.CASA_id+"(\"ctrl\"); return false;} else if (event.shiftKey == true) { selectItem"+cc.CASA_id+"(\"shift\"); return false;} selectItem"+cc.CASA_id+"();'>"+
"<img border='0' src='"+vImage+"'>"+
"</td>"+
vTDDist+
"</tr>"+
"</table>";
cc.CASA_treepart2.innerHTML = "<table id='TR_2_"+cc.CASA_id+"' cellspacing=0 cellpadding=0 width='100%'  "+vBackGroundStyle+" class='"+vClass+"'>"+
"<tr>"+
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
var vtable = parent.gebid("TR_1_"+cc.CASA_id);
var vtable2 = parent.gebid("TR_2_"+cc.CASA_id);
var vlink = parent.gebid(cc.CASA_linkId);
vtable.CASA_ref = vtable2;
vtable.CASA_link = vlink;
vtable2.CASA_ref = vtable;
vtable2.CASA_link = vlink;
vtable.onmouseover = cc.CASA_reactmethod;
vtable.onmouseout = cc.CASA_reactmethod;
vtable2.onmouseover = cc.CASA_reactmethod;
vtable2.onmouseout = cc.CASA_reactmethod;
}
function reactTREENODE4(cc, evt)
{
if (evt.type == "mouseenter") return rinTREENODE4(cc,evt);
else if (evt.type == "mouseleave") return routTREENODE4(cc,evt);
else if (evt.type == "mouseover") return rinTREENODE4(cc,evt);
else if (evt.type == "mouseout") return routTREENODE4(cc,evt);
else alert("Unhandled event (reactTREENODE4): " + evt.type);
}
function reactTypeTREENODE4(cc,type,param)
{
if (type == "rollin") CL().C_rollinLinkROLLOVER(parent.gebid(param));
else if (type == "rollout") CL().C_rolloutLinkROLLOVER(parent.gebid(param));
else if (type == "select") selectItemTREENODE4(cc, param);
else if (type == "toggle") toggleItemTREENODE4(cc);
else alert("Unhandled event (reactTypeTREENODE4): " + type);
}
function selectItemTREENODE4(cc, key)
{
if (checkIO() == false) return;
if(isInactiveTREENODE4(cc)) return;
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
function toggleItemTREENODE4(cc)
{
if (checkIO() == false) return;
cc.CASA_requestFocusForIndex = cc.CASA_index;
setPropertyValue(cc.CASA_indexprop, cc.CASA_index);
invokeMethodInModel(cc.CASA_method);
}
function rinTREENODE4(cc, evt)
{
try
{
if (checkIO() == false) return;
if(isInactiveTREENODE4(cc)) return;
elm = parent.gebid("TR_1_"+cc.CASA_id);
if (cc.CASA_memMarked != true)
{
elm.className = "TREENODETableRollover";
elm.CASA_ref.className = "TREENODETableRollover";
}
elm.CASA_link.className = cc.CASA_className + "Rollover";
} catch (exc) {}
}
function routTREENODE4(cc, evt)
{
try
{
if (checkIO() == false) return;
if(isInactiveTREENODE4(cc)) return;
var className = "TREENODETable";
if (cc.CASA_memMarked == true)
className = findTREENODE4SelectedTable(cc);
elm = parent.gebid("TR_1_"+cc.CASA_id);
elm.className = className;
elm.CASA_ref.className = className;
elm.CASA_link.className = cc.CASA_className;
} catch (exc) {}
}
function findTREENODE4SelectedTable(cc)
{
var result = "TREENODESelectedTable";
if (cc.CASA_selectionstylevariant != null)
result += cc.CASA_selectionstylevariant;
return result;
}
function isInactiveTREENODE4(cc)
{
return getPropertyValue(cc.CASA_inactiveprop)=="true";
}
function onContextMenuTREENODE4(event,cc)
{
if (checkIO() == false) return;
if (getPropertyValue(cc.CASA_textprop) == null) return;
setContextMenuXYPAGE(event.clientX,event.clientY);
setPropertyValue(cc.CASA_indexprop, cc.CASA_index);
invokeMethodInModel(cc.CASA_contextselectmethod);
}
