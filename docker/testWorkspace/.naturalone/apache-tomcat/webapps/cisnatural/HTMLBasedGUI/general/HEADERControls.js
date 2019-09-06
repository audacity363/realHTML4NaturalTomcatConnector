function addVersionInfoHEADERCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('HEADERCONTROLS');
}
function iccHEADER(cc,chdr,chdrtab,romumethod,visibleprop)
{
cc.CASA_memvpv = undefined;
cc.CASA_dir = undefined;
registerListener(romumethod);
addHeaderObject(chdr);
if (visibleprop != null) cc.CASA_visibleprop = visibleprop;
cc.CASA_headerTab = chdrtab;
}
function reactOnModelUpdateHEADER(cc)
{
var vpv = getPropertyValue(cc.CASA_visibleprop);
if (cc.CASA_memvpv == vpv &&
cc.CASA_dir == m_direction)
return;
if (cc.CASA_memvpv != vpv)
{
cc.CASA_memvpv = vpv;
vpv = convertStatusToVisible(vpv,CONTROLTYPE_CONTAINER);
if (vpv == "false") cc.style.display = "none";
else cc.style.display = "";
if (m_doLog) addLogMessage("reactOnModelUpdateHEADER - calling reactOnResize()");
parent.reactOnResize();
}
if(cc.CASA_dir != m_direction)
{
if ((m_direction == 'ltr' && cc.CASA_dir == 'rtl') || (m_direction == 'rtl'))
{
if(cc.CASA_headerTab.align == 'left')
cc.CASA_headerTab.align = 'right';
else if(cc.CASA_headerTab.align == 'right')
cc.CASA_headerTab.align = 'left';
}
}
cc.CASA_dir = m_direction;
}
