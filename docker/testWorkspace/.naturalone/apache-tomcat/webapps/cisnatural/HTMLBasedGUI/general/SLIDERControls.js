function addVersionInfoSLIDERCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('SLIDERCONTROLS');
}
function iccSLIDER(cc, onclickf, mousedowncontf, mousemovef, mousedownsliderf)
{
if(cc.CASA_onclickf==null) cc.CASA_onclickf = onclickf;
if(cc.CASA_mousedowncontf==null) cc.CASA_mousedowncontf = mousedowncontf;
if(cc.CASA_mousemovef==null) cc.CASA_mousemovef = mousemovef;
if(cc.CASA_mousedownsliderf==null) cc.CASA_mousedownsliderf = mousedownsliderf;
if(cc.CASA_from==null) cc.CASA_from=0;
if(cc.CASA_to==null) cc.CASA_to=0;
if(cc.CASA_step==null) cc.CASA_step=1;
if(cc.CASA_sizeOfOneStep==null) cc.CASA_sizeOfOneStep=1;
}
function initSLIDER(cc)
{
cc.CASA_slider_container.width = 0;
cc.CASA_slider_linie.width = 0;
cc.CASA_slider_point.width = 0;
if(cc.CASA_slider_rangeFrom!=null)cc.CASA_slider_rangeFrom.width = 0;
if(cc.CASA_slider_rangeTo!=null)cc.CASA_slider_rangeTo.width = 0;
if(cc.CASA_slider_value!=null)cc.CASA_slider_value.width = 0;
var fromvalue = getValueSLIDER(cc, "from");
if(fromvalue == null)
{
fromvalue = 0;
}
cc.CASA_from = parseNumberSLIDER(fromvalue);
var tovalue = getValueSLIDER(cc, "to");
if(tovalue == null)
{
tovalue = 10;
}
cc.CASA_to = parseNumberSLIDER(tovalue);
var stepvalue = getValueSLIDER(cc, "step");
if(stepvalue == null)
{
stepvalue = 1;
}
var canBeInteger = canBeIntegerSLIDER(stepvalue);
if(canBeInteger)
{
cc.CASA_step = parseInt(stepvalue);
cc.CASA_stepIsInt = true;
}
else
{
var step = stepvalue + "";
var dotIndex = step.indexOf(".");
if(dotIndex != -1)
{
cc.CASA_step = parseFloat(step);
cc.CASA_stepIsInt = false;
cc.CASA_decimals = step.length - dotIndex - 1;
if(cc.CASA_decimals < 0) cc.CASA_decimals = 0;
}
}
if(cc.CASA_step == 0) cc.CASA_step = 1;
cc.CASA_relXMin = 0;
var numSteps = 0;
numSteps = (cc.CASA_to - cc.CASA_from)/cc.CASA_step;
if (numSteps==0) numSteps=1;
cc.CASA_numSteps = numSteps;
cc.CASA_inpPosNumber = true;
if(cc.CASA_slider_value != null)
{
var elToUse = cc.CASA_slider_value;
var fromFontSize = "";
var valueFontSize = "";
elToUse.style.removeProperty('width');
var formattedValue1 = convertStrToFormattedNumberSLIDER(cc, cc.CASA_from+"");
if(formattedValue1 < 0) formattedValue1 += "a";
else formattedValue1 += "a";
if((formattedValue1+"").indexOf(".") != -1) formattedValue1 += ".";
elToUse.innerHTML = formattedValue1;
var width_from = elToUse.clientWidth;
var formattedValue2 = convertStrToFormattedNumberSLIDER(cc, cc.CASA_to+"");
if(formattedValue2 < 0) formattedValue2 += "a";
else formattedValue2 += "a";
if((formattedValue2+"").indexOf(".") != -1) formattedValue2 += ".";
elToUse.innerHTML = formattedValue2;
var width_to = elToUse.clientWidth;
if(width_from > width_to) width_to = width_from;
cc.CASA_slider_value.style.width = C_adjustUnits(width_to);
}
if(cc.CASA_slider_rangeFrom != null)
{
cc.CASA_slider_rangeFrom.style.removeProperty('width');
var add = cc.CASA_from;
if(add < 0) add += "a";
if((cc.CASA_from+"").indexOf(".") != -1) add += ".";
cc.CASA_slider_rangeFrom.innerHTML = add;
var rangeFromWidth = cc.CASA_slider_rangeFrom.clientWidth;
cc.CASA_slider_rangeFrom.style.width = C_adjustUnits(rangeFromWidth);
cc.CASA_slider_rangeFrom.innerHTML = cc.CASA_from;
}
if(cc.CASA_slider_rangeTo != null)
{
cc.CASA_slider_rangeTo.style.removeProperty('width');
var add = cc.CASA_to;
if(add < 0) add += "a";
else add += "a";
if((cc.CASA_to+"").indexOf(".") != -1) add += ".";
cc.CASA_slider_rangeTo.innerHTML = add;
var rangeToWidth = cc.CASA_slider_rangeTo.clientWidth;
cc.CASA_slider_rangeTo.style.width = C_adjustUnits(rangeToWidth);
cc.CASA_slider_rangeTo.innerHTML = cc.CASA_to;
}
cc.CASA_contWidth = cc.CASA_slider_biggerContainer.clientWidth;
if(cc.CASA_slider_rangeFrom != null)
{
calculatePageOffset(cc.CASA_slider_rangeFrom);
calculatePageOffset(cc.CASA_slider_rangeTo);
var diff = cc.CASA_slider_rangeTo.CASA_pageoffsetleft -
cc.CASA_slider_rangeFrom.CASA_pageoffsetleft -
cc.CASA_slider_rangeFrom.clientWidth;
cc.CASA_contWidth = diff;
}
else if(cc.CASA_slider_value != null)
{
calculatePageOffset(cc.CASA_slider_value);
calculatePageOffset(cc.CASA_slider_biggerContainer);
var diff = cc.CASA_slider_value.CASA_pageoffsetleft -
cc.CASA_slider_biggerContainer.CASA_pageoffsetleft;
cc.CASA_contWidth = diff;
}
var minus = 4;
if(cc.CASA_slider_rangeFrom == null && cc.CASA_slider_value == null) minus = 8;
else if(cc.CASA_slider_rangeFrom != null && cc.CASA_slider_value == null) minus = 6;
else if(cc.CASA_slider_rangeFrom == null && cc.CASA_slider_value != null) minus = 8;
else if(cc.CASA_slider_rangeFrom != null && cc.CASA_slider_value != null) minus = 6;
cc.CASA_contWidth = cc.CASA_contWidth - minus;
cc.CASA_slider_container.style.width = C_adjustUnits(cc.CASA_contWidth);
cc.CASA_slider_linie.style.width = C_adjustUnits((cc.CASA_contWidth - 6));
cc.CASA_slider_point.style.left = C_adjustUnits(cc.CASA_relXMin);
calculatePageOffset(cc.CASA_slider_container);
cc.CASA_m_lastMouseMoveX = cc.CASA_slider_container.CASA_pageoffsetleft;
cc.CASA_sliderWidth = cc.CASA_slider_point.clientWidth;
var pointBorderWidhtStr = cc.CASA_slider_point.style.borderWidth;
var pointBorderWidthInt = 2;
if(pointBorderWidhtStr != "")
pointBorderWidthInt = parseInt(pointBorderWidhtStr);
cc.CASA_sliderWidth += 2 * pointBorderWidthInt - 4;
cc.CASA_sliderXMax = cc.CASA_contWidth - cc.CASA_sliderWidth;
cc.CASA_sizeOfOneStep = cc.CASA_sliderXMax / cc.CASA_numSteps;
cc.CASA_slider_container_XMin = cc.CASA_slider_container.CASA_pageoffsetleft;
cc.CASA_slider_container_XMax = cc.CASA_slider_container.CASA_pageoffsetleft +
cc.CASA_contWidth;
var startValue = getSliderValueSLIDER(cc);
if(startValue == null)
startValue = cc.CASA_from + "";
startValue = convertStrToFormattedNumberSLIDER(cc, startValue);
moveSliderSLIDER(cc, startValue);
if(cc.CASA_slider_value != null)
cc.CASA_slider_value.innerHTML = startValue;
adjustLastMouseMoveXSLIDER(cc);
}
function romousedownSLIDER(cc,evt)
{
cc.CASA_m_mouseDownX = evt.clientX;
cc.CASA_m_lastMouseMoveX = cc.CASA_m_mouseDownX;
m_dragEndCallback = dragEndCallbackSLIDER;
m_draggingControl = cc;
cc.CASA_clickedDown = true;
}
function romousdownonContainerSLIDER(cc, evt)
{
var value = evt.clientX;
if(evt.clientX > cc.CASA_slider_container_XMax)
{
value = cc.CASA_slider_container_XMax;
}
else if (evt.clientX < cc.CASA_slider_container_XMin)
{
value = cc.CASA_slider_container_XMin;
}
cc.CASA_m_mouseDownX = value;
m_dragEndCallback = dragEndCallbackSLIDER;
m_draggingControl = cc;
cc.CASA_clickedDown = true;
}
function roclickSLIDER(cc, evt)
{
var res = setSliderWhileMovingSLIDER(cc, evt);
clearStartDraggingSLIDER(cc);
sendValueToServerSLIDER(cc, res);
}
function clearStartDraggingSLIDER(cc)
{
cc.CASA_m_mouseDownX = null;
m_dragEndCallback = null;
m_draggingControl = null;
if(cc.CASA_clickedDown == false)
{
removeAroundDivSLIDER(cc);
}
}
function sendValueToServerSLIDER(cc, res)
{
setPropertyValue(cc.CASA_valueprop+".sliderValue", res);
submitModel();
}
function romousemoveSLIDER(cc, evt)
{
if (cc.CASA_m_mouseDownX != null)
{
if(cc.CASA_clickedDown == true)
{
cc.CASA_clickedDown = false;
createAroundDivSLIDER(cc);
}
setSliderWhileMovingSLIDER(cc, evt);
}
}
function createAroundDivSLIDER(cc)
{
if(cc.CASA_aroundDiv == null)
{
var height = 100;
var vdiv = parent.createElement("div");
vdiv.id = "around"+cc.CASA_id;
vdiv.style.position = "absolute";
vdiv.style.left = C_adjustUnits((cc.CASA_slider_container.CASA_pageoffsetleft));
vdiv.style.top = C_adjustUnits((cc.CASA_slider_container.CASA_pageoffsettop -
(height/2-10)));
vdiv.style.width = C_adjustUnits((cc.CASA_slider_container.style.width));
vdiv.style.height = C_adjustUnits(height);
vdiv.style.zIndex = 10000;
cc.CASA_aroundDiv = vdiv;
cc.CASA_slider_biggerContainer.appendChild(cc.CASA_aroundDiv);
cc.CASA_aroundDiv.onmousemove = cc.CASA_mousemovef;
}
}
function removeAroundDivSLIDER(cc)
{
if(cc.CASA_clickedDown == false && typeof(cc.CASA_aroundDiv) != "undefined")
{
if(cc.CASA_aroundDiv != null)
{
cc.CASA_slider_biggerContainer.removeChild(cc.CASA_aroundDiv);
}
cc.CASA_aroundDiv = null;
}
}
function dragEndCallbackSLIDER(cc)
{
if (cc.CASA_clickedDown) return;
var res = setSliderWhereItIsSLIDER(cc);
clearStartDraggingSLIDER(cc);
sendValueToServerSLIDER(cc, res);
}
function setSliderWhereItIsSLIDER(cc)
{
var left = cc.CASA_slider_point.style.left;
if (left != null && left.indexOf("px") > 0)
left = parseInt(left.substring(0,left.length-2));
return setSliderAndShowSLIDER(cc, left);
}
function setSliderWhileMovingSLIDER(cc, evt)
{
var value = evt.clientX;
if(evt.clientX > cc.CASA_slider_container_XMax)
{
value = cc.CASA_slider_container_XMax;
}
else if (evt.clientX < cc.CASA_slider_container_XMin)
{
value = cc.CASA_slider_container_XMin;
}
var dif =  value - cc.CASA_m_lastMouseMoveX;
cc.CASA_m_lastMouseMoveX = value;
var left = cc.CASA_slider_point.style.left;
if (left != null && left.indexOf("px") > 0)
left = parseInt(left.substring(0,left.length-2));
var num = left + dif;
return setSliderAndShowSLIDER(cc, num);
}
function setSliderAndShowSLIDER(cc, num)
{
num = setSliderSLIDER(cc, num);
if(cc.CASA_slider_value != null)
{
cc.CASA_slider_value.innerHTML = num;
}
dsc();
return num;
}
function setSliderSLIDER(cc, num)
{
if(num < cc.CASA_relXMin) num = cc.CASA_relXMin;
if((num + cc.CASA_sliderWidth) > cc.CASA_contWidth)
num = cc.CASA_contWidth - cc.CASA_sliderWidth;
cc.CASA_slider_point.style.left = C_adjustUnits(num);
return calcRealValueSLIDER(cc, num);
}
function calcRealValueSLIDER(cc, numPixel)
{
var tmpValue = fromPixelToANSLIDER(cc, numPixel);
if(cc.CASA_stepIsInt)
{
tmpValue = Math.round(tmpValue);
}
if(tmpValue < cc.CASA_from) tmpValue = cc.CASA_from;
if(tmpValue > cc.CASA_to) tmpValue = cc.CASA_to;
tmpValue = formatWithDecimalsSLIDER(tmpValue, cc.CASA_decimals);
return tmpValue;
}
function romuSLIDER(cc)
{
if (cc.CASA_initTobeDone != false)
{
var elm = cc.CASA_slider_point;
if (elm.clientWidth == 0)
{
registerSwitchToDisplayListener(romuSLIDER, cc);
}
else
{
cc.CASA_initTobeDone = false;
initSLIDER(cc);
}
}
var displayOnlyIndChanged = true;
var vsiDisplay = getPropertyValue(cc.CASA_valueprop+".changeIndexDisplay");
if(vsiDisplay==null) displayOnlyIndChanged = true;
else if (cc.CASA_memChangeIndexDisplay == vsiDisplay) displayOnlyIndChanged = false;
cc.CASA_memChangeIndexDisplay = vsiDisplay;
if(displayOnlyIndChanged)
{
var displayonly = getPropertyValue(cc.CASA_valueprop+".displayonly");
if(displayonly=="true")
{
dettachEventHandlersSLIDER(cc);
setOpacitySLIDER(cc, 0.5);
}
else
{
attachEventHandlersSLIDER(cc);
setOpacitySLIDER(cc, 1);
}
}
var vci = getPropertyValue(cc.CASA_valueprop+".changeIndex");
if (cc.CASA_memChangeIndex == vci) return;
cc.CASA_memChangeIndex = vci;
var sliderValue = getSliderValueSLIDER(cc);
if(sliderValue == null) return;
sliderValue = convertStrToFormattedNumberSLIDER(cc, sliderValue);
if (isNaN(sliderValue)) return;
moveSliderSLIDER(cc, sliderValue);
if(cc.CASA_slider_value != null)
cc.CASA_slider_value.innerHTML = sliderValue;
adjustLastMouseMoveXSLIDER(cc);
}
function adjustLastMouseMoveXSLIDER(cc)
{
calculatePageOffset(cc.CASA_slider_point);
cc.CASA_slider_point.CASA_pageoffsetleft += cc.CASA_slider_point.clientWidth/2;
cc.CASA_m_lastMouseMoveX = cc.CASA_slider_point.CASA_pageoffsetleft;
}
function convertStrToFormattedNumberSLIDER(cc, sliderValue)
{
sliderValue = convertStrToNumberSLIDER(cc, sliderValue);
sliderValue = formatNumberValueSLIDER(cc, sliderValue)
return sliderValue;
}
function convertStrToNumberSLIDER(cc, sliderValue)
{
var dotIndex = sliderValue.indexOf(".");
if(dotIndex == -1)
{
sliderValue = parseInt(sliderValue);
cc.CASA_inpDecimals = 0;
}
else
{
cc.CASA_inpDecimals = sliderValue.length - dotIndex - 1;
if(cc.CASA_inpDecimals < 0) cc.CASA_inpDecimals = 0;
sliderValue = parseFloat(sliderValue);
}
if(sliderValue < cc.CASA_from) sliderValue = cc.CASA_from;
if(sliderValue > cc.CASA_to) sliderValue = cc.CASA_to;
return sliderValue;
}
function formatNumberValueSLIDER(cc, sliderValue)
{
if(sliderValue<0)
{
sliderValue = Math.abs(sliderValue);
cc.CASA_inpPosNumber = false;
}
var res = floatmoduloSLIDER(sliderValue, cc.CASA_step, cc.CASA_inpDecimals);
if(!cc.CASA_inpPosNumber)
{
res = 0 - res;
cc.CASA_inpPosNumber = true;
}
res = formatWithDecimalsSLIDER(res, cc.CASA_decimals);
return res;
}
function moveSliderSLIDER(cc, sliderValue)
{
var linkPixel = fromANToPixelSLIDER(cc, sliderValue);
if (isNaN (linkPixel)) return;
cc.CASA_slider_point.style.left = C_adjustUnits(linkPixel);
}
function getSliderValueSLIDER(cc)
{
var sliderValue = getPropertyValue(cc.CASA_valueprop+".sliderValue");
if(sliderValue == null || sliderValue == "")
{
return null;
}
return sliderValue;
}
function getValueSLIDER(cc, propname)
{
try
{
var value = getPropertyValue(cc.CASA_valueprop+"."+propname);
if(value == null || value == "") return null;
return value;
}
catch(e) {}
}
function attachEventHandlersSLIDER(cc)
{
cc.CASA_slider_biggerContainer.onclick = cc.CASA_onclickf;
cc.CASA_slider_biggerContainer.onmousedown = cc.CASA_mousedowncontf;
cc.CASA_slider_biggerContainer.onmousemove = cc.CASA_mousemovef;
cc.CASA_slider_point.onmousedown = cc.CASA_mousedownsliderf;
}
function dettachEventHandlersSLIDER(cc)
{
cc.CASA_slider_biggerContainer.onclick = null;
cc.CASA_slider_biggerContainer.onmousedown = null;
cc.CASA_slider_biggerContainer.onmousemove = null;
cc.CASA_slider_point.onmousedown = null;
}
function setOpacitySLIDER(cc, opac)
{
cc.CASA_slider_biggerContainer.style.opacity = opac;
cc.CASA_slider_container.style.opacity = opac;
cc.CASA_slider_linie.style.opacity = opac;
cc.CASA_slider_point.style.opacity = opac;
}
function canBeIntegerSLIDER(floatNumber)
{
if(floatNumber/parseInt(floatNumber)==1) return true;
else return false;
}
function floatmoduloSLIDER(x,y, decimalPlaces)
{
var diff = Math.abs(roundDecimalsSLIDER(x % y, decimalPlaces));
if(diff == y)
{
return roundDecimalsSLIDER(x, decimalPlaces);
}
else
{
return roundDecimalsSLIDER(x - diff, decimalPlaces);
}
}
function roundDecimalsSLIDER(num, decimalPlaces)
{
var temp = num * Math.pow(10, decimalPlaces);
temp = Math.round(temp);
temp = temp / Math.pow(10, decimalPlaces);
return temp;
}
function parseNumberSLIDER(strNumber)
{
if(typeof(strNumber)== "number") return strNumber;
strNumber = strNumber.replace("," , ".");
var dotIndex = strNumber.indexOf(".");
if(dotIndex == -1)
return parseInt(strNumber);
else
return parseFloat(strNumber);
}
function formatWithDecimalsSLIDER(number, decimals)
{
if(Number.prototype.toFixed)
{
return number.toFixed(decimals);
}
else
{
var StrNumber = number.toString().replace(",",".");
var len = StrNumber.length;
var dotIndex = StrNumber.indexOf(".");
if(decimals>0)
{
if(dotIndex == -1)
{
StrNumber += ".";
for(i = 0; i < decimals; i++)
{
StrNumber += "0";
}
}
else
{
var tobe = dotIndex + decimals + 1;
var dif = tobe - len;
for(i=0; i<dif;i++) StrNumber += "0";
var toRemove = StrNumber.length - dotIndex - decimals - 1;
StrNumber = StrNumber.substring(0, StrNumber.length - toRemove);
}
}
StrNumber = parseNumberSLIDER(StrNumber);
return StrNumber;
}
}
function fromPixelToANSLIDER(cc, y)
{
if (y==0) return cc.CASA_from;
var x = Math.round(y/cc.CASA_sizeOfOneStep);
return (cc.CASA_from + x*cc.CASA_step);
}
function fromANToPixelSLIDER(cc, AN)
{
var x = (AN-cc.CASA_from)/cc.CASA_step;
return Math.round(x*cc.CASA_sizeOfOneStep);
}
