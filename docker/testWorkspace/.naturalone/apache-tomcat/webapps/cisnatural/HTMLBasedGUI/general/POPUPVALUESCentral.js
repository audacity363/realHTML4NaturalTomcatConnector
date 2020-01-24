function addVersionInfoPOPUPVALUESCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('POPUPVALUESCENTRAL');
}
function C_onkeydownPOPUPVALUES(tt,pInfoprop,pEvent)
{
if (tt.checkIO() == false) return;
var keyCode = pEvent.keyCode;
if(  keyCode != 37 &&
keyCode != 38 &&
keyCode != 39 &&
keyCode != 40 &&
keyCode != 8 &&
keyCode != 9 &&
keyCode != 13 )
{
return true;
}
var vMPADIV = tt.findMPADIV();
if (vMPADIV.CASA_length == 0) return;
if(pEvent.which) keyCode = pEvent.which;
pEvent.returnValue = C_processKeyPOPUPVALUES(tt,pInfoprop,keyCode);
}
function C_onkeypressPOPUPVALUES(tt,pInfoprop,pEvent)
{
if (tt.checkIO() == false) return;
var keyCode = pEvent.keyCode;
if(  keyCode == 37 ||
keyCode == 38 ||
keyCode == 39 ||
keyCode == 40 ||
keyCode == 8  ||
keyCode == 9  ||
keyCode == 13 )
{
return;
}
var vMPADIV = tt.findMPADIV();
if (vMPADIV.CASA_length == 0) return;
if(pEvent.which) keyCode = pEvent.which;
pEvent.returnValue = C_processKeyPOPUPVALUES(tt,pInfoprop,keyCode);
}
function C_processKeyPOPUPVALUES(tt,pInfoprop,keyCode)
{
var vMPADIV = tt.findMPADIV();
if (vMPADIV.CASA_length == 0) return;
if (keyCode == 8)
{
var s = tt.m_userInputPOPUPVALUES;
if (s != null && s.length > 1)
s = s.substring(0, s.length-1);
else
s = "";
tt.m_userInputPOPUPVALUES = s;
tt.m_valuehelpKeyCodeFIELD = s;
tt.findMPADIV().innerHTML == "";
tt.reactOnModelUpdatePOPUPVALUES(pInfoprop);
tt.pointFocus();
return false;
}
if (keyCode == 38)
{
if (vMPADIV.CASA_itemIndex != null && vMPADIV.CASA_itemIndex != 0)
{
tt.switchStylePOPUPVALUES(vMPADIV.CASA_itemIndex,2,false);
vMPADIV.CASA_itemIndex--;
tt.switchStylePOPUPVALUES(vMPADIV.CASA_itemIndex,1,false);
tt.vscrollPOPUPVALUES(vMPADIV.CASA_innerdiv, vMPADIV.CASA_itemIndex, false);
}
return false;
}
if (keyCode == 40)
{
if (vMPADIV.CASA_itemIndex == null)
{
vMPADIV.CASA_itemIndex = 0;
tt.switchStylePOPUPVALUES(0,1,false);
}
else if (vMPADIV.CASA_itemIndex != (vMPADIV.CASA_length-1))
{
tt.switchStylePOPUPVALUES(vMPADIV.CASA_itemIndex,2,false);
vMPADIV.CASA_itemIndex++;
tt.switchStylePOPUPVALUES(vMPADIV.CASA_itemIndex,1,false);
tt.vscrollPOPUPVALUES(vMPADIV.CASA_innerdiv, vMPADIV.CASA_itemIndex,vMPADIV.CASA_plusOneItem);
}
return false;
}
if (keyCode == 37)
{
vMPADIV.CASA_innerdiv.scrollLeft -= 10;
return false;
}
if (keyCode == 39)
{
vMPADIV.CASA_innerdiv.scrollLeft += 10;
return false;
}
if (keyCode == 13 && vMPADIV.CASA_itemIndex != null)
{
tt.setPropertyValue(pInfoprop+".selIndex",tt.determinSelectionIndexPOPUPVALUES(vMPADIV.CASA_itemIndex));
tt.setPropertyValue(pInfoprop+".flushMethod",tt.m_flushMethodFIELD);
tt.invokeMethodInModel(pInfoprop+".triggerSel");
tt.addFocusRequestor(tt.m_controlFIELD);
tt.pointFocus();
tt.blockActivities();
tt.focusNextInput(tt.m_controlFIELD);
return false;
}
if (keyCode == 9)
{
vMPADIV.style.display = "none";
vMPADIV.innerHTML = "";
tt.setPropertyValue(pInfoprop+".available", "false");
tt.addFocusRequestor(tt.m_controlFIELD);
tt.pointFocus();
tt.blockActivities();
tt.focusNextInput(tt.m_controlFIELD);
return false;
}
if ((keyCode == 27)||(keyCode == 13 && vMPADIV.CASA_itemIndex != null))
{
vMPADIV.style.display = "none";
vMPADIV.innerHTML = "";
tt.setPropertyValue(pInfoprop+".available", "false");
tt.addFocusRequestor(tt.m_controlFIELD);
tt.pointFocus();
return false;
}
tt.m_userInputPOPUPVALUES = tt.m_userInputPOPUPVALUES + String.fromCharCode(keyCode);
tt.m_valuehelpKeyCodeFIELD = tt.m_userInputPOPUPVALUES;
tt.findMPADIV().innerHTML == "";
tt.reactOnModelUpdatePOPUPVALUES(pInfoprop);
tt.pointFocus();
return true;
}
function C_vscrollPOPUPVALUES(tt,pDiv,pItemIndex,plusOneItem)
{
var vDIV = tt.findMPADIV();
tt.calculatePageOffset(pDiv);
var vYMin = pDiv.CASA_pageoffsettop + pDiv.scrollTop;
var vYMax = vYMin + pDiv.offsetHeight - 0;
if (vDIV.CASA_topList.length > 0)
vYMax -= 18;
var vTR = tt.parent.document.getElementById("MPADIVLIN_"+pItemIndex);
var vPlusOneItem = 0;
if (plusOneItem == true) vPlusOneItem = -1;
var zzz = 0;
if (vDIV.CASA_topList.length == 0 && plusOneItem == false) zzz = 10;
var vTROffsetTop = pDiv.CASA_pageoffsettop-0 + vTR.offsetHeight*(pItemIndex-vPlusOneItem)-0;
if (vTROffsetTop < vYMin)
pDiv.scrollTop = pDiv.scrollTop - vTR.offsetHeight;
else if ((vTROffsetTop+2*vTR.offsetHeight-zzz) > vYMax)
pDiv.scrollTop = pDiv.scrollTop + vTR.offsetHeight -0;
}
