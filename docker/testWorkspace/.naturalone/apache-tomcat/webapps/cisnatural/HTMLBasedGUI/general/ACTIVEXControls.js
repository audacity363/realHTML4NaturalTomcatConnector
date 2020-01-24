function addVersionInfoACTIVEXCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('ACTIVEXCONTROLS');
}
function iccACTIVEX(cc,romumethod,id,classid,xinitparams,setxparams,getxparams,reloadprop,useparamtag)
{
registerListener(romumethod);
cc.CASA_useparamtag = true;
if ( useparamtag != null ) cc.CASA_useparamtag = useparamtag;
if (id != null) cc.CASA_id = id;
if (classid  != null) cc.CASA_classid  = classid ;
if (xinitparams != null) cc.CASA_xinitparams = xinitparams;
if (setxparams != null) cc.CASA_setxparams = setxparams;
if (getxparams != null) cc.CASA_getxparams = getxparams;
if (reloadprop != null) cc.CASA_reloadprop = reloadprop;
var innerHTML = "<object id='ACTIVEX"+cc.CASA_id+"' classid='clsid:"+cc.CASA_classid+"' type='application/x-oleobject' width='100%' height='100%'>";
var paramsArray = decodeCSVStringUsingBuffer(xinitparams);
for (var i=0; i<paramsArray.length; i+=2)
{
var param = paramsArray[i];
var value = paramsArray[i+1];
innerHTML += "<param name='"+param+"' value='"+value+"'>";
}
innerHTML += "</object>\n";
cc.innerHTML = innerHTML;
if ( !cc.CASA_useparamtag )
{
var mycontrol = parent.document.getElementById("ACTIVEX"+cc.CASA_id );
if ( mycontrol != null && mycontrol != undefined )
{
for (var i=0; i<paramsArray.length; i+=2)
{
mycontrol[paramsArray[i]] = paramsArray[i+1];
}
}
}
cc.CASA_setParamsArray = [];
cc.CASA_bufferedSetValue = [];
if (setxparams != null)
{
var setParamsArray = decodeCSVStringUsingBuffer(setxparams);
cc.CASA_setter = [];
for (var i=0; i<setParamsArray.length; i+=2)
{
var func = parent.createFunction("setParam"+id+""+setParamsArray[i],"", "ACTIVEX"+id+"."+setParamsArray[i]+" = getPropertyValue("+setParamsArray[i+1]+");");
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
func = parent.createFunction("getParam"+id+""+getParamsArray[i],"", "return ACTIVEX"+id+"."+getParamsArray[i]+";");
cc.CASA_getter.push(func);
cc.CASA_bufferedGetValue.push(null);
cc.CASA_getParamsArray.push(getParamsArray[i+1]);
}
}
func = parent.createFunction("rosActiveX"+id,"", "C.reactOnSubmitACTIVEX(C_"+id+");");
registerDCListener(func);
}
function romuACTIVEX(cc)
{
var reload = getPropertyValue(cc.CASA_reloadprop);
if (reload == "true")
{
var innerHTML = "<object id='ACTIVEX"+cc.CASA_id+"' classid='clsid:"+cc.CASA_classid+"' type='application/x-oleobject' width='100%' height='100%'>";
for (var i=0; i<cc.CASA_setParamsArray.length; i+=2)
{
var value = getPropertyValue(cc.CASA_setParamsArray[i+1]);
innerHTML += "<param name='"+cc.CASA_setParamsArray[i]+"' value='"+value+"'>";
cc.CASA_bufferedSetValue[i/2] = value;
}
innerHTML += "</object>\n";
cc.innerHTML = innerHTML;
if ( !cc.CASA_useparamtag )
{
var mycontrol = parent.document.getElementById("ACTIVEX"+cc.CASA_id );
if ( mycontrol != null && mycontrol != undefined )
{
for (var i=0; i<cc.CASA_setParamsArray.length; i+=2)
{
mycontrol[cc.CASA_setParamsArray[i]] = getPropertyValue(cc.CASA_setParamsArray[i+1]);
}
}
}
return;
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
function reactOnSubmitACTIVEX(cc)
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
