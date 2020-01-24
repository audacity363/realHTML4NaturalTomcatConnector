function addVersionInfoSCROLLCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SCROLLCONTROLS');
}
function iccVSCROLLBAR(cc,innderdiv,romumethod,id,
topindexprop,maxindexprop,rowcountprop,indexchange,vscroll,param1prop)
{
cc.CASA_bufferedtopindex = undefined;
cc.CASA_bufferedmaxindex = undefined;
cc.CASA_bufferedindexchange = undefined;
cc.CASA_lastscrolltop = undefined;
cc.CASA_keepquiet = undefined;
cc.CASA_id = id;
if(cc.id == "")
cc.id = "VSCROLLDIV_"+id;
cc.CASA_topindexprop = topindexprop;
cc.CASA_maxindexprop = maxindexprop;
cc.CASA_rowcountprop = rowcountprop;
cc.CASA_param1prop = param1prop;
cc.CASA_indexchange = indexchange;
cc.CASA_vscroll = vscroll;
cc.CASA_scrollFactor = 0;
cc.CASA_buffItemsOcc = 0;
cc.CASA_romuMethod = romumethod;
registerListenerforSCROLLBAR(romumethod);
if (cc.parentNode.id=="") cc.parentNode.id="VSCROLLTD_" + id;
cc.parentNode.CASA_SCROLL_VID = "VSCROLL_" + id;
cc.parentNode.CASA_SCROLL_OUTERDIV = "IDO_" + id;
addMozDiv(cc.parentNode);
}
function initCasaControlHSCROLLBAR(casacontrol,innderdiv)
{
casacontrol.CASA_bufferedtopindex = undefined;
casacontrol.CASA_bufferedmaxindex = undefined;
casacontrol.CASA_bufferedindexchange = undefined;
casacontrol.CASA_lastscrolltop = undefined;
casacontrol.CASA_keepquiet = undefined;
}
function reactOnModelUpdateVSCROLLBAR(casacontrol,innerdiv)
{
reactOnModelUpdateSCROLLBAR(casacontrol,innerdiv,true);
}
function reactOnModelUpdateHSCROLLBAR(casacontrol,innerdiv)
{
reactOnModelUpdateSCROLLBAR(casacontrol,innerdiv,false);
}
var m_mozDragCCSCROLL = null;
var m_mozDragCTSCROLL = null;
var m_mozDragTimerSCROLL = null;
var m_infoSCROLL = null;
function clearTimoutMozDragSCROLL()
{
if(m_mozDragTimerSCROLL != null)
{
window.clearTimeout(m_mozDragTimerSCROLL);
m_mozDragCCSCROLL = null;
m_mozDragCTSCROLL = null;
m_mozDragTimerSCROLL = null;
}
}
function mozDragReactVSCROLLBAR(cc, mozmovemethod, evt)
{
if (evt.type == "scroll")
{
clearTimoutMozDragSCROLL();
m_mozDragCCSCROLL = cc;
m_mozDragCTSCROLL = evt.currentTarget;
m_mozDragTimerSCROLL = window.setTimeout("mozROSVSCROLLBARTimer()", 50);
return;
}
}
function mozROSVSCROLLBARTimer()
{
var vCC = m_mozDragCCSCROLL;
var vCT = m_mozDragCTSCROLL;
clearTimoutMozDragSCROLL();
mozReactOnScrollVSCROLLBAR(vCC,vCT);
}
function mozReactOnScrollVSCROLLBAR(cc,vCurrentTarget)
{
if(cc.CASA_scrollFactor == 0)
calculateFactorforSCROLLBAR(cc);
var factor = cc.CASA_scrollFactor;
if(0 == factor)
return;
var topIndex = getPropertyValue(cc.CASA_topindexprop);
var scrollBar = vCurrentTarget;
var tempTopScroll = scrollBar.scrollTop;
var maxIndex = getPropertyValue(cc.CASA_maxindexprop);
var rowCount = getPropertyValue(cc.CASA_rowcountprop);
var newVal = Math.round(tempTopScroll/scrollBar.scrollHeight*maxIndex);
if(isNaN(newVal)) newVal = 0;
var currItemsOcc = newVal*(-1)*(-1) + rowCount*(-1)*(-1);
if(cc.CASA_buffItemsOcc == maxIndex &&
currItemsOcc == cc.CASA_buffItemsOcc)
{
return;
}
cc.CASA_buffItemsOcc = currItemsOcc;
if (newVal <= 0)
newVal = 0;
else if (newVal >= maxIndex-rowCount)
newVal = maxIndex-rowCount;
if (newVal == topIndex)
{
return;
}
setPropertyValue(cc.CASA_topindexprop,newVal);
submitTEXTGRID(cc);
}
function calculateFactorforSCROLLBAR(casacontrol)
{
var vid = casacontrol.CASA_id;
var idDOM = null;
var factor =0;
try
{
if(vid < 10000)
{
idDOM = parent.document.getElementById("DIV"+vid);
if(idDOM != null && idDOM.childNodes[1] != null && idDOM.childNodes[1].rows[1]!= null)
{
for ( var i = 1; i < idDOM.childNodes[1].rows.length; i++ )
{
factor = idDOM.childNodes[1].rows[i].clientHeight;
if ( factor > 0 ) break;
}
presetRR_TABLEAREA(idDOM);
if(idDOM.CASA_repeatedRows > 1)
{
for(var i=1;i<idDOM.CASA_repeatedRows;i++)
{
if(idDOM.childNodes[1].rows[1+i] != null)
factor += idDOM.childNodes[1].rows[1+i].clientHeight;
}
}
}
else
if(idDOM != null && idDOM.childNodes[1] != null)
{
factor = idDOM.childNodes[1].clientHeight;
presetRR_TABLEAREA(idDOM);
if(idDOM.CASA_repeatedRows > 1)
{
for(var i=1;i<idDOM.CASA_repeatedRows;i++)
{
if(idDOM.childNodes[1] != null)
factor += idDOM.childNodes[1].clientHeight;
}
}
}
}
else
{
idDOM = parent.document.getElementById("TEXTGRID"+(vid-10000));
if(idDOM != null && idDOM.firstChild != null && idDOM.firstChild.rows[1] != null)
factor = idDOM.firstChild.rows[1].clientHeight;
}
}
catch (eexxccee){}
casacontrol.CASA_scrollFactor = factor;
}
function reactOnModelUpdateSCROLLBAR(casacontrol,innerdiv,vertical)
{
var vTopIndex = getPropertyValue(casacontrol.CASA_topindexprop)*(-1)*(-1);
var vMaxIndex = getPropertyValue(casacontrol.CASA_maxindexprop)*(-1)*(-1);
var vIndexChange = getPropertyValue(casacontrol.CASA_rowcountprop)*(-1)*(-1);
if (vIndexChange == null || vIndexChange == 0)
vIndexChange = getPropertyValue(casacontrol.CASA_indexchange)*(-1)*(-1);
else
casacontrol.CASA_indexchange = vIndexChange;
if(vertical)
{
if(casacontrol.CASA_scrollFactor == 0)
{
calculateFactorforSCROLLBAR(casacontrol);
}
}
if (vertical && casacontrol.CASA_vscroll == "hidden")
return;
initScrollInfo();
if(innerdiv != null) innerdiv.style.display = 'none';
var vid = casacontrol.CASA_id;
var innerImageStyle = "";
var scrollStyle = "";
var scrollId="";
var innerImageId = "";
if(vertical)
{
var vHeight = Math.round(vMaxIndex/vIndexChange*100);
if (isNaN(vHeight)) vHeight = 0;
if (!isFinite(vHeight)) vHeight = 100;
if (vHeight < 0) vHeight = 0;
var vHeightInPercents = vHeight + "%";
innerImageStyle = "height: "+vHeightInPercents+"; width: 1px;";
scrollStyle = "width: "+C_adjustUnits((m_infoSCROLL.scrlSize + 1))+"; height:100%;";
innerImageId = "VSCROLL_IMG_"+vid;
scrollId = "VSCROLL_"+vid;
}
else
{
var vWidth = Math.round(vMaxIndex * 100);
if (vWidth < 0) vWidth = 0;
innerImageStyle = "width: "+C_adjustUnits(vWidth)+"; height: 1px;";
scrollStyle = "height: "+C_adjustUnits((m_infoSCROLL.scrlSize + 1))+"; width:100%;";
innerImageId = "HSCROLL_IMG_"+vid;
scrollId = "HSCROLL_"+vid;
}
var scrollBar = parent.document.getElementById(scrollId);
if((scrollBar == null && (vIndexChange < vMaxIndex)) || !vertical)
{
if(vertical)
casacontrol.style.width = C_adjustUnits((m_infoSCROLL.scrlSize + 1));
else
casacontrol.style.height = C_adjustUnits((m_infoSCROLL.scrlSize + 1));
var vih = [];
vih.push("<div id='"+scrollId+"' style='overflow-y: "+casacontrol.CASA_vscroll+"; left: auto; "+scrollStyle+" outline-color: invert; outline-style: none; outline-width: medium; right: -1px;' tabindex='-1'  onscroll='mozDragReact"+vid+"(event);'>");
vih.push("	<img id='"+innerImageId+"' style='"+innerImageStyle+"; visibility: hidden; display: block; outline-color: invert; outline-style: none; outline-width: thin;' tabindex='-1' src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='>");
vih.push("</div>");
casacontrol.innerHTML = vih.join("");
casacontrol.style.height="100%";
scrollBar = parent.document.getElementById(scrollId);
}
if(scrollBar != null && vertical)
{
var scrollHeight = casacontrol.scrollHeight;
if (scrollHeight > 1)
casacontrol.style.height = C_adjustUnits (scrollHeight);
var scrollBarImg = parent.document.getElementById(innerImageId);
scrollBarImg.style.height = C_adjustUnits(vHeightInPercents);
var scrollTop = 0;
if(vMaxIndex != 0)
scrollTop = Math.round(vTopIndex / vMaxIndex  * scrollBar.scrollHeight);
if(scrollBar != null &&  casacontrol.lastChild.scrollTop != scrollTop)
{
casacontrol.lastChild.scrollTop = scrollTop;
casacontrol.CASA_scrollTop = casacontrol.lastChild.scrollTop;
}
}
else
{
casacontrol.lastChild.scrollTop = (vTopIndex * casacontrol.CASA_scrollFactor);
}
if((scrollBar != null && vMaxIndex <= vIndexChange))
{
if(vertical)
casacontrol.style.width = "";
else
casacontrol.style.height = "";
var vih = [];
vih.push("<div id='ID_"+scrollId+"' style='width:1px;height:10%'>");
vih.push("<a name='PC'>");
vih.push("</a>");
vih.push("</div>");
casacontrol.innerHTML = vih.join("");
casacontrol.style.height="100%";
scrollBar = parent.document.getElementById(scrollId);
}
if (innerdiv != null && innerdiv.style.height != '50%') innerdiv.style.height = '50%';
return;
}
function initScrollInfo()
{
if(m_infoSCROLL != null && m_infoSCROLL.scrlSize > 0) return;
var	w = 0, w1 = 0;
try
{
var d = parent.document.createElement('div');
var p = parent.document.createElement('p');
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
parent.document.body.appendChild(d);
w = p.offsetWidth;
d.style.overflow = 'scroll';
w1 = p.offsetWidth;
if (w == w1) w1 = d.clientWidth;
parent.document.body.removeChild(d);
}
catch(ex){}
m_infoSCROLL = new Object();
m_infoSCROLL.scrlSize = w-w1;
}
function setScrollTopSCROLL(vTopIndex, vMaxIndex, vId)
{
var cc = parent.document.getElementById(vId);
if(cc == null) return;
var vNewScrollTop = Math.round(vTopIndex / (vMaxIndex - 1) * cc.scrollHeight);
if (vNewScrollTop != cc.scrollTop) cc.scrollTop = vNewScrollTop;
cc.CASA_lastscrolltop = cc.scrollTop;
}
function setScrollLeftSCROLL(newScrollLeft, vId)
{
var cc = parent.document.getElementById(vId);
if(cc == null) return;
cc.scrollLeft = newScrollLeft;
}
var m_scrollCounterVSCROLLBAR = 0;
var m_casacontrolVSCROLLBAR;
var m_innerdivVSCROLLBAR;
function reactOnScrollVSCROLLBAR(casacontrol,innerdiv)
{
return;
}
function reactOnScrollHSCROLLBAR(casacontrol,innerdiv)
{
return;
}
function reactOnScrollSCROLLBAR(casacontrol,innerdiv)
{
m_scrollCounterVSCROLLBAR++;
m_casacontrolVSCROLLBAR = casacontrol;
m_innerdivVSCROLLBAR = innerdiv;
}
function reactOnMouseUpVSCROLLBAR(casacontrol,innerdiv)
{
reactOnScrollVSCROLLBARReal(casacontrol,innerdiv);
}
function reactOnMouseUpHSCROLLBAR(casacontrol,innerdiv)
{
reactOnScrollHSCROLLBARReal(casacontrol,innerdiv);
}
function reactOnScrollVSCROLLBARTimeOut(scrollCounter)
{
if (scrollCounter == m_scrollCounterVSCROLLBAR)
{
reactOnScrollVSCROLLBARReal(m_casacontrolVSCROLLBAR,m_innerdivVSCROLLBAR);
m_scrollCounterVSCROLLBAR = 0;
}
}
function reactOnScrollHSCROLLBARTimeOut(scrollCounter)
{
if (scrollCounter == m_scrollCounterVSCROLLBAR)
{
reactOnScrollHSCROLLBARReal(m_casacontrolVSCROLLBAR,m_innerdivVSCROLLBAR);
m_scrollCounterVSCROLLBAR = 0;
}
}
function reactOnScrollVSCROLLBARReal(casacontrol,innerdiv)
{
reactOnScrollSCROLLBARReal(casacontrol,innerdiv,true);
}
function reactOnScrollHSCROLLBARReal(casacontrol,innerdiv)
{
reactOnScrollSCROLLBARReal(casacontrol,innerdiv,false,false);
}
function reactOnScrollSCROLLBARReal(casacontrol,innerdiv,vertical)
{
if (casacontrol.CASA_keepquiet == true)
{
casacontrol.CASA_keepquiet = false;
return;
}
if (vertical == true &&
casacontrol.CASA_lastscrolltop != null &&
casacontrol.CASA_lastscrolltop == casacontrol.scrollTop)
{
if ( casacontrol.CASA_lastscrolltop != 0)
return true;
}
if (vertical == false &&
casacontrol.CASA_lastscrollleft != null &&
casacontrol.CASA_lastscrollleft == casacontrol.scrollLeft)
{
return true;
}
casacontrol.CASA_lastscrollpixeldif = casacontrol.scrollTop-casacontrol.CASA_lastscrolltop;
casacontrol.CASA_lastscrolltop = casacontrol.scrollTop;
casacontrol.CASA_lastscrollleft = casacontrol.scrollLeft;
var vMaxIndex = getPropertyValue(casacontrol.CASA_maxindexprop);
var vTopIndex;
if (vertical == true)
vTopIndex = Math.round(casacontrol.scrollTop/casacontrol.scrollHeight*vMaxIndex);
else
vTopIndex = Math.round(casacontrol.scrollLeft/casacontrol.scrollWidth*vMaxIndex);
if (vTopIndex == casacontrol.CASA_bufferedtopindex)
{
if (casacontrol.CASA_lastscrollpixeldif > 10)
{
vTopIndex++;
if (vTopIndex >= (vMaxIndex-1)) vTopIndex = vMaxIndex-1;
}
else if (casacontrol.CASA_lastscrollpixeldif < -10)
{
vTopIndex--;
if (vTopIndex < 0) vTopIndex = 0;
}
}
if (vTopIndex == casacontrol.CASA_bufferedtopindex)
{
return true;
}
if (casacontrol.CASA_withsliderfreeze == true)
casacontrol.CASA_withsliderfreezePosition = casacontrol.scrollTop;
setPropertyValue(casacontrol.CASA_topindexprop,vTopIndex);
casacontrol.CASA_bufferedtopindex = vTopIndex;
submitTEXTGRID(casacontrol);
}
function submitTEXTGRID(cc)
{
var flush = true;
if (cc.CASA_onloadbehaviour == "collection") flush = false;
if (cc.CASA_onloadbehaviour == "collectionorblock" && getPropertyValue(cc.CASA_param1prop) == "true") flush = false;
if (flush == false)
{
cc.CASA_bypasschangeindex = true;
setPropertyValue('cISContextMenuItems[0].text', null);
updateModelListeners(null);
updateModelListenersScroll(null);
return;
}
submitModel("submit");
}
function reactOnKeyDownSCROLLBAR(casacontrol,innerdiv,evt)
{
if(evt != null && (!(evt>=33) && (evt.keyCode <=40))) evt.stopPropagation();
}
function reactOnScrollPageDownVSCROLLBAR(casacontrol,innerdiv)
{
var vIndexChange = getPropertyValue(casacontrol.CASA_rowcountprop)*(-1)*(-1);
if (vIndexChange == null || vIndexChange == 0)
vIndexChange = casacontrol.CASA_indexchange * 1;
reactOnScrollDownVSCROLLBAR(casacontrol,innerdiv,vIndexChange);
}
function reactOnScrollKeyEndVSCROLLBAR(casacontrol,innerdiv)
{
if (checkIO() == false) return;
parent.m_blockIOByFlush = true;
var rc = getPropertyValue(casacontrol.CASA_rowcountprop);
var mi = getPropertyValue(casacontrol.CASA_maxindexprop);
setPropertyValue(casacontrol.CASA_topindexprop,mi-rc);
submitTEXTGRID(casacontrol);
}
function reactOnScrollKeyHomeVSCROLLBAR(casacontrol,innerdiv)
{
if (checkIO() == false) return;
parent.m_blockIOByFlush = true;
setPropertyValue(casacontrol.CASA_topindexprop,0);
submitTEXTGRID(casacontrol);
}
function reactOnScrollPageDownHSCROLLBAR(casacontrol,innerdiv)
{
var vIndexChange = getPropertyValue(casacontrol.CASA_rowcountprop)*(-1)*(-1);
if (vIndexChange == null || vIndexChange == 0)
vIndexChange = casacontrol.CASA_indexchange * 1;
reactOnScrollDownHSCROLLBAR(casacontrol,innerdiv,vIndexChange);
}
function reactOnScrollDownHSCROLLBAR(casacontrol,innerdiv,delta)
{
reactOnScrollDownVSCROLLBAR(casacontrol,innerdiv,delta);
}
function reactOnScrollDownVSCROLLBAR(casacontrol,innerdiv,delta)
{
var scrolled = true;
parent.m_blockIOByFlush = true;
if (checkIO() == false) return false;
delta = delta * 1;
var vTopIndex = getPropertyValue(casacontrol.CASA_topindexprop)*(-1)*(-1);
var vMaxIndex = getPropertyValue(casacontrol.CASA_maxindexprop)*(-1)*(-1);
var vIndexChange = getPropertyValue(casacontrol.CASA_rowcountprop);
if (vIndexChange != null && vIndexChange != 0)
vIndexChange = vIndexChange * 1;
else
vIndexChange = casacontrol.CASA_indexchange * 1;
if (vTopIndex <= vMaxIndex-vIndexChange-1-delta)
{
setPropertyValue(casacontrol.CASA_topindexprop,vTopIndex+delta);
submitTEXTGRID(casacontrol);
}
else
{
var vBetterIndex = vMaxIndex-vIndexChange;
if (vBetterIndex < 0) vBetterIndex = 0;
setPropertyValue(casacontrol.CASA_topindexprop,vBetterIndex);
submitTEXTGRID(casacontrol);
scrolled = false;
}
return scrolled;
}
function reactOnScrollPageUpHSCROLLBAR(casacontrol,innerdiv)
{
reactOnScrollPageUpVSCROLLBAR(casacontrol,innerdiv)
}
function reactOnScrollPageUpVSCROLLBAR(casacontrol,innerdiv)
{
var vIndexChange = getPropertyValue(casacontrol.CASA_rowcountprop)*(-1)*(-1);
if (vIndexChange == null || vIndexChange == 0)
vIndexChange = casacontrol.CASA_indexchange * 1;
reactOnScrollUpVSCROLLBAR(casacontrol,innerdiv,vIndexChange);
}
function reactOnScrollUpHSCROLLBAR(casacontrol,innerdiv,delta)
{
reactOnScrollUpVSCROLLBAR(casacontrol,innerdiv,delta)
}
function reactOnScrollUpVSCROLLBAR(casacontrol,innerdiv,delta)
{
var scrolled = true;
parent.m_blockIOByFlush = true;
if (checkIO() == false) return false;
var vTopIndex = getPropertyValue(casacontrol.CASA_topindexprop)*(-1)*(-1);
if (vTopIndex > delta)
{
setPropertyValue(casacontrol.CASA_topindexprop,vTopIndex-delta);
submitTEXTGRID(casacontrol);
}
else
{
setPropertyValue(casacontrol.CASA_topindexprop,0);
submitTEXTGRID(casacontrol);
scrolled = false;
}
return scrolled;
}
function reactOnModelUpdateSCROLLTOUCH(pc)
{
}
function scrollFirstSCROLLTOUCH(pc)
{
setPropertyValue(pc.CASA_topindexprop,"0");
submitModel("submit");
}
function scrollLastSCROLLTOUCH(pc)
{
navigateToTopIndexSCROLLTOUCH(pc,1000000);
}
function scrollUpSCROLLTOUCH(pc,delta)
{
}
function scrollDownSCROLLTOUCH(pc,delta)
{
}
function scrollPageUpSCROLLTOUCH(pc)
{
var vrc = getPropertyValue(pc.CASA_rowcountprop) * 1;
var vti = getPropertyValue(pc.CASA_topindexprop) * 1;
vti = vti - vrc;
navigateToTopIndexSCROLLTOUCH(pc,vti);
}
function scrollPageDownSCROLLTOUCH(pc)
{
var vrc = getPropertyValue(pc.CASA_rowcountprop) * 1;
var vti = getPropertyValue(pc.CASA_topindexprop) * 1;
vti = vti + vrc;
navigateToTopIndexSCROLLTOUCH(pc,vti);
}
function navigateToTopIndexSCROLLTOUCH(pc,vti)
{
var vrc = getPropertyValue(pc.CASA_rowcountprop) * 1;
var vmx = getPropertyValue(pc.CASA_sizeprop) * 1;
if (vti > (vmx-vrc)) vti = vmx - vrc;
if (vti < 0) vti = 0;
setPropertyValue(pc.CASA_topindexprop,vti);
submitModel("submit");
}
