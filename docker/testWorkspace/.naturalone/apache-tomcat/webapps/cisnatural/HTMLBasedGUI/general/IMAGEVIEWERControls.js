function addVersionInfoIMAGEVIEWERCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('IMAGEVIEWERCONTROLS');
}
function iccIMAGEVIEWER(cc, romumethod, valueprop, width, height, titleprop, loadMethod, moveMethod, zoominMethod, zoomoutMethod, tabindex)
{
cc.CASA_valueprop = valueprop + ".imageURL";
cc.CASA_rotation = valueprop + ".rotation";
cc.CASA_zoomFactor = valueprop + ".zoomFactor";
cc.CASA_xCenter = valueprop + ".xCenter";
cc.CASA_yCenter = valueprop + ".yCenter";
cc.CASA_imageWidth = valueprop + ".imageWidth";
cc.CASA_imageHeight = valueprop + ".imageHeight";
if ( width != null ) cc.CASA_width = width;
if ( height != null ) cc.CASA_height = height;
if ( titleprop != null ) cc.CASA_titleprop = titleprop;
if (loadMethod != null) cc.CASA_loadmethod = loadMethod;
if (moveMethod != null) cc.CASA_movemethod = moveMethod;
if (zoominMethod != null) cc.CASA_zoominmethod = zoominMethod;
if (zoomoutMethod != null) cc.CASA_zoomoutmethod = zoomoutMethod;
if (tabindex != null) cc.CASA_tabindex = tabindex;
registerListener( romumethod );
cc.innerHTML = "";
cc.CASA_memValue = undefined;
applyCasaTabIndex(cc, "IMAGEVIEWER");
}
function reactOnMouseWheel(e)
{
var event=window.event || e;
var delta = 0;
if (event.wheelDelta)
{
delta = event.wheelDelta/120;
if (window.opera)
delta = -delta;
}
else if (event.detail)
{
delta = -event.detail/3;
}
if (event.preventDefault)
event.preventDefault();
event.returnValue = false;
var targetElem = findSrcElement(event);
if (delta>0)
invokeMethodInModel(targetElem.CASA_zoominmethod);
else if (delta <0)
invokeMethodInModel(targetElem.CASA_zoomoutmethod);
}
function getCanvas(cc, image)
{
var canvas = null;
var canvasID = cc.id + '_canvas';
var found=false;
var imageChanged=true;
for(var vri = 0; vri < cc.childNodes.length; vri++)
{
if (cc.childNodes[vri].id==canvasID)
{
found = true;
canvas = cc.childNodes[vri];
if (image.CASA_img==canvas.CASA_img){
imageChanged = false;
}
}
}
if (!found)
{
canvas = document.createElement('canvas');
canvas.id = canvasID;
canvas.CASA_zoominmethod = cc.CASA_zoominmethod;
canvas.CASA_zoomoutmethod = cc.CASA_zoomoutmethod;
var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel";
if (document.attachEvent)
canvas.attachEvent("on"+mousewheelevt, reactOnMouseWheel)
else
canvas.addEventListener(mousewheelevt, reactOnMouseWheel, false);
cc.appendChild(canvas);
}
canvas.CASA_img = image.CASA_img;
if (imageChanged)
{
if ( image.title && image.title != null && image.title != "" )
{
canvas.title = image.title;
}
if ( cc.CASA_width != null && cc.CASA_height != null )
{
canvas.width = cc.CASA_width;
canvas.height = cc.CASA_height;
}
else if ( cc.CASA_width == null && cc.CASA_height != null )
{
var rel = image.width / image.height;
canvas.width  = cc.CASA_height * rel;
canvas.height = cc.CASA_height;
}
else if ( cc.CASA_width != null && cc.CASA_height == null )
{
var rel = image.width / image.height;
canvas.height = cc.CASA_width / rel;
canvas.width = cc.CASA_width;
}
else
{
canvas.width  = image.width;
canvas.height = image.height;
}
if ( canvas.width == 0 && canvas.height == 0 )
{
canvas.width  = image.width;
canvas.height = image.height;
}
setPropertyValue( cc.CASA_imageWidth, image.width );
setPropertyValue( cc.CASA_imageHeight, image.height );
if (cc.CASA_loadmethod != null)
{
window.setTimeout( function() { invokeMethodInModel(cc.CASA_loadmethod);}, 100);
}
cc.CASA_isMouseDown = false;
cc.CASA_originalCursor = 'default';
cc.onkeydown = function (event){
var ch = event.which || event.keyCode;
var vScrollBar = parent.document.getElementById("VSCROLL_" + (10000 + parseInt ( cc.id.substr(3),10)));
var hScrollBar = parent.document.getElementById("HSCROLL_" + (20000 + parseInt ( cc.id.substr(3),10)));
var zoomFactor = getPropertyValue( cc.CASA_zoomFactor );
switch (ch)
{
case 107:
var targetElem = findSrcElement(event);
invokeMethodInModel(targetElem.CASA_zoominmethod);
break;
case 109:
var targetElem = findSrcElement(event);
invokeMethodInModel(targetElem.CASA_zoomoutmethod);
break;
case 37:
if (hScrollBar!=null)
hScrollBar.scrollLeft -= 50;
break;
case 38:
if (vScrollBar!=null)
vScrollBar.scrollTop -= 50;
break;
case 39:
if (hScrollBar!=null)
hScrollBar.scrollLeft += 50;
break;
case 40:
if (vScrollBar!=null)
vScrollBar.scrollTop += 50;
break;
case 33:
if (vScrollBar!=null)
vScrollBar.scrollTop -= canvas.height;
break;
case 34:
if (vScrollBar!=null)
vScrollBar.scrollTop += canvas.height;
break;
case 35:
if (vScrollBar!=null)
vScrollBar.scrollTop = image.height*zoomFactor;
break;
case 36:
if (vScrollBar!=null)
vScrollBar.scrollTop = 0;
break;
}
}
canvas.onselectstart = function() {
return false;
}
canvas.getImage= function () {
return image;
}
canvas.onmousedown = function(event) {
cc.CASA_isMouseDown = true;
var posX = event.clientX;
var posY = event.clientY;
cc.CASA_startMouseDownXY = [posX, posY];
cc.CASA_originalCursor = this.style.cursor;
this.style.cursor = 'move';
}
canvas.onmouseup = function(event) {
if (!cc.CASA_isMouseDown) return;
cc.CASA_isMouseDown = false;
var posX = event.clientX;
var posY = event.clientY;
var dX = posX - cc.CASA_startMouseDownXY[0];
var dY = posY - cc.CASA_startMouseDownXY[1];
mouseMoveHandler( cc, image, dX, dY);
cc.CASA_startMouseDownXY = [];
this.style.cursor = cc.CASA_originalCursor;
if (cc.CASA_movemethod != null)
{
invokeMethodInModel(cc.CASA_movemethod);
}
}
canvas.onmouseout = function(event) {
cc.CASA_isMouseDown = false;
cc.CASA_startMouseDownXY = [];
this.style.cursor = cc.CASA_originalCursor;
}
canvas.onmousemove = function(event) {
if (!cc.CASA_isMouseDown) return;
var posX = event.clientX;
var posY = event.clientY;
var dX = posX - cc.CASA_startMouseDownXY[0];
var dY = posY - cc.CASA_startMouseDownXY[1];
mouseMoveHandler( cc, image, dX, dY);
cc.CASA_startMouseDownXY = [posX, posY];
}
}
return canvas
}
function createImage(cc, v, vTitleAttr)
{
var image = new Image();
image.id = cc.id + '_img';
image.title = vTitleAttr;
image.CASA_img = v;
image.onload = function()
{
paintImage(cc, image);
}
image.src = v;
}
function romuIMAGEVIEWER(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
var vTitle = null;
if ( cc.CASA_titleprop != null) vTitle = getPropertyValue(cc.CASA_titleprop);
if ( v == cc.CASA_memValue && vTitle == cc.CASA_memTitleValue ) return;
cc.CASA_memTitleValue = vTitle;
if ( v == null || v == "" )
{
cc.CASA_memValue = v;
cc.innerHTML = "";
return;
}
var vTitleAttr = "";
if ( vTitle != null ) vTitleAttr = convertApos(vTitle);
createImage( cc, v, vTitleAttr );
}
function mouseMoveHandler( cc, image, dX, dY )
{
if ( image != null )
{
var ccRotation    	= getPropertyValue( cc.CASA_rotation );
var ccZoomFactor	= getPropertyValue( cc.CASA_zoomFactor );
var ccXCenter     	= getPropertyValue( cc.CASA_xCenter );
var ccYCenter    	= getPropertyValue( cc.CASA_yCenter );
var rX = dX, rY = dY;
if ( ccRotation > 0 && ccRotation <= 90 )
{
rY = (-1) * dX; rX = dY;
}
else if ( ccRotation > 90 && ccRotation <= 180 )
{
rY = (-1) * dY; rX = (-1) * dX;
}
else if ( ccRotation > 180 && ccRotation <= 270 )
{
rY = dX; rX = (-1) * dY;
}
else if ( ccRotation > 270 && ccRotation <= 360 )
{
}
var canvas = getCanvas(cc, image);
rX = Math.round(rX / ccZoomFactor);
rY = Math.round(rY / ccZoomFactor);
var newX = ccXCenter - rX;
var newY = ccYCenter - rY;
checkAndSetProperties( cc, image, newX, newY, ccZoomFactor, ccRotation );
paintImage(cc, image);
}
return;
}
function checkAndSetProperties( cc, image, cX, cY, cZoom, cRotation )
{
if ( image != null )
{
cRotation = cRotation < 0 ? 0 : cRotation % 360;
cRotation = Math.floor(cRotation / 90) * 90;
var canvas = getCanvas(cc, image);
if ( cZoom <= -1 )
{
cZoom = Math.min(Math.min(canvas.width, canvas.height) / image.width, Math.min(canvas.width, canvas.height) / image.height);
}
else if ( cZoom <= 0 )
{
if ( cRotation == 90 || cRotation == 270 )
{
cZoom = Math.min(Math.min(canvas.width, canvas.height) / image.width, Math.min(canvas.width, canvas.height) / image.height);
}
else
{
cZoom = Math.min(canvas.width / image.width, canvas.height / image.height);
}
}
var maxX, maxY;
var minX = Math.ceil(canvas.width / (cZoom * 2));
var minY = Math.ceil(canvas.height / (cZoom * 2));
maxX = Math.max(minX, image.width - minX);
maxY = Math.max(minY, image.height - minY);
if ( cX > maxX )  {cX = maxX;}
if ( cY > maxY )  {cY = maxY;}
if ( cX < minX )  {cX = minX;}
if ( cY < minY )  {cY = minY;}
setPropertyValue( cc.CASA_zoomFactor, cZoom );
setPropertyValue( cc.CASA_rotation, Math.floor(cRotation) );
setPropertyValue( cc.CASA_xCenter, Math.floor(cX) );
setPropertyValue( cc.CASA_yCenter, Math.floor(cY) );
}
return;
}
function paintImage( cc, image )
{
var canvas = getCanvas(cc, image);
var curX		= getPropertyValue( cc.CASA_xCenter );
var curY		= getPropertyValue( cc.CASA_yCenter );
var curZoom	    = getPropertyValue( cc.CASA_zoomFactor );
var curRotation = getPropertyValue( cc.CASA_rotation );
checkAndSetProperties( cc, image, curX, curY, curZoom, curRotation );
var ccRotation		= getPropertyValue( cc.CASA_rotation );
var ccZoomFactor	= getPropertyValue( cc.CASA_zoomFactor );
var ccXCenter		= getPropertyValue( cc.CASA_xCenter );
var ccYCenter		= getPropertyValue( cc.CASA_yCenter );
if ( image && image != null && canvas && canvas != null )
{
var canvasContext = canvas.getContext('2d');
var dx = 0, dy = 0;
var dw = canvas.width;
var dh = canvas.height;
var sx = Math.ceil(ccXCenter - canvas.width / (ccZoomFactor * 2));
var sy = Math.ceil(ccYCenter - canvas.height / (ccZoomFactor * 2));
var sw = Math.floor(canvas.width / ccZoomFactor);
var sh = Math.floor(canvas.height / ccZoomFactor);
if ( sx + sw > image.width )
{
dw = dw * (image.width / (sx + sw));
sw = image.width - sx;
}
if ( sy + sh > image.height )
{
dh = dh * (image.height / (sy + sh));
sh = image.height - sy;
}
if ( dw < canvas.width )
{
dx = Math.floor((canvas.width - dw) / 2);
}
if ( dh < canvas.height )
{
dy = Math.floor((canvas.height - dh) / 2);
}
var mx = canvas.width / 2, my = canvas.height / 2;
canvasContext.save();
canvasContext.clearRect(0, 0, canvas.width, canvas.height);
canvasContext.translate(mx, my);
canvasContext.rotate( ccRotation * Math.PI / 180 );
canvasContext.translate(-mx, -my);
canvasContext.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
canvasContext.restore();
}
return;
}
