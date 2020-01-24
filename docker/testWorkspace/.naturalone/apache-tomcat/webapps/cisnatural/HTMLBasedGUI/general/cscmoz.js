function addVersionInfoCSCMOZ()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('CSCMOZ');
}
function addMozDivInternally(pd, continueMethod)
{
if (pd != null)
{
var vCurrentIndex = getMozDivIndex(pd);
if(vCurrentIndex == -1)
{
var o = new Object();
o.div = pd;
o.continueMethod = continueMethod;
m_mozdivs.push(o);
}
}
else
addLogMessage("addMozDiv: null inserted");
}
function getMozDivIndex(pd)
{
var vCurrentIndex = -1;
if (pd.id=="")
{
addLogMessage("getMozDivIndex() found an element with no id!");
return -1;
}
for(var i=0;i<m_mozdivs.length;i++)
{
var vCurrentDiv = m_mozdivs[i];
if(vCurrentDiv != null &&
vCurrentDiv.div != null &&
vCurrentDiv.div.id != null &&
vCurrentDiv.div.id == pd.id)
{
vCurrentIndex = i;
break;
}
}
return vCurrentIndex;
}
function replaceMozDivInternally(pd, continueMethod)
{
if (pd != null)
{
var vCurrentIndex = getMozDivIndex(pd);
var o = new Object();
o.div = pd;
o.continueMethod = continueMethod;
if(vCurrentIndex == -1)
{
m_mozdivs.push(o);
}
else
{
m_mozdivs[vCurrentIndex] = o;
}
}
else
addLogMessage("addMozDiv: null inserted");
}
function sizeMozDivs()
{
try
{
if ( parent.innerHeight == 0 ) return;
if (m_model == null) return;
addLogMessage("MOZDIV Starting Setting to 0");
var ikmax = m_mozdivs.length;
for (var ik = 0; ik < ikmax; ik++)
{
try
{
var vTempDiv = m_mozdivs[ik].div;
var vst = m_mozdivs[ik].div.CASA_SCROLL_OUTERDIV;
if (vst != null && vst != 0 && vst!=undefined)
{
var outerDiv = parent.document.getElementById (m_mozdivs[ik].div.CASA_SCROLL_OUTERDIV);
if (outerDiv!=null && outerDiv!= undefined)
outerDiv.style.height = "100%";
}
var vScrollDiv = vTempDiv.childNodes[2];
if(vScrollDiv != undefined && vScrollDiv.CASA_scrollFactor == 0)
vScrollDiv.CASA_romuMethod();
if (vTempDiv.CASA_noHeightReset!=true) {
var vpn = m_mozdivs[ik].div.parentNode;
if (vpn.vAlign != 'top') vpn.vAlign = "top"
m_mozdivs[ik].div.style.height = "1px";
}
}
catch (eexxccee) { alert("m_mozdivs["+ik+"]" + eexxccee); }
}
sizeMozDivsContinue();
}
catch (eexxcc)
{
addLogMessage (">>>> sizeMozDivs" + eexxcc);
}
}
function sizeMozDivsContinue()
{
for (var i = (m_mozdivs.length - 1); i >= 0; i--)
{
try
{
var vpn = m_mozdivs[i].div.parentNode;
var vpns = m_mozdivs[i].div.parentNode.style;
addLogMessage("MOZDIV setting height: " + m_mozdivs[i].div.id + "/" + vpn.offsetHeight + "/" + vpn.scrollHeight + "/" + m_mozdivs[i].div.offsetTop + "/" + vpn.offsetTop);
var theheight = vpn.scrollHeight;
if (parent.m_roi_firstusage==true)
theheight = vpn.offsetHeight;
if ( theheight > 0 )
theheight = C_adjustUnits((theheight -
calculatePixelValue(vpns.paddingTop) -
calculatePixelValue(vpns.paddingBottom)));
m_mozdivs[i].div.style.height = theheight;
if (vpn.vAlign != 'top') vpn.vAlign = "top";
var vy = m_mozdivs[i].div.top;
var vst = m_mozdivs[i].div.CASA_SCROLL_VID;
if (vst != null && vst != 0 && vst!=undefined)
{
var scrollDiv = parent.document.getElementById (m_mozdivs[i].div.CASA_SCROLL_VID);
var vertScroll  = m_mozdivs[i].div.childNodes[1].CASA_scrollTop;
if (scrollDiv!=null && vertScroll!= undefined)
scrollDiv.scrollTop = vertScroll;
var outerDiv = parent.document.getElementById (m_mozdivs[i].div.CASA_SCROLL_OUTERDIV);
if (outerDiv!=null && outerDiv!= undefined)
outerDiv.style.height = theheight;
}
} catch (eexxcc) { addLogMessage("MOZDIVSIZING "+eexxcc + "in " + m_mozdivs[i].div.id); }
}
for (var j = (m_mozdivs.length - 1); j >= 0; j--)
{
try
{
if (m_mozdivs[j].continueMethod != null)
m_mozdivs[j].continueMethod();
} catch (eexxcc) { addLogMessage("MOZDIVSIZINg "+eexxcc + "in " + m_mozdivs[j].div.id+"   "+m_mozdivs[j].continueMethod); }
}
}
function calculatePixelValue(p)
{
if (p == null) return 0;
if (p.indexOf("px") > 0) return p.substring(0,p.length-2)*1;
try { return p*1; } catch (eexxcc) {}
return 0;
}
