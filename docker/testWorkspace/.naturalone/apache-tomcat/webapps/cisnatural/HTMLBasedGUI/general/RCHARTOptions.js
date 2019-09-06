function addVersionInfoRCHARTOPTIONS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('RCHARTOPTIONS');
}
var m_rpieoptions = null;
var m_rchartoptions = null;
function iccRchartOptions()
{
if ( m_rchartoptions != null ) return;
m_rchartoptions = new Object();
m_rchartoptions.legend =
{  position: 'top',
labels: {
boxWidth:10,
fontSize:12,
}
};
m_rchartoptions.scales =
{
xAxes: [{
display: true,
scaleLabel: {
display: true,
labelString: 'Year'
}
}],
yAxes: [{
display: true,
scaleLabel: {
display: true,
labelString: 'Value'
}
}]
};
m_rchartoptions.animation = new Object();
m_rchartoptions.animation.animateRotate = true;
m_rchartoptions.animation.animateScale = false;
m_rchartoptions.tooltips =
{
enabled: true
};
}
function iccRpieOptions()
{
if ( m_rpieoptions != null ) return;
m_rpieoptions = new Object();
m_rpieoptions.legend =
{  position: 'top',
labels: {
boxWidth:10,
fontSize:12,
}
};
m_rpieoptions.animation = new Object();
m_rpieoptions.animation.animateRotate = true;
m_rpieoptions.animation.animateScale = false;
m_rpieoptions.tooltips =
{
enabled: true
};
}
