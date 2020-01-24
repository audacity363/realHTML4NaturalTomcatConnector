function addVersionInfoICONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('ICONCONTROLS');
}
function flexCreateControlICON(params)
{
var vd = parent.createElement("TD");
var vspan = parent.createElement("SPAN");
var vtab = parent.createElement("TABLE");
var vbod = parent.createElement("TBODY");
var vtr = parent.createElement("TR");
var vtdin = parent.createElement("TD");
vtab.cellSpacing = 0;
vtab.cellPadding = 0;
vtab.border = 0;
var vid = params["CONTROLID"];
var withdistance = params["withdistance"];
var imagewidth = params["imagewidth"];
var imageheight = params["imageheight"];
var imagetitle = params["title"];
var imagesrc = params["image"];
var vName = params["name"];
var vNamePos = params["nameposition"];
var vdispalymenuindicator = params["displaymenuindicator"];
var alignvar = params["align"];
var valignvar = params["valign"];
var vwidth = "";
var vheight = "";
var vtitle = "";
if(imagewidth != null && imagewidth != "" && imagewidth != undefined)
vwidth = "width = '"+imagewidth+"'";
if(imageheight != null && imageheight != "" && imageheight != undefined)
vheight = "height = '"+imageheight+"'";
if(imagetitle != null && imagetitle != "" && imagetitle != undefined)
vtitle = "title = '"+imagetitle+"'";
if(alignvar != null && alignvar != "" && alignvar != undefined)
vtab.align = alignvar;
if(valignvar != null && valignvar != "" && valignvar != undefined)
vtab.valign = valignvar;
vd.id = "TDI"+vid;
vd.width = "100%";
if(withdistance == "true")
{
var vspant = parent.document.createElement("SPAN");
vspant.innerHTML="&nbsp;";
vd.appendChild(vspant);
}
vtdin.tabindex = 0;
vtdin.id = "ICON"+vid;
var vHTML = [];
var vNameTableElement = "";
if (vName != null && vName != "")
{
vNameTableElement = "</td>";
if (vNamePos == "below")
vNameTableElement += "</tr><tr>";
vNameTableElement += "<td valign='middle' align='center' nowrap='true' class='ICONText'>";
vNameTableElement += "&nbsp;";
vNameTableElement += vName;
vNameTableElement += "&nbsp;";
}
var vDisplayMenuIndicator = "";
if (vdispalymenuindicator == "true")
{
vDisplayMenuIndicator = "</td>";
if (vNamePos == "below")
vDisplayMenuIndicator += "</tr><tr>";
vDisplayMenuIndicator += "<td valign='middle' align ='center' nowrap='true'>";
vDisplayMenuIndicator += "&nbsp;";
vDisplayMenuIndicator += "<span valign='middle' class=\"ICONLISTMenuIndicatorImg\">&nbsp;&nbsp;&nbsp;</span>";
vDisplayMenuIndicator += "&nbsp;";
}
var vMainTableStart = "<table cellpadding=0 cellspacing=0 align='center'><tr align='center'><td align='center' valign='middle'>";
var vMainTableClose = vNameTableElement + vDisplayMenuIndicator + "</td></tr></table>";
vHTML.push(vMainTableStart);
vHTML.push("<img id = 'ICONIMG"+vid+"' src = '"+imagesrc+"' "+vheight+" "+vwidth+" "+vtitle+" >");
vHTML.push(vMainTableClose);
vtdin.innerHTML = vHTML.join("");
vtr.appendChild(vtdin);
vbod.appendChild(vtr);
vtab.appendChild(vbod);
vd.appendChild(vtab);
if(withdistance == "true")
{
var vspanb = parent.createElement("SPAN");
vspanb.innerHTML="&nbsp;";
vd.appendChild(vspanb);
}
parent["C_"+vid] = vtdin;
parent["C_"+vid+".CASA_td"] = vd;
var vromu = parent.createFunction("romuICON"+vid,"","C.romuICON(C_"+vid+");");
iccICON(parent["C_"+vid],vromu,vri,this["reactICON"],imagesrc,params["imageinactive"],params["indexpropp"],params["referencepropp"],
params["visiblepropp"],params["indexvalue"],params["methodd"],params["variant"],params["repeatindex"],
params["cti"],params["tabindex"],params["invisiblemode"],params["draginfo"],params["draginfopropp"],
params["dropmethodd"],params["dropinfopropp"],params["titlepropp"],params["imagepropp"],params["switchvisibleproponuserinput"],
imagewidth, null);
var result = new Object();
result.cell = vd;
result.control = vtdin;
return result;
}
function flexRemoveICON(vid)
{
var id = null;
try { id = vid.substring(4, vid.length); } catch (exc) {}
if (id != null)
{
parent["C_"+id+".CASA_td"] = undefined;
parent["C_"+id] = undefined;
}
parent["romu"+vid] = undefined;
removeListener("C_"+vid);
}
function iccICON(cc,romumethod,reactmethod,casaid,image,imageinactive,indexprop,referenceprop,
visibleprop,indexvalue,method,variant,repeatindex,cti,tabindex,invisiblemode,
draginfo,draginfoprop,dropmethod,dropinfoprop,titleprop,imageprop,switchvisibleproponuserinput,
imagewidth,imageinactiveprop)
{
if (method != null || dropmethod != null)
{
cc.onmouseenter = reactmethod;
cc.onmouseleave = reactmethod;
cc.className="ICONImage";
}
cc.onmousedown = reactmethod;
if (! CL().isEditorPreview()) cc.onmouseup = reactmethod;
cc.onkeyup = reactmethod;
cc.oncontextmenu = reactmethod;
cc.ondrag = reactmethod;
if (casaid != null) cc.CASA_id = casaid;
if (image != null) cc.CASA_image = image;
if (imageinactive != null) cc.CASA_imageinactive = imageinactive;
if (indexprop != null) cc.CASA_indexprop = indexprop;
if (referenceprop != null) cc.CASA_referenceprop = referenceprop;
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
if (indexvalue != null) cc.CASA_indexvalue = indexvalue;
if (method != null) cc.CASA_method = method;
if (variant != null) cc.CASA_variant = variant;
if (repeatindex != null) cc.CASA_repeatindex = repeatindex;
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (invisiblemode != null) cc.CASA_invisiblemode = invisiblemode;
if (draginfo != null) cc.CASA_draginfo = draginfo;
if (draginfoprop != null) cc.CASA_draginfoprop = draginfoprop;
if (dropmethod != null) cc.CASA_dropmethod = dropmethod;
if (dropinfoprop != null) cc.CASA_dropinfoprop = dropinfoprop;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (switchvisibleproponuserinput != null) cc.CASA_switchvisibleproponuserinput = switchvisibleproponuserinput;
if (imagewidth != null) cc.CASA_imagewidth = imagewidth;
if (imageprop != null)	cc.CASA_imageprop = imageprop;
if (imageinactiveprop != null)cc.CASA_imageinactiveprop = imageinactiveprop;
if (referenceprop != null || visibleprop != null || titleprop || imageprop || cc.CASA_imagertl != null) registerListener(romumethod);
cc.CASA_memreferencevalue = undefined;
cc.CASA_memvisiblevalue = undefined;
applyCasaTabIndex(cc, "ICON");
}
function getWidthICON(cc)
{
var res = cc.CASA_imagewidth;
if(res == null)
res = cc.offsetWidth;
return res;
}
function romuICON(cc)
{
if (cc == null) return;
applyCasaTabIndex(cc, "ICON");
if (cc.CASA_switchvisibleproponuserinput == "true") CL().C_addSVPIcon(self, cc, cc.CASA_visibleprop);
var imgchanged = false;
if (cc.CASA_imageprop != null)
{
if(cc.CASA_img == null) cc.CASA_img = parent.gebid('ICONIMG'+cc.CASA_id);
var v = getPropertyValue(cc.CASA_imageprop);
if (v != cc.CASA_memImg)
{
cc.CASA_image = v;
if (v == null || v == "") v =  "../HTMLBasedGUI/general/nothing.gif";
imgchanged = true;
if (cc.CASA_visibleprop == null)
{
cc.CASA_memImg = cc.CASA_image;
cc.CASA_img.src = v;
}
}
}
if (cc.CASA_referenceprop != null)
{
var v = getPropertyValue(cc.CASA_referenceprop);
if (v != cc.CASA_memreferencevalue)
{
cc.CASA_memreferencevalue = v;
if (v == null) cc.style.display = "none";
else           cc.style.display = "";
}
}
if (cc.CASA_titleprop != null)
{
var vTitle = getPropertyValue(cc.CASA_titleprop);
if (vTitle != cc.CASA_lastTitle)
{
var iconImage = parent.document.getElementById("ICONIMG"+cc.CASA_id);
if (iconImage!=null)
{
iconImage.title= vTitle;
}
else
{
try { cc.childNodes[0].title = vTitle } catch(excc) { };
}
cc.CASA_lastTitle = vTitle;
}
}
if (cc.CASA_visibleprop != null)
{
var v = findVisibleValue(getPropertyValue(cc.CASA_visibleprop));
if (cc.CASA_memvisiblevalue == undefined || v != cc.CASA_memvisiblevalue)
{
cc.CASA_memvisiblevalue = v;
v = convertStatusToVisible(v);
if (cc.CASA_imageinactive == null && cc.CASA_imageinactiveprop == null)
{
if (v == null || v == "false")
{
if (cc.CASA_invisiblemode == "cleared" && cc.offsetWidth == 0)
{
try
{
cc.style.display = "";
cc.CASA_memvisiblevalue = undefined;
registerSwitchToDisplayListener(romuICON, cc);
}
catch(exccc) {}
}
try { cc.CASA_td.width = getWidthICON(cc); } catch (eexxcc) {}
cc.style.display = "none";
if (cc.CASA_invisiblemode != "cleared" &&
cc.CASA_td != null)
{
cc.CASA_td.style.display = "none";
}
}
else
{
cc.style.display = "";
if (cc.CASA_td != null) cc.CASA_td.style.display = "";
if (imgchanged && (cc.CASA_img != null))
{
cc.CASA_memImg = cc.CASA_image;
cc.CASA_img.src = cc.CASA_image;
}
}
}
else
{
var vImage = parent.document.getElementById("ICONIMG"+cc.CASA_id);
if (v == null || v == "false")
{
if (vImage != null)
{
var vv = cc.CASA_imageinactive;
if ( cc.CASA_imageinactiveprop != null )
{
vv = getPropertyValue(cc.CASA_imageinactiveprop);
if (vv == null || vv == "") vv = "../HTMLBasedGUI/general/nothing.gif";
}
vImage.src = vv;
}
cc.style.cursor = "default";
cc.CASA_blocked = true;
}
else
{
if (vImage != null) vImage.src = cc.CASA_image;
cc.style.cursor = "pointer";
cc.CASA_blocked = false;
}
}
}
else
{
if (imgchanged)
{
v = convertStatusToVisible(cc.CASA_memvisiblevalue);
if ((v != null) && (cc.CASA_img != null))
{
cc.CASA_memImg = cc.CASA_image;
if (v != "false")
{
cc.CASA_img.src = cc.CASA_image;
}
else
{
var vv = cc.CASA_imageinactive;
if ( cc.CASA_imageinactiveprop != null )
{
vv = getPropertyValue(cc.CASA_imageinactiveprop);
if (vv == null || vv == "") vv = "../HTMLBasedGUI/general/nothing.gif";
}
cc.CASA_img.src = vv;
}
}
}
}
}
if (cc.CASA_imagertl != null && cc.CASA_memDir != m_direction)
{
cc.CASA_memDir = m_direction;
var vImage = parent.document.getElementById("ICONIMG"+cc.CASA_id);
if (m_direction == "rtl") vImage.src = cc.CASA_imagertl;
else vImage.src = cc.CASA_image;
}
}
function reactICON(evt)
{
return reactICONInternal(evt);
}
function reactICONInternal(evt)
{
if (evt.type == "keyup")
{
if (evt.keyCode == 13 || evt.keyCode == 32)
transferModelICON(evt.currentTarget,evt);
}
else if (evt.type == "mousedown") reactOnMouseDownICON(evt.currentTarget,evt);
else if (evt.type == "mouseup") reactOnMouseUpICON(evt.currentTarget,evt);
else if (evt.type == "mouseenter")
{
if (checkIO() == false) return;
if (evt.currentTarget.CASA_blocked == true) return;
evt.currentTarget.className = "ICONImageRollOver";
}
else if (evt.type == "mouseleave")
{
evt.currentTarget.className = "ICONImage";
}
else if (evt.type == "contextmenu") evt.returnValue = false;
else evt.returnValue = false;
}
function reactOnMouseDownICON(cc,evt)
{
if (checkIO() == false) return;
if (cc.CASA_blocked == true) return;
if (cc.CASA_draginfo == null && cc.CASA_draginfoprop == null) return;
evt.preventDefault();
var draginfo = "DUMMYINFO";
if (cc.CASA_draginfoprop != null)
{
draginfo = getPropertyValue(cc.CASA_draginfoprop);
if (draginfo == null || draginfo == "")
draginfo = "Error: Property "+cc.CASA_draginfoprop+" does not provide for a value != null";
}
else
{
draginfo = cc.CASA_draginfo;
}
parent.m_dragId = "ICON"+cc.CASA_id;
var iconImage = cc.CASA_image;
if (iconImage.substring(0, 7) != "http://")
{
var pathname = window.location.pathname;
var pathparts = pathname.split("/");
var cisurl = ""
for (i=1;i<pathparts.length-1;i++)
{
cisurl+=pathparts[i] + "/"
}
var url = window.location.protocol + "//" + window.location.host + "/" + cisurl;
iconImage = url + iconImage;
}
startDragCL(draginfo, "<img src='"+iconImage+"'>", evt, parent);
}
function reactOnMouseUpICON(cc,evt)
{
if (checkIO() == false) return;
if (cc.CASA_blocked == true) return;
if (cc.CASA_dropmethod != null)
{
if (cc.CASA_dropinfoprop == null)
{
alert("DROPICON: no DROPINFOPROP for DROPMETHOD "+cc.CASA_dropmethod);
}
else if (parent.m_dragId == "ICON"+cc.CASA_id)
{
transferModelICON(cc,evt);
}
else if (checkIfDragProcessIsActiveCL())
{
var dropInfo = endDragCL();
setPropertyValue(cc.CASA_dropinfoprop, dropInfo);
invokeMethodInModel(cc.CASA_dropmethod);
}
else if (parent.m_dragMode == true)
{
var dropInfo = parent.m_dropInfo;
parent.endDrag();
setPropertyValue(cc.CASA_dropinfoprop, dropInfo);
invokeMethodInModel(cc.CASA_dropmethod);
}
}
else
{
transferModelICON(cc,evt);
}
}
function transferModelICON(cc)
{
if (checkIO() == false) return;
if (cc.CASA_blocked == true) return;
if (cc.CASA_indexprop != null)
setPropertyValue(cc.CASA_indexprop,cc.CASA_indexvalue);
if (cc.CASA_repeatindex != null)
setPropertyValue("repeatIndex",cc.CASA_repeatindex);
else
setPropertyValue("repeatIndex",-1);
if (cc.CASA_method != null)
{
invokeMethodInModel(cc.CASA_method);
}
if (cc.CASA_variant != null)
{
setPropertyValue("variantPage",cc.CASA_variant);
invokeMethodInModel("switchToVariant");
}
}
function reactCLIPBOARDICON(cc,evt)
{
if (evt.type == "mouseup") transferModelCLIPBOARDICON(cc,evt);
else reactICON(cc,evt);
}
function transferModelCLIPBOARDICON(cc)
{
if (checkIO() == false) return;
if (cc.CASA_blocked == true) return;
if (cc.CASA_method != null &&
cc.CASA_valueprop != null)
{
if (cc.CASA_type == "import")
{
var s = parent.window.clipboardData.getData('Text');
setPropertyValue(cc.CASA_valueprop, s);
invokeMethodInModel(cc.CASA_method);
}
else
{
var s = getPropertyValue(cc.CASA_valueprop);
parent.window.clipboardData.setData('Text', s);
}
}
}
