function addVersionInfoTEXTGRIDCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TEXTGRIDCONTROLS');
}
var CT_COLUMN = 0;
var CT_CSVCOLUMN = 1;
var CT_SSCOLUMN = 2;
var m_dragIdTEXTGRID;
var m_dragColIndexTEXTGRID;
function initCasaControlTEXTGRID(pCC,pCCDIV,onmouseupmethod)
{
pCC.CASA_bufferedchangeindex = undefined;
pCC.CASA_keybMaxCSS = null;
pCC.CASA_keybMaxSSS = null;
pCC.CASA_keybCursor = null;
pCC.CASA_keybCursorReset = null;
pCC.m_lastDir = null;
pCC.m_dirStyleExt = '';
pCC.CASA_previousheight = undefined;
pCCDIV.onmouseup = onmouseupmethod;
}
function getScrollBarInstance(pCC)
{
return pCC.CASA_vscrollbar;
}
function reactOnModelUpdateTEXTGRID(pCC)
{
var traceStartDate = new Date();
var onlyFixSizedColumns = true;
var wrapsizing = false;
if ( pCC.CASA_suppressModelUpdate == true )
{
pCC.CASA_suppressModelUpdate = false;
return;
}
if ( pCC.CASA_previousheight == null ) pCC.CASA_bufferedchangeindex = null;
if (pCC.CASA_stylevariantprop != null)
pCC.CASA_stylevariant = getPropertyValue(pCC.CASA_stylevariantprop);
if (pCC.CASA_stylevariant == undefined)
pCC.CASA_stylevariant = "";
if (pCC.CASA_fieldparam1 == null)
pCC.CASA_fieldparam1 = getPropertyValue("cISAddons.fieldParam1");
if (pCC.CASA_singleselectprop != null)
{
var v = getPropertyValue(pCC.CASA_singleselectprop);
if (pCC.CASA_memSingleSelect != v)
{
if (pCC.CASA_memSingleSelect != null)
{
alert("TEXTGRID ERROR: value of SINGLESELECTPROP \""+pCC.CASA_singleselectprop+"\" must no change!");
return;
}
pCC.CASA_memSingleSelect = v;
if (v == "true")
{
pCC.CASA_singleselect = true;
setPropertyValue(pCC.CASA_griddataprop+".singleSelectProp", pCC.CASA_selectprop);
setPropertyValue(pCC.CASA_griddataprop+".multiSelectProp", null);
}
else
{
pCC.CASA_singleselect = false;
setPropertyValue(pCC.CASA_griddataprop+".singleSelectProp", null);
setPropertyValue(pCC.CASA_griddataprop+".multiSelectProp", pCC.CASA_selectprop);
}
}
}
CL().C_stopSortTimerTEXTGRID();
var vByPassIndexChange = false;
var scrollBarObj = getScrollBarInstance(pCC);
if(scrollBarObj != null) vByPassIndexChange = scrollBarObj.CASA_bypasschangeindex;
if (vByPassIndexChange != true &&
pCC.CASA_changeindexprop != null &&
pCC.CASA_inrepeattag != true)
{
var changeIndex = getPropertyValue(pCC.CASA_changeindexprop);
if (pCC.CASA_bufferedchangeindex != null &&
pCC.CASA_bufferedchangeindex == changeIndex &&
pCC.m_lastDir == m_direction)
return;
pCC.CASA_bufferedchangeindex = changeIndex;
}
m_TEXTGRIDbypasschangeindex = false;
pCC.m_lastDir = m_direction;
var tdStyle = '';
var tableStyle = "style='table-layout: fixed;height: 100%;'";
var defAlign = 'right';
if (m_direction == 'rtl')
{
pCC.m_dirStyleExt = 'RTL';
tdStyle = " STYLE=\"background-position: left center;\" ";
tableStyle = "style='table-layout: fixed;height: 100%;background-position: left center;'";
defAlign = 'left';
}
else
{
pCC.m_dirStyleExt = '';
tdStyle = '';
}
if (pCC.CASA_personalizable == "true")
{
if (pCC.CASA_columnsequenceprop == null)
pCC.CASA_columnsequenceprop = "casabacPM.TEXTGRIDSEQUENCE"+pCC.CASA_displayitemsprop;
var colIndexesCSV = getPropertyValue(pCC.CASA_columnsequenceprop);
if (colIndexesCSV != null && colIndexesCSV != "")
{
if (pCC.CASA_colinfosorigin == null)
pCC.CASA_colinfosorigin = pCC.CASA_colinfos;
var colIndexes = decodeCSVString(colIndexesCSV);
var colInfos = [];
var vCounter = 0;
for (var i=0; i<colIndexes.length; i++)
{
if (colIndexes[i] != null && colIndexes[i] != "")
{
var colInfo = pCC.CASA_colinfosorigin[colIndexes[i]];
if (colInfo != null)
{
colInfos[vCounter] = colInfo;
vCounter++;
}
}
}
pCC.CASA_colinfos = colInfos;
}
if (pCC.CASA_griddataprop != null)
{
var widthsCSV = getPropertyValue(pCC.CASA_griddataprop+".columnWidthsAsCSVString");
if (widthsCSV != null && widthsCSV.length != 0)
{
widthsCSV = decodeCSVString(widthsCSV);
for(var i=0; i<widthsCSV.length; i++)
pCC.CASA_colinfos[i].width = widthsCSV[i];
}
}
if (pCC.CASA_sortprop != null)
{
if (pCC.CASA_sortsequenceprop != null && pCC.CASA_sortsequenceprop != "")
{
var sortInfosCSV = getPropertyValue(pCC.CASA_sortsequenceprop);
if (sortInfosCSV != null)
{
var sortInfos = decodeCSVString(sortInfosCSV);
var sortProperties = [];
var sortDirections = new Array;
for (var i0=0; i0<sortInfos.length; i0++)
{
if (i0%2 == 0) sortProperties.push(sortInfos[i0]);
else                     sortDirections.push(sortInfos[i0]);
}
for (var i1=0; i1<pCC.CASA_colinfos.length; i1++)
{
pCC.CASA_colinfos[i1].sortascending = "";
pCC.CASA_colinfos[i1].sortorder = -1;
for (var i2=0; i2<sortProperties.length; i2++)
{
if (pCC.CASA_colinfos[i1].property == pCC.CASA_colinfosorigin[sortProperties[i2]].property)
{
pCC.CASA_colinfos[i1].sortascending = sortDirections[i2];
pCC.CASA_colinfos[i1].sortorder = i2;
break;
}
}
}
}
}
else
{
var vSortProperty = getPropertyValue(pCC.CASA_sortprop+".sortProperty");
var vAscending = getPropertyValue(pCC.CASA_sortprop+".ascending");
for (var i1=0; i1<pCC.CASA_colinfos.length; i1++)
{
pCC.CASA_colinfos[i1].sortascending = "";
pCC.CASA_colinfos[i1].sortorder = -1;
if (pCC.CASA_colinfos[i1].property == vSortProperty || pCC.CASA_colinfos[i1].imageprop == vSortProperty)
{
pCC.CASA_colinfos[i1].sortascending = vAscending;
pCC.CASA_colinfos[i1].sortorder = 0-0;
}
}
}
}
}
pCC.CASA_keybMaxSSS = -1;
pCC.CASA_colHeaders = [];
var withTitleRow = true;
if (pCC.CASA_withtitlerow == "false") withTitleRow = false;
var spString = "";
if (withTitleRow) spString += "<tr>";
var i=0;
var w = "15";
if (CL().isWM(this)) w = "27";
if (pCC.CASA_selectprop != null && pCC.CASA_withselectioncolumn != false && withTitleRow == true)
{
var vTCSelAttrClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellHeader'";
var vTCSelAttrHandler = "";
if (pCC.CASA_selectalllinesprop != null ||
pCC.CASA_rowcount == null ||
pCC.CASA_rowcount <= 0)
{
if (pCC.CASA_selectalllinespropertyvalue == null) pCC.CASA_selectalllinespropertyvalue = false;
var vAllLinesSelected;
if (pCC.CASA_selectalllinesprop != null)
vAllLinesSelected = getPropertyValue(pCC.CASA_selectalllinesprop);
else
vAllLinesSelected = pCC.CASA_selectalllinespropertyvalue;
if (vAllLinesSelected == true || vAllLinesSelected == "true")
vTCSelAttrClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDeselectAllLines'";
else
vTCSelAttrClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderSelectAllLines'";
vTCSelAttrHandler = " "+getTesttoolidHtml()+"='"+pCC.CASA_testtoolid+"_selectAll' onclick='selectAllLines"+pCC.CASA_id+"();' ondblclick='selectAllLines"+pCC.CASA_id+"();'";
}
if (pCC.CASA_withselectioncolumnicon == false)
{
vTCSelAttrClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellHeader'";
vTCSelAttrHandler = " "+getTesttoolidHtml()+"='"+pCC.CASA_testtoolid+"_selectAll' ";
}
w = presetDefaultWidthTEXTGRID(w);
spString += "<td id='TG"+pCC.CASA_id+"TITLECELLSELECT' width='"+C_adjustUnits(w)+"' "+vTCSelAttrClass+" "+vTCSelAttrHandler+" ><table width='"+C_adjustUnits(w)+"'></table></td>";
}
var vMouseEvents = "";
vMouseEvents = "onmouseup='reactOnMouseUp"+pCC.CASA_id+"(event);' "+
"onmousedown='reactOnMouseDown"+pCC.CASA_id+"(event);' "+
"ondblclick='reactOnDblClickHeader"+pCC.CASA_id+"(event);' ";
vMouseEvents += "oncontextmenu='event.stopPropagation(); return false;'"
var vColHeaderCounter = 0;
var imax = pCC.CASA_colinfos.length;
var onlyUndefinedWidths = true;
for (i=0; i<imax; i++)
{
var currentcolinfos = pCC.CASA_colinfos[i];
if (currentcolinfos.columntype == null || currentcolinfos.columntype == CT_COLUMN)
{
var vTemp = pCC.CASA_colinfos[i].name;
if (vTemp == null) vTemp = "";
var vTempSub = vTemp.replace(/&apos;/g,"'");
var vSortTitle = "";
if (pCC.CASA_colinfos[i].sorttitle != null)
vSortTitle = pCC.CASA_colinfos[i].sorttitle;
var vTitle =  vTempSub;
if (pCC.CASA_colinfos[i].title != null)
vTitle = pCC.CASA_colinfos[i].title;
var tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeader\"";
if (pCC.CASA_sortprop != null && pCC.CASA_personalizable == "true" && pCC.CASA_colinfos[i].withsorticon != "false")
tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderUnsorted"+pCC.m_dirStyleExt+"\"";
if (currentcolinfos.sortorder != "-1" && currentcolinfos.sortascending == "true")
{
if (currentcolinfos.sortorder == 0) tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderAscending"+pCC.m_dirStyleExt+"\"";
else if (currentcolinfos.sortorder == 1) tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderAscending1"+pCC.m_dirStyleExt+"\"";
else tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderAscending2"+pCC.m_dirStyleExt+"\"";
}
if (currentcolinfos.sortorder != "-1" && currentcolinfos.sortascending == "false")
{
if (currentcolinfos.sortorder == 0) tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDescending"+pCC.m_dirStyleExt+"\"";
else if (currentcolinfos.sortorder == 1) tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDescending1"+pCC.m_dirStyleExt+"\"";
else tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDescending2"+pCC.m_dirStyleExt+"\"";
}
var vHeaderTextClass = "";
if (tdClass != null) vHeaderTextClass = tdClass.substr(0, tdClass.length-1)+"PADDING\"";
if (currentcolinfos.width != null && currentcolinfos.width != "")
onlyUndefinedWidths = false;
if (onlyFixSizedColumns == true && currentcolinfos.width != null && currentcolinfos.width.search("%") >= 0)
onlyFixSizedColumns = false;
currentcolinfos.CASA_align = "";
currentcolinfos.CASA_nbsp = "";
if (currentcolinfos.align != null) currentcolinfos.CASA_align = "align='"+currentcolinfos.align+"'";
else if (pCC.CASA_fieldparam1 == "true" && (currentcolinfos.datatype == "int" || currentcolinfos.datatype == "long" || currentcolinfos.datatype == "float")) currentcolinfos.CASA_align = "align='"+defAlign+"'";
if (!CL().isAMN(this))
if (currentcolinfos.CASA_align.indexOf("right") > 0)
currentcolinfos.CASA_nbsp = "&nbsp;";
if (withTitleRow)
{
pCC.CASA_colinfos[i].width = presetDefaultWidthTEXTGRID(pCC.CASA_colinfos[i].width);
var vHeaderImage = "";
if (pCC.CASA_colinfos[i].headerimage != null)
vHeaderImage = "<img src='"+pCC.CASA_colinfos[i].headerimage+"'>&nbsp;";
if (pCC.CASA_colinfos[i].width != null &&
pCC.CASA_colinfos[i].width.search("%") >= 0 &&
pCC.CASA_fixedcolumnsizes != true &&
pCC.m_dirStyleExt != 'RTL')
tableStyle = "style='height: 100%;'";
var sortprop = currentcolinfos.property;
if (sortprop == null) sortprop = currentcolinfos.imageprop;
var hNowrapStr = "";
if (currentcolinfos.headernowrap == null ||
currentcolinfos.headernowrap.toLowerCase() != "false") hNowrapStr = " nowrap='true' ";
else
wrapsizing = true;
spString += "<td id='TG"+pCC.CASA_id+"COL"+vColHeaderCounter+"' "+vMouseEvents+" width=\""+C_adjustUnits(pCC.CASA_colinfos[i].width)+"\" "+tdClass+" "+tdStyle+"><div id='TGDIV"+pCC.CASA_id+"COL"+vColHeaderCounter+"' nowrap=\"true\" style=\"width: "+C_adjustUnits(determineDivWidthTEXTGRID(currentcolinfos.width))+"; overflow-x: hidden;\"><table width='100%' cellpadding=0 cellspacing=0 "+tdClass+" "+tableStyle+"><tr><td "+hNowrapStr+" width='100%' "+currentcolinfos.CASA_align+" "+vHeaderTextClass+" title='"+convertApos(vTitle)+"'>"+vHeaderImage+vTempSub+currentcolinfos.CASA_nbsp+"</td>";
if (pCC.CASA_sortprop != null && pCC.CASA_colinfos[i].withsorticon != "false") spString += "<td width='"+C_adjustUnits(w)+"' title='"+convertApos(vSortTitle)+"' style='cursor:pointer'><img style='display:block' src='../HTMLBasedGUI/general/nothing.gif' width="+C_adjustUnits(w)+"></td>";
if (pCC.CASA_griddataprop != null && pCC.CASA_disablecolumnresizing != true) spString += "<td id='TG"+pCC.CASA_id+"RES"+vColHeaderCounter+"' width='3px' height='100%'><div class='VSPLITLine' style='height: 100%;'>&nbsp;</div></td>";
spString += "</tr></table></div></td>";
vColHeaderCounter++;
pCC.CASA_colinfos[i].type = "COLUMN";
pCC.CASA_colHeaders.push(pCC.CASA_colinfos[i]);
}
}
else if (pCC.CASA_colinfos[i].columntype == CT_CSVCOLUMN || pCC.CASA_colinfos[i].columntype == CT_SSCOLUMN)
{
var titlesCSV = getPropertyValue(currentcolinfos.titlesprop);
if (titlesCSV == null)
continue;
var titleArray = decodeCSVStringUsingBuffer(titlesCSV);
var widthsCSV = getPropertyValue(currentcolinfos.widthsprop);
if (widthsCSV == null)
{
alert("No widths are passed in CSVCOLUMN - TEXTGRID will not be properly rendered");
return;
}
var widthArray = decodeCSVStringUsingBuffer(widthsCSV);
if (widthArray.length != titleArray.length)
{
alert("Number of width elements in CSVCOLUMN does not match number of title elements");
return;
}
for (var ic=0; ic<widthArray.length;ic++)
if (widthArray[i] != null && widthArray[i] != "")
{
onlyUndefinedWidths = false;
break;
}
var proprefArray = null;
var proprefsprop = currentcolinfos.proprefsprop;
if (proprefsprop != null)
{
var proprefsCSV = getPropertyValue(proprefsprop);
if (proprefsCSV != null)
{
proprefArray = decodeCSVStringUsingBuffer(proprefsCSV);
if (proprefArray.length != titleArray.length)
{
alert("Number of property references is not equal to number of titles");
continue;
}
}
}
var alignsprop = currentcolinfos.alignsprop;
if (alignsprop != null)
{
var alignsCSV = getPropertyValue(alignsprop);
if (alignsCSV != null)
{
var alignArray = decodeCSVStringUsingBuffer(alignsCSV);
if (alignArray.length != titleArray.length)
{
alert("Number of aligns is not equal to number of titles");
continue;
}
currentcolinfos.alignArray = alignArray;
}
}
var sorttitlesprop = currentcolinfos.sorttitlesprop;
if (sorttitlesprop != null)
{
var sorttitlesCSV = getPropertyValue(sorttitlesprop);
if (sorttitlesCSV != null)
{
var sorttitlesArray = decodeCSVStringUsingBuffer(sorttitlesCSV);
if (sorttitlesArray.length != titleArray.length)
{
alert("Number of sort titles is not equal to number of titles");
continue;
}
currentcolinfos.sorttitlesArray = sorttitlesArray;
}
}
currentcolinfos.tooltiptitlesArray = titleArray;
var tooltiptitlesprop = currentcolinfos.tooltiptitlesprop;
if (tooltiptitlesprop != null)
{
var tooltiptitlesCSV = getPropertyValue(tooltiptitlesprop);
if (tooltiptitlesCSV != null)
{
var tooltiptitlesArray = decodeCSVStringUsingBuffer(tooltiptitlesCSV);
if (tooltiptitlesArray.length != titleArray.length)
{
alert("Number of tooltip titles is not equal to number of titles");
continue;
}
currentcolinfos.tooltiptitlesArray = tooltiptitlesArray;
}
}
var lmprop = currentcolinfos.linkmethodsprop;
if (lmprop != null)
{
var lms = getPropertyValue(lmprop);
if (lms != null)
{
lms = decodeCSVStringUsingBuffer(lms);
if (titleArray.length == 1 && lms.length == 0) lms.push("");
if (lms.length != titleArray.length)
{
alert("Number of link methods "+lms.length+" is not equal to number of titles "+titleArray.length);
continue;
}
currentcolinfos.linkmethodsArray = lms;
}
}
var hiprop = currentcolinfos.headerimageprop;
if (hiprop != null)
{
var his = getPropertyValue(hiprop);
if (his != null)
{
his = decodeCSVStringUsingBuffer(his);
if (his.length != titleArray.length)
{
alert("Number of link header images is not equal to number of titles");
continue;
}
currentcolinfos.headerImageArray = his;
}
}
var stprop = currentcolinfos.straighttextprop;
if (stprop != null)
{
var sts = getPropertyValue(stprop);
if (sts != null)
{
sts = decodeCSVStringUsingBuffer(sts);
if (sts.length != titleArray.length)
{
alert("Number of straighttextprop values is not equal to number of titles");
continue;
}
currentcolinfos.straighttextArray = sts;
}
}
for (j=0; j<titleArray.length; j++)
{
var refprop = null;
if (proprefArray != null && j<proprefArray.length)
refprop = proprefArray[j];
var tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeader\"";
var vIsNOSORTProp = false;
if (refprop != null) vIsNOSORTProp = checkIfStringEndsWith(refprop, "NOSORT");
if (refprop != null &&
!vIsNOSORTProp &&
pCC.CASA_sortprop != null)
{
tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderUnsorted"+pCC.m_dirStyleExt+"\"";
var sortProperty = getPropertyValue(pCC.CASA_sortprop+".sortProperty");
var ascending = getPropertyValue(pCC.CASA_sortprop+".ascending");
if (refprop == sortProperty)
{
if (ascending == "true" ) tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderAscending"+pCC.m_dirStyleExt+"\"";
if (ascending == "false") tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDescending"+pCC.m_dirStyleExt+"\"";
}
}
if (currentcolinfos.sortorder != "-1" && currentcolinfos.sortascending == "false")
{
if (currentcolinfos.sortorder == 0) tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDescending"+pCC.m_dirStyleExt+"\"";
else if (currentcolinfos.sortorder == 1) tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDescending1"+pCC.m_dirStyleExt+"\"";
else tdClass = "class=\"TEXTGRID"+pCC.CASA_stylevariant+"CellHeaderDescending2"+pCC.m_dirStyleExt+"\"";
}
var vHeaderTextClass = "";
if (tdClass != null) vHeaderTextClass = tdClass.substr(0, tdClass.length-1)+"PADDING\"";
var vAlign = "";
if (currentcolinfos.alignArray != null && currentcolinfos.alignArray[j] != null) vAlign = "align='"+currentcolinfos.alignArray[j]+"'";
if (withTitleRow)
{
var vHeaderImage = "";
if (currentcolinfos.headerImageArray != null)
vHeaderImage = "<img src='"+currentcolinfos.headerImageArray[j]+"'>&nbsp;";
var sorttitle = "";
if (currentcolinfos.sorttitlesArray != null) sorttitle = currentcolinfos.sorttitlesArray[j];
var tooltiptitle = titleArray[j];
if(currentcolinfos.tooltiptitlesArray[j] != null)
tooltiptitle = currentcolinfos.tooltiptitlesArray[j];
if (tooltiptitle == null) tooltiptitle = "";
widthArray[j] = presetDefaultWidthTEXTGRID(widthArray[j]);
if (widthArray[j] != null &&
widthArray[j].search("%") >= 0 &&
pCC.CASA_fixedcolumnsizes != true)
tableStyle = "style='height: 100%;'";
var hNowrapStr = "";
if (currentcolinfos.headernowrap == null ||
currentcolinfos.headernowrap.toLowerCase() != "false") hNowrapStr = " nowrap='true' ";
else
wrapsizing = true;
spString += "<td id='TG"+pCC.CASA_id+"COL"+vColHeaderCounter+"' "+vMouseEvents+" width=\""+widthArray[j]+"\" "+tdClass+" "+tdStyle+"><div id='TGDIV"+pCC.CASA_id+"COL"+vColHeaderCounter+"' nowrap=\"true\" style=\"width:'"+determineDivWidthTEXTGRID(widthArray[j])+"'; overflow-x: hidden\"><table width='100%' cellpadding=0 cellspacing=0 "+tdClass+" "+tableStyle+"><tr><td "+hNowrapStr+" width='100%' "+vAlign+" "+vHeaderTextClass+" title='"+convertApos(tooltiptitle)+"'>"+vHeaderImage + titleArray[j] + "</td>";
if (pCC.CASA_sortprop != null && refprop != null && vIsNOSORTProp != true) spString += "<td width='22px' title='"+convertApos(sorttitle)+"' style='cursor:pointer'><img style='display:block' src='../HTMLBasedGUI/general/nothing.gif' width="+w+"></td>";
else spString += "<td width='1px'></td>";
if (pCC.CASA_griddataprop != null &&
currentcolinfos.withgridcolheaders == "true" &&
pCC.CASA_disablecolumnresizing != true)
{
spString += "<td id='TG"+pCC.CASA_id+"RES"+vColHeaderCounter+"' width='3px' height='100%'><div class='VSPLITLine' style='width:100%;height: 100%;'>&nbsp;</div></td>";
}
spString += "</tr></table></div></td>";
vColHeaderCounter++;
var colHeader = new Object();
colHeader.property = refprop;
if (refprop == null) colHeader.property = "csv"+j;
colHeader.width = widthArray[j];
colHeader.name = titleArray[j];
colHeader.type = "CSVCOLUMN";
pCC.CASA_colHeaders.push(colHeader);
}
if (onlyFixSizedColumns == true && widthArray[j].search("%") >= 0)
onlyFixSizedColumns = false;
}
currentcolinfos.widthArray = widthArray;
}
}
if (withTitleRow)
spString += "</tr>";
if (m_doLog) addLogMessage("reactOnModelUpdateTEXTGRID - starting line processing");
var iRow = 0;
var focusRequestorIndex = -1;
var spRows = [];
var iRowIndexBase = 0;
if (pCC.CASA_onloadbehaviour == "collection" ||
(pCC.CASA_onloadbehaviour == "collectionorblock" && getPropertyValue(pCC.CASA_param1prop) == "true"))
iRowIndexBase = (1*getPropertyValue(pCC.CASA_topindexprop));
while(true)
{
if (pCC.CASA_rowcount > 0 && iRow >= pCC.CASA_rowcount)
break;
var spRow = "";
var spCols = [];
var iRowIndex = iRow+iRowIndexBase;
var currentarrayitem = pCC.CASA_displayitemsprop + "["+iRowIndex+"].";
var isSelectableProp = getSelectableTEXTGRID(pCC,currentarrayitem);
var vCursor = "cursor: pointer;";
if(pCC.CASA_selectprop == null || pCC.CASA_withselectioncolumn == false ||
isSelectableProp == "false")
vCursor = "cursor:default;";
var vSelected = null;
if (pCC.CASA_selectprop != null)
vSelected = getPropertyValue(currentarrayitem+pCC.CASA_selectprop);
if (pCC.CASA_focusedprop != null && focusRequestorIndex == -1)
{
var vFocus = getPropertyValue(currentarrayitem+pCC.CASA_focusedprop);
if (vFocus == "true")
focusRequestorIndex = iRow;
}
var emptyline = true;
var i=0;
for (i=0; i<pCC.CASA_colinfos.length; i++)
{
var currentcolinfos = pCC.CASA_colinfos[i];
if (currentcolinfos.columntype == null || currentcolinfos.columntype == CT_COLUMN)
{
var vCol = getPropertyValue(currentarrayitem+currentcolinfos.property);
if (vCol != null && currentcolinfos.straighttext == true)
{
vCol = convertSpecialHTMLCharacters(vCol);
if (currentcolinfos.cuttextline == false && vCol.indexOf("\n") >= 0)
vCol = vCol.replace(/\n/g,"<br>");
}
var vImage = null;
if (currentcolinfos.imageprop != null)
{
vImage = getPropertyValue(currentarrayitem+currentcolinfos.imageprop);
if (vImage != null && vImage != "")
{
var clickHandling = "";
var vLinkMethod = currentcolinfos.linkmethod;
if(currentcolinfos.celllinkmethodprop != null)
vLinkMethod = getPropertyValue(currentarrayitem + currentcolinfos.celllinkmethodprop);
if (vLinkMethod != null && vLinkMethod != "")
clickHandling = "onclick='C.invokeMethodInModelTEXTGRID(\""+pCC.CASA_arrayprop+"["+iRowIndex+"]."+vLinkMethod+"\");' style='cursor:pointer'";
vImage = "<img class='TEXTGRIDImgCellContent' src='"+vImage+"' "+clickHandling+"/>&nbsp;&nbsp;";
}
}
var vCellTitle = "";
if (currentcolinfos.celltitleprop != null)
{
vCellTitle = getPropertyValue(currentarrayitem+currentcolinfos.celltitleprop);
if (vCellTitle != null && vCellTitle != "")
vCellTitle = " title='"+convertApos(vCellTitle)+"'";
}
var vTextStyle = "";
if (currentcolinfos.textstyleprop != null)
vTextStyle = getStylePropertyValue(currentarrayitem+currentcolinfos.textstyleprop);
if (pCC.CASA_fgselect == true && vSelected == "true")
vTextStyle += ";background-image:url(../HTMLBasedGUI/images/shadedbackground.gif)";
var vTextClass = "";
if (currentcolinfos.textclassprop != null)
{
vTextClass = "class='"+getPropertyValue(currentarrayitem+currentcolinfos.textclassprop)+"'";
}
else
{
if (iRow%2 == 1) vTextClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellContentDarkPADDING'";
else             vTextClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellContentPADDING'";
}
var vCuttextline = "overflow-x:hidden;overflow-y:hidden;text-overflow:clip;white-space:nowrap;"
if (currentcolinfos.cuttextline == false)
vCuttextline = "";
if (currentcolinfos.datatype != null)
{
if (currentcolinfos.datatype == "date") vCol = convertYYYYMMDDIntoDisplayString(vCol);
if (currentcolinfos.datatype == "time") vCol = convertHHMMSSIntoDisplayString(vCol);
if (currentcolinfos.datatype == "timestamp") vCol = convertYYYYMMDDHHMMSSMMMIntoDisplayString(vCol);
if (currentcolinfos.datatype == "float")
{
if ( currentcolinfos.decimaldigits >= 0 )
vCol = convertFLOATIntoDisplayString(vCol, currentcolinfos.decimaldigits);
else
vCol = convertFLOATIntoDisplayString(vCol);
}
if (currentcolinfos.datatype == "int" || currentcolinfos.datatype == "long") vCol = convertINTIntoDisplayString(vCol);
}
if (vCol == null && vImage == null && iRow >= pCC.CASA_rowcount && (pCC.CASA_minapparentrows == undefined || iRow >= pCC.CASA_minapparentrows))
break;
if (vCol != null || vImage != null)
emptyline = false;
if (vCol == null && vImage == null && (iRow < pCC.CASA_rowcount || iRow < pCC.CASA_minapparentrows))
vCol = "&nbsp;";
if (vCol == null) vCol = "";
if (vImage == null) vImage = "";
spCols.push("<td ");
var vCasaCellVal = currentcolinfos.property;
if (vCasaCellVal == null) vCasaCellVal = "";
var vCasaCell = " CASA_cell='" + vCasaCellVal + "' ";
spCols.push(vCasaCell);
spCols.push(" style=\"");
spCols.push(vTextStyle);
spCols.push("\" width=\"");
currentcolinfos.width = presetDefaultWidthTEXTGRID(currentcolinfos.width);
spCols.push(C_adjustUnits(currentcolinfos.width));
spCols.push("\"");
spCols.push(vCellTitle);
spCols.push(">");
spCols.push("<div ");
spCols.push(currentcolinfos.CASA_align);
spCols.push(" ");
spCols.push(vTextClass);
spCols.push(" ");
spCols.push(" style=\"overflow: hidden;");
spCols.push(vCuttextline);
spCols.push(" width:");
var tWidth=determineDivWidthTEXTGRID(currentcolinfos.width);
spCols.push(C_adjustUnits(tWidth));
spCols.push(";");
spCols.push(vTextStyle);
spCols.push("\">");
if (currentcolinfos.convertspaces == true)
{
vCol = vCol.replace(/ /g,"&nbsp;");
}
spCols.push(vImage);
var vLinkMethod = currentcolinfos.linkmethod;
if(currentcolinfos.celllinkmethodprop != null)
vLinkMethod = getPropertyValue(currentarrayitem + currentcolinfos.celllinkmethodprop);
if (vLinkMethod != null && vLinkMethod != "" && vCol != "&nbsp;")
spCols.push("<a href='javascript:C.invokeMethodInModelTEXTGRID(\""+pCC.CASA_arrayprop+"["+iRowIndex+"]."+vLinkMethod+"\");' onclick='event.stopPropagation();' class='TEXTGRID"+pCC.CASA_stylevariant+"Link'>");
spCols.push(vCol);
spCols.push(currentcolinfos.CASA_nbsp);
if (currentcolinfos.linkmethod != null && vCol != "&nbsp;")
spCols.push("</a>");
spCols.push("</div></td>");
}
else if (currentcolinfos.columntype == CT_CSVCOLUMN)
{
var titlesCSV = getPropertyValue(currentcolinfos.titlesprop);
var titleArray = decodeCSVStringUsingBuffer(titlesCSV);
var valuesCSV = getPropertyValue(currentarrayitem + currentcolinfos.valuesprop);
if (valuesCSV == null && iRow >= pCC.CASA_rowcount && (pCC.CASA_minapparentrows == undefined || iRow >= pCC.CASA_minapparentrows))
break;
var backgroundsArray = null;
if (currentcolinfos.backgroundsprop != null)
{
var backgroundsCSV = getPropertyValue(currentarrayitem + currentcolinfos.backgroundsprop);
if (backgroundsCSV != null)
backgroundsArray = decodeCSVStringUsingBuffer(backgroundsCSV);
}
var cellImagepropArray = null;
if (currentcolinfos.imageprop != null)
{
var cellImageprop = getPropertyValue(currentarrayitem + currentcolinfos.imageprop);
if (cellImageprop != null)
cellImagepropArray = decodeCSVStringUsingBuffer(cellImageprop);
}
var cellToolTipArray = null;
if (currentcolinfos.celltooltiptitleprop != null)
{
var cellTooltipCSV = getPropertyValue(currentarrayitem + currentcolinfos.celltooltiptitleprop);
if (cellTooltipCSV != null)
cellToolTipArray = decodeCSVStringUsingBuffer(cellTooltipCSV);
}
var cellLinkMPArray = null;
if (currentcolinfos.celllinkmethodsprop != null)
{
var cellLinkMPCSV = getPropertyValue(currentarrayitem + currentcolinfos.celllinkmethodsprop);
if (cellLinkMPCSV != null)
cellLinkMPArray = decodeCSVStringUsingBuffer(cellLinkMPCSV);
}
var emptyCSV = true;
if (valuesCSV != null && valuesCSV != "")
emptyCSV = false;
if (emptyCSV == false)
emptyline = false;
if (valuesCSV == null && iRow < pCC.CASA_rowcount && (iRow < pCC.CASA_rowcount || iRow < pCC.CASA_minapparentrows))
valuesCSV = "";
var valueArray = decodeCSVStringEMPTY(valuesCSV);
if (emptyCSV == false)
{
var indexdiff = currentcolinfos.widthArray.length - valueArray.length;
if (indexdiff != 0)
{
alert("CSVCOLUMN: Number of value elements does not match number of width elements");
break;
}
}
var textStyleArray = null;
var vTextStyle = "";
if (currentcolinfos.textstyleprop != null)
{
try
{
vTextStyle = getStylePropertyValue(currentarrayitem+currentcolinfos.textstyleprop);
if (vTextStyle != null && vTextStyle != "")
{
textStyleArray = decodeCSVStringUsingBuffer(vTextStyle);
if ( titleArray.length > 0 )
{
if (textStyleArray.length > titleArray.length)
{
var vtextstylemodulo = textStyleArray.length % titleArray.length;
if (vtextstylemodulo == 0)
{
var vtextstylecount = textStyleArray.length / titleArray.length;
var vts = [];
for (var vtsi = 0; vtsi < textStyleArray.length; vtsi += vtextstylecount)
{
var columntextstyle = "";
for (var vtsij = 0; vtsij < vtextstylecount; vtsij++)
columntextstyle += textStyleArray[vtsi+vtsij]+";";
vts.push(columntextstyle);
}
textStyleArray = vts;
}
else {
alert("CSVCOLUMN: number of style elements doesn't correspond to number of titles");
break;
}
}
}
else {
alert("CSVCOLUMN: title array has no elements");
break;
}
}
}
catch (exccccc) { }
}
if (pCC.CASA_fgselect == true && vSelected == "true")
vTextStyle += ";background-image:url(../HTMLBasedGUI/images/shadedbackground.gif)";
var vTextClass = "";
if (iRow%2 == 1) vTextClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellContentDarkPADDING'";
else             vTextClass = "class='TEXTGRID"+pCC.CASA_stylevariant+"CellContentPADDING'";
if (currentcolinfos.textclassprop != null)
vTextClass = "class='"+getPropertyValue(currentarrayitem+currentcolinfos.textclassprop)+"'";
var vCuttextline = "overflow-x:hidden;overflow-y:hidden;text-overflow:clip;white-space:nowrap;";
if (currentcolinfos.cuttextline == false)
vCuttextline = "";
var j=0;
spCols.push(" ");
var buffereds1 = "<td " + " style=\"";
var buffereds2 = "'><div "+ vTextClass + " ";
var bufferedwa = currentcolinfos.widthArray;
if (bufferedwa == null) return;
for (j=0; j<bufferedwa.length; j++)
{
var valign = "";
if (currentcolinfos.alignArray != null)
valign = "align='" + currentcolinfos.alignArray[j] + "'";
var vThisTextStyle = vTextStyle;
if (textStyleArray != null && textStyleArray.length > j)
{
vThisTextStyle = textStyleArray[j];
}
if (backgroundsArray != null && backgroundsArray.length > j)
{
baj = backgroundsArray[j];
if (baj != "")
vThisTextStyle = "color:"+determineContrastColorCOLORSELECTION(baj)+";background-color:"+baj+";"+vThisTextStyle;
}
var vCellTitle="";
if (cellToolTipArray != "" && cellToolTipArray != null && cellToolTipArray.length > j)
{
var celltt = cellToolTipArray[j];
if (celltt != "" && celltt != null)
vCellTitle = " title='"+convertApos(celltt)+"'";
}
var vlmStart = "";
var vlmClose = "";
var imgClickHandler = "";
var vLinkMethod = "";
if(currentcolinfos.linkmethodsArray != null && currentcolinfos.linkmethodsArray[j] != null && currentcolinfos.linkmethodsArray[j] != "")
vLinkMethod = currentcolinfos.linkmethodsArray[j];
if(cellLinkMPArray != null && cellLinkMPArray[j] != null && cellLinkMPArray[j] != "")
vLinkMethod = cellLinkMPArray[j];
if (vLinkMethod != "")
{
imgClickHandler = "onclick='C.invokeMethodInModelTEXTGRID(\""+pCC.CASA_arrayprop+"["+iRowIndex+"]."+vLinkMethod+"\");'";
vlmStart = "<a href='javascript:C.invokeMethodInModelTEXTGRID(\""+pCC.CASA_arrayprop+"["+iRowIndex+"]."+vLinkMethod+"\");' onclick='event.stopPropagation();' class='TEXTGRID"+pCC.CASA_stylevariant+"Link'>";
vlmClose = "</a>";
}
spCols.push(buffereds1);
spCols.push(vThisTextStyle);
var vCasaCell = "\" ";
if (proprefArray != "" && proprefArray != null && proprefArray.length > j)
vCasaCell += " CASA_cell='" + proprefArray[j] + "' ";
spCols.push(vCasaCell);
bufferedwa[j] = presetDefaultWidthTEXTGRID(bufferedwa[j]);
spCols.push(" width='");
spCols.push(C_adjustUnits(bufferedwa[j]));
spCols.push(buffereds2);
spCols.push(valign);
spCols.push(vCellTitle);
spCols.push(" style=\"overflow-x:hidden;" );
spCols.push (vCuttextline);
spCols.push(" width:");
spCols.push(C_adjustUnits(determineDivWidthTEXTGRID(bufferedwa[j])));
spCols.push("\">");
if (emptyCSV == false)
{
var vV = valueArray[j];
var st = currentcolinfos.straighttext;
if (currentcolinfos.straighttextArray != null && currentcolinfos.straighttextArray[j] != null)
st = currentcolinfos.straighttextArray[j] == "true";
if (vV != null && st == true)
{
vV = convertSpecialHTMLCharacters(vV);
if (currentcolinfos.cuttextline == false && vV.indexOf("\n") >= 0)
vV = vV.replace(/\n/g,"<br>");
}
if (currentcolinfos.cuttextline == true)
{
vV = vV.replace(/ /g,"&nbsp;");
}
if (cellImagepropArray != "" && cellImagepropArray != null && cellImagepropArray.length > j)
{
var cellImage = cellImagepropArray[j];
if (cellImage != null && cellImage != "")
{
cellImage = "<img class='TEXTGRIDImgCellContent' src='"+cellImagepropArray[j]+"' "+imgClickHandler+"/>&nbsp;&nbsp;";
spCols.push(cellImage);
}
}
spCols.push(vlmStart);
spCols.push(vV);
spCols.push(vlmClose);
}
else
spCols.push("&nbsp;");
spCols.push("</div></td>");
}
}
else if (currentcolinfos.columntype == CT_SSCOLUMN)
{
var valuesHTML = getPropertyValue(currentarrayitem + currentcolinfos.valuesprop);
if (valuesHTML != null)
emptyline = false;
if (valuesHTML == null && iRow >= pCC.CASA_rowcount)
break;
if (valuesHTML == null)
spCols.push("<td colspan=100></td>");
else
spCols.push(valuesHTML);
onlyUndefinedWidths = false;
}
}
spRow = spCols.join("");
if (spRow == "")
{
if (pCC.CASA_minapparentrows == undefined || iRow >= pCC.CASA_minapparentrows)
break;
}
if (emptyline == true && pCC.CASA_showemptylines == false )
{
if (pCC.CASA_minapparentrows == null || iRow >= pCC.CASA_minapparentrows)
break;
}
var spRowItems = [];
spRowItems[2] = spRow;
vRowId = "TGROW"+pCC.CASA_id+"_"+iRow;
var vRowStyle;
if (iRow%2 == 1) vRowStyle = "TEXTGRID"+pCC.CASA_stylevariant+"CellContentDark";
else             vRowStyle = "TEXTGRID"+pCC.CASA_stylevariant+"CellContent";
if (vSelected == "true" || vSelected == true) vRowStyle = "TEXTGRID"+pCC.CASA_stylevariant+"CellSelectedContent";
var vRowStyle2 = "";
if (iRow%2 == 0 && pCC.CASA_evenrowstyle != null) vRowStyle2 = pCC.CASA_evenrowstyle;
if (iRow%2 == 1 && pCC.CASA_oddrowstyle  != null) vRowStyle2 = pCC.CASA_oddrowstyle;
if (pCC.CASA_selectprop != null && pCC.CASA_withselectioncolumn != false)
{
var vSelectableAddOn = "";
if(isSelectableProp == "false")
vSelectableAddOn = "Disabled"
var vRowFCStyle = "";
if (emptyline == false) vRowFCStyle = "class='TEXTGRID"+pCC.CASA_stylevariant+vSelectableAddOn+"CellUnselectColumn'";
if (vSelected == "true" || vSelected == true)
vRowFCStyle = "class='TEXTGRID"+pCC.CASA_stylevariant+vSelectableAddOn+"CellSelectColumn"+pCC.m_dirStyleExt+"'";
w = presetDefaultWidthTEXTGRID(w);
spRowItems[1] = "<td "+vRowFCStyle+" width='0' id='"+vRowId+"FC'><table cellpadding=0 cellspacing=0 border=0 width="+C_adjustUnits(w)+"><tr><td width='100%'></td></tr></table></td>";
}
else
spRowItems[1] = "";
if (emptyline == false)
{
spRowItems[0] = "<tr tabindex='"+pCC.tabIndex+"' id=\""+vRowId+"\" style=\""+vCursor+vRowStyle2+"\" class=\""+vRowStyle+"\">";
spRowItems[3] = "</tr>";
}
else
{
var vOnMouseUp = "onmouseup=\"event.stopPropagation();\"";
vEmptyRowId = "TGEMPTYROW"+pCC.CASA_id+"_"+iRow;
spRowItems[0] = "<tr id='"+vEmptyRowId+"' class='TEXTGRID"+pCC.CASA_stylevariant+"RowEmpty' "+vOnMouseUp+">";
spRowItems[3] = "</tr>";
if (pCC.CASA_keybMaxSSS == -1)
pCC.CASA_keybMaxSSS = iRow;
}
spRows.push(spRowItems.join(""));
iRow++;
}
if (m_doLog) addLogMessage("reactOnModelUpdateTEXTGRID - lines processed: " + iRow);
var tableWidth = "";
if (onlyFixSizedColumns == false) tableWidth = "width='100%'";
if (onlyUndefinedWidths == true) tableWidth = "width='100%'";
var tablelayout = "";
if (pCC.CASA_fixedcolumnsizes == true){
tablelayout = "table-layout:fixed;";
if (tableWidth == "") tableWidth="width='1px'";
}
var vAllRows = spRows.join("");
var vCtrlKey = "event.ctrlKey";
var vShiftKey = "event.shiftKey";
var vContextMenuReturn = " return false;";
if (pCC.CASA_enabledefaultcontextmenu == "true") vContextMenuReturn = "";
var vRolloverIN = "";
var vRolloverOUT = "";
if (pCC.CASA_withrollover != false)
{
vRolloverIN = "onmouseover='C.enterRowTEXTGRID(C.getEventRowTEXTGRID(event),\""+pCC.CASA_stylevariant+"\");' ";
var selectedprop = pCC.CASA_displayitemsprop+"[\"+("+iRowIndexBase+"+C.getEventRowNumberTEXTGRID(event))+\"]."+pCC.CASA_selectprop;
vRolloverOUT = "onmouseout='C.leaveRowTEXTGRID(C.getEventRowTEXTGRID(event),\""+selectedprop+"\",C.getEventRowNumberTEXTGRID(event),\""+pCC.CASA_stylevariant+"\");'";
}
var vOnFocus = "";
vOnFocus = "onfocus='C.reactonfocusTEXTGRID("+pCC.CASA_id+", C.getEventRowNumberTEXTGRID(event));'";
var vOnMouseUp = "onmouseup=\"event.stopPropagation();\"";
var onMouseDownHandler ="";
if(pCC.CASA_draginfoprop != null || pCC.CASA_draginfoprop != undefined )
onMouseDownHandler = "onmousedown ='reactOnMouseDownOnRowTEXTGRID"+pCC.CASA_id+"(event,C.getEventRowIdTEXTGRID(event));'";
var tblString = "<table "+tableWidth+" "+getTesttoolidHtml()+"='"+pCC.CASA_testtoolid+"_table' cellspacing=1 cellpadding=0 class='TEXTGRID"+pCC.CASA_stylevariant+"Table'";
if (pCC.CASA_onclickmethod == null)
{
if (pCC.CASA_ondblclickmethod == null)
tblString += " "+vOnMouseUp+" onclick=\"selectRow"+pCC.CASA_id+"(C.getEventRowNumberTEXTGRID(event), "+vCtrlKey+", "+vShiftKey+");\"";
else
tblString += " onmouseup=\"selectRow"+pCC.CASA_id+"(C.getEventRowNumberTEXTGRID(event), "+vCtrlKey+", "+vShiftKey+");event.stopPropagation();\"";
}
else
{
tblString += " "+vOnMouseUp+
" onclick='var evn = C.getEventRowNumberTEXTGRID(event);selectRow"+pCC.CASA_id+"(evn, "+vCtrlKey+", "+vShiftKey+", true); reactOnClick"+pCC.CASA_id+"(evn);'";
}
if (pCC.CASA_ondblclickmethod != null)
tblString += " ondblclick=\"C.dsc(); reactOnDblClick"+pCC.CASA_id+"(C.getEventRowNumberTEXTGRID(event));\"";
tblString += vRolloverIN+" "+vRolloverOUT+" "+vOnFocus+" "+onMouseDownHandler+
" oncontextmenu='CASA_event = event; onContextMenuRequest"+pCC.CASA_id+"(C.getEventRowNumberTEXTGRID(event));"+vContextMenuReturn+"' "+
" style='"+tablelayout+pCC.CASA_backgroundstyle+"'>" + spString + vAllRows + "</table>";
if (m_doLog) addLogMessage("reactOnModelUpdateTEXTGRID - Before innerHTML");
pCC.innerHTML = tblString;
if (m_doLog) addLogMessage("reactOnModelUpdateTEXTGRID - After innerHTML");
window.setTimeout(function() { doResizeTEXTGRID(pCC,wrapsizing);}, 30 );
if (focusRequestorIndex != -1)
{
pCC.CASA_keybCursor = focusRequestorIndex;
var vRowId = "TGROW"+pCC.CASA_id+"_"+focusRequestorIndex;
var vRow = parent.gebid(vRowId);
addFocusRequestor(vRow);
}
if (!isSuppressFocus())
setTimeout(function() { setKeyboardFocusTEXTGRID(pCC, pCC.CASA_keybCursor);}, 300 );
pCC.CASA_keybMaxCSS = iRow-1;
}
function doResizeTEXTGRID(pCC,wrap)
{
var vOuterDiv = parent.document.getElementById('TEXTGRIDDIV'+pCC.CASA_id);
if (vOuterDiv != null)
{
if (wrap==true)
{
for (var colcount=0; colcount<pCC.CASA_colinfos.length; colcount++)
{
var curDiv = parent.document.getElementById("TGDIV"+pCC.CASA_id+"COL"+colcount);
if (curDiv == null) continue;
var vpn = curDiv.parentNode;
var vpns = vpn.style;
var theheight = vpn.scrollHeight;
if (parent.m_roi_firstusage==true)
theheight = vpn.offsetHeight;
if ( theheight > 0 )
theheight = C_adjustUnits((theheight - calculatePixelValue(vpns.paddingTop) -
calculatePixelValue(vpns.paddingBottom)));
curDiv.style.height = theheight;
}
}
reactOnResizeTEXTGRIDExecute(pCC,vOuterDiv,true);
}
}
function getEventRowTEXTGRID(evt)
{
var srcElm = findSrcElement(evt);
if (srcElm == null) return null;
var eventRow = srcElm;
while(eventRow.nodeName != "tr" && eventRow.nodeName != "TR")
{eventRow = eventRow.parentNode;}
if (!getIdFromEventRowTEXTGRID(eventRow)) return null;
if (isEmptyRowTEXTGRID(eventRow)) return null;
return eventRow;
}
function getIdFromEventRowTEXTGRID(eventRow)
{
if (!eventRow || !eventRow.id) return null;
return eventRow.id;
}
function getEventRowIdTEXTGRID(evt)
{
return getIdFromEventRowTEXTGRID(getEventRowTEXTGRID(evt));
}
function getEventRowNumberTEXTGRID(evt)
{
var eventRowId = getEventRowIdTEXTGRID(evt);
if (!eventRowId) return -1;
return eventRowId.split("_")[1] * 1;
}
function isEmptyRowTEXTGRID(row)
{
if (!row || !row.id) return true;
return (row.id.search(/EMPTY/) != -1);
}
function enterRowTEXTGRID(row,stylevariant)
{
if (checkIO() == false) { return false;}
else if (isEmptyRowTEXTGRID(row)) return true;
row.className = "TEXTGRID"+stylevariant+"CellRolloverContent";
return true;
}
function leaveRowTEXTGRID(row,selectedprop,rowIndex,stylevariant)
{
if (isEmptyRowTEXTGRID(row)) return;
var vSelected = getPropertyValue(selectedprop);
if (vSelected == true || vSelected == "true")
row.className = "TEXTGRID"+stylevariant+"CellSelectedContent";
else if (rowIndex % 2 == 0)
row.className = "TEXTGRID"+stylevariant+"CellContent";
else
row.className = "TEXTGRID"+stylevariant+"CellContentDark";
}
var mm_selectRowTEXTGRID = null;
function selectRowTEXTGRID(pCC,rowIndex, ctrlKey, shiftKey, suppressSubmit)
{
if (rowIndex == -1) return;
if(pCC != null && getSelectableTEXTGRID(pCC,pCC.CASA_displayitemsprop+"["+rowIndex+"].") == "false") return;
if (mm_selectRowTEXTGRID == null) mm_selectRowTEXTGRID = CL().C_selectRowTEXTGRID;
return mm_selectRowTEXTGRID.call(this, pCC,rowIndex, ctrlKey, shiftKey, suppressSubmit);
}
function reactOnFillTextIdsTEXTGRID(pCC)
{
for (i=0; i<pCC.CASA_colinfos.length; i++)
{
var currentcolinfos = pCC.CASA_colinfos[i];
if (currentcolinfos.textid != null)
{
currentcolinfos.name = getPropertyValue("$"+currentcolinfos.textid);
if (currentcolinfos.name == null)
currentcolinfos.name = "$" + currentcolinfos.textid;
}
if (currentcolinfos.sorttitletextid != null)
{
currentcolinfos.sorttitle = getPropertyValue("$"+currentcolinfos.sorttitletextid);
if (currentcolinfos.sorttitle == null)
currentcolinfos.sorttitle = "$" + currentcolinfos.sorttitletextid;
}
if (currentcolinfos.titletextid != null)
{
currentcolinfos.title = getPropertyValue("$"+currentcolinfos.titletextid);
if (currentcolinfos.title == null)
currentcolinfos.title = "$" + currentcolinfos.titletextid;
}
}
}
var s_bufferWidthTEXTGRID = [];
function determineDivWidthTEXTGRID(tdWidth)
{
var result = s_bufferWidthTEXTGRID[tdWidth];
if (result != null) return result;
if (tdWidth == null || tdWidth.length == 0)
{
result = "100%";
}
else
{
var lastCharacter = tdWidth.charAt(tdWidth.length-1);
if (lastCharacter == "%")
result = "100%";
else
result = tdWidth;
}
s_bufferWidthTEXTGRID[tdWidth] = result;
return result;
}
function reactOnMouseDownOnRowTEXTGRID(cc,id,evt)
{
if(id == null) return;
CL().cancelEvent(evt);
var vSelected = null;
var rowItems = id.split("_");
var rowIndex = rowItems[1];
if (cc.CASA_selectprop != null)
vSelected = getPropertyValue(cc.CASA_displayitemsprop+"["+rowIndex+"]."+cc.CASA_selectprop);
if("false" == vSelected) return;
var draginfoprop = cc.CASA_displayitemsprop+"["+rowIndex+"]."+cc.CASA_draginfoprop;
var dragInfo = getPropertyValue(draginfoprop)
var tr = parent.gebid(id);
var vHTML = [];
vHTML.push("<td height='"+C_adjustUnits(tr.clientHeight)+"' width='"+C_adjustUnits(tr.clientWidth)+"'><table style =\"border:1px solid #CDCDCD;\" height='"+C_adjustUnits(tr.clientHeight)+"' width='"+C_adjustUnits(tr.clientWidth)+"'><tr style =\"border:1px solid #CDCDCD;\" height='100%' width='100%'class='"+tr.className+"'>");
for(var i=0;i<tr.childNodes.length;i++)
{
var td = tr.childNodes[i];
vHTML.push("<td style =\"border:1px solid #CDCDCD;\" height='"+C_adjustUnits(td.clientHeight)+"' width='"+C_adjustUnits(td.clientWidth)+"'></td>");
}
vHTML.push("</tr></table></td>");
startDragCL(dragInfo, vHTML.join(""), evt, parent);
}
function reactOnMouseDownTEXTGRID(cc,evt)
{
if (checkIO() == false) return false;
if (cc.CASA_personalizable == "false") return false;
if (cc.CASA_griddataprop == null) return false;
if (evt.button == "2")
{
if (evt.stopPropagation) evt.stopPropagation();
return false;
}
for (i=0; true; i++)
{
var cci = cc.CASA_colinfos[i];
if (cci == null)
break;
if (cci.columntype == CT_CSVCOLUMN && cci.withgridcolheaders != "true")
return;
}
try
{
var srcElement = findSrcElement(evt);
if (srcElement.className == 'VSPLITLine')
{
startResizeTEXTGRID(cc,evt);
}
else
{
var startDrag = true;
if (cc.CASA_disablecolumnmoving == true)
{
startDrag = false;
}
if (cc.CASA_colHeaders == null ||
cc.CASA_colHeaders.length == 0)
{
startDrag = false;
}
var typeOfFirst = cc.CASA_colHeaders[0].type;
for (var i = 0; i < cc.CASA_colHeaders.length; i++)
{
if (cc.CASA_colHeaders[i].type != typeOfFirst)
{
startDrag = false;
break;
}
}
if (startDrag == true)
{
startDragTEXTGRID(cc,evt);
}
else
{
var colIndex = this.findColumnIndex(cc, evt);
var colObject = cc.CASA_colHeaders[colIndex];
var sortprop = colObject.property;
if (sortprop == null) sortprop = colObject.imageprop;
CL().C_startSortTimerTEXTGRID(this, cc, sortprop);
}
}
}
catch (excc) { }
}
function convertRelativeWidthsIntoPixelValuesTEXTGRID(cc)
{
for (var i=0; i < cc.CASA_colHeaders.length; i++)
{
if(!checkIfStringEndsWith(cc.CASA_colHeaders[i].width, "%")) continue;
var col = findColumnTEXTGRID(cc, i);
col.width = col.offsetWidth;
cc.CASA_colHeaders[i].width = col.width;
}
}
function startResizeTEXTGRID(cc,evt)
{
calculatePageOffset(cc);
cc.CASA_posY = cc.CASA_pageoffsettop;
cc.CASA_posX1 = cc.CASA_pageoffsetleft;
cc.CASA_posX2 = cc.CASA_posX1 + cc.offsetWidth;
cc.CASA_posXEvent = evt.clientX;
parent.m_dragId = cc.CASA_id;
parent.m_dragType = "RESIZABLE";
parent.m_dragRsizable = cc;
m_dragColIndexTEXTGRID = findColumnIndex(cc,evt);
if (m_dragColIndexTEXTGRID == null) return;
convertRelativeWidthsIntoPixelValuesTEXTGRID(cc);
var onmouseup = "onmouseup='reactOnMouseUp"+cc.CASA_id+"(event);'";
var vHTML = [];
vHTML.push("<table cellspacing=0 cellpadding=0 class='VSPLITLineDragTable' style='position: absolute; top: 0; left: -150px; z-index: 1000;' "+onmouseup+"> ");
vHTML.push("<tr>");
vHTML.push("<td>");
vHTML.push("<div style='margin:0 150px 0 150px; height: "+C_adjustUnits(cc.parentNode.offsetHeight)+"' class='VSPLITLineDrag'>");
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
vHTML.push("</table>");
parent.startDrag(vHTML.join(""), evt);
}
var m_finishResizeTimeoutIdTEXTGRID;
var m_finishResizeCCTEXTGRID;
var m_finishResizeWidthTEXTGRID;
function finishResizeTEXTGRID(cc,evt)
{
if (parent.m_dragMode != true) return true;
if (parent.m_dragId != cc.CASA_id) return true;
parent.endDrag();
var col = findColumnTEXTGRID(cc, m_dragColIndexTEXTGRID);
if (col== null)
{
alert("No column for index "+m_dragColIndexTEXTGRID);
return;
}
var vWidth;
if(m_direction == "rtl")
vWidth =  cc.CASA_posXEvent - evt.clientX + col.offsetWidth;
else
{
calculatePageOffset(col);
vWidth =  evt.clientX - col.CASA_pageoffsetleft;
}
var timeout = 300;
try { if (col.offsetWidth-vWidth > 8) timeout = 0; } catch(e) {}
if (vWidth <= 20) vWidth = 20;
col.width = vWidth;
var div = col.firstChild;
div.style.width = C_adjustUnits(vWidth);
var innerWidth = CL().findInnerWidth(col);
if (innerWidth > col.width)
col.width = innerWidth;
m_finishResizeCCTEXTGRID = cc;
m_finishResizeWidthTEXTGRID = col.width;
m_finishResizeTimeoutIdTEXTGRID = window.setTimeout("finishResizeExecuteTEXTGRID()",timeout);
}
function finishResizeExecuteTEXTGRID()
{
if (m_finishResizeTimeoutIdTEXTGRID == null) return;
var cc = m_finishResizeCCTEXTGRID;
if (cc == null) return;
if (cc.CASA_colHeaders == null) return;
cc.CASA_colHeaders[m_dragColIndexTEXTGRID].width = m_finishResizeWidthTEXTGRID;
CL().flushColumnInfos(self,cc,"reactOnGridColHeaderResize");
}
function startDragTEXTGRID(cc,evt)
{
if (cc.CASA_colHeaders == null ||
cc.CASA_colHeaders.length == 0)
{
return;
}
var typeOfFirst = cc.CASA_colHeaders[0].type;
for (var i = 0; i < cc.CASA_colHeaders.length; i++)
{
if (cc.CASA_colHeaders[i].type != typeOfFirst)
return;
}
var colIndex = findColumnIndex(cc, evt);
m_dragIdTEXTGRID = cc.CASA_id;
m_dragColIndexTEXTGRID = colIndex;
convertRelativeWidthsIntoPixelValuesTEXTGRID(cc);
calculatePageOffset(cc);
var col = parent.gebid("TG"+cc.CASA_id+"COL"+colIndex);
col.CASA_posY = cc.CASA_pageoffsettop;
col.CASA_posX1 = cc.CASA_pageoffsetleft;
col.CASA_posX2 = cc.CASA_pageoffsetleft + cc.offsetWidth;
col.CASA_posXEvent = evt.clientX;
col.CASA_colIndex = colIndex;
parent.m_dragRsizable = col;
parent.m_dragId = col.CASA_id;
parent.m_dragType = "COLMOVE";
var onmouseup = "onmouseup='reactOnMouseUp"+cc.CASA_id+"(event);'";
var vHTML = [];
vHTML.push("<table style='cursor: move;position: absolute; top: -50px; left: -50px; z-index: 1000;' "+onmouseup+"> ");
vHTML.push("<tr>");
vHTML.push("<td>");
vHTML.push("<div style='margin:65px 0 50px 50px;'>");
var vwidth = col.offsetWidth;
vHTML.push("<table border='1' width='"+C_adjustUnits(vwidth)+"' bordercolor='#C0C0C0' cellspacing=0 style='border-collapse:collapse;background-color:#FFFFFF'>");
if (cc.CASA_withtitlerow != "false")
{
vHTML.push("<tr>");
vHTML.push("<td class='TEXTGRIDCellHeader' valign='middle'>");
vHTML.push(cc.CASA_colHeaders[colIndex].name);
vHTML.push("</td>");
vHTML.push("</tr>");
}
var rc = getPropertyValue(cc.CASA_rowcountprop);
for(var iii = 0; iii < rc; iii++)
{
var vRowStyle;
if (iii%2 == 1) vRowStyle = "TEXTGRID"+cc.CASA_stylevariant+"CellContentDark";
else vRowStyle = "TEXTGRID"+cc.CASA_stylevariant+"CellContent";
var vRowStyle2 = "";
if (iii%2 == 0 && cc.CASA_evenrowstyle != null) vRowStyle2 = cc.CASA_evenrowstyle;
if (iii%2 == 1 && cc.CASA_oddrowstyle  != null) vRowStyle2 = cc.CASA_oddrowstyle;
vHTML.push("<tr style=\""+vRowStyle2+"\" class=\""+vRowStyle+"\"><td>");
vHTML.push("&nbsp;");
vHTML.push("</td></tr>");
}
vHTML.push("</table>");
vHTML.push("</div>");
vHTML.push("</td>");
vHTML.push("</tr>");
vHTML.push("</table>");
parent.m_dragType = "COLMOVE";
parent.startDrag(vHTML.join(""),evt);
}
function findColumnIndex(cc, evt)
{
var vCounter = 0;
var colIndex;
while (true)
{
var td = parent.gebid("TG"+cc.CASA_id+"COL"+vCounter);
if (td == null) break;
calculatePageOffset(td);
var left = td.CASA_pageoffsetleft;
if (left < evt.clientX && ((left+td.offsetWidth) >= evt.clientX))
{
colIndex = vCounter;
break;
}
vCounter++;
}
return colIndex;
}
function findColumnTEXTGRID(cc, colIndex)
{
var td = parent.gebid("TG"+cc.CASA_id+"COL"+colIndex);
return td;
}
var mm_reactOnMouseUpTEXTGRID = null;
function reactOnMouseUpTEXTGRID(cc,evt)
{
try { if (evt.currentTarget.id.substr(0,11) == "TEXTGRIDDIV") return false; } catch(eexxcc) {}
if (evt.button == "2")
{
evt.returnValue = false;
evt.stopPropagation();
var srcElm = findSrcElement(evt);
if (srcElm != null && srcElm.tagName == "DIV")
return;
parent.CASA_event = evt;
parent.CASA_supressXYContextMenu = true;
calculateContextMenuRequestPositionTEXTGRID(cc);
flushColumnInfoTEXTGRID(cc,evt,"reactOnGridColHeaderContextMenuRequest");
}
else if (parent.m_dragType == "RESIZABLE")
{
finishResizeTEXTGRID(cc,evt);
}
else if (parent.m_dragMode == true)
{
if (mm_reactOnMouseUpTEXTGRID == null) mm_reactOnMouseUpTEXTGRID = CL().C_reactOnMouseUpTEXTGRID;
return mm_reactOnMouseUpTEXTGRID.call(this,cc,evt);
}
else
{
if (cc.CASA_personalizable == "false") return true;
if (cc.CASA_disablecolumnresizing == true) return true;
if (cc.CASA_disablecolumnmoving == true) return true;
var targetIndex = this.findColumnIndex(cc, evt);
var colObject = cc.CASA_colHeaders[targetIndex];
if(colObject.withsorticon == "false") return true;
var sortprop = colObject.property;
if (sortprop == null) sortprop = colObject.imageprop;
if (sortprop == null) return;
if (sortprop.indexOf("NOSORT") > 0)	return;
CL().C_startSortTimerTEXTGRID(this,cc,sortprop);
}
}
function invokeSortTEXTGRID(pCC,colProperty)
{
if (pCC.CASA_personalizable != "true") return;
if (colProperty == null) return;
var len = colProperty.length;
if (len > 6 && colProperty.substring(len-6, len) == "NOSORT") return;
for (var i=0; i<pCC.CASA_colinfos.length; i++)
{
if ((pCC.CASA_colinfos[i].property == colProperty ||
pCC.CASA_colinfos[i].imageprop == colProperty) &&
pCC.CASA_colinfos[i].withsorticon == "false")
{
addLogMessage("TEXTGID - suppress sorting for column \""+colProperty+"\"! Flag withsorticon is set to false.");
return;
}
}
setPropertyValue(pCC.CASA_sortprop+".sortProperty",colProperty);
invokeMethodInModel(pCC.CASA_sortprop+".onSort");
}
function reactOnResizeMozTEXTGRID(pCC,outerdiv)
{
if ( pCC != null ) pCC.CASA_bufferedchangeindex = null;
var vHeight = outerdiv.parentNode.offsetHeight;
if (vHeight != 0)
{
outerdiv.style.height = C_adjustUnits(vHeight);
reactOnResizeTEXTGRID(pCC,outerdiv);
}
else
{
outerdiv.style.height = "100%";
}
}
function reactOnResizeTEXTGRID(pCC,outerdiv)
{
return reactOnResizeTEXTGRIDExecute(pCC,outerdiv,false);
}
function reactOnResizeTEXTGRIDExecute(pCC,outerdiv,inanycase)
{
try
{
if (pCC.CASA_rowcount == null || pCC.CASA_rowcount <= 0) return;
if (pCC.CASA_height == null) return;
if (outerdiv.clientHeight == 0) return;
if (checkIfPageIsDeactivated() == true) return;
var visiblerows = pCC.CASA_rowcount;
pCC.CASA_bufferedchangeindex = null;
pCC.style.display = "none";
pCC.style.display = "";
pCC.CASA_previousheight = outerdiv.clientHeight;
var iRow;
var iTops = 0;
var vCurrentOffset = 0;
for (iRow=0; iRow<pCC.CASA_rowcount;iRow++)
{
vRowId = "TGROW"+pCC.CASA_id+"_"+iRow;
var trObject = parent.document.getElementById(vRowId);
if (trObject == null)
{
vEmptyRowId = "TGEMPTYROW"+pCC.CASA_id+"_"+iRow;
trObject = parent.document.getElementById(vEmptyRowId);
}
if(trObject == null)
{
var vHeight = determineRowHeightTEXTGRID(pCC);
if(vHeight > 0)
{
for (var jRow=0; jRow<pCC.CASA_rowcount-iRow;jRow++)
{
vCurrentOffset += vHeight;
if (vCurrentOffset > outerdiv.clientHeight)
{
visiblerows = jRow+iRow;
break;
}
}
}
break;
}
iTops += trObject.offsetTop;
vCurrentOffset = trObject.offsetTop+trObject.offsetHeight;
if (vCurrentOffset > outerdiv.clientHeight)
{
visiblerows = iRow;
break;
}
}
if (iTops == 0)
return;
var vNowRowCount = getPropertyValue(pCC.CASA_rowcountprop);
if (vNowRowCount == null) return;
var vNowRowCount = vNowRowCount * (-1) * (-1);
if (vNowRowCount != visiblerows && visiblerows > 0)
{
setPropertyValue(pCC.CASA_rowcountprop,visiblerows);
try
{
var intID = 10000 + pCC.CASA_id * (-1) * (-1);
if(parent.gebid("VSCROLL_"+intID) == null || inanycase == false)
{
updateTopIndexTEXTGRID(pCC.CASA_vscrollbar, visiblerows, inanycase);
reactOnModelUpdateVSCROLLBAR(pCC.CASA_vscrollbar,null);
}
if (pCC.CASA_pageDownIconId != null)
{
var bufferedVal = getPropertyValue(pCC.CASA_griddataprop+".onPageDownVis");
var maxIndex = getPropertyValue(pCC.CASA_griddataprop+".size");
setPropertyValue(pCC.CASA_griddataprop+".onPageDownVis",maxIndex > visiblerows,true);
var mn = "romu"+pCC.CASA_pageDownIconId;
parent[mn]();
mn = "romu"+pCC.CASA_lastPageIconId;
parent[mn]();
setPropertyValue(pCC.CASA_griddataprop+".onPageDownVis",bufferedVal,true);
}
}
catch (eexxcc) {}
if (vNowRowCount < visiblerows)
{
resetCheckIO();
submitModel();
}
}
}
catch (eexxcc)
{
}
}
function updateTopIndexTEXTGRID(pScrollCC, pVisibleRows, inanycase)
{
if(inanycase == true) return;
if(pScrollCC == null) return;
if(pScrollCC.CASA_vscroll == "hidden") return;
var vTopIndex = getPropertyValue(pScrollCC.CASA_topindexprop)*(-1)*(-1);
var vMaxIndex = getPropertyValue(pScrollCC.CASA_maxindexprop)*(-1)*(-1);
if(vTopIndex + pVisibleRows > vMaxIndex)
{
var vNewTopIndex = vMaxIndex - pVisibleRows;
if(vNewTopIndex < 0) vNewTopIndex = 0;
if(vNewTopIndex != vTopIndex)
setPropertyValue(pScrollCC.CASA_topindexprop, vNewTopIndex);
}
}
function onContextMenuRequestROLLOVER(cc, rowIndex)
{
var vCasaCell = getCCell_TEXTGRID(cc);
setPropertyValue(cc.CASA_griddataprop+".contextMenuColName", vCasaCell);
calculateContextMenuRequestPositionTEXTGRID(cc, rowIndex)
if ((rowIndex != null) && (rowIndex != -1))
{
if (cc.CASA_singleselectcontextmenu == false)
{
var vIsSelected = false;
if (cc.CASA_selectprop != null)
vIsSelected = getPropertyValue(cc.CASA_displayitemsprop+"["+rowIndex+"]."+cc.CASA_selectprop);
if (!(vIsSelected == true || vIsSelected == "true"))
selectRowTEXTGRID(cc,rowIndex);
}
else if (cc.CASA_singleselectcontextmenu == "noselection")
{
deselectAllTEXTGRID(cc);
}
else
{
if (cc.CASA_collectionshiftselectprop == null)
{
var vSelected = getPropertyValue(cc.CASA_displayitemsprop+"["+rowIndex+"]."+cc.CASA_selectprop, false);
if (vSelected != null && (vSelected == false || vSelected == "false"))
selectRowTEXTGRID(cc,rowIndex);
}
else
{
if (cc.CASA_singleselect != true &&
!(cc.CASA_rowcount == null || cc.CASA_rowcount <= 0))
{
if (cc.CASA_selectalllinesprop != null)
this.setPropertyValue(cc.CASA_selectalllinesprop+"$FIRSTPRIO$", false);
}
deselectAllTEXTGRID(cc);
selectRowTEXTGRID(cc,rowIndex);
}
}
invokeMethodInModel(cc.CASA_arrayprop+"["+rowIndex+"].reactOnContextMenuRequest");
}
else  if (cc.CASA_oncontextmenumethod != null)
{
invokeMethodInModel(cc.CASA_oncontextmenumethod);
}
}
function getCCell_TEXTGRID(cc)
{
var vSrcElement = null;
if (parent.CASA_event != null) 	vSrcElement = parent.CASA_event.target;
while(vSrcElement != null &&
vSrcElement.id != 'TEXTGRIDDIV'+cc.CASA_id)
{
if(vSrcElement.getAttribute("CASA_cell") != null)
return vSrcElement.getAttribute("CASA_cell");
vSrcElement = vSrcElement.parentNode;
}
return "";
}
function calculateContextMenuRequestPositionTEXTGRID(cc, rowIndex)
{
if (parent.CASA_event != null)
{
var vContextMenu = findTHISCONTEXTMENU();
vContextMenu.style.display = "none";
setContextMenuXYPAGE(parent.CASA_event.clientX,parent.CASA_event.clientY);
parent.CASA_event = null;
}
}
function deselectItemTEXTGRID(pCC, index)
{
if (pCC.CASA_selectprop == null) return;
if(getSelectableTEXTGRID(pCC,pCC.CASA_displayitemsprop+"["+index+"].") == "false") return;
setPropertyValue(pCC.CASA_arrayprop+"["+index+"]."+pCC.CASA_selectprop, false);
setPropertyValue(pCC.CASA_displayitemsprop+"["+index+"]."+pCC.CASA_selectprop, false);
var vRId = "TGROW"+pCC.CASA_id+"_"+index;
var vRow = parent.document.getElementById(vRId);
var vRowFC = parent.document.getElementById(vRId+"FC");
if (vRow != null)
{
if (index%2 == 0)
vRow.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellContent";
else
vRow.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellContentDark";
if (vRowFC != null) vRowFC.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellUnselectColumn";
markRowControlsTEXTGRID(pCC,vRow,false);
}
}
function getSelectableTEXTGRID(pCC,infoPath)
{
var result = "true";
if(pCC.CASA_selectableprop != null && getPropertyValue(infoPath+pCC.CASA_selectableprop) == "false")
result = "false";
return result;
}
function selectItemsTEXTGRID(pCC, startIndex, endIndex)
{
if (pCC.CASA_selectprop == null) return;
var vRId;
var vRow;
var vRowFC;
for (var i=startIndex; i <= endIndex; i++)
{
if(getSelectableTEXTGRID(pCC,pCC.CASA_displayitemsprop+"["+i+"].") == "false") continue;
setPropertyValue(pCC.CASA_arrayprop+"["+i+"]."+pCC.CASA_selectprop, true);
setPropertyValue(pCC.CASA_displayitemsprop+"["+i+"]."+pCC.CASA_selectprop, true);
vRId = "TGROW"+pCC.CASA_id+"_"+i;
vRow = parent.document.getElementById(vRId);
vRowFC = parent.document.getElementById(vRId+"FC");
if (vRow != null)
{
vRow.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellSelectedContent";
if (vRowFC != null) vRowFC.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellSelectColumn"+pCC.m_dirStyleExt;
markRowControlsTEXTGRID(pCC,vRow,true);
}
}
}
function markRowControlsTEXTGRID(cc,pRow,pMark)
{
if (cc.CASA_fgselect != true) return;
var chnodes = [];
findAllChildNodesTEXTGRID(pRow,chnodes);
for (var j=0; j<chnodes.length; j++)
{
if (chnodes[j].style != null &&
chnodes[j].style.backgroundColor != null &&
chnodes[j].style.backgroundColor != "")
{
if (pMark == true)
chnodes[j].style.backgroundImage = "url(../HTMLBasedGUI/images/shadedbackground.gif)";
else
chnodes[j].style.backgroundImage = "";
}
}
}
function findAllChildNodesTEXTGRID(topNode,listOfNodes)
{
var cns = topNode.childNodes;
for (var i=0; i<cns.length; i++)
{
listOfNodes.push(cns[i]);
findAllChildNodesTEXTGRID(cns[i],listOfNodes);
}
}
function selectAllTEXTGRID(pCC)
{
if (pCC.CASA_selectprop == null) return;
var vRowSelected;
var vCounter = 0;
while (true)
{
vRowSelected = getPropertyValue(pCC.CASA_displayitemsprop+"["+vCounter+"]."+pCC.CASA_selectprop);
if (vRowSelected == null) break;
if(getSelectableTEXTGRID(pCC,pCC.CASA_displayitemsprop+"["+vCounter+"].") == "false")
{
vCounter++;
continue;
}
if (vRowSelected == false || vRowSelected == "false")
{
setPropertyValue(pCC.CASA_arrayprop+"["+vCounter+"]."+pCC.CASA_selectprop,"true");
setPropertyValue(pCC.CASA_displayitemsprop+"["+vCounter+"]."+pCC.CASA_selectprop,"true");
var vRowId = "TGROW"+pCC.CASA_id+"_"+vCounter;
var vRow = parent.document.getElementById(vRowId);
var vRowFC = parent.document.getElementById(vRowId+"FC");
if (vRow != null)
{
vRow.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellSelectedContent";
if (vRowFC != null) vRowFC.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellSelectColumn"+pCC.m_dirStyleExt;
markRowControlsTEXTGRID(pCC,vRow,true);
}
}
vCounter++;
}
pCC.CASA_lsi = vCounter-1;
}
function deselectAllTEXTGRID(pCC)
{
if (pCC.CASA_selectprop == null) return;
var vRowSelected;
var vCounter = 0;
while (true)
{
vRowSelected = getPropertyValue(pCC.CASA_displayitemsprop+"["+vCounter+"]."+pCC.CASA_selectprop);
if (vRowSelected == null) break;
if(getSelectableTEXTGRID(pCC,pCC.CASA_displayitemsprop+"["+vCounter+"].") == "false")
{
vCounter++;
continue;
}
if (vRowSelected == true || vRowSelected == "true")
{
setPropertyValue(pCC.CASA_arrayprop+"["+vCounter+"]."+pCC.CASA_selectprop,"false");
setPropertyValue(pCC.CASA_displayitemsprop+"["+vCounter+"]."+pCC.CASA_selectprop,"false");
var vRowId = "TGROW"+pCC.CASA_id+"_"+vCounter;
var vRow = parent.document.getElementById(vRowId);
var vRowFC = parent.document.getElementById(vRowId+"FC");
if (vRow != null)
{
if (vCounter%2 == 0)
vRow.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellContent";
else
vRow.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellContentDark";
if (vRowFC != null) vRowFC.className = "TEXTGRID"+pCC.CASA_stylevariant+"CellUnselectColumn";
markRowControlsTEXTGRID(pCC,vRow,false);
}
}
vCounter++;
}
if (pCC.CASA_collectionselectprop != null)
setPropertyValue(pCC.CASA_collectionselectprop,-1);
}
var mm_deprecatedMultiSelectionTEXTGRID = null;
function deprecatedMultiSelectionTEXTGRID(pCC, rowIndex)
{
if (mm_deprecatedMultiSelectionTEXTGRID == null) mm_deprecatedMultiSelectionTEXTGRID = CL().C_deprecatedMultiSelectionTEXTGRID;
return mm_deprecatedMultiSelectionTEXTGRID.call(this, pCC, rowIndex);
}
var mm_selectAllLinesTEXTGRID = null;
function selectAllLinesTEXTGRID(pCC)
{
if (mm_selectAllLinesTEXTGRID == null) mm_selectAllLinesTEXTGRID = CL().C_selectAllLinesTEXTGRID;
return mm_selectAllLinesTEXTGRID.call(this, this,pCC);
}
function onkey40TEXTGRID(pCC, pCCDiv, pEvent)
{
if (checkIOForNoSubmits() == false) return false;
if (pCC.CASA_keybCursor == null)
{
setKeyboardFocusTEXTGRID(pCC, 0);
return;
}
pEvent.returnValue = false;
if (pCC.CASA_topindexprop != null)
{
if (pCC.CASA_keybMaxSSS >= 0 && pCC.CASA_keybCursor >= pCC.CASA_keybMaxSSS-1) return;
var vRowCount = getPropertyValue(pCC.CASA_rowcountprop)-0;
if (pCC.CASA_keybCursor < vRowCount-1)
{
var rowIndex = pCC.CASA_keybCursor+1;
setKeyboardFocusTEXTGRID(pCC, rowIndex);
}
else
{
pCC.CASA_keybCursorReset = false;
var vFunc = new Function("parent.scrollDown"+(pCC.CASA_id-0+10000-0)+"(1);");
vFunc();
if (pCCDiv.setActive)pCCDiv.setActive();
else pCCDiv.focus();
}
}
else
{
if (pEvent.preventDefault) pEvent.preventDefault();
if (pCC.CASA_keybCursor >= pCC.CASA_keybMaxCSS) return;
var vVisisbleRows = determineVisibleRowsTEXTGRID(pCC);
var vHeight = determineRowHeightTEXTGRID(pCC);
var vScroll = Math.round(pCCDiv.scrollTop/vHeight);
if (pCC.CASA_keybCursor >= vVisisbleRows-2+vScroll-0)
pCCDiv.scrollTop += vHeight;
var rowIndex = pCC.CASA_keybCursor+1;
setKeyboardFocusTEXTGRID(pCC, rowIndex);
}
}
function onkey38TEXTGRID(pCC, pCCDiv, pEvent)
{
if (checkIOForNoSubmits() == false) return false;
if (pCC.CASA_keybCursor == null){
setKeyboardFocusTEXTGRID(pCC, 0);
return;
}
pEvent.returnValue = false;
if (pCC.CASA_topindexprop != null)
{
if (pCC.CASA_keybCursor > 0)
{
var rowIndex = pCC.CASA_keybCursor-1;
setKeyboardFocusTEXTGRID(pCC, rowIndex);
}
else
{
var vTopIndex = getPropertyValue(pCC.CASA_topindexprop)-0;
if (vTopIndex == 0) return;
pCC.CASA_keybCursorReset = false;
var vFunc = new Function("parent.scrollUp"+(pCC.CASA_id-0+10000-0)+"(1);");
vFunc();
if (pCCDiv.setActive)pCCDiv.setActive();
else pCCDiv.focus();
}
}
else
{
if (pEvent.preventDefault) pEvent.preventDefault();
if (pCC.CASA_keybCursor == 0 && pCCDiv.scrollTop != 0) pCCDiv.scrollTop = 0;
if (pCC.CASA_keybCursor == 0) return;
var vHeight = determineRowHeightTEXTGRID(pCC);
var vScroll = Math.round(pCCDiv.scrollTop/vHeight);
if (pCC.CASA_keybCursor <= vScroll)
pCCDiv.scrollTop -= vHeight;
var rowIndex = pCC.CASA_keybCursor-1;
setKeyboardFocusTEXTGRID(pCC, rowIndex);
}
}
function onkey32TEXTGRID(pCC, pEvent)
{
if (checkIOForNoSubmits() == false) return false;
if (pCC.CASA_keybCursor == null) return;
pEvent.returnValue = false;
if ( pEvent.keyCode == 13 && pCC.CASA_ondblclickmethod != null && pCC.CASA_dblclickonreturn == true)
{
pCC.CASA_keybCursorReset = false;
reactOnDblClickTEXTGRID(pCC, pCC.CASA_keybCursor);
return;
}
pCC.CASA_keybCursorReset = true;
var isSelected = getPropertyValue(pCC.CASA_displayitemsprop+"["+ pCC.CASA_keybCursor+"]."+pCC.CASA_selectprop);
selectRowTEXTGRID(pCC, pCC.CASA_keybCursor, pEvent.ctrlKey, pEvent.shiftKey);
if (pCC.CASA_topindexprop == null)
{
if (pEvent.preventDefault) pEvent.preventDefault();
}
if (pCC.CASA_ondblclickmethod != null && (isSelected == true|| isSelected == "true"))
{
pCC.CASA_keybCursorReset = false;
}
if (pCC.CASA_onclickmethod != null)
{
pCC.CASA_keybCursorReset = false;
invokeMethodInModel(pCC.CASA_onclickmethod);
}
}
function onkey33TEXTGRID(pCC, pCCDiv, pEvent)
{
if (checkIOForNoSubmits() == false) return false;
var vVisibleRows = determineVisibleRowsTEXTGRID(pCC);
if (pCC.CASA_keybCursor == null)  setKeyboardFocusTEXTGRID(pCC, 0);
pEvent.returnValue = false;
if (pCC.CASA_topindexprop != null)
{
pCC.CASA_keybCursorReset = false;
var vFunc = new Function("parent.scrollPageUp"+(pCC.CASA_id-0+10000-0)+"();");
vFunc();
if (pCCDiv.setActive)pCCDiv.setActive();
else pCCDiv.focus();
}
else
{
if (pEvent.preventDefault) pEvent.preventDefault();
var vHeight = determineRowHeightTEXTGRID(pCC);
pCCDiv.scrollTop -= vHeight*vVisibleRows;
var rowIndex = pCC.CASA_keybCursor - vVisibleRows;
if (rowIndex < 0)
rowIndex = 0;
setKeyboardFocusTEXTGRID(pCC, rowIndex);
}
}
function onkey34TEXTGRID(pCC, pCCDiv, pEvent)
{
if (checkIOForNoSubmits() == false) return false;
var vVisibleRows = determineVisibleRowsTEXTGRID(pCC);
if (pCC.CASA_keybCursor == null)  setKeyboardFocusTEXTGRID(pCC, 0);
pEvent.returnValue = false;
if (pCC.CASA_topindexprop != null)
{
pCC.CASA_keybCursorReset = false;
var vFunc = new Function("parent.scrollPageDown"+(pCC.CASA_id-0+10000-0)+"();");
vFunc();
if (pCCDiv.setActive)pCCDiv.setActive();
else pCCDiv.focus();
}
else
{
if (pEvent.preventDefault) pEvent.preventDefault();
var selectedprop = pCC.CASA_displayitemsprop+"["+pCC.CASA_keybCursor+"]."+pCC.CASA_selectprop;
var rowId = "TGROW"+pCC.CASA_id+"_"+pCC.CASA_keybCursor;
var row = parent.gebid(rowId);
leaveRowTEXTGRID(row,selectedprop,pCC.CASA_keybCursor,pCC.CASA_stylevariant);
var vHeight = determineRowHeightTEXTGRID(pCC);
pCCDiv.scrollTop += vHeight*vVisibleRows;
var rowIndex = pCC.CASA_keybCursor + vVisibleRows;
if (rowIndex > pCC.CASA_keybMaxCSS)
rowIndex = pCC.CASA_keybMaxCSS;
setKeyboardFocusTEXTGRID(pCC, rowIndex);
}
}
function determineVisibleRowsTEXTGRID(pCC)
{
var vOuterDiv = parent.document.getElementById('TEXTGRIDDIV'+pCC.CASA_id);
var vCounter = 0;
while (true)
{
vRowId = "TGROW"+pCC.CASA_id+"_"+vCounter;
var trObject = parent.document.getElementById(vRowId);
if (trObject == null)
{
vEmptyRowId = "TGEMPTYROW"+pCC.CASA_id+"_"+vCounter;
trObject = parent.document.getElementById(vEmptyRowId);
}
if (trObject == null)
break;
if (trObject.offsetTop > vOuterDiv.clientHeight)
break;
vCounter++;
}
return vCounter-1;
}
function determineRowHeightTEXTGRID(pCC)
{
var trObject = parent.document.getElementById("TGROW"+pCC.CASA_id+"_0");
if (trObject == null)
{
vEmptyRowId = "TGEMPTYROW"+pCC.CASA_id+"_0";
trObject = parent.document.getElementById(vEmptyRowId);
}
if (trObject == null) return -1;
return trObject.clientHeight-0+1-0;
}
function setKeyboardFocusTEXTGRID(cc, rowIndex)
{
if (cc.CASA_keybCursor != null)
{
var index = cc.CASA_keybCursor;
cc.CASA_keybCursor = null;
var selectedprop = cc.CASA_displayitemsprop+"["+index+"]."+cc.CASA_selectprop;
var rowId = "TGROW"+cc.CASA_id+"_"+index;
var row = parent.gebid(rowId);
leaveRowTEXTGRID(row,selectedprop,index,cc.CASA_stylevariant);
}
cc.CASA_keybCursor = rowIndex;
if (cc.CASA_keybCursor != null)
{
var rowId = "TGROW"+cc.CASA_id+"_"+cc.CASA_keybCursor;
var vRow = parent.gebid(rowId);
if (enterRowTEXTGRID(vRow,"") == false)
{
try{vRow.focus();}catch(exxfocus){}
setTimeout(function(){enterRowTEXTGRID(vRow,"")},10);
}
if (parent.document.querySelector){
var focused = parent.document.querySelector(":focus");
if ( focused == null )
try{
if ( cc.parentNode.setActive )
cc.parentNode.setActive();
else
cc.parentNode.focus();
} catch (ae){};
}
}
else
{
var focused = parent.document.activeElement;
if (!focused || focused == parent.document.body)
focused = null;
else if (parent.document.querySelector)
focused = parent.document.querySelector(":focus");
if (focused == null && cc.parentNode.setActive)
{
try { cc.parentNode.setActive (); } catch (ae){};
}
}
}
function reactonfocusTEXTGRID(ccId, rowIndex)
{
var cc = parent.gebid("TEXTGRID"+ccId);
if (rowIndex != cc.CASA_keybCursor) return;
var vRow = findSrcElement(parent.event);
var vSelected = getPropertyValue(cc.CASA_displayitemsprop+"["+rowIndex+"]."+cc.CASA_selectprop);
if (vSelected == false || vSelected == 'false')
vRow.className = "TEXTGRID"+cc.CASA_stylevariant+"CellRolloverContent";
}
function invokeMethodInModelTEXTGRID(method)
{
parent.m_blockIOByFlush = true;
invokeMethodInModel(method);
}
var m_timeoutIdTEXTGRID = null;
function reactOnClickTEXTGRID(cc, rowIndex)
{
if (rowIndex == -1) return;
if (cc.CASA_ondblclickmethod != null)
m_timeoutIdTEXTGRID = window.setTimeout("reactOnClickExecuteTEXTGRID('"+cc.CASA_onclickmethod+"')",300);
else
invokeMethodInModel(cc.CASA_onclickmethod);
}
function reactOnClickExecuteTEXTGRID(method)
{
if (m_timeoutIdTEXTGRID == null)
return;
invokeMethodInModel(method);
}
function reactOnDblClickTEXTGRID(cc, rowIndex)
{
if (rowIndex == -1) return;
m_timeoutIdTEXTGRID = null;
deselectAllTEXTGRID(cc);
selectRowTEXTGRID(cc,rowIndex);
invokeMethodInModel(cc.CASA_ondblclickmethod);
}
function checkIfStringEndsWith(instring, searchstring)
{
if (instring == null || searchstring == null) return false;
var index = instring.indexOf(searchstring);
if (index == -1) return false;
return (index-0+searchstring.length) == instring.length;
}
function reactOnDoubleClickHeaderTEXTGRID(cc,evt)
{
flushColumnInfoTEXTGRID(cc,evt,"reactOnGridColHeaderDoubleClick");
}
function flushColumnInfoTEXTGRID(cc,evt,methodname)
{
m_finishResizeTimeoutIdTEXTGRID = null;
CL().C_stopSortTimerTEXTGRID();
if (cc.CASA_colHeaders == null) return;
var targetIndex = findColumnIndex(cc, evt);
var colObject = cc.CASA_colHeaders[targetIndex];
if (colObject == null) return;
var colProp = colObject.property;
if (colProp == null) colProp = colObject.imageprop;
if (colProp == null) return;
setPropertyValue(cc.CASA_griddataprop+".param1", colProp);
convertRelativeWidthsIntoPixelValuesTEXTGRID(cc);
CL().flushColumnInfos(this,cc,methodname);
}
function presetDefaultWidthTEXTGRID(pWidth)
{
if (pWidth == null) pWidth = "0%";
return pWidth;
}
