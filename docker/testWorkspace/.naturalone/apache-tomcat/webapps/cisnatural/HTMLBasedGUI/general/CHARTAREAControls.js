function addVersionInfoCHARTAREACONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CHARTAREACONTROLS');
}
function iccCHARTAREA(cc,romumethod,remethod,infoprop,useglines,glinesprop,glinexdist,glineydist,pagebaseddragdrop,id)
{
registerListener(romumethod);
cc.CASA_type = "cc";
cc.CASA_id = id;
cc.CASA_infoprop = infoprop;
cc.CASA_memci = undefined;
cc.CASA_items = [];
cc.CASA_remethod = remethod;
cc.CASA_useglines = useglines;
cc.CASA_glinesprop = glinesprop;
cc.CASA_glinexdist = glinexdist;
cc.CASA_glineydist = glineydist;
cc.CASA_pagebaseddragdrop = pagebaseddragdrop;
cc.CASA_dragid = null;
cc.CASA_dragstartx = 0;
cc.CASA_dragstarty = 0;
cc.innerHTML = "";
cc.onmouseup = remethod;
cc.onmousemove = remethod;
cc.oncontextmenu = remethod;
cc.CASA_initial = true;
rorCHARTAREA(cc);
}
function rorCHARTAREA(cc)
{
var vHeight = parent.innerHeight;
if (vHeight < 0) vHeight = 0;
var vWidth = parent.innerWidth;
if (cc.CASA_bufferedHeight == vHeight && cc.CASA_bufferedWidth == vWidth && cc.CASA_initial == false) return;
cc.CASA_bufferedHeight = vHeight;
cc.CASA_bufferedWidth = vWidth;
cc.CASA_initial = false;
setPropertyValue(cc.CASA_infoprop+".clientwidth",vWidth);
setPropertyValue(cc.CASA_infoprop+".clientheight",vHeight);
}
function romuCHARTAREA(cc)
{
var ci = getPropertyValue(cc.CASA_infoprop + ".ci");
if (ci == cc.CASA_memci) return;
var data = getPropertyValue(cc.CASA_infoprop + ".toHTML");
cc.innerHTML = data;
cc.CASA_memci = ci;
setPropertyValue(cc.CASA_infoprop+".clientwidth",cc.CASA_bufferedWidth);
setPropertyValue(cc.CASA_infoprop+".clientheight",cc.CASA_bufferedHeight);
}
function reCHARTAREA(cc,pevent)
{
if (pevent.type == "mousemove" && pevent.button == 1)
{
if (this.parent.document.selection)
this.parent.document.selection.empty();
else
this.parent.window.getSelection().removeAllRanges();
if (pevent.button == 1 && cc.CASA_startDragDrop == true && cc.CASA_setDragDropCursor == false)
{
if (cc.CASA_mouseDownX != pevent.x || cc.CASA_mouseDownY != pevent.y)
{
if (cc.CASA_pagebaseddragdrop == true || cc.CASA_pagebaseddragdrop == 'true' )
{
calculatePageOffset(cc);
var xpos = pevent.x - cc.CASA_pageoffsetleft - cc.CASA_dragPosLeft;
var ypos = pevent.y - cc.CASA_pageoffsettop - cc.CASA_dragPosTop;
if(cc.CASA_dragicon == "" || cc.CASA_dragicon == undefined || cc.CASA_dragicon == "null")
{
parent.startDrag("<div onmouseup='re"+cc.CASA_id+"(event);' style='width:"+C_adjustUnits(cc.CASA_dragWidth)+"; height:"+C_adjustUnits(cc.CASA_dragHeight)+"; border:2px solid gray'></div>",
pevent);
}
else
{
parent.startDrag("<img onmouseup='re"+cc.CASA_id+"(event);' ondrag='return false;' src='"+cc.CASA_dragicon+"'></img>",
pevent);
}
setDragShiftPAGE(-xpos,-ypos);
cc.CASA_dragstartx = pevent.x;
cc.CASA_dragstarty = pevent.y;
cc.CASA_dragid = "||:NE"+cc.CASA_dragid;
parent.m_dragType = "CHARTAREA";
}
else
{
calculatePageOffset(cc);
var xpos = pevent.x - cc.CASA_pageoffsetleft - cc.CASA_dragPosLeft;
var ypos = pevent.y - cc.CASA_pageoffsettop - cc.CASA_dragPosTop;
if(cc.CASA_dragicon == "" || cc.CASA_dragicon == undefined || cc.CASA_dragicon == "null")
startDragCL("||:NE"+cc.CASA_dragid,
"<div style='x:0; y:0; width:"+C_adjustUnits(cc.CASA_dragWidth)+"; height:"+C_adjustUnits(cc.CASA_dragHeight)+"; position:absolute; border:2px solid gray'>"+
"<div style='left:"+C_adjustUnits((xpos-7))+"; top:"+C_adjustUnits((ypos-7))+"; width:7px; height:3px; position:relative; background-color:white'>"+
"</div>"+
"</div>",
pevent, parent, cc.CASA_pagebaseddragdrop);
else
startDragCL("||:NE"+cc.CASA_dragid,
"<img ondrag='return false;' src='"+cc.CASA_dragicon+"'>"+
"<div style='left:"+C_adjustUnits((xpos-2))+"; top:"+C_adjustUnits((ypos-3))+"; width:6px; height:4px; position:absolute; background-color:white'>"+
"</div>",
pevent, parent, cc.CASA_pagebaseddragdrop);
setDragShift(-xpos,-ypos,CHARTAREAMouseUpDragDrop);
}
cc.CASA_setDragDropCursor = true;
cc.CASA_startDragDrop = false;
}
}
if (!checkIfDragProcessIsActiveCL()) return;
parent.document.selection.clear();
return;
}
if (pevent.type == "mouseup")
{
if (parent.m_dragMode == true)
{
parent.endDrag();
var xpos = pevent.x - cc.CASA_dragstartx;
var ypos = pevent.y - cc.CASA_dragstarty ;
CHARTAREAMouseUpDragDrop(pevent, xpos, ypos, 0, 0, cc.CASA_dragid);
return;
}
}
var vs = pevent.target;
while (true)
{
if (vs != null && vs.CASA_type == null)
{
var id = vs.id;
var idcsvs = decodeString(id,";");
if (idcsvs.length > 1)
{
vs.CASA_type = idcsvs[1];
vs.CASA_id = idcsvs[0];
if (idcsvs[1] == "ne")
{
vs.CASA_fixedPosition = idcsvs[2];
vs.CASA_dragicon = idcsvs[3];
}
if (idcsvs[1] == "sp")
{
vs.CASA_neid = idcsvs[2];
}
break;
}
vs = vs.parentNode;
}
else
break;
}
if (pevent.type == "contextmenu")
{
setKeyValuesAndMousePosition(cc,pevent);
if (checkIO() == false) return;
setContextMenuXYPAGE(pevent.x,pevent.y);
calculatePageOffset(cc);
var xpos = pevent.x - cc.CASA_pageoffsetleft;
var ypos = pevent.y - cc.CASA_pageoffsettop;
if (cc.CASA_useglines == "true")
{
var factor = Math.round(xpos / cc.CASA_glinexdist);
xpos = factor * cc.CASA_glinexdist;
factor = Math.round(ypos / cc.CASA_glineydist);
ypos = factor * cc.CASA_glineydist;
}
setPropertyValue(cc.CASA_infoprop+".mouseDownX",xpos);
setPropertyValue(cc.CASA_infoprop+".mouseDownY",ypos);
if (vs.CASA_type == "cc")
{
invokeMethodInModel(cc.CASA_infoprop+".onContextMenuRequestArea");
}
else if (vs.CASA_type == "ne")
{
setPropertyValue(cc.CASA_infoprop+".selElementId",vs.CASA_id);
invokeMethodInModel(cc.CASA_infoprop+".onContextMenuRequestItem");
}
return false;
}
if (vs.CASA_type == "cc")
{
setKeyValuesAndMousePosition(cc,pevent);
if (pevent.type == "mouseup") mouseUpCHARTAREA(cc,pevent.offsetX,pevent.offsetY);
}
else if (vs.CASA_type == "ne" && pevent.button == 1)
{
setKeyValuesAndMousePosition(cc,pevent);
if (pevent.type == "click") clickInElementCHARTAREA(cc,vs,pevent);
else if (pevent.type == "drag") return false;
else if (pevent.type == "mousedown") mouseDownInElementCHARTAREA(cc,vs,pevent);
else if (pevent.type == "mouseup")
{
if (cc.CASA_mouseDownX == pevent.x && cc.CASA_mouseDownY == pevent.y)
{
cc.CASA_startDragDrop = false;
cc.CASA_setDragDropCursor = false;
clickInElementCHARTAREA(cc,vs,pevent);
}
else
{
var xpos = vs.style.posLeft + pevent.offsetX;
var ypos = vs.style.posTop + pevent.offsetY;
mouseUpCHARTAREA(cc,xpos,ypos);
}
}
}
else if (vs.CASA_type == "sp")
{
setKeyValuesAndMousePosition(cc,pevent);
if (pevent.type == "drag") return false;
else if (pevent.type == "mousedown") return mouseDownInHotspotCHARTAREA(cc,vs,pevent);
else if (pevent.type == "mouseup") return mouseUpInHotspotCHARTAREA(cc,vs,pevent);
}
}
function clickInElementCHARTAREA(cc,ne,pevent)
{
calculatePageOffset(cc);
setPropertyValue(cc.CASA_infoprop+".itemMousePosX",pevent.x - cc.CASA_pageoffsetleft - ne.style.posLeft);
setPropertyValue(cc.CASA_infoprop+".itemMousePosY",pevent.y - cc.CASA_pageoffsettop - ne.style.posTop);
setPropertyValue(cc.CASA_infoprop+".selElementId",ne.CASA_id);
invokeMethodInModel(cc.CASA_infoprop+".onElementSelected");
}
var m_CHARTAREAItemMouseDown;
function mouseDownInElementCHARTAREA(cc,ne,pevent)
{
cc.CASA_mouseDownX = pevent.x;
cc.CASA_mouseDownY = pevent.y;
if (pevent.button == 1 && ne.CASA_fixedPosition == 'false')
{
cc.CASA_startDragDrop = true;
cc.CASA_setDragDropCursor = false;
cc.CASA_dragid = ne.CASA_id;
cc.CASA_dragicon = ne.CASA_dragicon;
cc.CASA_dragWidth = ne.style.posWidth;
cc.CASA_dragHeight = ne.style.posHeight;
cc.CASA_dragPosLeft = ne.style.posLeft;
cc.CASA_dragPosTop = ne.style.posTop;
cc.CASA_dragItem = ne;
m_CHARTAREAItemMouseDown = cc;
}
}
function mouseDownInHotspotCHARTAREA(cc,sp,pevent)
{
startDragCL("||:SP"+sp.CASA_id + "/" + sp.CASA_neid,
"<div style='position:absolute;top:10px;width:8px;height:8px;background-color:#FFC0C0;font-size:0'></div>",
pevent, parent);
return false;
}
function CHARTAREAMouseUpDragDrop(pevent,diffXPos,diffYPos,dragShiftX,dragShiftY,dropInfo)
{
if (m_CHARTAREAItemMouseDown == null)
return;
var xpos = m_CHARTAREAItemMouseDown.CASA_dragPosLeft + diffXPos;
var ypos = m_CHARTAREAItemMouseDown.CASA_dragPosTop + diffYPos;
if (m_CHARTAREAItemMouseDown.CASA_useglines == "true")
{
var factor = Math.round(xpos / m_CHARTAREAItemMouseDown.CASA_glinexdist);
xpos = factor * m_CHARTAREAItemMouseDown.CASA_glinexdist;
factor = Math.round(ypos / m_CHARTAREAItemMouseDown.CASA_glineydist);
ypos = factor * m_CHARTAREAItemMouseDown.CASA_glineydist;
}
setPropertyValue(m_CHARTAREAItemMouseDown.CASA_infoprop + ".xpos",xpos);
setPropertyValue(m_CHARTAREAItemMouseDown.CASA_infoprop + ".ypos",ypos);
setPropertyValue(m_CHARTAREAItemMouseDown.CASA_infoprop + ".dropInfo",dropInfo);
invokeMethodInModel(m_CHARTAREAItemMouseDown.CASA_infoprop + ".onDrop");
m_CHARTAREAItemMouseDown = null;
m_startDragDrop = false;
}
function mouseUpInHotspotCHARTAREA(cc,sp,pevent)
{
if (!checkIfDragProcessIsActiveCL()) return;
parent.document.selection.clear();
var dropInfo = endDragCL();
setPropertyValue(cc.CASA_infoprop + ".dropInfo",dropInfo);
setPropertyValue(cc.CASA_infoprop + ".selHotspot","||:SP"+sp.CASA_id+"/"+sp.CASA_neid);
invokeMethodInModel(cc.CASA_infoprop + ".onDropHotspot");
}
function mouseUpCHARTAREA(cc,xpos,ypos)
{
if (!checkIfDragProcessIsActiveCL()) return;
var dropInfo = endDragCL();
if (cc.CASA_useglines == "true")
{
var factor = Math.round(xpos / cc.CASA_glinexdist);
xpos = factor * cc.CASA_glinexdist;
factor = Math.round(ypos / cc.CASA_glineydist);
ypos = factor * cc.CASA_glineydist;
}
setPropertyValue(cc.CASA_infoprop + ".xpos",xpos);
setPropertyValue(cc.CASA_infoprop + ".ypos",ypos);
setPropertyValue(cc.CASA_infoprop + ".dropInfo",dropInfo);
invokeMethodInModel(cc.CASA_infoprop + ".onDrop");
}
function setKeyValuesAndMousePosition(cc,pevent)
{
calculatePageOffset(cc);
setPropertyValue(cc.CASA_infoprop+".mousePosX",pevent.x - cc.CASA_pageoffsetleft);
setPropertyValue(cc.CASA_infoprop+".mousePosY",pevent.y - cc.CASA_pageoffsettop);
setPropertyValue(cc.CASA_infoprop+".ctrlKey",pevent.ctrlKey);
setPropertyValue(cc.CASA_infoprop+".shiftKey",pevent.shiftKey);
}
