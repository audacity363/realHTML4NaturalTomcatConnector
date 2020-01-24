function addVersionInfoROLLOVERCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('ROLLOVERCENTRAL');
}
function C_rollinLinkROLLOVER(elm)
{
if (elm == null) return;
elm.className = "linksRolledOver";
}
function C_rolloutLinkROLLOVER(elm)
{
if (elm == null) return;
elm.className = "links";
}
function C_rollinDragLinkROLLOVER(elm)
{
if (elm == null) return;
elm.className = "linksRolledOverDragDrop";
}
function C_rollinButtonROLLOVER(tt,elm,stylevariant)
{
if (elm == null) return;
if (stylevariant == null) stylevariant = "";
C_hlROVER(tt,elm,"BUTTON"+stylevariant+"InputRolledOver",true);
}
function C_rolloutButtonROLLOVER(tt,elm,stylevariant)
{
if (elm == null) return;
if (stylevariant == null) stylevariant = "";
C_hlROVER(tt,elm,"BUTTON"+stylevariant+"Input",false);
}
function C_rinButtonROLLOVER(tt,cc,stylevariant)
{
if (stylevariant == null) stylevariant = "";
if (tt.checkIO() == false) return;
C_hlROVER(tt,cc,"BUTTON"+stylevariant+"InputRolledOver",true);
}
function C_routButtonROLLOVER(tt,cc,stylevariant)
{
if (stylevariant == null) stylevariant = "";
C_hlROVER(tt,cc,"BUTTON"+stylevariant+"Input",false);
}
function C_rollinButtonListROLLOVER(tt,elm,pSelected,direction)
{
if (elm == null) return;
var dirExt = '';
if (direction == 'rtl') dirExt = 'RTL';
if (pSelected == true)
C_hlROVER(tt,elm,"BUTTONLISTInputSelectedRolledOver"+dirExt,true);
else
C_hlROVER(tt,elm,"BUTTONLISTInputRolledOver"+dirExt,true);
}
function C_rolloutButtonListROLLOVER(tt,elm,pSelected,direction)
{
if (elm == null) return;
var dirExt = '';
if (direction == 'rtl') dirExt = 'RTL';
if (pSelected == true)
C_hlROVER(tt,elm,"BUTTONLISTInputSelected"+dirExt,false);
else
C_hlROVER(tt,elm,"BUTTONLISTInput"+dirExt,false);
}
function C_rollOverInImageCellROLLOVER(tt,id)
{
if(m_contextmenuOwnerFrame == null || m_contextmenuOwnerFrame == undefined ) return;
var win = m_contextmenuOwnerFrame;
var elm = win.document.getElementById(id);
if (elm == null) return;
try {
elm.className = "MENUItemImageCellRollOver";
elm.childNodes[1].className = "MENUItemImageCellRollOver";  } catch (exc) {}
}
function C_rollOverInLabelCellROLLOVER(tt,id)
{
if(m_contextmenuOwnerFrame == null || m_contextmenuOwnerFrame == undefined ) return;
var win = m_contextmenuOwnerFrame;
var elm = win.document.getElementById(id);
if (elm == null) return;
elm.className = "MENUItemLabelCellRollOver";
elm = win.document.getElementById(id+"4A");
if (elm != null) elm.className = "MENUItemLabelCellRollOver";
elm = win.document.getElementById(id+"5A");
if (elm != null) elm.className = "MENUItemLabelCellRollOver";
}
function C_rollOverInCMTextCellROLLOVER(tt,id, stylevariant)
{
if(m_contextmenuOwnerFrame == null || m_contextmenuOwnerFrame == undefined ) return;
var win = m_contextmenuOwnerFrame;
var elm = win.document.getElementById(id);
if (elm == null) return;
if (stylevariant == null) stylevariant = "";
elm.className = "MENUTextCellRollOver" + stylevariant;
}
function C_rollOverInDDTextCellROLLOVER(tt,id, stylevariant)
{
if (tt.checkIO() == false) return;
var elm = tt.parent.gebid(id);
if (elm == null) return;
if (stylevariant == null) stylevariant = "";
var vClass = "MENUDropDownTextCellRollOver" + stylevariant;
elm.className = vClass;
elm = tt.parent.gebid(id+"4B");
if (elm != null) elm.className = vClass;
elm = tt.parent.gebid(id+"5B");
if (elm != null) elm.className = vClass;
}
function C_rollOverInTopROLLOVER(tt,ccIsSelected, elementid)
{
if (tt.checkIO() == false) return;
var vTop = tt.parent.gebid(elementid);
if (vTop == null) return;
if (ccIsSelected == "true" || ccIsSelected == true)
vTop.className = "MENUTopPressed";
else
vTop.className = "MENUTopRollOver";
}
function C_rollOverInTopTextROLLOVER(tt,ccIsSelected, elementid, stylevariant)
{
if (tt.checkIO() == false) return;
var vTop = tt.parent.gebid(elementid);
if (vTop == null) return;
if (stylevariant == null) stylevariant = "";
if (ccIsSelected == "true" || ccIsSelected == true)
vTop.className = "MENUTopTextCellPressed"+stylevariant;
else
vTop.className = "MENUTopTextCellRollOver"+stylevariant;
}
function C_rollOverOutImageCellROLLOVER(tt,id)
{
if(m_contextmenuOwnerFrame == null || m_contextmenuOwnerFrame == undefined ) return;
var win = m_contextmenuOwnerFrame;
var elm = win.document.getElementById(id);
if (elm == null) return;
try {
elm.className = "MENUItemImageCell";
elm.childNodes[1].className = "MENUItemImageCell";  } catch(exc) {}
}
function C_rollOverOutLabelCellROLLOVER(tt,id)
{
if(m_contextmenuOwnerFrame == null || m_contextmenuOwnerFrame == undefined ) return;
var win = m_contextmenuOwnerFrame;
var elm = win.document.getElementById(id);
if (elm == null) return;
elm.className = "MENUItemLabelCell";
elm = win.document.getElementById(id+"4A");
if (elm != null) elm.className = "MENUItemLabelCell";
elm = win.document.getElementById(id+"5A");
if (elm != null) elm.className = "MENUItemLabelCell";
}
function C_rollOverOutCMTextCellROLLOVER(tt,id, stylevariant)
{
if(m_contextmenuOwnerFrame == null || m_contextmenuOwnerFrame == undefined ) return;
var win = m_contextmenuOwnerFrame;
var elm = win.document.getElementById(id);
if (elm == null) return;
if (stylevariant == null) stylevariant = "";
elm.className = "MENUTextCell" + stylevariant;
}
function C_rollOverOutDDTextCellROLLOVER(tt,id, stylevariant)
{
var elm = tt.parent.gebid(id);
if (elm == null) return;
if (stylevariant == null) stylevariant = "";
var vClass = "MENUDropDownTextCell" + stylevariant;
elm.className = vClass;
elm = tt.parent.gebid(id+"4B");
if (elm != null) elm.className = vClass;
elm = tt.parent.gebid(id+"5B");
if (elm != null) elm.className = vClass;
}
function C_rollOverOutTopROLLOVER(tt,elementid)
{
var vTop = tt.parent.gebid(elementid);
if (vTop == null) return;
vTop.className = "MENUTop";
}
function C_rollOverOutTopTextROLLOVER(tt,elementid, stylevariant)
{
var vTop = tt.parent.gebid(elementid);
if (vTop == null) return;
if (stylevariant == null) stylevariant = "";
vTop.className = "MENUTopTextCell"+stylevariant;
}
function C_rollinIconROLLOVER(cc)
{
if (cc.CASA_blocked == true) return;
cc.className = "ICONImageRollOver";
}
function C_rollInButton1ROLLOVER(elm,variant,direction)
{
if (elm == null) return;
if (direction == "rtl")
elm.className = "MULTISELECTButtonInput"+variant+"RolledOverRTL";
else
elm.className = "MULTISELECTButtonInput"+variant+"RolledOver";
}
function C_rollOutButton1ROLLOVER(elm,variant,direction)
{
if (elm == null) return;
if (direction == "rtl")
elm.className = "MULTISELECTButtonInput"+variant+"RTL";
else
elm.className = "MULTISELECTButtonInput"+variant;
}
var m_hlROVER = new Object();
m_hlROVER.CASA_hlDelay = 50;
m_hlROVER.CASA_hlSteps = 4;
m_hlROVER.CASA_hlStart = 60;
m_hlROVER.CASA_hlEWC = 0;
m_hlROVER.CASA_hlE   = new Object();
m_hlROVER.CASA_hlW   = new Object();
m_hlROVER.CASA_hlOpS = m_hlROVER.CASA_hlSteps*(1/(100-m_hlROVER.CASA_hlStart));
function C_registerInQuery(obj,kind)
{
var id = -1;
if( !obj.CASA_hlId )
{
id = ++m_hlROVER.CASA_hlEWC;
if( kind == 'window' )
m_hlROVER.CASA_hlW[id] = obj;
else
m_hlROVER.CASA_hlE[id] = obj;
obj.CASA_hlId = id;
}
else
id = obj.CASA_hlId;
return id;
}
function C_hlROVER(tt,elm,className,fadein)
{
var doanimate = tt.getPropertyValue("cISAddons.anc");
if(doanimate == "false")
{
elm.className = className;
return;
}
if( elm != null )
{
if((className == elm.className)&&!elm.CASA_FadeIn) return;
if( fadein && !elm.CASA_StartOpa )
{
var useOpacity = (typeof document.createElement("div").style.opacity != 'undefined');
var useFilter = !useOpacity && (typeof document.createElement("div").style.filter != 'undefined');
if (useOpacity)
{
if(elm.style.opacity == '')
elm.CASA_StartOpa = 100;
else
elm.CASA_StartOpa = (elm.style.opacity*100);
}
else if (useFilter)
{
if(!elm.style.filter)
elm.CASA_StartOpa = 100;
else
elm.CASA_StartOpa = parseInt( elm.style.filter.split("=")[1] );
}
}
var wid = C_registerInQuery(tt,'window');
var eid = C_registerInQuery(elm,'element');
var steps = (fadein ? 0 : m_hlROVER.CASA_hlSteps);
if(elm.CASA_FadeIn||elm.CASA_FadeOut)
{
tt.clearTimeout(elm.CAA_hlTId);
steps = elm.CASA_hlStep;
}
elm.CASA_FadeIn    = fadein;
elm.CASA_FadeOut   = !fadein;
elm.CASA_FadeClass = className;
C_dohlROVER(eid,wid,steps);
}
}
function C_dohlROVER(eid,wid,i)
{
if((m_hlROVER.CASA_hlE[eid].CASA_FadeIn	 && (m_hlROVER.CASA_hlSteps >= i))
||(m_hlROVER.CASA_hlE[eid].CASA_FadeOut && (i >= 0)))
{
if(m_hlROVER.CASA_hlE[eid].CASA_FadeIn && (i == 0))
{
if(m_hlROVER.CASA_hlE[eid].CASA_FadeClass)
m_hlROVER.CASA_hlE[eid].className = m_hlROVER.CASA_hlE[eid].CASA_FadeClass;
}
var newi = i + (m_hlROVER.CASA_hlE[eid].CASA_FadeIn ? 1 : -1);
m_hlROVER.CASA_hlE[eid].CASA_hlStep = i;
C_dohlROVERSetOpa(eid,wid,(m_hlROVER.CASA_hlStart+(i/m_hlROVER.CASA_hlOpS)));
var pre = "";
if( m_hlROVER.CASA_hlW[wid].C == undefined )
pre = "";
else
pre = "C.";
m_hlROVER.CASA_hlE[eid].CASA_hlTId = m_hlROVER.CASA_hlW[wid].setTimeout( pre+"CL().C_dohlROVER("+eid+","+wid+","+newi+")", m_hlROVER.CASA_hlDelay );
}
else
{
if(m_hlROVER.CASA_hlE[eid].CASA_FadeOut)
{
C_dohlROVERSetOpa(eid,wid,m_hlROVER.CASA_hlE[eid].CASA_StartOpa);
if(m_hlROVER.CASA_hlE[eid].CASA_FadeClass)
m_hlROVER.CASA_hlE[eid].className = m_hlROVER.CASA_hlE[eid].CASA_FadeClass;
}
m_hlROVER.CASA_hlE[eid].CASA_FadeIn = false;
m_hlROVER.CASA_hlE[eid].CASA_FadeOut = false;
m_hlROVER.CASA_hlE[eid].CASA_hlTId = false;
}
}
function C_dohlROVERSetOpa(eid,wid,opa)
{
m_hlROVER.CASA_hlE[eid].style.opacity = opa / 100;
}
