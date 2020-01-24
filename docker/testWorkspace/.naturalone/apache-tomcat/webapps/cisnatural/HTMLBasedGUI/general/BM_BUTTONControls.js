function addVersionInfoBM_BUTTONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_BUTTONCONTROLS');
}
function iccBM_BUTTON(cc,romumethod,rohkmethod,rbmethod,method,nameprop,titleprop,visibleprop,invisiblemode,fileid)
{
if (method != null) cc.CASA_method = method;
if (nameprop != null) cc.CASA_nameprop = nameprop;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if ( fileid == null ) {
if (! CL().isEditorPreview())cc.onmouseup = rbmethod;
cc.onkeypress = rbmethod;
}
else
{
parent.$(cc).on('click', function () {
parent.$('#' + fileid).click();});
parent.document.getElementById(fileid).addEventListener('change', function(){
var file = this.files[0];
eval(cc.CASA_method.substring(11)+"(file)");
});
}
addFocusable(cc);
if (romumethod != null) registerListener(romumethod);
cc.CASA_kc13Handler = true;
addMLButton(cc, rohkmethod);
cc.CASA_memvalue = undefined;
hotKeyCode = findHotkeyKeycode(cc.innerHTML);
if (hotKeyCode != null)
{
addControlBasedHotKey(cc.id, hotKeyCode,rohkmethod);
cc.innerHTML = convertDoubleTildeToUTag(cc.innerHTML);
}
cc.CASA_fileid = fileid;
}
function romuBM_BUTTON(cc)
{
if (cc == null) return;
if (cc.CASA_nameprop != null)
{
var v = getPropertyValue(cc.CASA_nameprop);
if (v == null) v = "";
if (cc.CASA_memName == undefined || (convertDoubleTildeToUTag(v) != cc.CASA_memName))
{
removeHotKeys(cc.id);
var hotKeyCode = findHotkeyKeycode(v);
if (hotKeyCode != null)
{
addControlBasedHotKey(cc.id, hotKeyCode,
parent.createFunction("rohk" + cc.id, "param", "C.transferModelBM_BUTTON(C" + cc.id + ");"));
}
v = convertDoubleTildeToUTag(v);
cc.CASA_memName = v;
cc.innerHTML = v;
}
}
if (cc.CASA_titleprop != null)
{
var vTitle = getPropertyValue(cc.CASA_titleprop);
if (vTitle != cc.CASA_lastTitle)
{
cc.title = vTitle;
cc.CASA_lastTitle = vTitle;
}
}
handleBtVisibleprop(cc);
}
function handleBtVisibleprop(cc)
{
if (cc.CASA_visibleprop == null || CL().isEditorPreview()) return;
var vv = getPropertyValue(cc.CASA_visibleprop);
var div = cc.parentNode;
if (div.children.length > 1) div = cc;
if (vv == "true")
{
cc.disabled = false;
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
cc.disabled = true;
div.style.display = "";
div.style.visibility= "";
}
}
}
function reactBM_BUTTON(evt)
{
return reactBM_BUTTONInternal(evt);
}
function reactBM_BUTTONInternal(evt)
{
if (CL() == null ) return;
addLogMessage("BM_BUTTONControls.reactBUTTON(): Button was pressed");
addLogMessage("reactButton() called with " + evt.type);
if (evt.type == "mouseup") return transferModelBM_BUTTON(evt.currentTarget,evt);
else if (evt.type == "keypress") { if (evt.keyCode == 32 || evt.keyCode == 13) return transferModelBM_BUTTON(evt.currentTarget,evt); }
}
function transferModelBM_BUTTON(cc,evt)
{
if (checkIO() == false)
{
addLogMessage("BM_BUTTONControls.transferModelBM_BUTTON(): checkIO is blocked");
addLogMessage("transferModelBM_BUTTON() - communication just blocked");
return;
}
if (cc.type == "reset") return;
if (cc.type == "submit")
{
for (var i=0; i<m_focusables.length; i++)
if (m_focusables[i].type == "password")
transferChangeFFIELD(m_focusables[i],false);
if (cc.form != null)
{
var theelems = cc.form.elements;
for ( i=0; i<theelems.length;i++)
{
if (theelems[i].checkValidity && !theelems[i].checkValidity()) return;
}
}
}
if (cc.type == "submit" || cc.type=="button" )
{
if (cc.CASA_method == null)
{
submitModel("submit");
}
else if (cc.CASA_method.substr(0,11) == "javascript:")
{
addLogMessage("transferModelBM_BUTTON() - calling javascript-method");
eval(cc.CASA_method.substring(11));
}
else
{
addLogMessage("transferModelBM_BUTTON() - calling invokeMethodInModel");
invokeMethodInModel(cc.CASA_method);
}
}
}
