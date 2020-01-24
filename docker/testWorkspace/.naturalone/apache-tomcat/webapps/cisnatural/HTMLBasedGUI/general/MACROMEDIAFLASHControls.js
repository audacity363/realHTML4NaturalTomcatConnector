function addVersionInfoMACROMEDIAFLASHCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('MACROMEDIAFLASHCONTROLS');
}
function iccMACROMEDIAFLASH(cc, valueprop)
{
cc.CASA_valueprop = valueprop;
}
function romuMACROMEDIAFLASH(cc,height,width)
{
var furl = getPropertyValue(cc.CASA_valueprop+".url");
var fobj = '<object type="application/x-shockwave-flash" data="'+furl+'"'
+ 'width="'+C_adjustUnits(width)+'" height="'+C_adjustUnits(height)+'">'
+ '<param name="movie" value="'+furl+'">'
+ '<param name="quality" value="high">'
+ '<param name="swliveconnect" value="true">'
+ '<p>Please get <a href="http://www.macromedia.com/go/getflashplayer">Macromedia Flash-Player</a>.</p>'
+ '</object>';
cc.innerHTML = fobj;
}
function reactOnFlushEventMACROMEDIAFLASH(cc, flushInfo)
{
setPropertyValue(cc.CASA_valueprop+".flushInfo", flushInfo);
invokeMethodInModel(cc.CASA_valueprop+".reactOnFlushEventInternally");
}
