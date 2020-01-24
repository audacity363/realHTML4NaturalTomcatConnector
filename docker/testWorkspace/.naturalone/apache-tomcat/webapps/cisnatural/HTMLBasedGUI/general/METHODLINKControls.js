function addVersionInfoMETHODLINKCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('METHODLINKCONTROLS');
}
function flexCreateControlMETHODLINK(params)
{
var vtd = parent.createElement("TD");
if (params["width"] != null) vtd.style.width = params["width"];
if (params["colspan"] != null) vtd.colSpan = params["colspan"];
if (params["rowspan"] != null) vtd.rowSpan = params["rowspan"];
if (params["valign"] != null) vtd.vAlign = params["valign"];
if (params["align"] != null) vtd.align = params["align"];
if (params["nowrap"] != null) vtd.noWrap = params["nowrap"];
var vid = "MLINK"+params["CONTROLID"];
var vc = parent.createElement("DIV");
vc.id = vid;
if (params["linkclass"] == null) vc.className = "METHODLINKLink"; else vc.className = params["linkclass"];
if (params["name"] != null) vc.innerHTML = params["name"];
if (params["nowrap"] != null) { vc.noWrap = params["nowrap"]; vc.style.overflow = "hidden"; vc.style.whiteSpace = "nowrap";}
if (params["titlepropp"] != null) vc.CASA_titleprop = params["titlepropp"];
if (params["linkstatuspropp"] != null) vc.CASA_linkstatusprop = params["linkstatuspropp"];
if (params["straighttext"] != null) vc.CASA_straighttext = params["straighttext"];
vtd.appendChild(vc);
parent[vid] = vc;
var e = "evt";
vc.onclick = parent.createFunction("callMethodLink"+vid,"evt","C.callMethodLinkMETHODLINK("+vid+",'"+params['methodd']+"',"+e+");");
if (params["valuepropp"] != null)
{
vc.CASA_valueprop = params["valuepropp"];
var vromu = parent.createFunction("romu"+vid,"model","C.romuMETHODLINK("+vid+");");
registerListener(vromu);
}
if (params["oncontextmenumethodd"] != null)
vc.oncontextmenu = parent.createFunction("rocm"+vid,"evt","C.callMethodLinkMETHODLINK("+vid+",'"+params['oncontextmenumethodd']+"',"+e+");");
var result = new Object();
result.cell = vtd;
result.control = vc;
return result;
}
function flexRemoveMETHODLINK(vid)
{
parent[vid] = undefined;
parent["romu"+vid] = undefined;
parent["callMethodLink"+vid] = undefined;
parent["rocm"+vid] = undefined;
removeListener(vid);
}
function iccMETHODLINK(cc, valueprop,titleprop,linkstatusprop,method,straighttext)
{
if (valueprop != null) cc.CASA_valueprop = valueprop; else cc.CASA_valueprop = "null";
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (method != null) cc.CASA_method = method;
if (linkstatusprop != null) cc.CASA_linkstatusprop = linkstatusprop;
if (straighttext == "true") cc.CASA_straighttext = true;
}
function callMethodLinkMETHODLINK(cc, methodName,eve)
{
if (checkIO() == false) return;
if (cc.CASA_linkStatus == "DISPLAY")
{
if (eve.stopPropagation) eve.stopPropagation();
return false;
}
if (cc.CASA_method != null) methodName = cc.CASA_method;
setContextMenuXYPAGE(eve.clientX+10,eve.clientY+10);
invokeMethodInModel(methodName);
}
function romuMETHODLINK(cc)
{
if (cc.CASA_valueprop != "null")
{
var vText = getPropertyValue(cc.CASA_valueprop);
if (vText == null) vText = "";
if (cc.CASA_bufferedtext == undefined ||
cc.CASA_bufferedtext != vText )
{
if (cc.CASA_straighttext == true)
cc.textContent = vText;
else
cc.innerHTML = vText;
cc.CASA_bufferedtext = vText;
}
}
if ( cc.CASA_titleprop != null )
{
var vTitle = getPropertyValue(cc.CASA_titleprop);
if ( cc.CASA_bufferedtitle != vTitle )
{
if (vTitle != null) cc.title = vTitle;
else cc.title = "";
cc.CASA_bufferedtitle = vTitle;
}
}
if (cc.CASA_linkstatusprop != null)
{
var v = getPropertyValue(cc.CASA_linkstatusprop);
if (v == null || v == "") v = "EDIT";
if (v == cc.CASA_linkStatus) return;
cc.CASA_linkStatus = v;
if (v == "DISPLAY")
{
cc.style.cursor = "default";
cc.style.textDecoration = "none";
cc.style.fontWeight = "normal";
}
else if (v == "EDIT" || v == "VISITED")
{
cc.style.cursor = "pointer";
cc.style.textDecoration = "underline";
cc.style.fontWeight = "normal";
}
else if (v == "UNVISITED")
{
cc.style.cursor = "pointer";
cc.style.textDecoration = "underline";
cc.style.fontWeight = "bold";
}
}
}
