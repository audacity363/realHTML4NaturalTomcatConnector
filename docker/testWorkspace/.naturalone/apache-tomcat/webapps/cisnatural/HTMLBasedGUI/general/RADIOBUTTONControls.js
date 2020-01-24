function addVersionInfoRADIOBUTTONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('RADIOBUTTONCONTROLS');
}
function initCasaControlRADIOBUTTON(casacontrol,rrbmethod,nameprop)
{
casacontrol.CASA_memvalue = undefined;
casacontrol.CASA_memstatus = undefined;
casacontrol.onfocus = rrbmethod;
casacontrol.onblur = rrbmethod;
casacontrol.CASA_nameprop = nameprop;
}
function reactOnModelUpdateRADIOBUTTON(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
var vStatus;
if ( cc.CASA_datatype != null && cc.CASA_datatype == "float" )
v = parseFloat(v);
if (cc.CASA_statusprop != null)
vStatus = getPropertyValue(cc.CASA_statusprop);
if (cc.CASA_displayprop != null)
{
var vDisplay = getPropertyValue(cc.CASA_displayprop);
vStatus = applyDisplayProperty(vDisplay, vStatus);
}
if (cc.CASA_nameprop != null)
{
var nameVal = getPropertyValue(cc.CASA_nameprop);
if (nameVal == null) nameVal = "";
cc.CASA_label.innerHTML = nameVal;
}
if (cc.CASA_memvalue != undefined &&
cc.CASA_memvalue == v &&
cc.CASA_memstatus == vStatus &&
cc.CASA_value != v)
{
return;
}
cc.CASA_memvalue = v;
cc.CASA_memstatus = vStatus;
applyCasaTabIndex(cc, "RADIOBUTTON");
if (v == null)
{
cc.disabled = true;
cc.checked = false;
var vcss = "RADIOBUTTONNull";
if (cc.className != vcss) cc.className = vcss;
if (cc.CASA_label != null && cc.CASA_label.className != vcss) cc.CASA_label.className = vcss;
return;
}
if (v == cc.CASA_value)
cc.checked = true;
else
cc.checked = false;
if (cc.CASA_displayonly == "true")
{
cc.disabled = true;
if (cc.className != "RADIOBUTTONEdit") cc.className = "RADIOBUTTONEdit";
if (cc.CASA_label != null && cc.CASA_label.className != "RADIOBUTTONNull") cc.CASA_label.className = "RADIOBUTTONNull";
}
else
{
cc.disabled = false;
var vcss = "RADIOBUTTONEdit";
var textcss = "RADIOBUTTONEdit";
if (vStatus != null)
{
try { cc.CASA_td.style.display = ""; } catch(exc) {}
if (vStatus == "INVISIBLE")
{
cc.disabled = true;
vcss = "RADIOBUTTONInvisible";
textcss = "RADIOBUTTONInvisible";
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
registerSwitchToDisplayListener(reactOnModelUpdateRADIOBUTTON, cc);
return;
}
cc.CASA_td.width = vwidth;
if (cc.CASA_table != null) cc.CASA_table.width = vwidth;
}
catch (eexxcc) {}
}
else
{
cc.CASA_td.style.display = "none";
}
}
else if (vStatus == "DISPLAY")                              { cc.disabled = true; textcss = "RADIOBUTTONNull"; }
else if (vStatus == "EDIT" || vStatus == "FOCUS" || vStatus == "FOCUS_NO_SELECT") { cc.disabled = false; }
else if (vStatus == "ERROR_DISPLAY")                        { cc.disabled = true; vcss = "RADIOBUTTONError"; textcss = "RADIOBUTTONError";}
else if (vStatus == "ERROR" || vStatus == "ERROR_NO_FOCUS") { cc.disabled = false; vcss = "RADIOBUTTONError"; textcss = "RADIOBUTTONError";}
else                                                        { cc.disabled = false; }
if (vStatus == "ERROR" || vStatus == "FOCUS" || vStatus == "FOCUS_NO_SELECT")
addFocusRequestor(cc);
}
if (cc.className != vcss) cc.className = vcss;
if (cc.CASA_label != null && cc.CASA_label.className != textcss) cc.CASA_label.className = textcss;
if (cc.CASA_hdist != null && cc.CASA_hdist.className != textcss) cc.CASA_hdist.className = textcss;
}
}
function reactRADIOBUTTON(cc,evt)
{
if ( CL() == null ) return;
if (evt.type == "click") return reactOnClickedRADIOBUTTON(cc,evt);
else if (evt.type == "focus") return reactOnFocusRADIOBUTTON(cc);
else if (evt.type == "blur") return reactOnBlurRADIOBUTTON(cc);
else if (evt.type == "keydown" && evt.keyCode==112) {
return reactOnHelpRADIOBUTTON(cc,evt);
}
}
function reactOnBlurRADIOBUTTON(cc)
{
CL().C_unregFocusInfo(cc);
return true;
}
function reactOnFocusRADIOBUTTON(cc)
{
CL().C_regFocusInfo(cc);
return true;
}
function reactOnClickedRADIOBUTTON(cc,evt)
{
if (isSafari())
cc.focus();
if (checkIOForNoSubmits() == false || cc.disabled == true)
{
if (parent.event != null)
parent.event.returnValue = false;
return;
}
var srcElm = findSrcElement(evt);
if (srcElm != undefined &&
srcElm.id != undefined &&
srcElm.id.substring(0,5) != "RADIO")
{
cc.checked = true;
try { cc.focus(); } catch (excc) {}
}
setPropertyValue(cc.CASA_valueprop,cc.CASA_value);
cc.CASA_memvalue = cc.CASA_value;
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
function reactOnHelpRADIOBUTTON(cc, parentevent)
{
if (parentevent.keyCode == 9)
{
return true;
}
if (checkIOForNoSubmits() == false)
{
if (parent.event != null)
parent.event.returnValue = false;
return;
}
var isHelpEvent = false;
isHelpEvent = (parentevent.type == "keydown" && parentevent.keyCode == 112 );
if (cc.CASA_helpid != undefined && isHelpEvent)
{
var vHelpId = cc.CASA_helpid;
if (cc.CASA_helpid == "$valueprop$")
vHelpId = cc.CASA_valueprop;
setPropertyValue("param2",vHelpId);
invokeMethodInModel("reactOnHelpRequestForHelpId");
}
if (parentevent.preventDefault && parentevent.stopPropagation)
{
parentevent.preventDefault();
parentevent.stopPropagation();
}
else
parentevent.returnValue = false;
}
