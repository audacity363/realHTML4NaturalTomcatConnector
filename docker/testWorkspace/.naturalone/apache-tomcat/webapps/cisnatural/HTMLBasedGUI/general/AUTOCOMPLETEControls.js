function addVersionInfoAUTOCOMPLETECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('AUTOCOMPLETECONTROLS');
}
function Autocomplete (source, sourceprop, sourcelocation, sourcelocationprop, minlength, delay, matchmode, rows)
{
this.source = source;
this.sourceprop = sourceprop;
this.sourcelocation = sourcelocation;
this.sourcelocationprop = sourcelocationprop;
this.minlength = minlength;
this.delay = delay;
this.matchmode = matchmode;
this.rows = rows;
}
function iccAUTOCOMPLETE(cc, source, sourceprop, sourcelocation, sourcelocationprop, minlength, delay, matchmode, rows)
{
cc.CASA_autocomplete = new Autocomplete (source, sourceprop, sourcelocation, sourcelocationprop, minlength, delay, matchmode, rows)
return cc.CASA_autocomplete;
}
Autocomplete.prototype.updateautocomplete = function(cc)
{
var initok=false;
var newsource = this.source;
var matchmode = this.matchmode;
if (this.sourceprop!=null)
{
newsource = getPropertyValue (this.sourceprop);
}
var newsourceloc = this.sourcelocation;
if (this.sourcelocationprop!=null)
{
newsourceloc = getPropertyValue (this.sourcelocationprop);
}
if (newsource==null || newsource.length==0 || newsource.toLowerCase()=="string")
{
var res = decodeString(newsourceloc, ";");
if ( matchmode != null && matchmode.toLowerCase() == "all" )
{
parent.$("#"+cc.id,parent.document).autocomplete({source: res });
}
else
{
parent.$("#"+cc.id,parent.document ).autocomplete({
source: function( request, response ) {
var matcher = new RegExp( "^" + parent.$.ui.autocomplete.escapeRegex( request.term ), "i" );
response( parent.$.grep( res, function( item ){
return matcher.test( item );
}) );
}
});
}
initok=true;
}
else if (newsource.toLowerCase()=="file")
{
var filteradd = false;
var filterlabel = true;
parent.$("#"+cc.id,parent.document).autocomplete({
source: function( request, response ) {
parent.$.getJSON(newsourceloc, request, function(data, status, xhr) {
var exp = parent.$.ui.autocomplete.escapeRegex(request.term);
if (matchmode == null || matchmode.toLowerCase() == "start")
exp = "^" + exp;
var matcher = new RegExp(exp, "i" );
response( parent.$.grep( data, function( xitem ){
filterlabel = (xitem.label != undefined);
filteradd = !filterlabel && (cc.CASA_autocompletedisplayref!==undefined) && (cc.CASA_autocompletedisplayname!==undefined);
if (filteradd)
return matcher.test(xitem.value) || matcher.test(eval("xitem." + cc.CASA_autocompletedisplayname));
else if (filterlabel)
return matcher.test(xitem.label);
else
return matcher.test(xitem.value || xitem);
}) );
});
}
}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
if (filteradd) {
return parent.$( "<li>" )
.data( "ui-autocomplete-item", item )
.append( "<a>" + item.label + "&nbsp;" + eval("item." + cc.CASA_autocompletedisplayname) )
.appendTo( ul );
}
else {
return parent.$( "<li>" ).text( item.label ).appendTo( ul );
}
};
initok=true;
}
else if (newsource.toLowerCase()=="url")
{
var noadd = true;
var urlStr = newsourceloc;
parent.$("#"+cc.id,parent.document).autocomplete({source: function( request, response ){
parent.$.ajax({
url: urlStr ,
dataType: "jsonp",
data: { q: request.term },
success: function( data ) {
response(parent.$.grep( data, function( xitem ){
noadd = (xitem.label != undefined);
return true;
}) );
}});
}}).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
if (!noadd && (cc.CASA_autocompletedisplayref!==undefined) && (cc.CASA_autocompletedisplayname!==undefined)) {
return parent.$( "<li>" )
.data( "ui-autocomplete-item", item )
.append( "<a>" + item.label + "&nbsp;" + eval("item." + cc.CASA_autocompletedisplayname) )
.appendTo( ul );
}
else {
return parent.$( "<li>" ).text( item.label ).appendTo( ul );
}
};
initok=true;
}
if (initok)
{
parent.$("#"+cc.id,parent.document).autocomplete( "option", "minLength", this.minlength);
parent.$("#"+cc.id,parent.document).autocomplete( "option", "delay", this.delay );
parent.$("#"+cc.id,parent.document).on("autocompleteselect", acSelect);
parent.$("#"+cc.id,parent.document).autocomplete( "option", "autoFocus", true );
parent.$("#"+cc.id,parent.document).autocomplete( "option", "rows", this.rows);
}
}
function reactOnShowAll(cc, evt)
{
var wasOpen = parent.$("#"+cc.id,parent.document).autocomplete( "widget" ).is( ":visible" );
if (wasOpen) return;
cc.focus();
parent.$("#"+cc.id,parent.document).autocomplete( "search", "" );
}
function acSelect ( event, ui )
{
if ((this.CASA_autocompletedisplayref!==undefined) && (this.CASA_autocompletedisplayname!==undefined))
{
var displayname = "ui.item." + this.CASA_autocompletedisplayname;
setPropertyValue (this.CASA_autocompletedisplayref, eval(displayname));
updateModelListeners();
}
this.value = ui.item.value;
transferChangeFIELD(this, true,"blur");
}
;(function($, undefined)
{
'use strict';
if ( parent.$ == undefined || parent.$ == null ) return;
parent.$.widget('ui.autocomplete', parent.$.ui.autocomplete,
{
_resizeMenu: function()
{
var ul, lis, ulW, barW;
ul = this.menu.element;
if (this.options.rows != null && !isNaN(this.options.rows))
{
this.menu.element.css({overflowX: '', overflowY: '', width: '', maxHeight: ''});
lis = ul.children("li").css("whiteSpace", "nowrap");
if (lis.length > this.options.rows)
{
ulW = ul.prop('clientWidth');
ul.css({overflowX: 'hidden', overflowY: 'auto', maxHeight: lis.eq(0).outerHeight() * this.options.rows + 1});
barW = ulW - ul.prop("clientWidth");
ul.width(ul.width() + barW);
}
}
ul.outerWidth(Math.max(ul.outerWidth() + 1,this.element.outerWidth()));
}
});
})(parent.jQuery);
