function addVersionInfoBUTTONLISTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('BUTTONLISTCONTROLS');
}
function iccBUTTONLIST(cc,id,romumethod,buttonlistprop,cti,tabindex,buttonstyle,pixeldistance,imageheight,imagewidth,testtoolid)
{
cc.CASA_id = id;
cc.CASA_buttonlistprop = buttonlistprop;
registerListener(romumethod);
if (cti != null) cc.CASA_cti = cti;
if (tabindex != null) cc.CASA_tabindex = tabindex;
if (buttonstyle != null) cc.CASA_buttonstyle = buttonstyle;
if (pixeldistance != null) cc.CASA_pixeldistance = pixeldistance;
if (imageheight != null) cc.CASA_imageheight = imageheight;
if (imagewidth != null) cc.CASA_imagewidth = imagewidth;
if (testtoolid != null) cc.CASA_testtoolid = testtoolid;
cc.CASA_prevChangeIndex = undefined;
}
function romuBUTTONLIST(cc)
{
var vChangeIndex = getPropertyValue(cc.CASA_buttonlistprop+".changeIndex");
if (cc.CASA_prevChangeIndex != undefined &&
cc.CASA_prevChangeIndex == vChangeIndex &&
cc.m_lastDir == m_direction)
return;
cc.CASA_prevChangeIndex = vChangeIndex;
cc.m_lastDir = m_direction;
var dirExt = '';
if (m_direction == 'rtl')
dirExt = 'RTL';
var vHTML = [];
vHTML.push("<table width='100%' cellpadding=0 cellspacing=0>");
var vCounter = 0;
var vButtonIds = [];
var vPixelDistance = 0;
if (cc.CASA_pixeldistance != null)
{
try { vPixelDistance = cc.CASA_pixeldistance * 1; } catch (exc) {}
}
var vAddFixStyle = "";
if (cc.CASA_buttonstyle != null) vAddFixStyle = cc.CASA_buttonstyle;
var vImageHeight = "";
if (cc.CASA_imageheight != null) vImageHeight = "height='"+C_adjustUnits(cc.CASA_imageheight)+"'";
var vImageWidth = "";
if (cc.CASA_imagewidth != null) vImageWidth = "width='"+C_adjustUnits(cc.CASA_imagewidth)+"'";
while (true)
{
var vProp = cc.CASA_buttonlistprop + ".items["+vCounter+"].";
vText = getPropertyValue(vProp+"text");
if (vText == null) break;
vImage = getPropertyValue(vProp+"imageurl");
vStyle = getPropertyValue(vProp+"style");
if (vCounter != 0 && vPixelDistance != 0)
vHTML.push("<tr><td><div style='font-size: 1px; height: "+C_adjustUnits(vPixelDistance)+"'></div></td></tr>");
var vClass = "";
var vSelected = getPropertyValue(vProp + "selected");
if (vSelected != null && (vSelected == true || vSelected == "true"))
{
vSelected = true;
vClass = "BUTTONLISTInputSelected"+dirExt;
}
else
{
vSelected = false;
vClass = "BUTTONLISTInput"+dirExt;
}
var vTooltip = getPropertyValue(vProp+"tooltip");
if (vTooltip != null && vTooltip != "")
vTooltip = "title='"+convertApos(vTooltip)+"'";
var vTesttoolid = "";
if (cc.CASA_testtoolid != null)
vTesttoolid = getTesttoolidHtml() +"='"+cc.CASA_testtoolid+vCounter+"'";
var vButtonId = "CasaBUTTONLIST" + cc.CASA_id + "BUTTON"+vCounter;
var vRollOver = "onmouseover='if (C.checkIO() == false) return; C.CL().C_rollinButtonListROLLOVER(self, this, "+vSelected+", \""+m_direction+"\");' onmouseout='C.CL().C_rolloutButtonListROLLOVER(self, this, "+vSelected+", \""+m_direction+"\");'";
vHTML.push("<tr><td width='100%'>");
vHTML.push("<button class='"+vClass+"'id='"+vButtonId+"' "+vRollOver+" style='width: 100%;"+vStyle+";"+vAddFixStyle+"' oncontextmenu='try { return reactOnContextMenu"+cc.CASA_id+"("+vCounter+", event)} catch(e) {}' onclick='invokeButton"+cc.CASA_id+"("+vCounter+",event)' "+vTooltip+" "+vTesttoolid+">");
if (vImage != "") vHTML.push("<span style='height:100%'><img "+vImageWidth+" "+vImageHeight+" src='"+vImage+"'>&nbsp;</span><span style='height:100%'>");
vHTML.push(vText);
if (vImage != "") vHTML.push("</span>");
vHTML.push("</button>");
vHTML.push("</td></tr>");
vButtonIds.push(vButtonId);
vCounter++;
}
vHTML.push("</table>");
cc.innerHTML = vHTML.join("");
if (cc.CASA_cti != null && cc.CASA_tabindex != null)
{
for (var i=0; i<vButtonIds.length;i++)
{
var b = parent.gebid(vButtonIds[i]);
b.CASA_cti = cc.CASA_cti;
b.CASA_tabindex = cc.CASA_tabindex;
applyCasaTabIndex(b, "BUTTONLIST");
}
}
}
function invokeButtonBUTTONLIST(cc,buttonIndex,evt)
{
if (checkIO() == false) return;
var vMethodName = cc.CASA_buttonlistprop + ".items["+buttonIndex+"].execute";
invokeMethodInModel(vMethodName);
}
function reactOnContextMenuBUTTONLIST(cc,buttonIndex, evt)
{
if (checkIO() == false) return false;
var vMethodName = cc.CASA_buttonlistprop + ".items["+buttonIndex+"].reactOnContextMenuRequest";
if(evt != null)
setContextMenuXYPAGE(evt.clientX,evt.clientY);
invokeMethodInModel(vMethodName);
return false;
}
