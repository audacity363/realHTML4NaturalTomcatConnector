function addVersionInfoLINECHARTCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('LINECHARTCONTROLS');
}
function iccLC(cc,ccid,romumethod,infoprop,pWidth,pHeight)
{
cc.CASA_infoprop = infoprop;
cc.CASA_frame = parent.frames["LCF"+ccid];
cc.CASA_width = pWidth;
cc.CASA_height = pHeight;
registerListener(romumethod);
}
function romuLC(cc)
{
var ci = getPropertyValue(cc.CASA_infoprop+".changeIndex");
if (cc.CASA_memChangeIndex == ci)
return;
if (cc.CASA_memChangeIndex != null)
cc.CASA_frame.clearLinesLC();
cc.CASA_memChangeIndex = ci;
var vCounter = 0;
while (true)
{
var base = cc.CASA_infoprop+".lineChartSeries["+vCounter+"].";
var id = getPropertyValue(base+"id");
if (id == null) break;
var name = getPropertyValue(base+"name");
var uom = getPropertyValue(base+"unit");
var color = getPropertyValue(base+"color");
var values = getPropertyValue(base+"values");
cc.CASA_frame.addSeriesLC(name, uom, color, values,cc.CASA_height);
vCounter++;
}
var startDate = getPropertyValue(cc.CASA_infoprop+".startDate");
var endDate = getPropertyValue(cc.CASA_infoprop+".endDate");
cc.CASA_frame.setTimeRangeLC(startDate, endDate);
}
