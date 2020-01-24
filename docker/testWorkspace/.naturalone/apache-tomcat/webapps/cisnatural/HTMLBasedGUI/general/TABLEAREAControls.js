function addVersionInfoTABLEAREACONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TABLEAREACONTROLS');
}
function iccTA(cc,rmethod,romumethod,rowcount,mozillarowcount,
id,fwdtabkeymethod,fwdtabkeyfilter,bwdtabkeymethod,bwdtabkeyfilter,
height,oncontextmenumethod,hotkeys,withdarkbackground,containsTreenode,
invisiblemodeincompletelastrow, firstUsage)
{
cc.onkeydown = rmethod;
cc.onmousedown = rmethod;
cc.onmouseup = rmethod;
cc.onmouseover = rmethod;
cc.oncontextmenu = rmethod;
cc.CASA_rowcount = rowcount;
cc.CASA_memheight = undefined;
cc.CASA_memcausedbyromu = false;
cc.CASA_caretSelectedText=null;
cc.CASA_id = id;
cc.CASA_containsTreenode = containsTreenode;
if (fwdtabkeymethod != null) cc.CASA_fwdtabkeymethod = fwdtabkeymethod;
if (fwdtabkeyfilter != null) cc.CASA_fwdtabkeyfilter = fwdtabkeyfilter;
if (bwdtabkeymethod != null) cc.CASA_bwdtabkeymethod = bwdtabkeymethod;
if (bwdtabkeyfilter != null) cc.CASA_bwdtabkeyfilter = bwdtabkeyfilter;
if (invisiblemodeincompletelastrow != null) cc.CASA_invisiblemodeincompletelastrow = invisiblemodeincompletelastrow;
if (height != null) cc.CASA_height = height;
if (hotkeys != null) iccHOTKEY(cc, hotkeys);
cc.CASA_oncontextmenumethod = oncontextmenumethod;
if (firstUsage) startFocusGrid(cc);
registerListenerAsLast(romumethod);
if(withdarkbackground == "true")
cc.className = "PAGEBodyDark";
}
function reactTA(cc,evt,scrollbar,scrollbarinnerdiv)
{
if      (evt.type == "keydown") return reactOnKeyDownTABLEAREA(cc,evt,scrollbar,scrollbarinnerdiv);
else if (evt.type == "mousedown") return reactOnMouseDownTABLEAREA(cc,evt);
else if (evt.type == "mouseup") return reactOnMouseUpTABLEAREA(cc,evt);
else if (evt.type == "mouseover") return reactOnMouseOverTABLEAREA(cc,evt);
else if (evt.type == "contextmenu") return reactOnContextMenuTABLEAREA(cc,evt);
}
function reactOnContextMenuTABLEAREA(cc,evt)
{
if ( evt.stopPropagation) evt.stopPropagation();
if (checkIO()==false) return false;
if (cc.CASA_oncontextmenumethod == null) return true;
setContextMenuXYPAGE(CASA_event.clientX, CASA_event.clientY);
invokeMethodInModel(cc.CASA_oncontextmenumethod);
return false;
}
function presetRR_TABLEAREA(cc)
{
try
{
if (cc.CASA_repeatedRows == null)
{
var rc=0;
for (rc=0; rc < cc.CASA_repeat.length; rc++)
{
if (cc.CASA_repeat[rc] != 0)
break;
}
cc.CASA_repeatedRows = rc;
}
}
catch (eexc) {}
}
function reactOnModelUpdateTABLEAREA(cc,causedbyromu)
{
var lastSel = cc.CASA_caretSelectedText;
if (lastSel != null)
{
addFocusRequestor(lastSel);
cc.CASA_caretSelectedText=null;
}
if (cc.CASA_height == null) return;
if (m_beforeFirstReactOnNewModel == true) return;
cc.CASA_memcausedbyromu = true;
ccClientHeight = cc.clientHeight;
if (ccClientHeight <= 1) return;
if (cc.CASA_memheight == ccClientHeight)
return;
cc.CASA_memheight = ccClientHeight;
var vrows = cc.CASA_rows;
presetRR_TABLEAREA(cc);
var vfirstinvis = -2;
var vfirstEmptySTR = -2;
var isWP = parent.location.href.indexOf("MFWorkplaceSSS") >= 0;
var mozBrutal = isWP;
var vsavedClientHeight = 0;
for (var i=0; i<vrows.length; i++)
{
vrows[i].style.display = "";
vrows[i].disabled = false;
vrows[i].style.visibility = "visible";
if (mozBrutal)
{
if (vfirstinvis == -2 && (i*18) >= ccClientHeight)
vfirstinvis = i-1;
}
else
{
if (vfirstinvis == -2 && vrows[i].offsetTop >= ccClientHeight)
{
vfirstinvis = i - 1;
vsavedClientHeight = 0;
}
else
{
if (vfirstinvis == -2 && vrows[i].clientHeight > 0)
vsavedClientHeight = vrows[i].clientHeight;
}
}
try {
if (vfirstEmptySTR == -2 && isVisibleSTR != null
&& isVisibleSTR(vrows[i]) == false)
vfirstEmptySTR = i;
} catch (exc) {}
}
if (vfirstinvis == -2 && vrows.length > 0)
{
if ((vrows[vrows.length-1].offsetTop+vrows[vrows.length-1].offsetHeight) >= ccClientHeight)
vfirstinvis = vrows.length-1;
}
if (vfirstEmptySTR >= 0)
{
for (var i=vfirstEmptySTR; i<vrows.length; i++)
vrows[i].style.display = "none";
}
if (vfirstinvis >= -1)
{
if (vfirstinvis >= 0)
{
if (cc.CASA_invisiblemodeincompletelastrow == "invisible")
vrows[vfirstinvis].style.display = "none";
else if (cc.CASA_invisiblemodeincompletelastrow != "visible")
{
vrows[vfirstinvis].disabled = true;
vrows[vfirstinvis].style.visibility = "hidden";
}
}
for (var i=(vfirstinvis+1); i<vrows.length; i++)
{
vrows[i].style.display = "none";
vrows[i].style.visibility = "hidden";
}
}
if(vfirstinvis == -2 && cc.CASA_repeatedRows > 1)
{
vfirstinvis = Math.floor(vrows.length/cc.CASA_repeatedRows);
}
else
{
if (vfirstinvis == -2)
{
if (vsavedClientHeight == 0)
vfirstinvis = parseInt(cc.CASA_rowcount);
else
{
vfirstinvis = parseInt(ccClientHeight / vsavedClientHeight);
vfirstinvis--;
if (vfirstinvis <= 1 || vfirstinvis > cc.CASA_rowcount)
vfirstinvis = parseInt(cc.CASA_rowcount);
}
}
if (cc.CASA_repeatedRows > 1)
{
vfirstinvis = Math.floor(vfirstinvis/cc.CASA_repeatedRows);
}
}
var vrc = parseInt(getPropertyValue(cc.CASA_rowcountprop));
if (cc.CASA_invisiblemodeincompletelastrow == "visible" && vrc > (vfirstinvis - 1))
vfirstinvis +=1;
for (var i=0; i<vrows.length; i++)
if ( vrows[i].CASA_visible == "false" ) vrows[i].style.display = "none";
if (vrc != vfirstinvis)
{
addLogMessage("TABLEAREA - Changing row count from "+vrc+" to: " + vfirstinvis +
"\nccClientHeight: " + ccClientHeight +
"\nm_beforeFirstReactOnNewModel: " + m_beforeFirstReactOnNewModel);
setPropertyValue(cc.CASA_rowcountprop,vfirstinvis);
if (vfirstinvis < vrc)
{
var vmeth = "reactOnModelUpdate" + cc.CASA_id;
parent[vmeth]();
if (cc.CASA_pageDownIconId != null)
{
var bufferedVal = getPropertyValue(cc.CASA_griddataprop+".onPageDownVis");
var maxIndex = getPropertyValue(cc.CASA_griddataprop+".size");
setPropertyValue(cc.CASA_griddataprop+".onPageDownVis",maxIndex > visiblerows,true);
var mn = "romu"+cc.CASA_pageDownIconId;
parent[mn]();
mn = "romu"+cc.CASA_lastPageIconId;
parent[mn]();
setPropertyValue(cc.CASA_griddataprop+".onPageDownVis",bufferedVal,true);
}
}
else
{
addLogMessage("TABLEAREA - Refetching data from server");
var vmeth = "reactOnModelUpdate" + cc.CASA_id;
parent[vmeth]();
resetCheckIO();
submitModel();
}
}
else
{
}
}
var m_suppressNextKeyDown;
function reactOnKeyDownTABLEAREA(cc,evt,scrollbar,scrollbarinnerdiv)
{
if (cc.CASA_hotkeys != null)
{
var handled = reactOnKeyDownHOTKEY(cc,evt);
if (handled == true)
return false;
}
try
{
var srcElement = findSrcElement(evt);
var vti = getPropertyValue(scrollbar.CASA_topindexprop)*1;
var vrc = getPropertyValue(scrollbar.CASA_rowcountprop)*1;
var vmi = getPropertyValue(scrollbar.CASA_maxindexprop)*1;
if (evt.keyCode == 36 && cc.CASA_containsTreenode)
{
reactOnScrollKeyHomeVSCROLLBAR(scrollbar,scrollbarinnerdiv);
return false;
}
if (evt.keyCode == 35 && cc.CASA_containsTreenode)
{
reactOnScrollKeyEndVSCROLLBAR(scrollbar,scrollbarinnerdiv);
return false;
}
if (evt.keyCode == 34)
{
handleLastInput(srcElement);
reactOnScrollPageDownVSCROLLBAR(scrollbar,scrollbarinnerdiv);
cc.CASA_caretSelectedText = srcElement;
return false;
}
if (evt.keyCode == 33)
{
handleLastInput(srcElement);
reactOnScrollPageUpVSCROLLBAR(scrollbar,scrollbarinnerdiv);
cc.CASA_caretSelectedText = srcElement;
return false;
}
if (evt.keyCode == 40)
{
if (m_suppressNextKeyDown)
{
m_suppressNextKeyDown = false;
return;
}
if ((vti+vrc) >= vmi)
{
var vpy = findFocusControlXY(cc,srcElement).Y + 1;
if (vpy >= vrc)
return;
}
var vc = findFocusControl(cc,srcElement,1);
if (vc != 0 && vc!=-1 && vc != null)
{
assignFocus(vc);
}
else
{
handleLastInput(srcElement);
reactOnScrollDownVSCROLLBAR(scrollbar,scrollbarinnerdiv,1);
cc.CASA_caretSelectedText = srcElement;
}
return false;
}
else if (evt.keyCode == 38)
{
if (vti == 0)
{
var vpy = findFocusControlXY(cc,srcElement).Y ;
if (vpy == 0)
return;
}
var vc = findFocusControl(cc,srcElement,-1);
if (vc != 0 && vc!= -1 && vc != null)
{
assignFocus(vc);
}
else
{
handleLastInput(srcElement);
reactOnScrollUpVSCROLLBAR(scrollbar,scrollbarinnerdiv,1);
cc.CASA_caretSelectedText = srcElement;
}
return false;
}
else if (cc.CASA_clipboardaccess == true &&
evt.keyCode == 67 &&
evt.ctrlKey == true)
{
fillClipboardTABLEAREA(cc);
return false;
}
else if (cc.CASA_clipboardaccess == true &&
evt.keyCode == 86 &&
evt.ctrlKey == true)
{
pasteClipboardTABLEAREA(cc,evt);
return false;
}
else if (evt.keyCode == 9 &&
evt.shiftKey == false)
{
var vc = srcElement;
if (vc == -1 || vc == null) return;
if (vc.CASA_valueprop != null &&
vc.CASA_valueprop.indexOf("."+cc.CASA_fwdtabkeyfilter) >= 0)
{
var pos = findFocusControlXY(cc,vc);
var lastLineIndex = findIndexOfLastTabableFocusLine(cc);
if (pos.Y == lastLineIndex)
{
var vbrack1 = vc.CASA_valueprop.indexOf("[",cc.CASA_griddataprop.length);
var vbrack2 = vc.CASA_valueprop.indexOf("]",cc.CASA_griddataprop.length);
var varrayindex = vc.CASA_valueprop.substring(vbrack1+1,vbrack2);
var vmethname = cc.CASA_griddataprop + ".items[" + varrayindex + "]." + cc.CASA_fwdtabkeymethod;
invokeMethodInModel(vmethname);
}
else
{
return true;
}
return false;
}
else
{
var pos = findFocusControlXY(cc,vc);
var lastLineIndex = findIndexOfLastTabableFocusLine(cc);
if (pos.X == ((cc.CASA_fg[0].length)-1) &&
pos.Y == lastLineIndex)
{
if(cc.CASA_fwdtabkeymethod == null)
{
if ((vti+vrc) >= vmi) return true;
reactOnScrollPageDownVSCROLLBAR(scrollbar,scrollbarinnerdiv);
vfc = findFirstFocusControl(cc);
assignFocus(vfc);
}
else
{
var vbrack1 = vc.CASA_valueprop.indexOf("[",cc.CASA_griddataprop.length);
var vbrack2 = vc.CASA_valueprop.indexOf("]",cc.CASA_griddataprop.length);
var varrayindex = vc.CASA_valueprop.substring(vbrack1+1,vbrack2);
var vmethname = cc.CASA_griddataprop + ".items[" + varrayindex + "]." + cc.CASA_fwdtabkeymethod;
invokeMethodInModel(vmethname);
}
return false;
}
}
}
else if (evt.keyCode == 9 &&
evt.shiftKey == true)
{
var vc = srcElement;
if (vc == -1 || vc == null) return;
if (vc.CASA_valueprop != null &&
vc.CASA_valueprop.indexOf("."+cc.CASA_bwdtabkeyfilter) >= 0)
{
var pos = findFocusControlXY(cc,vc);
if (pos.Y == 0)
{
var vbrack1 = vc.CASA_valueprop.indexOf("[",cc.CASA_griddataprop.length);
var vbrack2 = vc.CASA_valueprop.indexOf("]",cc.CASA_griddataprop.length);
var varrayindex = vc.CASA_valueprop.substring(vbrack1+1,vbrack2);
var vmethname = cc.CASA_griddataprop + ".items[" + varrayindex + "]." + cc.CASA_bwdtabkeymethod;
invokeMethodInModel(vmethname);
}
else
{
return true;
}
return false;
}
else
{
var pos = findFocusControlXY(cc,vc);
if (pos.X == 1 && pos.Y == 0)
{
if (cc.CASA_bwdtabkeymethod == null)
{
if (vti <= 0) return true;
reactOnScrollPageUpVSCROLLBAR(scrollbar,scrollbarinnerdiv);
vfc = findLastFocusControl(cc);
assignFocus(vfc);
}
else
{
var vbrack1 = vc.CASA_valueprop.indexOf("[",cc.CASA_griddataprop.length);
var vbrack2 = vc.CASA_valueprop.indexOf("]",cc.CASA_griddataprop.length);
var varrayindex = vc.CASA_valueprop.substring(vbrack1+1,vbrack2);
var vmethname = cc.CASA_griddataprop + ".items[" + varrayindex + "]." + cc.CASA_bwdtabkeymethod;
invokeMethodInModel(vmethname);
}
return false;
}
}
}
}
catch (exc) {}
return true;
}
function assignFocus(elm)
{
parent.focus();
if (elm.setActive)
{
var tn = elm.tagName.toLowerCase();
if (tn == "table" || tn == "tr" || tn == "td" || tn == "div")
{
elm.setActive();
return;
}
}
elm.focus();
if (typeof (elm.select)!="undefined") elm.select();
}
var m_selTABLEAREA;
var m_previousselTABLEAREA;
var m_justselTABLEAREA = false;
function markAreaTABLEAREA(cc)
{
if (m_previousselTABLEAREA != null)
colorizeAreaTABLEAREA(cc,m_previousselTABLEAREA,false);
if (m_selTABLEAREA != null)
{
colorizeAreaTABLEAREA(cc,m_selTABLEAREA,true);
m_previousselTABLEAREA = new Object();
m_previousselTABLEAREA.x1 = m_selTABLEAREA.x1;
m_previousselTABLEAREA.x2 = m_selTABLEAREA.x2;
m_previousselTABLEAREA.y1 = m_selTABLEAREA.y1;
m_previousselTABLEAREA.y2 = m_selTABLEAREA.y2;
}
}
function pasteClipboardTABLEAREA(cc,evt)
{
if (m_selTABLEAREA == null) return true;
var vcp = parent.window.clipboardData.getData('Text');
if (vcp == null || vcp == "") return;
setPropertyValue(cc.CASA_griddataprop+".clipboardContent", vcp);
var sel = m_selTABLEAREA;
var xMin = sel.x1;
var xMax = sel.x2;
if (sel.x1 > sel.x2)
{
xMin = sel.x2;
xMax = sel.x1;
}
var yMin = sel.y1;
var yMax = sel.y2;
if (sel.y1 > sel.y2)
{
yMin = sel.y2;
yMax = sel.y1;
}
setPropertyValue(cc.CASA_griddataprop+".selectionX1", xMin);
setPropertyValue(cc.CASA_griddataprop+".selectionX2", xMax);
setPropertyValue(cc.CASA_griddataprop+".selectionY1", yMin);
setPropertyValue(cc.CASA_griddataprop+".selectionY2", yMax);
var vProps = [];
for (i=xMin; i<=xMax; i++)
{
vc = findFocusControlForXY(cc,i,sel.y1);
var vbrack2 = vc.CASA_valueprop.indexOf("]",cc.CASA_griddataprop.length);
vProps.push(vc.CASA_valueprop.substring((vbrack2+2), vc.CASA_valueprop.length));
}
setPropertyValue(cc.CASA_griddataprop+".valuepropsCSV", vProps.join(";"));
invokeMethodInModel(cc.CASA_griddataprop+".onImportClipboardContent");
}
function fillClipboardTABLEAREA(cc)
{
if (m_selTABLEAREA == null) return;
var sel = m_selTABLEAREA;
var xl = sel.x1;
var xr = sel.x2;
if (xr < xl) { xr = sel.x1; xl = sel.x2; }
var yt = sel.y1;
var yb = sel.y2;
if (yb < yt) { yb = sel.y1; yt = sel.y2; }
addLogMessage(xl + "/" + xr + "/" + yt + "/" + yb + "==> CLIPBOARD");
var vcp = "";
for (var iy=yt; iy<=yb; iy++)
{
for (var ix=xl; ix<=xr; ix++)
{
var vcell = findFocusControlForXY(cc,ix,iy);
var vtab = "";
if (ix<xr) vtab = "\t";
if (vcell != null)
vcp += vcell.value + vtab;
else
vcp += vtab;
}
if (iy<yb) vcp += "\n";
}
addLogMessage("CLIPBOARD String is " + vcp);
parent.window.clipboardData.setData('Text',vcp);
}
function colorizeAreaTABLEAREA(cc,sel,mark)
{
var xl = sel.x1;
var xr = sel.x2;
if (xr < xl) { xr = sel.x1; xl = sel.x2; }
var yt = sel.y1;
var yb = sel.y2;
if (yb < yt) { yb = sel.y1; yt = sel.y2; }
addLogMessage(xl + "/" + xr + "/" + yt + "/" + yb + "/" + mark);
for (var ix = xl; ix<=xr; ix++)
for (var iy = yt; iy<=yb; iy++)
{
try
{
var vcell = findFocusControlForXY(cc,ix,iy);
if (mark == true)
{
vcell.CASA_prevbgcolor = vcell.style.backgroundColor;
vcell.style.backgroundColor = "#C0FFC0";
}
else
{
vcell.style.backgroundColor = vcell.CASA_prevbgcolor;
}
}
catch (exc) {}
}
}
function reactOnMouseOverTABLEAREA(cc,evt)
{
if (cc.CASA_clipboardaccess != true) return;
if (m_justselTABLEAREA == false) return true;
try
{
var vpos = findFocusControlXY(cc,findSrcElement(evt));
if (vpos != null)
{
m_selTABLEAREA.x2 = vpos.X;
m_selTABLEAREA.y2 = vpos.Y;
markAreaTABLEAREA(cc);
return false;
}
}
catch (exc) { }
}
function reactOnMouseUpTABLEAREA(cc,evt)
{
if (evt.button != 2) return;
if (cc.CASA_clipboardaccess != true) return;
m_justselTABLEAREA = false;
}
function reactOnMouseDownTABLEAREA(cc,evt)
{
if (cc.CASA_clipboardaccess != true) return;
var srcElement = findSrcElement(evt);
if (evt.button == 2)
{
addLogMessage("reactOnMouseUpTABLEAREA " + srcElement.id);
try
{
var vpos = findFocusControlXY(cc,srcElement);
if (vpos != null)
{
m_selTABLEAREA = new Object();
m_selTABLEAREA.x1 = vpos.X;
m_selTABLEAREA.y1 = vpos.Y;
m_selTABLEAREA.x2 = vpos.X;
m_selTABLEAREA.y2 = vpos.Y;
}
else
{
m_selTABLEAREA = undefined;
}
markAreaTABLEAREA(cc);
m_justselTABLEAREA = true;
return false;
}
catch (exc) { }
}
else
{
m_selTABLEAREA = null;
markAreaTABLEAREA(cc);
}
}
function registerResizableTA(cc, ccColHeader)
{
if (cc.CASA_resizables == null)
cc.CASA_resizables = [];
cc.CASA_resizables.push(ccColHeader);
}
function removeResizableTA(cc, ccColHeader)
{
if (cc.CASA_resizables == null)return;
var array = [];
for(var iii=0;iii<cc.CASA_resizables.length;iii++)
if (cc.CASA_resizables[iii] != ccColHeader)
array.push(cc.CASA_resizables[iii]);
cc.CASA_resizables = array;
}
function openContextMenuResizableTA(cc,ccResizable,evt)
{
setContextMenuXYPAGE(evt.clientX,evt.clientY);
var prop = cc.CASA_griddataprop+".param1";
setPropertyValue(prop, ccResizable.CASA_propref)
if (evt.type == "dblclick")
{
reactOnResizableMouseUpBeginTA(cc,ccResizable);
flushGridColHeaderChangeTA(cc, "reactOnGridColHeaderDoubleClick");
}
else
{
flushGridColHeaderChangeTA(cc, "reactOnGridColHeaderContextMenuRequest")
}
}
function reactOnResizableMouseUpBeginTA(cc,ccToBeResized)
{
for (var i=0;i<cc.CASA_resizables.length;i++)
{
var w = cc.CASA_resizables[i].offsetWidth;
if (w != 0) cc.CASA_resizables[i].style.width = C_adjustUnits(w);
cc.CASA_resizables[i].CASA_widthBefore = cc.CASA_resizables[i].style.width;
}
}
function reactOnResizableMouseUpEndTA(cc, ccResized)
{
try
{
var widthBefore = parseInt (ccResized.CASA_widthBefore,10);
if (isNaN(widthBefore)) widthBefore=0;
var widthAfter =  parseInt(ccResized.style.width,10);
if (isNaN(widthAfter)) widthAfter=0;
if (widthAfter == widthBefore) return;
flushGridColHeaderChangeTA(cc, "reactOnGridColHeaderResize");
}
catch(excccc)
{
for (var i=0;i<ccRes.length;i++)
{
ccRes[i].style.width = C_adjustUnits(ccRes[i].CASA_widthBefore);
if (ccRes[i].CASA_widthprop != null)
setPropertyValue(ccRes[i].CASA_widthprop,ccRes[i].style.width);
}
var str = "";
for (var id in excccc)
{
str += "["+id+"] "+excccc[id]+"\n";
}
alert("RESIZE Error\n\n"+str);
}
}
var m_mozMoveSourceColTA = null;
function reactOnGridColHeaderMoveBeginTABLEAREA(cc,col,pEv)
{
m_mozMoveSourceColTA = col;
var vRef = cc;
var vLeft = 0;
var vTop = 0;
while (true)
{
try
{
if (vRef == null) break;
vLeft = vLeft + vRef.offsetLeft - vRef.scrollLeft;
vTop = vTop + vRef.offsetTop - vRef.scrollTop;
var vTemp = vRef.offsetParent;
if (vRef == vTemp) break;
vRef = vTemp;
}
catch (exc)
{
break;
}
}
try { vLeft -= cc.scrollLeft; } catch (e) {}
col.CASA_posY = vTop;
col.CASA_posX1 = vLeft;
col.CASA_posX2 = vLeft + col.offsetWidth;
col.CASA_posXEvent = pEv.clientX;
parent.m_dragId = col.CASA_id;
parent.m_dragType = "COLMOVE";
parent.m_dragRsizable = col;
var vHTML = [];
vHTML.push("<table style='position: absolute; top: -50px; left: -50px; z-index: 1000;' onmouseup='moveFinished"+col.CASA_id+"(event);'> ");
vHTML.push("<tr>");
vHTML.push("<td>");
vHTML.push("<div style='margin:65px 0 50px 50px;'>");
vHTML.push("<table  border='1' bordercolor='#C0C0C0' cellspacing=0 style='border-collapse:collapse;background-color:#FFFFFF'>");
vHTML.push("<tr>");
vHTML.push("<td height='"+C_adjustUnits(col.offsetHeight)+"' class='LABELCellHeadline' valign='middle'>");
vHTML.push("<div class='LABELDivText' style='width:"+C_adjustUnits(col.offsetWidth)+"'>");
vHTML.push(col.CASA_name);
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
for(var iii=0;iii<cc.CASA_rowcount;iii++)
{
vHTML.push("<tr><td>");
vHTML.push("&nbsp;");
vHTML.push("</td></tr>");
}
vHTML.push("</table>");
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
vHTML.push("</table>");
parent.startDrag(vHTML.join(""), pEv);
}
function reactOnGridColHeaderMoveEndTABLEAREA(cc,sourceCol,pEv)
{
if (parent.m_dragMode == false) return;
parent.endDrag();
if (m_mozMoveSourceColTA != null) sourceCol = m_mozMoveSourceColTA;
var cols = cc.CASA_resizables;
if (cols == null) return;
for (var vI=0; vI<cols.length; vI++)
{
var col = cols[vI];
calculatePageOffset(col);
var x1 = col.CASA_pageoffsetleft;
try { x1 -= cc.scrollLeft; } catch (e) {}
var x2 = x1 + col.offsetWidth;
if (pEv.clientX>x1 && pEv.clientX<x2)
{
if (col != sourceCol)
{
var toLeft = true;
for(var iii=0;iii<cols.length;iii++)
{
if (cols[iii] == sourceCol)
{
toLeft = false;
break;
}
if (cols[iii] == col)
break
}
var reorderedCols = [];
for(var iii=0;iii<cols.length;iii++)
{
if (cols[iii] == sourceCol)
continue;
if (cols[iii] == col && toLeft)
reorderedCols.push(sourceCol);
reorderedCols.push(cols[iii]);
if (cols[iii] == col && !toLeft)
reorderedCols.push(sourceCol);
}
cc.CASA_resizables = reorderedCols;
flushGridColHeaderChangeTA(cc, "reactOnGridColHeaderMove");
break;
}
}
}
}
function flushGridColHeaderChangeTA(cc, methodName)
{
var vgridprop = cc.CASA_griddataprop;
for (var i=0;i<cc.CASA_resizables.length;i++)
{
var prop = vgridprop+".columnIndexFor"+cc.CASA_resizables[i].CASA_propref;
setPropertyValue(prop, i);
prop = vgridprop+".columnWidthFor"+cc.CASA_resizables[i].CASA_propref;
setPropertyValue(prop, cc.CASA_resizables[i].style.width);
}
invokeMethodInModel(vgridprop+"."+methodName);
}
