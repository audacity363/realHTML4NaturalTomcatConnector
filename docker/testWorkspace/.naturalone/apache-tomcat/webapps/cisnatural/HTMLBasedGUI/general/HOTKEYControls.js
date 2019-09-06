function addVersionInfoHOTKEYCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('HOTKEYCONTROLS');
}
function iccHOTKEY(cc,hotkeys)
{
cc.CASA_doTextIdReplacement = true;
cc.CASA_hotkeys = [];
var hotKeyArray = decodeCSVString(hotkeys);
for (var i=0; i<hotKeyArray.length; i+=2)
{
var o = newHOTKEY(hotKeyArray[i]);
if ( o == null ) continue;
o.method = hotKeyArray[i+1];
cc.CASA_hotkeys.push(o);
registerInternal(cc,o);
}
}
function registerWPKeys(cc)
{
var keys = getPropertyValue("cISAddons.workplaceHotkeys");
if ( keys == null ) return;
if (cc.CASA_hotkeys == null ) cc.CASA_hotkeys = [];
var keyArray = decodeString(keys, ";");
if ( keyArray.length != 2 ) return;
var o = newHOTKEY(keyArray[0]);
o.method = "switchToNextActivity";
cc.CASA_hotkeys.push(o);
registerInternal(cc,o);
var o = newHOTKEY(keyArray[1]);
o.method = "switchToPreviousActivity";
cc.CASA_hotkeys.push(o);
registerInternal(cc,o);
}
function registerInternal(cc, o)
{
var ccInfo = cc.CASA_id;
if (ccInfo == null) ccInfo = cc.id;
addHotKeyWithControlScope(o.keyCode,o.ctrlKey,o.shiftKey,o.altKey,o.method,"CONTROL #"+ccInfo);
}
function iccKEY(cc)
{
var keys = getPropertyValue("cISAddons.valueHelpKeys");
if ( keys == null ) return;
if (cc.CASA_hotkeys == null ) cc.CASA_hotkeys = [];
var keyArray = decodeString(keys, ";");
for ( var i=0; i <keyArray.length; i++ )
{
var o = newHOTKEY(keyArray[i]);
if ( o == null ) continue;
o.method = "javascript:reactOnValueHelpFIELD";
cc.CASA_hotkeys.push(o);
registerInternal(cc,o);
}
}
function newHOTKEY(key)
{
var keyArray = decodeString(key, "-");
var o = new Object();
o.ctrlKey = false;
o.altKey = false;
o.shiftKey = false;
for (var j=0; j<keyArray.length; j++)
{
var s = keyArray[j];
if (s == "ctrl")
o.ctrlKey = true;
else if (s == "alt")
o.altKey = true;
else if (s == "shift")
o.shiftKey = true;
else
o.keyCode = s;
}
if ( o.keyCode != null ) return o;
return null;
}
function reactOnKeyDownHOTKEY(cc,evt)
{
if (cc.CASA_doTextIdReplacement == true)
{
cc.CASA_doTextIdReplacement = false;
replaceTExtIdsHOTKEYS(cc);
}
if(evt.keyCode == 13 &&
evt.ctrlKey == false &&
evt.shiftKey == false &&
evt.altKey == false &&
getPropertyValue("cISAddons.hE") == 1)
{
addLogMessage("Hotkey Managment: ENTER hot key suppressed because HOTKEYSEnterMode is disabled");
return;
}
for (var i=0; i<cc.CASA_hotkeys.length; i++)
{
var hotkey = cc.CASA_hotkeys[i];
if (evt.keyCode == hotkey.keyCode &&
evt.ctrlKey == hotkey.ctrlKey &&
evt.shiftKey == hotkey.shiftKey &&
evt.altKey == hotkey.altKey)
{
try
{
parent.document.body.focus();
var vse = findSrcElement(evt);
try { vse.focus(); } catch (exxe) {}
}
catch (eexxcc) {}
if (hotkey.method.indexOf("javaScript:") == 0 ||
hotkey.method.indexOf("javascript:") == 0)
{
var f = hotkey.method.substring(11, hotkey.method.length);
try
{
this[f](cc,evt,true);
}
catch(exxxc)
{
var str = "";
for (id in exxxc)
str += exxxc[id]+"\n";
alert("ERROR when calling function "+f+"\n\n"+str);
}
}
else
{
setTimeout("invokeMethodInModel(\""+hotkey.method+"\")",20);
}
return true;
}
}
return false;
}
function replaceTExtIdsHOTKEYS(cc)
{
for (var i=0; i<cc.CASA_hotkeys.length; i++)
{
if (cc.CASA_hotkeys[i].keyCode.charAt(0) == "$")
cc.CASA_hotkeys[i].keyCode = getPropertyValue(cc.CASA_hotkeys[i].keyCode);
}
}
