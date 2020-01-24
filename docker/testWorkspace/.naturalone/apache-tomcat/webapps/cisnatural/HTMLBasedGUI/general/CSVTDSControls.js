function addVersionInfoCSVTDSCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CSVTDSCONTROLS');
}
function iccCSVTDS(pid,pvaluesprop,pbgcolorsprop)
{
var cc = parent[pid];
if (parent[pid] == null)
parent[pid] = parent.document.getElementById(pid);
cc.CASA_valuesprop = pvaluesprop;
cc.CASA_bgcolorsprop = pbgcolorsprop;
cc.CASA_buffer = "inittini";
registerListener(parent["romu"+pid]);
}
function romuCSVTDS(cc)
{
var values = getPropertyValue(cc.CASA_valuesprop);
var colors = getPropertyValue(cc.CASA_bgcolorsprop);
var newBuffer = values + "/" + colors;
if (cc.CASA_buffer == newBuffer) return;
cc.CASA_buffer = newBuffer;
var vs = decodeCSVString(values);
var bgs = decodeCSVString(colors);
var vtr = cc.parentNode;
var useExisting = true;
if (cc.CASA_csvtds == null)
cc.CASA_csvtds = [];
if (cc.CASA_csvtds.length != vs.length)
{
for (var i=0; i<cc.CASA_csvtds.length; i++)
vtr.removeChild(cc.CASA_csvtds[i]);
cc.CASA_csvtds = [];
useExisting = false;
}
for (var i=0; i<vs.length; i++)
{
if (useExisting == false)
{
var vtd = parent.document.createElement("TD");
vtd.innerHTML = vs[i];
vtd.className = "LABELCellPlainText";
if (bgs.length > i) vtd.style.backgroundColor = bgs[i];
vtr.insertBefore(vtd,cc);
cc.CASA_csvtds.push(vtd);
}
else
{
var vtd = cc.CASA_csvtds[i];
vtd.innerHTML = vs[i];
vtd.className = "LABELCellPlainText";
if (bgs.length > i) vtd.style.backgroundColor = bgs[i];
}
}
}
