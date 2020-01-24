function addVersionInfoGOOGLEMAPCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('GOOGLEMAPCONTROLS');
}
var controls = new Object();
function iccGOOGLEMAP(cc,infoPropName)
{
cc.CASA_infoPropName = infoPropName;
cc.CASA_init = false;
cc.CASA_error = "";
cc.CASA_currentLat = null;
cc.CASA_currentLng = null;
cc.CASA_currentAddress = null;
cc.CASA_currentZoom = null;
cc.CASA_updateCount = 0;
controls[cc.id] = cc;
}
function romuGOOGLEMAP(cc)
{
if( cc.CASA_init == false )
{
initMap(cc);
}
else
{
updateMap(cc);
}
}
function initMap(cc)
{
if(typeof cc != "object")
{
cc = controls[cc];
}
if(cc.CASA_win == null)
{
cc.CASA_win = parent.frames[cc.name];
}
if (cc.CASA_win == null || cc.CASA_win.init == null || cc.CASA_updateCount == 0)
{
cc.CASA_updateCount++;
if (cc.CASA_updateCount < 100)
{
setTimeout("initMap('"+cc.id+"')", 200);
}
else
{
cc.CASA_error = "Initialisation timeout: Map didn't load within 20 seconds.";
cc.CASA_win.handleError(cc);
}
return;
}
var mapsize = getPropertyValue(cc.CASA_infoPropName+".mapsize");
var maptype = getPropertyValue(cc.CASA_infoPropName+".maptype");
var result = cc.CASA_win.init(cc.CASA_width,cc.CASA_height,mapsize,maptype,cc);
if (!result)
{
cc.CASA_win.handleError(cc);
return;
}
updateMap(cc);
}
function updateMap(cc)
{
var ok = updateMapView(cc);
if(ok)
{
updateMapMarkers(cc);
}
cc.CASA_win.handleError(cc);
}
function updateMapView(cc)
{
var zoomlevel = getPropertyValue(cc.CASA_infoPropName+".zoomlevel");
try
{
zoomlevel = parseInt(zoomlevel);
}
catch( excc )
{
cc.CASA_error = "Property ZOOMLEVEL has an illegal value: "+zoomlevel;
return false;
}
var zoom = false;
var address = getPropertyValue(cc.CASA_infoPropName+".address");
if((address != null) && (address != ""))
{
if(address != cc.CASA_currentAddress)
{
cc.CASA_currentAddress = address;
cc.CASA_currentLat = null;
cc.CASA_currentLng = null;
return cc.CASA_win.centerAndZoomAddressGM2(address,zoomlevel);
}
else
{
zoom = true;
}
}
else
{
var latitude = getPropertyValue(cc.CASA_infoPropName+".latitude");
var longitude = getPropertyValue(cc.CASA_infoPropName+".longitude");
if((latitude != "") && (longitude != ""))
{
if((latitude != cc.CASA_currentLat) || (longitude != cc.CASA_currentLng))
{
cc.CASA_currentLat = latitude;
cc.CASA_currentLng = longitude;
cc.CASA_currentAddress = null;
return cc.CASA_win.centerAndZoomGM2(latitude,longitude,zoomlevel);
}
else
{
zoom = true;
}
}
else
{
cc.CASA_win.hideMap();
}
}
if(zoom && (zoomlevel != cc.CASA_currentZoom))
{
cc.CASA_currentZoom = zoomlevel;
cc.CASA_win.zoom(zoomlevel);
}
return true;
}
function updateMapMarkers(cc)
{
try
{
var clear = getPropertyValue(cc.CASA_infoPropName+".clear");
if( clear == "true" )
{
cc.CASA_win.clearMarkers();
setPropertyValue(cc.CASA_infoPropName+".clear","false");
}
var i = 0;
while(true)
{
var id = getPropertyValue(cc.CASA_infoPropName+".items["+i+"].id");
if(id==null) break;
var am = getPropertyValue(cc.CASA_infoPropName+".items["+i+"].addressMode");
var a = getPropertyValue(cc.CASA_infoPropName+".items["+i+"].coordPropValue");
var info = getPropertyValue(cc.CASA_infoPropName+".items["+i+"].infoText");
var dr = getPropertyValue(cc.CASA_infoPropName+".items["+i+"].draggable");
var mi = getPropertyValue(cc.CASA_infoPropName+".items["+i+"].markerIcon");
cc.CASA_win.addMarkerInfo(id,am,a,info,dr,mi);
i++;
}
var selectedMarker = getPropertyValue(cc.CASA_infoPropName+".lastSelectedMarkerId");
cc.CASA_win.setLSM(selectedMarker);
}
catch(exc)
{
cc.CASA_error = "MARKERUPDATE\n\n"+excToString(exc);
return false;
}
return true;
}
function excToString(exc)
{
var str = "";
for (var id in exc)
str += exc[id] + "\n";
return str;
}
