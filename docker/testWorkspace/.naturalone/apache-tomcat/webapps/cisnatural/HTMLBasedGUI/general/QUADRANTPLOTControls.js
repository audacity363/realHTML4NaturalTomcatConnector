function addVersionInfoQUADRANTPLOTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('QUADRANTPLOTCONTROLS');
}
function onClickQUADRANTPLOT(pQuadrantPlotProp, pId)
{
setPropertyValue(pQuadrantPlotProp + ".selId", pId);
invokeMethodInModel(pQuadrantPlotProp + ".onClick");
}
