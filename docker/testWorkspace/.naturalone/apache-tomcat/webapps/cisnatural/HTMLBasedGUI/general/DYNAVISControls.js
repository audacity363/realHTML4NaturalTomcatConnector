function addVersionInfoDYNAVISCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('DYNAVISCONTROLS');
}
function initCasaControlDYNAVIS(pCC)
{
pCC.CASA_memvpv = undefined;
}
function reactOnModelUpdateDYNAVIS(pCC)
{
var vpv = findVisibleValue(getPropertyValue(pCC.CASA_valueprop));
if (pCC.CASA_memvpv != undefined && pCC.CASA_memvpv == vpv)
return;
pCC.CASA_memvpv = vpv;
vpv = convertStatusToVisible(vpv,CONTROLTYPE_CONTAINER);
if (vpv == "false") pCC.style.display = "none";
else pCC.style.display = "";
if (pCC.CASA_belowtop == true)
parent.reactOnResize();
}
