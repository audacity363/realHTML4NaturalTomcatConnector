function addVersionInfoTABSUBPAGESCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TABSUBPAGESCONTROLS');
}
function reactOnModelUpdateTABSUBPAGES(casacontrol,iframecontrol)
{
var vProperty = casacontrol.CASA_pagesprop;
var vCSS = getPropertyValue("style");
if(casacontrol.m_lastDir != m_direction && m_direction == 'rtl')
{
var imgLeft = parent.document.getElementById('RTSP'+casacontrol.CASA_id+'_imgleft');
if(imgLeft != null) imgLeft.src = '../HTMLBasedGUI/images/tabstripscrollleft_rtl.gif';
var imgRight = parent.document.getElementById('RTSP'+casacontrol.CASA_id+'_imgright');
if(imgRight != null) imgRight.src = '../HTMLBasedGUI/images/tabstripscrollright_rtl.gif';
}
var vChangeIndex = getPropertyValue(vProperty+".changeIndex");
if (vChangeIndex != "inittini" &&
vChangeIndex == casacontrol.CASA_memchangeindex &&
casacontrol.m_lastDir == m_direction)
return;
casacontrol.CASA_memchangeindex = vChangeIndex;
casacontrol.m_lastDir = m_direction;
var dirExt = '';
if (m_direction == 'rtl')
dirExt = 'RTL';
var vCounter = 0;
var vSelectedIndex = getPropertyValue(vProperty + ".selectedIndex");
var divString = "<table cellpadding=0 cellspacing=0 width='100%'><tr>";
while (true)
{
vName = getPropertyValue(vProperty+".items["+vCounter+"].name");
if (vName == null)
break;
vTitle = getPropertyValue(vProperty+".items["+vCounter+"].title");
if (vTitle == null)vTitle="";
var vStyle;
if (vCounter == 0)
{
if (vCounter == vSelectedIndex)
vStyle = "TABAREACellSelectedFirst"+dirExt;
else
vStyle = "TABAREACellUnselectedFirst"+dirExt;
}
else
{
if (vCounter == vSelectedIndex)
vStyle = "TABAREACellSelected"+dirExt;
else
vStyle = "TABAREACellUnselected"+dirExt;
}
if (vCounter == vSelectedIndex)
{
var vPageURL = getPropertyValue(vProperty+".items["+vCounter+"].pageURL");
vPageURL = convertCasabacURL(vPageURL);
var vPageId = getPropertyValue(vProperty+".items["+vCounter+"].pageId");
dispPageTABSUBPAGES(iframecontrol,
vPageURL,
vPageId,
parent.parent.getCurrentSessionId(),
parent.parent.getCurrentProcessId(),
casacontrol.CASA_fastbufferswitch,
casacontrol);
}
var vOnclick = "onmouseup=\"showPage"+casacontrol.CASA_id+"("+vCounter+");\"";
var vCursor = 'pointer';
var nowrap = getPropertyValue(vProperty+".items["+vCounter+"].nowrap");
if (nowrap == "true")
nowrap = "nowrap='true'";
else
nowrap = "";
var ttid = "";
if (casacontrol.CASA_testtoolid != null)
ttid = getTesttoolidHtml()+"='"+casacontrol.CASA_testtoolid+vCounter+"'";
divString += "<td tabindex='0' "+nowrap+" "+vOnclick+" class='"+vStyle+"' title='"+convertApos(vTitle)+"' style='cursor:"+vCursor+"' "+ttid+">";
divString += "&nbsp;";
divString += vName;
divString += "&nbsp;";
divString += "</td>";
vCounter++;
}
divString += "<td width='100%' class='TABAREACellRemaining'>&nbsp;</td>";
divString += "</tr></table>";
var sl = 0;
var vdiv = casacontrol.CASA_tabstripdiv;
if( vdiv != null) sl = vdiv.scrollLeft;
casacontrol.innerHTML = divString;
if( vdiv != null) vdiv.scrollLeft = sl;
}
function dispPageTABSUBPAGES(iframecontrol,
pageURL,
modelId,
sessionId,
processId,
fastbufferswitch,
cc)
{
if (cc.CASA_straightpageurl != null)
{
if (pageURL.indexOf(cc.CASA_straightpageurl)>= 0)
{
cc.CASA_RT_STRAIGHTPAGE.style.display = "";
cc.CASA_straightpageurlvisible = true;
cc.CASA_RT_IFRAME.style.display = "none";
return;
}
if (cc.CASA_straightpageurlvisible == true)
{
cc.CASA_RT_STRAIGHTPAGE.style.display = "none";
cc.CASA_straightpageurlvisible = false;
cc.CASA_RT_IFRAME.style.display = "";
}
}
if (pageURL.indexOf("/") < 0)
{
var vpurl = parent.location.href;
vpurl = vpurl.substring(0,vpurl.lastIndexOf("/"));
vpurl = vpurl.substring(vpurl.lastIndexOf("/")+1,vpurl.length);
pageURL = "../" + vpurl + "/" + pageURL;
}
try
{
if(iframecontrol.document.readyState == null)
setTimeout("showPageContinueTABSUBPAGES(\""+iframecontrol.name+"\", \""+pageURL+"\",\""+modelId+"\",\""+sessionId+"\",\""+processId+"\","+fastbufferswitch+")",200);
else
iframecontrol.showPage(pageURL,modelId,sessionId,processId,fastbufferswitch);
}
catch(exc)
{
setTimeout("showPageContinueTABSUBPAGES(\""+iframecontrol.name+"\", \""+pageURL+"\",\""+modelId+"\",\""+sessionId+"\",\""+processId+"\","+fastbufferswitch+")",200);
}
}
function showPageTABSUBPAGES(casacontrol,iframecontrol,index)
{
if (checkIO() == false) return false;
var vProperty = casacontrol.CASA_pagesprop;
var vSelectedIndex = getPropertyValue(vProperty + ".selectedIndex");
if (vSelectedIndex == index)
return;
if (checkAllValidations() == false)
return;
setPropertyValue(vProperty+".changeIndex","inittini");
setPropertyValue(vProperty+".selectedIndex",index);
if (casacontrol.CASA_triggerserver != "true")
{
if (iframecontrol.WORKAREA != null &&
iframecontrol.WORKAREA.csciframe != null)
{
iframecontrol.WORKAREA.csciframe.synchronizeAndContinue(continueTABSUBPAGES);
}
else
{
continueTABSUBPAGES();
}
}
else
{
invokeMethodInModel(vProperty+".trigger");
}
}
function continueTABSUBPAGES()
{
updateModelListeners(null);
}
function showPageContinueTABSUBPAGES(casaPageId, pageURL,modelId,sessionId,processId,fastBufferSwitch)
{
var casaPage = parent.frames[casaPageId];
if (casaPage.document.readyState != null &&
casaPage.document.readyState != "complete")
{
setTimeout("showPageContinueTABSUBPAGES(\""+casaPageId+"\",\""+pageURL+"\",\""+modelId+"\",\""+sessionId+"\",\""+processId+"\", "+fastBufferSwitch+")",200);
return;
}
if(!casaPage.showPage)
{
setTimeout("showPageContinueTABSUBPAGES(\""+casaPageId+"\",\""+pageURL+"\",\""+modelId+"\",\""+sessionId+"\",\""+processId+"\", "+fastBufferSwitch+")",200);
return;
}
casaPage.showPage(pageURL,modelId,sessionId,processId,fastBufferSwitch);
}
