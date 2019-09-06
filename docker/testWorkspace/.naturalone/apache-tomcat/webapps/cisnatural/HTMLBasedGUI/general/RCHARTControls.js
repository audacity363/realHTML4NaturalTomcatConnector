function addVersionInfoRCHARTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('RCHARTCONTROLS');
}
var m_pluginRegistered = false;
function iccRCHART(cc,romumethod,labels,labelsprop,valueprop,charttype,charttypeprop,selectedlabelprop,changeindexprop,stackedxaxis,stackedyaxis,
xaxisscalelabel,yaxisscalelabel,xaxisbarthickness,xaxisbarpercentage,xaxiscategorypercentage,yaxisbarthickness,showlines,
showvalueinchart,showvaluefontfamily,showvaluefontsize,showvaluefontstyle,showvaluefontcolor,showvaluepos,showtooltip)
{
if (romumethod != null) registerListener(romumethod);
cc.CASA_valueprop = valueprop;
if ( labelsprop != null ) cc.CASA_labelsprop = labelsprop;
if ( charttype != null ) cc.CASA_charttype = charttype;
if ( charttypeprop != null ) cc.CASA_charttypeprop = charttypeprop;
if (selectedlabelprop != null ) cc.CASA_selectedlabelprop = selectedlabelprop;
cc.CASA_changeindexprop = changeindexprop;
cc.CASA_lastchangeindex = -1;
cc.CASA_lastcharttype = null;
if (stackedxaxis != null ) cc.CASA_stackedxaxis = stackedxaxis;
if (stackedyaxis != null ) cc.CASA_stackedyaxis = stackedyaxis;
if (xaxisbarthickness != null ) cc.CASA_xaxisbarthickness = xaxisbarthickness;
if (xaxisbarpercentage != null ) cc.CASA_xaxisbarpercentage = xaxisbarpercentage;
if (xaxiscategorypercentage != null ) cc.CASA_xaxiscategorypercentage = xaxiscategorypercentage;
if (yaxisbarthickness != null ) cc.CASA_yaxisbarthickness = yaxisbarthickness;
if (showlines != null ) cc.CASA_showlines = showlines;
if (showvalueinchart != null ) cc.CASA_showvalueinchart = showvalueinchart;
if (showtooltip != null ) cc.CASA_showtooltip = showtooltip;
if (xaxisscalelabel != null)
{
cc.CASA_xaxisscalelabel = new Object();
cc.CASA_xaxisscalelabel.value = xaxisscalelabel;
addMLValue(cc.CASA_xaxisscalelabel);
}
if (yaxisscalelabel != null)
{
cc.CASA_yaxisscalelabel = new Object();
cc.CASA_yaxisscalelabel.value = yaxisscalelabel;
addMLValue(cc.CASA_yaxisscalelabel);
}
if (labels != null)
{
cc.CASA_labels = new Object();
cc.CASA_labels.value = labels;
addMLValue(cc.CASA_labels);
}
cc.onclick = function(evt) {
var elements = cc.CASA_chart.getElementAtEvent(evt);
try{
if ( cc.CASA_selectedlabelprop != null )
setPropertyValue (cc.CASA_selectedlabelprop, cc.CASA_chart.data.labels[elements[0]._index]);
if ( cc.CASA_colinfos[elements[0]._datasetIndex].onclickmethod != undefined )
invokeMethodInModel(cc.CASA_valueprop + "." + cc.CASA_colinfos[elements[0]._datasetIndex].onclickmethod);
}
catch (e){}
}
parent.iccGlobalChartConfig();
parent.iccRchartOptions();
if ( cc.CASA_showvalueinchart != undefined && cc.CASA_showvalueinchart.toLowerCase() == "true" ) {
if ( showvaluepos != null ) cc.CASA_showvaluepos = showvaluepos;
else cc.CASA_showvaluepos = "inside";
if ( showvaluefontfamily != null ) cc.CASA_showvaluefontfamily = showvaluefontfamily;
else cc.CASA_showvaluefontfamily = parent.Chart.defaults.global.defaultFontFamily;
if (showvaluefontstyle != null) cc.CASA_showvaluefontstyle=showvaluefontstyle;
else cc.CASA_showvaluefontstyle='normal';
if (showvaluefontsize != null) cc.CASA_showvaluefontsize = showvaluefontsize;
else cc.CASA_showvaluefontsize = '16';
if ( showvaluefontcolor != null) cc.CASA_showvaluefontcolor = showvaluefontcolor;
else cc.CASA_showvaluefontcolor = '#666';
if ( m_pluginRegistered == false ) {
registerShowValuePlugin();
m_pluginRegistered = true;
}
}
}
function iccRPIECHART(cc,romumethod,labels,labelsprop,data,dataprop,datavisibleprop,selectedlabelprop,changeindexprop,onclickmethod,backgroundcolor,backgroundcolorprop,
borderwidth,borderwidthprop,bordercolor,bordercolorprop,hoverbackgroundcolor,hoverbackgroundcolorprop,
hoverborderwidth, hoverborderwidthprop,hoverbordercolor,hoverbordercolorprop,charttype,charttypeprop,
cutoutpercentage,cutoutpercentageprop,rotation,rotationprop,circumference,circumferenceprop,
animaterotate,animaterotateprop,animatescale,animatescaleprop,legendclickmethod,showvalueinchart,
showvaluefontfamily,showvaluefontsize,showvaluefontstyle,showvaluefontcolor,showpercentage,showtooltip)
{
if (romumethod != null) registerListener(romumethod);
if (data != null) cc.CASA_data = data;
if (dataprop != null ) cc.CASA_dataprop = dataprop;
if (datavisibleprop != null) cc.CASA_datavisibleprop = datavisibleprop;
if (labelsprop != null) {
cc.CASA_labelsprop = labelsprop;
registerPropertyListener(romumethod, cc.CASA_labelsprop, cc.id);
}
if (selectedlabelprop != null) cc.CASA_selectedlabelprop = selectedlabelprop;
if (changeindexprop != null) cc.CASA_changeindexprop = changeindexprop;
if (backgroundcolor != null )cc.CASA_backgroundcolor = backgroundcolor;
if (backgroundcolorprop != null ) {
cc.CASA_backgroundcolorprop = backgroundcolorprop;
registerPropertyListener(romumethod, cc.CASA_backgroundcolorprop, cc.id);
}
if (onclickmethod != null )cc.CASA_onclickmethod = onclickmethod;
if (borderwidth != null )cc.CASA_borderwidth = borderwidth;
if (borderwidthprop != null ) {
cc.CASA_borderwidthprop = borderwidthprop;
registerPropertyListener(romumethod, cc.CASA_borderwidthprop, cc.id);
}
if (bordercolor != null )cc.CASA_bordercolor = bordercolor;
if (bordercolorprop != null ) {
cc.CASA_bordercolorprop = bordercolorprop;
registerPropertyListener(romumethod, cc.CASA_bordercolorprop, cc.id);
}
if (hoverbackgroundcolor != null )cc.CASA_hoverbackgroundcolor = hoverbackgroundcolor;
if (hoverbackgroundcolorprop != null ) {
cc.CASA_hoverbackgroundcolorprop = hoverbackgroundcolorprop;
registerPropertyListener(romumethod, cc.CASA_hoverbackgroundcolorprop, cc.id);
}
if (hoverborderwidth != null )cc.CASA_hoverborderwidth = hoverborderwidth;
if (hoverborderwidthprop != null ) {
cc.CASA_hoverborderwidthprop = hoverborderwidthprop;
registerPropertyListener(romumethod, cc.CASA_hoverborderwidthprop, cc.id);
}
if (hoverbordercolor != null )cc.CASA_hoverbordercolor = hoverbordercolor;
if (hoverbordercolorprop != null ) {
cc.CASA_hoverbordercolorprop = hoverbordercolorprop;
registerPropertyListener(romumethod, cc.CASA_hoverbordercolorprop, cc.id);
}
if (charttype != null )cc.CASA_charttype = charttype;
if (charttypeprop != null ) {
cc.CASA_charttypeprop = charttypeprop;
registerPropertyListener(romumethod, cc.CASA_charttypeprop, cc.id);
}
if (cutoutpercentage != null )cc.CASA_cutoutpercentage = cutoutpercentage;
if (cutoutpercentageprop != null ) {
cc.CASA_cutoutpercentageprop = cutoutpercentageprop;
registerPropertyListener(romumethod, cc.CASA_cutoutpercentageprop, cc.id);
}
if (rotation != null )cc.CASA_rotation = rotation;
if (rotationprop != null ) {
cc.CASA_rotationprop = rotationprop;
registerPropertyListener(romumethod, cc.CASA_rotationprop, cc.id);
}
if (circumference != null )cc.CASA_circumference = circumference;
if (circumferenceprop != null ) {
cc.CASA_circumferenceprop = circumferenceprop;
registerPropertyListener(romumethod, cc.CASA_circumferenceprop, cc.id);
}
if (animaterotate != null )cc.CASA_animaterotate = animaterotate;
if (animaterotateprop != null )cc.CASA_animaterotateprop = animaterotateprop;
if (animatescale != null )cc.CASA_animatescale = animatescale;
if (animatescaleprop != null )cc.CASA_animatescaleprop = animatescaleprop;
if (legendclickmethod != null )cc.CASA_legendclickmethod = legendclickmethod;
if (showvalueinchart != null ) cc.CASA_showvalueinchart = showvalueinchart;
if (showtooltip != null ) cc.CASA_showtooltip = showtooltip;
if (showpercentage != null ) cc.CASA_showpercentage = showpercentage;
cc.CASA_lastchangeindex = -1;
cc.CASA_chart = null;
cc.CASA_lastcharttype = null;
if (labels != null)
{
cc.CASA_labels = new Object();
cc.CASA_labels.value = labels;
addMLValue(cc.CASA_label);
}
if ( selectedlabelprop != null || onclickmethod != null ) {
cc.onclick = function(evt) {
var elements = cc.CASA_chart.getElementAtEvent(evt);
try{
if ( cc.CASA_selectedlabelprop != undefined )
setPropertyValue (cc.CASA_selectedlabelprop, elements[0]._model.label);
if ( cc.CASA_onclickmethod != undefined )
invokeMethodInModel(cc.CASA_onclickmethod);
}
catch (e){}
}
}
parent.iccGlobalChartConfig();
parent.iccRpieOptions();
if ( (cc.CASA_showvalueinchart != undefined && cc.CASA_showvalueinchart.toLowerCase() == "true") ||
(cc.CASA_showpercentage != undefined && cc.CASA_showpercentage.toLowerCase() == "true")) {
if ( showvaluefontfamily != null ) cc.CASA_showvaluefontfamily = showvaluefontfamily;
else cc.CASA_showvaluefontfamily = parent.Chart.defaults.global.defaultFontFamily;
if (showvaluefontstyle != null) cc.CASA_showvaluefontstyle=showvaluefontstyle;
else cc.CASA_showvaluefontstyle='normal';
if (showvaluefontsize != null) cc.CASA_showvaluefontsize = showvaluefontsize;
else cc.CASA_showvaluefontsize = '16';
if ( showvaluefontcolor != null) cc.CASA_showvaluefontcolor = showvaluefontcolor;
else cc.CASA_showvaluefontcolor = '#666';
if ( m_pluginRegistered == false ) {
registerShowValuePlugin();
m_pluginRegistered = true;
}
}
}
function romuRPIECHART(cc)
{
parent.window.requestAnimationFrame(function(timestamp){doRomuRPIE(cc);});
}
function doRomuRPIE(cc)
{
var theChartType = "pie";
if ( cc.CASA_charttype != undefined ) theChartType = cc.CASA_charttype;
if ( cc.CASA_charttypeprop != undefined )
theChartType = getPropertyValue(cc.CASA_charttypeprop);
if ( theChartType != "pie" && theChartType != "doughnut" ) theChartType = "pie";
if ( cc.CASA_chart != null && cc.CASA_lastcharttype != theChartType ) cc.CASA_lastchangeindex = -1;
if ( cc.CASA_changeindexprop != undefined ) {
var chvalue = getPropertyValue(cc.CASA_changeindexprop);
if ( cc.CASA_chart != null && chvalue == cc.CASA_lastchangeindex ) return;
cc.CASA_lastchangeindex = chvalue;
}
var theLabels = "";
if (cc.CASA_labels != undefined ) theLabels = cc.CASA_labels.value.split(";");
if (cc.CASA_labelsprop != undefined) theLabels = getPropertyValue(cc.CASA_labelsprop).split(";");
var theDataset = new Object();
if (cc.CASA_data != undefined ) theDataset.data = cc.CASA_data.split(";");
if (cc.CASA_dataprop != undefined) theDataset.data = getPropertyValue(cc.CASA_dataprop).split(";");
if ( cc.CASA_backgroundcolor != undefined ) theDataset.backgroundColor = cc.CASA_backgroundcolor.split(";");
if ( cc.CASA_backgroundcolorprop != undefined ) theDataset.backgroundColor = getPropertyValue(cc.CASA_backgroundcolorprop).split(";");
if ( cc.CASA_borderwidth != undefined ) theDataset.borderWidth = cc.CASA_borderwidth.split(";");
if ( cc.CASA_borderwidthprop != undefined ) theDataset.borderWidth = getPropertyValue(cc.CASA_borderwidthprop).split(";");
if ( cc.CASA_bordercolor != undefined ) theDataset.borderColor = cc.CASA_bordercolor.split(";");
if ( cc.CASA_bordercolorprop != undefined ) theDataset.borderColor = getPropertyValue(cc.CASA_bordercolorprop).split(";");
if ( cc.CASA_hoverbackgroundcolor != undefined ) theDataset.hoverBackgroundColor = cc.CASA_hoverbackgroundcolor.split(";");
if ( cc.CASA_hoverbackgroundcolorprop != undefined ) theDataset.hoverBackgroundColor = getPropertyValue(cc.CASA_hoverbackgroundcolorprop).split(";");
if ( cc.CASA_hoverborderwidth != undefined ) theDataset.hoverBorderWidth = cc.CASA_hoverborderwidth.split(";");
if ( cc.CASA_hoverborderwidthprop != undefined ) theDataset.hoverBorderWidth = getPropertyValue(cc.CASA_hoverborderwidthprop).split(";");
if ( cc.CASA_hoverbordercolor != undefined ) theDataset.hoverBorderColor = cc.CASA_hoverbordercolor.split(";");
if ( cc.CASA_hoverbordercolorprop != undefined ) theDataset.hoverBorderColor = getPropertyValue(cc.CASA_hoverbordercolorprop).split(";");
var theChartData = new Object();
theChartData.labels = theLabels;
theChartData.datasets = [ theDataset ];
var theOptions = parent.m_rpieoptions;
if ( cc.CASA_cutoutpercentage != undefined ) theOptions.cutoutPercentage = parseInt(cc.CASA_cutoutpercentage);
if ( cc.CASA_cutoutpercentageprop != undefined ) theOptions.cutoutPercentage = parseInt(getPropertyValue(cc.CASA_cutoutpercentageprop));
if ( cc.CASA_rotation != undefined ) theOptions.rotation = parseFloat(cc.CASA_rotation);
if ( cc.CASA_rotationprop != undefined ) theOptions.rotation = parseFloat(getPropertyValue(cc.CASA_rotationprop));
if ( cc.CASA_circumference != undefined ) theOptions.circumference = parseFloat(cc.CASA_circumference);
if ( cc.CASA_circumferenceprop != undefined ) theOptions.circumference = parseFloat(getPropertyValue(cc.CASA_circumferenceprop));
if ( cc.CASA_animaterotate == "false" ) theOptions.animation.animateRotate = false;
if ( cc.CASA_animaterotateprop != undefined ) theOptions.animation.animateRotate = getPropertyValue(cc.CASA_animaterotateprop);
if ( cc.CASA_animatescale == "true" ) theOptions.animation.animateScale = true;
if ( cc.CASA_animatescaleprop != undefined ) theOptions.animation.animateScale = getPropertyValue(cc.CASA_animatescaleprop);
if ( cc.CASA_showtooltip != undefined && cc.CASA_showtooltip.toLowerCase() == "false" )
theOptions.tooltips.enabled = false;
if ( cc.CASA_chart != null ) cc.CASA_chart.destroy();
cc.CASA_lastcharttype = theChartType;
setRPIELegendClick(theOptions);
cc.CASA_chart = new parent.Chart(cc.getContext("2d"),
{
type: theChartType,
data: theChartData,
options: theOptions,
});
updPIEVisibility(cc);
}
function romuRCHART(cc)
{
parent.window.requestAnimationFrame(function(timestamp){doRomuRCHART(cc);});
}
function doRomuRCHART(cc)
{
var theChartType = 'bar';
if ( cc.CASA_charttype != undefined ) theChartType = cc.CASA_charttype;
if ( cc.CASA_charttypeprop != undefined ) theChartType = getPropertyValue(cc.CASA_charttypeprop);
if ( theChartType != 'bar' && theChartType != 'line' && theChartType != 'pie' && theChartType !='horizontalBar' ) theChartType = 'bar';
if ( cc.CASA_chart != null && cc.CASA_lastcharttype != theChartType ) cc.CASA_lastchangeindex = -1;
if ( cc.CASA_changeindexprop != null ) {
var chvalue = getPropertyValue(cc.CASA_changeindexprop);
if ( cc.CASA_chart != null && chvalue == cc.CASA_lastchangeindex ) return;
cc.CASA_lastchangeindex = chvalue;
}
var theLabels;
if ( cc.CASA_labels != undefined ) theLabels = cc.CASA_labels.value;
if ( cc.CASA_labelsprop != undefined )
{
var li = 0;
var lval;
theLabels="";
while (true) {
lval = getPropertyValue(cc.CASA_valueprop+".items["+li+"]."+cc.CASA_labelsprop);
if (lval == null || lval == "") break;
if ( li > 0 ) theLabels = theLabels + ";";
theLabels = theLabels + lval;
li++
}
}
theLabels = theLabels.split(";");
var theDatasets = [];
var col = null;
for (i = 0; i < cc.CASA_colinfos.length;i++)
{
var thedata = [];
var thevalue;
col = cc.CASA_colinfos[i];
for (j=0; j<theLabels.length; j++) {
thevalue = getPropertyValue(cc.CASA_valueprop+".items["+j+"]."+col.property);
if (thevalue == null) break;
thedata.push(thevalue);
}
var dataset = new Object();
dataset.fill = false;
if ( col.label != undefined ) dataset.label = col.label.value;
if ( col.labelprop != undefined ) dataset.label = getPropertyValue(col.labelprop);
dataset.data = thedata;
if ( col.backgroundcolor != undefined ) dataset.backgroundColor = col.backgroundcolor;
if ( col.backgroundcolorprop != undefined ) dataset.backgroundColor = getPropertyValue(col.backgroundcolorprop);
if ( col.bordercolor != undefined ) dataset.borderColor = col.bordercolor;
if ( col.bordercolorprop != undefined ) dataset.borderColor = getPropertyValue(col.bordercolorprop);
if ( col.borderwidth != undefined ) dataset.borderWidth = parseInt(col.borderwidth);
if ( col.borderwidthprop != undefined ) dataset.borderWidth = parseInt(getPropertyValue(col.borderwidthprop));
if ( theChartType == 'bar' || theChartType == 'horizontalBar' )
{
if ( col.hoverbackgroundcolor != undefined ) dataset.hoverBackgroundColor = col.hoverbackgroundcolor;
if ( col.hoverbackgroundcolorprop != undefined ) dataset.hoverBackgroundColor = getPropertyValue(col.hoverbackgroundcolorprop);
if ( col.hoverbordercolor != undefined ) dataset.hoverBorderColor = col.hoverbordercolor;
if ( col.hoverbordercolorprop != undefined ) dataset.hoverBorderColor = getPropertyValue(col.hoverbordercolorprop);
if ( col.hoverborderwidth != undefined ) dataset.hoverBorderWidth = parseInt(col.hoverborderwidth);
if ( col.hoverborderwidthprop != undefined ) dataset.hoverBorderWidth = parseInt(getPropertyValue(col.hoverborderwidthprop));
}
else if ( theChartType == 'line' )
{
if ( col.pointbordercolor != undefined ) dataset.pointBorderColor = col.pointbordercolor;
if ( col.pointbordercolorprop != undefined ) dataset.pointBorderColor = getPropertyValue(col.pointbordercolorprop);
if ( col.pointbackgroundcolor != undefined ) dataset.pointBackgroundColor = col.pointbackgroundcolor;
if ( col.pointbackgroundcolorprop != undefined ) dataset.pointBackgroundColor = getPropertyValue(col.pointbackgroundcolorprop);
if ( col.pointborderwidth != undefined ) dataset.pointBorderWidth = parseInt(col.pointborderwidth);
if ( col.pointborderwidthprop != undefined ) dataset.pointBorderWidth = parseInt(getPropertyValue(col.pointborderwidthprop));
if ( col.borderdash != undefined ) dataset.borderDash = col.borderdash.split(";");
if ( col.borderdashprop != undefined ) dataset.borderDash = getPropertyValue(col.borderdashprop).split(";");
if ( col.pointradius != undefined ) dataset.pointRadius = parseInt(col.pointradius);
if ( col.pointradiusprop != undefined ) dataset.pointRadius = parseInt(getPropertyValue(col.pointradiusprop));
if ( col.pointhoverradius != undefined ) dataset.pointHoverRadius = parseInt(col.pointhoverradius);
if ( col.pointhoverradiusprop != undefined ) dataset.pointHoverRadius = parseInt(getPropertyValue(col.pointhoverradiusprop));
if ( col.pointhitradius != undefined ) dataset.pointHitRadius = parseInt(col.pointhitradius);
if ( col.pointhitradiusprop != undefined ) dataset.pointHitRadius = parseInt(getPropertyValue(col.pointhitradiusprop));
if ( col.pointhoverbackgroundcolor != undefined ) dataset.pointHoverBackgroundColor = col.pointhoverbackgroundcolor;
if ( col.pointhoverbackgroundcolorprop != undefined ) dataset.pointHoverBackgroundColor = getPropertyValue(col.pointhoverbackgroundcolorprop);
if ( col.pointhoverbordercolor != undefined ) dataset.pointHoverBorderColor = col.pointhoverbordercolor;
if ( col.pointhoverbordercolorprop != undefined ) dataset.pointHoverBorderColor = getPropertyValue(col.pointhoverbordercolorprop);
if ( col.pointhoverborderwidth != undefined ) dataset.pointHoverBorderWidth = parseInt(col.pointhoverborderwidth);
if ( col.pointhoverborderwidthprop != undefined ) dataset.pointHoverBorderWidth = parseInt(getPropertyValue(col.pointhoverborderwidthprop));
if ( col.pointstyle != null != undefined ) dataset.pointStyle = col.pointstyle;
if ( col.pointstyleprop != null != undefined ) dataset.pointStyle = getPropertyValue(col.pointstyleprop);
if ( col.steppedline != undefined && col.steppedline == "true" ) dataset.steppedLine = true;
if ( col.steppedlineprop != undefined ) dataset.steppedLine = getPropertyValue(col.steppedlineprop);
}
theDatasets.push(dataset);
}
var theChartData =
{
labels: theLabels,
datasets: theDatasets
};
if ( cc.CASA_chart != null ) cc.CASA_chart.destroy();
cc.CASA_lastcharttype = theChartType;
var theOptions = parent.m_rchartoptions;
if (cc.CASA_xaxisscalelabel !=undefined)
theOptions.scales.xAxes[0].scaleLabel.labelString = cc.CASA_xaxisscalelabel.value;
if (cc.CASA_yaxisscalelabel != undefined)
theOptions.scales.yAxes[0].scaleLabel.labelString = cc.CASA_yaxisscalelabel.value;
if ( cc.CASA_stackedxaxis != undefined )
theOptions.scales.xAxes[0].stacked = (cc.CASA_stackedxaxis.toLowerCase() == "true");
if ( cc.CASA_stackedyaxis != undefined )
theOptions.scales.yAxes[0].stacked = (cc.CASA_stackedyaxis.toLowerCase() == "true");
if ( cc.CASA_xaxisbarthickness != undefined )
theOptions.scales.xAxes[0].barThickness = parseInt(cc.CASA_xaxisbarthickness);
if ( cc.CASA_xaxisbarpercentage != undefined )
theOptions.scales.xAxes[0].barPercentage = parseFloat(cc.CASA_xaxisbarpercentage);
if (cc.CASA_xaxiscategorypercentage != undefined)
theOptions.scales.xAxes[0].categoryPercentage = parseFloat(cc.CASA_xaxiscategorypercentage);
if ( cc.CASA_yaxisbarthickness != undefined )
theOptions.scales.yAxes[0].barThickness = parseInt(cc.CASA_yaxisbarthickness);
if ( cc.CASA_showlines != undefined  )
theOptions.showLines = (cc.CASA_showlines.toLowerCase() == "true");
if ( cc.CASA_showtooltip != undefined && cc.CASA_showtooltip.toLowerCase() == "false" )
theOptions.tooltips.enabled = false;
setRCHARTLegendClick(theOptions);
var ctx = cc.getContext("2d");
cc.CASA_chart = new parent.Chart(ctx,
{
type: theChartType,
data: theChartData,
options: theOptions,
});
updRCHARTVisibility(cc);
}
function updPIEVisibility(cc)
{
if ( cc.CASA_datavisibleprop != undefined ) {
var visible = getPropertyValue(cc.CASA_datavisibleprop).split(";");
for (j=0; j<visible.length; j++)
cc.CASA_chart.getDatasetMeta(0).data[j].hidden = (visible[j].toLowerCase() == "false");
cc.CASA_chart.update();
}
}
function updRCHARTVisibility(cc)
{
for (i = 0; i < cc.CASA_colinfos.length;i++)
{
if (cc.CASA_colinfos[i].visibleprop != undefined) {
var visible = getPropertyValue(cc.CASA_colinfos[i].visibleprop);
cc.CASA_chart.getDatasetMeta(i).hidden = (visible.toLowerCase() == "false");
}
}
cc.CASA_chart.update();
}
function setRCHARTLegendClick(options){
options.legend.onClick = function (e, legendItem) {
var index = legendItem.datasetIndex;
var ci = this.chart;
var meta = ci.getDatasetMeta(index);
meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
var cc = this.ctx.canvas;
if (cc.CASA_colinfos[index].visibleprop != undefined ){
setPropertyValue(cc.CASA_colinfos[index].visibleprop, (meta.hidden!=true));
}
ci.update();
if (cc.CASA_colinfos[index].legendclickmethod != undefined ){
invokeMethodInModel(cc.CASA_colinfos[index].legendclickmethod);
}
};
}
function setRPIELegendClick(options)
{
options.legend.onClick = function (e, legendItem) {
var index = legendItem.index;
var chart = this.chart;
var i, ilen, meta;
var cc = this.ctx.canvas;
for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
meta = chart.getDatasetMeta(i);
if (meta.data[index]) {
meta.data[index].hidden = !meta.data[index].hidden;
if (cc.CASA_datavisibleprop != undefined ){
var visible = getPropertyValue(cc.CASA_datavisibleprop).split(";");
if (meta.data[index].hidden ) visible[index] = "FALSE";
else visible[index] = "TRUE";
var vs = "";
for (j=0; j<visible.length; j++){
if ( j > 0 ) vs +=";";
vs += visible[j];
}
setPropertyValue(cc.CASA_datavisibleprop, vs);
}
}
}
chart.update();
if (cc.CASA_legendclickmethod != undefined ){
invokeMethodInModel(cc.CASA_legendclickmethod);
}
};
}
function registerShowValuePlugin ()
{
parent.Chart.plugins.register({
afterDatasetsDraw: function(chartInstance, easing) {
var ctx = chartInstance.chart.ctx;
var cc = ctx.canvas;
if ( (cc.CASA_showvalueinchart == undefined || cc.CASA_showvalueinchart.toLowerCase() == "false") &&
(cc.CASA_showpercentage == undefined || cc.CASA_showpercentage.toLowerCase() == "false" )) return;
var fontSize = parseInt(cc.CASA_showvaluefontsize);
ctx.fillStyle = cc.CASA_showvaluefontcolor;
ctx.font = parent.Chart.helpers.fontString(fontSize, cc.CASA_showvaluefontstyle, cc.CASA_showvaluefontfamily);
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
if ( chartInstance.config.type == "pie" || chartInstance.config.type == "doughnut" ) {
chartInstance.data.datasets.forEach(function (dataset) {
for (var i = 0; i < dataset.data.length; i++) {
if (dataset._meta[Object.keys(dataset._meta)[0]].data[i].hidden == true ) continue;
var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
total = dataset._meta[Object.keys(dataset._meta)[0]].total,
mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
start_angle = model.startAngle,
end_angle = model.endAngle,
mid_angle = start_angle + (end_angle - start_angle)/2;
var x = mid_radius * Math.cos(mid_angle);
var y = mid_radius * Math.sin(mid_angle);
var percent = String(Math.round(dataset.data[i]/total*100)) + "%";
if ( cc.CASA_showvalueinchart != undefined && cc.CASA_showvalueinchart.toLowerCase() == "true")
ctx.fillText(dataset.data[i], model.x + x, model.y + y);
if ( cc.CASA_showpercentage != undefined && cc.CASA_showpercentage.toLowerCase() == "true" )
ctx.fillText(percent, model.x + x, model.y + y + 15);
}
});
}
else  {
chartInstance.data.datasets.forEach(function (dataset, i) {
var meta = chartInstance.getDatasetMeta(i);
if (!meta.hidden) {
meta.data.forEach(function(element, index) {
var dataString = dataset.data[index].toString();
var position = element.tooltipPosition();
if ( chartInstance.config.type == "line" ){
ctx.fillStyle = "#666";
ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - 5);
}
if ( chartInstance.config.type == "bar" ) {
var height = element.height();
if (height > 0) {
if ( cc.CASA_showvaluepos == "inside" ) {
if ( height >= fontSize + 10 )
ctx.fillText(dataString, position.x, position.y + (fontSize / 2) + 5);
}
else
ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - 5);
}
else {
if ( cc.CASA_showvaluepos == "inside" ) {
if ( height <= (0-fontSize-10) )
ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - 5);
}
else
ctx.fillText(dataString, position.x, position.y + (fontSize / 2) + 5);
}
}
if (chartInstance.config.type == "horizontalBar") {
if (dataString[0] == '-')
ctx.fillText(dataString, position.x+20, position.y );
else
ctx.fillText(dataString, position.x-20, position.y );
}
});
}
});
}
}
});
}
