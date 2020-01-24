function addVersionInfoBM_LABELCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_LABELCONTROLS');
}
function iccBM_LABEL(cc,romumethod,nameprop,visibleprop,invisiblemode)
{
if (romumethod != null) registerListener(romumethod);
if (nameprop != null) {
cc.CASA_nameprop = nameprop;
registerPropertyListener(romumethod, cc.CASA_nameprop, cc.id);
}
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
addMLSpan(cc);
}
function romuBM_LABEL(cc)
{
if (cc == null) return;
if (cc.CASA_nameprop != null)
{
var v = getPropertyValue(cc.CASA_nameprop);
if (v == null) v = "";
cc.textContent = v;
}
if (cc.CASA_visibleprop != null && (!CL().isEditorPreview()))
{
var vv = getPropertyValue(cc.CASA_visibleprop);
var div = cc.parentNode;
if (vv == "true")
{
cc.disabled = false;
cc.style.display="";
cc.style.visibility="";
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
}
}
}
