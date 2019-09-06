function addVersionInfoTITLEBARCENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TITLEBARCENTRAL');
}
function iccTITLEBAR(tt,cc,romumethod,ccid,valueprop,visibleprop,withcloseprop,imageprop,helpid,straighttext,inpageusage,
closemethod, pagepopupcommandsprop, preferedframe, withclose)
{
if(cc == null) return;
cc.CASA_memvalue = undefined;
cc.CASA_memvpv = undefined;
cc.CASA_memwcvalue= undefined;
cc.CASA_titleid = ccid;
if(preferedframe != null)
cc.CASA_preferedframe = preferedframe;
else
cc.CASA_preferedframe = "";
if (helpid != null) cc.CASA_helpid = helpid;
if (straighttext != null) cc.CASA_straighttext = straighttext;
if (valueprop != null)
{
cc.CASA_valueprop = valueprop;
cc.CASA_spancontrol = tt.parent.gebid("TITLEBARSPAN"+ccid);
}
if (withcloseprop != null)
{
cc.CASA_withcloseprop = withcloseprop;
}
if (withcloseprop != null || withclose == "true")
{
cc.CASA_wcimg = tt.parent.gebid("TITLEBAR"+ccid+"CLOSE");
}
if (visibleprop != null)
{
cc.CASA_visibleprop = visibleprop;
}
if (imageprop != null)
{
cc.CASA_imageprop = imageprop;
cc.CASA_img = tt.parent.gebid("TITLEBAR"+ccid+"IMG");
}
if (inpageusage != "true")
{
tt.addHeaderObject(tt.parent.gebid("TITLEBARTITLEBARTR"));
}
if(pagepopupcommandsprop != null)
{
cc.CASA_pagepopupcommandsprop = pagepopupcommandsprop;
cc.CASA_pagepopupcommandscontrol = tt.parent.gebid("TITLEBAR"+ccid+"PAGEPOPUPCOMMANDS");
}
cc.CASA_closemethod = closemethod;
if (romumethod != null) tt.registerListener(romumethod);
cc.C = tt;
}
function onExecutePageItemTITLEBAR(pCurrentItem)
{
if(pCurrentItem == null || pCurrentItem.C == null) return;
pCurrentItem.C.invokeMethodInModel(pCurrentItem.CASA_pagepopupcommandsprop +
"["+ pCurrentItem.CASA_counter+"].execute");
}
function romuTITLEBAR(cc)
{
var vTopFrame = null;
if(cc.CASA_preferedframe != "")
{
vTopFrame = this.C_findFrame(this,cc.CASA_preferedframe,true);
if(vTopFrame == null) vTopFrame = this.C_findFrame(this,"_top",true);
}
if (cc.CASA_valueprop != null)
{
var v = cc.C.getPropertyValue(cc.CASA_valueprop);
if (v == null) v = "";
if (cc.CASA_memvalue == undefined || v != cc.CASA_memvalue)
{
cc.CASA_memvalue = v;
cc.CASA_spancontrol.innerHTML = v;
}
}
if (cc.CASA_pagepopupcommandsprop != null)
{
if(cc.CASA_pagepopupcommandscontrol != null)
{
var vPageCommandHTML = "";
var vCounter = 0;
while(true)
{
var vBasePropName = cc.CASA_pagepopupcommandsprop + "["+vCounter+"].";
var vPageCommandURL = cc.C.getPropertyValue(vBasePropName+"imageURL");
if(vPageCommandURL == null) vPageCommandURL = "";
if(vPageCommandURL == "") break;
var vPageCommandTitle = cc.C.getPropertyValue(vBasePropName+"title");
if(vPageCommandTitle == null) vPageCommandTitle = "";
if(vCounter == 0) vPageCommandHTML="<table><tr> \n";
var vCurrentImgId = cc.CASA_pagepopupcommandscontrol.id + "_IMG"+vCounter;
var vCurrentTitleId = cc.CASA_pagepopupcommandscontrol.id + "_TITLE"+vCounter;
vPageCommandHTML += "<td>\n";
var vTitle = "";
if(vPageCommandTitle!= null) vTitle = vPageCommandTitle;
vPageCommandHTML += "<img  id='"+vCurrentImgId+"' class='TITLEBARCellPAGECommand' border='0' src='"+vPageCommandURL+"' title='"+cc.C.convertApos(vTitle)+"' galleryimg='false' >"+
"</td>";
vCounter++;
}
if(vCounter != 0)
{
vPageCommandHTML+=" </tr></table>\n";
}
cc.CASA_pagepopupcommandscontrol.innerHTML = vPageCommandHTML;
if(cc.C.parent && cc.C.parent.onExecuteItem)
{
for(var i=0;i<vCounter;i++)
{
var vImageControl = getCASAControlByIdTITLEBAR(cc.C.parent, vTopFrame, cc.CASA_pagepopupcommandscontrol.id + "_IMG"+i);
if(vImageControl)
{
vImageControl.onclick = cc.C.parent.onExecuteItem;
vImageControl.CASA_counter = i;
vImageControl.CASA_pagepopupcommandsprop = cc.CASA_pagepopupcommandsprop;
vImageControl.C = cc.C;
}
}
}
}
}
if (cc.CASA_withcloseprop != null)
{
var vwc = cc.C.getPropertyValue(cc.CASA_withcloseprop);
if (vwc == null) vwc = "";
if (cc.CASA_memwcvalue == undefined || vwc != cc.CASA_memwcvalue)
{
cc.CASA_memwcvalue = vwc;
if (vwc != "false")
{
cc.CASA_wcimg.style.display = "";
}
else
{
cc.CASA_wcimg.style.display = "none";
}
}
}
if (cc.CASA_imageprop != null)
{
var vimg = cc.C.getPropertyValue(cc.CASA_imageprop);
if (vimg == null) vimg = "";
if (cc.CASA_memimgvalue == undefined || vimg != cc.CASA_memimgvalue)
{
cc.CASA_memimgvalue = vimg;
cc.CASA_img.src = vimg;
}
}
if (cc.CASA_visibleprop != null)
{
var vpv = cc.C.getPropertyValue(cc.CASA_visibleprop);
if (cc.CASA_memvpv == undefined || vpv != cc.CASA_memvpv)
{
vpv = cc.C.convertStatusToVisible(vpv,cc.C.CONTROLTYPE_CONTAINER);
if (vpv == "false") cc.style.display = "none";
else cc.style.display = "";
cc.C.parent.reactOnResize();
}
}
}
function getCASAControlByIdTITLEBAR(pParentFrame, pAlternativeFrame, pCASAId)
{
if(pAlternativeFrame)
return pAlternativeFrame.document.getElementById(pCASAId);
else
return pParentFrame.document.getElementById(pCASAId);
}
function onHelpTITLEBAR(cc)
{
if (cc.C.checkIO() == false) return;
cc.C.setPropertyValue("param2",cc.CASA_helpid);
cc.C.invokeMethodInModel("reactOnHelpRequestForHelpId");
}
function closePageTITLEBAR(cc)
{
if (cc.C.checkIO() == false) return;
var cm = "endProcess";
if (cc.CASA_closemethod != null)
cm = cc.CASA_closemethod;
if (cc.C.parent.parent.m_allowClose == null || cc.C.parent.parent.m_allowClose == true)
cc.C.invokeMethodInModel(cm);
else
alert('Close command is not supported here - the page is currently not running inside a workplace environment.');
}
function closePagePopupTITLEBAR(parentcc, popupcc)
{
if (parentcc.C.checkIO() == false || parentcc.CASA_closemethod == null ) return;
if (parentcc.C.parent.parent.m_allowClose == null || parentcc.C.parent.parent.m_allowClose == true)
popupcc.WORKAREA.csciframe.invokeMethodInModel(parentcc.CASA_closemethod);
}
