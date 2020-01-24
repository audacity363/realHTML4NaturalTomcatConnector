function addVersionInfoTABSTRIPCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TABSTRIPCONTROLS');
}
function reactOnModelUpdateTABSTRIP(cc)
{
var ii=0;
var ext = '';
if (m_direction == 'rtl')
ext = 'RTL';
if (cc.CASA_memDirection != m_direction)
{
if(cc.CASA_tabstriptd != undefined &&
( cc.CASA_memDirection != undefined || (cc.CASA_memDirection == undefined && m_direction == 'rtl')))
{
if(cc.CASA_tabstriptd.align == 'right')
cc.CASA_tabstriptd.align = 'left';
else if (cc.CASA_tabstriptd.align == 'left')
cc.CASA_tabstriptd.align = 'right';
}
if(m_direction == "rtl")
{
if(cc.CASA_scrollleft_rtl != null && cc.CASA_scrollright_rtl != null)
{
var imgLeft = parent.document.getElementById('STRP_'+cc.CASA_id+'_imgtoleft');
if(imgLeft != null) imgLeft.src = cc.CASA_scrollleft_rtl;
var imgRight = parent.document.getElementById('STRP_'+cc.CASA_id+'_imgtoright');
if(imgRight != null) imgRight.src = cc.CASA_scrollright_rtl;
}
}
if( m_direction == "ltr" && cc.CASA_memDirection != undefined)
{
if(cc.CASA_scrollleft != null && cc.CASA_scrollright != null)
{
var imgLeft = parent.document.getElementById('STRP_'+cc.CASA_id+'_imgtoleft');
if(imgLeft != null) imgLeft.src = cc.CASA_scrollleft;
var imgRight = parent.document.getElementById('STRP_'+cc.CASA_id+'_imgtoright');
if(imgRight != null) imgRight.src = cc.CASA_scrollright;
}
}
var cellBefore = parent.document.getElementById('TABSTRIPCELLBEFORE'+cc.CASA_id);
if(cellBefore != null && cellBefore.className != "")
{
cellBefore.className = 'TABSTRIPTOPCellBefore'+ext;
}
cc.CASA_memDirection = m_direction;
}
var spanstring = "<table cellspacing=0 cellpadding=0>"+
"<tr>"+
"<td width=20px class='TDAroundControl'/>";
var vCellIds = [];
var vselectedindex = getPropertyValue(cc.CASA_selectedindexprop);
if (vselectedindex < 0) vselectedindex = -10;
while (true)
{
var pname = cc.CASA_valueprop + "[" + ii + "].name";
var vname = getPropertyValue(pname);
var vjustempty = false;
if (vname == null && ii == 0)
{
vname = "";
vselectedindex = -10;
vjustempty = true;
}
if (vname == null) break;
var iname = 'TABSTRIPBack'
if (ii == 0) iname += 'Left';
if (vselectedindex == ii) iname += 'Selected';
else if ((vselectedindex-0+1-0) == ii) iname += 'NextSelected';
iname += ext;
if (cc.CASA_isTabStrip3 == true)
{
iname = "TABSTRIPTOPCell";
if (vselectedindex != ii) iname += 'Selected';
}
var variant = "";
if (cc.CASA_isTabStrip3 == true) variant = "TOP";
var tdId = "T_"+cc.CASA_id+"_TABSTRIP"+ii;
var tdCloseId = "C_"+cc.CASA_id+"_TABSTRIP"+ii;
vCellIds.push(tdId);
if (cc.CASA_isTabStrip3 == true && ii != 0)
{
spanstring += "<td>&nbsp;&nbsp;</td><td><div class='TABSTRIPTOPCellSeperator'></div></td>";
}
var closeSpan = "";
if (cc.CASA_isTabStrip3 == true)
if (vjustempty == false)
{
var vShowCloseButtonProp = cc.CASA_valueprop + "[" + ii + "].showCloseButton";
var vShowCloseButtonValue = getPropertyValue(vShowCloseButtonProp);
if(vShowCloseButtonValue == "true")
{
var vVisibilityProp = "style='visibility:hidden;'";
if (vselectedindex == ii)
vVisibilityProp = "style='visibility:visible;'";
vCellIds.push(tdCloseId);
closeSpan = "<td id='"+tdCloseId+"' class='TABSTRIPTOPCellClose' "+ vVisibilityProp + " onclick='closeTabStripIndex"+cc.CASA_id+"("+ii+");' nowrap='true' >";
closeSpan += "</td>";
}
}
if (vselectedindex == ii)
{
spanstring += "<td id='"+tdId+"' class='" + iname + "' nowrap='true'>"+
"<a class='links' onclick='selectTabStripIndex"+cc.CASA_id+"("+ii+");'>"+
"<div id='DIV_"+cc.CASA_id+"_TABSTRIP"+ii+"' class='TABSTRIP"+variant+"Cell'>&nbsp;&nbsp;&nbsp;&nbsp;" + vname + "&nbsp;"+
"</div>"+
"</a>"+
"</td>" +
closeSpan;
}
else
{
spanstring += "<td id='"+tdId+"' class='" + iname + "' nowrap='true'>";
if (vjustempty == false) spanstring += "<a class='links' onclick='selectTabStripIndex"+cc.CASA_id+"("+ii+");'>";
spanstring += "<div id='DIV_"+cc.CASA_id+"_TABSTRIP"+ii+"' class='TABSTRIP"+variant+"CellSelected'>&nbsp;&nbsp;&nbsp;&nbsp;" + vname + "&nbsp;";
if (vjustempty == false) spanstring += "</div>";
spanstring += "</a>";
spanstring += "</td>";
spanstring += closeSpan;
}
ii++;
}
cc.CASA_count = ii;
var iname = "TABSTRIPBackRight";
if ((ii-1) == vselectedindex)
iname += "Selected";
iname += ext;
if (cc.CASA_isTabStrip3 == true) iname = "";
spanstring += "<td id='T_"+cc.CASA_id+"_TABSTRIP"+cc.CASA_count+"' width=28px class='" + iname + "'/>"+
"<td class='TDAroundControl' width=30px/>"+
"</tr>"+
"</table>";
cc.innerHTML = spanstring;
ensureVisibilityOfSelectedItemTABSTRIP(cc);
for(var iii=0; iii<vCellIds.length;iii++)
{
var td = parent.gebid(vCellIds[iii]);
td.onmouseover = cc.CASA_react;
td.onmouseout = cc.CASA_react;
}
}
function selectTabStripIndexTABSTRIP(cc,selectedindex)
{
if (checkIO() == false) return;
if (cc.CASA_selectedindexprop != null)
{
setPropertyValue(cc.CASA_selectedindexprop,selectedindex);
invokeMethodInModel(cc.CASA_selectmethod);
}
}
function closeTabStripIndexTABSTRIP(cc,closedindex)
{
if (checkIO() == false) return;
if (cc.CASA_closedindexprop != null)
{
setPropertyValue(cc.CASA_closedindexprop,closedindex);
invokeMethodInModel(cc.CASA_closemethod);
}
}
function ensureVisibilityOfSelectedItemTABSTRIP(cc)
{
try
{
var vwidth = 0;
var vselectedindex = getPropertyValue(cc.CASA_selectedindexprop);
for (var i=0; i<vselectedindex; i++)
{
var elm = parent.gebid("T_"+cc.CASA_id+"_TABSTRIP"+i);
vwidth += elm.clientWidth;
}
if (vwidth > 80)vwidth -= 80;
cc.CASA_tabstripdiv.scrollLeft = vwidth;
}
catch(exc) {}
}
function scrollTABSTRIP(cc, pDir)
{
var vC = cc.CASA_tabstripdiv;
if(m_direction == "rtl") pDir *=-1;
var scrollsum = Math.round(vC.offsetWidth*2/3);
if (pDir < 0)
if (vC - scrollsum < 0)
vC.scrollLeft = 0;
else
vC.scrollLeft -= scrollsum;
else
vC.scrollLeft += scrollsum;
}
function reactTABSTRIP(cc,evt)
{
if (evt.type == "mouseover") return reactOnMouseEnterTABSTRIP(cc,evt);
else if (evt.type == "mouseout") return reactOnMouseLeaveTABSTRIP(cc,evt);
}
function reactOnMouseEnterTABSTRIP(cc,evt)
{
prepareRolloverTABSTRIP(cc,evt);
var vselectedindex = getPropertyValue(cc.CASA_selectedindexprop);
if ((cc.CASA_isTabStrip3 == true) && (cc.CASA_rolloverCloseTd != null) && (cc.CASA_rolloverCloseTd.style.visibility == "hidden"))
cc.CASA_rolloverCloseTd.style.visibility = "visible";
if (m_direction == 'rtl') return;
if (cc.CASA_isTabStrip3 == true)
{
if (cc.CASA_rolloverTdIndex == vselectedindex)
cc.CASA_rolloverTd.className = "TABSTRIPTOPCellSelectedRollover";
else
cc.CASA_rolloverTd.className = "TABSTRIPTOPCellRollover";
return;
}
if (cc.CASA_rolloverTdIndex == vselectedindex)
{
if (cc.CASA_rolloverDiv != null) cc.CASA_rolloverDiv.className = "TABSTRIPCellRollover";
return;
}
if (cc.CASA_rolloverDiv != null) cc.CASA_rolloverDiv.className = "TABSTRIPCellSelectedRollover";
if (cc.CASA_rolloverTdIndex == 0)
{
cc.CASA_rolloverTd.className = 'TABSTRIPBackLeftRollover';
}
else
{
if ((cc.CASA_rolloverTdIndex-1) == vselectedindex)
cc.CASA_rolloverTd.className = 'TABSTRIPBackNextSelectedRollover';
else
cc.CASA_rolloverTd.className = 'TABSTRIPBackRollover';
}
var nexttd = null;
var nextindex = cc.CASA_rolloverTdIndex+1;
if (nextindex == cc.CASA_count)
{
var nexttd = parent.gebid("T_"+cc.CASA_id+"_TABSTRIP"+cc.CASA_count);
nexttd.className = 'TABSTRIPBackRightRollover';
}
else
{
nexttd = parent.gebid("T_"+cc.CASA_id+"_TABSTRIP"+nextindex);
if (nextindex != vselectedindex)
nexttd.className = 'TABSTRIPBackNextRollover';
else
nexttd.className = 'TABSTRIPBackSelectedNextRollover';
}
}
function reactOnMouseLeaveTABSTRIP(cc,evt)
{
prepareRolloverTABSTRIP(cc,evt);
var vselectedindex = getPropertyValue(cc.CASA_selectedindexprop);
if((cc.CASA_isTabStrip3 == true) && (cc.CASA_rolloverCloseTd != null) &&  (cc.CASA_rolloverTdIndex != vselectedindex))
{
if (evt.relatedTarget != cc.CASA_rolloverCloseTd) cc.CASA_rolloverCloseTd.style.visibility = "hidden";
}
if (m_direction == 'rtl') return;
if (cc.CASA_isTabStrip3 == true)
{
if (cc.CASA_rolloverTdIndex == vselectedindex)
cc.CASA_rolloverTd.className = "TABSTRIPTOPCell";
else
cc.CASA_rolloverTd.className = "TABSTRIPTOPCellSelected";
return;
}
if (cc.CASA_rolloverTd.className.indexOf("Selected") > 0 && cc.CASA_rolloverTd.className.indexOf("NextSelected") < 0)
{
if (cc.CASA_rolloverDiv != null) cc.CASA_rolloverDiv.className = "TABSTRIPCell";
return;
}
if (cc.CASA_rolloverDiv != null) cc.CASA_rolloverDiv.className = "TABSTRIPCellSelected";
if (cc.CASA_rolloverTdIndex == 0)
{
cc.CASA_rolloverTd.className = 'TABSTRIPBackLeft';
}
else
{
if ((cc.CASA_rolloverTdIndex-1) == vselectedindex)
cc.CASA_rolloverTd.className = 'TABSTRIPBackNextSelected';
else
cc.CASA_rolloverTd.className = 'TABSTRIPBack';
}
var nextindex = cc.CASA_rolloverTdIndex+1;
if (nextindex == cc.CASA_count)
{
var nexttd = parent.gebid("T_"+cc.CASA_id+"_TABSTRIP"+cc.CASA_count);
nexttd.className = 'TABSTRIPBackRight';
}
else
{
nexttd = parent.gebid("T_"+cc.CASA_id+"_TABSTRIP"+nextindex);
if (nextindex != vselectedindex)
nexttd.className = 'TABSTRIPBack';
else
nexttd.className = 'TABSTRIPBackSelected';
}
}
function prepareRolloverTABSTRIP(cc, evt)
{
var srcElm = findSrcElement(evt);
var srcElmId = srcElm.id;
var index = srcElmId.substring(srcElmId.indexOf("TABSTRIP")+8-0,srcElmId.length)-0;
cc.CASA_rolloverTdIndex = index;
cc.CASA_rolloverTd = parent.gebid("T_"+cc.CASA_id+"_TABSTRIP"+index);
cc.CASA_rolloverCloseTd = parent.gebid("C_"+cc.CASA_id+"_TABSTRIP"+index);
cc.CASA_rolloverDiv = parent.gebid("DIV_"+cc.CASA_id+"_TABSTRIP"+index);
}
