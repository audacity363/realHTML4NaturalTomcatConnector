function addVersionInfoOPENSTREETMAPCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('OPENSTREETMAPCONTROLS');
}
var m_OSMMap = new Object();
function iccOSMAP(cc,romumethod, longitudeprop, latitudeprop, addressprop, onclickmethod, selectprop, zoomprop, maxzoomprop, minzoomprop,
pixelratio, logo, maxzoom, minzoom, rotation, zoom, opacity, withoverviewmap, withlocationmarker, withgeocoder)
{
if ( romumethod != null ) registerListener(romumethod);
if ( longitudeprop != null ) {
cc.CASA_longitudeprop = longitudeprop;
registerPropertyListener(romumethod, cc.CASA_longitudeprop, cc.id);
}
if ( latitudeprop != null ) {
cc.CASA_latitudeprop = latitudeprop;
registerPropertyListener(romumethod, cc.CASA_latitudeprop, cc.id);
}
if ( addressprop != null ) {
cc.CASA_addressprop = addressprop;
registerPropertyListener(romumethod, cc.CASA_addressprop, cc.id);
}
if ( selectprop != null ) cc.CASA_selectprop = selectprop;
if ( zoomprop != null ) {
cc.CASA_zoomprop = zoomprop;
registerPropertyListener(romumethod, cc.CASA_zoomprop, cc.id);
}
if ( maxzoomprop != null ) {
cc.CASA_maxzoomprop = maxzoomprop;
registerPropertyListener(romumethod, cc.CASA_maxzoomprop, cc.id);
}
if ( minzoomprop != null ) {
cc.CASA_minzoomprop = minzoomprop;
registerPropertyListener(romumethod, cc.CASA_minzoomprop, cc.id);
}
if ( withoverviewmap == "true" ) cc.CASA_withoverviewmap = true;
if ( withlocationmarker == "true") cc.CASA_withlocationmarker = true;
if ( withgeocoder == "true") cc.CASA_withgeocoder = true;
if ( zoom != null ) cc.CASA_zoom = zoom;
else  cc.CASA_zoom = 0;
if ( maxzoom != null ) cc.CASA_maxzoom = maxzoom;
if ( minzoom != null ) cc.CASA_minzoom = minzoom;
if ( rotation != null ) cc.CASA_rotation = rotation;
if ( pixelratio != null ) cc.CASA_pixelratio = pixelratio;
if ( logo != null ) cc.CASA_logo = logo;
if ( opacity != null ) cc.CASA_opacity = opacity;
cc.CASA_onclickmethod = onclickmethod;
cc.CASA_longitudeold = "";
cc.CASA_latitudeold = "";
cc.CASA_osmlon = "";
cc.CASA_osmlat = "";
}
function romuOSMAP(cc)
{
if ( (cc.CASA_withgeocoder != undefined) && (cc.CASA_addressprop != null) )
{
if (getPropertyValue(cc.CASA_addressprop) != "")
{
getCoord(cc, "http://nominatim.openstreetmap.org/search?q="+encodeURLParameter(getPropertyValue(cc.CASA_addressprop))+"&format=json&polygon=0&addressdetails=1");
}
}
else
{
parent.window.requestAnimationFrame(function(timestamp){doRomuOSMAP(cc);});
}
}
function doRomuOSMAP(cc)
{
if ( parent.m_roi_firstusage == true)  return;
var lon = "";
var lat = "";
var osmmap = null;
var osmview = null;
var needupd = false;
if ( cc.CASA_longitudeprop != null )
lon = getPropertyValue(cc.CASA_longitudeprop);
if ( cc.CASA_latitudeprop != null )
lat = getPropertyValue(cc.CASA_latitudeprop);
if ( cc.CASA_zoomprop != null )
{
if ((getPropertyValue(cc.CASA_zoomprop)) != "")
cc.CASA_zoom = getPropertyValue(cc.CASA_zoomprop);
}
if ( cc.CASA_maxzoomprop != null )
{
if ((getPropertyValue(cc.CASA_maxzoomprop)) != "")
cc.CASA_maxzoom = getPropertyValue(cc.CASA_maxzoomprop);
}
if ( cc.CASA_minzoomprop != null )
{
if ((getPropertyValue(cc.CASA_minzoomprop)) != "")
cc.CASA_minzoom = getPropertyValue(cc.CASA_minzoomprop);
}
if (cc.CASA_osmlon != null && cc.CASA_osmlon != "")
lon = cc.CASA_osmlon;
if (cc.CASA_osmlat != null && cc.CASA_osmlat != "")
lat = cc.CASA_osmlat;
osmmap = getOSMAP(cc.id);
if ( (lon != null && lon != "" && lat != null && lat != "") && ( lon != cc.CASA_longitudeold || lat != cc.CASA_latitudeold) )
{
cc.CASA_longitudeold = lon;
cc.CASA_latitudeold = lat;
if(osmmap == null)
{
osmview = new parent.ol.View({
center: parent.ol.proj.fromLonLat([parseFloat(lon),parseFloat(lat)]),
zoom: parseInt(cc.CASA_zoom)
});
if ( cc.CASA_maxzoom != null ) osmview.setMaxZoom(parseInt(cc.CASA_maxzoom));
if ( cc.CASA_minzoom != null ) osmview.setMinZoom(parseInt(cc.CASA_minzoom));
if ( cc.CASA_rotation != null ) osmview.setRotation(parseFloat(cc.CASA_rotation));
if (cc.CASA_logo != null)
osmmap = new parent.ol.Map({
logo: cc.CASA_logo
});
else
osmmap = new parent.ol.Map({
});
osmmap.addLayer(new parent.ol.layer.Tile({
source: new parent.ol.source.OSM()
}));
osmmap.set("target",cc.id);
osmmap.set("view",osmview);
if ( cc.CASA_pixelratio != null ) osmmap.set("pixelRatio", parseFloat(cc.CASA_pixelratio));
if ( cc.CASA_opacity != null ) {
osmmap.getLayers().forEach(function(layer, i) {
layer.set("opacity", parseFloat(cc.CASA_opacity));
});
}
if ( cc.CASA_onclickmethod != null )
osmmap.on('singleclick', function(evt) {
var lonlat = parent.ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
setPropertyValue(cc.CASA_selectprop +".longitude", lonlat[0]);
setPropertyValue(cc.CASA_selectprop +".latitude", lonlat[1]);
if ( cc.CASA_withgeocoder != undefined ) {
getAddress(cc, "http://nominatim.openstreetmap.org/reverse?format=json&lat="+lonlat[1]+"&lon="+lonlat[0]+"&zoom=18&addressdetails=1");
}
else doInvokeMethodInModel(cc);
});
if ( cc.CASA_withoverviewmap != undefined ) osmmap.addControl(new parent.ol.control.OverviewMap());
m_OSMMap[cc.id] = osmmap;
if ( cc.CASA_withlocationmarker != undefined ) initLocation(cc);
}
else
{
if (cc.CASA_osmlon != null && cc.CASA_osmlon != "")
lon = cc.CASA_osmlon;
if (cc.CASA_osmlat != null && cc.CASA_osmlat != "")
lat = cc.CASA_osmlat;
if ( cc.CASA_withlocationmarker != undefined ) updateLocation(cc);
osmmap.getView().setCenter(parent.ol.proj.fromLonLat([parseFloat(lon),parseFloat(lat)]));
osmmap.getView().setZoom(parseInt(cc.CASA_zoom));
if ( cc.CASA_maxzoom != null ) osmmap.getView().setMaxZoom(parseInt(cc.CASA_maxzoom));
if ( cc.CASA_minzoom != null ) osmmap.getView().setMinZoom(parseInt(cc.CASA_minzoom));
}
needupd = true;
}
if ( osmmap != null && (this.romuMARKER != undefined))
{
needupd = this.romuMARKER(cc) || needupd;
}
if ( needupd ) osmmap.updateSize();
if ( osmmap != null && (this.romuLAYER != undefined))
{
this.romuLAYER(cc);
osmmap.render();
}
}
function initLocation(cc, osmmap)
{
cc.CASA_locationfeature = new parent.ol.Feature({ });
cc.CASA_locationfeature.setGeometry(new parent.ol.geom.Point(
[parseFloat(cc.CASA_longitudeold), parseFloat(cc.CASA_latitudeold)]
));
var source = new parent.ol.source.Vector({
});
var vector_layer = new parent.ol.layer.Vector({
source: source
});
cc.CASA_locationfeature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
getOSMAP(cc.id).getLayers().item(0).getSource().getProjection()
);
var fill = new parent.ol.style.Fill({
color: [190, 0, 0, 1]
});
var stroke = new parent.ol.style.Stroke({
color: [190, 0, 0, 1],
width: 3
});
var style = new parent.ol.style.Style({
image: new parent.ol.style.Circle({
fill: fill,
stroke: stroke,
radius: 10
}),
});
vector_layer.setStyle(style);
getOSMAP(cc.id).addLayer(vector_layer);
source.addFeature(cc.CASA_locationfeature);
}
function updateLocation(cc)
{
cc.CASA_locationfeature.getGeometry().setCoordinates([parseFloat(cc.CASA_longitudeold), parseFloat(cc.CASA_latitudeold)]);
cc.CASA_locationfeature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
getOSMAP(cc.id).getLayers().item(0).getSource().getProjection()
);
}
function getOSMAP(id) {
return (m_OSMMap[id]);
}
function getAddress(cc, coord) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
var responseArr = JSON.parse(this.responseText);
var osmcity;
if (responseArr.address.village!=undefined)
osmcity = responseArr.address.village;
if (responseArr.address.town!=undefined)
osmcity = responseArr.address.town;
if (responseArr.address.city!=undefined)
osmcity = responseArr.address.city;
cc.CASA_osmaddress=responseArr.address.country+","+responseArr.address.postcode+","+osmcity+","+responseArr.address.road+","+responseArr.address.house_number;
doInvokeMethodInModel(cc);
}
else {
if (this.status >= 400)
alert("HTTP response status: "+this.status+"\n\n"+this.responseText);
}
}
xmlhttp.open("GET", coord, true);
xmlhttp.send();
}
function getCoord(cc, address) {
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
var responseArr = JSON.parse(this.responseText);
if (responseArr.length > 0){
cc.CASA_osmlon = responseArr[0].lon;
cc.CASA_osmlat = responseArr[0].lat;
var osmcity;
if (responseArr[0].address.village!=undefined)
osmcity = responseArr[0].address.village;
if (responseArr[0].address.town!=undefined)
osmcity = responseArr[0].address.town;
if (responseArr[0].address.city!=undefined)
osmcity = responseArr[0].address.city;
cc.CASA_osmaddress=responseArr[0].address.country+","+responseArr[0].address.postcode+","+osmcity+","+responseArr[0].address.road+","+responseArr[0].address.house_number;
doRomuOSMAP(cc);
}
}
else {
if (this.status >= 400)
alert("HTTP response status: "+this.status+"\n\n"+this.responseText);
}
}
xmlhttp.open("GET", address, true);
xmlhttp.send();
}
function doInvokeMethodInModel(cc) {
setPropertyValue(cc.CASA_selectprop +".address", cc.CASA_osmaddress);
invokeMethodInModel(cc.CASA_onclickmethod);
}
