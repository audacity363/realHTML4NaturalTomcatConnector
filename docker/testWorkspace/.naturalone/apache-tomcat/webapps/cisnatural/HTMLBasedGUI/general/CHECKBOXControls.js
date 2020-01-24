function addVersionInfoCHECKBOXCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CHECKBOXCONTROLS');
}
function flexCreateControlCHECKBOX(params)
{
var vwidth = params["width"];
var vid = params["CONTROLID"];
var vd = parent.createElement("TD");
vd.style.width = 0;
var vc = parent.createElement("INPUT");
vc.type = "CHECKBOX";
vc.name = "CC";
vc.id = "CB_"+vid;
vc.style.width = C_adjustUnits(vwidth);
vc.className = "CHECKBOXEdit";
parent["CCB_"+vid] = vc;
var vromu = parent.createFunction("romuCB_"+vid,"model","C.romuCHECKBOX(CCB_"+vid+");");
iccCHECKBOX(parent["CCB_"+vid],null,vromu,this["reactCHECKBOX"],params["valuepropp"],params["displayonly"],params["statuspropp"],params["flush"],params["flushmethod"],
params["helpid"],null, params["tabindex"],params["invisiblemode"],params["showifnull"],params["displaypropp"]);
vd.appendChild(vc);
var result = new Object();
result.cell = vd;
result.control = vc;
return result;
}
function flexRemoveCHECKBOX(vid)
{
parent["C"+vid] = undefined;
parent["romu"+vid] = undefined;
removePropertyListener(vid);
}
function iccCHECKBOX(cc,label,romumethod,rcbmethod,valueprop,displayonly,statusprop,flush,
flushmethod,helpid,cti,tabindex,invisiblemode,showifnull, displayprop)
{
cc.onclick = rcbmethod;
cc.onfocus = rcbmethod;
cc.onblur = rcbmethod;
cc.onkeydown = rcbmethod;
addFocusable(cc,false);
startFocusCell(cc);
cc.CASA_valueprop = valueprop;
registerPropertyListener(romumethod,valueprop,cc.id);
registerStatusPropertyListener(romumethod,statusprop,cc.id,cc);
registerPropertyListener(romumethod,displayprop ,cc.id);
if (label != null) cc.CASA_label = label;
if (displayonly != null) cc.CASA_displayonly = displayonly;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (helpid != null) cc.CASA_helpid = helpid;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (showifnull != null) cc.CASA_showifnull = showifnull;
if (displayprop != null) cc.CASA_displayprop = displayprop;
cc.CASA_memvalue = undefined;
cc.CASA_memstatus = undefined;
applyCasaTabIndex(cc, "CHECKBOX");
}
function initCasaControlCHECKBOX(cc)
{
cc.CASA_memvalue = undefined;
cc.CASA_memstatus = undefined;
}
function romuCHECKBOX(cc)
{
if (cc == null) return;
var v;
var vStatus;
v = getPropertyValue(cc.CASA_valueprop);
if (cc.CASA_statusprop != null)
vStatus = getPropertyValue(cc.CASA_statusprop);
if (cc.CASA_displayprop != null)
{
var vDisplay = getPropertyValue(cc.CASA_displayprop);
vStatus = applyDisplayProperty(vDisplay, vStatus);
}
if (cc.CASA_memvalue != undefined &&
cc.CASA_memvalue == v &&
cc.CASA_memstatus == vStatus)
{
return;
}
cc.CASA_memvalue = v;
cc.CASA_memstatus = vStatus;
applyCasaTabIndex(cc, "CHECKBOX");
if (v == null)
{
if (cc.CASA_showifnull == "false") cc.style.display = "none";
cc.disabled = true;
if (cc.className != "CHECKBOXNull") cc.className = "CHECKBOXNull";
if (cc.CASA_label != null && cc.CASA_label.className != "CHECKBOXNull") cc.CASA_label.className = "CHECKBOXNull";
cc.checked = "";
return;
}
if (cc.CASA_showifnull == "false") cc.style.display = "";
if (v == "true" || v == true)
v = "checked";
else
v = "";
cc.checked = v;
if (cc.CASA_displayonly == "true")
{
cc.disabled = true;
if (cc.className != "CHECKBOXEdit") cc.className = "CHECKBOXEdit";
if (cc.CASA_label != null && cc.CASA_label.className != "CHECKBOXNull") cc.CASA_label.className = "CHECKBOXNull";
}
else
{
var vcss = "CHECKBOXEdit";
var textcss = "CHECKBOXEdit";
cc.disabled = false;
if (vStatus != null)
{
try { cc.CASA_td.style.display = ""; } catch(exc) {}
if (vStatus == "INVISIBLE")
{
cc.disabled = true;
vcss = "CHECKBOXInvisible";
textcss = "CHECKBOXInvisible";
if (cc.CASA_invisiblemode == "cleared")
{
try
{
var vwidth = cc.offsetWidth;
if (cc.CASA_hdist != null)
vwidth += cc.CASA_hdist.offsetWidth;
if (cc.CASA_label != null)
vwidth += cc.CASA_label.offsetWidth;
if (vwidth == 0)
{
cc.CASA_memstatus = undefined;
registerSwitchToDisplayListener(romuCHECKBOX, cc);
return;
}
cc.CASA_td.width = vwidth;
if (cc.CASA_table != null) cc.CASA_table.width = vwidth;
}
catch (eexxcc) {}
}
else
{
if(cc.CASA_td != null) cc.CASA_td.style.display = "none";
}
}
else if (vStatus == "DISPLAY") { cc.disabled = true; vcss = "CHECKBOXNull"; textcss = "CHECKBOXNull"; }
else if (vStatus == "EDIT" || vStatus == "FOCUS" || vStatus == "FOCUS_NO_SELECT") { cc.disabled = false; }
else if (vStatus == "ERROR" || vStatus == "ERROR_NO_FOCUS") { cc.disabled = false; vcss = "CHECKBOXError"; textcss = "CHECKBOXError"; }
else if (vStatus == "ERROR_DISPLAY") { cc.disabled = true; vcss = "CHECKBOXError"; textcss = "CHECKBOXError"; }
else cc.disabled = false;
if (vStatus == "ERROR" || vStatus == "FOCUS" || vStatus == "FOCUS_NO_SELECT")
addFocusRequestor(cc);
}
if (cc.className != vcss) cc.className = vcss;
if (cc.CASA_label != null && cc.CASA_label.className != textcss) cc.CASA_label.className = textcss;
}
}
function reactCHECKBOX(evt)
{
return reactCHECKBOXInternal(evt.currentTarget,evt);
}
function reactCHECKBOXInternal(cc,evt)
{
if (CL() == null) return;
if (evt.type == "click") return reactOnClickedCHECKBOX(cc,evt);
else if (evt.type == "focus") return reactOnFocusCHECKBOX(cc);
else if (evt.type == "blur") return reactOnBlurCHECKBOX(cc);
else if (evt.type == "keydown")
{
if (evt.keyCode == 112)
{
CL().cancelEvent(evt);
return reactOnHelpCHECKBOX(cc,evt);
}
}
}
function reactOnBlurCHECKBOX(cc)
{
CL().C_unregFocusInfo(cc);
return true;
}
function reactOnFocusCHECKBOX(cc)
{
CL().C_regFocusInfo(cc);
return true;
}
function reactOnClickedCHECKBOX(cc,evt)
{
if (isSafari())
cc.focus();
if (checkIOForNoSubmits() == false)
{
CL().cancelEvent(evt);
return false;
}
if (cc.disabled == true)
{
parent.event.returnValue = false;
return false;
}
var srcElm = findSrcElement(evt);
if (srcElm != undefined &&
srcElm.id != undefined &&
srcElm.id.substring(0,3) != "CB_")
{
var v = cc.checked;
if (v == "true" || v == true || v == "checked")
v = "";
else
v = "checked";
cc.checked = v;
try { cc.focus(); } catch (excc) {}
}
setPropertyValue(cc.CASA_valueprop,""+cc.checked);
cc.CASA_memvalue = cc.checked;
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
return true;
}
function reactOnHelpCHECKBOX(cc,evt)
{
if (checkIOForNoSubmits() == false) return;
if (cc.CASA_helpid != undefined)
{
var vHelpId = cc.CASA_helpid;
if (cc.CASA_helpid == "$valueprop$")
vHelpId = cc.CASA_valueprop;
setPropertyValue("param2",vHelpId);
invokeMethodInModel("reactOnHelpRequestForHelpId");
}
evt.returnValue = false;
}
