function addVersionInfoEDITMASKCONVERTER()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('EDITMASKCONVERTER');
}
function checkIfValueHasErrorEDITMASK(tt, value, pCC)
{
var rc = false;
var RC_INVALID_MATCH_ERROR  = "RC_INVALID_MATCH_ERROR";
var RC_EXTRA_INPUT_ERROR    = "RC_EXTRA_INPUT_ERROR";
var testValue = pCC.value;
if ( testValue == null )
return false;
var editMaskFull = pCC.CASA_editmask;
var editMaskType = getTypeFromEditMask(tt, pCC, editMaskFull);
var result = "";
switch ( editMaskType )
{
case "xs:int"     :
case "xs:float"   :
case "xs:long"    :
case "xs:byte"    :
case "xs:short"   :
case "xs:decimal" :
case "xs:double"  :
case "dt:numeric" :
case "dt:packedNumeric":
if ( isBlankDueToZP( tt, pCC, testValue ) )
{
result = "0";
}
else
{
result = extractNumeric( tt, pCC, testValue, editMaskFull );
}
break;
case "dt:fixedString" :
case "xs:string"      :
case ""               :
result = extractAlpha( tt, pCC, testValue, editMaskFull );
break;
case "xs:date"     :
case "xs:time"     :
case "xs:dateTime" :
case "dt:dateString" :
case "dt:timeString" :
case "dt:timestampString" :
var dateTime_object = new emDateTime();
result = extractDateTime( tt, pCC, testValue, editMaskFull, dateTime_object );
break;
case "xs:boolean":
result = extractLogical( tt, pCC, testValue, editMaskFull );
break;
default:
result = RC_INVALID_MATCH_ERROR;
break;
}
if ( result == RC_INVALID_MATCH_ERROR || result == RC_EXTRA_INPUT_ERROR )
{
rc = true;
}
return rc;
}
function convertValueEDITMASK(tt, value, pCC)
{
var RC_INVALID_MATCH_ERROR  = "RC_INVALID_MATCH_ERROR";
var RC_EXTRA_INPUT_ERROR    = "RC_EXTRA_INPUT_ERROR";
var result = null;
if ( value == null )
return result;
var editMaskFull = pCC.CASA_editmask;
var editMaskType = getTypeFromEditMask(tt, pCC, editMaskFull);
switch ( editMaskType )
{
case "xs:int"     :
case "xs:float"   :
case "xs:long"    :
case "xs:byte"    :
case "xs:short"   :
case "xs:decimal" :
case "xs:double"  :
case "dt:numeric" :
case "dt:packedNumeric":
if ( isBlankDueToZP( tt, pCC, value ) )
{
result = "0";
}
else
{
result = extractNumeric( tt, pCC, value, editMaskFull );
}
break;
case "dt:fixedString" :
case "xs:string"      :
case ""               :
result = extractAlpha( tt, pCC, value, editMaskFull );
break;
case "xs:date"     :
case "xs:time"     :
case "xs:dateTime" :
case "dt:dateString" :
case "dt:timeString" :
case "dt:timestampString" :
var dateTime_object = new emDateTime();
result = extractDateTime( tt, pCC, value, editMaskFull, dateTime_object );
if ( editMaskType == "dt:dateString" )
{
result = displayDateTime( tt, pCC, "dt:dateString;YYYYMMDD", dateTime_object );
}
else if ( editMaskType == "dt:timeString" )
{
result = displayDateTime( tt, pCC, "dt:timeString;HHIISS", dateTime_object );
}
else if ( editMaskType == "dt:timestampString" )
{
result = displayDateTime( tt, pCC, "dt:timestampString;YYYYMMDDHHIISST", dateTime_object );
}
else if ( editMaskType == "xs:date" )
{
result = displayDateTime( tt, pCC, "xs:date;YYYYMMDD", dateTime_object );
}
else if ( editMaskType == "xs:time" )
{
result = displayDateTime( tt, pCC, "xs:time;HHIISS", dateTime_object );
}
else if ( editMaskType == "xs:dateTime" )
{
result = displayDateTime( tt, pCC, "xs:dateTime;YYYYMMDDHHIISST", dateTime_object );
}
break;
case "xs:boolean":
result = extractLogical( tt, pCC, value, editMaskFull );
break;
default:
result = RC_INVALID_MATCH_ERROR;
break;
}
if ( result == RC_INVALID_MATCH_ERROR || result == RC_EXTRA_INPUT_ERROR )
{
result = value;
}
return result;
}
function convertIntoDisplayStringEDITMASK(tt, value, pCC)
{
var RC_INVALID_MASK_ERROR  = "RC_INVALID_MASK_ERROR";
var result = null;
if ( value == null || value == "" )
return value;
var result = value;
var editMaskFull = pCC.CASA_editmask;
var editMaskType = getTypeFromEditMask(tt, pCC, editMaskFull);
switch ( editMaskType )
{
case "xs:int"     :
case "xs:float"   :
case "xs:long"    :
case "xs:byte"    :
case "xs:short"   :
case "xs:decimal" :
case "xs:double"  :
case "dt:numeric" :
case "dt:packedNumeric":
if ( doBlankDueToZP( tt, pCC, value ) )
{
result = "";
}
else
{
result = displayNumeric( tt, pCC, value, editMaskFull );
}
break;
case "dt:fixedString" :
case "xs:string"      :
case ""               :
result = displayAlpha( tt, pCC, value, editMaskFull );
break;
case "xs:date"     :
case "xs:time"     :
case "xs:dateTime" :
case "dt:dateString" :
case "dt:timeString" :
case "dt:timestampString" :
var dateTime_object = new emDateTime();
if ( editMaskType == "dt:dateString" )
{
result = extractDateTime( tt, pCC, value, "dt:dateString;YYYYMMDD", dateTime_object );
}
else if ( editMaskType == "dt:timeString" )
{
result = extractDateTime( tt, pCC, value, "dt:timeString;HHIISS", dateTime_object );
}
else if ( editMaskType == "dt:timestampString" )
{
result = extractDateTime( tt, pCC, value, "dt:timestampString;YYYYMMDDHHIISST", dateTime_object );
}
else if ( editMaskType == "xs:date" )
{
result = extractDateTime( tt, pCC, value, "xs:date;YYYYMMDD", dateTime_object );
}
else if ( editMaskType == "xs:time" )
{
result = extractDateTime( tt, pCC, value, "xs:time;HHIISS", dateTime_object );
}
else if ( editMaskType == "xs:dateTime" )
{
result = extractDateTime( tt, pCC, value, "xs:dateTime;YYYYMMDDHHIISST", dateTime_object );
}
result = displayDateTime( tt, pCC, editMaskFull, dateTime_object );
break;
case "xs:boolean":
result = displayLogical( tt, pCC, value, editMaskFull );
break;
default:
result = RC_INVALID_MASK_ERROR;
break;
}
if ( result == RC_INVALID_MASK_ERROR )
{
result = value;
}
return result;
}
function trim( string )
{
return string.replace(/^\s+/, '').replace (/\s+$/, '');
}
function getParameter( tt, pCC, name )
{
switch (name)
{
case "EM_DELIMITER" :
return ";";
case "EM_BLANK_STRING" :
return "^";
case "EM_INSERTION_SIGN_STRING" :
return "'";
case "EM_BLANK" :
return " ";
case "EM_DC" :
return "\t";
case "EM_THSEPCH" :
return "\f";
case "EM_INSERTION_SIGN" :
return "\r";
case "JS_DC" :
return ".";
case "CUR_DC" :
case "EM_DC_STRING" :
return tt.getDecimalSeparator();
case "CUR_THSEPCH" :
case "EM_THSEPCH_STRING" :
var val = tt.getPropertyValue("cISAddons.xcithsepch");
if ( val == null )
{
val = (tt.getDecimalSeparator() == "." ? "," : ".");
}
return val;
case "CUR_FREEMODE" :
var val = tt.getPropertyValue("cISAddons.xciemfm");
if ( val == null ) val = "true";
return (val == "true" ? true : false);
case "CUR_ZP" :
var val = tt.getPropertyValue("cISAddons.xcizp");
if ( val == null ) val = "true";
return (val == "true" ? true : false);
default:
return "";
}
}
function globalEditMaskData()
{
this.general_editmask_full              = null;
this.general_editmask_type              = null;
this.general_editmask_mask              = null;
this.general_editmask_mask_normalized   = null;
this.numeric_lead_z_specs               = null;
this.numeric_lead_num_specs             = null;
this.numeric_trail_num_specs            = null;
this.numeric_fill                       = null;
this.numeric_modified_mask              = null;
this.numeric_modified_number            = null;
this.numeric_dlen                       = null;
this.numeric_frac                       = null;
this.numeric_int_places                 = null;
this.numeric_dec_places                 = null;
this.datetime_tokenized_mask            = null;
this.logical_mask_true                  = null;
this.logical_mask_false                 = null;
}
function getTypeFromEditMask(tt, pCC, editmask_full)
{
var RC_ERROR    = "RC_ERROR";
var rc = "";
var index = editmask_full.indexOf(getParameter(tt, pCC, "EM_DELIMITER"));
if ( index > -1 )
{
rc = trim(editmask_full.substring(0, index));
}
return rc;
}
function splitEditMask(tt, pCC, editmask_full, globalData)
{
var RC_OK       = "RC_OK";
var RC_ERROR    = "RC_ERROR";
var rc = RC_OK;
var editmask_type = "";
var editmask_mask = "";
var index = editmask_full.indexOf(getParameter(tt, pCC, "EM_DELIMITER"));
if ( index > -1 )
{
editmask_type     = trim(editmask_full.substring(0, index));
}
editmask_mask = trim(editmask_full.substring(index+1));
globalData.general_editmask_full      = editmask_full;
globalData.general_editmask_type      = editmask_type;
globalData.general_editmask_mask      = editmask_mask;
if ( editmask_type == "" && editmask_mask == "" )
{
rc = RC_ERROR;
}
return rc;
}
function normalizeEditMask(tt, pCC, editmask_mask, globalData)
{
var RC_OK       = "RC_OK";
var RC_ERROR    = "RC_ERROR";
var rc = RC_OK;
var INSERTION_SIGN          = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var INSERTION_SIGN_STRING   = getParameter(tt, pCC, "EM_INSERTION_SIGN_STRING");
var editmask_mask_normalized = editmask_mask;
editmask_mask_normalized = editmask_mask_normalized.replace(/&apos;/g, "'").replace(/&quot;/g, "\"").
replace(/&gt;/g  , ">").replace(/&lt;/g  , "<" ).
replace(/&amp;/g , "&");
var pmask = editmask_mask_normalized.split("");
var shift_in = false;
for ( var i=0; i<pmask.length; i++ )
{
if ( pmask[i] == INSERTION_SIGN_STRING )
{
if ( shift_in && i+1 < pmask.length && pmask[i+1] == INSERTION_SIGN_STRING )
{
pmask.splice(i, 1);
continue;
}
shift_in =! shift_in;
pmask[i] = INSERTION_SIGN;
continue;
}
}
editmask_mask_normalized = "";
for ( var i=0; i<pmask.length; i++ )
{
editmask_mask_normalized = editmask_mask_normalized + pmask[i];
}
var i = 0;
var j = 0;
var len = 0;
var matches = editmask_mask_normalized.match(/\([0-9]+\)/);
while ( matches && matches.length > 0 )
{
var count = parseInt(matches[0].substr(1, matches[0].length-2), 10);
index = editmask_mask_normalized.indexOf(matches[0]);
var replacement = editmask_mask_normalized.substr(index-1, 1);
if ( replacement == INSERTION_SIGN && index-3 >= 0 && editmask_mask_normalized.substr(index-3, 1) == INSERTION_SIGN )
{
replacement = editmask_mask_normalized.substr(index-2, 1);
}
var replacements = "";
for ( j=0; j<count-1; j++ )
{
replacements = replacements + replacement;
}
editmask_mask_normalized = editmask_mask_normalized.replace(matches[0], replacements);
matches = editmask_mask_normalized.match(/\([0-9]+\)/);
}
var et = trim(globalData.general_editmask_type.toLowerCase());
if ( et == "xs:int"         || et == "xs:long"       || et == "xs:float"           ||
et == "xs:byte"        || et == "xs:short"      || et == "xs:decimal"         ||
et == "xs:double"      || et == "dt:numeric"    || et == "dt:packedNumeric"   ||
et == "dt:fixedString" || et == "xs:string"     || et == ""                   ||
et == "xs:date"        || et == "xs:time"       || et == "xs:dateTime"        ||
et == "dt:dateString"  || et == "dt:timeString" || et == "dt:timestampString" ||
et == "xs:boolean"
)
{
pmask = editmask_mask_normalized.split("");
shift_in = false;
var emdc_string  = getParameter(tt, pCC, "EM_DC_STRING");
var emdc         = getParameter(tt, pCC, "EM_DC");
var thsepch_string = getParameter(tt, pCC, "EM_THSEPCH_STRING");
var thsepch        = getParameter(tt, pCC, "EM_THSEPCH");
var blank_string = getParameter(tt, pCC, "EM_BLANK_STRING");
var blank        = getParameter(tt, pCC, "EM_BLANK");
var ch;
for ( i=0; i<pmask.length; i++)
{
if ( pmask[i] == INSERTION_SIGN )
{
shift_in =!shift_in;
continue;
}
if ( !shift_in )
{
if ( pmask[i] == emdc_string &&
(et == "xs:int"         || et == "xs:long"       || et == "xs:float"           ||
et == "xs:byte"        || et == "xs:short"      || et == "xs:decimal"         ||
et == "xs:double"      || et == "dt:numeric"    || et == "dt:packedNumeric")
)
{
pmask[i] = emdc;
continue;
}
if ( pmask[i] == thsepch_string &&
(et == "xs:int"         || et == "xs:long"       || et == "xs:float"           ||
et == "xs:byte"        || et == "xs:short"      || et == "xs:decimal"         ||
et == "xs:double"      || et == "dt:numeric"    || et == "dt:packedNumeric")
)
{
pmask[i] = thsepch;
continue;
}
if ( pmask[i] == blank_string )
{
pmask[i] = blank;
continue;
}
}
}
editmask_mask_normalized = "";
for ( i=0; i<pmask.length; i++ )
{
editmask_mask_normalized = editmask_mask_normalized + pmask[i];
}
}
globalData.general_editmask_mask_normalized = editmask_mask_normalized;
return rc;
}
function isBlankDueToZP( tt, pCC, value )
{
var rc = false;
if ( getParameter(tt, pCC, "CUR_ZP") == false )
{
if ( value == null || trim(value).length == 0 )
{
rc = true;
}
}
return rc;
}
function doBlankDueToZP( tt, pCC, value )
{
var rc = false;
if ( getParameter(tt, pCC, "CUR_ZP") == false )
{
if ( value == null || value.search(/[1-9]/) == -1 )
{
rc = true;
}
}
return rc;
}
function setDatatypeSizeNumeric(tt, pCC, editmask_type, globalData)
{
var RC_OK       = "RC_OK";
var RC_ERROR    = "RC_ERROR";
var rc = RC_OK;
globalData.numeric_int_places = 9999;
globalData.numeric_dec_places = 9999;
var et = trim(editmask_type.toLowerCase());
if ( et == "xs:int" || et == "xs:short" || et == "xs:byte" )
{
globalData.numeric_int_places = 5;
globalData.numeric_dec_places = 0;
}
else if ( et == "xs:long" )
{
globalData.numeric_int_places = 10;
globalData.numeric_dec_places = 0;
}
else if ( et == "xs:float" || et == "xs:decimal" || et == "xs:double" || et == "dt:numeric" || et == "dt:fixedNumeric" )
{
globalData.numeric_int_places = 9999;
globalData.numeric_dec_places = 9999;
if ( typeof pCC.CASA_digits != "undefined" )
{
globalData.numeric_int_places = parseInt(pCC.CASA_digits, 10);
globalData.numeric_dec_places = 0;
if ( typeof pCC.CASA_decimaldigits != "undefined" )
{
globalData.numeric_dec_places = parseInt(pCC.CASA_decimaldigits, 10);
}
}
}
else
{
globalData.numeric_int_places = 9999;
globalData.numeric_dec_places = 9999;
}
return rc;
}
function prepNumeric(tt, pCC, number, mask, globalData)
{
var RC_INVALID_MASK_ERROR   = "RC_INVALID_MASK_ERROR";
var RC_OK                   = "RC_OK";
var RC_NO_VALID_POS_ERROR   = "RC_NO_VALID_POS_ERROR";
var INSERTION_SIGN          = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var EM_DC                   = getParameter(tt, pCC, "EM_DC");
var EM_THSEP                = getParameter(tt, pCC, "EM_THSEPCH");
var CUR_THSEP               = getParameter(tt, pCC, "CUR_THSEPCH");
var CUR_DECCHAR             = getParameter(tt, pCC, "CUR_DC");
var pmask = mask.split("");
var p = 0;
var ch = pmask[p];
var fill = " ";
var pdecpt = -1;
if ( ch == "s" || ch == "n" ||
ch == "S" || ch == "N" ||
ch == "+" || ch == "-" )
{
pmask[p] = ch.toLowerCase();
ch = pmask[++p];
}
if ( !(ch == "z" || ch == "Z" || ch == "9" || ch == EM_DC) )
{
if ( ch == INSERTION_SIGN )
{
fill = pmask[p+1];
pmask.splice(p, 3);
}
else
{
fill = pmask[p];
pmask.splice(p, 1);
}
}
var shift_in = false, found_9 = false;
var im, it;
var lead_z_specs = 0, lead_num_specs = 0, trail_num_specs = 0;
var pnumspec = [];
for ( im = 0, it = 0; im < pmask.length; im++)
{
ch = pmask[im];
if ( ch == INSERTION_SIGN )
{
shift_in = !shift_in;
continue;
}
if ( !shift_in && (ch == EM_DC || ch == EM_THSEP || ch == "Z" || ch == "z" || ch == "9" ) )
{
if ( ch == EM_DC )
{
if ( pdecpt != -1 )
{
return RC_INVALID_MASK_ERROR;
}
pdecpt = im;
}
else if ( ch == EM_THSEP )
{
if ( pdecpt != -1 )
{
return RC_INVALID_MASK_ERROR;
}
pmask[im] = CUR_THSEP;
}
else
{
ch = pmask[im] = ch.toLowerCase();
if ( ch == "z" )
{
if ( pdecpt != -1 )
{
return RC_INVALID_MASK_ERROR;
}
else if ( found_9 )
{
pmask[im] = "9";
}
else
{
lead_z_specs++;
}
}
else
{
found_9 = true;
}
if ( pdecpt != -1 )
{
trail_num_specs++;
}
else
{
lead_num_specs++;
}
pnumspec[it++] = im;
}
}
}
if ( shift_in )
{
return RC_INVALID_MASK_ERROR;
}
var int_places = globalData.numeric_int_places;
var dec_places = globalData.numeric_dec_places;
if ( dec_places < trail_num_specs )
{
trail_num_specs = dec_places; /* new no. of num-specifiers after DP */
for ( var i = pnumspec.length - 1; i >= lead_num_specs + dec_places; i--)
{
pmask.splice( pnumspec[i], 1);
}
}
if ( int_places < lead_num_specs )
{
for ( var i=lead_num_specs-int_places-1; i >= 0; i--)
{
pmask.splice( pnumspec[i], 1);
}
lead_z_specs   = lead_z_specs - (lead_num_specs - int_places);
lead_z_specs   = lead_z_specs < 0 ? 0 : lead_z_specs;
lead_num_specs = int_places; /* new no. of num-specifiers before DP */
}
globalData.numeric_lead_z_specs = lead_z_specs;
globalData.numeric_lead_num_specs = lead_num_specs;
globalData.numeric_trail_num_specs = trail_num_specs;
globalData.numeric_fill = fill;
globalData.numeric_modified_number = number;
globalData.numeric_modified_mask = "";
for ( im = 0; im < pmask.length; im++ )
{
globalData.numeric_modified_mask = globalData.numeric_modified_mask + pmask[im];
}
return RC_OK;
}
function displayNumeric(tt, pCC, number, mask )
{
var rc = "";
var RC_INVALID_MASK_ERROR   = "RC_INVALID_MASK_ERROR";
var RC_OK                   = "RC_OK";
var INSERTION_SIGN          = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var EM_DC                   = getParameter(tt, pCC, "EM_DC");
var EM_THSEP                = getParameter(tt, pCC, "EM_THSEPCH");
var CUR_THSEP               = getParameter(tt, pCC, "CUR_THSEPCH");
var CUR_DECCHAR             = getParameter(tt, pCC, "CUR_DC");
var JS_DECCHAR             = getParameter(tt, pCC, "JS_DC");
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
rc = setDatatypeSizeNumeric(tt, pCC, globalData.general_editmask_type, globalData);
if ( rc != RC_OK ) return rc;
var rc = prepNumeric(tt, pCC, number, globalData.general_editmask_mask_normalized, globalData);
if ( rc != RC_OK ) return rc;
var lead_z_specs = globalData.numeric_lead_z_specs;
var lead_num_specs = globalData.numeric_lead_num_specs;
var trail_num_specs = globalData.numeric_trail_num_specs;
var fill = globalData.numeric_fill;
var pmask = globalData.numeric_modified_mask.split("");
var pnumber = globalData.numeric_modified_number.split("");
var work = [];
var em_len = pmask.length;
var tfsign = false;
var number_dlen = 0, number_frac = 0, pos_dec = -1, i;
for (i = 0; i< pnumber.length; i++)
{
ch = pnumber[i];
if ( ch == CUR_DECCHAR || ch == JS_DECCHAR )
{
pos_dec = i;
}
else if ( ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9" )
{
number_dlen++;
if ( pos_dec != -1 )
{
number_frac++;
}
}
}
if ( pos_dec != -1 ) { pnumber.splice(pos_dec, 1); }
var ch = pmask[em_len-1];
if ( ch == "+" || ch == "-" ) { tfsign = true; };
var sign = "+";
if ( pnumber[0] == "-" || pnumber[0] == "+" )
{
sign = pnumber[0];
pnumber.splice(0, 1);
}
i = 0;
for ( i = 0; i < lead_num_specs - (number_dlen - number_frac); i++ )
{
pnumber.splice( 0, 0, "0" );
}
number_dlen += i;
i = 0;
for ( i = 0; i < trail_num_specs - number_frac; i++ )
{
pnumber.splice( pnumber.length, 0, "0" );
}
number_dlen += i;
number_frac += i;
var startix = number_dlen - number_frac - lead_num_specs;
for ( it = startix; it < startix + lead_z_specs ; it++)
{
if ( pnumber[it] == "0" )
{
pnumber[it] = fill;
}
else
{ break; }
}
shift_in = false;
var z_blank = false;
var lfsign = null;
var sign_written = false;
for ( im=0, is=0, it = startix; im < em_len; im++ )
{
ch = pmask[im];
if ( ch == INSERTION_SIGN )
{
shift_in = !shift_in;
continue;
}
if ( !shift_in )
{
if ( ch == "z" || ch == "9" || ch == EM_DC )
{
if ( ch != EM_DC && pnumber[it] == fill )
{
z_blank = true;
work[is++] = fill;
it++;
continue;
}
z_blank = false;
if ( lfsign != null && !tfsign && !sign_written )
{
work[is-1] = ( lfsign=="-" && sign=="+" ) ? " " : sign;
sign_written = true;
}
if (ch == EM_DC )
{
work[is++] = CUR_DECCHAR;
}
else
{
work[is++] = pnumber[it++];
}
continue;
}
if ( im == 0 && (ch == "n" || ch == "s") )
{
if ( ch == "n" && sign == "+" )
{
work[is++] = " ";
}
else
{
work[is++] = sign;
}
continue;
}
if ( (im == 0 || im == em_len -1 ) && (ch == "-" || ch == "+") )
{
if ( im == 0 )
{
work[is++] = " ";
if ( !tfsign )
{
lfsign = ch;
}
}
else
{
if ( ch == "-" && sign == "+" )
{
work[is++] = " ";
}
else
{
work[is++] = sign;
}
}
continue;
}
}
/* not a special character - treat as a literal */
if ( !z_blank )
{
work[is++] = ch;
}
else
{
work[is++] = fill;
}
}
rc = "";
for ( i=0; i<work.length; i++ )
{
rc = rc + work[i];
}
return rc;
}
function extractNumeric(tt, pCC, number, mask)
{
var rc = "";
var RC_INVALID_MATCH_ERROR  = "RC_INVALID_MATCH_ERROR";
var RC_EXTRA_INPUT_ERROR    = "RC_EXTRA_INPUT_ERROR";
var RC_OK                   = "RC_OK";
var INSERTION_SIGN          = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var EM_DC                   = getParameter(tt, pCC, "EM_DC");
var EM_THSEP                = getParameter(tt, pCC, "EM_THSEPCH");
var CUR_THSEP               = getParameter(tt, pCC, "CUR_THSEPCH");
var CUR_DECCHAR             = getParameter(tt, pCC, "CUR_DC");
var CUR_FREEMODE            = getParameter(tt, pCC, "CUR_FREEMODE");
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
rc = setDatatypeSizeNumeric(tt, pCC, globalData.general_editmask_type, globalData);
if ( rc != RC_OK ) return rc;
var rc = prepNumeric(tt, pCC, number, globalData.general_editmask_mask_normalized, globalData);
if ( rc != RC_OK ) return rc;
var lead_z_specs = globalData.numeric_lead_z_specs;
var lead_num_specs = globalData.numeric_lead_num_specs;
var trail_num_specs = globalData.numeric_trail_num_specs;
var fill = globalData.numeric_fill;
var pmask   = globalData.numeric_modified_mask.split("");
var pnumber = globalData.numeric_modified_number.split("");
var i=0, p=0, count = 0;
var em_len = pmask.length;
var tfsign = null;
var sign = "+";
var ch = pmask[em_len-1];
if ( ch == "+" || ch == "-" ) { tfsign = ch; };
var emdc   = globalData.numeric_modified_mask.indexOf(EM_DC);
var dc_pos = pnumber.length;
var extracted_number = [];
/* ascertain position of decimal character in input string */
if ( emdc != -1 )
{
var dc_lit = 0;
for ( dc_lit = 1, p = em_len - 1; p > emdc; p-- )
{
if ( pmask[p] == CUR_DECCHAR ) dc_lit++;
}
count = dc_lit;
for ( i = pnumber.length - 1; i >= 0; i--)
{
if ( pnumber[i] == CUR_DECCHAR && --dc_lit == 0 )
{
dc_pos = i;
break;
}
}
if (dc_lit != 0)
{
if ( count == 1)
dc_pos = pnumber.length;
else
return RC_INVALID_MATCH_ERROR;
}
}
/* count number of digits supplied in front of DP */
var digits = 0;
for ( i = dc_pos - 1; i >= 0; i--)
{
ch = pnumber[i];
if ( ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9" )
digits++;
}
/* find number of real (i.e. not literal) digits in front of DP */
var shift_in = false;
count = 0;
i = emdc != -1 ? emdc - 1: em_len - 1;
for ( ; i >= 0 && digits > 0 ; i--)
{
ch = pmask[i];
if ( ch == INSERTION_SIGN )
{
shift_in = !shift_in;
continue;
}
if ( !shift_in && (ch == 'z' || ch == '9') )
{
count++;
digits--;
}
else if ( ch=="0"||ch=="1"||ch=="2"||ch=="3"||ch=="4"||ch=="5"||ch=="6"||ch=="7"||ch=="8"||ch=="9" )
{
digits--;
}
}
if ( shift_in )  return RC_INVALID_MATCH_ERROR;
var z_ignore = 0;
if ( count > lead_num_specs || count < lead_num_specs - lead_z_specs )
{
return RC_INVALID_MATCH_ERROR;
}
else
{
z_ignore = lead_num_specs - count;
}
dc_pos = -1;
shift_in = false;
var free_mode = CUR_FREEMODE;
var temp_free_mode = free_mode;
var mismatch = -1;
var section = 1;
p = 0;
var len = pnumber.length;
var im, is, it, inchar;
var lfsign = null;
var extra_input = false;
for ( im=0, is=0, it=0; im < em_len; im++)
{
ch = pmask[im];
inchar =  is<len ? pnumber[is] : " ";
if ( ch == INSERTION_SIGN )
{
shift_in = !shift_in;
continue;
}
if ( !shift_in )
{
if (ch == "z" || ch == "9" || ch == EM_DC)
{
temp_free_mode = free_mode; /* reset literal suppression flag */
if ( ch == "z" )
{
if ( z_ignore-- > 0 )
{
section = 3; /* suppressed Z section */
continue;
}
}
if ( section == 5 ) continue;
if ( section < 4 )
{
section = 4;
for ( ; is<len; is++)
{
inchar = pnumber[is];
if ( inchar != " " && inchar != fill ) break;
}
if ( is == len )  return RC_INVALID_MATCH_ERROR;
}
/* expect now : sign character (+,-,' ') or digit 0..9 or dec. char. */
/* check sign first */
if ( lfsign != null )
{
if (is == mismatch)
mismatch = -1;
if ( lfsign == "-" )
{
if ( inchar == "-" || inchar == fill || inchar == " " )
is++;
}
else /* lfsign == '+' */
{
if (inchar == "+" || inchar == "-")
is++;
else
return RC_INVALID_MATCH_ERROR;
}
sign = (inchar == "-")? "-": "+";
lfsign = null;
im--; /* stay on same mask char */
continue;
}
/* ok - now next character must be 0..9 or decimal character */
if (ch == EM_DC) /* if decimal character */
{
dc_pos = it;
if (inchar != CUR_DECCHAR)
{
if (it < 1) /* if no digits written yet */
return RC_INVALID_MATCH_ERROR; /* no suppression possible */
else /* otherwise assume suppressed */
section = 5; /* and advance to next section */
}
else
{
is++;
extracted_number[it++] = inchar;
}
}
else /* must be 0..9 */
{
if (inchar < "0" || inchar > "9")
{
if (dc_pos < 0 /* || dc_pos == it */)
return RC_INVALID_MATCH_ERROR;
else
section = 5;
}
else
{
is++;
extracted_number[it++] = inchar;
}
}
continue;
}
/* handle special characters */
if (im == 0 && (ch == "s" || ch == "n" || ch == "+" || ch == "-"))
{
temp_free_mode = free_mode; /* reset literal suppression flag */
if (ch == "-" || ch == "+")
{
if ( tfsign == null ) /* if no trailing sign */
lfsign = ch; /* use the leading sign */
continue;
}
/* N,S - scan input string for first significant char */
for (j = is; j < len; j++)
{
inchar = pnumber[j];
if (inchar != " " && inchar != fill)
break;
}
if (ch == "n")
{
if (j < len && inchar == "-")
is = j + 1;
sign = (inchar == "-")? "-": "+";
continue;
}
if (ch == "s")
{
if (j == len) /* error if sign not found */
return RC_INVALID_MATCH_ERROR;
if (inchar == "+" || inchar == "-")
is = j + 1;
else
return RC_INVALID_MATCH_ERROR;
sign = (inchar == "-")? "-": "+";
continue;
}
}
if ((im == em_len - 1) && (ch == "+" || ch == "-"))
{
temp_free_mode = free_mode; /* reset literal suppression flag */
if (ch == "-")
{
if (inchar == " " || inchar == "-")
is++;
}
else /* if (ch == '+') */
{
if (inchar == "+" || inchar == "-")
is++;
else
return RC_INVALID_MATCH_ERROR;
}
sign = (inchar == "-")? "-": "+";
continue;
}
}
/* if got this far, assume we have an ordinary (non-special) char */
switch (section)
{
case 1:
if ((ch != fill) && (ch != " "))
{
section = 2; /* go to next section */
for (; is < len; is++) /* skip blanks and fillers */
{
inchar = pnumber[is];
if (inchar != " " && inchar != fill)
break;
}
if (is == len) return RC_INVALID_MATCH_ERROR;
} /* deliberate fall-through */
case 2:
case 4:
case 5:
if (inchar == ch && is < len)
{
is++;
temp_free_mode = false;
}
else if (!temp_free_mode)
{/* no match - assume it's the sign position */
if (section == 5 || mismatch > -1)
return RC_INVALID_MATCH_ERROR;
else
mismatch = is;
}
break;
case 3: /* suppressed section */
break; /* ignore */
default: /* should never reach here... */
return RC_INVALID_MATCH_ERROR; /* ...but tell me if I'm wrong! */
/* break; */
}
}
if (mismatch > -1) /* literal string mismatch */
return RC_INVALID_MATCH_ERROR;
for (; is < len; is++) /* check for extra input */
{
inchar = pnumber[is];
if (inchar != " " && inchar != fill)
{
extra_input = true;
break;
}
}
if ( extra_input )  return RC_EXTRA_INPUT_ERROR;
rc = "";
if (sign == '-' && it > 0) rc = "-";
for (i=0; i<it; i++)
{
rc = rc + extracted_number[i];
}
return rc;
}
function displayAlpha(tt, pCC, alpha, mask )
{
var rc = "";
var RC_INVALID_MASK_ERROR   = "RC_INVALID_MASK_ERROR";
var RC_OK                   = "RC_OK";
var INSERTION_SIGN          = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
var pmask  = globalData.general_editmask_mask_normalized.split("");
var palpha = alpha.split("");
var pBuffer = [];
var em_len = pmask.length;
var ch = pmask[0];
var fillpos = -1;
var fill = " ";
if ( ch != "X" && ch != "x" )
{
fillpos = ( ch == INSERTION_SIGN ) ? 1 : 0;
fill = pmask[fillpos];
}
/* process the edit mask */
var shift_in = false;
var isLeadingBlank = true;
var im =0, is = 0, it = 0;
for ( im = is = it = 0; im < em_len; im++ )
{
ch = pmask[im];
if (ch == INSERTION_SIGN)
{
shift_in = !shift_in;
continue;
}
if (im == fillpos) /* filler position? */
{
continue;
}
if (!shift_in)
{
if (ch == "x" || ch == "X")
{
if ( is >= palpha.length ) break;
ch = palpha[is++];
if ( ch == " " )
{
ch = isLeadingBlank ? fill : ch;
}
else
{
isLeadingBlank = false;
}
pBuffer[it++] = ch;
continue;
}
}
pBuffer[it++] = ch;
continue;
}
rc = "";
for ( var i=0; i < pBuffer.length; i++ )
{
rc = rc + pBuffer[i];
}
return rc;
}
function extractAlpha(tt, pCC, alpha, mask )
{
var rc = "";
var RC_OK                   = "RC_OK";
var RC_INVALID_MATCH_ERROR  = "RC_INVALID_MATCH_ERROR";
var RC_EXTRA_INPUT_ERROR    = "RC_EXTRA_INPUT_ERROR";
var INSERTION_SIGN          = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
var pmask  = globalData.general_editmask_mask_normalized.split("");
var palpha = alpha.split("");
var pBuffer = [];
var em_len  = pmask.length;
var str_len = palpha.length;
var ch = pmask[0];
var fillpos = -1;
var fill = " ";
if ( ch != "X" && ch != "x" )
{
fillpos = ( ch == INSERTION_SIGN ) ? 1 : 0;
}
/* process the edit mask */
var shift_in = false;
var isLeadingBlank = true;
var im =0, is = 0, it = 0;
var inchar;
for ( im = is = it = 0; im < em_len; im++ )
{
ch = pmask[im];
if (ch == INSERTION_SIGN)
{
shift_in = !shift_in;
continue;
}
if (im == fillpos) /* filler position? */
{
fill = ch; /* set filler character */
continue;
}
inchar = (is < str_len) ? palpha[is] : " ";
if (!shift_in)
{
if (ch == "x" || ch == "X")
{
if ( inchar == fill && isLeadingBlank )
{
inchar = " ";
}
else
{
isLeadingBlank = false;
}
pBuffer[it++] = inchar;
is++;
continue;
}
}
if ( inchar != ch ) /* literal char must match */
{
return RC_INVALID_MATCH_ERROR;
}
is++;
}
for (; is < str_len; is++) /* check for extra input */
{
inchar = palpha[is];
if (inchar != ' ' && inchar != fill)
{
return RC_EXTRA_INPUT_ERROR;
}
}
rc = "";
for ( var i=0; i < pBuffer.length; i++ )
{
rc = rc + pBuffer[i];
}
return rc;
}
function emTokenData()
{
this.token                              = null;
this.type                               = null;
this.TYPE_LITERAL                       = 0;
this.TYPE_SIGNIFICANT                   = 1;
}
function emDateTime()
{
this.type               = 0;
this.year               = "2001";
this.month              = "01";
this.day                = "01";
this.hour               = "00";
this.minute             = "00";
this.second             = "00";
this.tenth              = "0";
this.TYPE_TIMESTAMP     = 0;
this.TYPE_DATE          = 1;
this.TYPE_TIME          = 2;
}
function getSignificantDateTime()
{
var significantDateTime = new Array("DD","ZD","MM","ZM","YYYY","YY","Y","SS","ZS","II","ZI","HH","ZH","T");
return significantDateTime;
}
function zeroSuppressed(string)
{
var rc = string;
rc = rc.replace(/^0/, " ");
return rc;
}
function zeroUnsuppressed(string)
{
var rc = string;
rc = rc.replace(/^ /g, "0");
return rc;
}
function isInRange(string, lower, upper)
{
if ( !isNaN(string) && parseInt(string,10) >= lower && parseInt(string,10) <= upper )
{
return true;
}
return false;
}
function tokenizeEditMaskDateTime(tt, pCC, mask, globalData)
{
var RC_OK       = "RC_OK";
var RC_ERROR    = "RC_ERROR";
var rc = RC_OK;
var INSERTION_SIGN          = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var tmask = [];
var ti    = 0;
var token = null;
var shift_in = false;
var tokenArray = getSignificantDateTime();
for ( var mi = 0; mi < mask.length ; )
{
var found = false;
if ( mask.substr(mi,1) == INSERTION_SIGN )
{
shift_in =! shift_in;
mi++;
continue;
}
if ( !shift_in )
{
for ( var ai = 0; ai < tokenArray.length; ai++ )
{
if ( mi + tokenArray[ai].length <= mask.length )
{
if ( mask.substr(mi, tokenArray[ai].length) == tokenArray[ai] )
{
token       = new emTokenData();
token.type  = token.TYPE_SIGNIFICANT;
token.token = tokenArray[ai];
mi += tokenArray[ai].length;
tmask[ti++] = token;
found = true;
break;
}
}
}
if ( found ) continue;
}
token       = new emTokenData();
token.type  = token.TYPE_LITERAL;
token.token = mask.substr(mi,1);
mi++;
tmask[ti++] = token;
}
globalData.datetime_tokenized_mask = tmask;
return rc;
}
function displayDateTime(tt, pCC, mask, datetime_object )
{
var rc = "";
var RC_OK                   = "RC_OK";
var RC_INVALID_MASK_ERROR   = "RC_INVALID_MASK_ERROR";
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
rc = tokenizeEditMaskDateTime(tt, pCC, globalData.general_editmask_mask_normalized, globalData);
if ( rc != RC_OK ) return rc;
var tmask  = globalData.datetime_tokenized_mask;
var rc_datetime = "";
var em_len  = tmask.length;
/* process the edit mask */
var im=0;
var token, token_len;
for ( im=0; im < em_len; im++ )
{
token = tmask[im];
if ( token.type == token.TYPE_SIGNIFICANT )
{
switch (token.token)
{
case "YYYY":
rc_datetime += datetime_object.year.substr(datetime_object.year.length-4 ,4);
break;
case "YY":
rc_datetime += datetime_object.year.substr(datetime_object.year.length-2 ,2);
break;
case "Y":
rc_datetime += datetime_object.year.substr(datetime_object.year.length-1 ,1);
break;
case "DD":
rc_datetime += datetime_object.day.substr(datetime_object.day.length-2 ,2);
break;
case "ZD":
rc_datetime += zeroSuppressed(datetime_object.day.substr(datetime_object.day.length-2 ,2));
break;
case "MM":
rc_datetime += datetime_object.month.substr(datetime_object.month.length-2 ,2);
break;
case "ZM":
rc_datetime += zeroSuppressed(datetime_object.month.substr(datetime_object.month.length-2 ,2));
break;
case "SS":
rc_datetime += datetime_object.second.substr(datetime_object.second.length-2 ,2);
break;
case "ZS":
rc_datetime += zeroSuppressed(datetime_object.second.substr(datetime_object.second.length-2 ,2));
break;
case "II":
rc_datetime += datetime_object.minute.substr(datetime_object.minute.length-2 ,2);
break;
case "ZI":
rc_datetime += zeroSuppressed(datetime_object.minute.substr(datetime_object.minute.length-2 ,2));
break;
case "HH":
rc_datetime += datetime_object.hour.substr(datetime_object.hour.length-2 ,2);
break;
case "ZH":
rc_datetime += zeroSuppressed(datetime_object.hour.substr(datetime_object.hour.length-2 ,2));
break;
case "T":
rc_datetime += datetime_object.tenth.substr(datetime_object.tenth.length-1 ,1);
break;
}
continue;
}
if ( token.type == token.TYPE_LITERAL )
{
rc_datetime += token.token;
continue;
}
}
return rc_datetime;
}
function extractDateTime(tt, pCC, datetime, mask, datetime_object )
{
var rc = "";
var RC_OK                   = "RC_OK";
var RC_INVALID_MATCH_ERROR  = "RC_INVALID_MATCH_ERROR";
var RC_EXTRA_INPUT_ERROR    = "RC_EXTRA_INPUT_ERROR";
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
rc = tokenizeEditMaskDateTime(tt, pCC, globalData.general_editmask_mask_normalized, globalData);
if ( rc != RC_OK ) return rc;
var tmask  = globalData.datetime_tokenized_mask;
var em_len  = tmask.length;
var dt_len  = datetime.length;
/* process the edit mask */
var im=0, is=0, it=0;
var instr, inlen;
var token, token_len;
for ( im = is = it = 0; im < em_len; im++ )
{
token = tmask[im];
if ( token.type == token.TYPE_SIGNIFICANT )
{
inlen = token.token.length;
if ( is + inlen > dt_len )
{
return RC_INVALID_MATCH_ERROR;
}
instr = datetime.substr(is, inlen);
is += inlen;
if ( token.token.substr(0,1) == "Z" )
{
instr = zeroUnsuppressed(instr);
}
for ( var i = 0; i<instr.length; i++)
{
if ( instr.substr(i,1) < "0" || instr.substr(i,1) > "9" )
{
return RC_INVALID_MATCH_ERROR;
}
}
switch (token.token)
{
case "YYYY":
if ( !isInRange(instr, 1582, 2699) )  return RC_INVALID_MATCH_ERROR;
datetime_object.year = instr;
break;
case "YY":
datetime_object.year = "20" + instr;
break;
case "Y":
datetime_object.year = "201" + instr;
break;
case "DD":
case "ZD":
if ( !isInRange(instr, 1, 31) )  return RC_INVALID_MATCH_ERROR;
datetime_object.day = instr;
break;
case "MM":
case "ZM":
if ( !isInRange(instr, 1, 12) )  return RC_INVALID_MATCH_ERROR;
datetime_object.month = instr;
break;
case "SS":
case "ZS":
if ( !isInRange(instr, 0, 59) )  return RC_INVALID_MATCH_ERROR;
datetime_object.second = instr;
break;
case "II":
case "ZI":
if ( !isInRange(instr, 0, 59) )  return RC_INVALID_MATCH_ERROR;
datetime_object.minute = instr;
break;
case "HH":
case "ZH":
if ( !isInRange(instr, 0, 24) )  return RC_INVALID_MATCH_ERROR;
datetime_object.hour = instr;
break;
case "T":
datetime_object.tenth = instr;
break;
}
continue;
}
if ( token.type == token.TYPE_LITERAL )
{
instr = datetime.substr(is, 1);
if ( instr != token.token )
{
return RC_INVALID_MATCH_ERROR;
}
is++;
continue;
}
}
if ( is < dt_len )
{
return RC_EXTRA_INPUT_ERROR;
}
return RC_OK;
}
function prepLogical(tt, pCC, editmask_normalized, globalData)
{
var RC_OK       = "RC_OK";
var RC_ERROR    = "RC_ERROR";
var INSERTION_SIGN = getParameter(tt, pCC, "EM_INSERTION_SIGN");
var rc = RC_OK;
var shift_in = false, slash_found = false;
var p1str = "", p2str = "", ch = "";
for ( var im = 0; im < editmask_normalized.length; im++ )
{
ch = editmask_normalized.charAt(im);
if (ch == INSERTION_SIGN)
{
shift_in = !shift_in;
continue;
}
if (ch == "/" && !shift_in)
{
if ( p1str.length > 0 )  {slash_found = true;}
continue;
}
if ( slash_found )
{
p2str += ch;
}
else
{
p1str += ch;
}
}
for ( var i = 0; i<p1str.length-p2str.length; i++ ) p2str += " ";
for ( var i = 0; i<p2str.length-p1str.length; i++ ) p1str += " ";
globalData.logical_mask_true  = slash_found ? p2str : p1str;
globalData.logical_mask_false = slash_found ? p1str : p2str;
return rc;
}
function displayLogical(tt, pCC, logical, mask )
{
var rc = "";
var RC_INVALID_MASK_ERROR   = "RC_INVALID_MASK_ERROR";
var RC_OK                   = "RC_OK";
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
rc = prepLogical(tt, pCC, globalData.general_editmask_mask_normalized, globalData);
if ( rc != RC_OK ) return rc;
var log = logical.toLowerCase();
rc = ( log == "true" || log == "yes" || log == "on" ) ? globalData.logical_mask_true : globalData.logical_mask_false;
return rc;
}
function extractLogical(tt, pCC, logical, mask )
{
var rc = "";
var RC_OK                   = "RC_OK";
var RC_INVALID_MATCH_ERROR  = "RC_INVALID_MATCH_ERROR";
var RC_EXTRA_INPUT_ERROR    = "RC_EXTRA_INPUT_ERROR";
var globalData = new globalEditMaskData();
rc = splitEditMask(tt, pCC, mask, globalData);
if ( rc != RC_OK ) return rc;
rc = normalizeEditMask(tt, pCC, globalData.general_editmask_mask, globalData);
if ( rc != RC_OK ) return rc;
rc = prepLogical(tt, pCC, globalData.general_editmask_mask_normalized, globalData);
if ( rc != RC_OK ) return rc;
if ( trim(logical) == trim(globalData.logical_mask_true) )
{
rc = "true";
}
else if ( trim(logical) == trim(globalData.logical_mask_false) )
{
rc = "false";
}
else
{
rc = "RC_INVALID_MATCH_ERROR";
}
return rc;
}
