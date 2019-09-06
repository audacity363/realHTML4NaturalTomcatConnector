function addVersionInfoTABAREACONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TABAREACONTROLS');
}
function iccTABAREA(cc, reactmethod)
{
cc.mem_lastDir = undefined;
cc.mem_dirExt = undefined;
cc.mem_vis1 = undefined;
cc.mem_dis1 = undefined;
cc.mem_sst1 = undefined;
cc.mem_ust1 = undefined;
cc.mem_dst1 = undefined;
cc.mem_Value = undefined;
for(i=0;i<16;i++)
{
var ccPage = getPageTABAREA(cc, i);
if (ccPage == null)  continue;
var ccTab = getTabTDTABAREA(cc, i);
ccTab.onmouseover = reactmethod;
ccTab.onmouseout = reactmethod;
}
showPageTABAREA(cc,0);
}
function romuTABAREA(cc)
{
if (cc.mem_lastDir != m_direction)
{
cc.mem_lastDir = m_direction;
cc.mem_dirExt = '';
if (m_direction == 'rtl') cc.mem_dirExt = 'RTL';
if (cc.CASA_TPTD1 != null) cc.CASA_TPTD1.className = "TABAREA"+cc.CASA_stylevariant+"CellSelectedFirst"+cc.mem_dirExt;
var cn = "TABAREA"+cc.CASA_stylevariant+"CellUnselected"+cc.mem_dirExt;
if (cc.CASA_TPTD2 != null) cc.CASA_TPTD2.className=cn;
if (cc.CASA_TPTD3 != null) cc.CASA_TPTD3.className=cn;
if (cc.CASA_TPTD4 != null) cc.CASA_TPTD4.className=cn;
if (cc.CASA_TPTD5 != null) cc.CASA_TPTD5.className=cn;
if (cc.CASA_TPTD6 != null) cc.CASA_TPTD6.className=cn;
if (cc.CASA_TPTD7 != null) cc.CASA_TPTD7.className=cn;
if (cc.CASA_TPTD8 != null) cc.CASA_TPTD8.className=cn;
if (cc.CASA_TPTD9 != null) cc.CASA_TPTD9.className=cn;
if (cc.CASA_TPTD10 != null) cc.CASA_TPTD10.className=cn;
if (cc.CASA_TPTD11 != null) cc.CASA_TPTD11.className=cn;
if (cc.CASA_TPTD12 != null) cc.CASA_TPTD12.className=cn;
if (cc.CASA_TPTD13 != null) cc.CASA_TPTD13.className=cn;
if (cc.CASA_TPTD14 != null) cc.CASA_TPTD14.className=cn;
if (cc.CASA_TPTD15 != null) cc.CASA_TPTD15.className=cn;
if (cc.CASA_TPTD16 != null) cc.CASA_TPTD16.className=cn;
}
var enforceRefresh = false;
var value = getPropertyValue(cc.CASA_openedindexprop);
for (var i=0;i<17;i++)
{
var ccPage = getPageTABAREA(cc, i);
if (ccPage == null)  continue;
var ccTab = getTabTDTABAREA(cc, i);
if (ccTab.CASA_visprop == null) continue;
if(ccTab.CASA_visprop)
{
try
{
if(i == value)
ccTab.CASA_withclose.src = "../HTMLBasedGUI/images/closecornergray.gif";
else
ccTab.CASA_withclose.src = "../HTMLBasedGUI/general/nothing.gif";
} catch (e) {}
}
var vis = getPropertyValue(ccTab.CASA_visprop);
if (ccTab.mem_vis1 != vis)
{
if (vis == "false")
{
ccPage.style.display = "none";
ccTab.style.display = "none";
}
else
{
ccTab.style.display = "";
}
ccTab.mem_vis1 = vis;
enforceRefresh = true;
}
}
enforceRefresh = disableTabs(cc, value) || enforceRefresh;
if ( !enforceRefresh )	enforceRefresh = hasDynamicStyleChanged(cc);
cc.CASA_checkio = false;
var value = getPropertyValue(cc.CASA_openedindexprop);
if (value == null || value < 0 || (value == cc.mem_Value && !enforceRefresh)) return;
cc.mem_Value = value;
showPageTABAREA(cc, cc.mem_Value);
cc.CASA_checkio = true;
}
function hasDynamicStyleChanged(cc)
{
for (var i=0;i<17;i++)
{
var ccTab2 = getTabTDTABAREA(cc, i);
if ( ccTab2 == undefined || ccTab2 == null ) continue;
var sty1 = null;
if (ccTab2.CASA_selectedstyleprop != null)
{
sty1 = getStylePropertyValue(ccTab2.CASA_selectedstyleprop);
if (sty1 != ccTab2.mem_ssty1 )
{
ccTab2.mem_ssty1 = sty1;
return true;
}
}
if (ccTab2.CASA_unselectedstyleprop != null)
{
sty1 = getStylePropertyValue(ccTab2.CASA_unselectedstyleprop);
if (sty1 != ccTab2.mem_usty1 )
{
ccTab2.mem_usty1 = sty1;
return true;
}
}
if (ccTab2.CASA_disabledstyleprop != null)
{
sty1 = getStylePropertyValue(ccTab2.CASA_disabledstyleprop);
if (sty1 != ccTab2.mem_dsty1 )
{
ccTab2.mem_dsty1 = sty1;
return true;
}
}
}
return false;
}
function disableTabs(cc,openedindex)
{
var firstvis = findFirstVisiblePageIndexTABAREA(cc);
var enforceRefresh = false;
for (var i=0;i<17;i++)
{
var ccPage2 = getPageTABAREA(cc, i);
if (ccPage2 == null)  continue;
var ccTab2 = getTabTDTABAREA(cc, i);
if ( ccTab2 == undefined || ccTab2 == null ) continue;
if (ccTab2.CASA_disabledprop == null) continue;
var dis = getPropertyValue(ccTab2.CASA_disabledprop);
if (ccTab2.mem_dis1 != dis)
{
ccTab2.mem_dis1 = dis;
enforceRefresh = true;
if (dis == "false")
{
if ( i == openedindex ) handleDisabling(cc,ccPage2, ccTab2, "CellSelected", (i==firstvis)||(i==0), false);
else handleDisabling(cc,ccPage2, ccTab2, "CellUnselected", (i==firstvis)||(i==0), false);
}
else
{
handleDisabling(cc,ccPage2, ccTab2, "CellDisabled", (i==firstvis)||(i==0), true);
}
}
if (ccTab2.CASA_titleprop != null )
{
var thetitle = getPropertyValue(ccTab2.CASA_titleprop);
ccTab2.title = thetitle;
}
}
return enforceRefresh;
}
function handleDisabling(cc, ccPage2, ccTab2, cnm, isFirst, disabled)
{
if ( isFirst ) cnm = cnm + "First";
ccTab2.className = "TABAREA"+cc.CASA_stylevariant + cnm + cc.mem_dirExt;
ccPage2.disabled = disabled;
ccTab2.disabled = disabled;
if ( disabled )  mozdisableTab(ccTab2)
else mozenableTab(ccTab2);
}
function mozdisableTab(cctb)
{
cctb.style.cursor = "default";
if ( cctb.style.getProperty && cctb.style.getProperty("color") == null )
cctb.style.color = "#6C7478";
}
function mozshowPage(ccpg)
{
if (ccpg.disabled == true )
ccpg.style.setProperty("pointer-events", "none");
if (ccpg.disabled == false )
ccpg.style.removeProperty("pointer-events");
}
function mozenableTab(cctb)
{
cctb.style.cursor = "pointer"
cctb.style.color = "";
}
function clickPageTABAREA(cc, index)
{
addLogMessage("TABAREA - clickPageTABAREA called with index " + index);
if (cc.CASA_checkio == true && checkIO() == false) return;
if (getTabTDTABAREA(cc, index).disabled == true) return;
showPageTABAREA(cc, index);
}
function showPageTABAREA(cc, index)
{
addLogMessage("TABAREA - showPageTABAREA called with index " + index);
if (cc.CASA_checkio == true && checkIO() == false) return;
addLogMessage("TABAREA - clearPagesTABAREA called");
clearPagesTABAREA(cc);
var ccPage = getPageTABAREA(cc, index);
if (ccPage == null) return;
var ccTD = getTabTDTABAREA(cc, index);
if (ccTD.style.display == "none")
{
var firstVis = findFirstVisiblePageIndexTABAREA(cc);
if (firstVis == -1) return;
ccPage = getPageTABAREA(cc, firstVis);
ccTD = getTabTDTABAREA(cc, firstVis);
try { ccTD.CASA_withclose.src = "../HTMLBasedGUI/images/closecornergray.gif"; } catch(e) {}
index = firstVis;
}
mozshowPage(ccPage);
ccPage.style.display="";
addLogMessage("TABAREA - index " + index + " color " + ccPage.style.backgroundColor);
ccTD.style.display="";
var vFirstVisIndex = findFirstVisiblePageIndexTABAREA(cc);
var ext = "";
if (m_direction == 'rtl') ext = 'RTL';
var cn = "TABAREA"+cc.CASA_stylevariant+"CellSelectedFirst"+ext;
var cnd = "TABAREA"+cc.CASA_stylevariant+"CellDisabledFirst"+ext;
if (index != vFirstVisIndex)
{
cn = "TABAREA"+cc.CASA_stylevariant+"CellSelected"+ext;
cnd = "TABAREA"+cc.CASA_stylevariant+"CellDisabled"+ext;
}
ccTD = getTabTDTABAREA(cc, index);
ccTD.style.cursor = "default";
if ( ccTD.className != cnd )
{
if (ccTD.className != cn) ccTD.className = cn;
if (ccTD.CASA_selectedstyleprop != null )
applyStyleProps(ccTD,getStylePropertyValue(ccTD.CASA_selectedstyleprop))
callOpenMethodTABAREA(cc, index);
if (m_doLog) addLogMessage("showPageTabarea - calling reactOnResize()");
parent.reactOnResize();
}
}
function closePageTABAREA(cc, index)
{
cc.closed = true;
var ccPage = getPageTABAREA(cc, index);
if (ccPage == null) return;
var ccTab = getTabTDTABAREA(cc, index);
if (ccTab.CASA_visprop != null)
setPropertyValue(ccTab.CASA_visprop,"false");
this.submitModel("submit");
}
function clearPageStyle(pg)
{
if (pg != null) { pg.style.display='none'; }
}
function clearClassName(tptd,cn,cnd)
{
if (tptd != null && tptd.className != cn && tptd.className != cnd) tptd.className = cn;
}
function clearPagesTABAREA(cc)
{
clearPageStyle(cc.CASA_page1);
clearPageStyle(cc.CASA_page2);
clearPageStyle(cc.CASA_page3);
clearPageStyle(cc.CASA_page4);
clearPageStyle(cc.CASA_page5);
clearPageStyle(cc.CASA_page6);
clearPageStyle(cc.CASA_page7);
clearPageStyle(cc.CASA_page8);
clearPageStyle(cc.CASA_page9);
clearPageStyle(cc.CASA_page10);
clearPageStyle(cc.CASA_page11);
clearPageStyle(cc.CASA_page12);
clearPageStyle(cc.CASA_page13);
clearPageStyle(cc.CASA_page14);
clearPageStyle(cc.CASA_page15);
clearPageStyle(cc.CASA_page16);
var ext = "";
if (m_direction == 'rtl') ext = 'RTL';
var cnFirst = "TABAREA"+cc.CASA_stylevariant+"CellUnselectedFirst"+ext;
var cndFirst = "TABAREA"+ cc.CASA_stylevariant + "CellDisabledFirst"+ext;
clearClassName(cc.CASA_TPTD1, cnFirst, cndFirst);
var cn = "TABAREA"+cc.CASA_stylevariant+"CellUnselected"+ext;
var cnd = "TABAREA"+cc.CASA_stylevariant+"CellDisabled"+ext;
clearClassName(cc.CASA_TPTD2, cn, cnd);
clearClassName(cc.CASA_TPTD3, cn, cnd);
clearClassName(cc.CASA_TPTD4, cn, cnd);
clearClassName(cc.CASA_TPTD5, cn, cnd);
clearClassName(cc.CASA_TPTD6, cn, cnd);
clearClassName(cc.CASA_TPTD7, cn, cnd);
clearClassName(cc.CASA_TPTD8, cn, cnd);
clearClassName(cc.CASA_TPTD9, cn, cnd);
clearClassName(cc.CASA_TPTD10, cn, cnd);
clearClassName(cc.CASA_TPTD11, cn, cnd);
clearClassName(cc.CASA_TPTD12, cn, cnd);
clearClassName(cc.CASA_TPTD13, cn, cnd);
clearClassName(cc.CASA_TPTD14, cn, cnd);
clearClassName(cc.CASA_TPTD15, cn, cnd);
clearClassName(cc.CASA_TPTD16, cn, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD1, cndFirst);
applyUnselectedStyleProps( cc.CASA_TPTD2, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD3, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD4, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD5, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD6, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD7, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD8, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD9, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD10, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD11, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD12, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD13, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD14, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD15, cnd);
applyUnselectedStyleProps( cc.CASA_TPTD16, cnd);
applyDisabledStyleProps( cc.CASA_TPTD1 );
applyDisabledStyleProps( cc.CASA_TPTD2 );
applyDisabledStyleProps( cc.CASA_TPTD3 );
applyDisabledStyleProps( cc.CASA_TPTD4 );
applyDisabledStyleProps( cc.CASA_TPTD5 );
applyDisabledStyleProps( cc.CASA_TPTD6 );
applyDisabledStyleProps( cc.CASA_TPTD7 );
applyDisabledStyleProps( cc.CASA_TPTD8 );
applyDisabledStyleProps( cc.CASA_TPTD9 );
applyDisabledStyleProps( cc.CASA_TPTD10 );
applyDisabledStyleProps( cc.CASA_TPTD11 );
applyDisabledStyleProps( cc.CASA_TPTD12 );
applyDisabledStyleProps( cc.CASA_TPTD13 );
applyDisabledStyleProps( cc.CASA_TPTD14 );
applyDisabledStyleProps( cc.CASA_TPTD15 );
applyDisabledStyleProps( cc.CASA_TPTD16 );
var vFirstVisIndex = findFirstVisiblePageIndexTABAREA(cc);
if (vFirstVisIndex == -1) return;
var ccTD = getTabTDTABAREA(cc, vFirstVisIndex);
if ( ccTD.className != cndFirst ) ccTD.className = cnFirst;
}
function applyUnselectedStyleProps(tptd,cnd)
{
if (tptd != null && tptd.className != cnd) {
tptd.style.cursor = "pointer";
if (tptd.CASA_unselectedstyleprop != null)
applyStyleProps(tptd, getStylePropertyValue(tptd.CASA_unselectedstyleprop));
}
}
function applyDisabledStyleProps(tptd)
{
if ( tptd != null && tptd.disabled && tptd.CASA_disabledstyleprop != null )
{
applyStyleProps(tptd,getStylePropertyValue(tptd.CASA_disabledstyleprop))
mozdisableTab(tptd);
}
}
function applyStyleProps(tptd, thestyle)
{
if ( thestyle == null ) return;
var invis =  (tptd.style.display == 'none' );
tptd.style.cssText = "";
var cn = tptd.className;
tptd.className = null;
tptd.className = cn;
if ( invis ) tptd.style.display = 'none';
var thevals = thestyle.split(";");
for ( var i =0; i < thevals.length; i++)
{
var theval = thevals[i].split(":");
if ( theval.length == 2 )
{
theval[0] = getTrimmedValue(theval[0]);
theval[1] = getTrimmedValue(theval[1]);
if ( tptd.style.setProperty)
tptd.style.setProperty(theval[0], theval[1]);
else
tptd.style[theval[0]] = theval[1];
}
}
}
function getTrimmedValue(val)
{
if ( val.trim ) return val.trim();
return val.replace(/^\s+|\s+$/g, '');
}
function callOpenMethodTABAREA(cc, openedIndex)
{
if (cc.CASA_openedindexprop != null ||
cc.CASA_openmethod != null)
{
if (cc.mem_Value == openedIndex) return;
}
cc.mem_Value = openedIndex;
if (cc.CASA_openedindexprop != null)
{
setPropertyValue(cc.CASA_openedindexprop,openedIndex);
}
if (cc.CASA_openmethod != null)
{
invokeMethodInModel(cc.CASA_openmethod);
}
else
{
m_displayOccupied = false;
invokeMethodInModel("__ZZZinternalProcessDefault");
}
}
function getPageTABAREA(cc, index)
{
if (index == 0) return cc.CASA_page1;
if (index == 1) return cc.CASA_page2;
if (index == 2) return cc.CASA_page3;
if (index == 3) return cc.CASA_page4;
if (index == 4) return cc.CASA_page5;
if (index == 5) return cc.CASA_page6;
if (index == 6) return cc.CASA_page7;
if (index == 7) return cc.CASA_page8;
if (index == 8) return cc.CASA_page9;
if (index == 9) return cc.CASA_page10;
if (index == 10) return cc.CASA_page11;
if (index == 11) return cc.CASA_page12;
if (index == 12) return cc.CASA_page13;
if (index == 13) return cc.CASA_page14;
if (index == 14) return cc.CASA_page15;
if (index == 15) return cc.CASA_page16;
return null;
}
function getTabTDTABAREA(cc, index)
{
if (index == 0) return cc.CASA_TPTD1;
if (index == 1) return cc.CASA_TPTD2;
if (index == 2) return cc.CASA_TPTD3;
if (index == 3) return cc.CASA_TPTD4;
if (index == 4) return cc.CASA_TPTD5;
if (index == 5) return cc.CASA_TPTD6;
if (index == 6) return cc.CASA_TPTD7;
if (index == 7) return cc.CASA_TPTD8;
if (index == 8) return cc.CASA_TPTD9;
if (index == 9) return cc.CASA_TPTD10;
if (index == 10) return cc.CASA_TPTD11;
if (index == 11) return cc.CASA_TPTD12;
if (index == 12) return cc.CASA_TPTD13;
if (index == 13) return cc.CASA_TPTD14;
if (index == 14) return cc.CASA_TPTD15;
if (index == 15) return cc.CASA_TPTD16;
return null;
}
function findFirstVisiblePageIndexTABAREA(cc)
{
if (cc.CASA_TPTD1 != null && cc.CASA_TPTD1.style.display != "none") return 0;
if (cc.CASA_TPTD2 != null && cc.CASA_TPTD2.style.display != "none") return 1;
if (cc.CASA_TPTD3 != null && cc.CASA_TPTD3.style.display != "none") return 2;
if (cc.CASA_TPTD4 != null && cc.CASA_TPTD4.style.display != "none") return 3;
if (cc.CASA_TPTD5 != null && cc.CASA_TPTD5.style.display != "none") return 4;
if (cc.CASA_TPTD6 != null && cc.CASA_TPTD6.style.display != "none") return 5;
if (cc.CASA_TPTD7 != null && cc.CASA_TPTD7.style.display != "none") return 6;
if (cc.CASA_TPTD8 != null && cc.CASA_TPTD8.style.display != "none") return 7;
if (cc.CASA_TPTD9 != null && cc.CASA_TPTD9.style.display != "none") return 8;
if (cc.CASA_TPTD10 != null && cc.CASA_TPTD10.style.display != "none") return 9;
if (cc.CASA_TPTD11 != null && cc.CASA_TPTD11.style.display != "none") return 10;
if (cc.CASA_TPTD12 != null && cc.CASA_TPTD12.style.display != "none") return 11;
if (cc.CASA_TPTD13 != null && cc.CASA_TPTD13.style.display != "none") return 12;
if (cc.CASA_TPTD14 != null && cc.CASA_TPTD14.style.display != "none") return 13;
if (cc.CASA_TPTD15 != null && cc.CASA_TPTD15.style.display != "none") return 14;
if (cc.CASA_TPTD16 != null && cc.CASA_TPTD16.style.display != "none") return 15;
return -1;
}
function reactTABAREA(cc, event)
{
var elm = findSrcElement(event);
if (elm.tagName == null || elm.tagName.toLowerCase() != "td") return;
var id = elm.id;
if(id.length == 6 || id.length == 7) var tempIndex = id.substr(id.indexOf("TPTD")+4,1);
if(id.length == 8) var tempIndex = id.substr(id.indexOf("TPTD")+4,2);
var index = parseInt(tempIndex) - 1;
if (event.type == "mouseenter") return rollinTABAREA(cc,index);
else if (event.type == "mouseleave") return rolloutTABAREA(cc,index);
else if (event.type == "mouseover") return rollinTABAREA(cc,index);
else if (event.type == "mouseout") return rolloutTABAREA(cc,index);
else alert("Unhandled event (reactTABAREA): " + event.type);
}
function rollinTABAREA(cc, index)
{
if(index == cc.mem_Value) return;
var ccTD = getTabTDTABAREA(cc, index);
try { ccTD.CASA_withclose.src = "../HTMLBasedGUI/images/closecornergray.gif"; } catch(e){}
}
function rolloutTABAREA(cc, index)
{
if(cc.closed == true) { cc.closed = false; return; }
if(index == cc.mem_Value) return;
var ccTD = getTabTDTABAREA(cc, index);
try { ccTD.CASA_withclose.src = "../HTMLBasedGUI/general/nothing.gif"; } catch(e){}
}
