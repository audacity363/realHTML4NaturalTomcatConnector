function addVersionInfoBM_MEDIACONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_MEDIACONTROLS');
}
function iccMEDIA(cc,id,valueprop,videoid,mediatype)
{
cc.CASA_valueprop = valueprop;
cc.CASA_id = id;
cc.CASA_videoid = videoid;
if ( mediatype == 'camera' )
{
var facingmode = navigator.mediaDevices && navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints["facingMode"];
var constraint = { video:true };
if ( facingmode ) constraint = { video: {facingMode: "user"} };
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
{
navigator.mediaDevices.getUserMedia(constraint).then(function(stream) {
var vd = parent.document.getElementById(cc.CASA_videoid);
vd.src = window.URL.createObjectURL(stream);
vd.play();
});
}
else
{
if (navigator.getUserMedia) {
navigator.getUserMedia(constraint,function(stream) {
var vd = parent.document.getElementById(cc.CASA_videoid);
vd.src = window.URL.createObjectURL(stream);
vd.play();} );
}
else if( navigator.webkitGetUserMedia) {
navigator.webkitGetUserMedia(constraint,function(stream) {
var vd = parent.document.getElementById(cc.CASA_videoid);
vd.src = window.URL.createObjectURL(stream);
vd.play();} );
}
else if ( navigator.moxGetUserMedia) {
navigator.moxGetUserMedia(constraint,function(stream) {
var vd = parent.document.getElementById(cc.CASA_videoid);
vd.src = window.URL.createObjectURL(stream);
vd.play();} );
}
else if ( navigator.mozGetUserMedia) {
navigator.mozGetUserMedia(constraint,function(stream) {
var vd = parent.document.getElementById(cc.CASA_videoid);
vd.src = window.URL.createObjectURL(stream);
vd.play();} );
}
else if ( navigator.msGetUserMedia ) {
navigator.msGetUserMedia(constraint,function(stream) {
var vd = parent.document.getElementById(cc.CASA_videoid);
vd.src = window.URL.createObjectURL(stream);
vd.play();} );
}
}
}
}
function onMEDIAPreview(cc)
{
var video = parent.document.getElementById(cc.CASA_videoid);
var canvas = parent.document.getElementById('CA_'+cc.CASA_id);
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
}
function iccIMGUPLOAD(cc,id,valueprop,fileinfoprop)
{
cc.CASA_valueprop = valueprop;
cc.CASA_id = id;
cc.CASA_fileinfoprop = fileinfoprop;
}
function onIMAGEPreview(cc,file)
{
var img = parent.document.getElementById("CA_"+cc.CASA_id);
if (!file.type.match(/image.*/)) {
return;
}
img.file = file;
var reader = new FileReader();
reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
reader.readAsDataURL(file);
setPropertyValue(cc.CASA_valueprop + ".contentid", file.name );
if ( cc.CASA_fileinfoprop != null ) {
setPropertyValue(cc.CASA_fileinfoprop, file.name + " " + file.size + " " + file.type );
updateModelListenersS();
}
}
function onIMAGEUpload(cc)
{
var dataURL = parent.document.getElementById('CA_'+cc.CASA_id).src;
var formData = new FormData();
formData.append("imageData", dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""));
formData.append("SESSIONID", parent.parent.getCurrentSessionId());
formData.append("MEDIA", getPropertyValue(cc.CASA_valueprop + ".contentid"));
performAjaxSubmit(formData, cc.CASA_valueprop + ".onUpload");
}
function onMEDIAUpload(cc)
{
var dataURL = parent.document.getElementById('CA_'+cc.CASA_id).toDataURL("image/png");
var formData = new FormData();
formData.append("imageData", dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
formData.append("SESSIONID", parent.parent.getCurrentSessionId());
formData.append("MEDIA", cc.CASA_valueprop + ".png");
setPropertyValue(cc.CASA_valueprop +".contentid", cc.CASA_valueprop + ".png");
performAjaxSubmit(formData, cc.CASA_valueprop + ".onUpload");
}
function performAjaxSubmit(formdata, method)
{
var xhr = new XMLHttpRequest();
xhr.open("POST","../servlet/MediaUpload", true);
xhr.send(formdata);
xhr.onload = function(e) {
if (this.status == 200) {
invokeMethodInModel(method);
}
};
}
function iccVIDEO(cc,romumethod,valueprop,videotypeprop,autoplayprop)
{
if ( romumethod != null && romumethod != undefined) registerListener(romumethod);
if ( valueprop != null ) cc.CASA_valueprop = valueprop;
if ( videotypeprop != null )cc.CASA_videotypeprop = videotypeprop;
if ( autoplayprop != null ) cc.CASA_autoplayprop = autoplayprop;
}
function romuVIDEO(cc)
{
if (cc == null) return;
if (cc.CASA_valueprop != null)
{
var vVideo = getPropertyValue(cc.CASA_valueprop);
if (vVideo != cc.CASA_lastVideo)
{
cc.src = vVideo;
cc.CASA_lastVideo = vVideo;
}
}
if (cc.CASA_videotypeprop != null)
{
var vVideoType = getPropertyValue(cc.CASA_videotypeprop);
if (vVideoType != cc.CASA_lastVideoType)
{
cc.type = vVideoType;
cc.CASA_lastVideoType = vVideoType;
}
}
if (cc.CASA_autoplayprop != null)
{
var vAutoplay = getPropertyValue(cc.CASA_autoplayprop);
if (vAutoplay != cc.CASA_lastAutoplay)
{
if (vAutoplay == "true")
{
cc.autoplay = true;
cc.CASA_lastAutoplay = vAutoplay;
}
else
{
cc.autoplay = false;
cc.CASA_lastAutoplay = vAutoplay;
}
cc.load();
}
}
}
