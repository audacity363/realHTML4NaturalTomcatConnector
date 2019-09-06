function addVersionInfoCOMBOCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('COMBOCONTROLS');
}
function iccCOMBOFIX(cc,romumethod,rcmethod,valueprop,displayonly,statusprop,flush,flushmethod,helpid,cti,tabindex,invisiblemode,
displayprop,datatype)
{
cc.onchange = rcmethod;
cc.onfocus = rcmethod;
cc.onblur = rcmethod;
cc.onkeydown = rcmethod;
cc.CASA_invisiblemode = invisiblemode;
addFocusable(cc,true);
startFocusCell(cc);
cc.CASA_valueprop = valueprop;
registerListener(romumethod);
if (displayonly != null) cc.CASA_displayonly = displayonly;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (displayprop != null) cc.CASA_displayprop = displayprop;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (helpid != null) cc.CASA_helpid = helpid;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (datatype != null) cc.CASA_datatype = datatype;
cc.CASA_memvalue = undefined;
cc.CASA_memstatus = undefined;
vOpts = cc.childNodes;
for (var i=0; i<vOpts.length; i++)
addMLOption(vOpts[i]);
if ( cc.CASA_datatype != null && cc.CASA_datatype == "float" )
{
for(var i=0;i<cc.options.length;i++)
{
cc.options[i].value = "" + parseFloat(cc.options[i].value);
}
}
applyCasaTabIndex(cc, "COMBO");
}
function romuCOMBOFIX(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
if ( cc.CASA_datatype != null && cc.CASA_datatype == "float" )
v = "" + parseFloat(v);
var vs;
if (cc.CASA_displayonly == "true") vs = "DISPLAY";
else if (cc.CASA_statusprop != null)
{
vs = getPropertyValue(cc.CASA_statusprop);
}
var vt = "";
if (cc.CASA_titleprop != null) vt = getPropertyValue(cc.CASA_titleprop);
if (vt == null) vt = "";
if (cc.CASA_displayprop != null)
{
var vd = getPropertyValue(cc.CASA_displayprop);
vs = applyDisplayProperty(vd, vs);
}
if (vs == null || vs == "")
vs = "EDIT";
if (v == null)
{
v = "";
vs = "DISPLAY";
}
if (vs == "ERROR" || vs == "FOCUS" || vs == "FOCUS_NO_SELECT") addFocusRequestor(cc);
if (v == cc.CASA_memvalue && vs == cc.CASA_memstatus && vt == cc.CASA_memtitle)
{
return;
}
cc.CASA_memvalue = v;
cc.CASA_memstatus = vs;
cc.CASA_memtitle = vt;
applyCasaTabIndex(cc, "COMBO");
var vMultiSelection = (cc.CASA_allowmultiselection=="true");
if(vMultiSelection)
{
cc.CASA_memvalue = cc.value;
}
else
{
cc.value = v;
if (cc.value != v) cc.selectedIndex = -1;
if ( cc.selectedIndex == -1){
cc.selectedIndex = 0;
cc.selectedIndex = -1;
}
if (v != cc.value)
{
var vOption = new Option(v,v,false);
var vind = cc.options.length;
cc.options[vind] = vOption;
cc.value = v;
}
}
if (vs == "EDIT" || vs == "FOCUS" || vs == "FOCUS_NO_SELECT")
{
if (cc.className != "COMBOFIXSelectEdit") cc.className = "COMBOFIXSelectEdit";
cc.disabled = false;
}
else if (vs == "ERROR" || vs == "ERROR_NO_FOCUS")
{
if (cc.className != "COMBOFIXSelectError") cc.className = "COMBOFIXSelectError";
cc.disabled = false;
}
else if (vs == "ERROR_DISPLAY")
{
if (cc.className != "COMBOFIXSelectError") cc.className = "COMBOFIXSelectError";
cc.disabled = true;
}
else if (vs == "DISPLAY")
{
if (cc.className != "COMBOFIXSelectDisplay") cc.className = "COMBOFIXSelectDisplay";
cc.disabled = true;
}
else if (vs == "INVISIBLE")
{
if (cc.className != "COMBOFIXSelectInvisible") cc.className = "COMBOFIXSelectInvisible";
cc.disabled = true;
}
if (vs == "INVISIBLE" && (cc.CASA_invisiblemode == "invisible"  || cc.CASA_invisiblemode == null))
cc.parentNode.style.display = "none";
else
cc.parentNode.style.display = "";
if (cc.CASA_titleprop != null) cc.title = vt;
}
function reactCOMBOFIX(evt)
{
return reactCOMBOFIXInternal(evt);
}
function reactCOMBOFIXInternal(evt)
{
if(CL() == null) return;
if      (evt.type == "change") return valueChangedCOMBOFIX(evt.currentTarget);
else if (evt.type == "focus") return reactOnFocusCOMBOFIX(evt.currentTarget);
else if (evt.type == "blur") return reactOnBlurCOMBOFIX(evt.currentTarget);
else if (evt.type == "keydown")
{
if(evt.keyCode == 112)
{
CL().cancelEvent(evt);
return reactOnHelpCOMBOFIX(evt.currentTarget);
}
}
}
function valueChangedCOMBOFIX(cc)
{
if (checkIOForNoSubmits() == false)
{
var vTemp = getPropertyValue(cc.CASA_valueprop);
if ( cc.CASA_datatype != null && cc.CASA_datatype == "float" )
vTemp = "" + parseFloat(vTemp);
cc.value = vTemp;
return;
}
var vMultiSelection = (cc.CASA_allowmultiselection=="true");
if(vMultiSelection)
{
cc.CASA_memvalue = null;
for(var i=0;i<cc.options.length;i++)
{
var vSelectionProp = cc.CASA_optarrayprop + "[" + i +"].selected";
var vIsSelected = (cc.options[i].selected == true);
setPropertyValue(vSelectionProp, vIsSelected);
if(vIsSelected && cc.CASA_memvalue == null)
cc.CASA_memvalue = cc.options[i].value;
}
}
else
{
cc.CASA_memvalue = cc.value;
setPropertyValue(cc.CASA_valueprop,cc.value);
}
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
function reactOnHelpCOMBOFIX(cc)
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
}
function reactOnFocusCOMBOFIX(cc)
{
CL().C_regFocusInfo(cc);
return true;
}
function reactOnBlurCOMBOFIX(cc)
{
CL().C_unregFocusInfo(cc);
return true;
}
function flexCreateControlCOMBODYN(params)
{
var vwidth = params["width"];
var vsize = "1";
if (params["size"] != null) vsize = params["size"];
var vid = params["CONTROLID"];
var vd = parent.createElement("TD");
vd.style.width = 0;
var vc = parent.createElement("SELECT");
if(params["allowmultiselection"] == "true")
vc.multiple = true;
vc.name = "CC";
vc.id = "CDYN_"+vid;
vc.size = vsize;
vc.style.width = C_adjustUnits(vwidth);
vc.className = "COMBODYNSelectEdit";
if (params["displayonly"] == "true") vc.disabled = true;
parent["CCDYN_"+vid] = vc;
var vromu = parent.createFunction("romuCDYN_"+vid,"model","C.romuCOMBODYN(CCDYN_"+vid+");");
iccCOMBODYN(parent["CCDYN_"+vid],vromu,this["reactCOMBODYN"],params["valuepropp"],params["optarraypropp"],params["opttextpropp"],
params["optidpropp"],params["statuspropp"],params["displayonly"],params["flush"],params["flushmethodd"],params["helpid"],
params["changeindexpropp"],null,null,params["invisiblemode"],params["titlepropp"],
params["allowmultiselection"], params["displaypropp"],params["datatype"]);
vd.appendChild(vc);
var result = new Object();
result.cell = vd;
result.control = vc;
return result;
}
function flexRemoveCOMBODYN(vid)
{
removeListener(parent["romu"+vid]);
parent["romu"+vid] = undefined;
parent["C"+vid] = undefined;
}
function iccCOMBODYN(cc,romumethod,rcmethod,valueprop,optarrayprop,opttextprop,
optidprop,statusprop,displayonly,flush,flushmethod,helpid,
changeindexprop,cti,tabindex,invisiblemode,titleprop,
allowmultiselection, displayprop,datatype)
{
cc.onchange = rcmethod;
cc.onfocus = rcmethod;
cc.onblur = rcmethod;
cc.onmousewheel = rcmethod;
cc.onkeydown = rcmethod;
addFocusable(cc,true);
startFocusCell(cc);
cc.CASA_valueprop = valueprop;
cc.CASA_invisiblemode = invisiblemode;
registerListener(romumethod);
if (allowmultiselection != null) cc.CASA_allowmultiselection = allowmultiselection;
if (optarrayprop != null) cc.CASA_optarrayprop = optarrayprop;
if (opttextprop != null) cc.CASA_opttextprop = opttextprop;
if (optidprop != null) cc.CASA_optidprop = optidprop;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (displayprop != null) cc.CASA_displayprop = displayprop;
if (displayonly != null) cc.CASA_displayonly = displayonly;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (helpid != null) cc.CASA_helpid = helpid;
if (changeindexprop != null) cc.CASA_changeindexprop= changeindexprop;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (datatype != null) cc.CASA_datatype = datatype;
cc.CASA_memvalue = undefined;
cc.CASA_memstatus = undefined;
cc.CASA_memchangeindex = undefined;
applyCasaTabIndex(cc, "COMBO");
}
function romuCOMBODYN(cc)
{
if (cc == null) return;
var vRefreshOptions = true;
if (cc.CASA_changeindexprop != null)
{
var vChangeIndex = getPropertyValue(cc.CASA_changeindexprop);
if (vChangeIndex != null &&
vChangeIndex != cc.CASA_memchangeindex)
{
cc.CASA_memchangeindex = vChangeIndex;
vRefreshOptions = true;
}
else
vRefreshOptions = false;
}
if (vRefreshOptions == true)
{
var vNowOptions = cc.options;
var vNowOptionsLength = vNowOptions.length;
var i;
for (i=0; i<vNowOptionsLength; i++)
cc.remove(0);
var vMultiSelection = (cc.CASA_allowmultiselection=="true");
var vIndex = 0;
while (true)
{
var vArray = cc.CASA_optarrayprop + "[" + vIndex +"].";
var vName = getPropertyValue(vArray + cc.CASA_opttextprop);
var vId = getPropertyValue(vArray + cc.CASA_optidprop);
if ( cc.CASA_datatype != null && cc.CASA_datatype == "float" )
vId = "" + parseFloat(vId);
var vSelectedVal = false;
if ((vMultiSelection) && (getPropertyValue(vArray + "selected") == "true"))
vSelectedVal = true;
if (vName == null || vId == null)
{
if (isSafari() && vIndex==0){
var vOption = new Option("","",false, false);
cc.options[vIndex] = vOption;
}
break;
}
var vOption = new Option(vName,vId,vSelectedVal, vSelectedVal);
cc.options[vIndex] = vOption;
vIndex++;
}
}
if (vRefreshOptions == true)
cc.CASA_memvalue = "inittini";
romuCOMBOFIX(cc);
}
function reactCOMBODYN(evt)
{
return reactCOMBODYNInternal(evt);
}
function reactCOMBODYNInternal(evt)
{
if(CL() == null) return;
if      (evt.type == "change") return valueChangedCOMBODYN(evt.currentTarget);
else if (evt.type == "focus") return reactOnFocusCOMBODYN(evt.currentTarget);
else if (evt.type == "blur") return reactOnBlurCOMBODYN(evt.currentTarget);
else if (evt.type == "keydown")
{
if( evt.keyCode == 112)
{
CL().cancelEvent(evt);
return reactOnHelpCOMBODYN(evt);
}
}
else if (evt.type == "mousewheel")
{
CL().cancelEvent(evt);
return true;
}
}
function reactOnFocusCOMBODYN(cc)
{
return reactOnFocusCOMBOFIX(cc);
}
function reactOnBlurCOMBODYN(cc)
{
return reactOnBlurCOMBOFIX(cc);
}
function valueChangedCOMBODYN(cc)
{
valueChangedCOMBOFIX(cc);
}
function reactOnHelpCOMBODYN(evt)
{
reactOnHelpCOMBOFIX(evt);
}
