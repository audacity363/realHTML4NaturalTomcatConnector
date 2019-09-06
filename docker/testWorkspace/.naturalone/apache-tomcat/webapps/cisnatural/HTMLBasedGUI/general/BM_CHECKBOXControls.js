function addVersionInfoBM_CHECKBOXCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_CHECKBOXCONTROLS');
}
function iccBM_CHECKBOX(cc,romumethod,valueprop,flush,flushmethod,visibleprop,invisiblemode,statusprop,nameprop)
{
if (romumethod != null) registerListener(romumethod);
addFocusable(cc,true);
registerPropertyListener(romumethod,valueprop,cc.id);
registerPropertyListener(romumethod,statusprop,cc.id);
registerPropertyListener(romumethod,visibleprop,cc.id);
if (valueprop != null) cc.CASA_valueprop = valueprop;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (flush != null) cc.CASA_flush = flush;
if (flushmethod != null) cc.CASA_flushmethod = flushmethod;
if (statusprop != null) cc.CASA_statusprop = statusprop;
if (nameprop != null) cc.CASA_nameprop = nameprop;
addMLTextNode(findRBCHTextNode(cc));
}
function romuBM_CHECKBOX(cc)
{
if (cc == null) return;
var v = getPropertyValue(cc.CASA_valueprop);
if (v == "true" || v == true )
cc.checked = true;
else
cc.checked = false;
handleRBCHVisibleprop(cc);
handleRBCHStatusprop(cc);
}
function reactBM_CHECKBOX(event)
{
return reactBM_CHECKBOXInternal(event);
}
function reactBM_CHECKBOXInternal(event)
{
var cc = event.currentTarget;
if ( cc.checked == true)
setPropertyValue(cc.CASA_valueprop, "true");
else
setPropertyValue(cc.CASA_valueprop, "false");
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
