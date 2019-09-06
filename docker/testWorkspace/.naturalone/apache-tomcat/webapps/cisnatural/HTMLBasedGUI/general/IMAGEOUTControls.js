function addVersionInfoIMAGEOUTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('IMAGEOUTCONTROLS');
}
function flexCreateControlIMAGEOUT(params)
{
var vid = params["CONTROLID"];
var vd = parent.createElement("TD");
var vspan = parent.createElement("SPAN");
vd.appendChild(vspan);
vid = "IO_"+vid;
vspan.id = vid;
parent[vid] = vspan;
if (params["valign"] != null) vd.vAlign = params["valign"];
if (params["align"] != null) vd.align = params["align"];
var vromu = parent.createFunction("romu"+vid,"model","C.romuIMAGEOUT("+vid+");");
iccIMAGEOUT(vspan,vromu,params["valuepropp"],null,null,params["titlepropp"],params["valuepropp"]);
var result = new Object();
result.cell = vd;
result.control = vspan;
return result;
}
function flexRemoveIMAGEOUT(vid)
{
parent[vid] = undefined;
parent["romu"+vid] = undefined;
removeListener(vid);
}
function iccIMAGEOUT(cc,romumethod,valueprop,width,height,titleprop,testtoolid)
{
cc.CASA_valueprop = valueprop;
cc.CASA_testtoolid = testtoolid;
if (width != null) cc.CASA_width = width;
if (height != null) cc.CASA_height = height;
if(titleprop != null) cc.CASA_titleprop = titleprop;
registerListener(romumethod);
cc.innerHTML = "";
cc.CASA_memValue = undefined;
}
function romuIMAGEOUT(cc)
{
var v = getPropertyValue(cc.CASA_valueprop);
var vTitle = null;
if(cc.CASA_titleprop != null) vTitle = getPropertyValue(cc.CASA_titleprop);
if (v == cc.CASA_memValue && vTitle == cc.CASA_memTitleValue) return;
cc.CASA_memTitleValue = vTitle;
if (v == null || v == "")
{
cc.CASA_memValue = v;
cc.innerHTML = "";
return;
}
var vwidth = "";
if (cc.CASA_width != null) vwidth = "width=\""+C_adjustUnits(cc.CASA_width)+"\"";
var vheight = "";
if (cc.CASA_height != null) vheight = "height=\""+C_adjustUnits(cc.CASA_height)+"\"";
var vTitleAttr = "";
if(vTitle != null) vTitleAttr = " title='"+convertApos(vTitle)+"' ";
cc.innerHTML = "<img "+vTitleAttr+" src=\""+v+"\" "+vwidth+" "+vheight+" " + getTesttoolidHtml()+ "=\'" + cc.CASA_testtoolid + "\' >";
cc.CASA_memValue = v;
}
