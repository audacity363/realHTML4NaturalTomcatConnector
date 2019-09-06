function addVersionInfoBM_NAVBARCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_NAVBARCONTROLS');
}
function Navbar ()
{
}
function iccNAVBAR(cc,cchead,ccnav)
{
cc.CASA_navbar = new Navbar ();
cc.CASA_head = cchead;
cc.CASA_nav = ccnav;
return cc.CASA_navbar;
}
function addButtonNodeNAVBAR (id,cParent, label, isActive, method, disabled)
{
var node = parent.document.createElement("li");
node.setAttribute ("id",id);
if (isActive)
node.setAttribute ("class", "active");
if ( disabled ) {
if (! parent.$(node).hasClass("disabled") )
parent.$(node).addClass("disabled");
}
var nodeA = parent.document.createElement("a");
nodeA.setAttribute ("onclick", "C.onClickNAVBAR("+id+",\'"+method+"\')");
var textnode = parent.document.createTextNode(label);
nodeA.appendChild(textnode);
cParent.appendChild(node);
node.appendChild(nodeA);
}
function addDropdownNodeNAVBAR (id,cParent, label)
{
var node = parent.document.createElement("li");
node.setAttribute ("id",id);
node.setAttribute ("class", "dropdown");
var nodeA = parent.document.createElement("a");
nodeA.setAttribute ("class", "dropdown-toggle");
nodeA.setAttribute ("data-toggle", "dropdown");
var nodeSpan = parent.document.createElement("span");
nodeSpan.setAttribute ("class","caret");
var nodeUL = parent.document.createElement("ul");
nodeUL.setAttribute ("class","dropdown-menu");
var textnode = parent.document.createTextNode(label);
nodeA.appendChild(textnode);
nodeA.appendChild(nodeSpan);
cParent.appendChild(node);
node.appendChild(nodeA);
node.appendChild(nodeUL);
return nodeUL;
}
function onClickNAVBAR (node, vMethod)
{
parent.$(".nav").find(".active").removeClass("active");
parent.$(node).addClass("active");
if (vMethod.length > 0) {
invokeMethodInModel(vMethod);
parent.$('.navbar-collapse').collapse('hide');
}
}
function addBrandNodeNAVBAR (pCC, brand)
{
var nodeA = parent.document.createElement("a");
nodeA.setAttribute ("id", "navbar-brandA");
nodeA.setAttribute ("class", "navbar-brand");
if ( pCC.CASA_straighttext != "true")
nodeA.innerHTML = brand;
else {
var textnode = parent.document.createTextNode(brand);
nodeA.appendChild (textnode);
}
pCC.CASA_head.appendChild (nodeA);
}
function reactOnModelUpdateNAVBAR(pCC)
{
var mcp = pCC.CASA_navbarcollectionprop;
var vci = getPropertyValue(mcp+".changeIndex");
if (pCC.CASA_bufferedVCI != undefined &&
pCC.CASA_bufferedVCI == vci)
{
return;
}
pCC.CASA_bufferedVCI = vci;
var oldBrandA = parent.document.getElementById("navbar-brandA");
if (oldBrandA!=null)
{
while (oldBrandA.firstChild) {
oldBrandA.removeChild(oldBrandA.firstChild);
}
pCC.CASA_head.removeChild (oldBrandA);
}
while (pCC.CASA_nav.firstChild) {
pCC.CASA_nav.removeChild(pCC.CASA_nav.firstChild);
}
var bBrandprop = pCC.CASA_navbarbrandprop;
if (bBrandprop != null)
{
var brand = getPropertyValue(bBrandprop);
if (brand != null && brand.length > 0)
{
addBrandNodeNAVBAR (pCC, brand);
}
}
var vCounter = 0;
var mainNode=null;
while (true)
{
var vBase = pCC.CASA_navbarcollectionprop + ".items["+vCounter+"].";
var vLevel = getPropertyValue(vBase+"level");
if (vLevel == null)
break;
var vText = getPropertyValue(vBase+"text");
var vOpened = getPropertyValue(vBase+"opened");
var vInactive = getPropertyValue(vBase+"inactive");
var method = getPropertyValue(vBase+"method");
if (vLevel==0){
if (vOpened == 0){
mainNode = addDropdownNodeNAVBAR("li"+vCounter+1,pCC.CASA_nav,vText);
}
else
addButtonNodeNAVBAR("li"+vCounter+1, pCC.CASA_nav, vText, vCounter==0, method, (vInactive == true || vInactive == 'true'));
}
else{
addButtonNodeNAVBAR("li"+vCounter+1, mainNode, vText, vCounter==0, method, (vInactive == true || vInactive == 'true'));
}
vCounter++
}
}
