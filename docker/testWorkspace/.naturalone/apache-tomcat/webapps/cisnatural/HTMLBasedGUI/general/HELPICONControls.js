function addVersionInfoHELPICONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('HELPICONCONTROLS');
}
function transferModelHELPICON(casacontrol)
{
if (checkIO() == false)
return;
if (casacontrol.CASA_indexprop != null)
setPropertyValue(casacontrol.CASA_indexprop,casacontrol.CASA_indexvalue);
if (casacontrol.CASA_repeatindex != null)
setPropertyValue("repeatIndex",casacontrol.CASA_repeatindex);
else
setPropertyValue("repeatIndex",-1);
setPropertyValue("param2",casacontrol.CASA_helpid);
invokeMethodInModel("reactOnHelpRequestForHelpId");
}
function reactOnModelUpdateHELPICON(casacontrol)
{
if (casacontrol.CASA_referenceprop != null)
{
var v = getPropertyValue(casacontrol.CASA_referenceprop);
if (v != casacontrol.CASA_memreferencevalue)
{
casacontrol.CASA_memreferencevalue = v;
if (v == null) casacontrol.innerHTML = "";
else           casacontrol.innerHTML = "<a onclick='transferModel"+casacontrol.CASA_id+"();'>"+
"<img border='0' src='"+casacontrol.CASA_image+"'>"+
"</a>&nbsp;";
}
}
if (casacontrol.CASA_visibleprop != null)
{
var v = getPropertyValue(casacontrol.CASA_visibleprop);
if (v != casacontrol.CASA_memvisiblevalue)
{
casacontrol.CASA_memvisiblevalue = v;
if (v == null || v == "false") casacontrol.style.display = "none";
else                           casacontrol.style.display = "";
}
}
}
