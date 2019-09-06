function addVersionInfoBM_FORMCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_FORMCONTROLS');
}
function iccBM_FORMAREA(cc,romumethod,visibleprop,invisiblemode,legendprop)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_visibleprop = visibleprop;
registerPropertyListener(romumethod,cc.CASA_visibleprop,cc.id);
cc.CASA_invisiblemode = invisiblemode;
cc.CASA_legendprop = legendprop;
registerPropertyListener(romumethod,cc.CASA_legendprop,cc.id);
addMLSpan(cc.childNodes[1].childNodes[1]);
}
function iccBM_FORMGROUP(cc,romumethod,visibleprop,invisiblemode)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_visibleprop = visibleprop;
registerPropertyListener(romumethod,cc.CASA_visibleprop,cc.id);
cc.CASA_invisiblemode = invisiblemode;
}
function handleVisibility(cc,div)
{
if ( cc.CASA_visibleprop == null || CL().isEditorPreview()) return;
var vv = getPropertyValue(cc.CASA_visibleprop);
if (vv == "true")  {
div.style.display="";
div.style.visibility="";
if (cc.CASA_invisiblemode == "colinvisible") {
div.parentNode.style.display = "";
}
}
else
{
if (cc.CASA_invisiblemode == "invisible")
{
div.style.display = "none";
div.style.visibility= "";
}
else if (cc.CASA_invisiblemode == "cleared")
{
div.style.visibility= "hidden";
div.style.display = "";
}
else if (cc.CASA_invisiblemode == "colinvisible")
{
div.parentNode.style.display = "none";
}
}
}
function romuBM_FORMAREA(cc)
{
if ((cc == null) || ((cc.CASA_visibleprop == null) && (cc.CASA_legendprop == null))) return;
handleVisibility(cc,cc.parentNode);
if ( cc.CASA_legendprop != null ) {
cc.childNodes[1].childNodes[1].innerHTML = getPropertyValue(cc.CASA_legendprop);
}
}
function romuBM_FORMGROUP(cc)
{
if ((cc == null) || (cc.CASA_visibleprop == null) ) return;
handleVisibility(cc,cc);
}
