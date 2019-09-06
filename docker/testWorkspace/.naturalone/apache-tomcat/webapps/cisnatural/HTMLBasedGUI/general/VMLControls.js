function addVersionInfoVMLCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('VMLCONTROLS');
}
var m_vml_barcolors = [];
m_vml_barcolors[0]  = "#FF8080";
m_vml_barcolors[1]  = "#80FF80";
m_vml_barcolors[2]  = "#8080FF";
m_vml_barcolors[3]  = "#FFFF80";
m_vml_barcolors[4]  = "#80FFFF";
m_vml_barcolors[5]  = "#FF80FF";
m_vml_barcolors[6]  = "#C06060";
m_vml_barcolors[7]  = "#60C060";
m_vml_barcolors[8]  = "#6060C0";
m_vml_barcolors[9]  = "#C0C060";
m_vml_barcolors[10] = "#60C0C0";
m_vml_barcolors[11] = "#C060C0";
function reactOnModelUpdateVECSINGLEHBARS(casacontrol)
{
var result = "";
var titles = [];
titlesCSV = getPropertyValue(casacontrol.CASA_titlesprop);
valuesCSV = getPropertyValue(casacontrol.CASA_valuesprop);
var titleArray = decodeCSVString(titlesCSV);
var valueArray = decodeCSVString(valuesCSV);
var vbarwidth = casacontrol.CASA_xpixelscale-12;
var vbarleftshift = Math.round((casacontrol.CASA_xpixelscale-12)/2);
var bottomdistance = casacontrol.CASA_pixelheight - 50;
var leftdistance = 50;
vmaxvalue = 0;
for (i=0; i<valueArray.length; i++)
if (valueArray[i]*(-1)*(-1) > vmaxvalue)
vmaxvalue = valueArray[i];
var vmaxpixelheight = casacontrol.CASA_pixelheight - 80;
vheightfactor = vmaxvalue/vmaxpixelheight;
vyscale = 0.0001;
while (true)
{
if ((vyscale * 10) >= vmaxvalue) break;
vyscale = vyscale * 10;
}
vycount = Math.round(vmaxvalue/vyscale);
result += "<v:line style='position:absolute;z-index:1000' from='"+leftdistance+";"+bottomdistance+"' to='"+leftdistance+";5'/>";
for (i=0; i<vycount; i++)
{
topy = bottomdistance - Math.round((i+1)*vyscale/vheightfactor);
result += "<v:line style='position:absolute;z-index:1000' from='"+(leftdistance-10)+";"+topy+"' to='"+leftdistance+";"+topy+"'/>";
result += "<span style='position:absolute;left:5px;top:"+C_adjustUnits((topy-8))+"'>"+((i+1)*vyscale)+"</span>";
}
for (i=0; i<titleArray.length+1; i++)
{
leftx = i*casacontrol.CASA_xpixelscale+leftdistance;
rightx = (i+1)*casacontrol.CASA_xpixelscale+leftdistance;
result += "<v:line style='position:absolute;z-index:1000' from='"+leftx+";"+bottomdistance+"' to='"+rightx+";"+bottomdistance+"'/>";
if (i != titleArray.length)
{
result += "<v:line style='position:absolute;z-index:1000' from='"+rightx+";"+bottomdistance+"' to='"+rightx+";"+(bottomdistance+10)+"'/>";
result += "<span style='position:absolute;left:"+C_adjustUnits((rightx-5))+";top:"+C_adjustUnits((bottomdistance+12))+"'>"+titleArray[i]+"</span>";
vbarheight = Math.round(valueArray[i]/vheightfactor);
result += "<v:rect style='position:absolute;left:"+C_adjustUnits((rightx-vbarleftshift))+";top:"+C_adjustUnits((bottomdistance-vbarheight))+";width:"+C_adjustUnits(vbarwidth)+";height:"+C_adjustUnits(vbarheight)+"' fillcolor='#FF8080'/>";
}
}
casacontrol.innerHTML = result;
}
function reactOnModelUpdateVECHBARS(casacontrol)
{
var result = "";
var titles = [];
titlesCSV = getPropertyValue(casacontrol.CASA_titlesprop);
valuesArray = [];
var i = 0;
while (true)
{
valuesCSV = getPropertyValue(casacontrol.CASA_valuesarrayprop+'['+i+'].'+casacontrol.CASA_valuesitemprop);
if (valuesCSV == null) break;
valuesArray[i] = decodeCSVString(valuesCSV);
i++;
}
var titleArray = decodeCSVString(titlesCSV);
vbarwidth = Math.round((casacontrol.CASA_xpixelscale-12) / valuesArray.length);
vbarleftshift = Math.round((casacontrol.CASA_xpixelscale-12)/2);
var bottomdistance = casacontrol.CASA_pixelheight - 50;
var leftdistance = 50;
vmaxvalue = 0;
for (i=0; i<valuesArray.length; i++)
{
valueArray = valuesArray[i];
for (j=0; j<valueArray.length; j++)
if (valueArray[j]*(-1)*(-1) > vmaxvalue)
vmaxvalue = valueArray[j];
}
vmaxpixelheight = casacontrol.CASA_pixelheight - 80;
vheightfactor = vmaxvalue/vmaxpixelheight;
vyscale = 0.0001;
while (true)
{
if ((vyscale * 10) >= vmaxvalue) break;
vyscale = vyscale * 10;
}
vycount = Math.round(vmaxvalue/vyscale);
result += "<v:line style='position:absolute;z-index:1000' from='"+leftdistance+";"+bottomdistance+"' to='"+leftdistance+";5'/>";
for (i=0; i<vycount; i++)
{
topy = bottomdistance - Math.round((i+1)*vyscale/vheightfactor);
result += "<v:line style='position:absolute;z-index:1000' from='"+(leftdistance-10)+";"+topy+"' to='"+leftdistance+";"+topy+"'/>";
var scaleValue = (i+1)*vyscale;
scaleValue = roundScaleValueVML(scaleValue);
result += "<span style='position:absolute;left:5px;top:"+C_adjustUnits((topy-8))+"'>"+(scaleValue)+"</span>";
}
for (i=0; i<titleArray.length+1; i++)
{
leftx = i*casacontrol.CASA_xpixelscale+leftdistance;
rightx = (i+1)*casacontrol.CASA_xpixelscale+leftdistance;
result += "<v:line style='position:absolute;z-index:1000' from='"+leftx+";"+bottomdistance+"' to='"+rightx+";"+bottomdistance+"'/>";
if (i != titleArray.length)
{
result += "<v:line style='position:absolute;z-index:1000' from='"+rightx+";"+bottomdistance+"' to='"+rightx+";"+(bottomdistance+10)+"'/>";
result += "<span style='position:absolute;left:"+C_adjustUnits((rightx-5))+";top:"+C_adjustUnits((bottomdistance+12))+"'>"+titleArray[i]+"</span>";
}
}
var displaytype = casacontrol.CASA_displaytype;
if (casacontrol.CASA_displaytypeprop != null)
displaytype = getPropertyValue(casacontrol.CASA_displaytypeprop);
for (i=0; i<titleArray.length; i++)
{
leftx = i*casacontrol.CASA_xpixelscale+leftdistance;
rightx = (i+1)*casacontrol.CASA_xpixelscale+leftdistance;
for (j=0; j<valuesArray.length; j++)
{
velement = valuesArray[j];
if (i >= velement.length)
continue;
vbarheight = Math.round(velement[i]/vheightfactor);
if (displaytype == null || displaytype == "BARS")
{
result += "<v:rect style='position:absolute;left:"+C_adjustUnits((rightx-vbarleftshift+(j*vbarwidth)))+";top:"+C_adjustUnits((bottomdistance-vbarheight))+";width:"+C_adjustUnits(vbarwidth)+";height:"+C_adjustUnits(vbarheight)+"' fillcolor='"+m_vml_barcolors[j]+"'/>";
}
if (displaytype == "LINES")
{
if (i != 0)
{
previousbarheight = Math.round(velement[i-1]/vheightfactor);
result += "<v:line style='position:absolute;z-index:999' from='"+(rightx-casacontrol.CASA_xpixelscale)+";"+(bottomdistance-previousbarheight)+"' to='"+rightx+";"+(bottomdistance-vbarheight)+"' strokecolor='"+m_vml_barcolors[j]+"' strokeweight='2px'/>";
}
}
if (displaytype == "POINTS" || displaytype == "LINES")
{
result += "<v:rect style='position:absolute;z-index:1000;left:"+C_adjustUnits((rightx-2))+";top:"+C_adjustUnits((bottomdistance-vbarheight-2))+";width:5px;height:5px' fillcolor='"+m_vml_barcolors[j]+"'/>";
}
}
}
var legendx = titleArray.length * casacontrol.CASA_xpixelscale + leftdistance + 80;
for (i=0; i<valuesArray.length; i++)
{
vlegendtext = getPropertyValue(casacontrol.CASA_valuesarrayprop+'['+i+'].'+casacontrol.CASA_nameitemprop);
result += "<v:rect style='position:absolute;left:"+C_adjustUnits(legendx)+";top:"+C_adjustUnits(((i+1)*20))+";width:25px;height:15px' fillcolor='"+m_vml_barcolors[i]+"'/>";
result += "<span style='position:absolute;left:"+C_adjustUnits((legendx+30))+";top:"+C_adjustUnits(((i+1)*20))+"'>"+vlegendtext+"</span>";
}
casacontrol.innerHTML = result;
}
function roundScaleValueVML(scaleValue)
{
var s = "" + scaleValue;
var si;
var firstOccurance = -1;
var secondOccurance = -1;
for (si=0; si<s.length;si++)
{
var c = s.charAt(si);
if (c == "0" || c == ".")
continue;
if (firstOccurance == -1)
firstOccurance = si;
else
{
secondOccurance = si;
break;
}
}
if (secondOccurance != -1)
return s.substring(0,firstOccurance+1);
else
return s;
}
var VML_360 = 23600000;
function reactOnModelUpdateVECPIE(casacontrol)
{
var result = "";
var titles = [];
var titlesCSV = getPropertyValue(casacontrol.CASA_titlesprop);
var valuesCSV = getPropertyValue(casacontrol.CASA_valuesprop);
var titlearray = decodeCSVString(titlesCSV);
var valuearray = decodeCSVString(valuesCSV);
var total = 0;
for (i = 0; i<valuearray.length; i++)
total += (valuearray[i] * (-1) * (-1));
var currentangle = VML_360 / 4;
var circlesize = casacontrol.CASA_pixelheight-40;
for (i = 0; i<valuearray.length; i++)
{
var angle = Math.round(valuearray[i] / total * VML_360);
currentangle = currentangle - angle;
result += "<v:shape fillcolor='"+m_vml_barcolors[i]+"'"+
" style='z-index:"+(900+i)+";position:absolute;left:20px;top:20px;width:"+C_adjustUnits(circlesize)+";height:"+C_adjustUnits(circlesize)+"'"+
" coordsize='1000,1000'"+
" coordorigin='0,0'"+
" path='M 500 500 AE 500 500 500 500 "+currentangle+" "+angle+"'>"+
"</v:shape>";
}
var legendx = (casacontrol.CASA_pixelheight * (-1) * (-1)) + 50;
for (i=0; i<titlearray.length; i++)
{
result += "<v:rect style='position:absolute;left:"+C_adjustUnits(legendx)+";top:"+C_adjustUnits(((i+1)*20))+";width:25px;height:15px' fillcolor='"+m_vml_barcolors[i]+"'/>";
result += "<span style='position:absolute;left:"+C_adjustUnits((legendx+30))+";top:"+C_adjustUnits(((i+1)*20))+"'>"+titlearray[i] + " - " + valuearray[i] +"</span>";
}
casacontrol.innerHTML = result;
}
