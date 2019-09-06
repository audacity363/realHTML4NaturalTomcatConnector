function addVersionInfoROWDIVCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('ROWDIVCONTROLS');
}
function iccINNERDIV(cc,widthprop,left,leftprop,dropwidthprop,dropoffsetprop,dropmethod,id)
{
cc.CASA_memWidth = null;
cc.CASA_memLeft = null;
if (widthprop != null) cc.CASA_widthprop = widthprop;
if (leftprop != null) cc.CASA_leftprop = leftprop;
if (dropwidthprop != null) cc.CASA_dropwidthprop = dropwidthprop;
if (dropoffsetprop != null) cc.CASA_dropoffsetprop = dropoffsetprop;
if (dropmethod != null) cc.CASA_dropmethod = dropmethod;
if (id != null) cc.CASA_id = id;
}
function romuINNERDIV(cc)
{
var v = getPropertyValue(cc.CASA_widthprop);
v = C_adjustUnits(v);
if (v != null && v != cc.CASA_memWidth && v != cc.style.width)
{
cc.CASA_memWidth = v;
if (v == "0" || v == "0%")
{
cc.style.display = "none";
cc.style.width = "1px";
}
else
{
if (cc.style.display == "none") cc.style.display = "";
cc.style.width = v;
}
}
v = getPropertyValue(cc.CASA_leftprop);
v = C_adjustUnits(v);
if (v != null && v != cc.CASA_memLeft && v != cc.style.left)
{
cc.CASA_memLeft = v;
cc.style.left = v;
}
}
function reactINNERDIV(cc,evt)
{
if      (evt.type == "mousedown") return startDragINNERDIV(cc,evt);
if      (evt.type == "mouseup") return endDragINNERDIV(cc,evt);
}
function startDragINNERDIV(cc,evt)
{
if (checkIO() == false) return false;
dsc();
calculatePageOffset(cc);
cc.CASA_posXMin = 0;
cc.CASA_posXMay = 10000;
cc.CASA_posY = cc.CASA_pageoffsettop;
cc.CASA_posXEvent = evt.clientX;
parent.m_dragId = cc.id;
parent.m_dragType = "VSPLIT";
var vHTML = [];
vHTML.push("<table cellspacing=0 cellpadding=0 class='VSPLITLineDragTable' style='position: absolute; top: 0; left: -150px; z-index: 1000;' onmouseup='react"+cc.CASA_id+"(event);'> ");
vHTML.push("<tr>");
vHTML.push("<td>");
vHTML.push("<div class='VSPLITLineDrag' style='margin:0 150px 0 150px;height: "+C_adjustUnits(cc.offsetHeight)+"'>");
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
vHTML.push("</table>");
parent.startDrag(vHTML.join(""), evt);
var ddDIV = findDRAGDROP(true);
ddDIV.style.top = C_adjustUnits(cc.CASA_pageoffsettop);
ddDIV.style.left = C_adjustUnits(evt.clientX);
}
function endDragINNERDIV(cc,evt)
{
if (cc.CASA_dropwidthprop != null)
setPropertyValue(cc.CASA_dropwidthprop,cc.offsetWidth);
if (cc.CASA_dropoffsetprop != null)
setPropertyValue(cc.CASA_dropoffsetprop,(evt.clientX - cc.CASA_posXEvent));
if (cc.CASA_dropmethod != null)
invokeMethodInModel(cc.CASA_dropmethod);
}
