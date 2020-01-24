function addVersionInfoSHAPECONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SHAPECONTROLS');
}
function openContextmenuSHAPE(pShapeProp, pId, pEvent)
{
setContextMenuXYPAGE(pEvent.clientX,pEvent.clientY);
setPropertyValue(pShapeProp + ".selId", pId);
invokeMethodInModel(pShapeProp + ".onContextMenu");
pEvent.returnValue = false;
}
function onClickSHAPE(pShapeProp, pId)
{
setPropertyValue(pShapeProp + ".selId", pId);
invokeMethodInModel(pShapeProp + ".onClick");
}
