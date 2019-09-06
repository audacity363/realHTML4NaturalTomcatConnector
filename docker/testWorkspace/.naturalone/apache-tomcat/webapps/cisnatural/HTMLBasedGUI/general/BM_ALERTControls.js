function addVersionInfoBM_ALERTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_ALERTCONTROLS');
}
function iccBM_ALERT(cc,romumethod,typeprop,shorttextprop,longtextprop,duration)
{
cc.CASA_typeprop = typeprop;
cc.CASA_shorttextprop = shorttextprop;
cc.CASA_longtextprop = longtextprop;
cc.CASA_duration = duration;
if (romumethod != null) registerListener(romumethod);
}
function romuBM_ALERT(cc)
{
if (cc == null) return;
var vType = getPropertyValue(cc.CASA_typeprop);
var vShortText = getPropertyValue(cc.CASA_shorttextprop);
var vLongText = getPropertyValue(cc.CASA_longtextprop);
if (vShortText == null) vShortText = "";
var message = vShortText;
var alertType = null;
if (vLongText != null) message = message + " " + vLongText;
if (vType == "S") alertType = "alert-success";
if (vType == "E") alertType = "alert-danger";
if (vType == "W") alertType = "alert-warning";
if ( alertType == null ) return;
showBM_ALERT(cc, message, alertType );
setPropertyValue(cc.CASA_typeprop,"");
setPropertyValue(cc.CASA_shorttextprop,"");
setPropertyValue(cc.CASA_longtextprop,"");
}
function showBM_ALERT(cc,message,alerttype)
{
cc.innerHTML = "<div id='alertdiv' class='alert " +  alerttype + "' ><a class='close' data-dismiss='alert'>x</a><span>"+message+"</span></div>";
setTimeout(function() { cc.innerHTML="";}, parseInt(cc.CASA_duration));
}
