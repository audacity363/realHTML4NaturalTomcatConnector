function addVersionInfoTEXTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TEXTCONTROLS');
}
function flexCreateControlTEXT(params)
{
var vid = params["CONTROLID"];
var vwidth = params["width"];
var vheight = params["height"];
var vwrap = params["wrap"];
if (vwidth == undefined) vwidth = "100";
var vd = parent.createElement("TD");
vd.style.width = C_adjustUnits(vwidth);
if (vheight != undefined) vd.style.height = C_adjustUnits(vheight);
vd.className = "TDAroundControl";
var vc = parent.createElement("TEXTAREA");
vc.id = vid;
vc.style.width = "100%";
if (vheight != undefined) vc.style.height = "99%";
if (vwrap != undefined) vc.wrap = vwrap;
vc.className = "TEXTTextArea";
vd.appendChild(vc);
parent["C_"+vid] = vc;
vc.CASA_valueprop = params["valuepropp"];
vc.CASA_statusprop = params["statuspropp"];
vc.CASA_bgcolorprop = params["bgcolorpropp"];
vc.CASA_fgcolorprop = params["fgcolorpropp"];
vc.CASA_displayprop = params["displaypropp"];
vc.CASA_titleprop = params["titlepropp"];
vc.CASA_flushmethod = params["flushmethodd"];
vc.CASA_flush = params["flush"];
vc.CASA_displayonly = params["displayonly"];
vc.CASA_maxlength = params["maxlength"];
vc.CASA_maxlengthprop = params["maxlengthpropp"];
vc.CASA_maxrowlength = params["maxrowlength"];
vc.CASA_maxrowlengthprop = params["maxrowlengthpropp"];
vc.CASA_maxrows = params["maxrows"];
vc.CASA_maxrowsprop = params["maxrowspropp"];
var func = parent.createFunction("romu"+vid,"","C.reactOnModelUpdateTEXT(C_"+vid+");");
registerListener(func);
var funcParams = "evt";
var intFuncParam = "evt";
func = parent.createFunction("rokd"+vid,funcParams,"C.reactOnKeyDownTEXT(C_"+vid+", "+intFuncParam+");");
vc.onkeydown = func;
func = parent.createFunction("rtb"+vid,funcParams, "C.reactTEXT(C_"+vid+", "+intFuncParam+");");
vc.onfocus = func;
vc.onblur = func;
func = parent.createFunction("tc"+vid,"","C.transferChangeTEXT(C_"+vid+");");
vc.onchange = func;
initCasaControlTEXT(vc);
if(vc.CASA_maxlength != null || vc.CASA_maxlengthprop != null ||vc.CASA_maxrowlength != null || vc.CASA_maxrowlengthprop != null
|| vc.CASA_maxrows!=null || vc.CASA_maxrowsprop!=null)
{
func = parent.createFunction("rokp"+vid,funcParams,"return C.rokpTEXT(C_" + vid + ","+intFuncParam+"); ");
vc.onkeypress = func;
func = parent.createFunction("rop"+vid,funcParams,"return C.ropTEXT(C_" + vid + ","+intFuncParam+");");
vc.onpaste = func;
func = parent.createFunction("roku"+vid,funcParams,"return C.rokuTEXT(C_" + vid + ","+intFuncParam+"); ");
vc.onkeyup = func;
}
var result = new Object();
result.cell = vd;
result.control = vc;
return result;
}
function flexRemoveTEXT(vid)
{
parent["C_"+vid] = undefined;
parent["romu"+vid] = undefined;
parent["rokd"+vid] = undefined;
parent["tc"+vid] = undefined;
removeListener("C_"+vid);
}
function initCasaControlTEXT(cc)
{
cc.CASA_memvalue = undefined;
cc.CASA_memstatus = undefined;
cc.CASA_memTitle = undefined;
cc.CASA_paste = false;
if(cc.CASA_maxlength != undefined)
cc.CASA_maxlength = cc.CASA_maxlength * (-1) * (-1);
if(cc.CASA_maxrowlength != undefined)
cc.CASA_maxrowlength = cc.CASA_maxrowlength * (-1) * (-1);
if(cc.CASA_maxrows != undefined)
cc.CASA_maxrows = cc.CASA_maxrows * (-1) * (-1);
addFocusable(cc,true);
applyCasaTabIndex(cc, "TEXT");
if (cc.CASA_statusprop != null)
{
registerStatusPropertyListener('reactOnModelUpdateTEXT',cc.CASA_statusprop,cc.id,cc);
}
}
function reactOnModelUpdateTEXT(cc)
{
var vValue = getPropertyValue(cc.CASA_valueprop);
var bgcolor = null;
var fgcolor = null;
var bgcolorHasError = false;
var fgcolorHasError = false;
if (cc.CASA_fgcolorprop != null)
{
fgcolor = getPropertyValue(cc.CASA_fgcolorprop);
if (fgcolor == "" ) fgcolor = null;
if (fgcolor != null)
fgcolorHasError = checkIfValueHasError(fgcolor,"color");
}
if (cc.CASA_bgcolorprop != null)
{
bgcolor = getPropertyValue(cc.CASA_bgcolorprop);
if (bgcolor == "") bgcolor = null;
if (bgcolor != null)
bgcolorHasError = checkIfValueHasError(bgcolor,"color");
}
if (bgcolor != null && bgcolorHasError == false && fgcolor != null && fgcolorHasError == false)
{
cc.style.backgroundColor = bgcolor;
cc.style.color = fgcolor;
}
else if (bgcolor != null && bgcolorHasError == false)
{
if (checkIfColorIsDarkCOLORSELECTION(bgcolor) == true)
cc.style.color = "#FFFFFF";
else
cc.style.color = "#000000";
cc.style.backgroundColor = bgcolor;
}
else if (fgcolor != null && fgcolorHasError == false)
{
if (checkIfColorIsDarkCOLORSELECTION(fgcolor) == true)
cc.style.backgroundColor = "";
else
cc.style.backgroundColor = "#000000";
cc.style.color = fgcolor;
}
var vStatus = null;
if (cc.CASA_statusprop != null)
vStatus = getPropertyValue(cc.CASA_statusprop);
if (cc.CASA_displayprop != null)
{
var vDisplay = getPropertyValue(cc.CASA_displayprop);
vStatus = applyDisplayProperty(vDisplay, vStatus);
}
var vTitle = "";
if (cc.CASA_titleprop != null) vTitle = getPropertyValue(cc.CASA_titleprop);
if (vTitle == null) vTitle = "";
if (vValue == null)
{
vValue = "";
vStatus = "DISPLAY";
}
if(cc.CASA_maxlengthprop != null) cc.CASA_maxlength = getPropertyValue(cc.CASA_maxlengthprop) * (-1) * (-1);
if(cc.CASA_maxrowlengthprop != null) cc.CASA_maxrowlength = getPropertyValue(cc.CASA_maxrowlengthprop) * (-1) * (-1);
if(cc.CASA_maxrowsprop != null) cc.CASA_maxrows = getPropertyValue(cc.CASA_maxrowsprop) * (-1) * (-1);
cc.CASA_paste = false;
if (vValue == cc.CASA_memvalue && vStatus == cc.CASA_memstatus &&
vTitle == cc.CASA_memTitle && cc.CASA_maxlength == cc.CASA_memMaxlength &&
cc.CASA_memMaxrowlength == cc.CASA_maxrowlength && cc.CASA_memMaxrows == cc.CASA_maxrows)
return;
cc.CASA_memvalue = vValue;
cc.CASA_memstatus = vStatus;
cc.CASA_memTitle = vTitle;
cc.CASA_memMaxlength = cc.CASA_maxlength;
cc.CASA_memMaxrowlength = cc.CASA_maxrowlength;
cc.CASA_memMaxrows = cc.CASA_maxrows;
cc.value = vValue;
vValue = limitToMaxLengthTEXT(cc,true);
var vClass = "TEXTTextArea";
if (vStatus == "DISPLAY") vClass = "TEXTTextAreaDISPLAY";
if (vStatus == "ERROR"  || vStatus == "ERROR_NO_FOCUS" || vStatus == "ERROR_DISPLAY") vClass = "TEXTTextAreaERROR";
if (vStatus == "INVISIBLE") vClass = "TEXTTextAreaINVISIBLE";
if (cc.CASA_displayonly == 'true')
{
vClass = "TEXTTextAreaDISPLAY";
cc.tabIndex = -1;
cc.readOnly = true;
if (cc.className != vClass) cc.className = vClass;
return;
}
if (cc.className != vClass)
{
cc.RS881_className = vClass;
var id = cc.id;
if(cc.id.substring(0, 5) == "FIELD")
id = cc.id.substring(5, cc.id.length);
setTimeout("setStyleClassTEXT(parent.C_"+id+")",20);
}
if (vStatus == "DISPLAY" || vStatus == "ERROR_DISPLAY")
{
cc.tabIndex = -1;
cc.readOnly = true;
}
else
{
applyCasaTabIndex(cc, "TEXT");
cc.readOnly = false;
}
if (cc.CASA_titleprop != null) cc.title = vTitle;
if (vStatus == "ERROR" || vStatus == "FOCUS") addFocusRequestor(cc);
if (vStatus == "FOCUS_NO_SELECT")  addActiveElementRequestor(cc);
}
function setStyleClassTEXT(cc)
{
try { cc.className = cc.RS881_className; } catch(exccc) {}
}
function transferChangeTEXT(cc, paste)
{
if ( cc.CASA_paste == true && paste != true ) return;
if (checkIOForNoSubmits() == false)
return;
cc.CASA_memvalue = limitToMaxLengthTEXT(cc,false);
setPropertyValue(cc.CASA_valueprop,cc.value);
if (checkIO() == false)
return;
if (cc.CASA_flush == "server" || cc.CASA_flushmethod != null)
{
CL().C_saveCurrFocusInfo(cc);
m_flushCC = cc;
cc.CASA_flushTimeoutId = window.setTimeout("rtaFlushTEXT()", 20);
}
else if (cc.CASA_flush == "screen")
updateModelListenersS();
}
var m_flushCC = null;
function rtaFlushTEXT()
{
if (m_flushCC != null)
{
if (m_flushCC.CASA_flushTimeoutId != null)
window.clearTimeout(m_flushCC.CASA_flushTimeoutId);
setPropertyValue("param1",m_flushCC.CASA_valueprop);
parent.m_blockIOByFlush = true;
m_displayOccupied = false;
if(m_flushCC.CASA_flushmethod != null)
invokeMethodInModel(m_flushCC.CASA_flushmethod, false, true);
else
submitModel("submit");
}
}
function reactTEXT(cc,evt)
{
if (CL() == null) return;
else if (evt.type == "focus") return reactOnFocusTEXT(cc);
else if (evt.type == "blur") return reactOnBlurTEXT(cc);
}
function reactOnBlurTEXT(cc)
{
CL().C_unregFocusInfo(cc);
if(cc.CASA_paste == true && cc.CASA_memvalue != cc.value) transferChangeTEXT(cc, true);
return true;
}
function reactOnFocusTEXT(cc)
{
CL().C_regFocusInfo(cc);
cc.CASA_paste = false;
return true;
}
function reactOnKeyDownTEXT(cc,controlevent)
{
if (cc.CASA_memstatus == "DISPLAY" ||
cc.CASA_displayonly == "true")
{
controlevent.returnValue = false;
}
if (checkIO() == false)
{
controlevent.returnValue = false;
return;
}
if (controlevent.keyCode == 13)
{
avoidProcessingForNextHotKey()
}
if (controlevent.keyCode == 112)
{
reactOnHelpTEXT(cc,controlevent);
controlevent.preventDefault();
controlevent.stopPropagation();
}
if (controlevent.keyCode == 38 || controlevent.keyCode == 40 )
{
if (controlevent.stopPropagation) controlevent.stopPropagation();
}
}
function reactOnHelpTEXT(cc,controlevent)
{
if (checkIO() == false)
return;
if (cc.CASA_helpid != undefined)
{
var vHelpId = cc.CASA_helpid;
if (cc.CASA_helpid == "$valueprop$")
vHelpId = cc.CASA_valueprop;
setPropertyValue("param2",vHelpId);
invokeMethodInModel("reactOnHelpRequestForHelpId");
if (controlevent.stopPropagation) controlevent.stopPropagation();
}
}
function rokuTEXT(cc,ccevent)
{
if (checkIO() == false)
{
ccevent.returnValue=false;
return false;
}
limitToMaxLengthTEXT(cc,false);
return true;
}
function rokpTEXT(cc,ccevent)
{
if (checkIO() == false)
{
ccevent.returnValue=false;
return false;
}
if (maxReachedTEXT(cc,ccevent))
{
ccevent.returnValue=false;
return false;
}
return true;
}
function getSelectionStart(cc)
{
var selection = getInputSelection(cc);
return selection.start;
}
function getInputSelection(cc)
{
var start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;
if (typeof cc.selectionStart == "number" && typeof cc.selectionEnd == "number")
{
start = cc.selectionStart;
end = cc.selectionEnd;
}
else
{
range = document.selection.createRange();
if (range && range.parentElement() == cc)
{
len = cc.value.length;
normalizedValue = cc.value.replace(/\r\n/g, "\n");
textInputRange = cc.createTextRange();
textInputRange.moveToBookmark(range.getBookmark());
endRange = cc.createTextRange();
endRange.collapse(false);
if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1)
{
start = end = len;
}
else
{
start = -textInputRange.moveStart("character", -len);
start += normalizedValue.slice(0, start).split("\n").length - 1;
if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1)
{
end = len;
}
else
{
end = -textInputRange.moveEnd("character", -len);
end += normalizedValue.slice(0, end).split("\n").length - 1;
}
}
}
}
return {
start: start,
end: end
};
}
function maxReachedTEXT(cc, ccevent)
{
if (ccevent.ctrlKey) return false;
if (typeof cc.selectionStart == "number" && typeof cc.selectionEnd == "number" && cc.selectionEnd - cc.selectionStart >= 1) return false;
var curLen = cc.value.length;
curLen += cc.value.split("\n").length-1;
var maxReached = cc.CASA_maxlength != null && curLen >= cc.CASA_maxlength;
if (ccevent.charCode == 0 && ccevent.keyCode != 13) maxReached = false;
if (cc.CASA_maxrowlength !=null && (ccevent.keyCode != 13 && ccevent.charCode != 0) )
{
var arr = cc.value.replace(/\r\n/g,"\n").split("\n");
var curLine = cc.value.substr(0, getSelectionStart(cc)).split("\n").length;
if(arr[curLine-1].length >= cc.CASA_maxrowlength )
maxReached=true;
}
if (cc.CASA_maxrows !=null && ccevent.keyCode == 13)
{
var linesize = cc.value.split("\n").length;
if (linesize >= cc.CASA_maxrows)
maxReached=true;
}
return maxReached
}
function limitToMaxLengthTEXT(cc,preSetValue)
{
var changed = false;
if (cc.CASA_maxrowlength !=null)
{
var arr = cc.value.replace(/\r\n/g,"\n").split("\n");
for(var i = 0; i < arr.length; i++)
{
if (arr[i].length > cc.CASA_maxrowlength)
{
changed = true;
break;
}
}
if (changed == true)
{
cc.value="";
for(var i = 0; i < arr.length; i++)
{
cc.value += arr[i].substring(0, cc.CASA_maxrowlength);
if (i+1<arr.length) cc.value += ("\n");
}
}
}
if (cc.CASA_maxrows !=null)
{
var arr = cc.value.replace(/\r\n/g,"\n").split("\n");
var rowsize = cc.value.replace(/\r\n/g,"\n").split("\n").length;
if (rowsize > cc.CASA_maxrows)
{
changed = true;
cc.value="";
for(var i = 0; i < cc.CASA_maxrows; i++)
{
cc.value += arr[i];
if (i+1<cc.CASA_maxrows) cc.value += ("\n");
}
}
}
var curLen = cc.value.length;
curLen += cc.value.split("\n").length-1;
if (cc.CASA_maxlength != null && curLen > cc.CASA_maxlength)
{
changed = true;
cc.value = cc.value.substr(0,cc.CASA_maxlength);
}
if(changed && preSetValue)
setPropertyValue(cc.CASA_valueprop,cc.value);
return cc.value;
}
function ropTEXT(cc,ccevent)
{
if (checkIO() == false)
{
ccevent.returnValue=false;
return false;
}
cc.CASA_paste = true;
if(cc.CASA_maxlength != null)  setTimeout("doRopTEXT("+cc+")",20);
return true;
}
function doRopTEXT(cc)
{
cc.value = cc.value.substr(0,cc.CASA_maxlength);
}
