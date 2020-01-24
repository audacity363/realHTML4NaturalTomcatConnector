function addVersionInfoABSCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('ABSCONTROLS');
}
function reactOnModelUpdateABS(casacontrol)
{
var vX = 0;
var vY = 0;
var vZ = 0;
if (casacontrol.CASA_x != undefined) vX = casacontrol.CASA_x;
if (casacontrol.CASA_y != undefined) vY = casacontrol.CASA_y;
if (casacontrol.CASA_z != undefined) vZ = casacontrol.CASA_z;
if (casacontrol.CASA_xprop != undefined) vX = getPropertyValue(casacontrol.CASA_xprop) *(-1)*(-1);
if (casacontrol.CASA_yprop != undefined) vY = getPropertyValue(casacontrol.CASA_yprop) *(-1)*(-1);
if (casacontrol.CASA_zprop != undefined) vZ = getPropertyValue(casacontrol.CASA_zprop) *(-1)*(-1);
if (casacontrol.CASA_xmem == vX && casacontrol.CASA_ymem == vY && casacontrol.CASA_zmem == vZ)
return;
casacontrol.CASA_xmem = vX;
casacontrol.CASA_ymem = vY;
casacontrol.CASA_zmem = vZ;
vDivAbove = findParentNodeWithTag(casacontrol,"DIV");
if (vDivAbove != null)
{
if (vDivAbove.CASA_pageoffsetleft == null) calculatePageOffset(vDivAbove);
vX += vDivAbove.CASA_pageoffsetleft;
vY += vDivAbove.CASA_pageoffsettop;
}
casacontrol.style.left = C_adjustUnits(vX);
casacontrol.style.top = C_adjustUnits(vY);
casacontrol.style.zIndex = vZ;
}
function reactOnModelUpdateABSDYNICON(casacontrol)
{
var v = getPropertyValue(casacontrol.CASA_valueprop);
if (v == null || v == "") v = "../HTMLBasedGUI/general/nothing.gif";
var vHeight = casacontrol.CASA_height; if (casacontrol.CASA_heightprop != null) vHeight = getPropertyValue(casacontrol.CASA_heightprop);
var vWidth = casacontrol.CASA_width; if (casacontrol.CASA_widthprop != null) vWidth = getPropertyValue(casacontrol.CASA_widthprop);
if (v == casacontrol.CASA_bufferedValue && vHeight == casacontrol.CASA_bufferedHeight && vWidth == casacontrol.CASA_bufferedWidth)
return;
casacontrol.CASA_bufferedValue = v;
casacontrol.CASA_bufferedHeight = vHeight;
casacontrol.CASA_bufferedWidth = vWidth;
var vIT = [];
if (casacontrol.CASA_method != null)
vIT.push("<a border=0 onclick='reactOnClick"+casacontrol.CASA_id+"();'>");
var vTitle = "";
if (casacontrol.CASA_title != null) vTitle = "title='"+convertApos(casacontrol.CASA_title)+"'";
if (vHeight != null)
vIT.push("<img border=0 "+vTitle+" src='"+v+"' height='"+C_adjustUnits(vHeight)+"' width='"+C_adjustUnits(vWidth)+"'>");
else
vIT.push("<img border=0 "+vTitle+" src='"+v+"'>");
if (casacontrol.CASA_method != null)
vIT.push("</a>");
casacontrol.innerHTML = vIT.join("");
}
function reactOnModelUpdateABSTEXTOUT(casacontrol)
{
var v = getPropertyValue(casacontrol.CASA_valueprop);
if (casacontrol.CASA_datatype != null)
{
if (casacontrol.CASA_datatype == "date") v = convertYYYYMMDDIntoDisplayString(v);
if (casacontrol.CASA_datatype == "time") v = convertHHMMSSIntoDisplayString(v);
if (casacontrol.CASA_datatype == "timestamp") v = convertYYYYMMDDHHMMSSIntoDisplayString(v);
}
if (v == null) v = "";
if (casacontrol.CASA_memV == v)
return;
casacontrol.CASA_memV = v;
v = convertTextOutABSTEXTOUT(v);
if (casacontrol.CASA_textsize != null)
v = "<font size='"+casacontrol.CASA_textsize+"'>" + v + "</font>";
if (casacontrol.CASA_textcolor != null)
v = "<font color='"+casacontrol.CASA_textcolor+"'>" + v + "</font>";
if (casacontrol.CASA_textoutstyle != null)
v = "<span style='"+casacontrol.CASA_textoutstyle+"'>" + v + "</span>";
casacontrol.innerHTML = v;
}
function reactOnModelUpdateABSTEXTOUT_DC(casacontrol)
{
reactOnModelUpdateABSTEXTOUT(casacontrol);
}
function convertTextOutABSTEXTOUT(v)
{
var vLeftLength = 3;
var vRightLength = 3;
var vindex1 = v.indexOf(">%>");
if (vindex1 < 0) { vindex1 = v.indexOf("&gt;%&gt;"); vLeftLength = 9; }
if (vindex1 > 0)
{
var vSpan1 = "";
var vSpan2 = "";
vSpan1 = v.substring(0,vindex1);
v = v.substring(vindex1+vLeftLength,v.length);
var vindex2 = v.indexOf("<%<");
if (vindex2 < 0) { vindex2 = v.indexOf("&lt;%&lt;"); vRightLength = 9; }
if (vindex2 >= 0)
{
vSpan2 = v.substring(vindex2+vRightLength,v.length);
v = v.substring(0,vindex2);
}
if (vindex1 >= 0 && vindex2 >= 0)
{
var vv = [];
var i;
for (i=0; i<v.length-1; i=i+2)
{
var vcai = v.charAt(i);
var vcaip1 = v.charAt(i+1);
if (vcaip1 == " ") vcaip1 = "&nbsp;";
if      (vcai  == "R") vv.push("<b><font color='#FF0000'>"+ vcaip1 +"</font></b>");
else if (vcai  == "G") vv.push("<b><font color='#00FF00'>"+ vcaip1 +"</font></b>");
else if (vcai  == "B") vv.push("<b><font color='#0000FF'>"+ vcaip1 +"</font></b>");
else                     vv.push(vcaip1);
}
v = vv.join("");
v = vSpan1 + v + vSpan2;
}
}
return v;
}
function findParentNodeWithTag(pControl,pTagName)
{
if (pControl == null) return null;
vParent = pControl.parentNode;
if (vParent.tagName == pTagName) return vParent;
if (vParent == pControl)  return null;
return findParentNodeWithTag(vParent,pTagName);
}
