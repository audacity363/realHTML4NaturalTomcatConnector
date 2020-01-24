function addVersionInfoNETMEETINGCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('NETMEETINGCONTROLS');
}
function iccNETMEETING(cc,romumethod,id,classid,calltoprop,modeprop,width,xinitparams,setxparams,getxparams,reloadprop)
{
registerListener(romumethod);
if (id != null) cc.CASA_id = id;
if (classid  != null) cc.CASA_classid  = classid ;
if (calltoprop!= null) cc.CASA_calltoprop  = calltoprop ;
if (modeprop != null) cc.CASA_modeprop = modeprop;
if (xinitparams != null) cc.CASA_xinitparams = xinitparams;
if (setxparams != null) cc.CASA_setxparams = setxparams;
if (getxparams != null) cc.CASA_getxparams = getxparams;
if (reloadprop != null) cc.CASA_reloadprop = reloadprop;
cc.CASA_setParamsArray = [];
cc.CASA_bufferedSetValue = [];
if (setxparams != null)
{
var setParamsArray = decodeCSVStringUsingBuffer(setxparams);
cc.CASA_setter = [];
for (var i=0; i<setParamsArray.length; i+=2)
{
var func = parent.createFunction("setParam"+id+""+setParamsArray[i],"", "NETMEETING"+id+"."+setParamsArray[i]+" = getPropertyValue("+setParamsArray[i+1]+");");
cc.CASA_setter.push(func);
cc.CASA_bufferedSetValue.push(null);
cc.CASA_setParamsArray.push(setParamsArray[i]);
cc.CASA_setParamsArray.push(setParamsArray[i+1]);
}
}
cc.CASA_getParamsArray = [];
cc.CASA_bufferedGetValue = [];
if (getxparams != null)
{
var getParamsArray = decodeCSVStringUsingBuffer(getxparams);
cc.CASA_getter = [];
for (var i=0; i<getParamsArray.length; i+=2)
{
func = parent.createFunction("getParam"+id+""+getParamsArray[i],"", "return NETMEETING"+id+"."+getParamsArray[i]+";");
cc.CASA_getter.push(func);
cc.CASA_bufferedGetValue.push(null);
cc.CASA_getParamsArray.push(getParamsArray[i+1]);
}
}
func = parent.createFunction("rosNETMEETING"+id,"", "C.reactOnSubmitNETMEETING(C_"+id+");");
registerDCListener(func);
}
function romuNETMEETING(cc,width)
{
var mode = getPropertyValue(cc.CASA_modeprop);
var height = getControlHeightNETMEETING(mode,width);
if(mode!=null && cc.CASA_bufferedMode != mode)
{
var widthNetmeeting = parseInt(width);
var innerHTML  = "<td width='"+C_adjustUnits(widthNetmeeting)+"'>";
innerHTML += "<object id='NETMEETING"+cc.CASA_id+"' classid='clsid:"+cc.CASA_classid+"' type='application/x-oleobject' width='"+C_adjustUnits(widthNetmeeting)+"' height='"+C_adjustUnits(height)+"'>";
innerHTML += "<param name=mode value='"+mode+"'>";
innerHTML += "</object>\n";
innerHTML += "</td>";
cc.innerHTML = innerHTML;
cc.CASA_bufferedMode = mode;
}
var callto = getPropertyValue(cc.CASA_calltoprop);
if(callto!=null && cc.CASA_bufferedCallto != callto)
{
cc.CASA_bufferedCallto = callto;
var calltoArray = decodeCSVStringUsingBuffer(callto);
var object = parent.document.getElementById("NETMEETING"+cc.CASA_id);
if(object!=null)
{
for(var i=0;i<calltoArray.length;i++)
{
object.CallTo(calltoArray[i]);
}
}
}
if (cc.CASA_paramsSetArray == null) return;
for (var i=0; i<cc.CASA_paramsSetArray.length; i+=2)
{
var value = getPropertyValue(cc.CASA_paramsArray[i]);
if (cc.CASA_bufferedSetValue[i/2] != value)
{
cc.CASA_setter[i/2](v);
cc.CASA_bufferedSetValue[i/2] = v;
}
}
}
function reactOnSubmitNETMEETING(cc)
{
for (var i=0; i<cc.CASA_getParamsArray.length; i++)
{
var value = cc.CASA_getter[i]();
if (cc.CASA_bufferedGetValue[i] != value)
{
setPropertyValue(cc.CASA_getParamsArray[i],value);
cc.CASA_bufferedGetValue[i] = value;
}
}
}
function getControlHeightNETMEETING(mode,pwidth)
{
pwidth = pwidth * 1;
var height = "450";
if(mode!=null)
{
if (mode == "Full")
{
height = "450";
}
if (mode == "DataOnly")
{
height = "200";
}
if (mode == "PreviewOnly")
{
height = "200";
}
if (mode == "RemoteOnly")
{
height = "200";
}
if (mode == "PreviewNoPause")
{
height = "220";
}
if (mode == "RemoteNoPause")
{
height = Math.ceil(pwidth * 0.75);
}
}
return height;
}
