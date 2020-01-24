function addVersionInfoBM_PANELCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_PANELCONTROLS');
}
function iccBM_PANEL(cc,romumethod,visibleprop,invisiblemode,foldedprop)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_visibleprop = visibleprop;
cc.CASA_invisiblemode = invisiblemode;
cc.CASA_foldedprop = foldedprop;
registerPropertyListener(romumethod,cc.CASA_visibleprop,cc.id);
registerPropertyListener(romumethod,cc.CASA_foldedprop,cc.id);
if ( cc.CASA_foldedprop != null ) {
parent.$("#PANEL"+cc.id).on("show.bs.collapse",
function () { setPropertyValue(cc.CASA_foldedprop, "false"); updateModelListenersS(); }	);
parent.$("#PANEL"+cc.id).on("hide.bs.collapse",
function () { setPropertyValue(cc.CASA_foldedprop, "true");updateModelListenersS(); });
}
}
function romuBM_PANEL(cc)
{
if ((cc == null) || ((cc.CASA_visibleprop == null) && (cc.CASA_foldedprop == null))) return;
if ( cc.CASA_visibleprop != null && (! CL().isEditorPreview() ) ) {
var vv = getPropertyValue(cc.CASA_visibleprop);
if (vv == "true")  {
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
else if (cc.CASA_invisiblemode == "colinvisible")
{
cc.parentNode.style.display = "none";
}
}
}
if ( cc.CASA_foldedprop != null ) {
var val = getPropertyValue(cc.CASA_foldedprop);
if (val == "true")  {
parent.$("#PANEL"+cc.id).collapse("hide");
}
else {
parent.$("#PANEL"+cc.id).collapse("show");
}
}
}
function iccBM_PANELHEADER(cc,romumethod,nameprop)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_nameprop = nameprop;
addMLSpan(cc);
}
function romuBM_PANELHEADER(cc)
{
if (cc == null) return;
if (cc.CASA_nameprop != null)
{
var v = getPropertyValue(cc.CASA_nameprop);
if (v == null) v = "";
cc.innerHTML = v;
}
}
