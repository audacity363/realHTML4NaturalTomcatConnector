function addVersionInfoSTRCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('STRCONTROLS');
}
function iccSTR(cc,valueprop,rowstyle,showifempty,onclickmethod,ondblclickmethod,
reactmethod,selectorcontrol,proprefprop, backgroundcolorprop,contextmenumethod,strstyleprop,alwaysonclick)
{
cc.CASA_mem = "inittini";
cc.CASA_isSTR = true;
if (valueprop != null) cc.CASA_valueprop = valueprop;
if (rowstyle != null) cc.CASA_rowStyle = rowstyle;
if (showifempty != null) cc.CASA_showifempty = showifempty;
if (onclickmethod != null) cc.CASA_onclickmethod = onclickmethod;
if (ondblclickmethod != null) cc.CASA_ondblclickmethod = ondblclickmethod;
if (selectorcontrol != null) cc.CASA_selectorcontrol = selectorcontrol;
if (onclickmethod != null) cc.onmouseup = reactmethod;
if (ondblclickmethod != null) cc.ondblclick = reactmethod;
if (proprefprop != null) cc.CASA_proprefprop = proprefprop;
if (strstyleprop != null) cc.CASA_strstyleprop = strstyleprop;
if (alwaysonclick != null ) cc.CASA_alwaysonclick = alwaysonclick;
cc.CASA_backgroundcolorprop = backgroundcolorprop;
if (contextmenumethod != null)
{
cc.CASA_contextmenumethod = contextmenumethod;
cc.oncontextmenu = reactmethod;
}
}
function romuSTR(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
var bc = getPropertyValue(cc.CASA_backgroundcolorprop);
var st = getPropertyValue(cc.CASA_strstyleprop);
var s = v+"/"+bc+"/"+st;
if (cc.CASA_mem == s) return;
cc.CASA_mem = s;
cc.disabled = false;
if(cc.CASA_strstyleprop != null )
{
if (st == null ) st = "";
cc.style.cssText = st;
}
cc.style.display = '';
if (v == 'true' || v == true) cc.className = 'STRRowSelected';
else if (v == 'false' || v == false) cc.className = cc.CASA_rowStyle;
else if (v == null) { cc.disabled = true; cc.className = 'STRRowNull'; if(cc.CASA_showifempty == 'false') cc.style.display = 'none'; }
if(cc.CASA_backgroundcolorprop != null && cc.style.display != 'none')
{
if (bc == null || bc == "")
bc = "transparent";
cc.style.backgroundColor = bc;
}
}
function reactSTR(evt){
return reactSTRInternal(evt);
}
function reactSTRInternal(evt)
{
if      (evt.type == "mouseup") return reactOnClickSTR(evt);
else if (evt.type == "dblclick") return reactOnDblClickSTR(evt);
else if (evt.type == "contextmenu") return reactOnCMSTR(evt);
}
var m_timeoutCCSTR = null;
var m_timeoutSourceElementSTR = null;
function reactOnClickSTR(evt)
{
if (evt.ctrlKey == true || evt.shiftKey == true)
return;
if (evt.button == 2)
return;
var cc=evt.currentTarget;
if (cc.CASA_selectorcontrol != null)
cc.CASA_selectorcontrol.CASA_canceleventstartdate = (new Date()).getTime();
m_timeoutCCSTR = cc;
m_timeoutSourceElementSTR = findSrcElement(evt);
setTimeout("reactOnClickExecuteSTR()",200);
}
function reactOnClickExecuteSTR()
{
if (m_timeoutCCSTR == null)
return;
var onClickMethod = m_timeoutCCSTR.CASA_onclickmethod;
if(m_timeoutCCSTR.CASA_alwaysonclick != "true"  && m_timeoutSourceElementSTR!=null &&
(m_timeoutSourceElementSTR.tagName == "INPUT"  || m_timeoutSourceElementSTR.tagName == "SELECT" ||
m_timeoutSourceElementSTR.tagName == "BUTTON" || m_timeoutSourceElementSTR.tagName == "IMG"    || m_timeoutSourceElementSTR.tagName == "A"))
onClickMethod = null;
invokeMethodSTR(m_timeoutCCSTR, m_timeoutSourceElementSTR, onClickMethod);
}
function reactOnDblClickSTR(evt)
{
m_timeoutCCSTR = null;
invokeMethodSTR(evt.currentTarget, findSrcElement(evt), evt.currentTarget.CASA_ondblclickmethod);
}
function reactOnCMSTR(evt)
{
m_timeoutCCSTR = null;
setContextMenuXYPAGE(evt.clientX,evt.clientY);
invokeMethodSTR(evt.currentTarget, findSrcElement(evt), evt.currentTarget.CASA_contextmenumethod);
}
var m_failedCheckIO = 0;
function invokeMethodSTR(cc,srcElm,methodname)
{
if (cc.CASA_selectorcontrol != null)
{
var o = new Object();
o.shiftKey = false;
o.ctrlKey = false;
reactOnClickSELECTOR(cc.CASA_selectorcontrol,o);
}
if (srcElm != null && cc.CASA_proprefprop != null)
{
var v = srcElm.CASA_valueprop;
if (v == null)
v = srcElm.CASA_method;
if (v != null)
{
if (v.lastIndexOf(".") > 0)
v = v.substring(v.lastIndexOf(".")+1, v.length);
setPropertyValue(cc.CASA_proprefprop, v);
}
}
m_failedCheckIO = 0;
if ( methodname != null || cc.CASA_selectorcontrol != null )
invokeMethodSTRContinue(methodname);
}
function invokeMethodSTRContinue(methodname)
{
if ( checkIOForNoSubmits() == false)
setTimeout("doInvokeMethodSTR(\""+methodname+"\")",500);
else
{
if ( methodname != null && methodname!= "null") invokeMethodInModel(methodname);
else submitModel();
}
}
function doInvokeMethodSTR(methodname)
{
m_failedCheckIO = m_failedCheckIO + 1;
if ( m_failedCheckIO > 5) return;
invokeMethodSTRContinue(methodname);
}
function isVisibleSTR(cc)
{
if (cc.CASA_isSTR != true) return true;
if (cc.CASA_showifempty != 'false') return true;
var v = getPropertyValue(cc.CASA_valueprop);
if (v == null) return false;
return true;
}
