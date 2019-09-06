function addVersionInfoBM_IMAGEOUTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BM_IMAGEOUTCONTROLS');
}
function iccIMAGEOUT(cc,romumethod,valueprop,titleprop,styleclasses,style,width,height,testtoolid)
{
cc.CASA_valueprop = valueprop;
cc.CASA_testtoolid = testtoolid;
if (width != null) cc.CASA_width = width;
if (height != null) cc.CASA_height = height;
if (titleprop != null) cc.CASA_titleprop = titleprop;
if (styleclasses != null) cc.CASA_styleclasses = styleclasses;
if (style != null) cc.CASA_style = style;
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
if (cc.CASA_width != null) vwidth = "width=\""+C_adjustUnits(cc.CASA_width)+"\" ";
var vheight = "";
if (cc.CASA_height != null) vheight = "height=\""+C_adjustUnits(cc.CASA_height)+"\" ";
var vTitleAttr = "";
if(vTitle != null) vTitleAttr = "title=\""+convertApos(vTitle)+"\" ";
var vClass = "img-responsive";
if ( cc.CASA_styleclasses != null ) vClass = vClass + " " + cc.CASA_styleclasses;
vClass = "class=\""+vClass+"\" ";
var vStyle = "";
if ( cc.CASA_style != null ) vStyle = "style=\""+vStyle+"\" ";
cc.innerHTML = "<img "+"src=\""+v+"\" "+vTitleAttr+vwidth+vheight+vClass+vStyle+" " + getTesttoolidHtml()+ "=\'" + cc.CASA_testtoolid + "\' >";
cc.CASA_memValue = v;
}
