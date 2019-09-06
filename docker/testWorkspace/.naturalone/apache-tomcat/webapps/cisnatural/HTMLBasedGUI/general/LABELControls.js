function addVersionInfoLABELCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('LABELCONTROLS');
}
function flexCreateControlLABEL(params)
{
var vwidth = params["width"];
var vid = params["CONTROLID"];
var vclass = "LABELCellNormal";
if (params["asheadline"] == "true") vclass = "LABELCellHeadline";
if (params["asplaintext"] == "true") vclass = "LABELCellPlainText";
if (params["stylevariant"] != null) vclass = "LABELCell"+params["stylevariant"];
var vtd = parent.createElement("TD");
vtd.style.width = 0;
if (params["width"] == "100%") vtd.style.width ="100%";
vtd.className = vclass;
if (params["colspan"] != null) vtd.colSpan = params["colspan"];
if (params["rowspan"] != null) vtd.rowSpan = params["rowspan"];
if (params["valign"] != null) vtd.vAlign = params["valign"];
if (params["align"] != null) vtd.align = params["align"];
if (params["background-color"] != null) vtd.style.backgroundColor = params["background-color"];
if (params["title"] != null) vtd.title = params["title"];
var vdiv = parent.createElement("DIV");
vdiv.id = "CF_"+vid;
vdiv.style.width = C_adjustUnits(vwidth);
if (params["cuttext"] == "true" || params["nowrap"] == "true") vdiv.style.whiteSpace = "nowrap";
if (params["textalign"] != null) vdiv.style.textAlign = params["textalign"];
var name = "&nbsp;";
if (params["name"] != null) name = params["name"];
hotKeyCode = findHotkeyKeycode(name);
if (hotKeyCode != null)
{
var rohk = parent.createFunction("rohk"+vid,"param","C.rohkLABEL(CF_"+vid+");");
addControlBasedHotKey(vdiv.id,hotKeyCode,rohk);
name = convertDoubleTildeToUTag(name);
}
vdiv.innerHTML = name;
vtd.appendChild(vdiv);
var result = new Object();
result.cell = vtd;
result.control = vdiv;
return result;
}
function flexRemoveLABEL(vid)
{
removeHotKeys(vid);
}
function initCasaControlLABEL(pCC)
{
pCC.CASA_memvpv = undefined;
pCC.CASA_memnpv = undefined;
}
function reactOnModelUpdateLABEL(pCC)
{
if (pCC == null) return;
var npv = getPropertyValue(pCC.CASA_nameprop);
var vpv = getPropertyValue(pCC.CASA_visibleprop);
if ( (pCC.CASA_memnpv != undefined && pCC.CASA_memnpv == npv) &&
(pCC.CASA_memvpv != undefined && pCC.CASA_memvpv == vpv) )
return;
pCC.CASA_memnpv = npv;
pCC.CASA_memvpv = vpv;
if (pCC.CASA_memnpv != null)
pCC.textContent = pCC.CASA_memnpv;
if (vpv == "false" || vpv == "INVISIBLE")
{
pCC.CASA_div.style.display = "none";
if (pCC.className != null) pCC.CASA_memClassName = pCC.className;
pCC.className = null;
}
else
{
pCC.CASA_div.style.display = "";
if (pCC.CASA_memClassName != null) pCC.className = pCC.CASA_memClassName;
pCC.CASA_memClassName = null;
}
if ((vpv == "false" || vpv == "INVISIBLE") &&
(pCC.CASA_invisiblemode == null || pCC.CASA_invisiblemode == "invisible"))
{
pCC.style.display = "none";
}
else
{
pCC.style.display = "";
}
if (vpv == "DISPLAY")
{
pCC.CASA_div.className = "LABELDivTextDisabled";
}
else
{
pCC.CASA_div.className = "LABELDivText";
}
}
function rohkLABEL(pCC, param)
{
focusNextInput(pCC);
}
function registerOnClickLABEL(pCC, reactMethod)
{
if(reactMethod != null)
{
pCC.onclick = reactMethod;
pCC.style.cursor = "pointer";
}
}
