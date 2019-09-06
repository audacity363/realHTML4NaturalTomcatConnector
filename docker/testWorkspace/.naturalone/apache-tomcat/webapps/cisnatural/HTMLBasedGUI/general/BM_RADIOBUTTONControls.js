function addVersionInfoBM_RADIOBUTTONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_RADIOBUTTONCONTROLS');
}
function iccBM_RADIOBUTTON(cc,romumethod,valueprop,value,flush,flushmethod,visibleprop,invisiblemode,statusprop,nameprop,datatype)
{
if (romumethod != null) registerListener(romumethod);
addFocusable(cc,true);
registerPropertyListener(romumethod,valueprop,cc.id);
registerPropertyListener(romumethod,statusprop,cc.id);
registerPropertyListener(romumethod,visibleprop,cc.id);
if (valueprop != null) cc.CASA_valueprop = valueprop;
if (value != null) cc.CASA_value = value;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (nameprop != null) cc.CASA_nameprop = nameprop;
if (datatype != null) cc.CASA_datatype = datatype;
addMLTextNode(findRBCHTextNode(cc));
}
function romuBM_RADIOBUTTON(cc)
{
if (cc == null) return;
var v = getPropertyValue(cc.CASA_valueprop);
if ( cc.CASA_datatype != null && cc.CASA_datatype == "float" )
v = parseFloat(v);
if (v == cc.CASA_value)
cc.checked = true;
else
cc.checked = false;
handleRBCHNameprop(cc);
handleRBCHVisibleprop(cc);
handleRBCHStatusprop(cc);
}
function reactBM_RADIOBUTTON(event)
{
return reactBM_RADIOBUTTONInternal(event);
}
function reactBM_RADIOBUTTONInternal(event)
{
var cc = event.currentTarget;
if ( cc.checked == true)
setPropertyValue(cc.CASA_valueprop,cc.CASA_value);
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
function handleRBCHNameprop(cc)
{
if (cc.CASA_nameprop != null)
{
var nameVal = getPropertyValue(cc.CASA_nameprop);
if (nameVal == null) nameVal = "";
var tn = findRBCHTextNode(cc);
if ( tn != null ) tn.nodeValue = nameVal;
else cc.parentNode.appendChild(parent.document.createTextNode(nameVal));
}
}
function findRBCHTextNode(cc)
{
var textNode = cc.parentNode.firstChild;
if (textNode.nodeType == 3) return textNode;
textNode = cc.parentNode.lastChild;
if (textNode.nodeType == 3) return textNode;
return null;
}
function handleRBCHVisibleprop(cc)
{
if (cc.CASA_visibleprop == null || CL().isEditorPreview()) return;
var vv = getPropertyValue(cc.CASA_visibleprop);
var div = cc.parentNode.parentNode;
if (div.children.length > 1) div = cc.parentNode;
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
function handleRBCHStatusprop(cc)
{
if (cc.CASA_statusprop != null)
{
var div = cc.parentNode.parentNode;
if (cc.CASA_initdivclass == undefined) cc.CASA_initdivclass = div.className;
div.className=cc.CASA_initdivclass;
var s = getPropertyValue(cc.CASA_statusprop);
if (s == "ERROR" || s == "FOCUS") addFocusRequestor(cc);
if ( s == "ERROR" || s == "ERROR_NO_FOCUS" ) div.className = div.className + " has-error";
else if (s == "WARNING") div.className= div.className + " has-warning has-feedback";
else if (s == "SUCCESS") div.className= div.className + " has-success has-feedback";
}
}
