function addVersionInfoSPLITCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SPLITCONTROLS');
}
function iccHSPLIT(cc)
{
cc.CASA_bufferedvalue = null;
if (cc.CASA_vscroll != null)
{
var divTop = parent.gebid("HSPLITTOPDIV"+cc.CASA_id);
divTop.style.overflow = cc.CASA_vscroll;
var divBottom = parent.gebid("HSPLITBOTTOMDIV"+cc.CASA_id);
divBottom.style.overflow = cc.CASA_vscroll;
}
}
function reactOnModelUpdateHSPLIT(pCC)
{
if (pCC.CASA_heighttopprop == null)
return;
var vHeightTop = getPropertyValue(pCC.CASA_heighttopprop);
if (vHeightTop == null || vHeightTop == "")
return;
var vHeightBottom = "100%";
if (vHeightTop.indexOf("%")>=0)
{
var vTemp = vHeightTop.substring(0,vHeightTop.indexOf("%"))-0;
if (vTemp < 0 || vTemp > 100)
return;
vHeightBottom = (100-vTemp)+"%";
}
else
{
try
{
var vHeightTopInt = (-1)*vHeightTop*(-1);
if (vHeightTopInt < 6) vHeightTop = "0";
}
catch(excc)
{
return;
}
}
if (vHeightTop == pCC.CASA_bufferedvalue)
return;
pCC.CASA_bufferedvalue = vHeightTop;
setHeightHSPLIT(pCC.TOP, vHeightTop);
setHeightHSPLIT(pCC.BOTTOM, vHeightBottom);
if (vHeightTop.indexOf("%")>=0) {
setStyleHeightHSPLIT(pCC.TOPDIV, "100%")
setStyleHeightHSPLIT(pCC.BOTTOMDIV, "100%");
}
else {
setStyleHeightHSPLIT(pCC.TOPDIV, vHeightTop)
setStyleHeightHSPLIT(pCC.BOTTOMDIV, vHeightBottom);
}
}
function reactOnMouseDownHSPLIT(pCC, pEvent)
{
if (checkIO() == false) return false;
var vControl = pCC;
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
pCC.CASA_posX = vLeft;
pCC.CASA_posYMin = vTop;
pCC.CASA_posYMax = vTop + pCC.offsetHeight;
pCC.CASA_posYEvent = pEvent.clientY;
parent.m_dragId = pCC.CASA_id;
parent.m_dragType = "HSPLIT";
var vHTML = [];
vHTML.push("<table cellspacing=0 cellpadding=0 class='HSPLITLineDragTable' style='position: absolute; top: -100px; left: 0; z-index: 1000;' onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);'> ");
vHTML.push("<tr>");
vHTML.push("<td width='"+C_adjustUnits(pCC.offsetWidth)+"'>");
vHTML.push("<div class='HSPLITLineDrag' style='margin-top: 100px; margin-bottom: 100px; width: "+C_adjustUnits(pCC.offsetWidth)+"; font-size: 1px'>");
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
vHTML.push("</table>");
parent.startDrag(vHTML.join(""), pEvent);
var ddDIV = findDRAGDROP(true);
ddDIV.CASA_splitCC = pCC;
}
function reactOnMouseUpHSPLIT(pCC, pEvent)
{
var minWidth = 6;
var posY = pEvent.clientY;
var vCCHeight = pCC.CASA_posYMax - pCC.CASA_posYMin;
if (posY > pCC.CASA_posYEvent)
{
var vCCHeightBottom =  pCC.CASA_posYMax - posY;
if (vCCHeightBottom < minWidth)
vCCHeightBottom = 0;
else if (vCCHeightBottom >= vCCHeight-minWidth)
vCCHeightBottom = vCCHeight;
var topHeight = "100%";
if (vCCHeightBottom == vCCHeight)
topHeight = 0;
setHeightHSPLIT(pCC.BOTTOM, vCCHeightBottom);
setStyleHeightHSPLIT(pCC.BOTTOMDIV, vCCHeightBottom);
setHeightHSPLIT(pCC.TOP, topHeight);
setStyleHeightHSPLIT(pCC.TOPDIV, topHeight);
}
else
{
var vCCHeightTop =  posY - pCC.CASA_posYMin;
if (vCCHeightTop < minWidth)
vCCHeightTop = 0;
else if (vCCHeightTop >= vCCHeight-minWidth)
vCCHeightTop = vCCHeight;
var heightBottom = "100%";
if (vCCHeightTop == vCCHeight)
heightBottom = 0;
setHeightHSPLIT(pCC.TOP, vCCHeightTop);
setStyleHeightHSPLIT(pCC.TOPDIV, vCCHeightTop);
setHeightHSPLIT(pCC.BOTTOM, heightBottom);
setStyleHeightHSPLIT(pCC.BOTTOMDIV, heightBottom);
}
if (pCC.CASA_heighttopprop != null)
{
pCC.CASA_bufferedvalue = pCC.TOP.offsetHeight;
setPropertyValue(pCC.CASA_heighttopprop,pCC.TOP.offsetHeight);
mozResizeInnerFramesSPLIT();
submitModel("submit");
}
}
function mozResizeInnerFramesSPLIT()
{
for (var ifi=0; ifi<m_innerFrames.length; ifi++)
{
try
{
m_innerFrames[ifi].WORKAREA.reactOnResize();
}
catch (exc) { }
}
}
function setHeightHSPLIT(td, height)
{
if (height == 0 || height == "0" || height == "0%")
{
td.style.display = "none";
}
else
{
td.style.display = "";
td.height = height;
}
}
function setStyleHeightHSPLIT(td, height)
{
if (height == 0 || height == "0" || height == "0%")
{
td.style.display = "none";
}
else
{
td.style.display = "";
td.style.height = C_adjustUnits(height);
}
}
function iccVSPLIT(cc)
{
cc.CASA_bufferedvalue = null;
var divLeft = parent.gebid("VSLEFTDIV"+cc.CASA_id);
var divRight = parent.gebid("VSRIGHTDIV"+cc.CASA_id);
if (cc.CASA_overflow == null || cc.CASA_overflow == "hidden")
{
divLeft.style.overflow = "hidden";
divRight.style.overflow = "hidden";
}
else
{
divLeft.style.overflow = cc.CASA_overflow;
divRight.style.overflow = cc.CASA_overflow;
}
}
function reactOnModelUpdateVSPLIT(pCC)
{
if (pCC.CASA_widthleftprop == null)
return;
var vWidthLeft = getPropertyValue(pCC.CASA_widthleftprop);
if (vWidthLeft == null || vWidthLeft == "")
return;
var vWidthRight = "100%";
if (vWidthLeft.indexOf("%")>=0)
{
var vTemp = vWidthLeft.substring(0,vWidthLeft.indexOf("%"))-0;
if (vTemp < 0 || vTemp > 100)
return;
vWidthRight = (100-vTemp)+"%";
}
else
{
try
{
vWidthLeft = (-1)*vWidthLeft*(-1);
if (vWidthLeft < 6) vWidthLeft = 0;
}
catch(excc)
{
return;
}
}
if (vWidthLeft == pCC.CASA_bufferedvalue)
return;
pCC.CASA_bufferedvalue = vWidthLeft;
if (m_direction == "rtl")
{
setWidthVSPLIT(pCC.RIGHT, vWidthLeft);
setWidthVSPLIT(pCC.LEFT, vWidthRight);
}
else
{
setWidthVSPLIT(pCC.LEFT, vWidthLeft);
setWidthVSPLIT(pCC.RIGHT, vWidthRight);
}
}
function reactOnMouseDownVSPLIT(pCC, pEvent)
{
if (checkIO() == false) return false;
var vControl = pCC;
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
pCC.CASA_posY = vTop;
pCC.CASA_posXMin = vLeft;
pCC.CASA_posXMax = vLeft + pCC.offsetWidth;
pCC.CASA_posXEvent = pEvent.clientX;
parent.m_dragId = "VSPLIT"+pCC.CASA_id;
parent.m_dragType = "VSPLIT";
var vHTML = [];
vHTML.push("<table cellspacing=0 cellpadding=0 class='VSPLITLineDragTable' style='position: absolute; top: 0; left: -150px; z-index: 1000;' onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);'> ");
vHTML.push("<tr>");
vHTML.push("<td>");
vHTML.push("<div class='VSPLITLineDrag' style='margin:0 150px 0 150px; height: "+C_adjustUnits(pCC.offsetHeight)+"'>");
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
vHTML.push("</table>");
parent.startDrag(vHTML.join(""), pEvent);
var ddDIV = findDRAGDROP(true);
ddDIV.style.top = C_adjustUnits(vTop);
ddDIV.style.left = C_adjustUnits(pEvent.clientX);
ddDIV.CASA_cc = pCC;
ddDIV.CASA_splitCC = pCC;
}
function reactOnMouseUpVSPLIT(pCC, pEvent)
{
var minWidth = 6;
var posX = pEvent.clientX;
var vCCWidth = pCC.CASA_posXMax - pCC.CASA_posXMin - 3;
vCCWidthRight = "100%";
var vCCWidthLeft =  posX - pCC.CASA_posXMin;
if (vCCWidthLeft < minWidth)
{
vCCWidthLeft = 0;
}
else if (vCCWidthLeft >= vCCWidth-minWidth)
{
vCCWidthLeft = vCCWidth;
}
var vCCWidthRight = vCCWidth-vCCWidthLeft;
if (m_direction == "rtl")
{
setWidthVSPLIT(pCC.RIGHT, vCCWidthLeft);
setWidthVSPLIT(pCC.LEFT, vCCWidthRight);
}
else
{
setWidthVSPLIT(pCC.LEFT, vCCWidthLeft);
setWidthVSPLIT(pCC.RIGHT, vCCWidthRight);
}
if (pCC.CASA_widthleftprop != null)
{
pCC.CASA_bufferedvalue = vCCWidthLeft;
setPropertyValue(pCC.CASA_widthleftprop,vCCWidthLeft);
mozResizeInnerFramesSPLIT();
submitModel("submit");
}
}
function setWidthVSPLIT(td, width)
{
if (width == 0 || width == "0" || width == "0%")
{
td.style.display = "none";
}
else
{
td.style.display = "";
td.width = width;
}
}
