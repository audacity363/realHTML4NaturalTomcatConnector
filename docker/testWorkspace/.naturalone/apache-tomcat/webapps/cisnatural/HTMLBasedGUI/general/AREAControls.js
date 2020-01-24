function addVersionInfoAREACONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('AREACONTROLS');
}
function iccAREA(cc,id,foldedprop,folded,foldableprop,visibleprop,height,toggleimg,nameprop,imageprop,flush,flushmethod,
withleftborder)
{
cc.CASA_id = id;
cc.CASA_areaIsFolded = false;
cc.CASA_timeout = null;
if (folded == "true")
cc.CASA_areaIsFolded = true;
if (foldedprop != null) cc.CASA_foldedprop = foldedprop;
if (foldableprop != null) cc.CASA_foldableprop = foldableprop;
cc.CASA_flush = flush;
cc.CASA_flushmethod = flushmethod;
cc.CASA_memVisible = undefined;
cc.CASA_memName = undefined;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
cc.CASA_tr = parent.gebid("TRAREA"+id);
cc.CASA_td = parent.gebid("TDAREA"+id);
cc.CASA_span = parent.gebid("$"+id);
cc.CASA_height = height;
if (toggleimg != null) cc.CASA_toggleimg = toggleimg;
if (nameprop != null) cc.CASA_nameprop = nameprop;
if (imageprop != null)
{
cc.CASA_memImage = undefined;
cc.CASA_imageprop = imageprop;
cc.CASA_img = parent.gebid("AREAIMG_"+id);
}
else cc.CASA_fadedtoggling = false;
cc.CASA_steps = 4;
cc.CASA_tout = 20;
cc.CASA_memFoldedSTATUS = null;
cc.CASA_withleftborder = withleftborder;
}
function romuAREA(cc)
{
if (cc.CASA_foldedprop != null)
{
var v = getPropertyValue(cc.CASA_foldedprop);
if (v != null)
{
if (v != (""+cc.CASA_memFoldedSTATUS))
{
cc.CASA_areaIsFolded = false;
if (v == 'false')
cc.CASA_areaIsFolded = true;
toggleAreaAREA(cc, false, null,cc.CASA_toggleimg);
}
}
}
if (cc.CASA_foldableprop != null)
{
var v = getPropertyValue(cc.CASA_foldableprop);
if (v != null)
{
if (v != cc.CASA_memFoldableSTATUS)
{
cc.CASA_memFoldableSTATUS = v;
if (v == "false")
{
if (cc.CASA_toggleimg != null) cc.CASA_toggleimg.style.display = "none";
}
else
{
if (cc.CASA_toggleimg != null) cc.CASA_toggleimg.style.display = "";
}
}
}
}
if (cc.CASA_visibleprop != null)
{
var v = findVisibleValue(getPropertyValue(cc.CASA_visibleprop));
if (v != null && cc.CASA_memVisible != v)
{
cc.CASA_memVisible = v;
v = convertStatusToVisible(v,CONTROLTYPE_CONTAINER);
if (v != 'false')
{
cc.CASA_tr.style.display = '';
}
else
{
cc.CASA_tr.style.display = 'none';
}
}
}
if (cc.CASA_nameprop != null)
{
var v = getPropertyValue(cc.CASA_nameprop);
if (v != null && cc.CASA_memName != v)
{
cc.CASA_memName = v;
cc.CASA_span.innerHTML = v;
}
}
if (cc.CASA_imageprop != null)
{
var v = getPropertyValue(cc.CASA_imageprop);
if (v != null && cc.CASA_memImage != v)
{
cc.CASA_memImage = v;
cc.CASA_img.src = v;
}
}
if(cc.CASA_memDirection == null && m_direction == "ltr") cc.CASA_memDirection = m_direction;
if (cc.CASA_memDirection != m_direction)
{
try
{
if(cc.CASA_withleftborder != "false" && cc.CASA_ltc == null)
{
cc.CASA_ltc = parent.gebid("AREALTC_"+cc.CASA_id);
if(cc.CASA_ltc != null) cc.CASA_ltcClass = cc.CASA_ltc.className;
}
if(cc.CASA_ltc != null)
{
var vltcClass = cc.CASA_ltcClass;
if(m_direction == "rtl") vltcClass += "RTL";
cc.CASA_ltc.className = vltcClass;
}
}
catch(ex){}
cc.CASA_memDirection = m_direction;
}
}
function getCounterHeightAREA(cc,height)
{
var tmp = (cc.CASA_counterh*(100/cc.CASA_steps));
return ((height*tmp)/100);
}
function toggleAreaAREA(cc, passToModel,evt,imgSpan)
{
if (evt != null)
{
var srcElm = findSrcElement(evt);
if (srcElm != null && srcElm.id != null && srcElm.id.indexOf("ICON")>=0) return;
}
if (cc.CASA_memFoldableSTATUS == "false")
return;
cc.CASA_areaIsFolded = !cc.CASA_areaIsFolded;
if (""+cc.CASA_areaIsFolded == ""+cc.CASA_memFoldedSTATUS)
{
return;
}
cc.CASA_memFoldedSTATUS = cc.CASA_areaIsFolded;
if (imgSpan != null)
{
var className = "AREAToggleImg";
if (cc.CASA_stylevariant != null)
className = "AREA"+cc.CASA_stylevariant+"ToggleImg";
if (cc.CASA_areaIsFolded)
className += "Folded";
imgSpan.className = className;
}
var vft = cc.CASA_fadedtoggling;
if (getPropertyValue("cISAddons.anc") == "false")
vft = false;
if (cc.CASA_areaIsFolded == true)
{
cc.style.display = 'none';
if (cc.CASA_height != null)
cc.CASA_td.height = "";
}
else
{
cc.style.display = '';
if (cc.CASA_height != null)
cc.CASA_td.height = cc.CASA_height;
}
if (passToModel == true)
{
if (cc.CASA_foldedprop != null)
setPropertyValue(cc.CASA_foldedprop,""+cc.CASA_areaIsFolded);
if (cc.CASA_flushmethod != null)
{
m_displayOccupied = false;
invokeMethodInModel(cc.CASA_flushmethod);
}
else if (cc.CASA_flush == "server")
{
m_displayOccupied = false;
submitModel("submit");
}
else if (cc.CASA_flush == "screen")
updateModelListenersS();
else
{
m_displayOccupied = false;
invokeMethodInModel("__ZZZinternalProcessDefault");
}
}
}
