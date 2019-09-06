function addVersionInfoRESIZABLECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('RESIZABLECONTROLS');
}
var m_MINWIDTHRESIZABLE = 30;
function iccRESIZABLE(cc,romumethod,reactmethod,id,rt2id,widthprop,toggleprop)
{
if (id != null) cc.CASA_id = id;
if (rt2id != null) cc.CASA_ta = parent.gebid("DIV"+rt2id);
cc.CASA_div = parent.gebid("RDIV"+id);
if (cc.CASA_ta != null)
{
if (widthprop != null)
cc.CASA_propref = widthprop;
registerResizableTA(cc.CASA_ta, cc);
cc.oncontextmenu = reactmethod;
cc.onclick = reactmethod;
cc.ondblclick = reactmethod;
}
if (widthprop != null) cc.CASA_widthprop = widthprop;
if (toggleprop != null) cc.CASA_toggleprop = toggleprop;
if (widthprop != null) registerListener(romumethod);
cc.CASA_memToggleValue = true;
}
function romuRESIZABLE(cc)
{
if (cc.CASA_widthprop != null)
{
var v = getPropertyValue(cc.CASA_widthprop);
if (v != null && v != "null" && v != cc.style.width)
{
if (v.indexOf("0") == 0)
{
v = "";
}
cc.width = "";
cc.style.width = C_adjustUnits (v);
}
}
}
function reactRESIZABLE(evt)
{
return reactRESIZABLEInternal(evt.currentTarget,evt);
}
function reactRESIZABLEInternal(cc,evt)
{
if (evt.type == "mousedown") return reactOnMouseDownRESIZABLE(cc,evt);
else if (evt.type == "mouseup") return reactOnMouseUpRESIZABLE(cc,evt);
else if (evt.type == "contextmenu") return reactOnClickRESIZABLE(cc,evt);
else if (evt.type == "click") return reactOnSortRESIZABLE(cc,evt);
else if (evt.type == "dblclick") return reactOnClickRESIZABLE(cc,evt);
}
function reactOnSortRESIZABLE(cc,pEv)
{
if (cc.CASA_toggleprop != null)
{
setPropertyValue(cc.CASA_toggleprop, cc.CASA_memToggleValue);
cc.CASA_memToggleValue = !cc.CASA_memToggleValue;
submitModel("submit");
}
return true;
}
function reactOnClickRESIZABLE(cc,pEv)
{
if (cc.CASA_ta != null)
{
return openContextMenuResizableTA(cc.CASA_ta, cc, pEv);
}
return true;
}
function reactOnMouseDownRESIZABLE(cc,pEv)
{
if (pEv.button == 2) return;
if (checkIO() == false) return false;
CL().cancelEvent(pEv);
var vControl = cc;
var vControlParentNode = null;
var vLeft = 0;
var vTop = 0;
while (true)
{
try
{
if (vControl == null) break;
vLeft = vLeft + vControl.offsetLeft - vControl.scrollLeft;
vTop = vTop + vControl.offsetTop - vControl.scrollTop;
var vTemp = vControl.offsetParent;
if (vControl == vTemp) break;
vControl = vTemp;
}
catch (exc)
{
break;
}
}
cc.CASA_posY = vTop;
cc.CASA_posX1 = vLeft;
cc.CASA_posX2 = vLeft + cc.offsetWidth;
cc.CASA_posXEvent = pEv.clientX;
parent.m_dragId = cc.CASA_id;
parent.m_dragType = "RESIZABLE";
parent.m_dragRsizable = cc;
var vHeight = cc.offsetHeight;
if (cc.CASA_ta != null && cc.CASA_ta.offsetHeight != 0)
vHeight = cc.CASA_ta.offsetHeight;
var vHTML = [];
vHTML.push("<table cellspacing=0 cellpadding=0 class='VSPLITLineDragTable' style='position: absolute; top: 0; left: -150px; z-index: 1000;' onmouseup='C.reactRESIZABLEInternal(CR"+cc.CASA_id+",event);'> ");
vHTML.push("<tr>");
vHTML.push("<td>");
vHTML.push("<div style='margin:0 150px 0 150px; height: "+C_adjustUnits(vHeight)+"' class='VSPLITLineDrag'>");
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
vHTML.push("</table>");
parent.startDrag(vHTML.join(""), pEv);
}
function reactOnMouseUpRESIZABLE(cc,pEv,actionid)
{
if (cc.CASA_ta != null)
reactOnResizableMouseUpBeginTA(cc.CASA_ta,cc);
var vWidth = 0;
if (m_direction=='rtl')
{
if (cc.CASA_posX2 >= pEv.clientX)
vWidth = cc.CASA_posX2 - pEv.clientX;
}
else
{
if (pEv.clientX >= cc.CASA_posX1)
vWidth = pEv.clientX - cc.CASA_posX1;
}
if (vWidth <= m_MINWIDTHRESIZABLE) vWidth = m_MINWIDTHRESIZABLE;
cc.style.width = C_adjustUnits(vWidth);
if (cc.CASA_ta != null)
reactOnResizableMouseUpEndTA(cc.CASA_ta,cc);
}
