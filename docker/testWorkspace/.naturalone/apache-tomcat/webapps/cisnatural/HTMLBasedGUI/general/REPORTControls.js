function addVersionInfoREPORTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('REPORTCONTROLS');
}
var s_prevSelectedCellREPORT;
var s_prevSelectedColorREPORT;
function openContextmenuREPORT(pReportProp, pId, pEvent)
{
setContextMenuXYPAGE(pEvent.clientX,pEvent.clientY);
setPropertyValue(pReportProp + ".selId", pId);
invokeMethodInModel(pReportProp + ".onContextMenu");
pEvent.returnValue = false;
}
function onClickREPORT(pReportProp, pId)
{
setPropertyValue(pReportProp + ".selId", pId);
invokeMethodInModel(pReportProp + ".onClick");
try
{
s_prevSelectedCellREPORT.className = "REPORTCellContent";
}
catch (eexxcc)
{
}
try
{
var c = parent.document.getElementById("RID_"+pId);
c.className = "REPORTCellSelectedContent";
s_prevSelectedCellREPORT = c;
}
catch (eexxcc)
{
}
}
