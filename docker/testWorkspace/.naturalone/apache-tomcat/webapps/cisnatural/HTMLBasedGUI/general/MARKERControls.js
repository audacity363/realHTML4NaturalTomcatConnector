function addVersionInfoMARKERCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('MARKERCONTROLS');
}
var m_markers = [];
var m_overlays = null;
function iccMARKER(cc,osmid,valueprop,romumethod,textprop,onclickmethod,ondblclickmethod,maxcount,straighttext,positioning,
offset,insertfirst,autopan,autopananimation,autopanmargin,renderaspopover)
{
cc.CASA_valueprop = valueprop;
cc.CASA_maxcount = maxcount;
cc.CASA_osmid = osmid.id;
if ( onclickmethod != null ) cc.CASA_onclickmethod = onclickmethod;
if ( ondblclickmethod != null ) cc.CASA_ondblclickmethod = ondblclickmethod;
if ( textprop != null ) cc.CASA_textprop = textprop;
if ( straighttext != null ) cc.CASA_straighttext = straighttext;
if ( positioning != null ) cc.CASA_positioning = positioning;
if ( offset != null ) cc.CASA_offset = offset;
if ( insertfirst != null ) cc.CASA_insertfirst = insertfirst;
if ( autopan != null ) cc.CASA_autopan = autopan;
if ( autopananimation != null ) cc.CASA_autopananimation = autopananimation;
if ( autopanmargin != null ) cc.CASA_autopanmargin = autopanmargin;
if ( renderaspopover != null ) cc.CASA_renderaspopover = renderaspopover;
m_markers.push(cc);
for ( i = 0; i < cc.CASA_maxcount; i++){
registerPropertyListener(romumethod, cc.CASA_valueprop + ".items["+i+"].visible",cc.id);
if ( cc.CASA_textprop != undefined )
registerPropertyListener(romumethod, cc.CASA_valueprop + ".items["+i+"]." + cc.CASA_textprop,cc.id);
}
}
function reactMARKER(cc,evt)
{
var s = evt.currentTarget.id.split("_");
if (cc.CASA_onclickmethod != null) invokeMethodInModel(cc.CASA_valueprop + ".items["+ s[2] +"]."+cc.CASA_onclickmethod);
}
function romuMARKER2(osmid)
{
updateOverlays(this.getOSMAP(osmid),osmid);
}
function romuMARKER(osmcc)
{
if ( m_overlays != null ) return updateOverlays(this.getOSMAP(osmcc.id),osmcc.id);
else return createOverlays(this.getOSMAP(osmcc.id),osmcc.id);
}
function updateOverlays(map,osmid)
{
if ( map == null ) return;
for (i=0;i<m_overlays.length;i++)
{
if ( m_overlays[i].cc.CASA_osmid != osmid ) continue;
var osmoverlay =  map.getOverlayById(m_overlays[i].id);
var vis = getPropertyValue(m_overlays[i].item + ".visible");
if ( vis != "true" && vis != true ) osmoverlay.getElement().style.display = "none";
else osmoverlay.getElement().style.display = "";
if ( m_overlays[i].cc.CASA_textprop != undefined )
{
var text = getPropertyValue (m_overlays[i].item + "." + m_overlays[i].cc.CASA_textprop);
if ( m_overlays[i].cc.CASA_renderaspopover != undefined && m_overlays[i].cc.CASA_renderaspopover == 'true' )
osmoverlay.getElement().setAttribute("data-content", text);
else
{
if ( m_overlays[i].cc.CASA_straighttext != undefined && m_overlays[i].cc.CASA_straighttext != 'true' )
osmoverlay.getElement().innerHTML = text;
else
osmoverlay.getElement().innerHTML = '<p>' + text + '</p>';
}
}
osmoverlay.setPosition(parent.ol.proj.fromLonLat([parseFloat(getPropertyValue (m_overlays[i].item + ".longitude")), parseFloat(getPropertyValue (m_overlays[i].item + ".latitude"))]));
osmoverlay.changed();
}
if (m_overlays.length > 0 ) map.renderSync();
return false;
}
function createOverlays(map,osmid)
{
if ( m_overlays == null ) m_overlays = [];
var upd = false;
for (i=0;i<m_markers.length;i++)
{
if ( m_markers[i].CASA_osmid != osmid ) continue;
for (j=0;j<m_markers[i].CASA_maxcount;j++)
{
var moverlay = new Object();
moverlay.cc = m_markers[i];
try {
moverlay.item = m_markers[i].CASA_valueprop + ".items["+j+"]";
}catch(mex){break;}
var vis = getPropertyValue(moverlay.item + ".visible");
moverlay.id = "" + m_markers[i].id + "_" + j;
var mcc = parent.document.getElementById(moverlay.id);
if ( m_markers[i].CASA_textprop != undefined )
{
var text = getPropertyValue (moverlay.item + "." + m_markers[i].CASA_textprop);
if ( m_markers[i].CASA_renderaspopover != undefined && m_markers[i].CASA_renderaspopover == 'true' )
mcc.setAttribute("data-content", text);
else {
if ( m_markers[i].CASA_straighttext != undefined && m_markers[i].CASA_straighttext != 'true' )
mcc.innerHTML = text;
else
mcc.innerHTML = '<p>' + text + '</p>';
}
}
var overlay = new parent.ol.Overlay({
position: parent.ol.proj.fromLonLat([parseFloat(getPropertyValue (moverlay.item + ".longitude")), parseFloat(getPropertyValue (moverlay.item + ".latitude"))]),
element: mcc,
id:moverlay.id,
stopEvent: true });
if ( m_markers[i].CASA_positioning != undefined )
overlay.set('positioning', m_markers[i].CASA_positioning, true);
if ( m_markers[i].CASA_offset != undefined )
overlay.set('offset', parseInt(m_markers[i].CASA_offset), true);
if ( m_markers[i].CASA_insertfirst == "false" )
overlay.set('insertFirst', false, true);
if ( m_markers[i].CASA_autopan == "true" )
overlay.set('autoPan', true, true);
if ( m_markers[i].CASA_insertfirst == "false" )
overlay.set('insertFirst', false, true);
if ( m_markers[i].CASA_autopananimation != undefined )
overlay.set('autoPanAnimation', new Object({ duration: parseInt(m_markers[i].CASA_autopananimation)}), true);
if ( m_markers[i].CASA_autopanmargin != undefined )
overlay.set('autoPanMargin', parseInt(m_markers[i].CASA_autopanmargin), true);
if ( vis != "true" && vis != true ) overlay.getElement().style.display = "none";
map.addOverlay(overlay);
m_overlays.push(moverlay);
upd = true;
}
if ( m_markers[i].CASA_renderaspopover != undefined && m_markers[i].CASA_renderaspopover == 'true' )
parent.$('[data-toggle="popover"]').popover();
}
return upd;
}
