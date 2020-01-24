function addVersionInfoFLEXLINECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('FLEXLINECONTROLS');
}
var m_nextcontrolidFLEXLINE = 50000;
var m_focussedCell = null;
function iccFLEXLINE(cc)
{
if (m_firstUsage)
{
cc.CASA_bufferedci = undefined;
}
}
function nextControlIdFLEXLINE()
{
m_nextcontrolidFLEXLINE++;
return m_nextcontrolidFLEXLINE;
}
var m_decodedControlsBufferFLEXLINE = [];
function romuFLEXLINE(cc)
{
if (cc.CASA_withborder == null) cc.CASA_withborder = true;
if (cc.CASA_colcount == null) cc.CASA_colcount = 200;
var vci = getPropertyValue(cc.CASA_infoprop + ".changeIndex");
if (cc.CASA_bufferedci == vci)
return;
var vallcontrols;
var buffer = m_decodedControlsBufferFLEXLINE[vci];
if (buffer == null)
{
cc.CASA_onlyfields = true;
var i = 0;
vallcontrols = [];
while(true)
{
var vparamscsv = getPropertyValue(cc.CASA_infoprop + ".controls[" + i + "].params");
if (vparamscsv == null) break;
var vparamstrings = decodeCSVString(vparamscsv);
var vparams = new Object();
for (var j=0; j<vparamstrings.length; j+=2)
vparams[vparamstrings[j]] = vparamstrings[j+1];
vallcontrols.push(vparams);
if (vparams["CONTROL"] != "field")
cc.CASA_onlyfields = false;
i++;
}
buffer = new Object();
buffer.onlyfields = cc.CASA_onlyfields;
buffer.allcontrols = vallcontrols;
m_decodedControlsBufferFLEXLINE[vci] = buffer;
}
else
{
cc.CASA_onlyfields = buffer.onlyfields;
vallcontrols = buffer.allcontrols;
}
cc.CASA_allcontrols = vallcontrols;
cc.CASA_bufferedci = vci;
if (cc.CASA_cells != null)
{
if (cc.CASA_fieldids != null)
for (var i=0; i<cc.CASA_fieldids.length; i++)
flexRemoveFIELD(cc.CASA_fieldids[i]);
if (cc.CASA_combodynids != null)
for (var i=0; i<cc.CASA_combodynids.length; i++)
flexRemoveCOMBODYN(cc.CASA_combodynids[i]);
if (cc.CASA_buttonids != null)
for (var i=0; i<cc.CASA_buttonids.length; i++)
flexRemoveBUTTON(cc.CASA_buttonids[i]);
if (cc.CASA_iconids != null)
for (var i=0; i<cc.CASA_iconids.length; i++)
flexRemoveICON(cc.CASA_iconids[i]);
if (cc.CASA_cbids != null)
for (var i=0; i<cc.CASA_cbids.length; i++)
flexRemoveCHECKBOX(cc.CASA_cbids[i]);
if (cc.CASA_labelids != null)
for (var i=0; i<cc.CASA_labelids.length; i++)
flexRemoveLABEL(cc.CASA_labelids[i]);
if (cc.CASA_gridcolheaderids != null)
for (var i=0; i<cc.CASA_gridcolheaderids.length; i++)
flexRemoveGRIDCOLHEADER(cc.CASA_gridcolheaderids[i]);
if (cc.CASA_toggleids != null)
for (var i=0; i<cc.CASA_toggleids.length; i++)
flexRemoveTOGGLE(cc.CASA_toggleids[i]);
if (cc.CASA_textoutids != null)
for (var i=0; i<cc.CASA_textoutids.length; i++)
flexRemoveTEXTOUT(cc.CASA_textoutids[i]);
if (cc.CASA_methodlinkids != null)
for (var i=0; i<cc.CASA_methodlinkids.length; i++)
flexRemoveMETHODLINK(cc.CASA_methodlinkids[i]);
if (cc.CASA_imageoutids != null)
for (var i=0; i<cc.CASA_imageoutids.length; i++)
flexRemoveIMAGEOUT(cc.CASA_imageoutids[i]);
if (cc.CASA_textids != null)
for (var i=0; i<cc.CASA_textids.length; i++)
flexRemoveTEXT(cc.CASA_textids[i]);
if (cc.CASA_dateinputids != null)
for (var i=0; i<cc.CASA_dateinputids.length; i++)
flexRemoveDATEINPUT(cc.CASA_dateinputids[i]);
if (cc.CASA_tds != null)
{
removeListener("romuFLEXLINETDS(C_"+cc.CASA_id+")");
cc.CASA_tdsmem = undefined;
}
var vpn = cc.parentNode;
var vcells = cc.CASA_cells;
for (var i=0; i<vcells.length; i++)
vpn.removeChild(vcells[i]);
}
cc.CASA_fieldids = [];
cc.CASA_combodynids = [];
cc.CASA_buttonids = [];
cc.CASA_cbids = [];
cc.CASA_cells = [];
cc.CASA_labelids = [];
cc.CASA_gridcolheaderids = [];
cc.CASA_toggleids = [];
cc.CASA_textids = [];
cc.CASA_dateinputids = [];
cc.CASA_textout = [];
cc.CASA_tds = [];
cc.CASA_iconids = [];
cc.CASA_textoutids = [];
cc.CASA_methodlinkids = [];
cc.CASA_imageoutids = [];
var vcontrols = [];
for (var i=0; i<cc.CASA_allcontrols.length; i++)
{
var vparams = cc.CASA_allcontrols[i];
var vbase = "";
if (cc.CASA_arrayprop != null && cc.CASA_repeatindex != null)
var vbase = cc.CASA_arrayprop + "[" + cc.CASA_repeatindex + "].";
var pm;
pm = vparams["valueprop"];         if (pm != null) vparams["valuepropp"] = vbase + pm; else vparams["valuepropp"] = pm;
pm = vparams["valuetextprop"];     if (pm != null) vparams["valuetextpropp"] = vbase + pm; else vparams["valuetextpropp"] = pm;
pm = vparams["statusprop"];        if (pm != null) vparams["statuspropp"] = vbase + pm; else vparams["statuspropp"] = pm;
pm = vparams["displayprop"];       if (pm != null) vparams["displaypropp"] = vbase + pm; else vparams["displaypropp"] = pm;
pm = vparams["popupprop"];         if (pm != null) vparams["popuppropp"] = vbase + pm; else vparams["popuppropp"] = pm;
pm = vparams["validationprop"];    if (pm != null) vparams["validationpropp"] = vbase + pm; else vparams["validationpropp"] = pm;
pm = vparams["decimaldigitsprop"]; if (pm != null) vparams["decimaldigitspropp"] = vbase + pm; else vparams["decimaldigitspropp"] = pm;
pm = vparams["optarrayprop"];      if (pm != null) vparams["optarraypropp"] = vbase + pm; else vparams["optarraypropp"] = pm;
vparams["opttextpropp"] = vparams["opttextprop"];
vparams["optidpropp"] = vparams["optidprop"];
pm = vparams["cfileprop"];         if (pm != null) vparams["cfilepropp"] = vbase + pm; else vparams["cfilepropp"] = pm;
pm = vparams["sfileprop"];         if (pm != null) vparams["sfilepropp"] = vbase + pm; else vparams["sfilepropp"] = pm;
pm = vparams["nameprop"];          if (pm != null) vparams["namepropp"] = vbase + pm; else vparams["namepropp"] = pm;
pm = vparams["visibleprop"];       if (pm != null) vparams["visiblepropp"] = vbase + pm; else vparams["visiblepropp"] = pm;
pm = vparams["method"];            if (pm != null) vparams["methodd"] = vbase + pm; else vparams["methodd"] = pm;
pm = vparams["changeindexprop"];   if (pm != null) vparams["changeindexpropp"] = vbase + pm; else vparams["changeindexpropp"] = pm;
pm = vparams["bgcolorprop"];       if (pm != null) vparams["bgcolorpropp"] = vbase + pm; else vparams["bgcolorpropp"] = pm;
pm = vparams["fgcolorprop"];       if (pm != null) vparams["fgcolorpropp"] = vbase + pm; else vparams["fgcolorpropp"] = pm;
pm = vparams["imageprop"];         if (pm != null) vparams["imagepropp"] = vbase + pm; else vparams["imagepropp"] = pm;
pm = vparams["alignprop"];         if (pm != null) vparams["alignpropp"] = vbase + pm; else vparams["alignpropp"] = pm;
pm = vparams["maxlengthprop"];     if (pm != null) vparams["maxlengthpropp"] = vbase + pm; else vparams["maxlengthpropp"] = pm;
pm = vparams["maxrowlengthprop"];  if (pm != null) vparams["maxrowlengthpropp"] = vbase + pm; else vparams["maxrowlengthpropp"] = pm;
pm = vparams["maxrowsprop"];       if (pm != null) vparams["maxrowspropp"] = vbase + pm; else vparams["maxrowspropp"] = pm;
pm = vparams["titleprop"];         if (pm != null) vparams["titlepropp"] = vbase + pm; else vparams["titlepropp"] = pm;
pm = vparams["flushmethod"];       if (pm != null) vparams["flushmethodd"] = vbase + pm; else vparams["flushmethodd"] = pm;
pm = vparams["oncontextmenumethod"];if (pm != null) vparams["oncontextmenumethodd"] = vbase + pm; else vparams["oncontextmenumethodd"] = pm;
pm = vparams["contextmenumethod"];	if (pm != null) vparams["contextmenumethodd"] = vbase + pm; else vparams["contextmenumethodd"] = pm;
pm = vparams["popupmethod"];		if (pm != null && (pm != "openIdValueCombo") && (pm != "openIdValueHelp")) vparams["popupmethodd"] = vbase + pm; else vparams["popupmethodd"] = pm;
pm = vparams["validationuserhintprop"]; if (pm != null) vparams["validationuserhintpropp"] = vbase + pm; else vparams["validationuserhintpropp"] = pm;
if (cc.CASA_taid != null) vparams["TAID"] = cc.CASA_taid;
vparams["CONTROLID"] = nextControlIdFLEXLINE();
vcontrols.push(cc.CASA_allcontrols[i]);
}
cc.CASA_onlyfields = true;
cc.CASA_fgsubs = [];
var v_roi_update = parent.m_roi_firstusage;
try
{
parent.m_roi_firstusage = true;
for (var i=0; i<vcontrols.length; i++)
{
var vparams = vcontrols[i];
if (vparams["width"] == null) vparams["width"] = "100";
var vres = null;
if (vparams["CONTROL"] == "field")
{
vres = flexCreateControlFIELD(vparams);
cc.CASA_fieldids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "button")
{
vres = flexCreateControlBUTTON(vparams);
cc.CASA_buttonids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "icon")
{
vres = flexCreateControlICON(vparams);
cc.CASA_iconids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "break")
{
var vparentNode = cc.parentNode;
var vsuperParent = vparentNode.parentNode;
var vtr = parent.createElement("TR");
vparentNode.removeChild(cc);
vtr.appendChild(cc);
vsuperParent.appendChild(vtr);
}
else if (vparams["CONTROL"] == "checkbox")
{
vres = flexCreateControlCHECKBOX(vparams);
cc.CASA_cbids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "combodyn")
{
vres = flexCreateControlCOMBODYN(vparams);
cc.CASA_combodynids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "label")
{
vres = flexCreateControlLABEL(vparams);
cc.CASA_labelids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "gridcolheader")
{
vres = flexCreateControlGRIDCOLHEADER(vparams);
cc.CASA_gridcolheaderids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "toggle")
{
vres = flexCreateControlTOGGLE(vparams);
cc.CASA_toggleids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "textout")
{
vres = flexCreateControlTEXTOUT(vparams);
cc.CASA_textoutids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "methodlink")
{
vres = flexCreateControlMETHODLINK(vparams);
cc.CASA_methodlinkids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "imageout")
{
vres = flexCreateControlIMAGEOUT(vparams);
cc.CASA_imageoutids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "text")
{
vres = flexCreateControlTEXT(vparams);
cc.CASA_textids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "dateinput")
{
vres = flexCreateControlDATEINPUT(vparams);
cc.CASA_dateinputids.push(vres.control.id);
}
else if (vparams["CONTROL"] == "tds")
{
var vparentNode = cc.parentNode;
var vcolcount = 1 * vparams["colcount"];
var vvalueprop = vparams["valuepropp"];
if (vcolcount == null)
{
alert("colcount is not defined - processing aborted");
return;
}
if (vvalueprop == null)
{
alert("valueprop is not defined - processing aborted");
return;
}
for (var i=0; i<vcolcount; i++)
{
var vd = parent.createElement("TD");
vd.className = "TEXTOUTSpan";
vd.style.width="100px";
vd.style.paddingTop = "2px";
if (vparams["font-weight"] != null) vd.style.fontWeight = vparams["font-weight"];
vparentNode.insertBefore(vd,cc);
cc.CASA_tds.push(vd);
cc.CASA_cells.push(vd);
}
cc.CASA_tdsromu = parent.createFunction("romuTDS"+cc.id,"model","C.romuFLEXLINETDS(C_"+cc.CASA_id+");");
cc.CASA_tdsvalueprop = vvalueprop;
cc.CASA_tdsbgcolorprop = vparams["bgcolorpropp"];
cc.CASA_tdsfgcolorprop = vparams["fgcolorpropp"];
cc.CASA_tdsimageprop = vparams["imagepropp"];
cc.CASA_tdsalignprop = vparams["alignpropp"];
registerListener(cc.CASA_tdsromu);
continue;
}
if (vres == null) continue;
var vparentNode = cc.parentNode;
vparentNode.insertBefore(vres.cell,cc);
cc.CASA_cells.push(vres.cell);
if(vres.cellAfter != null)
{
vparentNode.insertBefore(vres.cellAfter,cc);
cc.CASA_cells.push(vres.cellAfter);
}
if (vres.control != null)
cc.CASA_fgsubs.push(vres.control);
}
}
finally
{
parent.m_roi_firstusage = v_roi_update;
}
}
function romuFLEXLINETDS(cc)
{
try
{
var vvalue = getPropertyValue(cc.CASA_tdsvalueprop);
var vbgcolor = getPropertyValue(cc.CASA_tdsbgcolorprop);
var vfgcolor = getPropertyValue(cc.CASA_tdsfgcolorprop);
var vimage = getPropertyValue(cc.CASA_tdsimageprop);
var valign = getPropertyValue(cc.CASA_tdsalignprop);
var vmem = vvalue + "_" + vbgcolor + "_" + vfgcolor+"_"+vimage+"_"+valign;
if (vmem == cc.CASA_tdsmem)
return;
cc.CASA_tdsmem = vmem;
var vvalues = decodeCSVString(vvalue);
var vbgcolors = undefined;
if (cc.CASA_tdsbgcolorprop != null)
vbgcolors = decodeCSVString(vbgcolor);
var vfgcolors = undefined;
if (cc.CASA_tdsfgcolorprop != null)
vfgcolors = decodeCSVString(vfgcolor);
var vimages = undefined;
if (cc.CASA_tdsimageprop != null)
vimages = decodeCSVString(vimage);
var valigns = undefined;
if (cc.CASA_tdsalignprop != null)
valigns = decodeCSVString(valign);
for (var i=0; i<vvalues.length; i++)
{
var valign = "left";
var vinnerHTML = "<span style='white-space: nowrap'>"+vvalues[i]+"</span>";
if (vimages != null && vimages[i] != null && vimages[i] != "")
{
valign = "center";
vinnerHTML = "<img align='middle' src='"+vimages[i]+"'>";
}
cc.CASA_tds[i].align = valign;
cc.CASA_tds[i].innerHTML = vinnerHTML;
if (vbgcolors != null) cc.CASA_tds[i].style.backgroundColor = vbgcolors[i];
if (vfgcolors != null) cc.CASA_tds[i].style.color = vfgcolors[i];
if (valigns != null) cc.CASA_tds[i].style.textAlign = valigns[i];
}
}
catch (eexxcc) { addLogMessage("romuFLEXLINETDS - Exception occurred"); }
}
