// Copyright (c) Software AG, Darmstadt
var cc = null;
var gmap = null;
var gmama = null;
//var mids = [];
// number of added markers
var mco = 0;
//currently added markers
var ms = [];
//marker-queue (on init)
var q = [];
var geocoder = null;
//lastSelectedMarker
var lSM = null;

// GOOGLEMAP1 (all GM1 methods have been moved to the bottom of this file)
var gm1 = false;
var initCounter = 0;
//waitingForAddress (true if geocoding is pending, false otherwise)
var wFA = false;

// Google map 3
var gm3 = false;
var marker;
var infoWindow=null;

function reactOnLoad()
{
}

/**
 * init(width,height,mapsize,maptype,window)
 */
function init(w,h,ms,mt,fcc)
{
  if(fcc==undefined)
  {
	if ((gm1==false) && (initV3(w,h,ms,mt,fcc) == true))
	{
	  gm3 = true;
	  return true;
	}
	gm1 = true;
	cc = {};
  }
  else
  {
    cc = fcc;
  }

  try
  {
    if(gm1)
    {
      if (initCounter > 1) return true;
      initCounter++;
    }
    else
    {
      if (cc.CASA_init) return;
      cc.CASA_init = true;
    }

    var map = document.getElementById("map");
    map.style.width = w;
    map.style.height = h;

    try
    {
      gmap = new GMap2(map);
      if(!gm1) GEvent.addListener(gmap,"click",hCOM);
    }
    catch (eexxcc)
    {
      gmap = new GMap(map); // compatibity
    }

    if (ms == "large")
    {
      gmap.addControl(new GLargeMapControl());
    }
    else
    {
      gmap.addControl(new GSmallMapControl());
    }
    if (mt == "2")
    {
      gmap.addControl(new GMapTypeControl());
    }
  }
  catch (exc)
  {
    cc.CASA_error = "INITIALIZATION\n\n"+excToString(exc);
    handleError();
    return false;
  }

  return true;
}

/**
 * Translating an address to its lat/lng is an asynchronous process!
 * geocode(address,listener)
 */
function geocode(a,l,args)
{
  wFA = true;
  geocoder.getLatLng(
    a,
    function(p)
    {
      l(p,args);
      wFA = false;
    }
  );
}

/**
 * getGEOCODER
 */
function getGC()
{
  if(geocoder == null)
  {
    try
    {
      geocoder = new GClientGeocoder();
    }
    catch (exc)
    {
      cc.CASA_error = "GEOCODER\n\n"+excToString(exc);
      handleError();
      return false;
    }
  }

  return true;
}

/**
 * centerAndZoomAddressGM2(address,zoomlevel) (GOOGLEMAP2)
 */
function centerAndZoomAddressGM2(a,z)
{
  if(!getGC()) { return; }
  hideHintANF();

  if(!a) { showHintANF(a); }

  try
  {
    geocode(
      a,
      function(p)
      {
        if (p)
        {
          return centerAndZoomGM2(p.lat(),p.lng(),z);
        }
        else
        {
          showHintANF(a);
          return false;
        }
      }
    );
  }
  catch (exc)
  {
    wFA = false;
    cc.CASA_error = "GEOCODE ('"+a+"').\n\n"+excToString(exc);
    handleError();
    return false;
  }
  return true;
}

/**
 * Method displays hint if an address could not be found.
 */
function showHintANF(a)
{
  var hint = document.createElement( "div" );
  hint.id = "HintANF";
  hint.innerHTML = "The following address could not be resolved: '" + a + "'";
  hint.style.position = "absolute";
  hint.style.left = "10px";
  hint.style.top = "10px";
  hint.style.padding = "5px";
  hint.style.backgroundColor = "#FFFFFF";
  hint.style.color = "#FF0000";
  document.getElementsByTagName("body")[0].appendChild( hint );
}

/**
 * Method removes "address not found" hint if it is visible.
 */
function hideHintANF()
{
  var hint = document.getElementById("HintANF");
  if(hint!=null)
  {
    hint.parentNode.removeChild(hint);
  }
}

/**
 * centerAndZoomGM2(x,y,zoomlevel) (GOOGLEMAP2)
 */
function centerAndZoomGM2(lat,lng,z)
{
  try
  {
    showMap();
    if (z == null || z == "") z = 4;

    try
    {
      // version 2
      var glatlng = new GLatLng(lat,lng);
      gmap.setCenter(glatlng, z);
    }
    catch (eexxcc)
    {
      // compatibility (v1)
      var gpoint = new GPoint(lat,lng);
      gmap.centerAndZoom(gpoint, z);
    }
  }
  catch (exc)
  {
    cc.CASA_error = "CENTER(lat="+lat+",lng="+lng+",z="+z+")\n\n"+excToString(exc);
    handleError();
    return false;
  }
  return true;
}

/**
 * zoom(zoomlevel)
 */
function zoom(z)
{
  gmap.setZoom(z);
}

/**
 * HandleClickOnMap(marker,point)
 */
function hCOM(m, p)
{
  setLSP(p);
  hCOMa(m);
}

/**
 * SetLastSelectedPoint(point)
 */
function setLSP(p)
{
  if(p != null)
  {
    parent.C.setPropertyValue(cc.CASA_infoPropName+".lastSelectedPoint", p.lat()+","+p.lng());
  }
}

/**
 * HandleMarkerDrag(marker,point)
 */
function hMD(m,p)
{
  setLSP(p);
  hMA(m);
  parent.C.invokeMethodInModel(cc.CASA_infoPropName+".reactOnMarkerDrag");
}

/**
 * HandleClickOnMarker(marker)
 */
function hCOMa(m)
{
  var da = (lSM!=null); // true if a marker was active

  hMA(m);

  if(m!=null)
  {
    parent.C.invokeMethodInModel(cc.CASA_infoPropName+".reactOnMarkerSelect");
  }
  else if(da) // force flush if a button was active and is now deactivated
  {
    parent.C.submitModel("submit");
  }
}

/**
 * HandleMarkerActivation(marker)
 */
function hMA(m)
{
  lSM = m;

  var id;
  if(lSM==null)
  {
    id = "null";
  }
  else
  {
    id = m.id;
    if((m.CASA_infoText!=null)&&(m.CASA_infoText!=""))
    {
      m.openInfoWindowHtml(m.CASA_infoText);
    }
    else
    {
      gmap.closeInfoWindow();
    }
  }

  parent.C.setPropertyValue(cc.CASA_infoPropName+".lastSelectedMarker", id);
}

/**
 * setLastSelectedMarker(lastSelectedMarkerId)
 */
function setLSM(lSMId)
{
  if(lSMId==""||lSMId==null)
  {
    gmap.closeInfoWindow();
    lSM = null;
    return;
  }

  lSM = getMarkerById(lSMId);
  if(lSM==null)
  {
    setTimeout("setLSM("+lSMId+")",100);
    return;
  }
  hMA(lSM);
}

function getMarkerCount()
{
  return mco;
}

/**
 * CreateGMarkerManager()
 */
function cGMaMa()
{
  if(gmama==null)
  {
    try
    {
      gmama = new GMarkerManager(gmap,{trackMarkers: true});
    }
    catch (exc)
    {
    }
  }
}

/**
 * GMarkerManagerQueue(fails)
 */
function gmamaq(f)
{
  if(q.length>0)
  {
    f++;
    var m = q.pop();
    setNewMarker(m.p,m.args,f);
  }
}

/**
 * setNewMarker(point,args,fails)
 * args: [0]=marker-id, [1]=infoText, [2]=draggable, [3]=markerIcon
 */
function setNewMarker(p,args,f)
{
  cGMaMa();
  if(gmama==null)
  {
    if(!f) var f = 0;

    if(f<50)
    {
      q.push({p: p,args: args});
      setTimeout("gmamaq("+f+")", 200);
    }
    else
    {
      cc.CASA_error = "GMarkerManager is not available.";
      handleError();
    }
    return false;
  }

  var mOp = {draggable: true};

  if(args[3] != "")
  {
    try
    {
      gmi = new GIcon(G_DEFAULT_ICON,args[3]);
      var gmis = new GSize(16,16);
      gmi.iconSize = gmis;
      mOp.icon = gmi;
    }
    catch (eee) {}
  }

  var m = new GMarker(p,mOp);
  m.id = args[0];
  ms.push(m);
  mco++;
  gmama.addMarker(m,5);
  m.CASA_infoText = args[1];

  // add drag listener
  GEvent.addListener(m,"dragstart",function() {
    gmap.closeInfoWindow();
  });

  GEvent.addListener(m,"dragend",function() {
    hMD(m,m.getPoint());
  });

  if(args[2] == "true")
  {
    m.enableDragging();
  }
  else
  {
    m.disableDragging();
  }

  return true;
}

/**
 * setMarker(point,args)
 * args: [0]=marker-id, [1]=infoText, [2]=draggable
 */
function setMarker(p,args)
{
  var m = getMarkerById(args[0]);
  if(m == null) return;

  m.setPoint(p);
  m.CASA_infoText = args[1];

  if(args[2] == "true")
  {
    m.enableDragging();
  }
  else
  {
    m.disableDragging();
  }

  return true;
}

/**
 * addMarkerInfo(markerId,addressMode,coordPropValue,infoText,draggable,markerIcon)
 */
function addMarkerInfo(id,am,cpv,info,dr,mi)
{
  if(getMarkerById(id)==null)
  {
    addMarker(id,am,cpv,info,dr,mi);
  }
  else
  {
    updateMarker(id,am,cpv,info,dr,mi);
  }
}

/**
 * addMarker(markerId,addressMode,coordPropValue,infoText,draggable,markerIcon)
 */
function addMarker(id,am,cpv,info,dr,mi)
{
  var arg = new Array(id,info,dr,mi);

  if(am == "true")
  {
    geocode(cpv,setNewMarker,arg);
  }
  else
  {
    var c = cpv.split(",");
    setNewMarker(new GLatLng(c[0],c[1]),arg);
  }
}

/**
 * updateMarker(markerId,addressMode,coordPropValue,infoText,draggable,markerIcon)
 */
function updateMarker(id,am,cpv,info,dr,mi)
{
  var arg = new Array(id,info,dr,mi);
  if(am == "true")
  {
    geocode(cpv,setMarker,arg);
  }
  else
  {
    var c = cpv.split(",");
    setMarker(new GLatLng(c[0],c[1]),arg);
  }
}

function getMarkerById(id)
{
  var m = null;
  for(var i=0;i<ms.length;i++)
  {
    if(ms[i].id == id)
    {
      m = ms[i];
      break;
    }
  }
  return m;
}

function clearMarkers()
{
  mco = 0;
  lSM = null;
  gmap.closeInfoWindow();
  // a gmama.clearMarkers() would be nice at this position, but this
  // functionality isn't supported by the GMap API at the point of this writing.
  while(ms.length > 0)
  {
    var m = ms.pop();
    // move marker out of visible area
    m.setPoint(new GLatLng(90,0));
  }
}

function hideMap()
{
  var map = document.getElementById("map");
  if (map.style.display != "none") map.style.display = "none";
}

function showMap()
{
  var map = document.getElementById("map");
  if (map.style.display != "") map.style.display = "";
}

function handleError()
{
  if(cc.CASA_error != undefined && cc.CASA_error != "")
  {
    // remove comment from the line below to see errors
    //alert( "GMap2-Error: "+cc.CASA_error );
    cc.CASA_error = "";
  }
}

function excToString(exc)
{
  var str = "";
  for (var id in exc)
      str += exc[id] + "\n";
      return str;
}

//  Google maps V3

function openInfoWindowV3 (text)
{
  if (text == null || text == "") return;
    text = text.replace(/\r\n/g,"<br>");
  text = text.replace(/\n/g,"<br>");

  if (infoWindow==null)infoWindow = new google.maps.InfoWindow();
  infoWindow.setContent(text);
  infoWindow.open(gmap,marker);
}



function centerAndZoomAddressV3(address, zoomFac)
{
  showMap();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
	  gmap.setCenter(results[0].geometry.location);
	  marker.setPosition(results[0].geometry.location);
    }
  });
  gmap.setZoom(zoomFac);
}


function setZoomV3 (zoomFac)
{
   gmap.setZoom(zoomFac);
}


function centerAndZoomV3(x,y,zoomFac)
{
   var coord = new google.maps.LatLng(y,x);
   gmap.setCenter(coord);
   marker.setPosition(coord);
   gmap.setZoom(zoomFac);
}


function initV3(width,height,controltype, mapmode)
{
    if (initCounter >= 1) return true;
      initCounter++;
	try
	{
      geocoder = new google.maps.Geocoder();

      var map = document.getElementById("map");
      map.style.width = width;
      map.style.height = height;
	  var zoomStyle =  { style: google.maps.ZoomControlStyle.DEFAULT};
	  var panControl = true;
	  var streetView = true;
	  if (controltype=='small') {
	    zoomStyle =  { style: google.maps.ZoomControlStyle.SMALL};
		panControl = false;
		streetView = false;
      }
	  var maptype = false;
	  if (mapmode=='2') maptype = true;


	  var zoomFac = 4;
      var mapOptions = {
			mapTypeControl: maptype,
            navigationControl: true,
			streetViewControl: streetView,
			zoomControl: true,
            zoomControlOptions: zoomStyle,
			panControl: panControl,
            zoom: zoomFac,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        gmap = new google.maps.Map(map, mapOptions);

	    marker = new google.maps.Marker({
            map: gmap
        });
	  }
	  catch (exc)
	  {
		var error = "Exception in init google maps api V3\n\n"+excToString(exc);
	    return error;
	  }
  return true;
}



// GOOGLEMAP1 ######

/**
 * centerAndZoomAddress(address,zoomlevel,noclearoverlays,markericon,nocenter,markertext)
 */
function centerAndZoomAddress(a,z,nco,mi,nc,mt)
{
  if (gm3)return centerAndZoomAddressV3(a,z,nco);
  if(!getGC()) { return; }
  hideHintANF();

  if(!a) { showHintANF(''); }

  try
  {
    geocode(
      a,
      function(p)
      {
        if (p)
        {
          return centerAndZoom(p.x,p.y,z,nco,mi,nc,mt);
        }
        else
        {
          showHintANF(a);
          return false;
        }
      }
    );
  }
  catch (exc)
  {
    wFA = false;
    cc.CASA_error = "GEOCODER\n\n"+excToString(exc);
    handleError();
    return cc.CASA_error;
  }
}

/**
 * centerAndZoom(x,y,zoomlevel,noclearoverlays,markericon,nocenter,markertext)
 */
function centerAndZoom(x,y,z,nco,mi,nc,mt)
{
  showMap();
  if (gm3) return centerAndZoomV3(x,y,z);
  try
  {
    if(nco != true) { gmap.clearOverlays(); }

    if (z == null || z == "") { z = 4; }

    try
    {
      // version 2
      var glatlng = new GLatLng(y*1,x*1);
      if (nc != true) { gmap.setCenter(glatlng, z); }
      var gmopt = new Object();
      if (mt != null) { gmopt.title = mt; }
      gmopt.clickable = false;
      if (mi != undefined)
      {
        try
        {
          gmarkericon = new GIcon(G_DEFAULT_ICON,mi);
          var giconsize = new GSize(16,16);
          gmarkericon.iconSize = giconsize;
          gmopt.icon = gmarkericon;
        }
        catch (eee) {}
      }
      gmap.addOverlay(new GMarker(glatlng,gmopt));
    }
    catch (eexxcc)
    {
      // version 1 compatibility !!!
      var gpoint = new GPoint(x,y);
      gmap.centerAndZoom(gpoint, z);
      gmap.addOverlay(new GMarker(gpoint));
    }
  }
  catch (exc)
  {
    cc.CASA_error = "GOOGLEMAP Control\nError calling GMap.centerAndZoom\nLongitude = "+x+"\nLatitude = "+y+"\nZoomlevel = "+zoomlevel+"\n\n"+excToString(exc);
    handleError();
    return cc.CASA_error;
  }
}

/**
 * openInfoWindow(text)
 */
function openInfoWindow(text)
{
  if (gm3) return openInfoWindowV3 (text);
  if (text == null || text == "") return;
  text = text.replace(/\r\n/g,"<br>");
  text = text.replace(/\n/g,"<br>");

  if( wFA )
  {
    window.setTimeout("openInfoWindow('"+text+"')", 100);
    return;
  }

  try
  {
    // version 2
    gmap.openInfoWindowHtml(gmap.getCenter(), text);
  }
  catch (exc)
  {
    // version 1 compatibility
    gmap.openInfoWindowHtml(gmap.getCenterLatLng(), text);
  }
}
