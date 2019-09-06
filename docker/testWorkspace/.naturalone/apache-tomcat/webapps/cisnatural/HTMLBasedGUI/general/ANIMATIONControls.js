function addVersionInfoANIMATIONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('ANIMATIONCONTROLS');
}
function iccAnimatePOINT(id,layerid,animateduration,animaterepeat, animatestartradius,animateendradius,animatewidth,animatergbcolor,
animatefillrgbcolor,animateprop,animateonadd)
{
var cc = this.getPOINT(layerid,id);
cc.CASA_animation = new Object();
if ( animateduration != null ) cc.CASA_animation.duration = parseInt(animateduration);
if ( animaterepeat != null ) cc.CASA_animation.repeat = parseInt(animaterepeat);
if ( animatestartradius != null ) cc.CASA_animation.startradius = parseFloat(animatestartradius);
if ( animateendradius != null ) cc.CASA_animation.endradius = parseFloat(animateendradius);
if ( animatewidth != null ) cc.CASA_animation.width = parseFloat(animatewidth);
if ( animatergbcolor != null ) cc.CASA_animation.rgbcolor = animatergbcolor;
if ( animatefillrgbcolor != null ) cc.CASA_animation.fillrgbcolor = animatefillrgbcolor;
if ( animateprop != null ) cc.CASA_animation.prop = animateprop;
if ( animateonadd != null && animateonadd.toLowerCase() == "true") cc.CASA_animation.onadd = true;
else cc.CASA_animation.onadd = false;
cc.CASA_animation.finished= true;
if (cc.CASA_animation.onadd == true)
cc.CASA_animation.finished = false;
}
function iccAnimateLINE(id,layerid,animateduration,animaterepeat,animatewidth,animatedash,animatergbcolor,
animateprop,animateonadd)
{
var cc = this.getLINE(layerid,id);
cc.CASA_animation = new Object();
if ( animateduration != null ) cc.CASA_animation.duration = parseInt(animateduration);
if ( animaterepeat != null ) cc.CASA_animation.repeat = parseInt(animaterepeat);
if ( animatedash != null ) cc.CASA_animation.dash = animatedash.split(";");
if ( animatewidth != null ) cc.CASA_animation.width = parseFloat(animatewidth);
if ( animatergbcolor != null ) cc.CASA_animation.rgbcolor = animatergbcolor;
if ( animateprop != null ) cc.CASA_animation.prop = animateprop;
if ( animateonadd != null && animateonadd.toLowerCase() == "true") cc.CASA_animation.onadd = true;
else cc.CASA_animation.onadd = false;
cc.CASA_animation.finished = true;
if (cc.CASA_animation.onadd == true)
cc.CASA_animation.finished = false;
}
function iccAnimatePOLYGON(id,layerid,animateduration,animaterepeat,animatewidth,animatedash,animatergbcolor,animatefillrgbcolor,
animateprop,animateonadd)
{
var cc = this.getPOLYGON(layerid,id);
cc.CASA_animation = new Object();
if ( animateduration != null ) cc.CASA_animation.duration = parseInt(animateduration);
if ( animaterepeat != null ) cc.CASA_animation.repeat = parseInt(animaterepeat);
if ( animatedash != null ) cc.CASA_animation.dash = animatedash.split(";");
if ( animatewidth != null ) cc.CASA_animation.width = parseFloat(animatewidth);
if ( animatergbcolor != null ) cc.CASA_animation.rgbcolor = animatergbcolor;
if ( animatefillrgbcolor != null ) cc.CASA_animation.fillrgbcolor = animatefillrgbcolor;
if ( animateprop != null ) cc.CASA_animation.prop = animateprop;
if ( animateonadd != null && animateonadd.toLowerCase() == "true") cc.CASA_animation.onadd = true;
else cc.CASA_animation.onadd = false;
cc.CASA_animation.finished = true;
if (cc.CASA_animation.onadd == true)
cc.CASA_animation.finished = false;
}
function romuAnimate(cc)
{
if ( cc.CASA_feature.CASA_animation == undefined )
cc.CASA_feature.CASA_animation = cc.CASA_animation;
if ( cc.CASA_feature.CASA_animation.onadd == true ) return;
if ( cc.CASA_feature.CASA_animation.prop == undefined ) return;
var animate =  getPropertyValue(cc.CASA_feature.CASA_animation.prop);
if ( animate == "true" || animate == "TRUE" ) {
if ( cc.CASA_feature.CASA_animation.finished == true ) {
var vs = getVectorSource(cc.layerid);
cc.CASA_feature.CASA_animation.finished = false;
vs.removeFeature(cc.CASA_feature);
vs.addFeature(cc.CASA_feature);
}
}
else cc.CASA_feature.CASA_animation.finished = true;
}
function animateMapFeature(feature, osmid) {
var start = new Date().getTime();
var duration = 3000;
var repeat = 1;
var startradius = 5;
var endradius = 30;
var listenerKey;
if ( feature.CASA_animation != undefined ){
if ( feature.CASA_animation.startradius != undefined ) startradius = feature.CASA_animation.startradius;
if ( feature.CASA_animation.duration != undefined ) duration = feature.CASA_animation.duration;
if ( feature.CASA_animation.repeat != undefined ) repeat = feature.CASA_animation.repeat;
if ( feature.CASA_animation.endradius != undefined ) endradius = feature.CASA_animation.endradius;
feature.CASA_animation.onadd = false;
}
function animate(event) {
if ( feature.CASA_animation == undefined ) return;
var elapsed = event.frameState.time - start;
var elapsedRatio = elapsed / duration;
var opacity = parent.ol.easing.easeOut(1 - elapsedRatio);
var style = null;
var flashGeom = null;
var color = null;
var width = 0;
var fill = undefined;
if ( feature.CASA_animation.rgbcolor != undefined ) {
color = feature.CASA_animation.rgbcolor;
if (color.toLowerCase().indexOf("rgb") == 0 && color.toLowerCase().indexOf("rgba") < 0 ){
color = color.replace (/rgb/g,"rgba");
color = color.replace (/\)/g, ","+opacity+")");
}
}
if ( color == null ) color = 'rgba(255, 0, 0, ' + opacity + ')';
if ( feature.CASA_animation.fillrgbcolor != undefined ) {
var fcolor = feature.CASA_animation.fillrgbcolor;
if (fcolor.toLowerCase().indexOf("rgb") == 0 && fcolor.toLowerCase().indexOf("rgba") < 0 ){
fcolor = fcolor.replace (/rgb/g,"rgba");
fcolor = fcolor.replace (/\)/g, ","+opacity+")");
}
fill = new parent.ol.style.Fill({ color:fcolor });
}
if ( feature.CASA_animation.width != undefined )
width = feature.CASA_animation.width + opacity;
if ( width == 0 ) width = 1 + opacity;
function buildAnimatePOINT(){
var radius = (parent.ol.easing.easeOut(elapsedRatio) * (endradius - startradius)) + startradius;
flashGeom = feature.getGeometry().clone();
style = new parent.ol.style.Style({
image: new parent.ol.style.Circle({
radius: radius,
snapToPixel: false,
fill: fill,
stroke: new parent.ol.style.Stroke({
color: color,
width: width
})
})
});
}
function buildAnimateLINE(){
flashGeom = feature.getGeometry().clone();
style = new parent.ol.style.Style({
stroke: new parent.ol.style.Stroke({
color: color,
width: width,
lineDash: feature.CASA_animation.dash
})
});
}
function buildAnimatePOLYGON(){
var coords = feature.getGeometry().getCoordinates();
var maxIndex = coords.length +1;
flashGeom = new parent.ol.geom.Polygon(coords);
style = new parent.ol.style.Style({
fill:fill,
stroke: new parent.ol.style.Stroke({
color: color,
width: width,
lineDash: feature.CASA_animation.dash
})
});
}
if (feature.getId().indexOf("MP_") == 0 ){
buildAnimatePOINT();
}
if (feature.getId().indexOf("ML_") == 0 ){
buildAnimateLINE();
}
if (feature.getId().indexOf("MY_") == 0 ){
buildAnimatePOLYGON();
}
event.vectorContext.setStyle(style);
event.vectorContext.drawGeometry(flashGeom);
if ( elapsed > duration || feature.CASA_animation.finished == true ) {
repeat = repeat - 1;
if ( repeat <= 0 || feature.CASA_animation.finished == true){
parent.ol.Observable.unByKey(listenerKey);
if ( feature.CASA_animation.prop != undefined )
setPropertyValue (feature.CASA_animation.prop, "false" );
feature.CASA_animation.finished = true;
feature.changed();
}
else
{
start = new Date().getTime();
}
}
getOSMAP(osmid).render();
}
listenerKey = this.getOSMAP(osmid).on('postcompose', animate);
}
