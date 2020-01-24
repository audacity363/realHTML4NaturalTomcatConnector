function addVersionInfoDATEINPUT2CONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('DATEINPUT2CONTROLS');
}
var lang_map = new Object();
lang_map["en"] = "en";
lang_map["de"] = "de";
lang_map["ja"] = "ja";
lang_map["he"] = "he";
lang_map["da"] = "da";
lang_map["3"] = "fr";
lang_map["4"] = "es";
lang_map["5"] = "it";
lang_map["8"] = "da";
lang_map["11"]="pt";
lang_map["33"] = "he";
lang_map["28"] = "ja";
function iccDI2(cc,romumethod,rfmethod,valueprop,flush,flushmethod,datatype,displayonly,statusprop,
titleprop,helpid,cti,tabindex,invisiblemode,fromprop,toprop,popupicon,popuponalt40,
popuponF4F7,numberofmonths,holidaysstyleclass,holidaysurl,holidaysurlprop,holidaysdescriptionastooltip,bm)
{
cc.onblur = rfmethod;
cc.onfocus = rfmethod;
cc.onchange = rfmethod;
cc.onkeydown = rfmethod;
addFocusable(cc,true);
startFocusCell(cc);
registerPropertyListener(romumethod,valueprop,cc.id);
registerStatusPropertyListener(romumethod,statusprop,cc.id,cc);
registerPropertyListener(romumethod,fromprop,cc.id);
registerPropertyListener(romumethod,toprop,cc.id);
registerPropertyListener(romumethod,titleprop,cc.id);
registerPropertyListener(romumethod,"dateDisplay",cc.id);
cc.CASA_valueprop = valueprop;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (fromprop != null) cc.CASA_fromprop = fromprop;
if (toprop != null) cc.CASA_toprop = toprop;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (datatype != null) cc.CASA_datatype = datatype; else cc.CASA_datatype = "date";
if (displayonly != null) cc.CASA_displayonly = displayonly;
if (popuponalt40 != null) cc.CASA_popuponalt40 = popuponalt40;
if (popuponF4F7 != null) cc.CASA_popuponF4F7 = popuponF4F7;
if (numberofmonths == null) cc.CASA_numberofmonths = 1;
else cc.CASA_numberofmonths = parseInt(numberofmonths);
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (helpid != null) cc.CASA_helpid = helpid;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (popupicon != null) cc.CASA_popupicon = popupicon;
else cc.CASA_popupicon = "../HTMLBasedGUI/images/fieldcombo.gif";
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (holidaysstyleclass != null) cc.CASA_holidaysstyleclass = holidaysstyleclass;
else cc.CASA_holidaysstyleclass = "";
if (holidaysurl != null) cc.CASA_holidaysurl = holidaysurl;
else cc.CASA_holidaysurl = "";
if (holidaysurlprop != null) cc.CASA_holidaysurlprop = holidaysurlprop;
else cc.CASA_holidaysurlprop = "";
if (holidaysdescriptionastooltip != null) cc.CASA_holidaysdescriptionastooltip = holidaysdescriptionastooltip;
else cc.CASA_holidaysdescriptionastooltip = false;
cc.CASA_lastValue = undefined;
cc.CASA_lastStatus = undefined;
cc.CASA_lastControlValue = undefined;
cc.CASA_lastDir = null;
cc.CASA_td = cc.parentNode;
cc.CASA_lastTitle = undefined;
cc.CASA_bm = bm;
cc.CASA_bmskip = false;
cc.CASA_holidaysdata = "";
cc.CASA_first = true;
}
function getPickerDate(date)
{
var ymd=(date.getMonth()+1);
if(date.getMonth()<9)
ymd="0"+ymd;
if(date.getDate()<10)
ymd+="0";
ymd+=""+date.getDate();
ymd=""+(date.getFullYear())+ymd;
return(ymd);
}
function getHoliDate(date, holiDateFormat)
{
if (holiDateFormat == "yymmdd")
{
return(date);
}
}
function setDateFormatDI2(cc)
{
var dtform= "yy-mm-dd";
if (m_dateDisplay=="DD/MM/YYYY") dtform="dd/mm/yy";
else if (m_dateDisplay=="MM/DD/YYYY") dtform="mm/dd/yy";
else if (m_dateDisplay=="DD.MM.YYYY") dtform="dd.mm.yy";
else if (m_dateDisplay=="YYYY/MM/DD") dtform="yy/mm/dd";
parent.$("#"+cc.id).datepicker("option", "dateFormat", dtform);
}
function romuDI2(cc, pEnforceUpdate)
{
if (cc.CASA_first == true)
{
parent.$("#"+cc.id).datepicker({
dateFormat: "yy-mm-dd",
showButtonPanel: false,
changeMonth: true,
changeYear: true,
yearRange: "1582:2699",
numberOfMonths: cc.CASA_numberofmonths,
onClose: function ()
{
if (cc.CASA_bm == "true" ) cc.CASA_bmskip = true;
this.focus();
},
beforeShow: function(i)
{
if (cc.CASA_bmskip) { cc.CASA_bmskip = false; return false;}
if (parent.$(i).attr('readonly')) { return false; }
var fdiw = getPropertyValue("fdiw");
if (fdiw!=null && fdiw=="SU")
parent.$("#"+cc.id).datepicker("option", "firstDay", 0);
else
parent.$("#"+cc.id).datepicker("option", "firstDay", 1);
},
beforeShowDay: function(date) {
if (cc.CASA_holidaysurlprop != "")
{
var vholidaysurl = getPropertyValue(cc.CASA_holidaysurlprop);
if (vholidaysurl != null && vholidaysurl != "")
{
if (cc.CASA_holidaysurl != vholidaysurl && vholidaysurl != "")
{
cc.CASA_holidaysurl = vholidaysurl;
cc.CASA_holidaysdata="";
parent.$.getJSON(cc.CASA_holidaysurl, function(data, status, xhr){
if (data != null && data != "")
cc.CASA_holidaysdata=data;
});
}
}
}
else{
if (cc.CASA_holidaysurl != "")
{
cc.CASA_holidaysdata="";
parent.$.getJSON(cc.CASA_holidaysurl, function(data, status, xhr){
if (data!=null && data!="")
cc.CASA_holidaysdata=data;
});
cc.CASA_holidaysurl = "";
}
}
if (cc.CASA_holidaysdata.length > 0)
{
var pickerDate=getPickerDate(date);
var holidaysFormat="yymmdd";
var compDate="";
for (var i=0; i<cc.CASA_holidaysdata.length; i++) {
compDate=getHoliDate(cc.CASA_holidaysdata[i].date, holidaysFormat);
if (compDate.substring(0, 4) == "9999")
compDate=date.getFullYear()+compDate.substring(4, 8);
if (compDate==pickerDate)
if (cc.CASA_holidaysdescriptionastooltip=="true")
return [true,cc.CASA_holidaysstyleclass,cc.CASA_holidaysdata[i].description];
else
return [true,cc.CASA_holidaysstyleclass,""];
};
}
return [true,"",""];
}
});
if (cc.CASA_displayonly!="true" && cc.CASA_bm!="true"){
parent.$("#"+cc.id).datepicker( "option", "buttonImage", cc.CASA_popupicon );
parent.$("#"+cc.id).datepicker( "option", "buttonImageOnly", true );
parent.$("#"+cc.id).datepicker( "option", "showOn","button");
}
parent.$("#"+cc.id).datepicker().unbind('focus').dblclick(function() {
parent.$("#"+cc.id).datepicker('show');
});
cc.CASA_first = false;
}
if (m_language!="en"){
var url = "../HTMLBasedGUI/jquery/jquery-ui-i18n.min.js";
parent.$.getScript( url, function() {
setDI2Language(cc);
contromuDI2(cc, pEnforceUpdate);
});
}
if ( cc.CASA_fromprop != null ) {
var fromval = getPropertyValue(cc.CASA_fromprop);
if (fromval != cc.CASA_fromval_old && fromval.length == 8) {
var fyr = parseInt(fromval.substring(0,4));
var fmo = parseInt(fromval.substring(4,6)) - 1;
var fdy = parseInt(fromval.substring(6,8));
parent.$("#"+cc.id).datepicker( "option", "minDate", new Date(fyr,fmo,fdy) );
cc.CASA_fromval_old = fromval;
}
}
if ( cc.CASA_toprop != null ) {
var toval = getPropertyValue(cc.CASA_toprop);
if (toval != cc.CASA_toval_old) {
var tyr = parseInt(toval.substring(0,4));
var tmo = parseInt(toval.substring(4,6)) - 1;
var tdy = parseInt(toval.substring(6,8));
parent.$("#"+cc.id).datepicker( "option", "maxDate", new Date(tyr,tmo,tdy) );
cc.CASA_toval_old = toval;
}
}
contromuDI2(cc, pEnforceUpdate);
}
function setDI2Language (cc)
{
parent.$("#"+cc.id).datepicker( "option", parent.$.datepicker.regional[ lang_map[m_language] ] );
}
function setClassDI2(cc, className)
{
var hasDatepicker = parent.$("#"+cc.id).hasClass("hasDatepicker");
if (cc.CASA_bm == "true") return;
if (cc.className != className)
{
cc.className = className;
if (hasDatepicker)
{
parent.$("#"+cc.id).addClass("hasDatepicker");
}
}
}
function contromuDI2(cc, pEnforceUpdate)
{
setDateFormatDI2(cc);
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
setClassDI2(cc,"FIELDInputNull");
return;
}
else
{
cc.value = v;
cc.readOnly = false;
if ( cc.CASA_bm != "true" )	applyCasaTabIndex(cc, "DATEINPUT2");
}
cc.CASA_lastControlValue = cc.value;
if (cc.CASA_displayonly == 'true' && (s == null || s == ""))
{
cc.tabIndex = -1;
cc.readOnly = true;
s = "DISPLAY";
setClassDI2(cc,"FIELDInputDisplay");
}
else if (s == null)
{
setClassDI2(cc,"FIELDInputEdit");
}
else
{
if (s == "EDIT" || s == "FOCUS" || s == "FOCUS_NO_SELECT")
{
setClassDI2(cc,"FIELDInputEdit");
}
else if (s == "DISPLAY")
{
cc.tabIndex = -1;
cc.readOnly = true;
setClassDI2(cc,"FIELDInputDisplay");
}
else if (s == "ERROR_DISPLAY")
{
cc.tabIndex = -1;
cc.readOnly = true;
setClassDI2(cc,"FIELDInputError");
}
else if (s == "ERROR" || s == "ERROR_NO_FOCUS")
{
setClassDI2(cc,"FIELDInputError");
}
else if (s == "INVISIBLE")
{
if (cc.CASA_td != null)
{
if (cc.CASA_invisiblemode == undefined || cc.CASA_invisiblemode == "invisible" )
cc.CASA_td.style.display = "none";
if (cc.CASA_invisiblemode == "cleared")
cc.CASA_td.style.visibility = "collapse";
}
else setClassDI2(cc,"FIELDInputInvisible");
}
else
{
setClassDI2(cc,"FIELDInputEdit");
}
if ( (cc.CASA_td != null) && (s!="INVISIBLE"))
{
cc.CASA_td.style.display = "";
cc.CASA_td.style.visibility = "";
}
}
}
function reactDI2(evt)
{
return reactDI2Internal(evt);
}
function reactDI2Internal(evt)
{
if(CL() == null) return;
if (evt.type == "keydown") return reactOnKeyDownDI2(evt);
else if (evt.type == "change") return transferChangeDI2(evt.target,"change");
else if (evt.type == "blur") return transferChangeDI2(evt.target,"blur");
else if (evt.type == "focus") return reactOnFocusDI2(evt.target);
}
function reactOnKeyDownDI2(evt)
{
var cc = evt.target;
if (cc.CASA_bm == "true")
{
if ((evt.keyCode != 9) && (evt.keyCode != 13) && (evt.keyCode != 27))
{
evt.preventDefault();
evt.stopPropagation();
cc.CASA_bmskip = false;
parent.$("#"+cc.id).datepicker("show");
}
return;
}
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
{
if ( cc.CASA_popuponF4F7 == undefined || cc.CASA_popuponF4F7 == "true" ) {
CL().cancelEvent(evt);
parent.$("#"+cc.id).datepicker("show");
return;
}
}
if (vKeyCode == 40)
{
if (cc.CASA_popuponalt40 == "true")
{
if (evt.altKey == true)
{
CL().cancelEvent(evt);
parent.$("#"+cc.id).datepicker("show");
return;
}
}
else
{
CL().cancelEvent(evt);
parent.$("#"+cc.id).datepicker("show");
}
}
return true;
}
function reactOnFocusDI2(cc)
{
CL().C_regFocusInfo(cc);
return true;
}
function transferChangeDI2(cc,caller)
{
if(caller == "blur") CL().C_unregFocusInfo(cc);
cc.CASA_bmskip = false;
if (checkIOForNoSubmits() == false) return false;
if (cc.tabIndex == -1) return false;
transferPropertyValueDI2(cc,caller);
return true;
}
function transferPropertyValueDI2(cc,caller)
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
resetValidationErrorDI2(cc);
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
resetValidationErrorDI2(cc);
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
function resetValidationErrorDI2(cc)
{
cc.style.color = "";
cc.style.borderColor = "";
cc.style.borderWidth = "";
cc.CASA_hasValidationError = false;
cc.CASA_valErrors = [];
romuDI2(cc, true);
}
