function addVersionInfoINTPOPUPCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('INTPOPUPCONTROLS');
}
var m_identIP;
var m_visIP;
var m_prevActElem;
function iccINTPOPUP()
{
}
function romuINTPOPUP()
{
var op = getPropertyValue("cISAddons.popupOpening");
var cl = getPropertyValue("cISAddons.popupClosing");
var frmName = getFrmNameIP();
initValuesIP(op,cl);
var vTopFrameDoc = null;
if(m_visIP == true)
{
vTopFrameDoc = getFrmDocIP(frmName);
prepareDIR(vTopFrameDoc);
m_identIP = getBIdentIP();
initObjIP(vTopFrameDoc,frmName);
var cc = vTopFrameDoc.getElementById("IPO_" + getIdentIP("span"));
cc.CASA_innerspan = vTopFrameDoc.getElementById("IPI_" + getIdentIP("span"));
initMozIP(cc,op);
initArrsIP(cc , op);
initPosIP(cc,vTopFrameDoc);
cc.style.display = "";
cc.CASA_innerspan.style.display = "";
disableInputElements();
}
if(m_visIP == false && CL().CASA_popupopenersids.length > 0)
{
m_identIP = CL().CASA_popupopenersids[CL().CASA_popupopenersids.length-1];
if ( vTopFrameDoc == null ) vTopFrameDoc = getFrmDocIP(frmName);
var vPDiv = vTopFrameDoc.getElementById("PDIV_" + m_identIP);
if(vPDiv != null)
{
var cc = vTopFrameDoc.getElementById("IPO_" + getIdentIP("span"));
cc.CASA_innerspan = vTopFrameDoc.getElementById("IPI_" + getIdentIP("span"));
cc.CASA_outdiv = vPDiv;
cc.style.display = "none";
cc.CASA_innerspan.style.display = "none";
var vSelfFrame = CL().CASA_popupopenersvalues[CL().CASA_popupopenersvalues.length-1].csciframe;
CL().CASA_buffSpanIP = cc;
clearSPageIP(vSelfFrame.parent);
clearTBarIP(vSelfFrame.parent);
clearFuncIP(vSelfFrame.parent);
clearControlIP(vSelfFrame);
}
}
}
function unloadINTPOPUP()
{
if ( CL() == null ) return;
if(CL().CASA_buffSpanIP == null) return;
enableInputElements();
if(CL().CASA_popupopenersids.length > 0)
{
CL().CASA_popupopenersids = removeIndexOfIP(CL().CASA_popupopenersids, CL().CASA_popupopenersids.length-1);
CL().CASA_popupopenersvalues = removeIndexOfIP(CL().CASA_popupopenersvalues, CL().CASA_popupopenersvalues.length-1);
}
var buffSpanIP = CL().CASA_buffSpanIP;
buffSpanIP.CASA_innerspan.parentNode.removeChild(buffSpanIP.CASA_innerspan);
buffSpanIP.CASA_outdiv.parentNode.removeChild(buffSpanIP.CASA_outdiv);
buffSpanIP.parentNode.removeChild(buffSpanIP);
CL().CASA_buffSpanIP = null;
}
function clearFuncIP(vCloseParent)
{
var casaPAGEIdent = getIdentIP("casaPage");
var tBarIdent = getIdentIP("title");
vCloseParent["reactOnModelUpdate" + tBarIdent] = null;
vCloseParent["onExecuteItem"] =  null;
vCloseParent["closePage" + tBarIdent] = null;
vCloseParent["showPage" + casaPAGEIdent] =  null;
vCloseParent["reactOnModelUpdate" + casaPAGEIdent] =  null
}
function genFuncIP()
{
var casaPAGEIdent = getIdentIP("casaPage");
var tBarIdent = getIdentIP("title");
parent["reactOnModelUpdate" + tBarIdent] = function romuINTPOPUPTB(model) {
CL().romuTITLEBAR(parent["C_"+tBarIdent]);
};
parent["onExecuteItem"] = function onExecuteItem() {
CL().onExecutePageItemTITLEBAR(this);
};
parent["closePage" + tBarIdent] = function () {
try
{
if(parent["CasaCASAPAGE"+casaPAGEIdent] != null &&
parent["CasaCASAPAGE"+casaPAGEIdent].WORKAREA.csciframe.checkAllValidations() == false)
return;
} catch(ex) {}
if (parent["CasaCASAPAGE"+casaPAGEIdent] != null) CL().closePagePopupTITLEBAR(parent["C_"+tBarIdent], parent["CasaCASAPAGE"+casaPAGEIdent]);
else CL().closePageTITLEBAR(parent["C_"+tBarIdent]);
};
parent["showPage" + casaPAGEIdent] = function (pageURL,modelId,sessionId,processId) {
parent.C.showPageSUBCISPAGE14(parent["CasaCASADIV"+casaPAGEIdent],pageURL,modelId,sessionId,processId);
};
parent["reactOnModelUpdate" + casaPAGEIdent] = function romuINTPOPUPPAGE(model) {
parent.C.reactOnModelUpdateSUBCISPAGE14(parent["CasaCASADIV"+casaPAGEIdent],parent["showPage"+casaPAGEIdent]);
};
}
function pointFocusAfterIP()
{
if (m_prevActElem != null && m_visIP == null )
{
try{if(m_prevActElem.setActive) m_prevActElem.setActive(); else m_prevActElem.focus();m_prevActElem = null;} catch(me){}
}
}
function genIP()
{
var vHtml = [];
var spanIdent = getIdentIP("span");
var spanID = "IPO_" + spanIdent;
var spanZIndex = 1000;
var innerID = "IPI_" + spanIdent;
var innerZIndex = 1001;
var tBarIdent = getIdentIP("title");
var tBarTRID = "TITLEBARTITLEBARTR" + tBarIdent;
var tBarID = "TITLEBARTITLEBAR" + tBarIdent;
var tBarSpanID = "TITLEBARSPAN"+ tBarIdent;
var tBarCmdsID = "TITLEBAR"+tBarIdent+"PAGEPOPUPCOMMANDS";
var tBarCloseID = "TITLEBAR"+tBarIdent+"CLOSE";
var intITRIdent = getIdentIP("intITR");
var intTRID = "ITR" + intITRIdent;
var casaPAGEIdent = getIdentIP("casaPage");
var casaDIVID = "CASADIV"+casaPAGEIdent;
var casaPAGEID = "CASAPAGE" + casaPAGEIdent;
vHtml.push("<span class='FLASHActive' id='"+spanID+"'  style='position:absolute;left:0;top:0;width:2000px;height:1500px;z-index:"+spanZIndex+";'> </span>");
vHtml.push("<span id='"+innerID+"' style='position:absolute;left:-100px;top:-100px;width:100px; height:100px;z-index:"+innerZIndex+";background-color: #FFFFFF; overflow: hidden; border: 1px #808080 solid;'>");
vHtml.push("<table height='100%' style='height: 100%' width='100%' cellpadding='0' cellspacing='0'>");
vHtml.push("<tr id='"+tBarTRID+"'  style=' '>");
vHtml.push("<td colspan='50' width='100%' height='0' align='center'>");
vHtml.push("<table width='100%' cellspacing=0 cellpadding=0 class='INTPOPUPTable'>");
vHtml.push("<tr><td width='100%' class='INTPOPUPDragCell' onmousedown='return romDownIP("+innerID+", event);'>");
vHtml.push("<table id='"+tBarID+"' width='100%' cellspacing=1 cellpadding=0 style='table-layout: fixed'>");
vHtml.push("<tr><td width='100%'  class='TDAroundControl'>");
vHtml.push("<div nowrap='true' class='INTPOPUPCell' style='overflow-x: hidden;' id='"+tBarSpanID+"'></div>");
vHtml.push("</td></tr></table></td>");
vHtml.push("<td width=0>");
vHtml.push("<table width=0 cellspacing=0 cellpadding=0>");
vHtml.push("<tr><td onmousedown='return romDownIP("+innerID+", event);' class='INTPOPUPDragCell'>&nbsp;</td>");
vHtml.push("<td id='"+tBarCmdsID+"'></td>");
vHtml.push("<td id='"+tBarCloseID+"'  valign='middle' onmouseenter='if (C.checkIO() == false) return; C.CL().C_rollinIconROLLOVER(this);' onmouseleave=\"this.className = 'ICONImage';\" onclick='closePage"+tBarIdent+"()'><div class='INTPOPUPCellClose'>&nbsp;</div>");
vHtml.push("</td></tr></table></td></tr></table></td></tr>");
vHtml.push("<tr id='"+intTRID+"' style='background-color: #ACADAF'>");
vHtml.push("<td  valign='top' colspan='50' class='TDAroundControl' width='100%' height='1px'>");
vHtml.push("</td></tr>");
vHtml.push("<td colspan=1 rowspan=1 width='100%' height='100%' class='TDAroundControl'>");
vHtml.push("<div id='"+casaDIVID+"' width='100%' height='100%' style='width:100%;height:100%'>");
vHtml.push("<iframe name='"+casaPAGEID+"' id='"+casaPAGEID+"' "+ getTesttoolidHtml()+"='pagepopup"+getBIdentIP()+"' src='../servlet/StartCISPage?PAGEURL=../HTMLBasedGUI/general/blankpage.html&UNIQUEID=99&ONUNLOADBEHAVIOUR=NOTHING&CENTRALLIB=PP' class='SUBCISPAGEIframe' style=';border-width:0' width='100%' height='100%'></iframe>");
vHtml.push("</div></td></table></span>");
return vHtml.join("");
}
function clearSPageIP(vCloseParent)
{
var casaPAGEIdent = getIdentIP("casaPage");
if(vCloseParent["reactOnModelUpdate"+casaPAGEIdent])
vCloseParent["reactOnModelUpdate"+casaPAGEIdent]();
var vCounter = 0;
while(vCloseParent["CasaCASAPAGE"+casaPAGEIdent].frames &&
vCloseParent["CasaCASAPAGE"+casaPAGEIdent].frames[vCounter] != null)
{
vCloseParent["CasaCASAPAGE"+casaPAGEIdent].frames[vCounter].location.href = "../servlet/StartCISPage?PAGEURL=../HTMLBasedGUI/general/blankpage.html&UNIQUEID=99&ONUNLOADBEHAVIOUR=NOTHING&CENTRALLIB=PP";
vCounter++;
}
vCloseParent.C.removeListener("romuINTPOPUPPAGE");
vCloseParent["CasaCASAPAGE"+casaPAGEIdent] = null;
vCloseParent["CasaCASADIV"+casaPAGEIdent] = null;
}
function initSPageIP(vTopFrameDoc)
{
var casaPAGEIdent = getIdentIP("casaPage");
var casaDIVID = "CASADIV"+casaPAGEIdent;
var casaPAGEID = "CASAPAGE" + casaPAGEIdent;
var vCasaCASAPAGE = null;
if(vTopFrameDoc.getElementById(casaPAGEID) != null)
vCasaCASAPAGE = parent["CasaCASAPAGE"+casaPAGEIdent] = vTopFrameDoc.getElementById(casaPAGEID).contentWindow;
var vCasaCASADIV = parent["CasaCASADIV"+casaPAGEIdent] = vTopFrameDoc.getElementById(casaDIVID);
parent.C.initCasaControlSUBCISPAGE14(vCasaCASADIV);
vCasaCASADIV.CASA_page = vCasaCASAPAGE;
vCasaCASADIV.CASA_divid = casaPAGEIdent;
parent.C.registerListener(parent["reactOnModelUpdate"+casaPAGEIdent]);
vCasaCASADIV.CASA_valueprop = 'cISAddons.ppsubcispage.page';
vCasaCASADIV.CASA_processidprop = 'cISAddons.ppsubcispage.subsessionId';
vCasaCASADIV.CASA_modelidprop = 'cISAddons.ppsubcispage.pageId';
vCasaCASADIV.CASA_refreshprop = 'cISAddons.ppsubcispage.changeIndex';
}
function clearTBarIP(vCloseParent)
{
var tBarIdent = getIdentIP("title");
vCloseParent.C.removeListener("romuINTPOPUPTB");
vCloseParent.C.enableInputElements();
vCloseParent["C_" + tBarIdent] = null;
}
function initTBarIP(vTopFrameDoc, frmName)
{
var vCloseMethod = "closeTitleBarPopup";
var vWithClose = "true";
var tBarIdent = getIdentIP("title");
var vTitleBar = vTopFrameDoc.getElementById("TITLEBARTITLEBARTR" + tBarIdent);
parent["C_" + tBarIdent] = vTitleBar;
CL().iccTITLEBAR(parent.C,vTitleBar ,parent["reactOnModelUpdate"+tBarIdent], tBarIdent,
"nextPopupTitle", null, null, null,
null, null, "true",
vCloseMethod, "nextPagePopupCommands", frmName, vWithClose);
vTitleBar.CASA_spancontrol = vTopFrameDoc.getElementById("TITLEBARSPAN" + tBarIdent);
vTitleBar.CASA_wcimg = vTopFrameDoc.getElementById("TITLEBAR"+tBarIdent+"CLOSE");
if(vTitleBar.CASA_wcimg)
{
vTitleBar.CASA_wcimg.C = vTitleBar.C;
vTitleBar.CASA_wcimg.onclick = parent["closePage" + tBarIdent];
}
vTitleBar.CASA_img = vTopFrameDoc.getElementById("TITLEBAR"+tBarIdent+"IMG");
vTitleBar.CASA_pagepopupcommandscontrol = vTopFrameDoc.getElementById("TITLEBAR"+tBarIdent+"PAGEPOPUPCOMMANDS");
}
function getIdentIP(pType)
{
if(pType == "pdiv")
return m_identIP + "_" + 1;
if(pType == "title")
return m_identIP + "_" + 2;
if(pType == "span")
return m_identIP + "_" + 3;
if(pType == "intITR")
return m_identIP + "_" + 4;
if(pType == "subITR")
return m_identIP + "_" + 5;
if(pType == "casaPage")
return m_identIP + "_" + 6;
return m_identIP + "_0";
}
function getBIdentIP()
{
if(m_identIP != null) return m_identIP;
if(!CL().CASA_intcounter) CL().CASA_intcounter = 0;
return CL().CASA_intcounter++;
}
function removeIndexOfIP(pArray, pIndex)
{
pArray.splice(pIndex, 1);
return pArray;
}
function clearControlIP(vSelfFrame)
{
vSelfFrame.m_identIP = null;
vSelfFrame.m_visIP = null;
}
function getFrmNameIP()
{
return getPropertyValue("cISAddons.popupDivFrame");
}
function getFrmDocIP(frmName)
{
var vTopFrame = null;
if(frmName != null && frmName != "") vTopFrame = CL().C_findFrame(this,frmName,true);
if(vTopFrame == null) vTopFrame = CL().C_findFrame(this,"_top",true);
if(vTopFrame != null)
return extractContentWindow(vTopFrame).document;
else
return parent.document;
}
function isOpeningIP(op)
{
return (op == "true");
}
function initObjIP(vTopFrameDoc,frmName)
{
var parentTR = vTopFrameDoc.getElementById("PDIV_" + m_identIP);
if(parentTR == null)
{
parentTR = vTopFrameDoc.createElement("div");
parentTR.id = "PDIV_" + m_identIP;
parentTR.innerHTML = genIP();
vTopFrameDoc.body.appendChild(parentTR);
genFuncIP();
initTBarIP(vTopFrameDoc , frmName);
initSPageIP(vTopFrameDoc);
}
}
function initMozIP(cc,op)
{
if(isOpeningIP(op))
{
cc.style.position = "absolute";
cc.style.left = "0";
cc.style.top = "0";
cc.style.width = "100%";
cc.style.height = "100%";
}
}
function initPosIP(cc,vTopFrameDoc)
{
var vw = getPropertyValue("cISAddons.ppintpopup.width");
var vh = getPropertyValue("cISAddons.ppintpopup.height");
var vt = getPropertyValue("cISAddons.ppintpopup.top");
var vl = getPropertyValue("cISAddons.ppintpopup.left");
try
{
if (vw == null || vw == "") vw = cc.CASA_width;
cc.CASA_innerspan.style.width = C_adjustUnits(vw);
if (vh == null || vh == "") vh = cc.CASA_height;
cc.CASA_innerspan.style.height = C_adjustUnits(vh);
}
catch (eexxcc) {}
try
{
var docHeight = parent.innerHeight;
var docWidth = parent.innerWidth;
if(vTopFrameDoc != null)
{
var vTopBoby = vTopFrameDoc.body;
if(vTopBoby &&
vTopBoby.clientHeight &&
vTopBoby.clientWidth)
{
docHeight = vTopBoby.clientHeight;
docWidth = vTopBoby.clientWidth;
}
}
if (vl == null || vl == "")
{
var l = Math.floor(( docWidth- vw*1)/2);
cc.CASA_innerspan.style.left = C_adjustUnits(l);
}
else
{
vLeft = parseInt(vl);
if (vLeft > (docWidth- vw))
vLeft = docWidth- vw;
if (vLeft < 0)
vLeft=0;
cc.CASA_innerspan.style.left = C_adjustUnits(vLeft);
}
if (vt == null || vt == "")
{
var t = Math.floor((docHeight- vh*1)/2);
cc.CASA_innerspan.style.top = C_adjustUnits(t);
}
else
{
vTop = parseInt (vt);
if (vTop > (docHeight- vh))
vTop = docHeight - vh;
if (vTop < 0)
vTop=0;
cc.CASA_innerspan.style.top = C_adjustUnits(vTop);
}
}
catch (eexxcc) {}
}
function initArrsIP(cc , op)
{
if (isOpeningIP(op))
{
CL().CASA_popupopenersids[CL().CASA_popupopenersids.length] = m_identIP;
CL().CASA_popupopenersvalues[CL().CASA_popupopenersvalues.length] = parent;
cc.style.zIndex = 1001 + CL().CASA_popupopenersids.length*2;
cc.CASA_innerspan.style.zIndex = 1002 + CL().CASA_popupopenersids.length*2;
}
}
function initValuesIP(op,cl)
{
if(op == "true")
{
m_visIP = true;
try { m_prevActElem = parent.document.activeElement; } catch(mp){}
}
if(cl == "true") m_visIP = false;
if(CL().CASA_popupopenersvalues == null) CL().CASA_popupopenersvalues = new CL().Array();
if(CL().CASA_popupopenersids == null) CL().CASA_popupopenersids = new CL().Array();
}
var m_ccDisable;
var m_ccDisplOpac;
var m_bodyDisable;
var m_bodyDisplOpac;
var m_divDisable;
var m_divDisplOpac;
var m_buttonDisable;
var m_buttonDisplOpac;
var m_inputDisable;
var m_inputDisplOpac;
var m_selectDisable;
var m_selectDisplOpac;
var m_textareaDisable;
var m_textareaDisplOpac;
var m_optgroupDisable;
var m_optgroupDisplOpac;
var m_optionDisable;
var m_optionDisplOpac;
var m_fieldsetDisable;
var m_fieldsetDisplOpac;
var m_bDoDisable = "true";
function disableInputElements() {
if (getPropertyValue("cISAddons.popupparentdisabled") == "false") return;
if (m_bDoDisable == "true") {
var opacity = "0.7"
var elButton = parent.document.getElementsByTagName("button");
m_buttonDisable = new Array(elButton.length);
m_buttonDisplOpac = new Array(elButton.length);
for (var i = 0; i < elButton.length; i++) {
m_buttonDisable[i] = elButton[i].disabled;
elButton[i].disabled = m_bDoDisable;
m_buttonDisplOpac[i] = elButton[i].style.opacity;
elButton[i].style.opacity = opacity;
}
var elInput = parent.document.getElementsByTagName("input");
m_inputDisable = new Array(elInput.length);
m_inputDisplOpac = new Array(elInput.length);
for (var i = 0; i < elInput.length; i++) {
m_inputDisable[i] = elInput[i].disabled;
elInput[i].disabled = m_bDoDisable;
m_inputDisplOpac[i] = elInput[i].style.opacity;
elInput[i].style.opacity = opacity;
}
var elSelect = parent.document.getElementsByTagName("select");
m_selectDisable = new Array(elSelect.length);
m_selectDisplOpac = new Array(elSelect.length);
for (var i = 0; i < elSelect.length; i++) {
m_selectDisable[i] = elSelect[i].disabled;
elSelect[i].disabled = m_bDoDisable;
m_selectDisplOpac[i] = elSelect[i].style.opacity;
elSelect[i].style.opacity = opacity;
}
var elTextarea = parent.document.getElementsByTagName("textarea");
m_textareaDisable = new Array(elTextarea.length);
m_textareaDisplOpac = new Array(elTextarea.length);
for (var i = 0; i < elTextarea.length; i++) {
m_textareaDisable[i] = elTextarea[i].disabled;
elTextarea[i].disabled = m_bDoDisable;
m_textareaDisplOpac[i] = elTextarea[i].style.opacity;
elTextarea[i].style.opacity = opacity;
}
var elOptgroup = parent.document.getElementsByTagName("optgroup");
m_optgroupDisable = new Array(elOptgroup.length);
m_optgroupDisplOpac = new Array(elOptgroup.length);
for (var i = 0; i < elOptgroup.length; i++) {
m_optgroupDisable[i] = elOptgroup[i].disabled;
elOptgroup[i].disabled = m_bDoDisable;
m_optgroupDisplOpac[i] = elOptgroup[i].style.opacity;
elOptgroup[i].style.opacity = opacity;
}
var elOption = parent.document.getElementsByTagName("option");
m_optionDisable = new Array(elOption.length);
m_optionDisplOpac = new Array(elOption.length);
for (var i = 0; i < elOption.length; i++) {
m_optionDisable[i] = elOption[i].disabled;
elOption[i].disabled = m_bDoDisable;
m_optionDisplOpac[i] = elOption[i].style.opacity;
elOption[i].style.opacity = opacity;
}
var elFieldset = parent.document.getElementsByTagName("fieldset");
m_fieldsetDisable = new Array(elFieldset.length);
m_fieldsetDisplOpac = new Array(elFieldset.length);
for (var i = 0; i < elFieldset.length; i++) {
m_fieldsetDisable[i] = elFieldset[i].disabled;
elFieldset[i].disabled = m_bDoDisable;
m_fieldsetDisplOpac[i] = elFieldset[i].style.opacity;
elFieldset[i].style.opacity = opacity;
}
var vCC = parent.document.getElementsByName('CC');
m_ccDisable = new Array(vCC.length);
m_ccDisplOpac = new Array(vCC.length);
for (var i = 0; i < vCC.length; i++) {
m_ccDisable[i] = vCC[i].disabled;
vCC[i].disabled = m_bDoDisable;
m_ccDisplOpac[i] = vCC[i].style.opacity;
vCC[i].style.opacity = opacity;
}
var elBody = parent.document.getElementsByTagName("body");
m_bodyDisable = new Array(elBody.length);
m_bodyDisplOpac = new Array(elBody.length);
for (var i = 0; i < elBody.length; i++) {
m_bodyDisable[i] = elBody[i].disabled;
elBody[i].disabled = m_bDoDisable;
m_bodyDisplOpac[i]=elBody[i].style.opacity;
elBody[i].style.opacity = opacity;
}
var elDiv = parent.document.getElementsByTagName("div");
m_divDisable = new Array(elDiv.length);
m_divDisplOpac = new Array(elDiv.length);
for (var i = 0; i < elDiv.length; i++) {
m_divDisable[i] = elDiv[i].disabled;
elDiv[i].disabled = m_bDoDisable;
m_divDisplOpac[i] = elDiv[i].style.opacity;
elDiv[i].style.opacity = opacity;
}
m_bDoDisable="false";
}
}
function enableInputElements() {
if (getPropertyValue("cISAddons.popupparentdisabled") == "false") return;
if (m_bDoDisable == "false") {
var elDiv = parent.document.getElementsByTagName("div");
for (var i = 0; i < elDiv.length; i++) {
elDiv[i].disabled = m_divDisable[i];
elDiv[i].style.opacity = m_divDisplOpac[i];
}
var elBody = parent.document.getElementsByTagName("body");
for (var i = 0; i < elBody.length; i++) {
elBody[i].disabled = m_bodyDisable[i];
elBody[i].style.opacity = m_bodyDisplOpac[i];
}
var vCC = parent.document.getElementsByName('CC');
if (vCC.length == m_ccDisable.length) {
for (var i = 0; i < vCC.length; i++) {
vCC[i].disabled = m_ccDisable[i];
vCC[i].style.opacity = m_ccDisplOpac[i];
}
}
else
{
for (var i = 0; i < vCC.length; i++) {
vCC[i].disabled = "false";
vCC[i].style.opacity = "1";
}
}
var elButton = parent.document.getElementsByTagName("button");
for (var i = 0; i < elButton.length; i++) {
elButton[i].disabled = m_buttonDisable[i];
elButton[i].style.opacity = m_buttonDisplOpac[i];
}
var elInput = parent.document.getElementsByTagName("input");
for (var i = 0; i < elInput.length; i++) {
elInput[i].disabled = m_inputDisable[i];
elInput[i].style.opacity = m_inputDisplOpac[i];
}
var elSelect = parent.document.getElementsByTagName("select");
for (var i = 0; i < elSelect.length; i++) {
elSelect[i].disabled = m_selectDisable[i];
elSelect[i].style.opacity = m_selectDisplOpac[i];
}
var elTextarea = parent.document.getElementsByTagName("textarea");
for (var i = 0; i < elTextarea.length; i++) {
elTextarea[i].disabled = m_textareaDisable[i];
elTextarea[i].style.opacity = m_textareaDisplOpac[i];
}
var elOptgroup = parent.document.getElementsByTagName("optgroup");
for (var i = 0; i < elOptgroup.length; i++) {
elOptgroup[i].disabled = m_optgroupDisable[i];
elOptgroup[i].style.opacity = m_optgroupDisplOpac[i];
}
var elOption = parent.document.getElementsByTagName("option");
for (var i = 0; i < elOption.length; i++) {
elOption[i].disabled = m_optionDisable[i];
elOption[i].style.opacity = m_optionDisplOpac[i];
}
var elFieldset = parent.document.getElementsByTagName("fieldset");
for (var i = 0; i < elFieldset.length; i++) {
elFieldset[i].disabled = m_fieldsetDisable[i];
elFieldset[i].style.opacity = m_fieldsetDisplOpac[i];
}
m_ccDisable.length=0;
m_ccDisplOpac.length=0;
m_bodyDisable.length=0;
m_bodyDisplOpac.length=0;
m_divDisable.length=0;
m_divDisplOpac.length=0;
m_buttonDisable.length=0;
m_buttonDisplOpac.length=0;
m_inputDisable.length=0;
m_inputDisplOpac.length=0;
m_selectDisable.length=0;
m_selectDisplOpac.length=0;
m_textareaDisable.length=0;
m_textareaDisplOpac.length=0;
m_optgroupDisable.length=0;
m_optgroupDisplOpac.length=0;
m_optionDisable.length=0;
m_optionDisplOpac.length=0;
m_fieldsetDisable.length=0;
m_fieldsetDisplOpac.length=0;
m_bDoDisable="true";
}
}
