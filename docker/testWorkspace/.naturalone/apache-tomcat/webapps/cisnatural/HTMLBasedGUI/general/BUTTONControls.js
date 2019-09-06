function addVersionInfoBUTTONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BUTTONCONTROLS');
}
function flexCreateControlBUTTON(params)
{
var vwidth = params["width"];
var vid = params["CONTROLID"];
var vd = parent.createElement("TD");
vd.style.width = 0;
var vc = parent.createElement("BUTTON");
vc.name = "CC";
vc.id = "B_"+vid;
vc.style.width = C_adjustUnits(vwidth);
vc.className = "BUTTONInput";
if (params["image"] == null)
{
vc.innerHTML = params["name"];
}
else
{
var vtab = parent.createElement("TABLE");
var vbod = parent.createElement("TBODY");
vtab.cellSpacing = 0;
vtab.cellPadding = 0;
vtab.border = 0;
var vtr = parent.createElement("TR");
var vtdl = parent.createElement("TD");
vtdl.className = "BUTTONText";
var vim = parent.createElement("IMG");
vim.src = params["image"];
vim.border = 0;
var vtdr = parent.createElement("TD");
vtdr.className = "BUTTONText";
if (params["name"] != null) vtdr.innerHTML = "&nbsp;"+params["name"]; else vtdr.innerHTML = "&nbsp;";
vtdr.align = "center";
vtdl.appendChild(vim);
vtr.appendChild(vtdl);
vtr.appendChild(vtdr);
vbod.appendChild(vtr);
vtab.appendChild(vbod);
vc.appendChild(vtab);
}
vd.appendChild(vc);
parent["CB_"+vid] = vc;
if (params["namepropp"] != null) vc.CASA_textCell = vc;
var vromu = parent.createFunction("romuB_"+vid,"model","C.romuBUTTON(CB_"+vid+");");
var vrohk = parent.createFunction("rohkB_"+vid,"param","C.transferModelBUTTON(CB_"+vid+");");
iccBUTTON(parent["CB_"+vid],vromu,vrohk,this["reactBUTTON"],params["statuspropp"],params["visiblepropp"],params["variant"],params["methodd"],params["repeatindex"],
params["isfileuploadbutton"],params["cfilepropp"],params["sfilepropp"],params["invisiblemode"],params["stylevariant"],
params["namepropp"],params["textcellid"],null,params["tabindex"],null,null,params["titlepropp"],null,params["switchvisibleproponuserinput"],
params["imagepropp"], null, params["focusedpropp"]);
var result = new Object();
result.cell = vd;
result.control = vc;
return result;
}
function flexRemoveBUTTON(vid)
{
parent["romu"+vid] = undefined;
parent["rohk"+vid] = undefined;
removeListener("CB_"+vid);
removeHotKeys(vid);
parent["C"+vid].CASA_td = undefined;
parent["C"+vid] = undefined;
}
function iccBUTTON(cc,romumethod,rohkmethod,rbmethod,statusprop,visibleprop,variant,method,repeatindex,
isfileuploadbutton,cfileprop,sfileprop,invisiblemode,stylevariant,nameprop,textcellid,
cti,tabindex,image,imagedisabled,titleprop,resetvalerrors,switchvisibleproponuserinput,
imageprop,imagedisabledprop,focusedprop )
{
if ( ! CL().isEditorPreview() )
{
cc.onmouseup = rbmethod;
cc.onmouseover = rbmethod;
cc.onmouseout = rbmethod;
cc.onkeypress = rbmethod;
}
addFocusable(cc);
startFocusCell(cc);
if (romumethod != null) registerListener(romumethod);
cc.CASA_kc13Handler = true;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (focusedprop != null) cc.CASA_focusedprop = focusedprop;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (variant != null) cc.CASA_variant = variant;
if (method != null) cc.CASA_method = method;
if (repeatindex != null) cc.CASA_repeatindex = repeatindex;
if (isfileuploadbutton != null) cc.CASA_isfileuploadbutton= isfileuploadbutton;
if (cfileprop != null) cc.CASA_cfileprop = cfileprop;
if (sfileprop != null) cc.CASA_sfileprop = sfileprop;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
cc.CASA_stylevariant = "";
if (stylevariant != null) cc.CASA_stylevariant = stylevariant;
if (nameprop != null) cc.CASA_nameprop = nameprop;
if (textcellid != null) cc.CASA_textCell = parent.gebid(textcellid);
if (cti != null)  cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (image != null) cc.CASA_image = image;
if (imagedisabled != null) cc.CASA_imagedisabled = imagedisabled;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (resetvalerrors != null) cc.CASA_resetvalerrors = resetvalerrors;
if (switchvisibleproponuserinput != null) cc.CASA_switchvisibleproponuserinput = switchvisibleproponuserinput;
if (imageprop != null)cc.CASA_imageprop = imageprop;
if (imagedisabledprop != null) cc.CASA_imagedisabledprop = imagedisabledprop;
cc.CASA_td = cc.parentNode;
addMLButton(cc, rohkmethod);
cc.CASA_memvalue = undefined;
hotKeyCode = findHotkeyKeycode(cc.innerHTML);
if (hotKeyCode != null)
{
addControlBasedHotKey(cc.id, hotKeyCode,rohkmethod);
cc.innerHTML = convertDoubleTildeToUTag(cc.innerHTML);
}
applyCasaTabIndex(cc, "BUTTON");
}
function romuBUTTON(cc)
{
if (cc == null) return;
applyCasaTabIndex(cc, "BUTTON");
if (cc.CASA_switchvisibleproponuserinput == "true") CL().C_addSVPButton(self, cc, cc.CASA_visibleprop);
if (cc.CASA_focusedprop != null)
{
var v = getPropertyValue(cc.CASA_focusedprop);
if (v == "true")  addFocusRequestor(cc);
}
if (cc.CASA_statusprop != null)
{
var v = getPropertyValue(cc.CASA_statusprop);
if (v == "DISABLED")
disableBUTTON(cc);
else
enableBUTTON(cc);
}
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
parent.createFunction("rohk" + cc.id, "param", "C.transferModelBUTTON(C" + cc.id + ");"));
}
v = convertDoubleTildeToUTag(v);
cc.CASA_memName = v;
cc.CASA_textCell.innerHTML = "&nbsp;"+v;
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
if (cc.CASA_visibleprop == null && cc.CASA_imageprop != null)
{
var vi = parent.gebid(cc.CASA_imgid);
var v  = getPropertyValue(cc.CASA_imageprop);
if (v == null || v == "") v = "../HTMLBasedGUI/general/nothing.gif";
vi.src = v;
}
if (cc.CASA_visibleprop != null)
{
var v = findVisibleValue(getPropertyValue(cc.CASA_visibleprop));
if (cc.CASA_memvalue != undefined && v == cc.CASA_memvalue)
{
if (cc.CASA_imageprop != null )
{
v = convertStatusToVisible(cc.CASA_memvalue);
var vi = parent.gebid(cc.CASA_imgid);
var vv = null;
if (v != null && v != "false" && cc.CASA_invisiblemode != "cleared")
vv  = getPropertyValue(cc.CASA_imageprop);
if ( vv != null && vv != "" )
vi.src = vv;
}
}
else
{
cc.CASA_memvalue = v;
v = convertStatusToVisible(v);
if (v == null || v == "false")
{
if (cc.CASA_invisiblemode == null || cc.CASA_invisiblemode == "invisible")
{
cc.style.display = "none";
if (cc.CASA_td != null ) {
if (cc.CASA_repeatindex == undefined || cc.CASA_repeatindex == null || parseInt(cc.CASA_repeatindex) < 0) cc.CASA_td.style.display = "none";
}
}
if (cc.CASA_invisiblemode == "cleared")
{
if (cc.CASA_td != null) {
if (cc.CASA_repeatindex == undefined || cc.CASA_repeatindex == null || parseInt(cc.CASA_repeatindex) < 0) cc.CASA_td.style.visibility = "collapse";
}
cc.style.visibility="hidden";
}
else
{
disableBUTTON(cc);
if ((cc.CASA_image != null || cc.CASA_imageprop!= null) &&
(cc.CASA_imagedisabled != null || cc.CASA_imagedisabledprop != null))
{
var vi = parent.gebid(cc.CASA_imgid);
var v  = cc.CASA_imagedisabled;
if ( cc.CASA_imagedisabledprop != null)
{
v = getPropertyValue(cc.CASA_imagedisabledprop);
if (v == null || v == "") v = "../HTMLBasedGUI/general/nothing.gif";
}
vi.src = v;
}
}
cc.style.cursor = "default";
}
else
{
if (cc.CASA_invisiblemode == null || cc.CASA_invisiblemode == "invisible")
{
cc.style.display = "";
if (cc.CASA_td != null) cc.CASA_td.style.display = "";
}
if (cc.CASA_invisiblemode == "cleared")
{
if (cc.CASA_td != null) cc.CASA_td.style.visibility = "visible";
cc.style.visibility="visible";
cc.style.cursor = "";
}
else
{
enableBUTTON(cc);
if ((cc.CASA_image != null && (cc.CASA_imagedisabled != null || cc.CASA_imagedisabledprop != null)) ||
(cc.CASA_imageprop != null))
{
var vi = parent.gebid(cc.CASA_imgid);
var v  = cc.CASA_image;
if (cc.CASA_imageprop != null)
{
v = getPropertyValue(cc.CASA_imageprop);
if (v == null || v == "") v = "../HTMLBasedGUI/general/nothing.gif";
}
vi.src = v;    		}
}
cc.style.cursor = "pointer";
}
}
}
}
function disableBUTTON(cc)
{
cc.disabled = true;
cc.className = "BUTTON"+cc.CASA_stylevariant+"Input";
setColorBUTTON(cc, "#6C7478");
}
function setColorBUTTON(elm, colorCode)
{
if (elm == null) return;
try { elm.style.color = colorCode; } catch(excc) {}
for (var i=0; i<elm.childNodes.length;i++)
setColorBUTTON(elm.childNodes[i], colorCode);
}
function enableBUTTON(cc)
{
cc.disabled = false;
setColorBUTTON(cc, "");
cc.style.cursor = "pointer";
}
function reactBUTTON(evt)
{
return reactBUTTONInternal(evt);
}
function reactBUTTONInternal(evt)
{
if (CL() == null || CL().isEditorPreview()) return;
addLogMessage("BUTTONControls.reactBUTTON(): Button was pressed");
addLogMessage("reactButton() called with " + evt.type);
if (evt.type == "mouseup") return transferModelBUTTON(evt.currentTarget,evt);
else if (evt.type == "keypress") { if (evt.keyCode == 32 || evt.keyCode == 13) return transferModelBUTTON(evt.currentTarget,evt); }
else if (evt.type == "mouseover") return CL().C_rinButtonROLLOVER(this,evt.currentTarget,evt.currentTarget.CASA_stylevariant);
else if (evt.type == "mouseout") return CL().C_routButtonROLLOVER(this,evt.currentTarget,evt.currentTarget.CASA_stylevariant);
}
function transferModelBUTTON(cc,evt)
{
if (checkIO() == false)
{
addLogMessage("BUTTONControls.transferModelBUTTON(): checkIO is blocked");
addLogMessage("transferModelBUTTON() - communication just blocked");
return;
}
if (cc.disabled || (cc.style.visibility=='hidden'))  return;
if (cc.CASA_resetvalerrors == "true")
m_resetValiddationErrorsAndFlush = true;
if (cc.CASA_repeatindex != null)
setPropertyValue("repeatIndex",cc.CASA_repeatindex);
else
setPropertyValue("repeatIndex",-1);
if (cc.type == "submit")
{
for (var i=0; i<m_focusables.length; i++)
if (m_focusables[i].type == "password")
transferChangeFIELD(m_focusables[i],false);
}
if (cc.CASA_isfileuploadbutton != "true")
{
if (cc.CASA_method == null)
{
if (cc.CASA_variant == null)
submitModel("submit");
else
{
setPropertyValue("variantPage",cc.CASA_variant);
invokeMethodInModel("switchToVariant");
}
}
else if (cc.CASA_method.substr(0,11) == "javascript:")
{
addLogMessage("transferModelBUTTON() - calling javascript-method");
eval(cc.CASA_method.substring(11));
}
else
{
addLogMessage("transferModelBUTTON() - calling invokeMethodInModel");
invokeMethodInModel(cc.CASA_method);
}
}
else
{
var rValue = null;
var vParameters = [];
vParameters[0] = m_sessionId;
vParameters[1] = parent.parent.CasaSTYLESHEET;
vParameters[2] = m_direction;
casaPopupParameters = vParameters;
var vPopupPage = 'fileuploadpage_'+m_language+'.html';
m_buffcfileprop = cc.CASA_cfileprop;
m_buffsfileprop = cc.CASA_sfileprop;
m_buffpostuploadmethod = cc.CASA_method;
parent.open('../HTMLBasedGUI/general/'+vPopupPage,
'_blank',
'modal=1,width=400px,height=150px,left=200px,top=200px,scrollbars=no,status=no');
}
}
var m_buffcfileprop;
var m_buffsfileprop;
var m_buffpostuploadmethod;
function reactOnFileUploadClosedBUTTON(clientFileName,serverFileName)
{
setPropertyValue(m_buffcfileprop,clientFileName);
setPropertyValue(m_buffsfileprop,serverFileName);
if (m_buffpostuploadmethod != null)
invokeMethodInModel(m_buffpostuploadmethod);
else
submitModel("submit");
}
function reactOnModelUpdateMENUBUTTON(cc)
{
var v = findVisibleValue(getPropertyValue(cc.CASA_visibleprop));
v = convertStatusToVisible(v);
if (v == null || v == "false")
{
cc.style.display = "none";
if (cc.CASA_td != null) { cc.CASA_td.style.display = "none"; }
}
else
{
cc.style.display = "";
if (cc.CASA_td != null) cc.CASA_td.style.display = "";
}
}
