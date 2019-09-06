function addVersionInfoVALIDATIONRULES()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('VALIDATIONRULES');
}
function checkValidationRules(cc,pRules,pString)
{
cc.CASA_valErrors = [];
var vMessages = [];
for(var i = 0; i <= pRules.length - 1; i++)
{
var rulesdetail = pRules[i].split("-");
var message = rulesdetail[rulesdetail.length-1];
if(message.indexOf("$") >= 0)
{
var msg = message.split("$");
var m1 = msg[0];
txtid = "$" + ruleStringToOriginalString(msg[1]);
if(m1 != "")
{
message = msg[0]+"\n";
message += getPropertyValue(txtid);
}
else
{
message = getPropertyValue(txtid);
message = message.replace("\n","");
}
}
vMessages.push(ruleStringToOriginalString(message));
var vResults = [];
var jCondition = [];
for(var j = 0 ; j < rulesdetail.length - 1 ; j++)
{
var vLeftOperand;
var vRegExpression = rulesdetail[j].split(";");
var valueprop = rulesStringtoFieldValueProp(vRegExpression[0]);
if(valueprop == cc.CASA_valueprop)
vLeftOperand = pString;
else
vLeftOperand = getPropertyValue(valueprop);
var vRightOperand = vRegExpression[2];
var vJoinCondition = vRegExpression[3];
if(cc.CASA_datatype=="date")
{
if(vLeftOperand.indexOf(".")>=0 || vLeftOperand.indexOf("/")>=0 || vLeftOperand.indexOf("-")>=0 )
vLeftOperand = convertDisplayStringIntoYYYYMMDD(vLeftOperand);
var vDate = vLeftOperand.substring(6,8) + "/" + vLeftOperand.substring(4,6) + "/" + vLeftOperand.substring(0,4);
var leftdate = new Date(vDate);
vDate = vRightOperand.substring(6,8) + "/" + vRightOperand.substring(4,6) + "/" + vRightOperand.substring(0,4);
var rightdate = new Date(vDate);
vLeftOperand = leftdate.valueOf();
vRightOperand = rightdate.valueOf();
}
if(vRegExpression[1] == "!=")
vResults.push(vLeftOperand*1 != vRightOperand*1);
else if(vRegExpression[1] == "==")
vResults.push(vLeftOperand == vRightOperand);
else if(vRegExpression[1] == "lt")
vResults.push(vLeftOperand*1 < vRightOperand*1);
else if(vRegExpression[1] == "gt")
vResults.push(vLeftOperand*1 > vRightOperand*1);
else if(vRegExpression[1] == "ltet")
vResults.push(vLeftOperand*1 <= vRightOperand*1);
else if(vRegExpression[1] == "gtet")
vResults.push(vLeftOperand*1 >= vRightOperand*1);
else if(vRegExpression[1] == "null")
vResults.push(vLeftOperand.length == 0);
else if(vRegExpression[1] == "not null")
vResults.push(vLeftOperand.length != 0);
else if(vRegExpression[1] == "cnts")
{
var vMatch = vLeftOperand.search(ruleStringToOriginalString(vRightOperand));
if(vMatch >= 0)
vResults.push(true);
else
vResults.push(false);
}
else if(vRegExpression[1] == "dncnts")
{
var vMatch = vLeftOperand.search(ruleStringToOriginalString(vRightOperand));
if(vMatch < 0)
vResults.push(true);
else
vResults.push(false);
}
else if(vRegExpression[1] == "sw")
{
var vMatch = vLeftOperand.search(ruleStringToOriginalString(vRightOperand));
if(vMatch == 0)
vResults.push(true);
else
vResults.push(false);
}
else if(vRegExpression[1] == "dnsw")
{
var vMatch = vLeftOperand.search(ruleStringToOriginalString(vRightOperand));
if(vMatch != 0)
vResults.push(true);
else
vResults.push(false);
}
else if(vRegExpression[1] == "mp")
{
var	vExpr = ruleStringToOriginalString(vRightOperand);
vResults.push(CL().C_checkRegularExpression(vExpr,vLeftOperand));
}
else if(vRegExpression	[1] == "dnmp")
{
var	vExpr = ruleStringToOriginalString(vRightOperand);
vResults.push(!CL().C_checkRegularExpression(vExpr,vLeftOperand));
}
if(vRegExpression.length == 4 && (vJoinCondition != undefined || vJoinCondition != ""))
jCondition.push(vJoinCondition);
}
if(jCondition.length > 0)
{
var l = 1;
var finalresult;
if(jCondition[0] == "And")
finalresult = vResults[0] && vResults[1];
else if(jCondition[0] == "Or")
finalresult = vResults[0] || vResults[1];
for(var resultindex = 2; resultindex < vResults.length ;resultindex++)
{
if(jCondition[l] == "And")
finalresult = vResults[resultindex] && finalresult;
else if(jCondition[l] == "Or")
finalresult = vResults[resultindex] || finalresult;
l++;
}
if(finalresult)
cc.CASA_valErrors.push(vMessages[i]);
}
else
{
if(vResults.length > 0)
{
for(var k =0; k <= vResults.length - 1; k++)
if(vResults[k])	cc.CASA_valErrors.push(vMessages[i]);
}
}
}
if(cc.CASA_valErrors.length > 0 )
{
if(cc.CASA_checkOnSubmit == false)
return false;
else
{
registerValidationError(cc);
return true;
}
}
}
function ruleStringToOriginalString(text)
{
while(text.indexOf("scln") >= 0)
text = text.replace("scln",";");
while(text.indexOf("hfn") >= 0)
text = text.replace("hfn","-");
while(text.indexOf("undscr") >= 0)
text = text.replace("undscr","_");
return text;
}
function rulesStringtoFieldValueProp(text)
{
while(text.indexOf("*usf*") >= 0)
text = text.replace("*usf*","_");
while(text.indexOf("*dsf*") >= 0)
text = text.replace("*dsf*","-");
return text;
}
