function addVersionInfoBM_TABCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_TABCONTROLS');
}
function iccBM_NAVTREE(cc,romumethod,valueprop)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_first = true;
cc.CASA_valueprop = valueprop;
cc.CASA_memchangeindex = "";
}
function romuBM_NAVTREE(cc)
{
if (cc == null) return;
if ( cc.CASA_valueprop == undefined ) return;
if ( cc.CASA_first ) {
parent.$(".nav-tabs a").click(function(){
var linode = this.parentNode;
if ( ! parent.$(linode).hasClass('active') ) {
parent.$('.nav li').removeClass('active');
parent.$(linode).addClass('active');
invokeMethodInModel(cc.CASA_valueprop + ".onSelectTreeNode");
}
});
parent.$(".nav-pills a").click(function(){
var linode = this.parentNode;
if ( ! parent.$(linode).hasClass('active') ) {
parent.$('.nav li').removeClass('active');
parent.$(linode).addClass('active');
invokeMethodInModel(cc.CASA_valueprop + ".onSelectTreeNode");
}
});
cc.CASA_first = false;
}
var vp = cc.CASA_valueprop;
var chi = getPropertyValue(vp+".changeIndex");
if (cc.CASA_memchangeindex == chi) return;
cc.CASA_memchangeindex = chi;
while (true){
if ( cc.children.length == 0 ) break;
cc.removeChild(cc.lastChild);
}
var vCounter = 0;
var mainNode=cc;
while (true)
{
var vBase = vp + ".items["+vCounter+"].";
var text = getPropertyValue(vBase+"text");
var vLevel = getPropertyValue(vBase+"level");
var selected = getPropertyValue(vBase+"selected");
var opened = getPropertyValue(vBase+"opened");
if ( text == null && vLevel == null ) break;
if ( vLevel == null || vLevel == 0 ) {
mainNode = addCollapseNode(cc,text,vCounter,opened);
}
else addTreeNode(cc,mainNode,text,selected,vCounter,vLevel);
vCounter = vCounter +1;
}
}
function handleTreeSelection(cc, index)
{
var vp = cc.CASA_valueprop;
var vCounter = 0;
while (true)
{
var vBase = vp + ".items["+vCounter+"].";
var sel = getPropertyValue(vBase+"selected");
if ( sel == null || sel == undefined) break;
if ( index == vCounter )
setPropertyValue(vBase+"selected", "true" );
else
setPropertyValue(vBase+"selected", "false" );
vCounter = vCounter +1;
}
}
function addTreeNode (cc, cParent, text, selected, vCounter, vLevel)
{
var node = parent.document.createElement("li");
node.setAttribute ("data-casa_index",vCounter);
var nodeA = parent.document.createElement("a");
parent.$(nodeA).click(function(){
var linode = this.parentNode;
if ( ! parent.$(linode).hasClass('active') ) {
parent.$('.nav li').removeClass('active');
parent.$(linode).addClass('active');
handleTreeSelection(cc, parseInt(linode.attributes["data-casa_index"].nodeValue));
invokeMethodInModel(cc.CASA_valueprop + ".onSelectTreeNode");
}
});
var textnode = parent.document.createTextNode(text);
nodeA.appendChild(textnode);
cParent.appendChild(node);
node.appendChild(nodeA);
if ( selected == "true" )
parent.$(node).addClass('active');
if ( vLevel > 1)
parent.$(node).addClass('treenode');
}
function iccBM_TABSUBPAGES(cc,iframeid,romumethod,valueprop,straighttabcount,dropdownstyle)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_first = true;
cc.CASA_iframeid = "" + iframeid;
cc.CASA_valueprop = valueprop;
cc.CASA_straighttabcount = straighttabcount;
cc.CASA_memchangeindex = "";
cc.CASA_dropdownstyle = dropdownstyle;
}
function iccBM_TABPANE(cc,romumethod)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_first = true;
}
function romuBM_TABContainer(cc)
{
if (cc == null) return;
if ( cc.CASA_first ) {
parent.$(".nav-tabs a").click(function(){
parent.$(this).tab('show');
});
parent.$(".nav-pills a").click(function(){
parent.$(this).tab('show');
});
parent.$('.nav-tabs a').on('show.bs.tab', function(event){
onShowBM_TAB(event.target); });
parent.$('.nav-pills a').on('show.bs.tab', function(event){
onShowBM_TAB(event.target); });
parent.$('.nav-tabs li:eq(0) a').tab('show');
parent.$('.nav-pills li:eq(0) a').tab('show');
cc.CASA_first = false;
}
if ( cc.CASA_valueprop == undefined ) return;
var vp = cc.CASA_valueprop;
var sel = getPropertyValue(vp+".selectedIndex");
if ( ! parent.$('.nav-pills li:eq('+sel+') a').hasClass('active') )
parent.$('.nav-pills li:eq('+sel+') a').addClass('active');
if ( ! parent.$('.nav-tabs li:eq('+sel+') a').hasClass('active') )
parent.$('.nav-tabs li:eq('+sel+') a').addClass('active');
var chi = getPropertyValue(vp+".changeIndex");
if (cc.CASA_memchangeindex == chi) return;
cc.CASA_memchangeindex = chi;
var sti = parseInt(cc.CASA_straighttabcount);
while (true){
if ( cc.children.length <= sti ) break;
cc.removeChild(cc.lastChild);
}
var vCounter = 0;
var mainNode=cc;
while (true)
{
var vBase = vp + ".items["+vCounter+"].";
var name = getPropertyValue(vBase+"name");
if ( name == null ) break;
var vLevel = getPropertyValue(vBase+"level");
var pageURL = getPropertyValue(vBase+"pageURL");
if ( name == null && vLevel == null ) break;
if ( vLevel == null || vLevel <= 1 ) {
if ( pageURL == null || pageURL.length <= 5 ) {
if ( cc.CASA_dropdownstyle == "tree" ) mainNode = addCollapseNode(cc,name,vCounter);
else mainNode = addDropdownNodeTab(cc,name);
}
else addTabpage(cc,cc,name,vCounter);
}
else addTabpage(cc,mainNode,name,vCounter);
vCounter = vCounter +1;
}
parent.$('.nav-pills li:eq('+sel+') a').tab('show');
parent.$('.nav-tabs li:eq('+sel+') a').tab('show');
}
function addTabpage (cc,root,name,index)
{
var nodeLi = parent.document.createElement("li");
var nodeA = parent.document.createElement("a");
nodeA.setAttribute("data-toggle", "tab");
nodeA.setAttribute("data-casa_pageindex", index);
nodeA.setAttribute("data-casa_straighttabcount", cc.CASA_straighttabcount);
nodeA.setAttribute("data-casa_iframeid", cc.CASA_iframeid);
nodeA.setAttribute("data-casa_valueprop", cc.CASA_valueprop);
nodeA.setAttribute ("href", "#D"+ cc.CASA_iframeid );
var nodeText = parent.document.createTextNode(name);
nodeA.appendChild(nodeText);
nodeLi.appendChild(nodeA);
root.appendChild(nodeLi);
parent.$(nodeA).on('show.bs.tab', function(event){
onShowBM_TAB(event.target); });
parent.$(nodeA).click(function(){
parent.$(this).tab('show'); });
}
function addDropdownNodeTab (cParent, name)
{
var node = parent.document.createElement("li");
node.setAttribute ("class", "dropdown");
var nodeA = parent.document.createElement("a");
nodeA.setAttribute ("class", "dropdown-toggle");
nodeA.setAttribute ("data-toggle", "dropdown");
var nodeSpan = parent.document.createElement("span");
nodeSpan.setAttribute ("class","caret");
var nodeUL = parent.document.createElement("ul");
nodeUL.setAttribute ("class","dropdown-menu");
var textnode = parent.document.createTextNode(name);
nodeA.appendChild(textnode);
nodeA.appendChild(nodeSpan);
cParent.appendChild(node);
node.appendChild(nodeA);
node.appendChild(nodeUL);
return nodeUL;
}
function addCollapseNode(cParent, name, counter,opened)
{
var node = parent.document.createElement("li");
node.setAttribute ("class", "dropdown");
var nodeA = parent.document.createElement("a");
nodeA.setAttribute ("class", "dropdown-toggle");
nodeA.setAttribute ("data-toggle", "collapse");
nodeA.setAttribute ("data-target", "#ul"+counter);
var nodeSpan = parent.document.createElement("span");
nodeSpan.setAttribute ("class","caret");
var nodeUL = parent.document.createElement("ul");
nodeUL.setAttribute ("class","nav nav-pills nav-stacked tree collapse");
nodeUL.setAttribute ("id", "ul" + counter);
parent.$(nodeUL).on('hidden.bs.collapse',function() {
if (cParent.CASA_valueprop != undefined && cParent.CASA_valueprop != null)
{
if ( getPropertyValue (cParent.CASA_valueprop+".items["+counter+"].opened" ) != null ){
setPropertyValue (cParent.CASA_valueprop+".items["+counter+"].opened", 0);
}
}
});
parent.$(nodeUL).on('shown.bs.collapse',function() {
if (cParent.CASA_valueprop != undefined && cParent.CASA_valueprop != null)
{
if ( getPropertyValue (cParent.CASA_valueprop+".items["+counter+"].opened" ) != null ){
setPropertyValue (cParent.CASA_valueprop+".items["+counter+"].opened", 1);
}
}
});
var textnode = parent.document.createTextNode(name);
nodeA.appendChild(textnode);
nodeA.appendChild(nodeSpan);
cParent.appendChild(node);
node.appendChild(nodeA);
node.appendChild(nodeUL);
if ( opened != undefined && opened != null && opened == 1 )
parent.$(nodeUL).collapse("show");
return nodeUL;
}
function onShowBM_TAB(cc)
{
parent.$('.nav li').removeClass('active');
if (cc.attributes["data-toggle"].nodeValue  != "tab") return;
if ( cc.attributes["data-casa_valueprop"] == undefined )
{
if ( cc.CASA_openmethod != null )
invokeMethodInModel(cc.CASA_openmethod);
return;
}
var vprop = cc.attributes["data-casa_valueprop"].nodeValue;
if (cc.attributes["data-casa_iframeid"] != undefined )
{
var pgi = cc.attributes["data-casa_pageindex"].nodeValue;
var vpurl = getPropertyValue(vprop+".items["+pgi+"].pageURL");
if ( vpurl == null || vpurl == "" ) return;
vpurl = convertCasabacURL(vpurl);
var vPid = getPropertyValue(vprop+".items["+pgi+"].pageId");
var iframeid = cc.attributes["data-casa_iframeid"].nodeValue;
var sessionId = parent.parent.getCurrentSessionId();
var processId = parent.parent.getCurrentProcessId();
var selectedIndex = parseInt(cc.attributes["data-casa_straighttabcount"].nodeValue) + parseInt(pgi);
setPropertyValue(vprop+".selectedIndex",selectedIndex);
parent.frames[iframeid].showPage(vpurl,vPid,sessionId,processId,true);
invokeMethodInModel(vprop+".trigger");
}
else
{
setPropertyValue(vprop+".selectedIndex", parseInt(cc.attributes["data-casa_tabindex"].nodeValue));
if ( cc.attributes["data-casa_triggerserver"] != undefined )
invokeMethodInModel(vprop+".trigger");
}
}
function iccBM_TAB(cc,romumethod,nameprop,visibleprop,invisiblemode,openmethod)
{
if (romumethod != null) registerListener(romumethod);
if (nameprop != null) {
cc.CASA_nameprop = nameprop;
registerPropertyListener(romumethod,nameprop,cc.id);
}
if (visibleprop != null) {
cc.CASA_visibleprop = visibleprop;
registerPropertyListener(romumethod,visibleprop,cc.id);
}
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (openmethod != null) cc.CASA_openmethod = openmethod;
parent.$('.pager a').on('show.bs.tab', function(event){
onShowBM_PAGER(event.target); });
}
function romuBM_TAB(cc)
{
if (cc == null) return;
if ( cc.CASA_nameprop != null ) {
var thename = getPropertyValue(cc.CASA_nameprop);
if ( cc.firstChild) cc.firstChild.nodeValue = thename;
else cc.appendChild(parent.document.createTextNode(thename));
}
handleTABVisibleprop(cc);
}
function handleTABVisibleprop(cc)
{
if (cc.CASA_visibleprop == null || CL().isEditorPreview()) return;
var vv = getPropertyValue(cc.CASA_visibleprop);
var linode = cc.parentNode;
if (vv == "true")
{
if ( parent.$(linode).hasClass("disabled") ){
parent.$(linode).removeClass("disabled");
}
if ( parent.$("#"+cc.id).hasClass("disabled") ){
parent.$("#"+cc.id).removeClass("disabled");
}
cc.style.display="";
cc.style.removeProperty("pointer-events");
}
else
{
if (cc.CASA_invisiblemode == "invisible") {
if ( parent.$(linode).hasClass("active")){
parent.$('.nav-tabs li:eq(0) a').tab('show');
parent.$('.nav-pills li:eq(0) a').tab('show');
}
cc.style.display = "none";
}
else if (cc.CASA_invisiblemode == "disabled") {
cc.style.setProperty("pointer-events", "none");
if (! parent.$(linode).hasClass("disabled") )
parent.$(linode).addClass("disabled");
if (! parent.$("#"+cc.id).hasClass("disabled") )
parent.$("#"+cc.id).addClass("disabled");
if ( parent.$(linode).hasClass("active")){
parent.$('.nav-tabs li:eq(0) a').tab('show');
parent.$('.nav-pills li:eq(0) a').tab('show');
}
}
}
}
function iccBM_PAGER(cc, romumethod, valueprop){
if (romumethod != null) registerListener(romumethod);
cc.CASA_valueprop = valueprop;
}
function romuBM_PAGER(cc) {
var vCounter = 0;
while (true)
{
var vBase = cc.CASA_valueprop + ".pager.items["+vCounter+"].";
var index = getPropertyValue(vBase+"index");
if ( index == null ) break;
var name = getPropertyValue(vBase+"name");
updatePager(cc,vCounter,index,name);
vCounter = vCounter +1;
}
}
function onShowBM_PAGER(acc){
var pi = parseInt(acc.attributes["data-casa_pageindex"].nodeValue);
if ( pi <= -1 ) return;
parent.$('.nav-pills li:eq('+pi+') a').tab('show');
parent.$('.nav-tabs li:eq('+pi+') a').tab('show');
}
function updatePager (cc,pindex,index,name)
{
var nodeA = cc.children[pindex].firstChild;
nodeA.setAttribute("data-casa_pageindex", index);
var inti = parseInt("" + index);
if (inti == -1 )  { nodeA.style.display="none"; return; }
nodeA.style.display="";
nodeA.firstChild.nodeValue = name;
}
