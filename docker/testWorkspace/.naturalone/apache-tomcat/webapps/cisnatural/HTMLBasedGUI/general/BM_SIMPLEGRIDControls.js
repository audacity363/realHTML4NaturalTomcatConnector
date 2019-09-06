function addVersionInfoBM_SIMPLEGRIDCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_SIMPLEGRIDCONTROLS');
}
var m_simpleGrid_de =
{
"emptyTable":   	"Keine Daten in der Tabelle vorhanden",
"info":         	"_START_ bis _END_ von _TOTAL_ Eintr&#228;gen",
"infoEmpty":    	"0 bis 0 von 0 Eintr&#228;gen",
"infoFiltered": 	"(gefiltert von _MAX_ Eintr&#228;gen)",
"infoPostFix":  	"",
"thousands":  	".",
"lengthMenu":   	"_MENU_ Eintr&#228;ge anzeigen",
"loadingRecords": 	"Wird geladen...",
"processing":   	"Bitte warten...",
"search":       	"Suchen",
"zeroRecords":  	"Keine Eintr&#228;ge vorhanden.",
"paginate": {
"first":    	"Erste",
"previous": 	"Zur&#252;ck",
"next":     	"N&#228;chste",
"last":     	"Letzte"
},
"aria": {
"sortAscending":  ": aktivieren, um Spalte aufsteigend zu sortieren",
"sortDescending": ": aktivieren, um Spalte absteigend zu sortieren"
}
}
function initSIMPLEGRID(pCC,gridprop,selectprop,changeindexprop,source,sourcelocation,sourcelocationprop,sortcol,sortorder,features)
{
pCC.CASA_bufferedchangeindex = undefined;
pCC.CASA_gridprop = gridprop;
pCC.CASA_selectprop = selectprop;
pCC.CASA_changeindexprop = changeindexprop;
pCC.CASA_lastchangeindex = -1;
pCC.CASA_source = source;
pCC.CASA_sourcelocation = sourcelocation;
pCC.CASA_sourcelocationprop = sourcelocationprop;
pCC.CASA_sortcol = "0";
if (sortcol != null)  pCC.CASA_sortcol = sortcol;
pCC.CASA_sortorder = "desc";
if (sortorder != null) pCC.CASA_sortorder = sortorder;
pCC.CASA_features = features;
pCC.CASA_griddata = [];
if (pCC.CASA_datatable != null) pCC.CASA_datatable.destroy();
initDatatable(pCC);
var thebody = "#"+pCC.id + " tbody";
parent.$(thebody).on( 'click', 'tr', function () {
if ( parent.$(this).hasClass('selected') ) {
parent.$(this).removeClass('selected');
}
else {
pCC.CASA_datatable.$('tr.selected').removeClass('selected');
parent.$(this).addClass('selected');
if (pCC.CASA_selectprop != null)
{
var selected = pCC.CASA_datatable.$('tr.selected');
if (selected != null)
{
var seldata = pCC.CASA_datatable.row(this).data();
for (i = 0; i < pCC.CASA_colinfos.length;i++)
setPropertyValue(pCC.CASA_selectprop+"."+pCC.CASA_colinfos[i].property, seldata[i]);
}
}
}
if (pCC.CASA_onclickmethod != null) invokeMethodInModel(pCC.CASA_onclickmethod);
});
parent.$(thebody).on( 'dblclick', 'tr', function () {
if (pCC.CASA_ondblclickmethod != null)
invokeMethodInModel(pCC.CASA_ondblclickmethod);
});
}
function reactOnModelUpdateSIMPLEGRID(pCC)
{
if ( pCC.CASA_changeindexprop != null) {
var ci = getPropertyValue( pCC.CASA_changeindexprop);
if ( ci ==  pCC.CASA_lastchangeindex ) return;
pCC.CASA_lastchangeindex = ci;
}
if (pCC.CASA_datatable != null) pCC.CASA_datatable.destroy();
pCC.CASA_griddata = [];
initDatatable(pCC);
pCC.CASA_datatable.init();
pCC.CASA_datatable.draw();
}
function initDatatable(pCC)
{
var options = new Object();
if ( m_language == "2"  || m_language == "de" ) options.language = m_simpleGrid_de;
options.scroller = true;
if ( pCC.CASA_features != null ) {
var addoptions = pCC.CASA_features.split(';');
for ( i = 0; i < addoptions.length; i ++ )
{
var addoption = addoptions[i].split(':');
if ( addoption.length == 2 ) { options[addoption[0]] = (addoption[1] == "true"); }
}
}
if ( options.ordering != false ) options.order =  [[pCC.CASA_sortcol,pCC.CASA_sortorder]];
if (pCC.CASA_source=="file") {
if (pCC.CASA_sourcelocation!=null )
options.ajax = pCC.CASA_sourcelocation;
if (pCC.CASA_sourcelocationenprop != null )
options.ajax = getPropertyValue(pCC.CASA_sourcelocationprop);
}
else if (pCC.CASA_source=="url") {
alert( "Sorry, not yet supported");
}
else {
var gridline;
var thevalue;
var irow = 0;
while (true) {
gridline=[];
for (i = 0; i < pCC.CASA_colinfos.length;i++)
{
thevalue = getPropertyValue(pCC.CASA_gridprop+".items["+irow+"]."+pCC.CASA_colinfos[i].property);
if (thevalue == null) break;
if (pCC.CASA_colinfos[i].datatype != undefined)
thevalue = convertForDisplay(thevalue,pCC.CASA_colinfos[i].datatype);
gridline.push(thevalue);
}
if (gridline.length == 0 ) break;
pCC.CASA_griddata.push(gridline);
irow++;
}
options.data = pCC.CASA_griddata;
options.columns = [];
for (i=0;i < pCC.CASA_colinfos.length;i++) {
if (pCC.CASA_colinfos[i].visible == "false") {
options.columns[i] = new Object();
options.columns[i].visible = false;
}
else options.columns[i] = null;
}
}
pCC.CASA_datatable = parent.$("#"+pCC.id).DataTable(options);
}
function convertForDisplay(v,dt)
{
if ( dt == undefined || dt == null ) return v;
if (dt == "date") return convertYYYYMMDDIntoDisplayString(v);
if (dt == "time") return convertHHMMSSIntoDisplayString(v);
if (dt == "timestamp") return convertYYYYMMDDHHMMSSMMMIntoDisplayString(v);
if (dt == "float") return convertFLOATIntoDisplayString(v);
if (dt == "int" || dt == "long" ) return convertINTIntoDisplayString(v);
}
