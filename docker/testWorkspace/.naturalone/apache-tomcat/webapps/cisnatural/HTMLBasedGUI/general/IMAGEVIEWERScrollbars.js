function addVersionInfoIMAGEVIEWERSCROLLBARS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('IMAGEVIEWERSCROLLBARS');
}
function iccIVSCROLLBAR(cc,innderdiv,romumethod,id,scroll,iv)
{
cc.CASA_lastscrolltop = undefined;
cc.CASA_id = id;
if(cc.id == "")
cc.id = "SCROLLDIV_"+id;
cc.CASA_scroll = scroll;
cc.CASA_scrollFactorX = 0;
cc.CASA_scrollFactorY = 0;
cc.CASA_romuMethod = romumethod;
cc.CASA_iv = iv;
registerListenerforSCROLLBAR(romumethod);
if (cc.parentNode.id=="") cc.parentNode.id="SCROLLTD_" + id;
addMozDiv(cc.parentNode);
}
var lastScrollTop = null;
var lastScrollLeft = null;
var lastSavedXCenter = -1;
var lastSavedYCenter = -1;
function reactOnMouseDownIVSCROLLBAR(cc,innerdiv,isVertical,evt)
{
cc.CASA_scrollbarScroll=true;
var vid = cc.CASA_id;
if (isVertical)
{
vid -= 10000;
}
else
{
vid -= 20000;
}
var idDOM = parent.document.getElementById("IV_"+vid);
var scrollBar = cc.lastChild;
var scrolldiff = updateScrollDiff (idDOM,scrollBar,isVertical);
}
function updateScrollDiff (idDOM,scrollBar,isVertical)
{
var scrolldiff;
var rotation = parseInt (getPropertyValue(idDOM.CASA_rotation));
var zoomFact = parseFloat (getPropertyValue(idDOM.CASA_zoomFactor));
if ((isVertical &&  (rotation==0 || rotation==180)) || (!isVertical  &&  (rotation==90 || rotation==270)))
maxIndex = parseInt (getPropertyValue (idDOM.CASA_imageHeight))*zoomFact - getMinMax (idDOM,rotation,zoomFact,isVertical).min*2*zoomFact;
else
maxIndex = parseInt (getPropertyValue (idDOM.CASA_imageWidth))*zoomFact - getMinMax (idDOM,rotation,zoomFact,isVertical).min*2*zoomFact;
if (isVertical)
{
var curTop = Math.round(scrollBar.scrollTop/(scrollBar.scrollHeight-scrollBar.offsetHeight)*maxIndex);
scrolldiff = lastScrollTop  - curTop;
lastScrollTop = curTop;
}
else
{
var curLeft = Math.round(scrollBar.scrollLeft/(scrollBar.scrollWidth-scrollBar.offsetWidth)*maxIndex);
scrolldiff = lastScrollLeft  - curLeft;
lastScrollLeft = curLeft;
}
return scrolldiff;
}
function mozMouseOutIVSCROLLBAR(cc, mozmovemethod, evt, isVertical,C)
{
cc.CASA_scrollbarScroll = false;
}
var m_mozDragCCIVSCROLL = null;
var m_mozDragCTIVSCROLL = null;
var m_mozDragTimerIVSCROLL = null;
var m_mozDragIsVertical= true;
var m_infoIVSCROLL = null;
function clearTimoutDragIVSCROLL()
{
if(m_mozDragTimerIVSCROLL != null)
{
window.clearTimeout(m_mozDragTimerIVSCROLL);
m_mozDragCCIVSCROLL = null;
m_mozDragCTIVSCROLL = null;
m_mozDragTimerIVSCROLL = null;
m_mozDragIsVertical = true;
}
}
function getMinMax (idDOM,rotation,zoomFactor,isVertical)
{
var min=0, max=0;
if (isVertical)
{
var iH=0, cH=0;
if (rotation==90|| rotation==270)
{
iH = parseInt (getPropertyValue(idDOM.CASA_imageWidth));
if (iH > 0)
cH = idDOM.firstChild.clientWidth;
}
else
{
iH = parseInt (getPropertyValue(idDOM.CASA_imageHeight));
if (iH > 0)
cH = idDOM.firstChild.clientHeight;
}
min = Math.ceil(cH / (zoomFactor * 2));
max = Math.max(min, iH - min);
}
else
{
var iW=0,cW=0;
if (rotation==90|| rotation==270)
{
iW = parseInt (getPropertyValue(idDOM.CASA_imageHeight));
if (iW > 0)
cW = idDOM.firstChild.clientHeight;
}
else
{
iW = parseInt (getPropertyValue(idDOM.CASA_imageWidth));
if (iW > 0)
cW = idDOM.firstChild.clientWidth;
}
min = Math.ceil(cW / (zoomFactor * 2));
max = Math.max(min, iW - min);
}
return {
min: min,
max: max
};
}
function mozDragReactIVSCROLLBAR(cc, mozmovemethod, evt, isVertical,C)
{
if (evt.type == "scroll")
{
if (cc.CASA_scrollbarScroll==true)
{
var maxIndex;
var vid = cc.CASA_id;
if (isVertical)
{
vid -= 10000;
}
else
{
vid -= 20000;
}
var idDOM = parent.document.getElementById("IV_"+vid);
var scrollBar = cc.lastChild;
var scrolldiff = updateScrollDiff (idDOM,scrollBar,isVertical);
var idDOM = parent.document.getElementById("IV_"+vid);
var ivCanvas = parent.document.getElementById("IV_"+vid+"_canvas");
var image = ivCanvas.getImage();
if (isVertical)
C.mouseMoveHandler( idDOM , image, 0, scrolldiff);
else
C.mouseMoveHandler( idDOM , image, scrolldiff, 0);
}
clearTimoutDragIVSCROLL();
m_mozDragCCIVSCROLL = cc;
m_mozDragCTIVSCROLL = evt.currentTarget;
m_mozDragIsVertical = isVertical
m_mozDragTimerIVSCROLL = window.setTimeout("mozROSIVSCROLLBARTimer()", 50);
}
}
function mozROSIVSCROLLBARTimer()
{
var vCC = m_mozDragCCIVSCROLL;
var vCT = m_mozDragCTIVSCROLL;
var isVertical = m_mozDragIsVertical;
clearTimoutDragIVSCROLL();
mozReactOnScrollIVSCROLLBAR(vCC,vCT,isVertical);
}
function mozReactOnScrollIVSCROLLBAR(cc,vCurrentTarget,isVertical)
{
var vid = cc.CASA_id;
if (isVertical)
vid -= 10000;
else
vid -= 20000;
var idDOM = parent.document.getElementById("IV_"+vid);
if((isVertical && cc.CASA_scrollFactorY == 0) || (!isVertical && cc.CASA_scrollFactorX == 0))
calculateFactorforIVSCROLLBAR(cc, isVertical);
var factor = cc.CASA_scrollFactorY;
if (!isVertical) factor = cc.CASA_scrollFactorX;
if(0 == factor)
return;
var zoomFactor = parseFloat (getPropertyValue (idDOM.CASA_zoomFactor));
var vMaxXIndex = parseInt (getPropertyValue(idDOM.CASA_imageWidth))*zoomFactor;
var vMaxYIndex = parseInt (getPropertyValue(idDOM.CASA_imageHeight))*zoomFactor;
var xCenter  = parseInt (getPropertyValue (idDOM.CASA_xCenter)) ;
var yCenter   = parseInt (getPropertyValue (idDOM.CASA_yCenter)) ;
var rotation   = parseInt (getPropertyValue(idDOM.CASA_rotation));
var scrollBar = vCurrentTarget;
var maxIndex;
var minMax = getMinMax (idDOM,rotation,zoomFactor,isVertical);
if ((isVertical &&  (rotation==0 || rotation==180)) || (!isVertical  &&  (rotation==90 || rotation==270)))
maxIndex = parseInt (getPropertyValue (idDOM.CASA_imageHeight))-(minMax.min*2);
else
maxIndex = parseInt (getPropertyValue (idDOM.CASA_imageWidth))-(minMax.min*2);
vMaxYIndex = vMaxYIndex - minMax.min*2;
yCenter = yCenter -minMax.min;
vMaxXIndex = vMaxXIndex - minMax.min*2;
xCenter = xCenter -minMax.min;
var newVal;
if (isVertical)
{
newVal = Math.round(scrollBar.scrollTop/(scrollBar.scrollHeight-scrollBar.offsetHeight)*maxIndex);
if (rotation==0 || rotation==90)
newVal+=minMax.min;
else
newVal-=minMax.min;
if (rotation==180 || rotation==270)
{
newVal = maxIndex - newVal;
}
}
else
{
newVal = Math.round(scrollBar.scrollLeft/(scrollBar.scrollWidth-scrollBar.offsetWidth)*maxIndex);
if (rotation==0 || rotation==270)
newVal+=minMax.min;
else
newVal-=minMax.min;
if (rotation==180 || rotation==90)
{
newVal = maxIndex - newVal;
}
}
if(isNaN(newVal)) newVal = 0;
if (newVal <= 0)
newVal = 0;
if (newVal < minMax.min)
{
newVal = minMax.min;
}
else if (newVal>minMax.max+1)
{
newVal = minMax.max;
}
if (isVertical)
{
if (rotation==90 || rotation==270)
{
if (newVal == lastSavedXCenter)
return;
lastSavedXCenter = newVal;
setPropertyValue( idDOM.CASA_xCenter, newVal );
}
else
{
if (newVal == lastSavedYCenter)
return;
lastSavedYCenter = newVal;
setPropertyValue( idDOM.CASA_yCenter, newVal );
}
}
else
{
if (rotation==90 || rotation==270)
{
if (newVal == lastSavedYCenter)
return;
lastSavedYCenter = newVal;
setPropertyValue( idDOM.CASA_yCenter, newVal );
}
else
{
if (newVal == lastSavedXCenter)
return;
lastSavedXCenter = newVal;
setPropertyValue( idDOM.CASA_xCenter, newVal );
}
}
invokeMethodInModel(idDOM.CASA_movemethod);
}
function calculateFactorforIVSCROLLBAR(casacontrol, isVertial)
{
var vid = casacontrol.CASA_id;
var idDOM = null;
var factor=0;
if (isVertial)
vid -= 10000;
else
vid -= 20000;
try
{
idDOM = parent.document.getElementById("IV_"+vid);
if(idDOM != null && idDOM.firstChild!=null)
{
if (isVertial)
{
var iH = parseInt (getPropertyValue(idDOM.CASA_imageHeight));
var cH = idDOM.firstChild.clientHeight;
factor = iH/cH;
}
else
{
iW = parseInt (getPropertyValue(idDOM.CASA_imageWidth));
cW = idDOM.firstChild.clientWidth;
factor = iW/cW;
}
}
}
catch (eexxccee){}
if (isVertial)
casacontrol.CASA_scrollFactorY = factor;
else
casacontrol.CASA_scrollFactorX = factor;
}
function reactOnModelUpdateIVSCROLLBAR(casacontrol,innerdiv,vertical)
{
var zoomFact = parseFloat (getPropertyValue( casacontrol.CASA_iv.CASA_zoomFactor ));
var vLeftIndex = parseInt (getPropertyValue(casacontrol.CASA_iv.CASA_xCenter));
var vTopIndex  = parseInt (getPropertyValue(casacontrol.CASA_iv.CASA_yCenter )) ;
var imageHeight = parseInt (getPropertyValue(casacontrol.CASA_iv.CASA_imageHeight));
var imageWidth = parseInt (getPropertyValue(casacontrol.CASA_iv.CASA_imageWidth));
var vMaxXIndex = parseInt (getPropertyValue(casacontrol.CASA_iv.CASA_imageWidth)) ;
var vMaxYIndex = parseInt (getPropertyValue(casacontrol.CASA_iv.CASA_imageHeight)) ;
var rotation = parseInt (getPropertyValue(casacontrol.CASA_iv.CASA_rotation));
var minMax = getMinMax (casacontrol.CASA_iv,rotation,zoomFact,vertical);
vMaxYIndex = vMaxYIndex - minMax.min*2;
vTopIndex = vTopIndex -minMax.min;
vMaxXIndex = vMaxXIndex - minMax.min*2;
vLeftIndex = vLeftIndex -minMax.min;
if (rotation==180)
{
vLeftIndex = vMaxXIndex - vLeftIndex;
vTopIndex = vMaxYIndex - vTopIndex;
}
else if (rotation==90)
{
vLeftIndex = vMaxXIndex - vLeftIndex;
}
else if (rotation==270)
{
vTopIndex = vMaxYIndex - vTopIndex;
}
if((vertical && casacontrol.CASA_scrollFactorY == 0) || (!vertical && casacontrol.CASA_scrollFactorX == 0))
{
calculateFactorforIVSCROLLBAR(casacontrol,vertical);
}
if (vertical && casacontrol.CASA_scroll == "hidden")
return;
initIVScrollInfo();
if(vertical)
casacontrol.style.width = C_adjustUnits((m_infoIVSCROLL.scrlSize + 1));
else
casacontrol.style.height = C_adjustUnits((m_infoIVSCROLL.scrlSize + 1));
if(innerdiv != null) innerdiv.style.display = 'none';
var vid = casacontrol.CASA_id;
var innerImageStyle = "";
var scrollStyle = "";
var scrollId="";
var innerImageId = "";
if(vertical)
{
var vHeight=0;
if (casacontrol.CASA_iv.childNodes[0]!=undefined)
{
if (rotation==90 || rotation==270)
{
vHeight = Math.round(zoomFact*100*imageWidth/casacontrol.CASA_iv.childNodes[0].width);
}
else
{
vHeight = Math.round(zoomFact*100*imageHeight/casacontrol.CASA_iv.childNodes[0].height);
}
}
if (isNaN(vHeight)) vHeight = 0;
if (!isFinite(vHeight)) vHeight = 100;
if (vHeight < 0) vHeight = 0;
var vHeightInPercents = vHeight + "%";
innerImageStyle = "height: "+vHeightInPercents+"; width: 1px;";
scrollStyle = "width: "+C_adjustUnits((m_infoIVSCROLL.scrlSize + 1))+"; height:100%;";
innerImageId = "VSCROLL_IMG_"+vid;
scrollId = "VSCROLL_"+vid;
}
else
{
var vWidth=0;
if (casacontrol.CASA_iv.childNodes[0]!=undefined)
{
if (rotation==90 || rotation==270)
{
vWidth = Math.round(zoomFact*100*imageHeight/casacontrol.CASA_iv.childNodes[0].width);
}
else
{
vWidth = Math.round(zoomFact*100*imageWidth/casacontrol.CASA_iv.childNodes[0].width);
}
}
if (isNaN(vWidth)) vWidth = 0;
if (vWidth < 0) vWidth = 0;
var vWidthInPercents = vWidth + "%";
innerImageStyle = "width: "+vWidthInPercents+"; height: 1px;";
scrollStyle = "height: "+C_adjustUnits((m_infoIVSCROLL.scrlSize + 1))+ "; width:100%;";
innerImageId = "HSCROLL_IMG_"+vid;
scrollId = "HSCROLL_"+vid;
}
var scrollBar = parent.document.getElementById(scrollId);
if(scrollBar == null)
{
var vih = [];
if (vertical)
vih.push("<div id='"+scrollId+"' style='overflow-y: "+casacontrol.CASA_scroll+"; left: auto; "+scrollStyle+" outline-color: invert; outline-style: none; outline-width: medium; right: -1px;' tabindex='-1' onmouseout='mozMouseOut"+vid+"(event);' onscroll='mozDragReact"+vid+"(event);'>");
else
vih.push("<div id='"+scrollId+"' style='overflow-x: "+casacontrol.CASA_scroll+"; top: auto; "+scrollStyle+" outline-color: invert; outline-style: none; outline-width: medium; bottom: -1px;' tabindex='-1' onmouseout='mozMouseOut"+vid+"(event);' onscroll='mozDragReact"+vid+"(event);'>");
vih.push("	<img id='"+innerImageId+"' style='"+innerImageStyle+"; visibility: hidden; display: block; outline-color: invert; outline-style: none; outline-width: thin;' tabindex='-1' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>");
vih.push("</div>");
casacontrol.innerHTML = vih.join("");
if (vertical)
casacontrol.style.height="100%";
scrollBar = parent.document.getElementById(scrollId);
}
var scrollBarImg = parent.document.getElementById(innerImageId);
if(vertical)
{
var scrollHeight = casacontrol.scrollHeight;
if (scrollHeight > 1)
casacontrol.style.height = C_adjustUnits (scrollHeight);
var scrollBarImg = parent.document.getElementById(innerImageId);
scrollBarImg.style.height = C_adjustUnits(vHeightInPercents);
var scrollTop = 0;
if(vMaxYIndex != 0)
{
if (rotation==90 || rotation==270)
{
scrollTop = scrollBar.scrollHeight-scrollBar.offsetHeight - Math.round(vLeftIndex / vMaxXIndex  * (scrollBar.scrollHeight-scrollBar.offsetHeight));
}
else
{
scrollTop = Math.round(vTopIndex / vMaxYIndex  * (scrollBar.scrollHeight-scrollBar.offsetHeight));
}
}
if(scrollBar != null &&  casacontrol.lastChild.scrollTop != scrollTop)
casacontrol.lastChild.scrollTop = scrollTop;
}
else
{
scrollBarImg.style.width = C_adjustUnits(vWidthInPercents);
var scrollLeft = 0;
if (rotation==90 || rotation==270)
{
scrollLeft = scrollBar.scrollWidth-scrollBar.offsetWidth-Math.round(vTopIndex / vMaxYIndex  * (scrollBar.scrollWidth-scrollBar.offsetWidth));
}
else
{
scrollLeft = Math.round(vLeftIndex / vMaxXIndex  * (scrollBar.scrollWidth-scrollBar.offsetWidth));
}
if(scrollBar != null &&  casacontrol.lastChild.scrollLeft != scrollLeft)
casacontrol.lastChild.scrollLeft = scrollLeft;
}
if (innerdiv != null && innerdiv.style.height != '50%') innerdiv.style.height = '50%';
}
function initIVScrollInfo()
{
if(m_infoIVSCROLL != null) return;
var	w = 0, w1 = 0;
try
{
var d = document.createElement('div');
var p = document.createElement('p');
p.style.height = '200px';
p.style.width = '100%';
d.style.position = 'absolute';
d.style.visibility ='hidden';
d.style.top = '0';
d.style.left = '0';
d.style.height = '150px';
d.style.width = '200px';
d.style.overflow = 'hidden';
d.appendChild(p);
document.body.appendChild(d);
w = p.offsetWidth;
d.style.overflow = 'scroll';
w1 = p.offsetWidth;
if (w == w1) w1 = d.clientWidth;
document.body.removeChild(d);
}
catch(ex){}
m_infoIVSCROLL = new Object();
m_infoIVSCROLL.scrlSize = w-w1;
if(m_infoIVSCROLL.scrlSize <= 0) m_infoIVSCROLL.scrlSize = 16;
}
function reactOnKeyDownIVSCROLLBAR(casacontrol,innerdiv,evt)
{
if(evt != null && (!(evt>=33) && (evt.keyCode <=40)))
{
evt.stopPropagation();
}
}
