function addVersionInfoFORMULACONTROLS()
{
if (this.m_jsversions == undefined) m_jsversions = [];
if (this.m_jsfiles == undefined) m_jsfiles = [];
m_jsversions.push('CIS_V910_20180812_2005_NJX');
m_jsfiles.push('FORMULACONTROLS');
}
function executeFORMULA(cc)
{
var formulaprop;
var formula;
var valuecontain;
if(m_formulas.length == 0)
return;
if(cc == undefined)
{
for(i=0;i<m_formulas.length;i++)
{
if(m_formulas[i] != null)
{
formulaprop =m_formulas[i].substring(0,m_formulas[i].indexOf("("));
formula = m_formulas[i].substring(m_formulas[i].indexOf("("));
valuecontain = formula.split(";");
for(j = 0;j < valuecontain.length; j++)
{
if(valuecontain[j].length > 2  && isNaN( valuecontain[j]))
{
valuecontain[j] = executeFunctionFORMULA(valuecontain[j]);
}
}
if( executeBracketsFORMULA(valuecontain)==NaN)
{
setPropertyValue(formulaprop,"");
updateModelListeners(null);
}
else
{
setPropertyValue(formulaprop,executeBracketsFORMULA(valuecontain));
updateModelListeners(null);
}
}
}
}
else
{
var formulaString = m_formulas.join("");
if(formulaString.search(cc.CASA_valueprop) < 0)
return;
for(i=0;i<m_formulas.length;i++)
{
if(m_formulas[i] != null )
{
formulaprop =m_formulas[i].substring(0,m_formulas[i].indexOf("("));
formula = m_formulas[i].substring(m_formulas[i].indexOf("("));
valuecontain = formula.split(";");
for(j = 0;j < valuecontain.length; j++)
{
if(valuecontain[j].length > 1  && isNaN( valuecontain[j]))
{
valuecontain[j] = executeFunctionFORMULA(valuecontain[j]);
}
}
setPropertyValue(formulaprop,executeBracketsFORMULA(valuecontain));
updateModelListeners(null);
}
}
}
}
function executeFunctionFORMULA(funcn)
{
var result;
var nonzerovalue = [];
var d=new Date();
var newdate;
var month;
var date;
var detail =  funcn.split(",");
var funcname = detail[0];
var nonzero;
for(n=1;n<detail.length;n++)
{
if(!(isNaN(getPropertyValue(detail[n]))) )
{
result = getPropertyValue(detail[n])*1;
nonzero = n;
}
}
if(result== 0)
result = "";
if(funcname == "min")
{
for(s = 1;s < detail.length;s++)
{
if(getPropertyValue(detail[s]) != "" )
{
result =Math.min(result, getPropertyValue(detail[s]));
if(getPropertyValue(detail[s]) != 0 && result ==0)
result = getPropertyValue(detail[s]);
}
}
}
if(funcname == "max")
{
for(s = 1;s < detail.length;s++)
{
if(getPropertyValue(detail[s]) != "")
result=Math.max(result,getPropertyValue(detail[s]));
}
}
if(funcname == "square")
{
if(getPropertyValue(detail[1]) != "")
result = (getPropertyValue(detail[1])*getPropertyValue(detail[1]));
}
if(funcname == "square-root")
{
if(getPropertyValue(detail[1]) != "")
result = Math.sqrt(getPropertyValue(detail[1]));
}
if(funcname == "sum")
{
for(s = 1;s < detail.length;s++)
{
if(getPropertyValue(detail[s]) != "" && s != nonzero)
result = result*1 + getPropertyValue(detail[s])*1;
}
}
if(funcname == "subtract")
{
for(s = 1;s < detail.length;s++)
{
if(getPropertyValue(detail[s]) != "" )
nonzerovalue.push(getPropertyValue(detail[s]));
}
if(nonzerovalue.length == 0)
result = "";
else
{
result = nonzerovalue[0];
for(q = 1;q < nonzerovalue.length;q++ && q != nonzero)
result =  result - nonzerovalue[q];
}
}
if(funcname == "multiply")
{
var valuecheck =[];
var rj;
for(var rjs=1; rjs<detail.length; rjs++)
{
if(getPropertyValue(detail[rjs])=="" && !(isNaN(getPropertyValue(detail[rjs]))))
{
rj = getPropertyValue(detail[rjs])*1;
nonzero = rjs;
break;
}
}
for(var rs=1; rs<detail.length; rs++)
{
if(getPropertyValue(detail[rs])=="" && !(isNaN(getPropertyValue(detail[rs]))))
{
valuecheck.push("false");
}
}
if(valuecheck.length != 0 && valuecheck.length == detail.length-1 && rj == 0)
{
rj = "";
}
if(rj == undefined)
{
rj = getPropertyValue(detail[detail.length-1]);
}
for(s = 1; s < detail.length; s++)
{
if(getPropertyValue(detail[s]) != "" && s != nonzero)
{
rj = rj * getPropertyValue(detail[s]);
}
}
result=rj;
}
if(funcname == "divide")
{
for(s = 1;s < detail.length;s++)
{
if(getPropertyValue(detail[s]) != "" )
nonzerovalue.push(getPropertyValue(detail[s]));
}
if(nonzerovalue.length == 0)
result = "";
else
{
result = nonzerovalue[0];
for(q = 1;q < nonzerovalue.length;q++ && q != nonzero)
result =  result / nonzerovalue[q];
}
}
if(funcname == "avg-sum")
{
for(s = 1;s < detail.length;s++)
{
if(getPropertyValue(detail[s]) != "" )
nonzerovalue.push(getPropertyValue(detail[s]));
}
if(nonzerovalue.length == 0)
result = "";
else
{
result = 0;
for(q = 0;q < nonzerovalue.length;q++ && q != nonzero)
result =  result*1 + nonzerovalue[q]*1;
result=result/nonzerovalue.length;
}
}
if(funcname == "today")
{
result = d;
month = d.getMonth()+parseInt(1);
date = d.getDate();
if(month<10)
month = "0"+month;
if(date<10)
date = "0"+date;
result=convertYYYYMMDDIntoDisplayString(d.getFullYear()+"-" + month+"-" + date);
}
if(funcname == "now")
{
result = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}
if(funcname == "today+")
{
if(!isNaN(parseInt(detail[1])))
{
newdate = new Date(d.getFullYear(),d.getMonth(),d.getDate()+parseInt(detail[1]));
month = newdate.getMonth()+parseInt(1);
date =  newdate.getDate();
if(month<10)
month = "0"+month;
if(date<10)
date = "0"+date;
result=convertYYYYMMDDIntoDisplayString(newdate.getFullYear()+"-" + month+"-" + date);
}
}
if(funcname == "today-")
{
if(!isNaN(parseInt(detail[1])))
{
newdate = new Date(d.getFullYear(),d.getMonth(),d.getDate()-parseInt(detail[1]));
month = newdate.getMonth()+parseInt(1);
date =  newdate.getDate();
if(month<10)
month = "0"+month;
if(date<10)
date = "0"+date;
result=convertYYYYMMDDIntoDisplayString(newdate.getFullYear()+"-" + month+"-" + date);
}
}
if(funcname == "concat")
{
result = "";
for(s = 1;s < detail.length;s++)
{
if(getPropertyValue(detail[s]) != "")
result = result + getPropertyValue(detail[s]);
}
}
return result;
}
function executeBracketsFORMULA(values)
{
var v=[] ;
var str =[];
var start;
var end;
if(values.length == 1)
{
resultBracket = values;
return  values;
}
for(k = 0;k < values.length;k++)
{
if(values[k] == ")" )
{
for(p = k;p >= 0;p-- )
{
if(values[p] == "(" )
{
for(x=0;x<p;x++)
v[x] = values[x];
for(r = p+1;r<k;r++)
str.push(values[r]);
v[p] = 	executeOperatorsFORMULA(str);
if((values.length-1)-(k+1)>= 0)
{
for(g =p+1,j=k+1;j<values.length;g++,j++)
{
v[g]=values[j];
}
values= v;
return executeBracketsFORMULA(values);
}
else
{
values= v;
return executeBracketsFORMULA(values);
}
}
}
}
}
}
function push_stack(stackArr,ele)
{
stackArr[stackArr.length]=ele;
}
function pop_stack(stackArr)
{
var _temp=stackArr[stackArr.length-1];
delete stackArr[stackArr.length-1];
stackArr.length--;
return(_temp);
}
function isOperand(who)
{
return(!isOperator(who)? true : false);
}
function isOperator(who)
{
return((who=="+" || who=="-" || who=="*" || who=="/" || who=="(" || who==")" || who=="=" || who=="!")? true : false);
}
function topStack(stackArr)
{
return(stackArr[stackArr.length-1]);
}
function isEmpty(stackArr)
{
return((stackArr.length==0)? true : false);
}
function prcd(char1,char2)
{
var char1_index,char2_index;
var _def_prcd="!=-+*/";
for(var i=0; i<_def_prcd.length; i++)
{
if(char1==_def_prcd.charAt(i)) char1_index=i;
if(char2==_def_prcd.charAt(i)) char2_index=i;
}
if(((char1_index==0)||(char1_index==1)) && (char2_index>1)) return false;
else if(((char1_index==2)||(char1_index==3)) && (char2_index>3)) return false;
else return true;
}
function executeOperatorsFORMULA(infixStr)
{
var postfixStr=[];
var stackArr=[];
var postfixPtr=0;
for(var i=0; i<infixStr.length; i++)
{
if(isOperand(infixStr[i]))
{
postfixStr[postfixPtr]=infixStr[i];
postfixPtr++;
}
else
{
while((!isEmpty(stackArr)) && (prcd(topStack(stackArr),infixStr[i])))
{
postfixStr[postfixPtr]=topStack(stackArr);
pop_stack(stackArr);
postfixPtr++;
}
if((!isEmpty(stackArr)) && (infixStr[i]==")"))
{
pop_stack(stackArr);
}
else
{
push_stack(stackArr,infixStr[i]);
}
}
}
while(!isEmpty(stackArr))
{
postfixStr[postfixStr.length]=topStack(stackArr);
pop_stack(stackArr);
}
var poststr= [];
var returnVal='';
for(var i=0; i<postfixStr.length; i++)
{
returnVal+=postfixStr[i];
poststr.push(postfixStr[i]);
}
return(PostfixEval(poststr));
}
function PostfixSubEval(num1,num2,sym)
{
var returnValnum;
if(sym=="+")
returnValnum=num1*1+num2*1;
if(sym=="-")
returnValnum=num1-num2;
if(sym=="*")
returnValnum=num1*num2;
if(sym=="/")
returnValnum=num1/num2;
if(sym=="=" )
{
if( num1 == num2)
returnValnum = true;
else
returnValnum = false;
}
if(sym =="!" )
{
if( num1 == num2)
returnValnum = false;
else
returnValnum = true;
}
if(isNaN(num1) && isNaN( num1))
returnValnum ="";
return(returnValnum);
}
function PostfixEval(postfixStr)
{
var stackArr=[];
for(var i=0; i<postfixStr.length; i++)
{
if(isOperand(postfixStr[i]))
{
push_stack(stackArr,postfixStr[i]);
}
else
{
var temp=parseFloat(topStack(stackArr));
pop_stack(stackArr);
var pushVal=PostfixSubEval(parseFloat(topStack(stackArr)),temp,postfixStr[i]);
pop_stack(stackArr);
push_stack(stackArr,pushVal);
}
}
return(topStack(stackArr));
}
