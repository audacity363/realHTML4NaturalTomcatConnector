function addVersionInfoBM_TEXTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_TEXTCONTROLS');
}
function iccFTEXTAREA(cc,romumethod,rfmethod,valueprop,titleprop,hotkeys,flush,flushmethod,visibleprop,invisiblemode)
{
cc.onblur = rfmethod;
cc.onfocus = rfmethod;
cc.onchange = rfmethod;
cc.onkeydown = rfmethod;
addFocusable(cc,true);
registerPropertyListener(romumethod,valueprop,cc.id);
registerPropertyListener(romumethod,titleprop,cc.id);
registerPropertyListener(romumethod,visibleprop,cc.id);
cc.CASA_valueprop = valueprop;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (hotkeys != null) iccHOTKEY(cc, hotkeys);
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
cc.CASA_lastControlValue = undefined;
cc.CASA_lastDir = null;
cc.CASA_td = cc.parentNode;
cc.CASA_lastTitle = undefined;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
}
function romuFTEXTAREA(cc, pEnforceUpdate)
{
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
cc.value = v;
cc.CASA_lastControlValue = cc.value;
handleVisibleprop(cc);
}
function reactFTEXTAREA(evt)
{
return reactFTEXTAREAInternal(evt);
}
function reactFTEXTAREAInternal(evt)
{
if(CL() == null) return;
else if (evt.type == "keydown") return reactOnKeyDownFTEXTAREA(evt.currentTarget,evt);
else if (evt.type == "change") return transferChangeFTEXTAREA(evt.currentTarget,"change");
else if (evt.type == "blur") return transferChangeFTEXTAREA(evt.currentTarget,"blur");
else if (evt.type == "focus") return reactOnFocusFTEXTAREA(evt.currentTarget);
}
function reactOnKeyDownFTEXTAREA(cc,controlevent)
{
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
reactOnHelpFTEXTAREA(cc,controlevent);
controlevent.preventDefault();
controlevent.stopPropagation();
}
if (controlevent.keyCode == 38 || controlevent.keyCode == 40 )
{
controlevent.stopPropagation();
}
}
function reactOnHelpFTEXTAREA(cc,controlevent)
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
controlevent.stopPropagation();
}
}
function reactOnFocusFTEXTAREA(cc)
{
CL().C_regFocusInfo(cc);
return true;
}
function transferChangeFTEXTAREA(cc,caller)
{
if(caller == "blur") CL().C_unregFocusInfo(cc);
if (checkIOForNoSubmits() == false) return false;
if (cc.tabIndex == -1) return false;
transferPropertyValueFTEXTAREA(cc,caller);
return true;
}
function transferPropertyValueFTEXTAREA(cc,caller)
{
if (cc.value == null || cc.value == cc.CASA_lastControlValue)
{
cc.CASA_skipNextOnBlurValidation = false;
return true;
}
setPropertyValue(cc.CASA_valueprop,cc.value);
cc.CASA_lastControlValue = cc.value;
if (cc.CASA_flush == "server" || cc.CASA_flushmethod != null)
{
m_displayOccupied = false;
if(cc.CASA_flushmethod != null)
invokeMethodInModel(cc.CASA_flushmethod);
else
submitModel("submit");
}
else if (cc.CASA_flush == "screen")
updateModelListenersS();
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
