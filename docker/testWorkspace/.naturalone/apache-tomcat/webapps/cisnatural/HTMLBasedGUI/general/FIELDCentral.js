function addVersionInfoFIELDCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('FIELDCENTRAL');
}
function C_flexCreateControlFIELD(tt,params)
{
var vwidth = params["width"];
if (vwidth == null) vwidth = "100";
var vid = params["CONTROLID"];
var vd = tt.parent.createElement("TD");
var vc = tt.parent.createElement("INPUT");
if (params["password"] != "true")
vc.type = "TEXT";
else
vc.type = "PASSWORD";
var hopsfromControlToCell = 1;
var isSpinControl = params["spinrangemin"] != null;
if (isSpinControl || params["takeoutfieldpopupicon"] == "true")
{
hopsfromControlToCell = 5;
if(isSpinControl)
{
params["validationrules"] = params["valuepropp"]+";gt;"+params["spinrangemax"]+";Or-"+params["valuepropp"]+";lt;"+params["spinrangemin"]+"-ERROR_onchange";
vc.CASA_spinrangemin = params["spinrangemin"];
vc.CASA_spinrangemax = params["spinrangemax"];
}
var vt = tt.parent.createElement("TABLE");
var vb = tt.parent.createElement("TBODY");
vt.cellSpacing = 0;
vt.cellPadding = 0;
vt.border = 0;
vt.width = vwidth;
var vr = tt.parent.createElement("TR");
var tdcontrol = tt.parent.createElement("TD");
tdcontrol.appendChild(vc);
vr.appendChild(tdcontrol);
if(params["takeoutfieldpopupicon"] == "true")
{
var tdout = tt.parent.createElement("TD");
tdout.style.verticalAlign = "middle";
tdout.style.width = "16px";
tdout.innerHTML = "<div id='FIC_"+vid+"' onmouseup='C.reactOnValueHelpFIELD(CF_"+vid+",event);' style='background-repeat:no-repeat; width:16px;'><img width=16px src='../HTMLBasedGUI/general/nothing.gif'></div>";
vr.appendChild(tdout);
vc.CASA_fic = tdout.firstChild;
}
if(isSpinControl)
{
var tdspin = tt.parent.createElement("TD");
tdspin.style.verticalAlign = "middle";
tdspin.style.width = "16px";
tdspin.innerHTML = "<div id='FIC_"+vid+"' onmouseup='C.CL().C_reactOnSpinFIELD(C, CF_"+vid+",event,true);' style='margin-left: 1px;width:16px;'><img width=16px src='../HTMLBasedGUI/images/fieldspinup.gif'></div><div id='FIC_"+vid+"' onmouseup='C.CL().C_reactOnSpinFIELD(C, CF_"+vid+",event,false);' style='margin-left: 1px;margin-top: 1px;width:16px;'><img width=16px src='../HTMLBasedGUI/images/fieldspindown.gif'></div>";
vr.appendChild(tdspin);
}
vb.appendChild(vr);
vt.appendChild(vb);
vd.appendChild(vt);
vc.style.width = "100%";
}
else
{
vd.style.width = C_adjustUnits(vwidth);
if (vwidth.indexOf("%") > 0)
vc.style.width = "100%";
else
vc.style.width = C_adjustUnits(vwidth);
vd.appendChild(vc);
}
vc.name = "CC";
vc.id = "CF_"+vid;
vc.className = "FIELDInputEdit";
if (params["noborder"] == "true") { vc.style.border = "0"; vc.style.paddingTop = "3px"; }
if (params["transparentbackground"] == "true") { vc.style.backgroundColor= "transparent"; }
if (params["textalign"] != null) { vc.style.textAlign = params["textalign"]; }
if (params["maxlength"] != null) { vc.maxLength = params["maxlength"]; }
if (params["fieldstyle"] != null && params["fieldstyle"].length > 0) { vc.style.cssText = vc.style.cssText +  ";" + params["fieldstyle"]; }
tt.parent["CF_"+vid] = vc;
var vromu = tt.parent.createFunction("romuCF_"+vid,"model","C.romuFIELD(CF_"+vid+");");
if ( isWM(tt) )
{
params["flushmethodd"] = params["flushmethod"];
params["contextmenumethodd"] = params["contextmenumethod"];
params["popupmethodd"] = params["popupmethod"];
}
tt.iccFIELD(vc,vromu,tt["reactFIELD"],params["valuepropp"],params["valuetextpropp"],params["statuspropp"],params["flush"],params["flushmethodd"],params["flushindexpropp"],params["popupmethodd"],params["popuppropp"],
params["datatype"],params["displayonly"],params["helptext"],params["uppercase"],params["validation"],params["validationpropp"],
params["keybwithdindisplaystatus"],params["helpid"],params["decimaldigitspropp"],params["optarraypropp"],
params["validationuserhint"],params["textidmode"],params["popupinputonly"],params["touchpadinput"],params["titlepropp"],
params["popuponalt40"],params["validationuserhintpropp"],params["bgcolorpropp"],null,params["tabindex"],params["invisiblemode"],
params["popupicon"],params["decimaldigits"],params["popupcombowidth"],hopsfromControlToCell,params["fgcolorpropp"],params["maxlengthpropp"],params["hotkeys"],
params["autocallpopupmethod"],params["validationrules"],params["formula"],false,params["digits"],params["digitspropp"],
params["takeoutfieldpopupicon"],params["autocallpopupmethodoffset"],params["displaypropp"],params["editmask"], params["alwaysflush"], params["autotab"],
params["lengthpropp"],params["contextmenumethodd"]);
var result = new Object();
result.cell = vd;
result.control = vc;
return result;
}
function C_transferPropertyValueFIELD(tt,pCC)
{
if (pCC.value == null || pCC.value == pCC.CASA_lastControlValue)
{
if (pCC.CASA_hasValidationError == true &&
pCC.CASA_skipNextOnBlurValidation != true)
{
var msg = tt.buildValidationErrorMessageFIELD(pCC);
if ((tt.getPropertyValue("cISAddons.cisA1") != "false") && (tt.getPropertyValue("cISAddons.cisA2") != "true"))
{
romuSB(tt,msg,"E",pCC);
pCC.CASA_supresserror = false;
tt.avoidClickAway();
}
else if (displayNotificationFIELD(msg, tt))
{
tt.unregisterValidationError(pCC);
tt.resetValidationErrorFIELD(pCC);
}
try{
window.setTimeout( function() { pCC.focus();}, 1);
} catch(ex) {}
}
pCC.CASA_skipNextOnBlurValidation = false;
return;
}
var vResult = tt.transferAndConvertPropertyValueFIELD(pCC);
if (pCC.CASA_hasValidationError == true)
{
pCC.CASA_hasValidationError = false;
tt.unregisterValidationError(pCC);
if (tt.getPropertyValue("cISAddons.cisA2") == "true")
{
tt.showMessageInStatusBar("","");
}
}
if (vResult == false)
{
var msg = tt.buildValidationErrorMessageFIELD(pCC);
if ((tt.getPropertyValue("cISAddons.cisA1") != "false") && (tt.getPropertyValue("cISAddons.cisA2") != "true"))
{
registerValidationErrorFIELD(tt, pCC);
romuSB(tt,msg,"E",pCC);
pCC.CASA_supresserror = false;
tt.avoidClickAway();
return;
}
if (displayNotificationFIELD(msg, tt))
{
tt.resetValidationErrorFIELD(pCC);
pCC.blur();
if (tt.isSafari())
{
pCC.focus();
}
else
{
window.setTimeout( function() { pCC.focus();}, 1);
}
pCC.select();
return;
}
else
{
pCC.CASA_skipNextOnBlurValidation = true;
registerValidationErrorFIELD(tt, pCC);
return;
}
}
return pCC;
}
function displayNotificationFIELD(msg, tt)
{
if (tt.getPropertyValue("cISAddons.cisA2") != "true")
{
return tt.confirm(msg);
}
else
{
tt.showMessageInStatusBar ("E", msg);
return false;
}
}
function registerValidationErrorFIELD(tt, pCC)
{
pCC.blur();
window.setTimeout( function() { pCC.focus();}, 1);
if (!tt.isSafari()) pCC.select();
pCC.CASA_hasValidationError = true;
tt.decorateInputFieldOnError(pCC);
if (pCC.CASA_valErrors != null)
{
var vTitle ="";
for(var i=0;i<pCC.CASA_valErrors.length;i++)
vTitle += pCC.CASA_valErrors[i] +"\n";
vTitle = vTitle.substring(0,vTitle.lastIndexOf('\n'))
pCC.title =  vTitle;
}
tt.registerValidationError(pCC);
}
function C_transferAndConvertPropertyValueFIELD(tt,pCC)
{
pCC.lastValue =pCC.CASA_lastControlValue;
if (pCC.value == null || pCC.value == pCC.CASA_lastControlValue) return true;
pCC.style.color = "";
pCC.style.borderColor = "";
pCC.style.borderWidth = "";
var convertedValue = pCC.value;
var decimalDigitsFloat = -1;
if (pCC.CASA_decimaldigits != null)
decimalDigitsFloat = pCC.CASA_decimaldigits;
if (pCC.CASA_decimaldigitsprop != null)
decimalDigitsFloat = tt.getPropertyValue(pCC.CASA_decimaldigitsprop);
var digitsFloat = -1;
if (pCC.CASA_digits != null)
digitsFloat = pCC.CASA_digits;
if (pCC.CASA_digitsprop != null)
digitsFloat = tt.getPropertyValue(pCC.CASA_digitsprop);
if (pCC.CASA_datatype != null)
{
if (pCC.CASA_datatype == "float" || pCC.CASA_datatype == "int")
{
convertedValue = C_remove1000Separators(tt,convertedValue,decimalDigitsFloat);
if (tt.checkIf1000SeparatorsHasError(convertedValue) == true)
{
pCC.value = convertedValue;
tt.decorateInputFieldOnError(pCC);
pCC.CASA_lastControlValue = convertedValue;
return false;
}
}
if ( pCC.CASA_datatype == "emtype" )
{
try
{
convertedValue = tt.convertValueEDITMASK(tt, convertedValue, pCC);
if (tt.checkIfValueHasErrorEDITMASK(tt, convertedValue, pCC) == true )
{
pCC.value = convertedValue;
tt.decorateInputFieldOnError(pCC);
pCC.CASA_lastControlValue = convertedValue;
return false;
}
} catch(ex) {}
}
else
{
convertedValue = tt.convertValue(convertedValue,pCC.CASA_datatype,decimalDigitsFloat);
if (tt.checkIfValueHasError(convertedValue,pCC.CASA_datatype,decimalDigitsFloat,digitsFloat) == true)
{
pCC.value = convertedValue;
tt.decorateInputFieldOnError(pCC);
pCC.CASA_lastControlValue = convertedValue;
return false;
}
}
}
if (pCC.CASA_uppercase == "true") convertedValue = convertedValue.toUpperCase();
var value = convertedValue;
if (pCC.CASA_datatype == "timestamp") value = tt.convertDisplayStringIntoYYYYMMDDHHMMSSMMM(value);
var vPCOK = true;
if (pCC.CASA_datatype != null && value != null && value != "")
{
if (pCC.CASA_datatype == "date") { vPCOK = tt.CL().C_checkDateVALIDATION(value,pCC.CASA_isnatPage); }
if (pCC.CASA_datatype == "time") { vPCOK = tt.CL().C_checkTimeVALIDATION(value); }
if (vPCOK == false)
{
tt.decorateInputFieldOnError(pCC);
pCC.CASA_lastControlValue = pCC.value;
return false;
}
}
if (pCC.CASA_validationprop != null)
pCC.CASA_validation = tt.getPropertyValue(pCC.CASA_validationprop);
if (pCC.CASA_validation != null &&
pCC.CASA_validation != "")
{
vPCOK = tt.CL().C_checkRegularExpression(pCC.CASA_validation,value);
if (vPCOK == false)
{
tt.decorateInputFieldOnError(pCC);
pCC.CASA_lastControlValue = value;
return false;
}
}
if (pCC.CASA_datatype == "float") value = tt.convertDisplayStringIntoFLOAT(value);
if(tt.m_validationRules.length > 0)
{
for(var vri = 0; vri < tt.m_validationRules.length; vri++)
{
var validationrules = tt.m_validationRules[vri];
var tempValueProp = validationrules.split(";");
tempValueProp = tt.rulesStringtoFieldValueProp(tempValueProp[0]);
if(pCC.CASA_valueprop == tempValueProp)
{
var rules = validationrules.split("_");
if(rules[rules.length-1] == "onchange")
{
pCC.CASA_checkOnSubmit = false;
vPCOK = tt.checkValidationRules(pCC,rules,value,tt);
if (vPCOK == false)
{
tt.decorateInputFieldOnError(pCC);
pCC.CASA_lastControlValue = value;
return false;
}
}
}
}
}
var dt = pCC.CASA_datatype;
if (pCC.type != "file") pCC.value = value;
if (decimalDigitsFloat < 0) decimalDigitsFloat = 0;
if (dt == "float") pCC.value = tt.convertFLOATIntoDisplayString(value,decimalDigitsFloat);
if (dt == "int" || dt == "long") pCC.value = tt.convertINTIntoDisplayString(value);
if (dt == "date") pCC.value = tt.convertYYYYMMDDIntoDisplayString(value);
if (dt == "time") pCC.value = tt.convertHHMMSSIntoDisplayString(value);
if (dt == "timestamp") pCC.value = tt.convertYYYYMMDDHHMMSSMMMIntoDisplayString(value);
if (dt == "emtype") try { pCC.value = tt.convertIntoDisplayStringEDITMASK(tt,value,pCC); } catch(ex) {}
tt.setPropertyValue(pCC.CASA_valueprop,value);
pCC.CASA_lastValue = value;
pCC.CASA_lastControlValue = pCC.value;
if ((dt != null) &&  (dt == "color"))
if ((pCC.value != null) && (pCC.value != ""))
{
pCC.style.color = tt.determineContrastColorCOLORSELECTION(pCC.value);
pCC.style.backgroundColor = pCC.value;
}
else
pCC.style.backgroundColor = "";
tt.executeFormulas(pCC);
return true;
}
function C_buildValidationErrorMessageFIELD(tt,pCC)
{
var msg = "";
if (pCC.CASA_valErrors != null && pCC.CASA_valErrors.length > 0 && pCC.CASA_spinrangemin == null)
{
for(var i=0;i<pCC.CASA_valErrors.length;i++)
msg += pCC.CASA_valErrors[i] +"\n";
msg = msg.substring(0,msg.lastIndexOf('\n'));
msg =  tt.replaceLiteralWithAddTextTRANSLATION(tt.m_language, "labelNoValidInput", msg,tt);
}
else
{
if (pCC.CASA_validationuserhintprop != null)
{
msg =  tt.getPropertyValue(pCC.CASA_validationuserhintprop);
msg = msg.replace(/\\n/g,"\n");
}
}
if (msg == null || msg == "")
{
if (pCC.CASA_validationuserhint == null)
msg =  tt.replaceLiteralTRANSLATION(tt.m_language, "labelNoValidInputNoHint");
else
msg =  tt.replaceLiteralWithAddTextTRANSLATION(tt.m_language, "labelNoValidInput", pCC.CASA_validationuserhint,tt);
}
return msg;
}
function hasEnterHotkey()
{
for (i=0; i<m_hotKeys.length; i++)
{
var hotKey = m_hotKeys[i];
if ("13" == hotKey.keyCode || 13 == hotKey.keyCode)
{
if (hotKey.shiftKey == false && hotKey.ctrlKey == false && hotKey.altKey == false) {return true;}
}
}
return false;
}
function C_flushIfDesiredFIELD(tt,pCC,eventType)
{
if(pCC.CASA_alwaysflush == "true" && eventType != "blur") return;
if (pCC.CASA_flush == "server" || pCC.CASA_flushmethod != null)
{
tt.setPropertyValue("param1",pCC.CASA_valueprop);
if (tt.m_blockAfterFlushFIELD != true)
{
tt.parent.m_blockIOByFlush = true;
}
else
{
tt.parent.m_blockIOByFlush = false;
}
tt.m_blockAfterFlushFIELD = undefined;
tt.m_displayOccupied = false;
if(pCC.CASA_flushmethod != null)
{
tt.invokeMethodInModel(pCC.CASA_flushmethod, false, true);
}
else
tt.submitModel("submit");
}
else if (pCC.CASA_flush == "screen"){
if (pCC.CASA_flushindexprop != null)
tt.setPropertyValue(pCC.CASA_flushindexprop, tt.getPropertyValue(pCC.CASA_flushindexprop) + 1);
tt.updateModelListenersS();
}
}
function C_reactOnFocusFIELD(tt, pCC)
{
C_regFocusInfo(pCC);
return true;
}
function C_reactOnMouseDownFIELD(tt,evt)
{
var pCC = evt.currentTarget;
if (evt.button == 2 && pCC.CASA_contextmenumethod != null)
{
m_ctm = pCC;
m_ctmStart = m_ctm.selectionStart;
m_ctmEnd = m_ctm.selectionEnd;
return true;
}
try { pCC.focus(); } catch(e) {};
return true;
}
function C_reactOnMouseUpFIELD(tt,evt)
{
var pCC = evt.currentTarget;
if (evt.button == 2)
{
if ( (pCC.CASA_contextmenumethod != null) && (pCC.CASA_contextmenumethod != undefined) )
{
tt.setContextMenuXYPAGE(evt.clientX,evt.clientY);
C_reactOnContextMenuFIELD(tt,pCC,evt);
}
return true;
}
var vOffsetX = 0;
if (evt.offsetX==undefined) vOffsetX = evt.layerX;
else vOffsetX = evt.offsetX - pCC.scrollLeft;
var vOffsetWidth = pCC.offsetWidth;
var vWidth = 18;
if (pCC.CASA_touchpadinput == 'true')  vWidth = 60;
if (pCC.m_lastDir == 'rtl')
{
if (vOffsetX <= vWidth)
tt.reactOnValueHelpFIELD(pCC,evt);
else
return true;
}
else
{
if (vOffsetX + vWidth - 0 >= vOffsetWidth)
tt.reactOnValueHelpFIELD(pCC,evt);
else
return true;
}
}
function C_reactOnKeyUpFIELD(tt,evt)
{
if (tt.checkIOForNoSubmits() == false) return false;
var pCC = evt.currentTarget;
var currentLength = pCC.value.length;
if( pCC.CASA_allowTab == true &&
currentLength == pCC.maxLength &&
(pCC.CASA_autotab == "true") &&
currentLength == C_getSelectionStart(pCC))
{
tt.focusNextTabInput(pCC);
tt.clickAway();
}
pCC.CASA_allowTab = false;
}
function C_getSelectionStart(pCC)
{
if (typeof pCC.selectionStart == "number")
return pCC.selectionStart;
else if (document.selection)
{
var range = document.selection.createRange().duplicate();
range.moveEnd('character', pCC.value.length);
if (range.text != null &&
range.text.replace(/^\s+|\s+$/g, '') == '') return pCC.value.length;
return pCC.value.lastIndexOf(range.text);
}
}
function C_reactOnKeyPressFIELD(tt,evt)
{
if (tt.checkIOForNoSubmits() == false) return false;
var pCC = evt.currentTarget;
var kc = evt.keyCode;
pCC.CASA_allowTab = true;
if (kc == 13 || kc == 27 || evt.ctrlKey == true) pCC.CASA_allowTab = false;
if (evt.charCode == 0) pCC.CASA_allowTab = false;
if (kc == 35 || kc == 36 || kc == 37 || kc == 39) return true;
if (kc == 9) return true;
if (evt.shiftKey == true && kc == 16) return true;
if (pCC.CASA_popupinputonly == 'true') return false;
if (evt.ctrlKey == true) return true;
if (pCC.tabIndex == -1) return false;
return true;
}
var m_ctm;
var m_ctmStart;
var m_ctmEnd;
function C_reactOnContextMenuFIELD(tt, pCC, pCCevent)
{
if (pCCevent != null && pCCevent.stopPropagation) pCCevent.stopPropagation();
if (pCC.CASA_contextmenumethod != null)
{
if ( m_ctm == null ) {
m_ctm = pCC;
m_ctmStart = m_ctm.selectionStart;
m_ctmEnd = m_ctm.selectionEnd;
}
tt.invokeMethodInModel(pCC.CASA_contextmenumethod);
return false;
}
}
function C_reactOnValueHelpFIELD(tt,pCC,pCCevent,hk)
{
if (pCC.CASA_autocompleteref!=null) return;
if (pCC.CASA_popupinputonly == 'true')
{
if (pCC.CASA_displayonly == 'true' || pCC.CASA_displayonly == true)
return false;
var s = null;
if (pCC.CASA_statusprop != null)
s = tt.getPropertyValue(pCC.CASA_statusprop);
if (s != null && (s == "DISPLAY" || s == "ERROR_DISPLAY"))
return false;
if (tt.getPropertyValue(pCC.CASA_valueprop) == null)
return false;
}
else if (pCC.tabIndex == -1 || (pCC.tabIndex == 0))
{
pCCevent.preventDefault();
return false;
}
if (pCCevent != null && pCCevent.stopPropagation) pCCevent.stopPropagation();
var valueTransferedIntoProperty = false;
if (pCC.value != null && pCC.value != pCC.CASA_lastControlValue)
{
var hasErrors = tt.transferAndConvertPropertyValueFIELD(pCC);
if (hasErrors == false)
{
pCC.CASA_hasValidationError = true;
tt.registerValidationError(pCC);
return;
}
valueTransferedIntoProperty = true;
}
tt.calculatePageOffset(pCC);
tt.m_leftFIELD = pCC.CASA_pageoffsetleft + pCC.scrollLeft-0;
tt.m_topFIELD = pCC.CASA_pageoffsettop;
tt.m_widthFIELD = pCC.offsetWidth;
tt.m_heightFIELD = pCC.offsetHeight;
tt.m_controlFIELD = pCC;
tt.m_userInputPOPUPVALUES = new String();
tt.m_valuehelpKeyCodeFIELD = null;
tt.m_flushMethodFIELD = pCC.CASA_flushmethod;
if (pCCevent != null && pCCevent.type.indexOf("mouse") == -1 && hk!=true)
{
var keyCode = pCCevent.keyCode;
if (pCCevent.which) keyCode = pCCevent.which;
if (keyCode >= 96 && keyCode <= 105)
{
keyCode -= 48;
}
if ( keyCode == 9 ||
(keyCode >= 16 && keyCode <= 20) ||
keyCode == 27 ||
keyCode == 33 ||
keyCode == 34 ||
keyCode == 38 ||
keyCode == 45 ||
(keyCode >= 91 && keyCode <= 93) ||
(keyCode >= 112 && keyCode <= 114) ||
keyCode == 116 ||
keyCode == 117 ||
(keyCode >= 119 && keyCode <= 123) ||
keyCode == 144 ||
keyCode == 145 )
{
tt.m_valuehelpKeyCodeFIELD = null;
return false;
}
else
{
if ( keyCode == 40 || keyCode == 115 || keyCode == 118 || keyCode == 32 || keyCode == 13)
tt.m_valuehelpKeyCodeFIELD = tt.m_userInputPOPUPVALUES = "";
else
tt.m_valuehelpKeyCodeFIELD = tt.m_userInputPOPUPVALUES = pCCevent.key;
}
}
tt.m_textidmodeFIELD = pCC.CASA_textidmode;
if (tt.m_textidmodeFIELD == undefined)
tt.m_textidmodeFIELD = tt.getPropertyValue("cISFIELDTextIdMode");
pCC.CASA_skipNextOnBlurValidation = true;
var dt = pCC.CASA_datatype;
if (pCC.CASA_popupmethod != null)
{
var callPopupMethod = true;
if (pCC.CASA_popupprop != null)
{
var popupPropValue = tt.getPropertyValue(pCC.CASA_popupprop);
if (popupPropValue == "false")
callPopupMethod = false;
}
var vMPADIV = tt.findMPADIV();
if (vMPADIV.style.display != "none" && pCC.CASA_autocallpopupmethod != "true")
{
tt.clickAway();
callPopupMethod = false;
}
if (callPopupMethod == true)
{
tt.setPropertyValue("param1",pCC.CASA_valueprop);
tt.setPropertyValue("param3",pCC.CASA_valuetextprop);
if (pCC.CASA_optarrayprop != null)
tt.setPropertyValue("cISAddons.optarrayprop",pCC.CASA_optarrayprop);
if (pCC.CASA_flushmethod != null)
tt.setPropertyValue("cISAddons.openIdValueHelpFlushMethod",pCC.CASA_flushmethod);
if (pCC.CASA_popupmethod == "openIdValueCombo")
pCC.style.cursor = "wait";
tt.invokeMethodInModel(pCC.CASA_popupmethod);
return false;
}
}
else if (pCC.CASA_touchpadinput == 'true')
{
if (dt == 'int' ||
dt == 'long' ||
dt == 'float')
tt.openTouchPadNumericFIELD(pCC);
else
tt.openTouchPadFIELD(pCC);
return false;
}
else if (dt != null && dt == "date")
{
tt.openDatePopupFIELD(pCC);
return false;
}
else if (dt != null && dt == "time")
{
tt.openTimePopupFIELD(pCC);
return false;
}
else if (dt != null && dt == "color")
{
tt.openColorPopupFIELD(pCC);
return false;
}
if ((valueTransferedIntoProperty == true) && (pCC.CASA_alwaysflush != "true"))
tt.flushFIELD(pCC);
return false;
}
function C_reactOnKeyDownFIELD(tt,evt)
{
if (tt.checkIOForNoSubmits() == false) return false;
var pCC = evt.currentTarget;
try { pCC.focus(); } catch (eexxcc) {}
if (pCC.name != "CC" &&
pCC.type != "password" &&
evt.keyCode == 13 &&
pCC.CASA_ENTERCOUNT == null)
{
tt.m_noProcessingForNextHotKey = true;
pCC.CASA_ENTERCOUNT = 1;
}
if (pCC.CASA_hotkeys != null)
{
var handled = tt.reactOnKeyDownHOTKEY(pCC,evt);
if (handled == true)
return false;
}
return C_reactOnKeyDownInternallyFIELD(tt,pCC,evt);
}
function C_reactOnKeyDownInternallyFIELD(tt,pCC,pCCevent)
{
var vKeyCode = pCCevent.keyCode;
if (pCCevent.CASA_keyCode != undefined)
vKeyCode = pCCevent.CASA_keyCode;
if (vKeyCode == 112)
{
if (pCC.CASA_helpid != undefined)
{
var vHelpId = pCC.CASA_helpid;
if (pCC.CASA_helpid == "$valueprop$") vHelpId = pCC.CASA_valueprop;
tt.setPropertyValue("param2",vHelpId);
tt.invokeMethodInModel("reactOnHelpRequestForHelpId");
}
pCCevent.returnValue = false;
return false;
}
if (vKeyCode == 35 || vKeyCode == 36 || vKeyCode == 37 || vKeyCode == 39) return true;
if (pCCevent.ctrlKey == true && vKeyCode==65 && !pCCevent.altKey) return true;
if (pCCevent.ctrlKey == true && vKeyCode==67) return true;
if (vKeyCode == 9) return true;
if (pCCevent.shiftKey == true && vKeyCode == 16) return true;
if (pCC.CASA_popupinputonly == 'true')
{
if (pCCevent.ctrlKey == true && vKeyCode==86) { pCCevent.returnValue = false; return false; }
if (pCCevent.ctrlKey == true && vKeyCode==88) { pCCevent.returnValue = false; return false; }
if (vKeyCode == 8) { pCCevent.returnValue = false; return false; }
if (vKeyCode == 46) { pCCevent.returnValue = false; return false; }
return tt.reactOnValueHelpFIELD(pCC,pCCevent);
}
C_notifySVPControls();
if (pCC.tabIndex == -1)
{
pCCevent.returnValue = false;
return false;
}
if (pCCevent.ctrlKey == true && vKeyCode != 86 ) return true;
if (vKeyCode == 115 || vKeyCode == 118)
{
var valuehelpkeys = tt.getPropertyValue("cISAddons.valueHelpKeys");
if (valuehelpkeys == null || valuehelpkeys == "" )
return tt.reactOnValueHelpFIELD(pCC);
}
if (vKeyCode == 40)
{
if (pCC.CASA_popuponalt40 == "true")
{
if (pCCevent.altKey == true)
{
pCCevent.stopPropagation();
return tt.reactOnValueHelpFIELD(pCC);
}
}
else
{
var vMPADIV = tt.findMPADIV();
if (vMPADIV.style.display != "none")
{
try { tt.selectLinePOPUPVALUES(vMPADIV,0,true); } catch (e) {}
return true;
}
var valuehelpkeys = tt.getPropertyValue("cISAddons.valueHelpKeys");
if (valuehelpkeys == null || valuehelpkeys == "" )
return tt.reactOnValueHelpFIELD(pCC);
}
}
tt.setTimeoutAutoCallPopupMethodFIELD(pCC,pCCevent);
return true;
}
function calcPageFeatures (dlgWidth, dlgHeight, resizable)
{
var pageFeatures='width='+dlgWidth+',height='+dlgHeight+',status=no,resizable='+resizable;
var innerWidth = parent.innerWidth;
var innerHeight = parent.innerHeight;
var posX = (innerWidth-dlgWidth)/2;
if (window.screenX) posX += window.screenX;
pageFeatures += ',left='+posX+'px';
var posY = (innerHeight-dlgHeight)/2;
if (window.screenY)
{
var browserFrameHeight = (top.outerHeight - top.innerHeight)/2;
posY += window.screenY + browserFrameHeight;
}
pageFeatures += ',top='+posY+'px';
return pageFeatures;
}
function C_openDatePopupFIELD(tt,pCC)
{
if (tt.checkIOForNoSubmits() == false) return false;
tt.m_retccFIELD = pCC;
var vParameters = [];
var vDate = tt.getPropertyValue(pCC.CASA_valueprop);
if (vDate != null && vDate.length == 8)
{
vParameters[0] = vDate.substr(0,4);
vParameters[1] = vDate.substr(4,2);
vParameters[2] = vDate.substr(6,2);
}
else
{
vParameters[0] = null;
vParameters[1] = null;
vParameters[2] = null;
}
vParameters[3] = tt.parent.parent.CasaSTYLESHEET;
vParameters[4] = tt.m_dateDisplay;
vParameters[5] = tt.m_direction;
vParameters[6] = tt.m_americanStyle;
if (tt.m_americanStyle == null ||
tt.m_americanStyle == "null" ||
tt.m_americanStyle == "")
{
if (tt.m_dateDisplay == "MM/DD/YYYY" || tt.m_dateDisplay == "MM/DD/YY")
vParameters[6] = "SU";
}
tt.casaPopupParameters = vParameters;
casaPopupReturnValue = null;
pageFeatures = calcPageFeatures (265,220,true);
var vWindow = tt.parent.open('../HTMLBasedGUI/general/calendarpage_'+tt.m_language+'.html','_blank',pageFeatures);
tt.registerPopupPage(vWindow, true);
}
function C_transferDatePopupRetValFIELD(tt,pretval)
{
if (tt.m_retccFIELD == null) alert("FIELD.transferDatePopupRetVal: Should never happen!");
vDate = "";
vDate = vDate + pretval[0];
if (pretval[1]<10) vDate = vDate + '0';
vDate = vDate + (pretval[1]*1);
if (pretval[2]<10) vDate = vDate + '0';
vDate = vDate + (pretval[2]*1);
tt.m_retccFIELD.value = tt.convertYYYYMMDDIntoDisplayString(vDate);
tt.transferChangeFIELD(tt.m_retccFIELD,true,"blur",true);
}
function C_openTimePopupFIELD(tt,pCC)
{
if (tt.checkIOForNoSubmits() == false) return false;
tt.m_retccFIELD = pCC;
vParameters = [];
var vTime = tt.getPropertyValue(pCC.CASA_valueprop);
if (vTime != null && vTime.length == 6)
{
vParameters[0] = vTime.substr(0,2);
vParameters[1] = vTime.substr(2,2);
vParameters[2] = vTime.substr(4,2);
}
else
{
vParameters[0] = null;
vParameters[1] = null;
vParameters[2] = null;
}
vParameters[3] = tt.parent.parent.CasaSTYLESHEET;
vParameters[4] = tt.m_direction;
tt.casaPopupParameters = vParameters;
pageFeatures = calcPageFeatures (250,130,false);
var vWindow = tt.parent.open('../HTMLBasedGUI/general/timepage_'+tt.m_language+'.html',
'_blank',
pageFeatures);
tt.registerPopupPage(vWindow, true);
}
function C_transferTimePopupRetValFIELD(tt,rValue)
{
if (rValue != null)
{
vTime = '';
if (rValue[0]<10) vTime = vTime + '0';
vTime = vTime + (rValue[0]*1);
if (rValue[1]<10) vTime = vTime + '0';
vTime = vTime + (rValue[1]*1);
if (rValue[2]<10) vTime = vTime + '0';
vTime = vTime + (rValue[2]*1);
tt.m_retccFIELD.value = tt.convertHHMMSSIntoDisplayString(vTime);
tt.transferChangeFIELD(tt.m_retccFIELD,true,"blur",true);
}
}
function C_openColorPopupFIELD(tt,pCC)
{
if (tt.checkIOForNoSubmits() == false) return false;
tt.m_retccFIELD = pCC;
vParameters = [];
var vColor = tt.getPropertyValue(pCC.CASA_valueprop);
if (vColor != null && vColor.length == 7)
vParameters[0] = vColor;
else
vParameters[0] = null;
tt.casaPopupParameters = vParameters;
pageFeatures = calcPageFeatures (390,340,false);
var vWindow = tt.parent.open('../HTMLBasedGUI/general/colorpage.html',
'_blank',
pageFeatures);
tt.registerPopupPage(vWindow, true);
}
function C_openTouchPadNumericFIELD(tt,pCC)
{
if (tt.checkIOForNoSubmits() == false) return false;
tt.m_casacontrol = pCC;
var vParameters = [];
vParameters[0] = pCC.value;
vParameters[1] = pCC.CASA_datatype;
vParameters[2] = tt.m_decimalSeparator;
vParameters[3] = tt.checkIfValueHasError;
vParameters[4] = tt.parent.parent.CasaSTYLESHEET;
tt.casaPopupParameters = vParameters;
pageFeatures = calcPageFeatures (256,505,false);
var vWindow = tt.parent.open('../HTMLBasedGUI/general/touchpadnumeric_'+tt.m_language+'.html',
'_blank',
pageFeatures);
tt.registerPopupPage(vWindow, true);
}
function C_openTouchPadFIELD(tt,pCC)
{
if (tt.checkIOForNoSubmits() == false) return false;
tt.m_casacontrol = pCC;
var vParameters = [];
vParameters[0] = pCC.value;
vParameters[1] = tt.parent.parent.CasaSTYLESHEET;
tt.casaPopupParameters = vParameters;
pageFeatures = calcPageFeatures (737,380,false);
var vWindow = tt.parent.open('../HTMLBasedGUI/general/touchpad_'+tt.m_language+'.html',
'_blank',
pageFeatures);
tt.registerPopupPage(vWindow, true);
}
function C_decorateInputFieldOnError(pCC)
{
pCC.style.color = "#FF0000";
pCC.style.borderColor = "#FF0000";
pCC.style.borderWidth = "2px";
}
function C_reactOnSpinFIELD(tt,pCC,evt,up)
{
var v = ""+pCC.value;
if (v == null || v == "") v = "0";
v = v.replace(/\./g,"");
v = v.replace(/\,/g,"");
v = -1*v*-1;
if (up) v+=1;
else v-=1;
if (v > pCC.CASA_spinrangemax) v = pCC.CASA_spinrangemin;
if (v < pCC.CASA_spinrangemin) v = pCC.CASA_spinrangemax;
pCC.value = v;
tt.transferChangeFIELD(pCC,false);
}
