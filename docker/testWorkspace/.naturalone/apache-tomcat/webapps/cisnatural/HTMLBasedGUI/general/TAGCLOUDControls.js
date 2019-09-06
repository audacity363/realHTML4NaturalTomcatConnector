function addVersionInfoTAGCLOUDCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TAGCLOUDCONTROLS');
}
function iccTAGCLOUD(cc, tagcloudprop, id)
{
cc.CASA_tagcloudprop = tagcloudprop;
cc.CASA_id = id;
cc.CASA_classNameOverTag = "TAGCLOUDOverTag";
}
function romuTAGCLOUD(cc)
{
var vci = getPropertyValue(cc.CASA_tagcloudprop+".changeIndex");
if (cc.CASA_memChangeIndex == vci) return;
cc.CASA_memChangeIndex = vci;
var csv = getPropertyValue(cc.CASA_tagcloudprop+".tagCloudItems");
var allTags = decodeCSVStringUsingBuffer(csv);
var spanStyle = "cursor:pointer;"
var textcolor = getPropertyValue(cc.CASA_tagcloudprop+".textcolor");
if(textcolor != null && textcolor != "")
{
spanStyle += "color:"+textcolor;
}
spanStyle = "style=\""+spanStyle+"\"";
var res = [];
for (var i=0; i<allTags.length; i+=2)
{
genereateHTMLForTagTAGCLOUD(cc, allTags[i], allTags[i+1], spanStyle, res, cc.CASA_tagcloudprop);
}
cc.innerHTML = res.join("");
}
function genereateHTMLForTagTAGCLOUD(cc, tagName, tagPop, spanStyle, res, tagcloudprop)
{
var classStr = "TAGCLOUDSpan"+tagPop;
var classAttr = "class=\"TAGCLOUDSpan"+tagPop+"\"";
res.push("<span onclick='reactOnClick"+cc.CASA_id+"(\""+tagName+"\");' class=\""+classStr+"\" ");
res.push(spanStyle);
res.push(" onmouseover=\"C.mouseOverTAGCLOUD(this, '"+classStr+"', CC"+cc.CASA_id+")\" onmouseout=\"C.mouseOutTAGCLOUD(this, '"+classStr+"')\"");
res.push(">");
res.push(tagName);
res.push("</span> ");
}
function mouseOverTAGCLOUD(el, classStr, cc)
{
el.className = classStr + " " +cc.CASA_classNameOverTag;
}
function mouseOutTAGCLOUD(el, classStr)
{
el.className = classStr;
}
function reactOnClickTAGCLOUD(cc, tagName)
{
setPropertyValue(cc.CASA_tagcloudprop+".selectedTagName", tagName);
invokeMethodInModel(cc.CASA_tagcloudprop+".trigger");
}
