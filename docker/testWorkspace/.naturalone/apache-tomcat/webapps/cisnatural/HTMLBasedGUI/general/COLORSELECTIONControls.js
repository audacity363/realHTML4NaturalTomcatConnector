function addVersionInfoCOLORSELECTIONCONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('COLORSELECTIONCONTROLS');
}
var s_bufferCOLORSELECTION = [];
function checkIfColorIsDarkCOLORSELECTION(rrggbb)
{
if (rrggbb == null) return false;
if (rrggbb.length != 7) return false;
var green = rrggbb.charAt(3);
if ( (green == 'A') ||
(green == 'B') ||
(green == 'C') ||
(green == 'D') ||
(green == 'E') ||
(green == 'F') ||
(green == 'a') ||
(green == 'b') ||
(green == 'c') ||
(green == 'd') ||
(green == 'e') ||
(green == 'f'))
return false;
var red = rrggbb.charAt(1);
if ((red == 'F') ||
(red == 'f'))
return false;
return true;
}
function determineContrastColorCOLORSELECTION(rrggbb)
{
var result = s_bufferCOLORSELECTION[rrggbb];
if (result != null) return result;
if (checkIfColorIsDarkCOLORSELECTION(rrggbb) == true)
result = "#FFFFFF";
else
result = "#000000";
s_bufferCOLORSELECTION[rrggbb] = result;
return result;
}
