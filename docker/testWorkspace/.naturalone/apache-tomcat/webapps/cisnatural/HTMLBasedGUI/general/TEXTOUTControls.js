function addVersionInfoTEXTOUTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TEXTOUTCONTROLS');
}
function flexCreateControlTEXTOUT(params)
{
var vid = params["CONTROLID"];
var vwidth = params["width"];
var vd = parent.createElement("TD");
var spanParent = vd;
vd.className = "TEXTOUTColumn";
if (vwidth != undefined) vd.style.width = C_adjustUnits(vwidth);
var nowrap = params["nowrap"];
if (nowrap != undefined) vd.noWrap = params["nowrap"];
if (nowrap == "true")
{
var dv = parent.createElement("DIV");
dv.noWrap = "true";
dv.style.width = "100%";
dv.style.overflow = "hidden";
vd.appendChild(dv);
spanParent = dv;
}
var vspan = parent.createElement("SPAN");
vspan.id = vid;
var spanClass = "TEXTOUTSpan";
if(params["stylevariant"] != null)
spanClass = "LABELCell"+params["stylevariant"];
vspan.className = spanClass;
spanParent.appendChild(vspan);
parent["S_"+vid] = vspan;
var vromu = parent.createFunction("romu"+vid,"model","C.romuTEXTOUT(S_"+vid+");");
iccTEXTOUT(vspan,vd,params["valuepropp"],params["datatype"],params["straighttext"],
params["bgcolorpropp"],params["fgcolorpropp"],params["visiblepropp"],params["invisiblemode"],params["titlepropp"],
params["decimaldigits"])
registerListener(vromu);
var result = new Object();
result.cell = vd;
result.control = vspan;
return result;
}
function flexRemoveTEXTOUT(vid)
{
parent["S_"+vid] = undefined;
parent["romu"+vid] = undefined;
removeListener("S_"+vid);
}
function iccTEXTOUT(cc,td,valueprop,datatype,straighttext,bgcolorprop,fgcolorprop,visibleprop,invisiblemode,titleprop, decimaldigits)
{
if (td != null) cc.CASA_td = td;
cc.CASA_memvalue = "inittini";
cc.CASA_valueprop = valueprop;
cc.CASA_bgcolorprop = bgcolorprop;
cc.CASA_fgcolorprop = fgcolorprop;
if (datatype == null) cc.CASA_datatype = undefined; else cc.CASA_datatype = datatype;
if (straighttext == null) cc.CASA_straighttext = undefined; else cc.CASA_straighttext = straighttext;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (decimaldigits != null) cc.CASA_decimaldigits = decimaldigits;
}
function romuTEXTOUT(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
var s = getPropertyValue(cc.CASA_visibleprop);
var t = getPropertyValue(cc.CASA_titleprop);
var decimalDigitsFloat = -1;
if (cc.CASA_decimaldigits != null)
decimalDigitsFloat = cc.CASA_decimaldigits;
if (t == null) t = "";
if (v == null) s = null;
var vbg = null;
if (cc.CASA_bgcolorprop != null) vbg = getPropertyValue(cc.CASA_bgcolorprop);
var vfg = null;
if (cc.CASA_fgcolorprop != null) vfg = getPropertyValue(cc.CASA_fgcolorprop);
var vmem = v+"/"+s+"/"+vbg+"/"+vfg+"/"+t;
if (cc.CASA_memvalue == vmem) return;
cc.CASA_memvalue = vmem;
if (cc.CASA_datatype != null)
{
if (cc.CASA_datatype == "date") v = convertYYYYMMDDIntoDisplayString(v);
else if (cc.CASA_datatype == "time") v = convertHHMMSSIntoDisplayString(v);
else if (cc.CASA_datatype == "timestamp") v = convertYYYYMMDDHHMMSSMMMIntoDisplayString(v);
else if (cc.CASA_datatype == "float") v = convertFLOATIntoDisplayString(v,decimalDigitsFloat);
else if (cc.CASA_datatype == "int" || cc.CASA_datatype == "long") v = convertINTIntoDisplayString(v);
}
if (cc.CASA_straighttext != "true")
{
if (v == null || v == "") v = "&nbsp;";
}
else
{
if (v == null || v == "") v = " ";
}
if (cc.CASA_straighttext != "true")
cc.innerHTML = v;
else
cc.textContent = v;
cc.title = t;
if (cc.CASA_td != null)
{
s = convertStatusToVisible(s);
if (s == "false")
{
var vim = cc.CASA_invisiblemode;
if (vim == undefined || vim == "invisible")
{
cc.CASA_td.style.display = "none";
}
else if (vim == "cleared")
{
cc.style.display = "none";
cc.CASA_td.style.display = "";
}
else if (vim == "disabled")
{
cc.style.display = "";
cc.CASA_td.style.display = "";
}
}
else
{
cc.style.display = "";
cc.CASA_td.style.display = "";
}
}
if (vbg != null && vfg != null)
{
if (vbg != cc.style.backgroundColor)
{
try
{
cc.style.backgroundColor = vbg;
cc.parentNode.style.backgroundColor = vbg;
}
catch (exc) {}
}
if (vfg != cc.style.color)
{
try { cc.style.color = vfg; } catch (exc) {}
}
}
else if (vbg != null)
{
if (vbg != cc.style.backgroundColor)
{
try
{
cc.style.backgroundColor = vbg;
cc.parentNode.style.backgroundColor = vbg;
if (checkIfColorIsDarkCOLORSELECTION(vbg) == true)
cc.style.color = "#FFFFFF";
else
cc.style.color = "#000000";
}
catch (exc) {}
}
}
else if  (vfg != null)
{
if (vfg != cc.style.backgroundColor)
{
try
{
cc.style.color = vfg;
var bgcolor = "";
if (checkIfColorIsDarkCOLORSELECTION(vfg) == false)
bgcolor = "#000000";
if (bgcolor != cc.style.backgroundColor)
{
cc.style.backgroundColor = bgcolor;
cc.parentNode.style.backgroundColor = bgcolor;
}
}
catch (exc) {}
}
}
}
