function addVersionInfoDATEINPUTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('DATEINPUTCONTROLS');
}
function flexCreateControlDATEINPUT(params)
{
var vwidth = params["width"];
if (vwidth == null) vwidth = "100";
var vid = params["CONTROLID"];
var vd = parent.createElement("TD");
vd.style.width = C_adjustUnits(vwidth);
var vc = parent.createElement("INPUT");
vc.type = "TEXT";
vc.name = "CC";
vc.id = "CF_"+vid;
if (vwidth.indexOf("%") > 0)
vc.style.width = "100%";
else
vc.style.width = C_adjustUnits(vwidth);
vc.className = "FIELDInputEdit";
if (params["noborder"] == "true") { vc.style.border = "0"; vc.style.paddingTop = "3px"; }
if (params["transparentbackground"] == "true") { vc.style.backgroundColor= "transparent"; }
if (params["textalign"] != null) { vc.style.textAlign = params["textalign"]; }
parent[vc.id] = vc;
var vromu = parent.createFunction("romu"+vc.id,"model","C.romuDI(CF_"+vid+");");
var vrf = parent.createFunction("rf"+vc.id,"evt","return C.reactDI(CF_"+vid+",evt);");
iccDI(vc,vromu,vrf,params["valuepropp"],params["flush"],params["flushmethodd"],params["datatype"],params["displayonly"],params["statuspropp"],
params["frompropp"],params["topropp"],params["infopropp"],params["secsvispropp"],params["popupinputonly"],params["popuponalt40"],
params["titlepropp"],params["helpid"],params["cti"],params["tabindex"],params["popupicon"],params["invisiblemode"]);
vd.appendChild(vc);
var result = new Object();
result.cell = vd;
result.control = vc;
return result;
}
function flexRemoveDATEINPUT(vid)
{
parent[vid].CASA_td = null;
parent[vid] = undefined;
parent["romu"+vid] = undefined;
parent["rf"+vid] = undefined;
removePropertyListener(vid);
}
function iccDI(cc,romumethod,rfmethod,valueprop,flush,flushmethod,datatype,displayonly,statusprop,
fromprop,toprop,infoprop,secsvisprop,popupinputonly,popuponalt40,
titleprop,helpid,cti,tabindex,popupicon,invisiblemode)
{
cc.onblur = rfmethod;
cc.onfocus = rfmethod;
cc.onchange = rfmethod;
cc.onkeydown = rfmethod;
cc.onkeypress = rfmethod;
cc.ondblclick = rfmethod;
cc.oncontextmenu = rfmethod;
if (! CL().isEditorPreview()) cc.onmouseup = rfmethod;
addFocusable(cc,true);
startFocusCell(cc);
registerPropertyListener(romumethod,valueprop,cc.id);
registerStatusPropertyListener(romumethod,statusprop,cc.id,cc);
registerPropertyListener(romumethod,fromprop,cc.id);
registerPropertyListener(romumethod,toprop,cc.id);
registerPropertyListener(romumethod,titleprop,cc.id);
registerPropertyListener(romumethod,secsvisprop,cc.id);
registerPropertyListener(romumethod,"dateDisplay",cc.id);
if (datatype == "datetime")
registerPropertyListener(romumethod,"timeDisplay",cc.id);
cc.CASA_valueprop = valueprop;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (fromprop != null) cc.CASA_fromprop = fromprop;
if (toprop != null) cc.CASA_toprop = toprop;
if (infoprop != null) cc.CASA_infoprop = infoprop;
if (secsvisprop != null) cc.CASA_secsvisprop = secsvisprop;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (datatype != null) cc.CASA_datatype = datatype; else cc.CASA_datatype = "date";
if (displayonly != null) cc.CASA_displayonly = displayonly;
if (popupinputonly != null) cc.CASA_popupinputonly = popupinputonly; else cc.CASA_popupinputonly = 'false';
if (popuponalt40 != null) cc.CASA_popuponalt40 = popuponalt40;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (helpid != null) cc.CASA_helpid = helpid;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (popupicon != null) cc.CASA_popupicon = popupicon;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
cc.CASA_lastValue = undefined;
cc.CASA_lastStatus = undefined;
cc.CASA_lastPopup = undefined;
cc.CASA_lastText = undefined;
cc.CASA_lastControlValue = undefined;
cc.CASA_lastDir = null;
cc.CASA_td = cc.parentNode;
cc.CASA_lastTitle = undefined;
}
function romuDI(cc, pEnforceUpdate)
{
cc.CASA_secsVisible = null;
if (cc.CASA_secsvisprop != null)
cc.CASA_secsVisible = getPropertyValue(cc.CASA_secsvisprop);
var v = getValueDI(cc);
cc.CASA_lastValue = v;
var s = null;
if (cc.CASA_statusprop != null)
s = getPropertyValue(cc.CASA_statusprop);
if (v == null) s = null;
cc.CASA_lastStatus = s;
if (s == "ERROR" || s == "FOCUS" || s == "FOCUS_NO_SELECT") addFocusRequestor(cc);
if (cc.CASA_titleprop != null)
{
var vTitle = getPropertyValue(cc.CASA_titleprop);
if (vTitle != cc.CASA_lastTitle)
{
cc.title = vTitle;
cc.CASA_lastTitle = vTitle;
}
}
if (cc.CASA_lastDir != m_direction)
{
if (m_direction == 'rtl')
{
cc.style.backgroundPosition = 'left';
if(cc.CASA_datatype == "datetime")
{
cc.style.direction = "ltr";
cc.style.textAlign = "right";
}
}
else
cc.style.backgroundPositionX = 'right';
cc.CASA_lastDir = m_direction;
}
v = convertValueIntoDisplayStringDI(cc,v);
if (v == null && s == null)
{
cc.value = "";
cc.tabIndex = -1;
cc.readOnly = true;
if (cc.className != "FIELDInputNull") cc.className = "FIELDInputNull";
if (cc.CASA_popupicon != undefined && cc.style.backgroundImage != undefined) cc.style.backgroundImage = "";
return;
}
else
{
cc.value = v;
cc.readOnly = false;
applyCasaTabIndex(cc, "DATEINPUT");
}
cc.CASA_lastControlValue = cc.value;
if (cc.CASA_displayonly == 'true' && (s == null || s == ""))
{
cc.tabIndex = -1;
cc.readOnly = true;
s = "DISPLAY";
if (cc.className != "FIELDInputDisplay") cc.className = "FIELDInputDisplay";
}
else if (s == null)
{
if (cc.CASA_popupinputonly == 'true') { if (cc.className != "FIELDPopupInputOnlyWithPopup") cc.className = "FIELDPopupInputOnlyWithPopup"; }
else if (cc.className != "FIELDInputEditWithPopup") cc.className = "FIELDInputEditWithPopup";
}
else
{
if (s == "EDIT" || s == "FOCUS" || s == "FOCUS_NO_SELECT")
{
if (cc.CASA_popupinputonly == 'true') { if (cc.className != "FIELDPopupInputOnlyWithPopup") cc.className = "FIELDPopupInputOnlyWithPopup"; }
else if (cc.className != "FIELDInputEditWithPopup") cc.className = "FIELDInputEditWithPopup";
}
else if (s == "DISPLAY")
{
cc.tabIndex = -1;
cc.readOnly = true;
if (cc.className != "FIELDInputDisplayWithPopup") cc.className = "FIELDInputDisplayWithPopup";
}
else if (s == "ERROR_DISPLAY")
{
cc.tabIndex = -1;
cc.readOnly = true;
if (cc.CASA_popupinputonly == 'true') { if (cc.className != "FIELDInputErrorWithPopup") cc.className = "FIELDInputErrorWithPopup"; }
else if (cc.className != "FIELDInputErrorWithPopup") cc.className = "FIELDInputErrorWithPopup";
}
else if (s == "ERROR" || s == "ERROR_NO_FOCUS")
{
if (cc.CASA_popupinputonly == 'true') { if (cc.className != "FIELDInputErrorWithPopup") cc.className = "FIELDInputErrorWithPopup"; }
else if (cc.className != "FIELDInputErrorWithPopup") cc.className = "FIELDInputErrorWithPopup";
}
else if (s == "INVISIBLE")
{
if (cc.className != "FIELDInputInvisibleWithPopup") cc.className = "FIELDInputInvisibleWithPopup";
}
else
{
if (cc.CASA_popupinputonly == 'true') { if (cc.className != "FIELDPopupInputOnlyWithPopup") cc.className = "FIELDPopupInputOnlyWithPopup"; }
else if (cc.className != "FIELDInputEditWithPopup") cc.className = "FIELDInputEditWithPopup";
}
if (cc.CASA_td != null)
{
if (s == "INVISIBLE")
{
var vim = cc.CASA_invisiblemode;
if (vim == undefined || vim == "invisible")
{
cc.CASA_td.style.display = "none";
}
}
else
{
cc.style.display = "";
cc.CASA_td.style.display = "";
}
}
}
if (cc.CASA_popupicon != undefined)
{
if (cc.style.backgroundImage == null || cc.style.backgroundImage == "")
cc.style.backgroundImage = "url("+cc.CASA_popupicon+")";
}
}
function reactDI(cc,evt)
{
if(CL() == null) return;
if      (evt.type == "keydown") return reactOnKeyDownDI(cc,evt);
else if (evt.type == "keypress") return reactOnKeyPressDI(cc,evt);
else if (evt.type == "mouseup") return reactOnMouseupDI(cc,evt);
else if (evt.type == "change") return transferChangeDI(cc,"change");
else if (evt.type == "blur") return transferChangeDI(cc,"blur");
else if (evt.type == "focus") return reactOnFocusDI(cc);
else if (evt.type == "dblclick") return reactOnValueHelpDI(cc);
else if (evt.type == "contextmenu") return reactOnValueHelpDI(cc,evt);
}
function reactOnMouseupDI(cc,evt)
{
if (evt.button == 2) return true;
var vOffsetX = evt.offsetX;
var vOffsetWidth = cc.offsetWidth;
var vWidth = 18;
if(cc.CASA_lastDir == 'rtl')
{
if (vOffsetX <= vWidth)
reactOnValueHelpDI(cc,evt);
else
return true;
}
else
{
if (vOffsetX + vWidth - 0 >= vOffsetWidth)
reactOnValueHelpDI(cc,evt);
else
return true;
}
}
function reactOnValueHelpDI(cc,evt)
{
if (cc.CASA_displayonly == 'true')
return false;
if (getPropertyValue(cc.CASA_valueprop) == null)
return false;
var s = null;
if (cc.CASA_statusprop != null)
s = getPropertyValue(cc.CASA_statusprop);
if (s != null && s == "DISPLAY")
return false;
if (evt != null && evt.stopPropagation) evt.stopPropagation();
openDatePopupDI(cc);
return false;
}
function reactOnKeyPressDI(cc,evt)
{
if (checkIOForNoSubmits() == false) return false;
if (evt.shiftKey == true && evt.keyCode == 16) return true;
if (evt.keyCode == 9) return true;
if (cc.CASA_popupinputonly == 'true') return false;
if (cc.tabIndex == -1) return false;
return true;
}
function reactOnKeyDownDI(cc,evt)
{
if (checkIOForNoSubmits() == false) return false;
try { cc.focus(); } catch (eexxcc) {}
var vKeyCode = evt.keyCode;
if (evt.CASA_keyCode != undefined)
vKeyCode = evt.CASA_keyCode;
if (vKeyCode == 112)
{
if (cc.CASA_helpid != undefined)
{
var vHelpId = cc.CASA_helpid;
if (cc.CASA_helpid == "$valueprop$") vHelpId = cc.CASA_valueprop;
setPropertyValue("param2",vHelpId);
invokeMethodInModel("reactOnHelpRequestForHelpId");
}
return false;
}
if (evt.ctrlKey == true) return true;
if (cc.tabIndex == -1 && cc.CASA_popupinputonly == 'false') return false;
if (vKeyCode == 115 || vKeyCode == 118)
return reactOnValueHelpDI(cc);
if (vKeyCode == 40)
{
if (cc.CASA_popuponalt40 == "true")
{
if (evt.altKey == true)
{
evt.stopPropagation();
return reactOnValueHelpDI(cc);
}
}
else
{
return reactOnValueHelpDI(cc);
}
}
if (cc.CASA_popupinputonly == 'true')
{
if (evt.shiftKey == true && evt.keyCode == 16) return true;
if (vKeyCode == 9) return true;
if (vKeyCode == 13) return true;
if (vKeyCode == 27) return true;
return reactOnValueHelpDI(cc,evt);
}
return true;
}
function reactOnFocusDI(cc)
{
CL().C_regFocusInfo(cc);
return true;
}
function transferChangeDI(cc,caller)
{
if(caller == "blur") CL().C_unregFocusInfo(cc);
if (checkIOForNoSubmits() == false) return false;
if (cc.tabIndex == -1) return false;
transferPropertyValueDI(cc,caller);
return true;
}
function transferPropertyValueDI(cc,caller)
{
if (cc.value == null || cc.value == cc.CASA_lastControlValue)
{
if (cc.CASA_hasValidationError == true &&
cc.CASA_skipNextOnBlurValidation != true)
{
var msg = buildValidationErrorMessageDI(cc);
if (getPropertyValue("cISAddons.cisA1") != "false")
{
CL().romuSB(this,msg,"E",cc);
cc.CASA_supresserror = false;
avoidClickAway();
}
else if (displayNotificationDI(msg))
{
unregisterValidationError(cc);
resetValidationErrorDI(cc);
}
try{ cc.focus(); } catch(ex) {}
}
cc.CASA_skipNextOnBlurValidation = false;
return true;
}
cc.CASA_valErrors = null;
cc.style.color = "";
cc.style.borderColor = "";
cc.style.borderWidth = "";
var retParam = transferAndConvertPropertyValueDI(cc);
if (cc.CASA_hasValidationError == true)
{
cc.CASA_hasValidationError = false;
unregisterValidationError(cc);
}
if (retParam.hasValidationErrors == true)
{
cc.style.color = "#FF0000";
cc.style.borderColor = "#FF0000";
cc.style.borderWidth = "2px";
cc.CASA_hasValidationError = true;
registerValidationErrorForDateInput(cc);
if (cc.CASA_skipNextOnBlurValidation != true)
{
var msg = retParam.errorMessage;
if (msg == null || msg == "")
msg = buildValidationErrorMessageDI(cc);
if (getPropertyValue("cISAddons.cisA1") != "false")
{
CL().romuSB(this,msg,"E",cc);
cc.CASA_supresserror = false;
avoidClickAway();
}
else if (displayNotificationDI(msg))
{
unregisterValidationError(cc);
resetValidationErrorDI(cc);
}
else
{
cc.CASA_valErrors = [];
cc.CASA_valErrors.push(msg);
cc.blur();
cc.focus();
cc.select();
cc.CASA_skipNextOnBlurValidation = true;
}
}
else
{
cc.CASA_skipNextOnBlurValidation = false;
}
}
else
{
flushIfDesiredDI(cc);
}
}
function displayNotificationDI(msg)
{
alert(msg);
return true;
}
function transferAndConvertPropertyValueDI(cc)
{
if (cc.value == null || cc.value == cc.CASA_lastControlValue) return true;
var param = new Object();
param.value = cc.value;
param.dateDisplay = m_dateDisplay;
param.language = m_language;
param.datatype = cc.CASA_datatype;
if (cc.CASA_fromprop != null) param.fromRestriction = getPropertyValue(cc.CASA_fromprop);
if (cc.CASA_toprop != null) param.toRestriction = getPropertyValue(cc.CASA_toprop);
var retParam = null;
try
{
retParam = convertAndValidateUserInputDATEINPUTPLUGIN(param,cc);
}
catch(exc)
{
retParam = convertAndValidateUserInputDATEINPUT(param,cc);
}
if (!retParam.hasValidationErrors)
{
setValueDI(cc,retParam.value);
cc.CASA_lastValue = retParam.value;
cc.value = convertValueIntoDisplayStringDI(cc,retParam.value);
}
cc.CASA_lastControlValue = cc.value;
return retParam;
}
var m_blockAfterFlushDI;
function flushIfDesiredDI(cc)
{
if (cc.CASA_flush == "server" || cc.CASA_flushmethod != null)
{
setPropertyValue("param1",cc.CASA_valueprop);
if (m_blockAfterFlushDI != true)
{
parent.m_blockIOByFlush = true;
}
else
{
parent.m_blockIOByFlush = false;
}
m_blockAfterFlushDI = undefined;
m_displayOccupied = false;
if(cc.CASA_flushmethod != null)
invokeMethodInModel(cc.CASA_flushmethod);
else
submitModel("submit");
}
else if (cc.CASA_flush == "screen")
updateModelListenersS();
}
function setValueDI(cc, value)
{
if (value != null && value.length == 14)
value += "000";
else if (value != null && value.length == 12)
value += "00000";
setPropertyValue(cc.CASA_valueprop,value);
}
function getValueDI(cc)
{
var value = getPropertyValue(cc.CASA_valueprop);
if (value != null && value.length == 17 && cc.CASA_datatype == "datetime")
{
if (cc.CASA_secsVisible == "true")
value = value.substr(0,14);
else
value = value.substr(0,12);
}
return value;
}
function convertValueIntoDisplayStringDI(cc, value)
{
if (cc.CASA_datatype == "date")
return convertYYYYMMDDIntoDisplayString(value);
if (cc.CASA_secsVisible == "true")
return convertYYYYMMDDHHMMSSIntoDisplayString(value);
return convertYYYYMMDDHHMMIntoDisplayString(value);
}
function resetValidationErrorDI(cc)
{
cc.style.color = "";
cc.style.borderColor = "";
cc.style.borderWidth = "";
cc.CASA_hasValidationError = false;
cc.CASA_valErrors = [];
romuDI(cc, true);
}
function buildValidationErrorMessageDI(cc)
{
var msg;
if (cc.CASA_validationuserhintprop != null)
msg =  getPropertyValue(cc.CASA_validationuserhintprop);
if (msg == null || msg == "")
{
if (cc.CASA_validationuserhint == null)
msg =  replaceLiteralTRANSLATION(m_language, "labelNoValidInputNoHint");
else
msg =  replaceLiteralWithAddTextTRANSLATION(m_language, "labelNoValidInput", cc.CASA_validationuserhint, this);
}
return msg;
}
function compareDatesDI(firstYYYYMMDD, secondYYYYMMDD)
{
if (firstYYYYMMDD == null || firstYYYYMMDD.length != 8 || secondYYYYMMDD == null || secondYYYYMMDD.length != 8) return null;
var firstYear = 1*firstYYYYMMDD.substr(0,4);
var firstMonth = 1*firstYYYYMMDD.substr(4,2);
var firstDay = 1*firstYYYYMMDD.substr(6,2);
var secondYear = 1*secondYYYYMMDD.substr(0,4);
var secondMonth = 1*secondYYYYMMDD.substr(4,2);
var secondDay = 1*secondYYYYMMDD.substr(6,2);
if (secondYear > firstYear) return -1;
if (secondYear == firstYear && secondMonth > firstMonth) return -1
if (secondYear == firstYear && secondMonth == firstMonth && secondDay > firstDay) return -1;
if (firstYear > secondYear) return 1;
if (firstYear == secondYear && firstMonth > secondMonth) return 1;
if (firstYear == secondYear && firstMonth == secondMonth && firstDay > secondDay) return 1;
return 0;
}
var m_retccDI;
function openDatePopupDI(cc)
{
if (checkIOForNoSubmits() == false) return false;
m_retccDI = cc;
var vParameters = new Object();
var param = getValueDI(cc);
param = ensureYYYMMDDHHMMSS(param);
vParameters[0] = param;
param = getPropertyValue(cc.CASA_fromprop);
param = ensureYYYMMDDHHMMSS(param);
vParameters[1] = param;
param = getPropertyValue(cc.CASA_toprop);
param = ensureYYYMMDDHHMMSS(param);
vParameters[2] = param;
vParameters[3] = parent.parent.CasaSTYLESHEET;
vParameters[4] = m_dateDisplay;
vParameters[5] = m_direction;
vParameters[6] = parent;
vParameters[7] = cc.CASA_infoprop;
vParameters[8] = cc.CASA_datatype;
vParameters[9] = cc.CASA_secsVisible;
vParameters[10] = m_americanStyle;
if (m_americanStyle == null ||
m_americanStyle == "null" ||
m_americanStyle == "")
{
if (m_dateDisplay == "MM/DD/YYYY" || m_dateDisplay == "MM/DD/YY")
vParameters[10] = "SU";
}
casaPopupParameters = vParameters;
casaPopupReturnValue = null;
var vdialogwidth = 250;
if (cc.CASA_datatype == "datetime")
vdialogwidth = 380;
cc.CASA_skipNextOnBlurValidation = true;
var dlgHeight = 280;
var pageFeatures='width='+vdialogwidth+',height='+dlgHeight+',status=no,resize=true';
var innerWidth = parent.innerWidth;
var innerHeight = parent.innerHeight;
var posX = (innerWidth-vdialogwidth)/2;
if (window.screenX) posX += window.screenX;
pageFeatures += ',left='+posX;
var posY = (innerHeight-dlgHeight)/2;
if (window.screenY)
{
var browserFrameHeight = (top.outerHeight - top.innerHeight)/2;
posY += window.screenY + browserFrameHeight;
}
pageFeatures += ',top='+posY;
var vWindow = parent.open('../HTMLBasedGUI/general/dateinputpage_'+m_language+'.html',
'_blank',
pageFeatures);
CL().C_registerPopupPage(vWindow, true);
}
function transferDatePopupRetValDI(value)
{
if (m_retccDI.CASA_datatype == "date" &&
value != null &&
value.length >= 12)
{
value = value.substring(0,8);
}
m_retccDI.value = convertValueIntoDisplayStringDI(m_retccDI,value);
transferPropertyValueDI(m_retccDI);
}
function ensureYYYMMDDHHMMSS(param)
{
if (param == null || param == "") return null;
if (param.length == 8) return param+"000000";
if (param.length == 12) return param+"00";
if (param.length == 14) return param;
return null;
}
function convertAndValidateUserInputDATEINPUT(param,cc)
{
var result = new Object();
result.hasValidationErrors = false;
result.value = "";
var value = param.value;
if (value == null || value == "") return result;
var vDate = value;
var vTime = "00:00:00";
if (param.datatype == "datetime")
{
var index = value.indexOf(" ");
if (index<=0)
index = value.length;
vDate = value.substr(0,index);
if ((index+1) < value.length)
vTime = value.substring((index+1),value.length);
}
vDate = convertDisplayStringIntoYYYYMMDD(vDate);
result.value = vDate;
if (vDate.length != 8 || CL().C_checkDateVALIDATION(vDate,cc.CASA_isnatPage) == false)
{
result.hasValidationErrors = true;
result.errorMessage = replaceLiteralTRANSLATION(param.language, "labelNoValidInputNoHint");
}
else if (param.fromRestriction != null && compareDatesDI(param.fromRestriction,vDate) == 1)
{
result.hasValidationErrors = true;
result.errorMessage = replaceLiteralWithAddTextTRANSLATION(param.language, "labelNoValidInputDateBeforeFrom", convertYYYYMMDDIntoDisplayString(param.fromRestriction),this);
}
else if (param.toRestriction != null && compareDatesDI(param.toRestriction,vDate) == -1)
{
result.hasValidationErrors = true;
result.errorMessage = replaceLiteralWithAddTextTRANSLATION(param.language, "labelNoValidInputDateAfterTo", convertYYYYMMDDIntoDisplayString(param.toRestriction),this);
}
if (!result.hasValidationErrors && param.datatype == "datetime")
{
vTime = convertDisplayStringIntoHHMMSS(vTime);
result.value = vDate+vTime;
if (vTime.length != 6 || CL().C_checkTimeVALIDATION(vTime) == false)
{
result.hasValidationErrors = true;
result.errorMessage = replaceLiteralTRANSLATION(param.language, "labelNoValidInputNoHint");
}
}
if (result.hasValidationErrors)
result.value = value;
return result;
}
