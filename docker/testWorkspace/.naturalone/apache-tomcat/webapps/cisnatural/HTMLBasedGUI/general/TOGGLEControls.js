function addVersionInfoTOGGLECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TOGGLECONTROLS');
}
function flexCreateControlTOGGLE(params)
{
var vid = params["CONTROLID"];
var vd = parent.createElement("TD");
vd.style.width = 0;
if (params["rowspan"] != null) vd.rowspan = params["rowspan"];
if (params["colspan"] != null) vd.rowspan = params["colspan"];
var bgclass = "TOGGLECell";
if (params["backgroundclass"] != null) bgclass = params["backgroundclass"];
vd.className = bgclass;
var valign = "middle";
if (params["valign"] != null) valign = params["valign"];
vd.valign = valign;
var align = "center";
if (params["align"] != null) align = params["align"];
vd.align = align;
var vc = parent.createElement("SPAN");
vc.id = "TOGGLE"+vid;
if (params["title"] != null) vc.title = params["title"];
parent["C_"+vid] = vc;
var vromu = parent.createFunction("romuTOGGLE"+vid,"model","C.romuTOGGLE(C_"+vid+");");
iccTOGGLE(vc,vromu,vid,params["valuepropp"],params["trueimage"],params["falseimage"],params["partialimage"],
params["shiftmethod"],params["controlmethod"],params["flush"],params["flushmethod"],params["width"],params["height"],null,params["tabindex"],params["valuepropp"],params["testtoolid"],params["stylevariant"]);
vd.appendChild(vc);
var result = new Object();
result.cell = vd;
result.control = vc;
return result;
}
function flexRemoveTOGGLE(vid)
{
var id = null;
if (id != null) parent["C_"+id] = undefined;
removeListener(parent["romuTOGGLE"+vid]);
parent["romuTOGGLE"+vid] = undefined;
}
function iccTOGGLE(cc,romumethod,id,valueprop,trueimage,falseimage,partialimage,
shiftmethod,controlmethod,flush,flushmethod,width,height,cti,tabindex,statusprop,
testtoolid,stylevariant)
{
initCasaControl(cc);
if (id != null) cc.CASA_id = id;
if (valueprop != null) cc.CASA_valueprop = valueprop;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (trueimage != null) cc.CASA_trueimage = trueimage;
if (falseimage != null) cc.CASA_falseimage = falseimage;
if (partialimage != null) cc.CASA_partialimage = partialimage;
if (shiftmethod != null) cc.CASA_shiftmethod = shiftmethod;
if (controlmethod != null) cc.CASA_controlmethod = controlmethod;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (width != null) cc.CASA_width = width;
if (height != null) cc.CASA_height = height;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (testtoolid != null) cc.CASA_testtoolid = testtoolid;
if (stylevariant != null) cc.CASA_stylevariant = stylevariant;
cc.CASA_bufferedvalue = 'inittini'
cc.CASA_reactmethod = function(event){ reactTOGGLE(event,cc); }
registerListener(romumethod);
}
function romuTOGGLE(cc)
{
if (cc == null) return;
var v = getPropertyValue(cc.CASA_valueprop);
var vStatus = getPropertyValue(cc.CASA_statusprop);
if (v == cc.CASA_bufferedvalue &&
cc.CASA_memstatus == vStatus)
return;
cc.CASA_bufferedvalue = v;
cc.CASA_memstatus = vStatus;
var vi = "../HTMLBasedGUI/general/nothing.gif";
if (v == "true") vi = cc.CASA_trueimage;
if (v == "false") vi = cc.CASA_falseimage;
if (v == "") vi = cc.CASA_partialimage;
if (cc.CASA_stylevariant != null)
{
var li = vi.lastIndexOf(".");
if (li > 0)
vi = vi.substring(0, li)+cc.CASA_stylevariant+vi.substring(li, vi.length);
}
var si = "";
if (cc.CASA_width != null) si = "width='"+C_adjustUnits(cc.CASA_width)+"'";
if (cc.CASA_height != null) si += " height='"+C_adjustUnits(cc.CASA_height)+"'";
var ttid = "";
if (cc.CASA_testtoolid != null)
ttid = getTesttoolidHtml()+"='"+cc.CASA_testtoolid+"'"
var wt = "<img border='0' src='"+vi+"' "+si+" style='cursor:pointer;vertical-align:middle'>";
if (v != null)
wt = "<a id='TOGLLEAAA"+cc.CASA_id+"' "+ttid+">" + wt + "</a>";
cc.innerHTML = wt;
var a = parent.gebid("TOGLLEAAA"+cc.CASA_id);
if (a != null)
{
a.onclick = cc.CASA_reactmethod;
a.CASA_cti = cc.CASA_cti;
a.CASA_tabindex = cc.CASA_tabindex;
a.CASA_valueprop = cc.CASA_valueprop;
applyCasaTabIndex(a, "TOGGLE");
}
if (cc.CASA_statusprop != null)
{
if (vStatus == "INVISIBLE") cc.style.display = "none";
else
{
cc.style.display = "";
cc.disabled = false;
var vcss = "TOGGLECell";
if (vStatus == "DISPLAY") { cc.disabled = true; }
else if (vStatus == "ERROR" || vStatus == "ERROR_NO_FOCUS") { vcss = "TOGGLECellError";  }
else if (vStatus == "ERROR_DISPLAY") { cc.disabled = true; vcss = "TOGGLECellError"; }
if (vStatus == "ERROR" || vStatus == "FOCUS" || vStatus == "FOCUS_NO_SELECT") { if (a != null) addFocusRequestor(a);}
if (cc.className != vcss) cc.className = vcss;
}
}
}
function reactTOGGLE(evt,ccc)
{
return reactTOGGLEInternal(evt,ccc);
}
function reactTOGGLEInternal(evt,ccc)
{
if (evt.type == "click")
{
var cc = evt.currentTarget;
if ( ccc != null ) cc = ccc;
if (cc.disabled) return;
if (cc.CASA_shiftmethod == null && cc.CASA_controlmethod == null)
{
if (evt.shiftKey == true || evt.ctrlKey == true) { return false;}
}
else if (cc.CASA_shiftmethod != null && cc.CASA_controlmethod == null)
{
if (evt.shiftKey == true) { transferShiftClickTOGGLE(cc); return false; }
if (evt.ctrlKey == true) { return false; }
}
else if (cc.CASA_shiftmethod == null && cc.CASA_controlmethod != null)
{
if (evt.shiftKey == true) { return false; };
if (evt.ctrlKey == true)  { transferControlClickTOGGLE(cc); return false; }
}
else
{
if (evt.shiftKey == true) { transferShiftClickTOGGLE(cc); return false; }
if (evt.ctrlKey == true) { transferControlClickTOGGLE(cc); return false; }
}
transferChangeTOGGLE(cc);
}
}
function transferChangeTOGGLE(cc)
{
if (checkIOForNoSubmits() == false)
return;
toggleValueTOGGLE(cc);
if (cc.CASA_flush == "server" || cc.CASA_flushmethod != null)
{
setPropertyValue("param1",cc.CASA_valueprop);
m_displayOccupied = false;
if(cc.CASA_flushmethod != null)
invokeMethodInModel(cc.CASA_flushmethod);
else
submitModel("submit");
}
else if (cc.CASA_flush == "screen")
updateModelListenersS();
}
function transferShiftClickTOGGLE(cc)
{
if (checkIOForNoSubmits() == false)
return;
toggleValueTOGGLE(cc);
invokeMethodInModel(cc.CASA_shiftmethod);
}
function transferControlClickTOGGLE(cc)
{
if (checkIOForNoSubmits() == false)
return;
toggleValueTOGGLE(cc);
invokeMethodInModel(cc.CASA_controlmethod);
}
function toggleValueTOGGLE(cc)
{
if (cc.CASA_bufferedvalue == "true")
setPropertyValue(cc.CASA_valueprop,"false");
else
setPropertyValue(cc.CASA_valueprop,"true");
romuTOGGLE(cc);
}
