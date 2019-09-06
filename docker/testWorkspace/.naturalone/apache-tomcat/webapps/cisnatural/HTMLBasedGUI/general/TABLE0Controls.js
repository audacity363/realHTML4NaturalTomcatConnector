function addVersionInfoTABLE0CONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('TABLE0CONTROLS');
}
function iccFlashTABLE0(id,flashprop)
{
parent["FL_"+id] = parent.document.getElementById("FL_" + id);
registerListener(parent["romuFlash"+id]);
parent["FL_"+id].CASA_flashprop = flashprop;
parent["FL_"+id].CASA_flashbuffer = "inittini";
}
function romuFlashTABLE0(cc)
{
var vf = getPropertyValue(cc.CASA_flashprop);
if (vf == null) return;
if (vf == "") return;
if (vf == cc.CASA_flashbuffer) return;
cc.CASA_flashbuffer = vf;
flashTABLE0(cc,cc.parentNode.parentNode);
}
function flashTABLE0(cc,sizingNode)
{
cc.CASA_flashcounter = 0;
cc.style.width = C_adjustUnits(sizingNode.offsetWidth);
cc.style.height = C_adjustUnits(sizingNode.offsetHeight);
cc.style.display = "";
cc.className = "FLASHActive";
setTimeout("flashContinueTABLE0('"+cc.id+"');",1);
}
function flashContinueTABLE0(id)
{
cc = parent[id];
cc.style.filter = "alpha(opacity="+(20-cc.CASA_flashcounter*4)+")";
cc.CASA_flashcounter++;
if (cc.CASA_flashcounter < 5)
{
setTimeout("flashContinueTABLE0('"+cc.id+"');",1);
}
else
{
cc.style.width = 0;
cc.style.height = 0;
cc.style.display = "none";
}
}
