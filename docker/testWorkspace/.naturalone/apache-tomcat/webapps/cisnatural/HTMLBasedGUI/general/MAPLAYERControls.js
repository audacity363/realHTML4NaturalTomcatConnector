function addVersionInfoMAPLAYERCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('MAPLAYERCONTROLS');
}
var m_OSMLayers = new Object();
var m_OSMVectorLayers = new Object();
var m_OSMVectorSources = new Object();
function iccMAPLAYER(layerid,osmid,romumethod,visibleprop,zindex,name,withanimation)
{
if (getOSMLayer(layerid) == undefined)
{
m_OSMLayers[layerid] = new Object();
}
m_OSMLayers[layerid].layerid = layerid;
m_OSMLayers[layerid].osmid = osmid;
m_OSMLayers[layerid].romumethod = romumethod;
m_OSMLayers[layerid].visibleprop = visibleprop;
m_OSMLayers[layerid].zindex = zindex;
m_OSMLayers[layerid].name = name;
m_OSMLayers[layerid].withanimation = withanimation;
}
function romuLAYER(osmcc)
{
for (var propLayer in m_OSMLayers) {
var visibility = "true";
if (m_OSMLayers[propLayer].visibleprop != undefined)
visibility=getPropertyValue(m_OSMLayers[propLayer].visibleprop);
if (m_OSMLayers[propLayer].osmid.id == osmcc.id)
{
if (m_OSMVectorLayers[propLayer]==undefined && m_OSMVectorSources[propLayer] == undefined)
{
m_OSMVectorSources[propLayer] = new parent.ol.source.Vector({
projection: 'EPSG:4326'
});
if ( m_OSMLayers[propLayer].withanimation == 'true' )  {
m_OSMVectorSources[propLayer].on('addfeature', function(e) {
animateMapFeature(e.feature, osmcc.id);
});
}
m_OSMVectorLayers[propLayer] = new parent.ol.layer.Vector({
source: m_OSMVectorSources[propLayer]
});
this.getOSMAP(osmcc.id).addLayer(m_OSMVectorLayers[propLayer]);
}
if (m_OSMVectorLayers[propLayer]!=undefined && m_OSMVectorSources[propLayer] != undefined)
{
if (m_OSMLayers[propLayer].zindex != undefined)
m_OSMVectorLayers[propLayer].setZIndex(m_OSMLayers[propLayer].zindex);
if (visibility == "true")
m_OSMVectorLayers[propLayer].setVisible(true);
else
m_OSMVectorLayers[propLayer].setVisible(false);
}
for (var propPoints in m_OSMLayers[propLayer].osmPoints)
{
romuPointMarker(this.getOSMAP(osmcc.id), m_OSMLayers[propLayer].osmPoints[propPoints], m_OSMVectorSources[propLayer]);
}
for (var propLines in m_OSMLayers[propLayer].osmLines)
{
romuLineMarker(this.getOSMAP(osmcc.id), m_OSMLayers[propLayer].osmLines[propLines], m_OSMVectorSources[propLayer]);
}
for (var propPolygons in m_OSMLayers[propLayer].osmPolygons)
{
romuPolygonMarker(this.getOSMAP(osmcc.id), m_OSMLayers[propLayer].osmPolygons[propPolygons], m_OSMVectorSources[propLayer]);
}
}
}
return true;
}
function iccPOINT(id,layerid,longitudeprop,latitudeprop,fillcolor,strokecolor,
strokelinedash,strokewidth,radius)
{
if (getOSMLayer(layerid) == undefined)
{
m_OSMLayers[layerid] = new Object();
m_OSMLayers[layerid].layerid = layerid;
}
if (m_OSMLayers[layerid].osmPoints == undefined)
{
m_OSMLayers[layerid].osmPoints = new Object();
}
m_OSMLayers[layerid].osmPoints[id] = new Object();
m_OSMLayers[layerid].osmPoints[id].id = id;
m_OSMLayers[layerid].osmPoints[id].layerid = layerid;
m_OSMLayers[layerid].osmPoints[id].longitudeprop = longitudeprop;
m_OSMLayers[layerid].osmPoints[id].latitudeprop = latitudeprop;
m_OSMLayers[layerid].osmPoints[id].fillcolor = fillcolor;
m_OSMLayers[layerid].osmPoints[id].strokecolor = strokecolor;
m_OSMLayers[layerid].osmPoints[id].strokelinedash = strokelinedash;
if (strokewidth != null) m_OSMLayers[layerid].osmPoints[id].strokewidth = parseFloat(strokewidth);
if (radius != null) m_OSMLayers[layerid].osmPoints[id].radius = parseFloat(radius);
}
function iccLINE(id,layerid,startlongitudeprop,startlatitudeprop,endlongitudeprop,endlatitudeprop,
strokecolor,strokelinedash,strokelinecap,strokewidth)
{
if (getOSMLayer(layerid) == undefined)
{
m_OSMLayers[layerid] = new Object();
m_OSMLayers[layerid].layerid = layerid;
}
if (m_OSMLayers[layerid].osmLines == undefined)
{
m_OSMLayers[layerid].osmLines = new Object();
}
m_OSMLayers[layerid].osmLines[id] = new Object();
m_OSMLayers[layerid].osmLines[id].id = id;
m_OSMLayers[layerid].osmLines[id].layerid = layerid;
m_OSMLayers[layerid].osmLines[id].startlongitudeprop = startlongitudeprop;
m_OSMLayers[layerid].osmLines[id].startlatitudeprop = startlatitudeprop;
m_OSMLayers[layerid].osmLines[id].endlongitudeprop = endlongitudeprop;
m_OSMLayers[layerid].osmLines[id].endlatitudeprop = endlatitudeprop;
m_OSMLayers[layerid].osmLines[id].strokecolor = strokecolor;
m_OSMLayers[layerid].osmLines[id].strokelinedash = strokelinedash;
m_OSMLayers[layerid].osmLines[id].strokelinecap = strokelinecap;
if (strokewidth != null) m_OSMLayers[layerid].osmLines[id].strokewidth = parseFloat(strokewidth);
}
function iccPOLYGON(id,layerid,polycoordinatesprop,fillcolor,strokecolor,strokelinedash,
strokewidth)
{
if (getOSMLayer(layerid) == undefined)
{
m_OSMLayers[layerid] = new Object();
m_OSMLayers[layerid].layerid = layerid;
}
if (m_OSMLayers[layerid].osmPolygons == undefined)
{
m_OSMLayers[layerid].osmPolygons = new Object();
}
m_OSMLayers[layerid].osmPolygons[id] = new Object();
m_OSMLayers[layerid].osmPolygons[id].id = id;
m_OSMLayers[layerid].osmPolygons[id].layerid = layerid;
m_OSMLayers[layerid].osmPolygons[id].polycoordinatesprop = polycoordinatesprop;
m_OSMLayers[layerid].osmPolygons[id].fillcolor = fillcolor;
m_OSMLayers[layerid].osmPolygons[id].strokecolor = strokecolor;
m_OSMLayers[layerid].osmPolygons[id].strokelinedash = strokelinedash;
if (strokewidth != null) m_OSMLayers[layerid].osmPolygons[id].strokewidth = parseFloat(strokewidth);
}
function romuPointMarker(map,cc,vectorSource)
{
if (vectorSource.getFeatureById(cc.id) != null ) {
updatePointLocation(map,cc);
romuAnimate(cc);
return;
}
else {
cc.CASA_feature = new parent.ol.Feature({ });
cc.CASA_feature.setId(cc.id);
cc.CASA_feature.setGeometry(new parent.ol.geom.Point(
[parseFloat(getPropertyValue(cc.longitudeprop)), parseFloat(getPropertyValue(cc.latitudeprop))]
));
cc.CASA_feature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
map.getLayers().item(0).getSource().getProjection()
);
var fill = undefined;
if (cc.fillcolor != null) {
fill = new parent.ol.style.Fill({ });
fill.setColor(cc.fillcolor);
}
var stroke = new parent.ol.style.Stroke({ });
if (cc.strokecolor != null)
stroke.setColor(cc.strokecolor);
if (cc.strokewidth != null)
stroke.setWidth(cc.strokewidth);
if (cc.strokelinedash != null)
stroke.setLineDash(cc.strokelinedash.split(';'));
var	circle = new parent.ol.style.Circle({
fill: fill,
stroke: stroke
});
if (cc.radius != null)
circle.setRadius(cc.radius);
var style = new parent.ol.style.Style({
image: circle
});
cc.CASA_feature.setStyle( function(feature,number) {
if ( feature.CASA_animation != undefined && feature.CASA_animation.finished == false )
return null;
else
return style;
});
romuAnimate(cc);
setTimeout (function() { vectorSource.addFeature(cc.CASA_feature);}, 100 );
}
}
function romuLineMarker(map,cc,vectorSource)
{
if (vectorSource.getFeatureById(cc.id) != null ) {
updateLineLocation(map,cc);
romuAnimate(cc);
return;
}
else {
cc.CASA_feature = new parent.ol.Feature({ });
cc.CASA_feature.setId(cc.id);
cc.CASA_feature.setGeometry(new parent.ol.geom.LineString([
[parseFloat(getPropertyValue(cc.startlongitudeprop)), parseFloat(getPropertyValue(cc.startlatitudeprop))],
[parseFloat(getPropertyValue(cc.endlongitudeprop)), parseFloat(getPropertyValue(cc.endlatitudeprop))]]
));
cc.CASA_feature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
map.getLayers().item(0).getSource().getProjection()
);
var stroke = new parent.ol.style.Stroke({ });
if (cc.strokecolor != null)
stroke.setColor(cc.strokecolor);
if (cc.strokewidth != null)
stroke.setWidth(cc.strokewidth);
if (cc.strokelinecap != null)
stroke.setLineCap(cc.strokelinecap);
if (cc.strokelinedash != null)
stroke.setLineDash(cc.strokelinedash.split(';'));
var style = new parent.ol.style.Style({
stroke: stroke
});
cc.CASA_feature.setStyle( function(feature,number) {
if ( feature.CASA_animation != undefined && feature.CASA_animation.finished == false )
return null;
else
return style;
});
romuAnimate(cc);
setTimeout (function() { vectorSource.addFeature(cc.CASA_feature);}, 100 );
}
}
function romuPolygonMarker(map,cc,vectorSource)
{
if (vectorSource.getFeatureById(cc.id) != null ) {
updatePolygonLocation(map,cc);
romuAnimate(cc);
return;
}
else {
cc.CASA_feature = new parent.ol.Feature({ });
cc.CASA_feature.setId(cc.id);
var polyCoordiantes=[];
for (j=0;;j++)
{
var lon=getPropertyValue(cc.polycoordinatesprop+".items["+j+"].longitude");
var lat=getPropertyValue(cc.polycoordinatesprop+".items["+j+"].latitude")
if (lon==null || lat==null)
break;
else
polyCoordiantes[j] = ([parseFloat(lon), parseFloat(lat)]);
}
cc.CASA_feature.setGeometry(new parent.ol.geom.Polygon([polyCoordiantes]));
cc.CASA_feature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
map.getLayers().item(0).getSource().getProjection()
);
var fill = undefined;
if (cc.fillcolor != null) {
fill = new parent.ol.style.Fill({ });
fill.setColor(cc.fillcolor);
}
var stroke = new parent.ol.style.Stroke({ });
if (cc.strokecolor != null)
stroke.setColor(cc.strokecolor);
if (cc.strokewidth != null)
stroke.setWidth(cc.strokewidth);
if (cc.strokelinedash != null)
stroke.setLineDash(cc.strokelinedash.split(';'));
var style = new parent.ol.style.Style({
fill: fill,
stroke: stroke
});
cc.CASA_feature.setStyle( function(feature,number) {
if ( feature.CASA_animation != undefined && feature.CASA_animation.finished == false )
return null;
else
return style;
});
romuAnimate(cc);
setTimeout (function() { vectorSource.addFeature(cc.CASA_feature);}, 100 );
}
}
function getOSMLayer(layerid) {
return m_OSMLayers[layerid];
}
function getPOINT(layerid, id)
{
return m_OSMLayers[layerid].osmPoints[id];
}
function getLINE(layerid, id)
{
return m_OSMLayers[layerid].osmLines[id];
}
function getPOLYGON(layerid, id)
{
return m_OSMLayers[layerid].osmPolygons[id];
}
function getVectorSource(layerid)
{
return m_OSMVectorSources[layerid];
}
function updatePointLocation(map,cc)
{
cc.CASA_feature.getGeometry().setCoordinates([parseFloat(getPropertyValue(cc.longitudeprop)), parseFloat(getPropertyValue(cc.latitudeprop))]);
cc.CASA_feature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
map.getLayers().item(0).getSource().getProjection()
);
}
function updateLineLocation(map,cc)
{
cc.CASA_feature.getGeometry().setCoordinates([
[parseFloat(getPropertyValue(cc.startlongitudeprop)), parseFloat(getPropertyValue(cc.startlatitudeprop))],
[parseFloat(getPropertyValue(cc.endlongitudeprop)), parseFloat(getPropertyValue(cc.endlatitudeprop))]]
);
cc.CASA_feature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
map.getLayers().item(0).getSource().getProjection()
);
}
function updatePolygonLocation(map,cc)
{
var polyCoordiantes=[];
for (j=0;;j++)
{
var lon=getPropertyValue(cc.polycoordinatesprop+".items["+j+"].longitude");
var lat=getPropertyValue(cc.polycoordinatesprop+".items["+j+"].latitude")
if (lon==null || lat==null)
break;
else
polyCoordiantes[j] = ([parseFloat(lon), parseFloat(lat)]);
}
cc.CASA_feature.getGeometry().setCoordinates([polyCoordiantes]);
cc.CASA_feature.getGeometry().transform(
new parent.ol.proj.Projection({code: "EPSG:4326"}),
map.getLayers().item(0).getSource().getProjection()
);
}
