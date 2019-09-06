function addVersionInfoBM_ICONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_ICONCONTROLS');
}
function iccBM_ICON(cc,romumethod, method,visibleprop,invisiblemode)
{
if (romumethod != null) registerListener(romumethod);
if (method != null) cc.CASA_method = method;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
}
function romuBM_ICON(cc)
{
if (cc == null) return;
if (cc.CASA_visibleprop == null || CL().isEditorPreview()) return;
var vv = getPropertyValue(cc.CASA_visibleprop);
var div = cc.parentNode;
if (vv == "true")
{
cc.disabled = false;
cc.style.display="";
cc.style.visibility="";
if (cc.CASA_invisiblemode == "colinvisible") {
cc.parentNode.style.display = "";
}
}
else
{
if (cc.CASA_invisiblemode == "invisible")
{
cc.style.display = "none";
cc.style.visibility= "";
}
else if (cc.CASA_invisiblemode == "cleared")
{
cc.style.visibility= "hidden";
cc.style.display = "";
}
else if (cc.CASA_invisiblemode == "disabled")
{
cc.disabled = true;
cc.style.display = "";
cc.style.visibility= "";
}
else if (cc.CASA_invisiblemode == "colinvisible")
{
cc.parentNode.style.display = "none";
}
}
}
function reactBM_ICON(evt)
{
transferModelBM_ICON(evt.currentTarget);
}
function transferModelBM_ICON(cc)
{
if (checkIO() == false) return;
if (CL().isEditorPreview())return;
if (cc.CASA_method != null) invokeMethodInModel(cc.CASA_method);
}
