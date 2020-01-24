function addVersionInfoDATATYPECENTRAL()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('DATATYPECENTRAL');
}
function C_remove1000Separators(tt,floatValue,decimalDigitsFloat)
{
if (floatValue == null || floatValue == "") return floatValue;
var sepDec = ",";
var sep1000 = ".";
if (tt.m_decimalSeparator == ".")
{
sepDec = ".";
sep1000 = ",";
}
var sep1000Count = 0;
var sepDecCount = 0;
for (var i=0; i<floatValue.length; i++)
{
c = floatValue.charAt(i);
if (c == sep1000) sep1000Count++;
if (c == sepDec) sepDecCount++;
}
while (floatValue.indexOf(sep1000) >=0)
floatValue = floatValue.replace(sep1000, "");
return floatValue;
}
function C_checkIf1000SeparatorsHasError(floatValue)
{
if (floatValue == null || floatValue == "") return floatValue;
var thousandSep = ".";
if (this.m_decimalSeparator == ".") thousandSep = ",";
var index = floatValue.indexOf(thousandSep);
while (index >= 0)
{
var c = floatValue.charAt(index);
if (index==0) return true;
if ((index+3) >= floatValue.length) return true;
for (i=(index+1); i<(index+4); i++)
{
c = floatValue.charAt(i);
if (c == "." || c == ",") return true;
}
if ((index+4) >= floatValue.length) return false;
c = floatValue.charAt(index+4);
if (c != thousandSep && c != this.m_decimalSeparator) return true;
index = floatValue.indexOf(thousandSep, index+3);
}
return false;
}
function C_convertValue(value,dataType,decimalDigitsFloat)
{
if (dataType == 'date') return this.convertDisplayStringIntoYYYYMMDD(value);
if (dataType == 'time') return this.convertDisplayStringIntoHHMMSS(value);
if (dataType == 'float')
{
if (this.m_decimalSeparator == ".") value = value.replace(/\,/g,"");
else if (this.m_decimalSeparator == ",") value = value.replace(/\./g,"");
if (decimalDigitsFloat>0 && value != null && value != "")
{
if (value.indexOf(this.m_decimalSeparator)<0) value = value + this.m_decimalSeparator + "0";
if (value.indexOf(this.m_decimalSeparator)==0) value = "0" + value;
var existingDecimalDigits = value.length - (value.indexOf(this.m_decimalSeparator) +1);
if ((decimalDigitsFloat == 0)&&
(existingDecimalDigits == 1)&&
(value.charAt(value.length-1)=='0'))
value = value.substring(0,value.length-2);
else if ((decimalDigitsFloat > 0)&&
(existingDecimalDigits < decimalDigitsFloat))
for (var j=0; j<decimalDigitsFloat-existingDecimalDigits; j++)
value += "0";
}
}
return value;
}
function C_convertYYYYMMDDIntoDisplayString(yyyymmdd)
{
var vResult = yyyymmdd;
if (yyyymmdd != null && yyyymmdd != "")
{
if (yyyymmdd.length == 10 &&
yyyymmdd.substring(4,5) == "-" &&
yyyymmdd.substring(7,8) == "-")
{
yyyymmdd = yyyymmdd.substring(0,4)+
yyyymmdd.substring(5,7) +
yyyymmdd.substring(8,10);
}
if (yyyymmdd.length != 8)
{
return vResult;
}
if		(this.m_dateDisplay == "DD.MM.YYYY" || this.m_dateDisplay == "D.M.YY") vResult = yyyymmdd.substr(6,2) + "." + yyyymmdd.substr(4,2) + "." + yyyymmdd.substr(0,4);
else if (this.m_dateDisplay == "MM/DD/YYYY" || this.m_dateDisplay == "M/D/YY") vResult = yyyymmdd.substr(4,2) + "/" + yyyymmdd.substr(6,2) + "/" + yyyymmdd.substr(0,4);
else if (this.m_dateDisplay == "DD/MM/YYYY" || this.m_dateDisplay == "D/M/YY") vResult = yyyymmdd.substr(6,2) + "/" + yyyymmdd.substr(4,2) + "/" + yyyymmdd.substr(0,4);
else if (this.m_dateDisplay == "YYYY-MM-DD") vResult = yyyymmdd.substr(0,4) + "-" + yyyymmdd.substr(4,2) + "-" + yyyymmdd.substr(6,2);
else if (this.m_dateDisplay == "YYYY/MM/DD") vResult = yyyymmdd.substr(0,4) + "/" + yyyymmdd.substr(4,2) + "/" + yyyymmdd.substr(6,2);
else alert("Date display >"+this.m_dateDisplay+"< not available.");
if (this.m_dateDisplay == "D.M.YY" || this.m_dateDisplay == "M/D/YY" || this.m_dateDisplay == "D/M/YY")
{
if (vResult.substr(6,2) == "20") vResult = vResult.substr(0,6) + vResult.substr(8,2);
if (vResult.charAt(3) == "0") vResult = vResult.substr(0,3) + vResult.substring(4,vResult.length);
if (vResult.charAt(0) == "0") vResult = vResult.substring(1,vResult.length);
}
}
return vResult;
}
function C_getCenturyPrefix(vshortyear)
{
try
{
vshortyear = vshortyear * 1;
if (vshortyear >= 50) return "19";
else return "20";
}
catch (exc)
{
return "20";
}
}
function C_convertDisplayStringIntoYYYYMMDD(value)
{
if (this.m_dateDisplay == "YYYY/MM/DD" ||
this.m_dateDisplay == "YYYY-MM-DD")
{
if (value.charAt(2) == "/" || value.charAt(2) == "-") value = C_getCenturyPrefix(value.substr(0,2))+value;
if (value.charAt(6) == "/" || value.charAt(6) == "-") value = value.substring(0,5) + "0"+ value.substring(5,value.length);
}
else
{
if (value.charAt(1) == "-" && value.charAt(3) == "-") value = "0" + value.substring(0,1) + "0" + value.substring(2,value.length);
if (value.charAt(1) == "-" && value.charAt(4) == "-") value = "0" + value.substring(0,1) + value.substring(2,value.length);
if (value.charAt(2) == "-" && value.charAt(4) == "-") value = value.substring(0,2) + "0" + value.substring(3,value.length);
if (value.charAt(4) == "-" && value.charAt(6) == "-" && value.length == 8) value = "0" + value.substr(7,1) + "0" + value.substr(5,1) + value.substr(0,4);
if (value.charAt(4) == "-" && value.charAt(6) == "-" && value.length == 9) value = value.substr(7,2) + "0" + value.substr(5,1) + value.substr(0,4);
if (value.charAt(4) == "-" && value.charAt(7) == "-" && value.length == 9) value = "0" + value.substr(8,1) + value.substr(5,2) + value.substr(0,4);
if (value.charAt(4) == "-" && value.charAt(7) == "-" && value.length == 10) value = value.substr(8,2) + value.substr(5,2) + value.substr(0,4);
if (value.charAt(1) == "." || value.charAt(1) == "/") value = "0"+value;
if (value.charAt(4) == "." || value.charAt(4) == "/") value = value.substring(0,3) + "0"+ value.substring(3,value.length);
if (value.charAt(3) == "-") value = "0" + value;
if (value.charAt(6) == "-") value = value.substring(0,5) + "0" + value.substring(5,value.length);
if (value.charAt(7) == "-" && value.length == 9) value = value.substring(0,8) + "0" + value.charAt(8);
}
value = value.replace(/\./g,"");
value = value.replace(/\//g,"");
value = value.replace(/\-/g,"");
var yyyyCurrent = new Date().getFullYear();
var mmCurrent = new Date().getMonth()+1;
if (mmCurrent<10) mmCurrent = "0"+mmCurrent;
var ddCurrent = new Date().getDay();
if (ddCurrent<10) ddCurrent = "0"+ddCurrent;
if (value.length == 1)
{
if( this.m_dateDisplay.charAt(0) == 'M') return yyyyCurrent+"0"+value.substr(0,1)+ddCurrent;
else return yyyyCurrent+mmCurrent+"0"+value.substr(0,1);
}
if (value.length == 2)
{
if (this.m_dateDisplay.charAt(0) == 'M') return yyyyCurrent+value.substr(0,2)+ddCurrent;
return yyyyCurrent+mmCurrent+value.substr(0,2);
}
if (value.length == 4 && (this.m_dateDisplay == "DD.MM.YYYY" || this.m_dateDisplay == "D.M.YY")) return yyyyCurrent+value.substr(2,2)+value.substr(0,2);
if (value.length == 6 && (this.m_dateDisplay == "DD.MM.YYYY" || this.m_dateDisplay == "D.M.YY")) return C_getCenturyPrefix(value.substr(4,2))+value.substr(4,2)+value.substr(2,2)+value.substr(0,2);
if (value.length == 8 && (this.m_dateDisplay == "DD.MM.YYYY" || this.m_dateDisplay == "D.M.YY")) return value.substr(4,4)+value.substr(2,2)+value.substr(0,2);
if (value.length == 4 && (this.m_dateDisplay == "MM/DD/YYYY" || this.m_dateDisplay == "M/D/YY")) return yyyyCurrent+value.substr(0,2)+value.substr(2,2);
if (value.length == 6 && (this.m_dateDisplay == "MM/DD/YYYY" || this.m_dateDisplay == "M/D/YY")) return C_getCenturyPrefix(value.substr(4,2))+value.substr(4,2)+value.substr(0,2)+value.substr(2,2);
if (value.length == 8 && (this.m_dateDisplay == "MM/DD/YYYY" || this.m_dateDisplay == "M/D/YY")) return value.substr(4,4)+value.substr(0,2)+value.substr(2,2);
if (value.length == 6 && (this.m_dateDisplay == "DD/MM/YYYY" || this.m_dateDisplay == "D/M/YY")) return C_getCenturyPrefix(value.substr(4,2))+value.substr(4,2)+value.substr(2,2)+value.substr(0,2);
if (value.length == 8 && (this.m_dateDisplay == "DD/MM/YYYY" || this.m_dateDisplay == "D/M/YY")) return value.substr(4,4)+value.substr(2,2)+value.substr(0,2);
if (value.length == 4 && (this.m_dateDisplay == "YYYY-MM-DD" || this.m_dateDisplay == "YYYY/MM/DD")) return yyyyCurrent+value;
if (value.length == 6 && (this.m_dateDisplay == "YYYY-MM-DD" || this.m_dateDisplay == "YYYY/MM/DD")) return C_getCenturyPrefix(value.substr(0,2))+value;
if (value.length == 8 && (this.m_dateDisplay == "YYYY-MM-DD" || this.m_dateDisplay == "YYYY/MM/DD")) return value;
if (value.length == 7 && (this.m_dateDisplay == "YYYY/MM/DD")) return value.substring(0,6) + "0" + value.charAt(6);
return value;
}
function C_convertDisplayStringIntoYYYYMMDD_2(value)
{
if ( value != null )
{
value = value.replace(/\./g,"");
value = value.replace(/\//g,"");
value = value.replace(/\-/g,"");
}
return value;
}
function C_convertYYYYMMDDHHMMSSMMMIntoDisplayString(value, type)
{
var vResult = value;
if (value != null && value != "")
{
if (this.m_dateDisplay == "DD.MM.YYYY" || this.m_dateDisplay == "D.M.YY")
{
vResult = value.substr(6,2) + "." +
value.substr(4,2) + "." +
value.substr(0,4) + " " +
value.substr(8,2) + ":" +
value.substr(10,2);
if (type == "HHMMSSMMM" || type == "HHMMSS")
vResult += ":" + value.substr(12,2);
if (type == "HHMMSSMMM")
vResult += "/" + value.substr(14,3);
}
else if (this.m_dateDisplay == "DD/MM/YYYY" || this.m_dateDisplay == "D/M/YY")
{
vResult = value.substr(6,2) + "/" +
value.substr(4,2) + "/" +
value.substr(0,4) + " " +
value.substr(8,2) + ":" +
value.substr(10,2);
if (type == "HHMMSSMMM" || type == "HHMMSS")
vResult += ":" + value.substr(12,2);
if (type == "HHMMSSMMM")
vResult += "/" + value.substr(14,3);
}
else if (this.m_dateDisplay == "MM/DD/YYYY" || this.m_dateDisplay == "M/D/YY")
{
vResult = value.substr(4,2) + "/" +
value.substr(6,2) + "/" +
value.substr(0,4) + " " +
value.substr(8,2) + ":" +
value.substr(10,2);
if (type == "HHMMSSMMM" || type == "HHMMSS")
vResult += ":" + value.substr(12,2);
if (type == "HHMMSSMMM")
vResult += "/" + value.substr(14,3);
}
else if (this.m_dateDisplay == "YYYY-MM-DD")
{
vResult = value.substr(0,4) + "-" +
value.substr(4,2) + "-" +
value.substr(6,2) + " " +
value.substr(8,2) + ":" +
value.substr(10,2);
if (type == "HHMMSSMMM" || type == "HHMMSS")
vResult += ":" + value.substr(12,2);
if (type == "HHMMSSMMM")
vResult += "/" + value.substr(14,3);
}
else
alert("Date display >"+this.m_dateDisplay+"< not known. ("+type+")");
}
return vResult;
}
function C_convertDisplayStringIntoYYYYMMDDHHMMSSMMM(dispstring)
{
var vResult = dispstring;
if (dispstring != null && dispstring != "")
{
if (this.m_dateDisplay == "DD.MM.YYYY" ||
this.m_dateDisplay == "DD/MM/YYYY")
{
vResult = dispstring.substr(6,4) +
dispstring.substr(3,2) +
dispstring.substr(0,2) +
dispstring.substr(11,2) +
dispstring.substr(14,2) +
dispstring.substr(17,2) +
dispstring.substr(20,3);
}
else if (this.m_dateDisplay == "MM/DD/YYYY")
{
vResult = dispstring.substr(6,4) +
dispstring.substr(0,2) +
dispstring.substr(3,2) +
dispstring.substr(11,2) +
dispstring.substr(14,2) +
dispstring.substr(17,2) +
dispstring.substr(20,3);
}
else if (this.m_dateDisplay == "YYYY-MM-DD")
{
vResult = dispstring.substr(0,4) +
dispstring.substr(5,2) +
dispstring.substr(8,2) +
dispstring.substr(11,2) +
dispstring.substr(14,2) +
dispstring.substr(17,2) +
dispstring.substr(20,3);
}
}
return vResult;
}
function C_convertHHMMSSIntoDisplayString(hhmmss)
{
var vResult = hhmmss;
if (hhmmss == null || hhmmss == "") return vResult;
if (this.m_timeDisplay == "HH:MM:SS") vResult = hhmmss.substr(0,2) + ":" + hhmmss.substr(2,2) + ":" + hhmmss.substr(4,2);
else if (this.m_timeDisplay == "HH:MM") vResult = hhmmss.substr(0,2) + ":" + hhmmss.substr(2,2);
else if (this.m_timeDisplay == "HH:MM:SS AMPM" || this.m_timeDisplay == "HH:MM AMPM")
{
var vHourString = hhmmss.substr(0,2);
var vHour = vHourString * 1;
var vAMPM = " am";
if (vHour >= 13)
{
vAMPM = " pm";
vHour = vHour-12;
if (vHour < 10) var vHourString = "0" + vHour;
else vHourString = "" + vHour;
}
if (this.m_timeDisplay == "HH:MM:SS AMPM") vResult = vHourString + ":" + hhmmss.substr(2,2) + ":" + hhmmss.substr(4,2) + vAMPM;
else if (this.m_timeDisplay == "HH:MM AMPM") vResult = vHourString + ":" + hhmmss.substr(2,2) + vAMPM;
}
return vResult;
}
function C_convertDisplayStringIntoHHMMSS(value)
{
value = value.replace(/\./g,":");
if (value.charAt(1) == ":" || value.charAt(1) == " ") value = "0"+value;
var vplus12 = false;
if (value.substr(value.length-3) == " am") value = value.substr(0,value.length-3);
if (value.substr(value.length-2) == "am") value = value.substr(0,value.length-2);
if (value.substr(value.length-3) == " pm") { value = value.substr(0,value.length-3); vplus12 = true; }
if (value.substr(value.length-2) == "pm") { value = value.substr(0,value.length-2); vplus12 = true; }
var vHourString = value.substr(0,2);
if (vplus12 == true)
{
try
{
var vHourString = "" + (vHourString * 1 + 12);
}
catch (eexxcc) {}
}
value = value.replace(/\./g,"");
value = value.replace(/:/g,"");
if (value.length == 6) return vHourString+value.substr(2,2)+value.substr(4,2);
if (value.length == 4) return vHourString+value.substr(2,2)+'00';
if (value.length == 5) return vHourString+value.substr(3,2)+'00';
if (value.length == 2) return vHourString+'0000';
if (value.length == 1) return "0"+vHourString+'0000';
return value;
}
function C_convertFLOATIntoDisplayString(vFloat,decimalDigitsFloat)
{
if (vFloat == null || vFloat == "") return vFloat;
var dotIndex = vFloat.indexOf(".");
if (dotIndex < 0)
{
vFloat = vFloat + ".0";
dotIndex = vFloat.indexOf(".");
}
var vResult = vFloat;
var existingDecimalDigits = vResult.length - (dotIndex +1);
if ((decimalDigitsFloat == 0)&&
(existingDecimalDigits == 1)&&
(vResult.charAt(vResult.length-1)=='0'))
vResult = vResult.substring(0,vResult.length-2);
else if ((decimalDigitsFloat > 0)&&
(existingDecimalDigits < decimalDigitsFloat))
for (var j=0; j<decimalDigitsFloat-existingDecimalDigits; j++)
vResult += "0";
if (this.m_decimalSeparator == ",") vResult = vResult.replace(/\./g,",");
if (this.m_1000Separator != "false")
{
var vFirstDigit = 0;
if (vFloat < 0) vFirstDigit = 1;
if (dotIndex > 0)
{
if (this.m_decimalSeparator == ",")
for (i=dotIndex-3; i>vFirstDigit; i=i-3)
vResult = vResult.substring(0,i)+"."+vResult.substring(i,vResult.length);
else
for (i=dotIndex-3; i>vFirstDigit; i=i-3)
vResult = vResult.substring(0,i)+","+vResult.substring(i,vResult.length);
}
}
return vResult;
}
function C_convertINTIntoDisplayString(v)
{
if (v == null || v == "") return v;
var vResult = v;
if (this.m_1000Separator != "false")
{
var v1000SepStr = ",";
if (this.m_decimalSeparator == ",")
v1000SepStr = ".";
for (i=v.length-3; i>0; i=i-3)
{
if(i==1 && vResult.substring(0,i) == "-") continue;
vResult = vResult.substring(0,i)+v1000SepStr+vResult.substring(i,vResult.length);
}
}
return vResult;
}
function C_convertDisplayStringIntoFLOAT(vDisplay)
{
if (vDisplay == null) return vDisplay;
var vResult = vDisplay;
if (this.m_decimalSeparator == ",")
{
vResult = vResult.replace(/\./g,"");
vResult = vResult.replace(/,/g,".");;
}
else
{
vResult = vResult.replace(/,/g,"");
}
return vResult;
}
function C_checkIfValueHasError(value,dataType,decimalDigitsFloat,digitsFloat)
{
if (value == null) return false;
if (value == "") return false;
if (dataType == 'date')
{
if (value.length != 8) return true;
datatype = "int";
}
if (dataType == 'time')
{
if (value.length != 6) return true;
}
if (dataType == 'int' ||
dataType == 'long')
{
var length = value.length;
if (length == 0) return false;
for (i=0; i<length; i++)
if (value.charAt(i) != '0' && value.charAt(i) != '1' && value.charAt(i) != '2' &&
value.charAt(i) != '3' && value.charAt(i) != '4' && value.charAt(i) != '5' &&
value.charAt(i) != '6' && value.charAt(i) != '7' && value.charAt(i) != '8' &&
value.charAt(i) != '9')
{
if (i != 0) return true;
if (value.charAt(i) != '-') return true;
if (length == 1) return true;
}
if (dataType == 'int' && (value > 2147483647 || value < -2147483648))
return true;
if (dataType == 'long' && (value > 9223372036854775807 || value < -9223372036854775808))
return true;
}
if (dataType == 'float')
{
var length = value.length;
if (length == 0) return false;
var regExp = "[-]{0,1}[0-9]{1,}["+this.m_decimalSeparator+"]{1}[0-9]{1,}|[-]{0,1}[0-9]{1,}";
if (C_checkRegularExpression(regExp, value) == false)
return true;
if ((decimalDigitsFloat >= 0)&&(value.indexOf(this.m_decimalSeparator)>=0))
{
if (decimalDigitsFloat == 0)
regExp = "[-]{0,1}[0-9]{1,}";
else
regExp = "[-]{0,1}[0-9]{1,}["+this.m_decimalSeparator+"]{1}[0-9]{1,"+decimalDigitsFloat+"}";
if (C_checkRegularExpression(regExp, value) == false)
return true;
}
if (digitsFloat >= 0)
{
if (value.indexOf(this.m_decimalSeparator)>=0)
{
regExp = "[-]{0,1}[0-9]{1,"+digitsFloat+"}["+this.m_decimalSeparator+"]{1}[0-9]{1,}";
if (C_checkRegularExpression(regExp, value) == false)
return true;
}
else
{
regExp = "[-]{0,1}[0-9]{1,"+digitsFloat+"}";
if (C_checkRegularExpression(regExp, value) == false)
return true;
}
}
}
if (dataType == 'color')
{
if (value.length != 7) return true;
if (value.charAt(0) != '#')return true;
for (i=1; i<value.length; i++)
if (value.charAt(i) != '0' && value.charAt(i) != '1' && value.charAt(i) != '2' &&
value.charAt(i) != '3' && value.charAt(i) != '4' && value.charAt(i) != '5' &&
value.charAt(i) != '6' && value.charAt(i) != '7' && value.charAt(i) != '8' &&
value.charAt(i) != '9' && value.charAt(i) != 'A' && value.charAt(i) != 'B' &&
value.charAt(i) != 'C' && value.charAt(i) != 'D' && value.charAt(i) != 'E' &&
value.charAt(i) != 'F' && value.charAt(i) != 'a' && value.charAt(i) != 'b' &&    		        value.charAt(i) != 'c' &&
value.charAt(i) != 'd' && value.charAt(i) != 'e' && value.charAt(i) != 'f')
return true;
}
if (dataType == 'timestamp')
{
if (value.length != 23) return true;
}
return false;
}
function C_checkTimeVALIDATION(pHHMMSS)
{
if (pHHMMSS == "230000") return true;
var vRegEx  = new RegExp("[0-9]{6}");
var vMatch  = vRegEx.exec(pHHMMSS);
if (vMatch == null) return false;
var vHour = pHHMMSS.substr(0,2) * (-1) * (-1);
var vMinute = pHHMMSS.substr(2,2) * (-1) * (-1);
var vSecond = pHHMMSS.substr(4,2) * (-1) * (-1);
if (vHour < 0 || vHour > 23) return false;
if (vSecond < 0 || vSecond > 59) return false;
if (vMinute < 0 || vMinute > 59) return false;
return true;
}
function C_checkDateVALIDATION(pYYYYMMDD, isNatpage)
{
var vRegEx  = new RegExp("[0-9]{8}");
var vMatch  = vRegEx.exec(pYYYYMMDD);
if (vMatch == null) return false;
var vYear = pYYYYMMDD.substr(0,4) * (-1) * (-1);
var vMonth = pYYYYMMDD.substr(4,2) * (-1) * (-1);
var vDay = pYYYYMMDD.substr(6,2) * (-1) * (-1);
if (vDay < 1 || vDay > 31) return false;
if (vMonth < 1 || vMonth > 12) return false;
if (isNatpage!=null && isNatpage==true)
if (vYear < 1582 || vYear > 2699) return false;
else
if (vYear < 0 || vYear > 9999) return false;
if ((vMonth == 4 || vMonth == 6 || vMonth == 9 || vMonth == 11) && vDay == 31) return false;
if (vMonth == 2)
{
var isLeap = vYear%4 == 0 && (vYear % 100 != 0 || vYear % 400 == 0);
if (vDay > 29 || (vDay == 29 && !isLeap)) return false;
}
return true;
}
function C_checkRegularExpression(pRegEx,pString)
{
var vRegEx  = new RegExp(pRegEx);
var vMatch  = vRegEx.exec(pString);
if (vMatch == null)
return false;
var vTemp = "" + vMatch[0];
if (vMatch.index == 0 && vTemp.length == pString.length)
return true;
else
return false;
}
