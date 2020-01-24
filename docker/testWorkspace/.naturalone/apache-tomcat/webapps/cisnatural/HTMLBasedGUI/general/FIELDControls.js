function addVersionInfoFIELDCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('FIELDCONTROLS');
}
var m_leftFIELD;
var m_topFIELD;
var m_widthFIELD;
var m_heightFIELD;
var m_controlFIELD;
var m_valuehelpKeyCodeFIELD;
function flexCreateControlFIELD(params) { return CL().C_flexCreateControlFIELD(this,params); }
function flexRemoveFIELD(vid)
{
parent[vid].CASA_td = null;
parent[vid] = undefined;
parent["romu"+vid] = undefined;
parent["rf"+vid] = undefined;
removePropertyListener(vid);
}
function iccFIELD(cc,romumethod,rfmethod,valueprop,valuetextprop,statusprop,flush,flushmethod,flushindexprop,popupmethod,popupprop,
datatype,displayonly,helptext,uppercase,validation,validationprop,
keybwithdindisplaystatus,helpid,decimaldigitsprop,optarrayprop,
validationuserhint,textidmode,popupinputonly,touchpadinput,titleprop,
popuponalt40,validationuserhintprop,bgcolorprop,cti,tabindex,invisiblemode,
popupicon,decimaldigits,popupcombowidth,hopsfromcontroltocell,fgcolorprop,maxlengthprop,
hotkeys,autocallpopupmethod,validationrules,formula,isEditorPreview,digits,digitsprop,
takeoutFieldPopupIcon,autocallpopupmethodoffset,displayprop,editmask, alwaysflush, autotab, lengthprop,
contextmenumethod, isnatpage, autocompleteref, autocompletedisplayname, autocompletedisplayref, stylevariant)
{
cc.onfocus = rfmethod;
cc.onblur = rfmethod;
cc.onchange = rfmethod;
cc.onkeydown = rfmethod;
cc.onkeyup = rfmethod;
cc.onkeypress = rfmethod;
cc.onmouseup = rfmethod;
cc.onmousedown = rfmethod;
cc.ondrop = rfmethod;
if (!isEditorPreview)
cc.oncontextmenu = rfmethod;
addFocusable(cc,true);
startFocusCell(cc);
cc.tabIndex = 0;
registerPropertyListener(romumethod,valueprop,cc.id);
registerPropertyListener(romumethod,valuetextprop,cc.id);
registerStatusPropertyListener(romumethod,statusprop,cc.id,cc);
registerPropertyListener(romumethod,popupprop,cc.id);
registerPropertyListener(romumethod,validationprop,cc.id);
registerPropertyListener(romumethod,decimaldigitsprop,cc.id);
registerPropertyListener(romumethod,optarrayprop,cc.id);
registerPropertyListener(romumethod,titleprop,cc.id);
registerPropertyListener(romumethod,bgcolorprop,cc.id);
registerPropertyListener(romumethod,fgcolorprop,cc.id);
registerPropertyListener(romumethod,maxlengthprop,cc.id);
registerPropertyListener(romumethod,lengthprop,cc.id);
registerPropertyListener(romumethod,displayprop ,cc.id);
if (datatype == "date"){
registerPropertyListener(romumethod,"dateDisplay",cc.id);
if (isnatpage=='true') cc.CASA_isnatPage = true;
}
if (datatype == "time") registerPropertyListener(romumethod,"timeDisplay",cc.id);
cc.CASA_valueprop = valueprop;
if (contextmenumethod != null ) cc.CASA_contextmenumethod = contextmenumethod;
if (valuetextprop != null) cc.CASA_valuetextprop = valuetextprop;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (flushindexprop != null) cc.CASA_flushindexprop = flushindexprop;
if (popupmethod != null) cc.CASA_popupmethod = popupmethod;
if (popupicon != null) cc.CASA_popupicon = popupicon;
if (popupprop != null) cc.CASA_popupprop = popupprop;
if (datatype != null) cc.CASA_datatype = datatype; else cc.CASA_datatype = undefined;
if (displayonly != null) cc.CASA_displayonly = displayonly;
if (helptext != null) cc.CASA_helptext = helptext;
if (uppercase != null) cc.CASA_uppercase = uppercase;
if (validation != null) cc.CASA_validation = validation;
if (validationprop != null) cc.CASA_validationprop = validationprop;
if (keybwithdindisplaystatus != null) cc.CASA_keybwithdindisplaystatus = keybwithdindisplaystatus;
if (helpid != null) cc.CASA_helpid = helpid;
if (decimaldigitsprop != null) cc.CASA_decimaldigitsprop = decimaldigitsprop;
if (optarrayprop != null) cc.CASA_optarrayprop = optarrayprop;
if (validationuserhint != null) cc.CASA_validationuserhint = validationuserhint;
if (textidmode != null) cc.CASA_textidmode = textidmode;
if (popupinputonly != null) cc.CASA_popupinputonly = popupinputonly; else cc.CASA_popupinputonly = 'false';
if (touchpadinput != null) cc.CASA_touchpadinput = touchpadinput; else cc.CASA_touchpadinput = false;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (popuponalt40 != null) cc.CASA_popuponalt40 = popuponalt40;
if (validationuserhintprop != null) cc.CASA_validationuserhintprop = validationuserhintprop;
if (bgcolorprop != null) cc.CASA_bgcolorprop = bgcolorprop;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (decimaldigits != null) cc.CASA_decimaldigits = decimaldigits;
if (popupcombowidth != null) cc.CASA_popupcombowidth = popupcombowidth;
if (fgcolorprop != null) cc.CASA_fgcolorprop = fgcolorprop;
if (maxlengthprop != null) cc.CASA_maxlengthprop = maxlengthprop;
if (lengthprop != null) cc.CASA_lengthprop = lengthprop;
if (autocallpopupmethod != null) cc.CASA_autocallpopupmethod = autocallpopupmethod;
if (autocallpopupmethodoffset != null) cc.CASA_autocallpopupmethodoffset = autocallpopupmethodoffset;
if (displayprop != null) cc.CASA_displayprop = displayprop;
if (takeoutFieldPopupIcon != null) cc.CASA_takeoutFieldPopupIcon = takeoutFieldPopupIcon;
if (alwaysflush != null) cc.CASA_alwaysflush = alwaysflush;
if (autotab != null) cc.CASA_autotab = autotab;
if (editmask != null) cc.CASA_editmask = editmask;
if(validationrules != null)
{
cc.CASA_validationrules = validationrules;
m_validationRules.push(validationrules);
}
if (digits != null) cc.CASA_digits = digits;
if (digitsprop != null) cc.CASA_digitsprop = digitsprop;
cc.CASA_stylevariant = null;
if (stylevariant != null) cc.CASA_stylevariant = stylevariant;
cc.CASA_lastValue = undefined;
cc.CASA_lastStatus = undefined;
cc.CASA_lastPopup = undefined;
cc.CASA_lastText = undefined;
cc.CASA_lastControlValue = undefined;
cc.m_lastDir = "ltr";
var node = cc;
for (var i=0; i < hopsfromcontroltocell; i++) {
if(node.parentNode != null) {
node = node.parentNode;
} else {
break;
}
}
cc.CASA_td = node;
if (hotkeys != null) iccHOTKEY(cc, hotkeys);
if(formula != null)
{
cc.CASA_formula = formula;
m_formulas.push(formula);
}
m_FieldsArray.push(cc);
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
function initCasaControlFIELD(pCC)
{
pCC.CASA_lastValue = undefined;
pCC.CASA_lastStatus = undefined;
pCC.CASA_lastPopup = undefined;
pCC.CASA_lastText = undefined;
pCC.CASA_lastControlValue = undefined;
pCC.m_lastDir = null;
pCC.CASA_lastTitle = undefined;
}
function reactOnModelUpdateFIELD(pCC,pEnforceUpdate)
{
return romuFIELD(pCC,pEnforceUpdate);
}
function romuFIELD(pCC,pEnforceUpdate)
{
if (pCC == null) return;
if (pCC.CASA_autocompleteref!=null)
{
var vCCs = parent.document.getElementsByName(pCC.CASA_autocompleteref);
if (vCCs.length > 0)
{
vCCs[0].CASA_autocomplete.updateautocomplete (pCC);
}
}
if (pCC.CASA_keyinited != true)
{
if (pCC.CASA_popupmethod != null) iccKEY(pCC);
pCC.CASA_keyinited = true;
}
if (pCC.CASA_defaultbgcolor == null)
{
pCC.CASA_defaultbgcolor = pCC.style.backgroundColor;
if (pCC.CASA_defaultbgcolor == null)
pCC.CASA_defaultbgcolor = "";
}
if (pCC.CASA_defaultfgcolor == null)
{
pCC.CASA_defaultfgcolor = pCC.style.color;
if (pCC.CASA_defaultfgcolor == null)
pCC.CASA_defaultfgcolor = "";
}
var v = getPropertyValue(pCC.CASA_valueprop);
var s = null;
if (pCC.CASA_statusprop != null)
s = getPropertyValue(pCC.CASA_statusprop);
if (v == null) s = null;
if (pCC.CASA_displayprop != null)
{
var d = getPropertyValue(pCC.CASA_displayprop);
s = applyDisplayProperty(d, s);
}
var vPopup = null;
if (pCC.CASA_popupprop != null)
vPopup = getPropertyValue(pCC.CASA_popupprop);
var vText = null;
if (pCC.CASA_valuetextprop != null)
vText = getPropertyValue(pCC.CASA_valuetextprop);
else if (pCC.CASA_optarrayprop != null)
{
var vcount = 0;
var vTemp = v;
if ( pCC.CASA_datatype != null && pCC.CASA_datatype == "float" )
vTemp = "" + parseFloat(v);
while (true)
{
var vid = getPropertyValue(pCC.CASA_optarrayprop+"["+vcount+"].id");
if (vid == null) break;
if ( pCC.CASA_datatype != null && pCC.CASA_datatype == "float" )
{
vid = "" + parseFloat(vid);
}
if (vid == vTemp)
{
vText = getPropertyValue(pCC.CASA_optarrayprop+"["+vcount+"].name");
if (vText == null)
vText = getPropertyValue(pCC.CASA_optarrayprop+"["+vcount+"].text");
break;
}
vcount++;
}
}
var decimalDigitsFloat = -1;
if (pCC.CASA_decimaldigits != null)
decimalDigitsFloat = pCC.CASA_decimaldigits;
if (pCC.CASA_decimaldigitsprop != null)
decimalDigitsFloat = getPropertyValue(pCC.CASA_decimaldigitsprop);
if (checkIfValueHasError(decimalDigitsFloat, "int") == true)
{
pCC.CASA_decimaldigitsprop = null;
decimalDigitsFloat = -1;
}
if (pCC.CASA_titleprop != null)
{
var vTitle = getPropertyValue(pCC.CASA_titleprop);
if(vTitle == null)
vTitle = "";
if (vTitle != pCC.CASA_lastTitle)
{
pCC.title = vTitle;
pCC.CASA_lastTitle = vTitle;
}
}
if (s == "ERROR" || s == "FOCUS") addFocusRequestor(pCC);
else if (s == "FOCUS_NO_SELECT") addActiveElementRequestor(pCC);
if (pCC.m_lastDir != m_direction)
{
if (m_direction == 'rtl')
pCC.style.backgroundPosition = 'left';
else
pCC.style.backgroundPosition = 'right';
pCC.m_lastDir = m_direction;
}
var dt = pCC.CASA_datatype;
if (dt != null)
{
if      (dt == "date") v = convertYYYYMMDDIntoDisplayString(v);
else if (dt == "time") v = convertHHMMSSIntoDisplayString(v);
else if (dt == "timestamp") v = convertYYYYMMDDHHMMSSMMMIntoDisplayString(v);
else if (dt == "float") v = convertFLOATIntoDisplayString(v,decimalDigitsFloat);
else if (dt == "int" || dt == "long" ) v = convertINTIntoDisplayString(v);
else if (dt == "emtype") try { v = convertIntoDisplayStringEDITMASK(this,v , pCC); } catch(ex) {}
}
var vRO = false;
if (v == null && s == null)
{
pCC.value = "";
pCC.tabIndex = -1;
pCC.style.backgroundColor = pCC.CASA_defaultbgcolor;
pCC.readOnly = true;
if (pCC.className != resolveFieldClassName(pCC,"Null")) pCC.className = resolveFieldClassName(pCC,"Null");
if (pCC.CASA_popupicon != null && pCC.style.backgroundImage != null) pCC.style.backgroundImage = "";
if (pCC.CASA_fic != null)
{
if (pCC.CASA_fic.style.backgroundImage != null) pCC.CASA_fic.style.backgroundImage = "";
pCC.CASA_fic.className = "FIELDCellPopupIconNull";
}
return;
}
else
{
pCC.readOnly = false;
if (vText == null)
{
pCC.value = v;
}
else
{
if (vText != "")
{
vDisplayMode = pCC.CASA_textidmode;
if (vDisplayMode == undefined)
vDisplayMode = getPropertyValue("cISFIELDTextIdMode");
if (vDisplayMode == null || vDisplayMode == "0")
pCC.value = v + " - " + vText;
else if (vDisplayMode == "1")
pCC.value = v;
else if (vDisplayMode == "2")
pCC.value = vText;
}
else
pCC.value = v;
}
applyCasaTabIndex(pCC, "FIELD");
if (vRO) pCC.readOnly = false;
}
pCC.CASA_lastControlValue = pCC.value;
var requiresPopupIcon = false;
if ((pCC.CASA_displayonly != 'true') &&
(dt != null && dt == "date" ||
dt != null && dt == "time" ||
dt != null && dt == "color" ||
pCC.CASA_popupmethod != null && pCC.CASA_popupprop == null ||
pCC.CASA_touchpadinput == 'true' ||
pCC.CASA_popupmethod != null && vPopup == "true"))
{
requiresPopupIcon = true;
}
if (pCC.CASA_displayonly == 'true' && (s == null || s == ""))
{
pCC.tabIndex = -1;
if (vRO) pCC.readOnly = true;
if (requiresPopupIcon == false) { if (pCC.className != resolveFieldClassName(pCC,"Display")) pCC.className = resolveFieldClassName(pCC,"Display"); }
else                            { if (pCC.className != resolveFieldClassName(pCC,"DisplayWithPopup")) pCC.className = resolveFieldClassName(pCC,"DisplayWithPopup"); }
}
else if (s == null)
{
if (requiresPopupIcon == false) { if (pCC.className != resolveFieldClassName(pCC,"Edit")) pCC.className = resolveFieldClassName(pCC,"Edit"); }
else
{
if (pCC.CASA_popupinputonly == 'true') { if (pCC.className != "FIELDPopupInputOnlyWithPopup") pCC.className = "FIELDPopupInputOnlyWithPopup"; }
else if (pCC.CASA_touchpadinput == 'true') { if (pCC.className != resolveFieldClassName(pCC,"EditWithTouchScreenPopup")) pCC.className = resolveFieldClassName(pCC,"EditWithTouchScreenPopup");}
else if (pCC.className != resolveFieldClassName(pCC,"EditWithPopup")) pCC.className = resolveFieldClassName(pCC,"EditWithPopup");
}
}
else
{
if (requiresPopupIcon == false)
{
if      (s == "EDIT" || s == "FOCUS" || s == "FOCUS_NO_SELECT") { if (pCC.className != resolveFieldClassName(pCC,"Edit")) pCC.className = resolveFieldClassName(pCC,"Edit"); }
else if (s == "DISPLAY")              { if (pCC.className != resolveFieldClassName(pCC,"Display")) pCC.className = resolveFieldClassName(pCC,"Display"); pCC.tabIndex = -1; if (vRO) pCC.readOnly = true; }
else if (s == "ERROR_DISPLAY")        { if (pCC.className != resolveFieldClassName(pCC,"Error")) pCC.className = resolveFieldClassName(pCC,"Error"); pCC.tabIndex = -1; if (vRO) pCC.readOnly = true; }
else if (s == "ERROR" || s == "ERROR_NO_FOCUS") { if (pCC.className != resolveFieldClassName(pCC,"Error")) pCC.className = resolveFieldClassName(pCC,"Error"); }
else if (s == "INVISIBLE")            { if (pCC.className != resolveFieldClassName(pCC,"Invisible")) pCC.className = resolveFieldClassName(pCC,"Invisible"); }
else                                  { if (pCC.className != resolveFieldClassName(pCC,"Edit")) pCC.className = resolveFieldClassName(pCC,"Edit"); }
}
else
{
if (s == "EDIT" || s == "FOCUS" || s == "FOCUS_NO_SELECT")
{
if (pCC.CASA_popupinputonly == 'true') { if (pCC.className != "FIELDPopupInputOnlyWithPopup") pCC.className = "FIELDPopupInputOnlyWithPopup"; }
else if (pCC.CASA_touchpadinput == 'true') { if (pCC.className != resolveFieldClassName(pCC,"EditWithTouchScreenPopup")) pCC.className = resolveFieldClassName(pCC,"EditWithTouchScreenPopup"); }
else if (pCC.className != resolveFieldClassName(pCC,"EditWithPopup")) pCC.className = resolveFieldClassName(pCC,"EditWithPopup");
}
else if (s == "DISPLAY")
{
pCC.tabIndex = -1;
if (vRO) pCC.readOnly = true;
if (pCC.CASA_touchpadinput == 'true' && pCC.className != resolveFieldClassName(pCC,"DisplayWithTouchScreenPopup")) pCC.className = resolveFieldClassName(pCC,"DisplayWithTouchScreenPopup");
else if (pCC.className != resolveFieldClassName(pCC,"DisplayWithPopup")) pCC.className = resolveFieldClassName(pCC,"DisplayWithPopup");
}
else if (s == "ERROR_DISPLAY")
{
pCC.tabIndex = -1;
if (vRO) pCC.readOnly = true;
if (pCC.CASA_popupinputonly == 'true') { if (pCC.className != resolveFieldClassName(pCC,"ErrorWithPopup")) pCC.className = resolveFieldClassName(pCC,"ErrorWithPopup"); }
else if (pCC.CASA_touchpadinput == 'true') {if (pCC.className != resolveFieldClassName(pCC,"ErrorWithTouchScreenPopup")) pCC.className = resolveFieldClassName(pCC,"ErrorWithTouchScreenPopup"); }
else if (pCC.className != resolveFieldClassName(pCC,"ErrorWithPopup")) pCC.className = resolveFieldClassName(pCC,"ErrorWithPopup");
}
else if (s == "ERROR" || s == "ERROR_NO_FOCUS")
{
if (pCC.CASA_popupinputonly == 'true') { if (pCC.className != resolveFieldClassName(pCC,"ErrorWithPopup")) pCC.className = resolveFieldClassName(pCC,"ErrorWithPopup"); }
else if (pCC.CASA_touchpadinput == 'true') {if (pCC.className != resolveFieldClassName(pCC,"ErrorWithTouchScreenPopup")) pCC.className = resolveFieldClassName(pCC,"ErrorWithTouchScreenPopup"); }
else if (pCC.className != resolveFieldClassName(pCC,"ErrorWithPopup")) pCC.className = resolveFieldClassName(pCC,"ErrorWithPopup");
}
else if (s == "INVISIBLE")
{
if (pCC.className != resolveFieldClassName(pCC,"InvisibleWithPopup")) pCC.className = resolveFieldClassName(pCC,"InvisibleWithPopup");
}
else
{
if (pCC.CASA_popupinputonly == 'true') { if (pCC.className != "FIELDPopupInputOnlyWithPopup") pCC.className = "FIELDPopupInputOnlyWithPopup"; }
else if (pCC.CASA_touchpadinput == 'true') { if (pCC.className != resolveFieldClassName(pCC,"EditWithTouchScreenPopup")) pCC.className = resolveFieldClassName(pCC,"EditWithTouchScreenPopup"); }
else if (pCC.className != resolveFieldClassName(pCC,"EditWithPopup")) pCC.className = resolveFieldClassName(pCC,"EditWithPopup");
}
}
if (pCC.CASA_td != null)
{
if (s == "INVISIBLE")
{
var vim = pCC.CASA_invisiblemode;
if (vim == undefined || vim == "invisible")
{
pCC.CASA_td.style.display = "none";
}
}
else
{
pCC.style.display = "";
pCC.CASA_td.style.display = "";
}
}
}
if (pCC.CASA_takeoutFieldPopupIcon)
{
pCC.style.backgroundImage = "url()";
tableObj = pCC.parentNode.parentNode.parentNode.parentNode;
if (s == "INVISIBLE") vPopup = "false";
if (s == "INVISIBLE") tableObj.style.display = "none";
else tableObj.style.display = "";
if(pCC.CASA_fic != null)
{
if (vPopup == "false") pCC.CASA_fic.style.cursor = "";
else pCC.CASA_fic.style.cursor = "pointer";
if (pCC.CASA_popupicon != undefined)
{
if (vPopup == "false") pCC.CASA_fic.style.backgroundImage = "";
else pCC.CASA_fic.style.backgroundImage = "url("+pCC.CASA_popupicon+")";
}
else
{
if (vPopup == "false") pCC.CASA_fic.className = "FIELDCellPopupIconNull";
else pCC.CASA_fic.className = "FIELDCellPopupIcon";
}
}
}
else if (pCC.CASA_popupicon != undefined)
{
if (requiresPopupIcon == true)
{
if (pCC.style.backgroundImage == null || pCC.style.backgroundImage == "")
pCC.style.backgroundImage = "url("+pCC.CASA_popupicon+")";
}
else
{
if (pCC.style.backgroundImage != undefined)
pCC.style.backgroundImage = "";
}
}
if ((pCC.value != null) &&
(pCC.value != "") &&
(dt != null) &&
(dt == "color") &&
(checkIfValueHasError(pCC.value,dt) == false))
{
pCC.style.color = determineContrastColorCOLORSELECTION(pCC.value);
pCC.style.backgroundColor = pCC.value;
}
else if ((pCC.value == "") &&
(dt == "color"))
{
pCC.style.color = "";
pCC.style.backgroundColor = pCC.CASA_defaultbgcolor;
}
var bgcolor = null;
var bgcolorHasError = false;
if (pCC.CASA_bgcolorprop != null)
{
bgcolor = getPropertyValue(pCC.CASA_bgcolorprop);
if (bgcolor == "" ) bgcolor = null;
if (bgcolor != null)
bgcolorHasError = checkIfValueHasError(bgcolor,"color");
}
var fgcolor = null;
var fgcolorHasError = false;
if (pCC.CASA_fgcolorprop != null)
{
fgcolor = getPropertyValue(pCC.CASA_fgcolorprop);
if (fgcolor == "" ) fgcolor = null;
if (fgcolor != null)
fgcolorHasError = checkIfValueHasError(fgcolor,"color");
else fgcolor = pCC.CASA_defaultfgcolor;
}
if (bgcolor != null && bgcolorHasError == false && fgcolor != null && fgcolorHasError == false)
{
pCC.style.backgroundColor = bgcolor;
pCC.style.color = fgcolor;
}
else if (bgcolor != null && bgcolorHasError == false)
{
if (checkIfColorIsDarkCOLORSELECTION(bgcolor) == true)
pCC.style.color = "#FFFFFF";
else
pCC.style.color = "#000000";
pCC.style.backgroundColor = bgcolor;
}
else if (fgcolor != null && fgcolorHasError == false)
{
if (fgcolor == "" || checkIfColorIsDarkCOLORSELECTION(fgcolor) == true)
pCC.style.backgroundColor = pCC.CASA_defaultbgcolor;
else
pCC.style.backgroundColor = "#000000";
pCC.style.color = fgcolor;
}
if ((bgcolor == null) && (fgcolor == null))
{
pCC.style.backgroundColor = pCC.CASA_defaultbgcolor;
pCC.style.color = pCC.CASA_defaultfgcolor;
}
if (pCC.CASA_maxlengthprop != null)
{
var maxl = getPropertyValue(pCC.CASA_maxlengthprop);
if (maxl != null && maxl != "" && maxl != pCC.maxlength)
{
pCC.maxLength = (-1)*maxl*(-1);
}
}
if (pCC.CASA_lengthprop != null)
{
var l = getPropertyValue(pCC.CASA_lengthprop);
if (l>0 && l != pCC.size)
{
pCC.size = l;
}
}
if ((dt == "int" || dt == "long" || dt == "float") && (pCC.style.textAlign == "" || pCC.style.textAlign == null))
{
var fp1 = getPropertyValue("cISAddons.fieldParam1");
if (pCC.CASA_fieldParam1 != fp1)
{
pCC.CASA_fieldParam1 = fp1;
if (fp1 == "true")
pCC.style.textAlign = (m_direction == 'rtl') ? "left" : "right";
else
pCC.style.textAlign = (m_direction == 'rtl') ? "right" : "left";
}
}
}
function resolveFieldClassName(pCC, post)
{
if ( pCC.CASA_stylevariant != null ) return "FIELDInput"+pCC.CASA_stylevariant+post;
else return "FIELDInput"+post;
}
function reactFIELD(evt)
{
return reactFIELDInternal(evt);
}
function reactFIELDInternal(evt)
{
var v = true;
if      (evt.type == "keydown") v = reactOnKeyDownFIELD(evt);
else if (evt.type == "keypress") v = reactOnKeyPressFIELD(evt);
else if (evt.type == "keyup") v = reactOnKeyUpFIELD(evt);
else if (evt.type == "mousedown") v = reactOnMouseDownFIELD(evt);
else if (evt.type == "mouseup") v = reactOnMouseUpFIELD(evt);
else if (evt.type == "change") v = transferChangeFIELD(evt.currentTarget,false);
else if (evt.type == "focus") v = reactOnFocusFIELD(evt.currentTarget);
else if (evt.type == "blur")  v = transferChangeFIELD(evt.currentTarget, true, "blur");
else if (evt.type == "dblclick") v = reactOnValueHelpFIELD(evt.currentTarget);
else if (evt.type == "contextmenu") v = reactOnValueHelpFIELD(evt.currentTarget,evt);
else if (evt.type == "drop") v = false;
return v;
}
function transferChangeFIELD(pCC, pClearFocusInfo, eventType, noCheckIO)
{
if ( CL() == null ) return;
if(pClearFocusInfo == true) CL().C_unregFocusInfo(pCC);
if (!noCheckIO==true) if (checkIOForNoSubmits() == false) return false;
if (pCC.tabIndex == -1) return false;
clearTimeoutAutoCallPopupMethodFIELD(pCC);
var transferedPCC = transferPropertyValueFIELD(pCC);
if (pCC.CASA_flush=="screen" && transferedPCC == pCC)
{
flushIfDesiredFIELD(pCC);
}
else if ((pCC.CASA_alwaysflush == "true" && eventType == "blur" && pCC.CASA_hasValidationError != true) ||
((pCC.CASA_flushmethod != undefined || pCC.CASA_flush!=undefined)  && pCC.CASA_alwaysflush != "true" && transferedPCC == pCC))
{
flushFIELD (pCC);
}
return true;
}
function flushFIELD (pCC)
{
if ( (this.isValueHelpOpen() != true) && (this.isContextMenuOpen() != true) && (pCC.CASA_datepopupOpen != "true")  )
{
CL().C_saveCurrFocusInfo(pCC);
m_flushCC = pCC;
pCC.CASA_flushTimeoutId = window.setTimeout("rtaFlushFIELD()", 20);
}
}
var m_flushCC = null;
function rtaFlushFIELD()
{
if(m_flushCC != null)
{
if (m_flushCC.CASA_flushTimeoutId != null)
window.clearTimeout(m_flushCC.CASA_flushTimeoutId);
flushIfDesiredFIELD(m_flushCC, "blur");
m_flushCC = null;
}
}
m_ccAutoCallPopupMethod = null;
function reactOnTimeoutAutoCallPopupMethodFIELD()
{
setPropertyValue("cISAddons.fieldParam4","true");
reactOnValueHelpFIELD(m_ccAutoCallPopupMethod);
}
function clearTimeoutAutoCallPopupMethodFIELD(pCC)
{
if (pCC.CASA_autocallTimeoutId != null)
window.clearTimeout(pCC.CASA_autocallTimeoutId);
}
function setTimeoutAutoCallPopupMethodFIELD(pCC,eve)
{
if (pCC.CASA_autocallpopupmethod != "true") return;
if (eve == null) return;
if (eve.keyCode != 8 && eve.keyCode != 229 && (eve.keyCode < 32 || eve.keyCode > 127 || eve.keyCode == 37 || eve.keyCode == 39 || eve.keyCode == 38)) return;
clearTimeoutAutoCallPopupMethodFIELD(pCC);
m_ccAutoCallPopupMethod = pCC;
var offset = getPropertyValue("cISAddons.fieldParam5");
if (pCC.CASA_autocallpopupmethodoffset != null)
offset = pCC.CASA_autocallpopupmethodoffset;
pCC.CASA_autocallTimeoutId = window.setTimeout("reactOnTimeoutAutoCallPopupMethodFIELD()", offset);
}
function transferPropertyValueFIELD(pCC) { return CL().C_transferPropertyValueFIELD(this,pCC); }
function transferAndConvertPropertyValueFIELD(pCC) { return CL().C_transferAndConvertPropertyValueFIELD(this,pCC); }
function resetValidationErrorFIELD(pCC)
{
pCC.style.color = "";
pCC.style.borderColor = "";
pCC.style.borderWidth = "";
pCC.CASA_hasValidationError = false;
pCC.CASA_valErrors = [];
reactOnModelUpdateFIELD(pCC, true);
}
function buildValidationErrorMessageFIELD(pCC) { return CL().C_buildValidationErrorMessageFIELD(this,pCC); }
function decorateInputFieldOnError(pCC) { return CL().C_decorateInputFieldOnError(pCC); }
var m_blockAfterFlushFIELD;
function flushIfDesiredFIELD(pCC,eventType) {if(CL() == null) return; CL().C_flushIfDesiredFIELD(this,pCC,eventType); }
function reactOnMouseUpFIELD(evt) { return CL().C_reactOnMouseUpFIELD(this,evt); }
function reactOnMouseDownFIELD(evt) { return CL().C_reactOnMouseDownFIELD(this,evt); }
function reactOnFocusFIELD(pCC) { return CL().C_reactOnFocusFIELD(this,pCC); }
function reactOnKeyPressFIELD(evt) { return CL().C_reactOnKeyPressFIELD(this,evt); }
function reactOnKeyUpFIELD(evt) { return CL().C_reactOnKeyUpFIELD(this,evt); }
function reactOnValueHelpFIELD(pCC,pCCevent,hk) { return CL().C_reactOnValueHelpFIELD(this,pCC,pCCevent,hk); }
function reactOnKeyDownFIELD(evt) { return CL().C_reactOnKeyDownFIELD(this,evt); }
var m_retccFIELD;
function openDatePopupFIELD(pCC) { CL().C_openDatePopupFIELD(this,pCC); }
function transferDatePopupRetValFIELD(pretval) { CL().C_transferDatePopupRetValFIELD(this,pretval); }
function openTimePopupFIELD(pCC) { CL().C_openTimePopupFIELD(this,pCC); }
function transferTimePopupRetValFIELD(rValue) { closeStandardDlgPopupPAGE(); CL().C_transferTimePopupRetValFIELD(this,rValue); }
function openColorPopupFIELD(pCC) { CL().C_openColorPopupFIELD(this,pCC); }
function transferColorPopupRetValFIELD(rValue)
{
if (rValue != null)
{
m_retccFIELD.value = rValue[0];
transferChangeFIELD(m_retccFIELD,true,"blur",true);
}
}
var m_casacontrol;
function openTouchPadNumericFIELD(pCC) { CL().C_openTouchPadNumericFIELD(this,pCC); }
function openTouchPadFIELD(pCC) { CL().C_openTouchPadFIELD(this,pCC); }
function takeOverTouchPadResultMOZILLA(pCasaPopupReturnValue)
{
closeStandardDlgPopupPAGE();
if (pCasaPopupReturnValue != null)
{
m_casacontrol.value = pCasaPopupReturnValue[0];
transferPropertyValueFIELD(m_casacontrol);
m_casacontrol = null;
}
}
