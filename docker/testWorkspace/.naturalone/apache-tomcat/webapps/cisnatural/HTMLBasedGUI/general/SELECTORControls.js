function addVersionInfoSELECTORCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SELECTORCONTROLS');
}
function iccSELECTOR(cc,romumethod,remethod,arrayprop,valueprop,imageprop,image,selectprop,withlinenum,repeatindex,singleselect,alwaysshowicon,tabindex,cti)
{
cc.parentNode.onmouseover = remethod;
cc.parentNode.onmouseout = remethod;
cc.parentNode.onkeypress = remethod;
cc.parentNode.tabIndex = 0;
cc.parentNode.onclick = remethod;
cc.parentNode.ondblclick = remethod;
cc.CASA_arrayprop = arrayprop;
cc.CASA_valueprop = valueprop;
cc.CASA_imageprop = imageprop;
cc.CASA_image = image;
cc.CASA_selectprop = selectprop;
cc.CASA_repeatindex = repeatindex;
if (singleselect == "true") cc.CASA_singleselect = true; else cc.CASA_singleselect = false;
if (withlinenum == "true") cc.CASA_withlinenum = true; else cc.CASA_withlinenum = false;
if (alwaysshowicon != null) cc.CASA_alwaysshowicon = alwaysshowicon;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (cti != null) cc.CASA_cti = cti;
cc.CASA_mem = undefined;
registerPropertyListener(romumethod,valueprop,cc.id);
registerPropertyListener(romumethod,arrayprop+".topIndex",cc.id);
if (imageprop != null) registerPropertyListener(romumethod,imageprop,cc.id);
var td = cc.parentNode;
addFocusable(td,false);
startFocusCell(td);
applyCasaTabIndexFor(cc, td, "SELECTOR");
}
function romuSELECTOR(cc)
{
var vti = getPropertyValue(cc.CASA_arrayprop + ".topIndex") * 1;
var vse = getPropertyValue(cc.CASA_valueprop);
var vim = null;
if (cc.CASA_imageprop != null) vim = getPropertyValue(cc.CASA_imageprop);
var vtext = "";
if (cc.CASA_withlinenum == true)
{
if (vse != null) vtext = vti + cc.CASA_repeatindex + 1;
}
else
{
if (vse == "true" || cc.CASA_alwaysshowicon == "true")
{
if (vim != null) cc.CASA_image = vim;
else if (cc.CASA_alwaysshowicon == "true") cc.CASA_image = "../HTMLBasedGUI/general/nothing.gif";
if (cc.CASA_image == null)
vtext = "<img src='../HTMLBasedGUI/images/arrowright.gif'>";
else
vtext = "<img src='"+cc.CASA_image+"'>";
}
}
var mem = vse + "/" + vtext + "/" + vim;
if (cc.CASA_mem != undefined && cc.CASA_mem == mem) return;
cc.CASA_mem = mem;
cc.innerHTML = vtext;
if (vse == "true") cc.style.fontWeight = "bold";
else cc.style.fontWeight = "";
}
function reSELECTOR(ev)
{
return reSELECTORInternal(ev);
}
function reSELECTORInternal(ev)
{
if (ev.type == "keypress")
{
if (ev.keyCode != 13 &&
ev.keyCode != 32)
{
return;
}
var nev = new Object();
nev.type = "click";
nev.ctrlKey = ev.ctrlKey;
nev.shiftKey = ev.shiftKey;
nev.currentTarget = ev.currentTarget;
nev.target = ev.target;
ev = nev;
}
if (ev.type == "mouseover")
{
ev.currentTarget.className = "SELECTORCellRolledOver";
}
else if (ev.type == "mouseout")
{
ev.currentTarget.className = "SELECTORCell";
}
else if (ev.type == "click" || ev.type == "dblclick")
{
var cc = ev.currentTarget.firstElementChild;
if (cc.CASA_canceleventstartdate != null)
{
var now = (new Date()).getTime();
if (now - cc.CASA_canceleventstartdate < 500)
return;
cc.CASA_canceleventstartdate = null;
}
reactOnClickSELECTOR(cc,ev);
submitModel();
}
}
function reactOnClickSELECTOR(cc,ev)
{
var vse = getPropertyValue(cc.CASA_valueprop);
if (vse == null) return;
var vtop = 1 * getPropertyValue(cc.CASA_arrayprop + ".topIndex");
if (cc.CASA_singleselect == true)
{
if (vse == "true") setPropertyValue(cc.CASA_valueprop,"false");
else setPropertyValue(cc.CASA_valueprop,"true");
setPropertyValue(cc.CASA_arrayprop + ".singleSelectProp",cc.CASA_selectprop);
setPropertyValue(cc.CASA_arrayprop + ".lastSelectedIndex", vtop + cc.CASA_repeatindex);
}
else
{
setPropertyValue(cc.CASA_arrayprop + ".multiSelectProp",cc.CASA_selectprop);
setPropertyValue(cc.CASA_arrayprop + ".lastSelectedIndex", vtop + cc.CASA_repeatindex);
if (ev.shiftKey == true)
{
setPropertyValue(cc.CASA_arrayprop + ".shiftSelectIndex", vtop + cc.CASA_repeatindex);
if (parent.window.getSelection)
parent.window.getSelection().removeAllRanges();
else if (parent.document.selection)
parent.document.selection.empty();
}
else if (ev.ctrlKey == true)
{
if (vse == "true")
setPropertyValue(cc.CASA_valueprop,"false");
else
setPropertyValue(cc.CASA_arrayprop + ".ctrlSelectIndex", vtop + cc.CASA_repeatindex);
}
else
{
if (vse == "true") setPropertyValue(cc.CASA_valueprop,"false");
else setPropertyValue(cc.CASA_valueprop,"true");
setPropertyValue(cc.CASA_arrayprop + ".selectIndex", vtop + cc.CASA_repeatindex);
}
}
}
