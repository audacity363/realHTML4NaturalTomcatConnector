function addVersionInfoSUBPAGECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SUBPAGECONTROLS');
}
function iccSUBPAGE(cc,valueprop,xmlhttprequestheaderparamsprop,pageheightminus,pagewidthminus)
{
cc.CASA_memURL = undefined;
cc.CASA_memParams = undefined;
cc.CASA_valueprop = valueprop;
if (xmlhttprequestheaderparamsprop != null) cc.CASA_xmlhttprequestheaderparamsprop = xmlhttprequestheaderparamsprop;
if (pageheightminus != null) cc.CASA_pageheightminus = pageheightminus;
if (pagewidthminus != null) cc.CASA_pagewidthminus = pagewidthminus;
}
function romuSUBPAGE(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
if (v == null) v = '../HTMLBasedGUI/general/blankpage.html';
var vp = getPropertyValue(cc.CASA_xmlhttprequestheaderparamsprop);
if (vp == "") vp = undefined;
if (cc.CASA_memURL == v &&
cc.CASA_memParams == vp)
{
return;
}
cc.CASA_memURL = v;
cc.CASA_memParams = vp;
if (vp != undefined)
{
var queryParams = "";
try
{
var xhreq = createXMLHttpRequest();
xhreq.open("GET",v,true);
xhreq.onreadystatechange = function()
{
if (xhreq.readyState != 4) return;
var sr = xhreq.responseText;
cc.contentWindow.document.write(sr);
};
xhreq.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
vp = decodeCSVString(vp);
for (var j=0; j<vp.length; j+=2)
{
var pname = vp[j];
var pvalue = vp[j+1];
if (pname != null && pvalue != null)
{
xhreq.setRequestHeader(pname,pvalue);
queryParams += "&"+pname+"="+pvalue;
}
}
xhreq.send();
}
catch (e)
{
var len = queryParams.length;
if (len != 0 &&
v.indexOf("?") < 0)
{
queryParams = "?"+queryParams.substring(1,len);
}
cc.src = v+queryParams;
}
}
else
{
cc.src = v;
}
}
function rorSUBPAGE(cc)
{
if (cc.CASA_pageheightminus != null)
{
var vHeight = parent.innerHeight - calculateHeaderHeight() - calculateFooterHeight();
vHeight = vHeight - cc.CASA_pageheightminus;
if (vHeight < 0) vHeight = 0;
cc.height = vHeight;
}
if (cc.CASA_pagewidthminus != null)
{
var vWidth = parent.innerWidth;
vWidth = vWidth - cc.CASA_pagewidthminus;
if (vWidth < 0) vWidth = 0;
cc.width = vWidth
}
}
