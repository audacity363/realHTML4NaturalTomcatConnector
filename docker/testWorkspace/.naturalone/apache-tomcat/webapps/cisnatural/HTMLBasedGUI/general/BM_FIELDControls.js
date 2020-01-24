function addVersionInfoBM_FIELDCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_FIELDCONTROLS');
}
function iccFFIELD(cc,romumethod,rfmethod,valueprop,datatype,editmask,alwaysflush,flush,flushmethod,flushindexprop,displayonly,titleprop,hotkeys,
maxlength,autotab,uppercase,autocompleteref,autocompletedisplayname,autocompletedisplayref,
decimaldigitsprop,digitsprop,decimaldigits,digits,visibleprop,invisiblemode,statusprop,validationmessage)
{
cc.onblur = rfmethod;
cc.onfocus = rfmethod;
cc.onchange = rfmethod;
cc.onkeydown = rfmethod;
cc.onkeyup = rfmethod;
addFocusable(cc,true);
registerPropertyListener(romumethod,valueprop,cc.id);
registerPropertyListener(romumethod,titleprop,cc.id);
registerPropertyListener(romumethod,decimaldigitsprop,cc.id);
registerPropertyListener(romumethod,digitsprop,cc.id);
registerPropertyListener(romumethod,visibleprop,cc.id);
registerPropertyListener(romumethod,statusprop,cc.id);
cc.CASA_valueprop = valueprop;
if (datatype != null) cc.CASA_datatype = datatype;
if (editmask !=null) cc.CASA_editmask = editmask;
if (displayonly != null) cc.CASA_displayonly = displayonly;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (hotkeys != null) iccHOTKEY(cc, hotkeys);
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
cc.CASA_mlobject = new Object();
if (validationmessage != null)
{
cc.CASA_mlobject.value = validationmessage;
addMLValue(cc.CASA_mlobject);
}
else cc.CASA_mlobject.value = "Invalid value";
cc.CASA_lastControlValue = undefined;
cc.CASA_lastDir = null;
cc.CASA_lastTitle = undefined;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (flushindexprop != null) cc.CASA_flushindexprop = flushindexprop;
if (alwaysflush != null) cc.CASA_alwaysflush = alwaysflush;
if (maxlength != null) cc.CASA_maxlength = maxlength;
if (autotab != null) cc.CASA_autotab = autotab;
if (uppercase != null) cc.CASA_uppercase = uppercase;
if (decimaldigitsprop != null) cc.CASA_decimaldigitsprop = decimaldigitsprop;
if (decimaldigits != null) cc.CASA_decimaldigits = decimaldigits;
if (digits != null) cc.CASA_digits = digits;
if (digitsprop != null) cc.CASA_digitsprop = digitsprop;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (autocompletedisplayname!=null) cc.CASA_autocompletedisplayname = autocompletedisplayname;
if (autocompletedisplayref!=null) cc.CASA_autocompletedisplayref = autocompletedisplayref;
if (autocompleteref!=null)
{
cc.CASA_autocompleteref = autocompleteref;
var vCCs = parent.document.getElementsByName(autocompleteref);
if (vCCs.length > 0)
{
registerPropertyListener(romumethod,vCCs[0].CASA_autocomplete.sourcelocationprop ,cc.id);
registerPropertyListener(romumethod,vCCs[0].CASA_autocomplete.sourceprop ,cc.id);
}
}
}
function romuFFIELD(cc, pEnforceUpdate)
{
if (cc.CASA_autocompleteref!=null)
{
var vCCs = parent.document.getElementsByName(cc.CASA_autocompleteref);
if (vCCs.length > 0)
{
vCCs[0].CASA_autocomplete.updateautocomplete (cc);
}
}
var v = getPropertyValue(cc.CASA_valueprop); ;
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
if (m_direction == 'rtl')	cc.style.backgroundPosition = 'left';
else  	cc.style.backgroundPositionX = 'right';
cc.CASA_lastDir = m_direction;
}
if (cc.CASA_datatype)
{
var dt = cc.CASA_datatype;
if      (dt == "date") v = convertYYYYMMDDIntoDisplayString(v);
else if (dt == "time") v = convertHHMMSSIntoDisplayString(v);
else if (dt == "timestamp") v = convertYYYYMMDDHHMMSSMMMIntoDisplayString(v);
else if (dt == "float") v = convertFLOATIntoDisplayString(v,decimalDigitsFloat);
else if (dt == "int" || dt == "long" ) v = convertINTIntoDisplayString(v);
else if (dt == "emtype") try { v = convertIntoDisplayStringEDITMASK(this,v , cc); } catch(ex) {}
}
cc.value = v;
cc.readOnly = false;
cc.CASA_lastControlValue = cc.value;
if (cc.CASA_displayonly == 'true' ) cc.readOnly = true;
handleVisibleprop(cc);
handleStatusprop(cc);
}
function reactFFIELD(evt)
{
return reactFFIELDInternal(evt);
}
function reactFFIELDInternal(evt)
{
if(CL() == null) return;
else if (evt.type == "keydown") return reactOnKeyDownFFIELD(evt.currentTarget,evt);
else if (evt.type == "keyup") return reactOnKeyUpFFIELD(evt.currentTarget,evt);
else if (evt.type == "change") return transferChangeFFIELD(evt.currentTarget,"change");
else if (evt.type == "blur") return transferChangeFFIELD(evt.currentTarget,"blur");
else if (evt.type == "focus") return reactOnFocusFFIELD(evt.currentTarget);
}
function doOnInvalid(cc)
{
if ( cc==null ) return;
if ( cc.CASA_mlobject == null ) return;
cc.setCustomValidity(cc.CASA_mlobject.value);
}
function reactOnKeyDownFFIELD(cc,evt)
{
if (checkIOForNoSubmits() == false) return false;
try { cc.focus(); } catch (eexxcc) {}
if (evt.keyCode == 112)   return false;
return true;
}
function reactOnKeyUpFFIELD(cc,evt)
{
var currentLength = cc.value.length;
if( currentLength == cc.maxLength &&
(cc.CASA_autotab == "true") &&
currentLength == C_getSelectionStart(cc))
{
this.focusNextTabInput(cc);
this.clickAway();
}
return true;
}
function C_getSelectionStart(cc)
{
if (typeof cc.selectionStart == "number")
return cc.selectionStart;
}
function reactOnFocusFFIELD(cc)
{
CL().C_regFocusInfo(cc);
return true;
}
function transferChangeFIELD(cc,pClearFocusInfo,caller)
{
transferChangeFFIELD(cc,caller);
return true;
}
function transferChangeFFIELD(cc,caller)
{
if(caller == "blur") CL().C_unregFocusInfo(cc);
if (checkIOForNoSubmits() == false) return false;
if (cc.tabIndex == -1) return false;
var transferedPCC = transferPropertyValueFFIELD(cc);
if (cc.CASA_flush=="screen" && transferedPCC == cc)
{
flushIfDesiredFFIELD(cc);
}
else if ((cc.CASA_alwaysflush == "true" && caller == "blur") ||
((cc.CASA_flushmethod != undefined || cc.CASA_flush!=undefined) && cc.CASA_alwaysflush != "true" && transferedPCC == cc))
{
flushFFIELD (cc);
}
return true;
}
function handleVisibleprop(cc)
{
if (cc.CASA_visibleprop == null || CL().isEditorPreview()) return;
var vv = getPropertyValue(cc.CASA_visibleprop);
var div = cc.parentNode;
if (vv == "true")
{
cc.readOnly = false;
div.style.display="";
div.style.visibility="";
}
else
{
if (cc.CASA_invisiblemode == "invisible")
{
div.style.display = "none";
div.style.visibility= "";
}
else if (cc.CASA_invisiblemode == "cleared")
{
div.style.visibility= "hidden";
div.style.display = "";
}
else if (cc.CASA_invisiblemode == "disabled")
{
cc.readOnly = true;
div.style.display = "";
div.style.visibility= "";
}
}
}
function handleStatusprop(cc)
{
if (cc.CASA_statusprop != null)
{
var div = cc.parentNode;
if (cc.CASA_initdivclass == undefined) cc.CASA_initdivclass = div.className;
div.className=cc.CASA_initdivclass;
var s = getPropertyValue(cc.CASA_statusprop);
if (s == "ERROR" || s == "FOCUS") addFocusRequestor(cc);
if ( s == "ERROR" || s == "ERROR_NO_FOCUS" ) div.className = div.className + " has-error";
else if (s == "WARNING") div.classNames= div.className + " has-warning has-feedback";
else if (s == "SUCCESS") div.className= div.className + " has-success has-feedback";
}
}
var m_flushCC = null;
function rtaFlushFFIELD()
{
if(m_flushCC != null)
{
if (m_flushCC.CASA_flushTimeoutId != null)
window.clearTimeout(m_flushCC.CASA_flushTimeoutId);
flushIfDesiredFFIELD(m_flushCC, "blur");
m_flushCC = null;
}
}
function flushFFIELD (cc)
{
CL().C_saveCurrFocusInfo(cc);
m_flushCC = cc;
cc.CASA_flushTimeoutId = window.setTimeout("rtaFlushFFIELD()", 20);
}
function flushIfDesiredFFIELD(pCC,eventType)
{
if(CL() == null)
return;
CL().C_flushIfDesiredFIELD(this,pCC,eventType);
}
function transferPropertyValueFFIELD(cc)
{
if (cc.value == null || cc.value == cc.CASA_lastControlValue)
{
cc.CASA_skipNextOnBlurValidation = false;
return;
}
var convVal = cc.value;
var decimalDigitsFloat = -1;
if (cc.CASA_decimaldigits != null)
decimalDigitsFloat = cc.CASA_decimaldigits;
if (cc.CASA_decimaldigitsprop != null)
decimalDigitsFloat = getPropertyValue(cc.CASA_decimaldigitsprop);
var digitsFloat = -1;
if (cc.CASA_digits != null)
digitsFloat = cc.CASA_digits;
if (cc.CASA_digitsprop != null)
digitsFloat = getPropertyValue(cc.CASA_digitsprop);
if (cc.CASA_datatype != null)
{
if (cc.CASA_datatype == "float" || cc.CASA_datatype == "int")
{
convVal = CL().C_remove1000Separators(this,convVal,decimalDigitsFloat);
if (this.checkIf1000SeparatorsHasError(convVal) == true)
{
cc.value = convVal;
doOnInvalid(cc);
cc.CASA_lastControlValue = convVal;
return false;
}
}
if (cc.CASA_datatype == "emtype")
{
try
{
convVal = this.convertValueEDITMASK(this, convVal, cc);
if (this.checkIfValueHasErrorEDITMASK(this, convVal, cc) == true )
{
cc.value = convVal;
doOnInvalid(cc);
cc.CASA_lastControlValue = convVal;
return false;
}
} catch(ex) {}
}
else
{
convVal = this.convertValue(convVal,cc.CASA_datatype,decimalDigitsFloat);
if (this.checkIfValueHasError(convVal,cc.CASA_datatype,decimalDigitsFloat,digitsFloat) == true)
{
cc.value = convVal;
doOnInvalid(cc);
cc.CASA_lastControlValue = convVal;
return false;
}
}
}
if (cc.CASA_datatype == "timestamp")  convVal= this.convertDisplayStringIntoYYYYMMDDHHMMSSMMM(convVal);
var vPCOK = true;
if (cc.CASA_datatype != null && convVal != null && convVal != "")
{
if (cc.CASA_datatype == "date") { vPCOK = CL().C_checkDateVALIDATION(convVal,true); }
if (cc.CASA_datatype == "time") { vPCOK = CL().C_checkTimeVALIDATION(convVal); }
if (vPCOK == false)
{
doOnInvalid(cc);
cc.CASA_lastControlValue = cc.value;
return false;
}
}
if (cc.CASA_datatype == "float") value = this.convertDisplayStringIntoFLOAT(convVal);
var dt = cc.CASA_datatype;
if (decimalDigitsFloat < 0) decimalDigitsFloat = 0;
if (dt == "float") cc.value = this.convertFLOATIntoDisplayString(convVal,decimalDigitsFloat);
if (dt == "int" || dt == "long") cc.value = this.convertINTIntoDisplayString(convVal);
if (dt == "date") cc.value = this.convertYYYYMMDDIntoDisplayString(convVal);
if (dt == "time") cc.value = this.convertHHMMSSIntoDisplayString(convVal);
if (dt == "timestamp") cc.value = tt.convertYYYYMMDDHHMMSSMMMIntoDisplayString(convVal);
if (dt == "emtype") try { cc.value = this.convertIntoDisplayStringEDITMASK(this,convVal,cc); } catch(ex) {}
this.setPropertyValue(cc.CASA_valueprop,convVal);
cc.CASA_lastControlValue = cc.value;
cc.setCustomValidity("");
return cc;
}
